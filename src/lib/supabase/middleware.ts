// ============================================================================
// Supabase Middleware Client (for use inside Route Handlers)
// ============================================================================
// This is a server-side client specifically designed to work with
// Next.js Route Handlers (app/api/*). It reads and writes cookies
// from the NextRequest and NextResponse objects.
// ============================================================================

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, type NextResponse } from "next/server";

export function createClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
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
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}
