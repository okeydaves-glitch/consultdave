// ============================================================================
// API Route: POST /api/auth/callback
// ============================================================================
// This route handles the OAuth callback from Google.
// After the user approves login on Google's consent page,
// Google redirects here with an authorization code.
// We exchange that code for a Supabase session.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  const supabase = createClient(request, response);

  // Exchange the authorization code for a session
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback error:", error.message);
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
  }

  return response;
}
