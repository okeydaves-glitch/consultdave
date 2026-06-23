// ============================================================================
// API Route: /api/users/me
// ============================================================================
// Handles the current user's profile.
//
// GET /api/users/me - Get current user's profile and addresses
// PUT /api/users/me - Update current user's profile
//   Body: { name?, phone?, profilePicture? }
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

  // Fetch profile with addresses
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, addresses(*)")
    .eq("id", user.id)
    .single();

  return NextResponse.json({ user: profile });
}

export async function PUT(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: body.name,
      phone: body.phone,
      profile_picture: body.profilePicture,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
