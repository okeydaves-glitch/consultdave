// ============================================================================
// Supabase Server Client
// ============================================================================
// This file creates the Supabase client that runs on the SERVER SIDE.
// It uses cookies to maintain the user's session across requests.
// Use this in:
//   - Server Components (pages, layouts without "use client")
//   - Route Handlers (API routes under app/api/)
//
// IMPORTANT: This must be called per-request. Do NOT reuse the same client
// across multiple requests since each request has its own cookies.
// ============================================================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Swallow errors during static generation
          }
        },
      },
    }
  );
}
