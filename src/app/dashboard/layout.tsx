// ============================================================================
// Dashboard Layout
// ============================================================================

// Must be dynamic because AuthGuard uses Supabase client
export const dynamic = "force-dynamic";
// Wraps all dashboard pages (/dashboard/*) with:
// - AuthGuard (ensures user is logged in)
// - A sidebar with navigation links
//
// Route group: /dashboard/*
// ============================================================================

import { AuthGuard } from "@/components/auth/AuthGuard";
import Link from "next/link";
import { LayoutDashboard, Car, ShoppingBag, User, MapPin } from "lucide-react";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/rentals", label: "My Rentals", icon: Car },
  { href: "/dashboard/purchases", label: "My Purchases", icon: ShoppingBag },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/addresses", label: "Addresses", icon: MapPin },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="space-y-1">
            {dashboardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </aside>

          {/* Main Content */}
          <div>{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
