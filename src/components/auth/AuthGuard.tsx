// ============================================================================
// Auth Guard Component
// ============================================================================
// A wrapper component that protects pages from unauthenticated access.
// If the user is not logged in, they are redirected to the login page.
//
// Usage:
//   <AuthGuard>
//     <DashboardPage />
//   </AuthGuard>
//
// This is useful for pages that require authentication, like
// the user dashboard or checkout.
// ============================================================================

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loading } from "@/components/shared/Loading";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      // Check if there's a valid session
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);
      } else {
        // Not logged in - redirect to login page
        // We pass the current URL as a "redirectTo" parameter so the
        // login page can send the user back after they sign in
        router.push(`/login?redirectTo=${encodeURIComponent(window.location.pathname)}`);
      }

      setIsLoading(false);
    }

    checkAuth();
  }, [router, supabase]);

  // Show a loading spinner while checking auth status
  if (isLoading) {
    return <Loading fullPage text="Checking authentication..." />;
  }

  // Only render children if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
