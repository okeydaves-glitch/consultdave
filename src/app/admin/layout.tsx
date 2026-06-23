// ============================================================================
// Admin Layout
// ============================================================================
// Wraps all admin pages (/admin/*) with admin authorization check
// and a sidebar navigation.
//
// Admin users are stored in the admin_users table (separate from regular
// users who sign in via Google OAuth). Admins log in with email + password.
//
// Route group: /admin/*
// ============================================================================

import Link from "next/link";
import { LayoutDashboard, Car, HardHat, Calendar, ShoppingBag, BarChart3 } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Cars", icon: Car },
  { href: "/admin/equipment", label: "Equipment", icon: HardHat },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add admin authentication check
  // For MVP, we keep it simple. In production, verify against admin_users table.

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Admin Sidebar */}
        <aside className="space-y-1">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Admin Panel
          </p>
          {adminLinks.map((link) => (
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
  );
}
