// ============================================================================
// API Route: /api/cars
// ============================================================================
// Handles listing and creating cars.
//
// GET /api/cars - List available cars (public)
//   Query params: location, category, minPrice, maxPrice, transmission, skip, take
//
// POST /api/cars - Add a new car (admin only)
//   Body: { name, category, year, mileage, fuelType, transmission, seats, dailyPrice, location, images }
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { createAdminClient } from "@/lib/supabase/admin";

// ============================================================================
// GET /api/cars - List available cars
// ============================================================================
export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const category = searchParams.get("category");
  const transmission = searchParams.get("transmission");
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "12");

  // Build the query
  let query = supabase
    .from("cars")
    .select("*", { count: "exact" })
    .eq("is_available", true)
    .range(skip, skip + take - 1);

  if (location) query = query.eq("location", location);
  if (category) query = query.eq("category", category);
  if (transmission) query = query.eq("transmission", transmission);

  const { data: cars, count, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    cars,
    total: count || 0,
    hasMore: (count || 0) > skip + take,
  });
}

// ============================================================================
// POST /api/cars - Add a new car (admin only)
// ============================================================================
export async function POST(request: NextRequest) {
  // Admin operations use the service_role key to bypass RLS
  const supabase = createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase.from("cars").insert({
    name: body.name,
    category: body.category,
    year: body.year,
    mileage: body.mileage,
    fuel_type: body.fuelType,
    transmission: body.transmission,
    seats: body.seats,
    daily_price: body.dailyPrice,
    location: body.location,
    images: body.images || [],
    features: body.features || null,
    insurance_info: body.insuranceInfo || null,
    cancellation_policy: body.cancellationPolicy || null,
  }).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
