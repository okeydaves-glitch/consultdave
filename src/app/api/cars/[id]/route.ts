// ============================================================================
// API Route: /api/cars/[id]
// ============================================================================
// Handles individual car operations (get, update, delete).
//
// GET    /api/cars/[id] - Get car details (public)
// PUT    /api/cars/[id] - Update a car (admin only)
// DELETE /api/cars/[id] - Delete a car (admin only)
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { createAdminClient } from "@/lib/supabase/admin";

// ============================================================================
// GET /api/cars/[id] - Get car details
// ============================================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}

// ============================================================================
// PUT /api/cars/[id] - Update car (admin)
// ============================================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("cars")
    .update(body as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ============================================================================
// DELETE /api/cars/[id] - Delete a car (admin)
// ============================================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { error } = await supabase.from("cars").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Car deleted" });
}
