"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Award, Users, TrendingUp, Clock, HeadphonesIcon } from "lucide-react";

const benefits = [
  { icon: Zap, text: "Fast Response Times", desc: "We respond within 24 hours guaranteed." },
  { icon: Award, text: "Experienced Technicians", desc: "Certified professionals with years of field experience." },
  { icon: Users, text: "Safety Focused Approach", desc: "Every solution prioritizes your safety first." },
  { icon: TrendingUp, text: "Transparent Pricing", desc: "No hidden fees. Clear quotes upfront." },
  { icon: Clock, text: "Nationwide Coverage", desc: "Lagos, Abuja, Rivers, Imo & beyond." },
  { icon: HeadphonesIcon, text: "Certified Equipment", desc: "All equipment meets international safety standards." },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-32 bg-[var(--section-alt)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Why Trust Us</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">Why Choose Us</h2>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            We bring decades of combined experience in safety consultancy and service delivery across Nigeria.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl p-8 transition-all duration-200 flex flex-col bg-card-gradient shadow-card-gradient"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/20 group-hover:bg-[var(--primary)] transition-all duration-200 shrink-0">
                <benefit.icon className="h-7 w-7 text-[var(--primary)] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[var(--foreground)]">{benefit.text}</h3>
              <p className="mt-2 text-[var(--muted-foreground)] leading-relaxed flex-1">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
