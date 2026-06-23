// ============================================================================
// Auth Callback Route Handler
// ============================================================================
// This is the URL that Google (or any OAuth provider) redirects to
// after the user approves the login request.
//
// WHAT HAPPENS:
// 1. User clicks "Sign in with Google"
// 2. Google shows the consent screen
// 3. User approves
// 4. Google redirects to: /auth/callback?code=xxx
// 5. This route handler exchanges the code for a session
// 6. User is now logged in!
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function GET(request: NextRequest) {
  // Create a response so we can set cookies on it
  const response = NextResponse.redirect(
    new URL("/dashboard", request.url)
  );

  const supabase = createClient(request, response);

  // Exchange the OAuth code for a session
  // The code comes from Google as a query parameter
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // After creating the user's auth session, we also need to create
  // their profile in the profiles table if it doesn't exist yet.
  // This happens automatically via a database trigger,
  // but we could also do it here.
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    // Check if profile exists, create if not
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .single();

    if (!profile) {
      await supabase.from("profiles").insert({
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata?.full_name || session.user.email!.split("@")[0],
        profile_picture: session.user.user_metadata?.avatar_url,
      });
    }
  }

  return response;
}
