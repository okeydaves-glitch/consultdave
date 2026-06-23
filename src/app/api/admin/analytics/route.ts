// ============================================================================
// API Route: GET /api/admin/analytics
// ============================================================================
// Returns business analytics data for the admin dashboard.
// ============================================================================

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createAdminClient();

  // Get total bookings
  const { count: totalBookings } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  // Get total revenue from bookings
  const { data: rawBookingRevenue } = await supabase
    .from("bookings")
    .select("*");

  const bookingRevenueData = (rawBookingRevenue as any[]) || [];
  const totalRevenue = bookingRevenueData.reduce(
    (sum: number, b: any) => sum + Number(b.total_amount),
    0
  );

  // Get total orders
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Get bookings by location
  const { data: rawCars } = await supabase.from("cars").select("*");
  const { data: rawBookings } = await supabase.from("bookings").select("*");

  const carsData = (rawCars as any[]) || [];
  const bookingsData = (rawBookings as any[]) || [];

  const carLocationMap = new Map(carsData.map((c: any) => [c.id, c.location]));
  const bookingsByCity: Record<string, number> = {};

  bookingsData.forEach((b: any) => {
    const city = carLocationMap.get(b.car_id) || "unknown";
    bookingsByCity[city] = (bookingsByCity[city] || 0) + 1;
  });

  return NextResponse.json({
    totalBookings: totalBookings || 0,
    totalRevenue,
    totalOrders: totalOrders || 0,
    bookingsByCity,
  });
}
