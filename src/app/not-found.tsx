// ============================================================================
// 404 Not Found Page
// ============================================================================
// Shown when a user navigates to a page that doesn't exist.
// Next.js automatically shows this for any unmatched route.
//
// Route: * (any unmatched URL)
// ============================================================================

import Link from "next/link";
import { Button } from "@/components/shared/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
