// ============================================================================
// Loading Component
// ============================================================================
// Shows a spinning loader while content is being fetched.
// Used with TanStack Query's `isLoading` state or with React's Suspense.
//
// Usage:
//   {isLoading && <Loading />}
//
// Or with a full-page loader:
//   {isLoading && <Loading fullPage />}
// ============================================================================

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  fullPage?: boolean;  // Centers the spinner in the whole viewport
  text?: string;       // Optional text to show below the spinner
  className?: string;
}

export function Loading({ fullPage, text, className }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        fullPage ? "min-h-[60vh]" : "py-8",
        className
      )}
    >
      {/* 
        Loader2 from lucide-react is a spinning circle animation.
        The "animate-spin" class makes it rotate.
      */}
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  );
}
