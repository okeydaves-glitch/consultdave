// ============================================================================
// API Route: /api/admin/orders
// ============================================================================
// Admin endpoints for managing all orders.
//
// GET /api/admin/orders - List all orders (with optional filters)
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
    .from("orders")
    .select("*, profiles(name, email)", { count: "exact" })
    .range(skip, skip + take - 1);

  if (status) query = query.eq("status", status);

  const { data: orders, count, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders, total: count || 0 });
}
