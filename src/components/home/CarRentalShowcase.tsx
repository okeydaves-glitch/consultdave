"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThumbsUp, Car, Users, Gauge, ShieldCheck, Star, HardHat } from "lucide-react";

const features = [
  { icon: Car, label: "Premium Cars", desc: "Buses, SUVs, trucks & more" },
  { icon: Users, label: "Corporate Travel", desc: "Business & group bookings" },
  { icon: Gauge, label: "Well Maintained", desc: "Regular safety inspections" },
  { icon: ShieldCheck, label: "Fully Insured", desc: "Comprehensive coverage" },
];

export function CarRentalShowcase() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: "var(--section-gradient-reverse)" }}>
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-40 right-40 w-96 h-96 rounded-full bg-[var(--primary)] blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-[var(--primary)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 rounded-full bg-[var(--primary)]/5 blur-3xl" />
              <div
                className="relative z-10 w-full aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #ede7ff 0%, #ddd5f5 100%)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-48 h-48 text-[var(--primary)]/25" strokeWidth={1} />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.15 }}
                className="absolute bottom-0 right-0 rounded-2xl bg-[var(--primary)] px-4 sm:px-5 py-2 sm:py-3 shadow-xl"
              >
                <p className="text-[var(--primary-foreground)] text-sm font-bold">50+ Vehicles</p>
                <p className="text-[var(--primary-foreground)]/60 text-xs">Available Nationwide</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.25 }}
                className="absolute top-4 left-4 rounded-2xl bg-[var(--card)]/80 backdrop-blur px-4 py-2 border border-[var(--border)]"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Premium Fleet</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">
              Experience Luxury On Wheels
            </h2>
            <p className="mt-4 text-lg text-[var(--muted-foreground)]">
              Premium vehicles for your business travel. From luxury cars to spacious SUVs and buses, drive in comfort and style.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {features.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-2xl p-3 sm:p-4 transition-all duration-200" style={{ background: "var(--card-subtle)" }}
                >
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[var(--primary)]/20 group-hover:bg-[var(--primary)] transition-all duration-200 shrink-0">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-[var(--foreground)]">{item.label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/cars"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary)]/80 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
              >
                <ThumbsUp className="h-5 w-5" />
                Book Now!
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-[var(--border)] text-[var(--foreground)] font-bold text-sm hover:bg-[var(--muted)] transition-all duration-200"
              >
                Request a Quote
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.3 }}
              className="mt-6 pt-6 border-t border-[var(--border)]"
            >
              <Link href="/equipment" className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 text-sm">
                <HardHat className="h-4 w-4" />
                Also need safety equipment? Browse our industrial safety shop &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
