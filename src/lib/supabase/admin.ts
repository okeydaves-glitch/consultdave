// ============================================================================
// Supabase Admin Client
// ============================================================================
// This client uses the SUPABASE SERVICE_ROLE KEY which has SUPER ADMIN
// privileges. It BYPASSES Row Level Security (RLS) entirely.
//
// WARNING: This should ONLY be used:
//   - In admin API routes (under app/api/admin/)
//   - For server-side operations that need to read/write any user's data
//   - NEVER in the browser or client components
//   - NEVER expose the service_role key to the client
//
// NOTE: We don't use the Database generic type here to avoid TypeScript
// inference issues with Supabase's type system for admin operations.
// We cast results as needed in the calling code.
// ============================================================================

import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // This is the SECRET service_role key - only available server-side
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
