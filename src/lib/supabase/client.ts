// ============================================================================
// Supabase Browser Client
// ============================================================================
// Creates the Supabase client that runs in the USER'S BROWSER.
//
// During static generation / SSR, environment variables may not be
// available. We handle this gracefully by returning a no-op client
// so pages with AuthGuard can still pre-render without crashing.
// ============================================================================

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars aren't available (e.g. during build/static generation),
  // return a mock client that won't throw.
  // The actual client will be created at runtime on the browser.
  if (!supabaseUrl || !supabaseKey) {
    // We return a minimal proxy that won't crash during SSR pre-render.
    // Real calls will be made client-side where env vars are available.
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        signInWithOAuth: async () => ({ error: new Error("Not configured") }),
        exchangeCodeForSession: async () => ({ data: {}, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            order: () => ({ data: [], error: null }),
            range: () => ({ data: [], error: null, count: 0 }),
          }),
          order: () => ({ data: [], error: null }),
          range: () => ({ data: [], error: null, count: 0 }),
          limit: () => ({ data: [], error: null }),
        }),
        insert: () => ({
          select: () => ({ single: async () => ({ data: null, error: null }) }),
        }),
        update: () => ({
          eq: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
        }),
        delete: () => ({
          eq: () => ({ data: null, error: null }),
        }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        }),
      },
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
