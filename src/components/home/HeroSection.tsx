"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-20 lg:py-0">
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-tight"
            >
              Your Most Reliable{" "}
              <span className="text-primary">Safety Consultant</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Comprehensive safety solutions, fire protection, equipment supply, and premium car rentals for businesses across Nigeria.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-[#111111] text-[#111111] font-semibold text-sm hover:bg-[#111111] hover:text-white transition-all duration-300"
              >
                Explore Rentals
              </Link>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] rounded-[100px] bg-primary/10 blur-3xl" />
            <div className="absolute w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-[80px] bg-primary/5 blur-2xl translate-x-10 translate-y-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 w-full max-w-lg aspect-[4/3] rounded-[40px] bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden shadow-2xl"
            >
              <div className="w-full h-full flex items-center justify-center text-primary/40">
                <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
