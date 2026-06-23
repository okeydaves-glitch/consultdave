// ============================================================================
// API Route: /api/users/me/addresses
// ============================================================================
// Handles the current user's saved addresses.
//
// GET  /api/users/me/addresses - List addresses
// POST /api/users/me/addresses - Create address
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ addresses });
}

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: user.id,
      address_type: body.addressType,
      street: body.street,
      city: body.city,
      state: body.state,
      postal_code: body.postalCode,
      is_default: body.isDefault || false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
