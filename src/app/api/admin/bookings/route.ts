// ============================================================================
// API Route: /api/admin/bookings
// ============================================================================
// Admin endpoints for managing all bookings.
//
// GET /api/admin/bookings - List all bookings (with optional filters)
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "20");

  let query = supabase
    .from("bookings")
    .select("*, profiles(name, email), cars(name)", { count: "exact" })
    .range(skip, skip + take - 1);

  if (status) query = query.eq("status", status);

  const { data: bookings, count, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings, total: count || 0 });
}
