"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CarRentalShowcase() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]">
              Experience Luxury On Wheels
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Premium vehicles for your business travel. From executive sedans to spacious SUVs, drive in comfort and style.
            </p>
            <ul className="mt-8 space-y-3">
              {["Executive Sedans", "Luxury SUVs", "Commercial Vans", "Chauffeur Service"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/cars"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-[500px] h-[400px] rounded-[100px] bg-primary/10 blur-3xl" />
            <div className="absolute w-[400px] h-[300px] rounded-[80px] bg-secondary/5 blur-2xl translate-x-8 translate-y-8" />
            <div className="relative z-10 w-full max-w-lg aspect-[4/3] rounded-[60px] bg-gradient-to-br from-primary/15 to-secondary/15 overflow-hidden shadow-2xl flex items-center justify-center">
              <svg className="w-40 h-40 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
