// ============================================================================
// Animated Hero — landing page hero with staggered entrance
// ============================================================================

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

export function AnimatedHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline — fades in from below */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            Vehicle Rentals & Safety Equipment for{" "}
            <span className="text-primary">Nigerian Businesses</span>
          </motion.h1>

          {/* Subtitle — fades in slightly later */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 text-lg text-muted-foreground"
          >
            One platform for daily car rentals and industrial safety gear.
            Serving Lagos, Abuja, and Port Harcourt.
          </motion.p>

          {/* Buttons — fade in last */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row"
          >
            <Link href="/cars">
              <Button size="lg">Rent a Car</Button>
            </Link>
            <Link href="/equipment">
              <Button variant="outline" size="lg">
                Buy Equipment
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
