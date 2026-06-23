// ============================================================================
// Navbar Component
// ============================================================================
// The top navigation bar that appears on EVERY page.
// Shows:
//   - Logo / Site name (links to home)
//   - Navigation links (Cars, Equipment, About, Contact)
//   - User menu (if logged in: dashboard link + sign out)
//   - Sign In button (if logged out)
//   - Cart icon with item count
//   - Mobile hamburger menu for small screens
//
// This is a SERVER COMPONENT by default. It fetches the user's
// session server-side and renders the appropriate links.
// ============================================================================

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  // Get the Supabase server client and check if user is logged in
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">SafeRent</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/cars"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cars
          </Link>
          <Link
            href="/equipment"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Equipment
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right side: user menu / auth buttons */}
        <NavbarClient isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
