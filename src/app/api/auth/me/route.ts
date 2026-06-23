// ============================================================================
// API Route: GET /api/auth/me
// ============================================================================
// Returns the currently authenticated user's basic info.
// Used by the frontend to check if a user is logged in.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.user_metadata?.full_name || user.email?.split("@")[0],
      email: user.email,
      profilePicture: user.user_metadata?.avatar_url,
    },
  });
}
