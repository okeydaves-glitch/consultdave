"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThumbsUp, ShieldCheck } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { Logo } from "@/components/shared/Logo";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--hero-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)] py-16 lg:py-0">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-6"
            >
              <Logo size="lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-semibold text-[var(--primary)] mb-6"
            >
              <ShieldCheck className="h-4 w-4" />
              Trusted Across Nigeria
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] leading-[1.1] tracking-tight"
            >
              Your Most Reliable{" "}
              <span className="text-[var(--primary)]">Safety Consultant</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-lg"
            >
              Comprehensive safety solutions, fire protection, equipment supply, and premium car rentals for businesses across Nigeria.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-[var(--secondary)] text-white font-bold text-sm hover:bg-[var(--primary)] transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
              >
                <ThumbsUp className="h-5 w-5" />
                Book Now!
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-[var(--secondary)] text-[var(--secondary)] font-bold text-sm hover:bg-[var(--secondary)] hover:text-white transition-all duration-200 dark:border-[var(--primary)] dark:text-[var(--primary)] dark:hover:bg-[var(--primary)]"
              >
                Explore Rentals
              </Link>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[650px] lg:h-[650px] rounded-[100px] bg-[var(--primary)]/10 blur-3xl -top-10 -right-10" />
            <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] rounded-[80px] bg-[var(--primary)]/5 blur-2xl translate-x-16 translate-y-16" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 w-full max-w-xl aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl rotate-[2deg] lg:rotate-[3deg]"
              style={{
                background: "linear-gradient(135deg, #ede7ff 0%, #ddd5f5 100%)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-40 h-40 text-[var(--primary)]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <WaveDivider color="var(--section-alt)" />
    </section>
  );
}
