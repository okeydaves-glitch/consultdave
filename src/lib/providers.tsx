// ============================================================================
// React Context Providers
// ============================================================================
// This file wraps our app with providers that make certain tools available
// to ALL components without needing to pass them manually (prop drilling).
//
// It provides:
// 1. QueryClientProvider - Makes TanStack Query work everywhere.
//    TanStack Query handles fetching, caching, and re-fetching data
//    from our API routes. It replaces the old pattern of useState +
//    useEffect for data fetching.
// 2. A future spot for other providers (cart Zustand store, etc.)
// ============================================================================

"use client"; // This must be a Client Component because QueryClient is browser-side

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  // QueryClient manages all data fetching for the app.
  // We store it in state so it persists across re-renders but is
  // re-created if the user navigates to a different part of the app.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // How long (in ms) fetched data stays "fresh" before refetching
            staleTime: 60 * 1000, // 1 minute
            // How long inactive query data is kept in memory
            gcTime: 5 * 60 * 1000, // 5 minutes
            // Retry failed queries twice before showing error
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
