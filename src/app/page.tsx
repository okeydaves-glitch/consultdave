// ============================================================================
// Home Page — animated landing page
// ============================================================================
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AnimatedHero } from "@/components/shared/AnimatedHero";
import { Car, HardHat, Shield, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO SECTION — full entrance animation ===== */}
      <AnimatedHero />

      {/* ===== FEATURES SECTION — scroll reveal ===== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold">Why SafeRent?</h2>
            <p className="mt-4 text-muted-foreground">
              Everything your business needs in one place
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={0}>
              <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Daily Car Rentals</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Rent cars by the day. Sedans, SUVs, vans, and trucks for your
                  business needs. No hourly or weekly subscriptions.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <HardHat className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold">Safety Equipment</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Curated marketplace for PPE, fall protection, respiratory gear,
                  and more. Buy what you need, delivered to your door.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 font-semibold">Secure Payments</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pay via bank transfer or mobile money through Paystack.
                  Your transactions are secure and encrypted.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mt-4 font-semibold">Three Cities</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Operating in Lagos, Abuja, and Port Harcourt. Pick up and
                  return at convenient locations.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 font-semibold">Simple Booking</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Browse, select dates, and book in minutes. No phone calls,
                  no paperwork. Everything online.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mt-4 font-semibold">Business Ready</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get invoices, order histories, and rental records for your
                  business accounting.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="border-t border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="mt-4 text-muted-foreground">
              Sign up in seconds with your Google account.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
