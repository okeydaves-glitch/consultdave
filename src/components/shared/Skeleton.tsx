// ============================================================================
// Skeleton Loading Component
// ============================================================================
// A shimmer placeholder that shows while content is loading.
// Gives users a visual cue that something is loading,
// which feels faster than showing nothing or a spinner.
//
// Usage:
//   <Skeleton className="h-48 w-full" />  // Image placeholder
//   <Skeleton className="h-4 w-3/4" />     // Text line
//   <Skeleton className="h-10 w-20" />     // Button placeholder
// ============================================================================

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        // Base: gray background with rounded corners
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

// ============================================================================
// Car Card Skeleton
// ============================================================================
// Matches the shape of a CarCard / EquipmentCard for seamless loading.
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

// ============================================================================
// Car Detail Skeleton
// ============================================================================
// Matches the layout of the car detail page.
export function CarDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Skeleton className="aspect-[16/9] w-full rounded-xl" />
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Dashboard Stats Skeleton
// ============================================================================
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
