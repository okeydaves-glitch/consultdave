import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavbarClient } from "./NavbarClient";
import { Logo } from "@/components/shared/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/cars", label: "Rentals" },
  { href: "/contact", label: "Contact" },
];

export async function Navbar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--navbar-bg)] border-b border-[var(--border)]/50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <Logo href="/" size="md" />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <NavbarClient isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
