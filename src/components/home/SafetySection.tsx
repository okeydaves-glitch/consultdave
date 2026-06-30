"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThumbsUp, HardHat, Flame, Shield, MapPin, ClipboardCheck, Star, Car } from "lucide-react";

const safetyFeatures = [
  { icon: HardHat, label: "PPE & Gear", desc: "Helmets, gloves, vests & more" },
  { icon: Flame, label: "Fire Equipment", desc: "Extinguishers, alarms, sprinklers" },
  { icon: ClipboardCheck, label: "Safety Training", desc: "Hands-on emergency response" },
  { icon: MapPin, label: "Site Surveying", desc: "Hazard identification & audits" },
];

export function SafetySection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-section-gradient">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-20 left-40 w-96 h-96 rounded-full bg-[var(--primary)] blur-3xl" />
        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-[var(--primary)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Safety Equipment</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">
              Industrial Safety Solutions
            </h2>
            <p className="mt-4 text-lg text-[var(--muted-foreground)]">
              From PPE to fire suppression systems — equip your workplace with certified safety gear trusted by Nigerian industries.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {safetyFeatures.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-2xl p-3 sm:p-4 transition-all duration-200 bg-card-subtle"
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
                href="/equipment"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary)]/80 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
              >
                <ThumbsUp className="h-5 w-5" />
                Shop Equipment
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-[var(--border)] text-[var(--foreground)] font-bold text-sm hover:bg-[var(--muted)] transition-all duration-200"
              >
                Request Consultation
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.3 }}
              className="mt-6 pt-6 border-t border-[var(--border)]"
            >
              <Link href="/cars" className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 text-sm">
                <Car className="h-4 w-4" />
                Need a vehicle too? Browse our rental fleet &rarr;
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="order-first lg:order-last"
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-64 h-64 rounded-full bg-[var(--primary)]/5 blur-3xl" />
              <div
                className="relative z-10 w-full aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl bg-card-gradient"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <HardHat className="w-48 h-48 text-[var(--primary)]/25" strokeWidth={1} />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.15 }}
                className="absolute bottom-0 left-0 rounded-2xl bg-[var(--primary)] px-4 sm:px-5 py-2 sm:py-3 shadow-xl"
              >
                <p className="text-[var(--primary-foreground)] text-sm font-bold">Certified Gear</p>
                <p className="text-[var(--primary-foreground)]/60 text-xs">International Standards</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.25 }}
                className="absolute top-4 right-4 rounded-2xl bg-[var(--card)]/80 backdrop-blur px-4 py-2 border border-[var(--border)]"
              >
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-white/80 font-semibold">ISO Certified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
