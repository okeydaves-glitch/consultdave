// ============================================================================
// Supabase Browser Client
// ============================================================================
// This file creates the Supabase client that runs in the USER'S BROWSER.
// It uses the anonymous (anon) key which is safe to expose to the browser
// because Row Level Security (RLS) policies on your database tables
// control what data each user can see or modify.
//
// We don't use a Database generic type here because the hand-written
// type definitions don't perfectly align with Supabase's type inference.
// Instead, we cast results as needed in the calling code.
// ============================================================================

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
