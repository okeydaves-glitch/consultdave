// ============================================================================
// Login Page
// ============================================================================
// The user login page. Currently only supports Google OAuth.
// Shows a clean, centered card with the sign-in button.
//
// Route: /login
// ============================================================================

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Check if user is already logged in
  // If so, redirect them to the dashboard
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome to SafeRent</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to rent cars and purchase safety equipment
          </p>
        </div>

        {/* Sign-in card */}
        <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <div className="space-y-4">
            <GoogleSignInButton />

            <div className="text-center text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
