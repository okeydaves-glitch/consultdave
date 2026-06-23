// ============================================================================
// API Route: /api/bookings
// ============================================================================
// Handles creating and listing bookings.
//
// POST /api/bookings - Create a new booking (requires auth)
//   Body: { carId, checkInDate, checkOutDate, pickupLocation, insuranceSelected }
//   Returns: { booking, paymentUrl }
//
// GET /api/bookings - List user's bookings (requires auth)
//   Query params: status, skip, take
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { createAdminClient } from "@/lib/supabase/admin";

// ============================================================================
// POST /api/bookings - Create a new booking
// ============================================================================
export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  // Verify user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();

  // Validate required fields
  if (!body.carId || !body.checkInDate || !body.checkOutDate || !body.pickupLocation) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Fetch car details to calculate pricing
  const { data: rawCar, error: carError } = await supabase
    .from("cars")
    .select("*")
    .eq("id", body.carId)
    .single();

  const car = rawCar as any;

  if (carError || !car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  // Calculate number of days and total cost
  const checkIn = new Date(body.checkInDate);
  const checkOut = new Date(body.checkOutDate);
  const diffTime = checkOut.getTime() - checkIn.getTime();
  const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (numDays <= 0) {
    return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
  }

  const dailyRate = Number(car.daily_price);
  const rentalCost = numDays * dailyRate;
  const insuranceCost = body.insuranceSelected ? numDays * 2000 : 0; // ₦2,000/day
  const totalAmount = rentalCost + insuranceCost;

  // Use admin client to create booking (bypasses RLS for insert)
  const adminSupabase = createAdminClient();

  const { data: rawBooking, error: bookingError } = await adminSupabase
    .from("bookings")
    .insert({
      user_id: user.id,
      car_id: body.carId,
      check_in_date: body.checkInDate,
      check_out_date: body.checkOutDate,
      num_days: numDays,
      daily_rate: dailyRate,
      total_amount: totalAmount,
      insurance_selected: body.insuranceSelected || false,
      insurance_amount: insuranceCost,
      pickup_location: body.pickupLocation,
      status: "pending",
    } as any)
    .select()
    .single();

  const booking = rawBooking as any;

  if (bookingError) {
    return NextResponse.json({ error: bookingError.message }, { status: 500 });
  }

  // In production, we'd initialize Paystack payment here and return the URL.
  // For MVP, return a placeholder payment URL.
  const paymentUrl = `/checkout?bookingId=${booking.id}`;

  return NextResponse.json({ booking, paymentUrl });
}

// ============================================================================
// GET /api/bookings - List user's bookings
// ============================================================================
export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = supabase
    .from("bookings")
    .select("*, cars(name, images)", { count: "exact" })
    .eq("user_id", user.id);

  if (status) {
    query = query.eq("status", status);
  }

  const { data: bookings, count, error } = await query
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings, total: count || 0 });
}
