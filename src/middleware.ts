// ============================================================================
// Next.js Middleware — Supabase Session Management
// ============================================================================
//
// Middleware runs BEFORE a page is loaded, on EVERY request.
// Think of it as a gatekeeper that sits between the user's browser
// and your Next.js app.
//
// WHAT THIS MIDDLEWARE DOES:
// 1. Creates a Supabase server client using the request's cookies
// 2. Calls getUser() to try to refresh the session if the token is expired
// 3. The session cookie is automatically refreshed by createServerClient
//    when the user's token is about to expire
// 4. Passes the request through to the intended page/route
//
// WITHOUT THIS: Users would be logged out every time their token expires
// because there'd be no one to refresh the cookie.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, serializeCookieHeader } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Create a response so we can set cookies on it
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Calling getUser() refreshes the session if the token is expired
  // This is the key line that keeps users logged in
  const { data: { user } } = await supabase.auth.getUser();

  return response;
}

// The `config.matcher` tells Next.js WHICH routes should trigger the middleware.
// We want it on ALL routes except:
//   - Static files (_next/static, _next/image)
//   - Favicon
//   - Public images
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
