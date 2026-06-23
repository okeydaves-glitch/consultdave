// ============================================================================
// Footer Component
// ============================================================================
// The footer that appears on EVERY page.
// Shows: copyright, quick links, contact info, and social links.
// ============================================================================

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <h3 className="text-lg font-bold text-primary">SafeRent</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your one-stop platform for business vehicle rentals and safety
              equipment in Nigeria.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/cars" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Rent a Car
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Buy Equipment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Lagos, Abuja, Port Harcourt</li>
              <li>hello@saferent.com</li>
              <li>+234 800 SAFERENT</li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-foreground">Our Cities</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Lagos</li>
              <li>Abuja</li>
              <li>Port Harcourt</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SafeRent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
