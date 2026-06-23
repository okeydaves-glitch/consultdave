"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { ShoppingCart, User, LogOut, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface NavbarClientProps {
  isLoggedIn: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/cars", label: "Rentals" },
  { href: "/contact", label: "Contact" },
];

export function NavbarClient({ isLoggedIn }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href="/cart"
          className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-5 w-5" />
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          )}
          <Link href="/contact">
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-5 font-semibold"
            >
              <Phone className="h-3.5 w-3.5" />
              Get Quote
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-16 left-0 right-0 z-50 border-b border-border bg-white overflow-hidden md:hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <MobileNavLink key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </MobileNavLink>
              ))}

              <hr className="border-border my-2" />

              {isLoggedIn ? (
                <>
                  <MobileNavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </MobileNavLink>
                  <button
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
                    onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <MobileNavLink href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </MobileNavLink>
              )}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary text-white px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Get Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}
