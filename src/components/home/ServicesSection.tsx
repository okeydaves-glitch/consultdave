"use client";

import { motion } from "framer-motion";
import { Shield, Flame, HardHat, MapPin, Car, ClipboardCheck } from "lucide-react";
import { WaveDividerNavy } from "@/components/shared/WaveDivider";

const services = [
  { icon: ClipboardCheck, title: "Safety Consultancy", description: "Expert advice on workplace safety standards, risk assessments, and compliance for your business." },
  { icon: Flame, title: "Fire Safety Installation", description: "Professional installation of fire extinguishers, alarms, sprinklers, and emergency systems." },
  { icon: HardHat, title: "Equipment Supply", description: "High-quality PPE, safety gear, and industrial equipment for all industries." },
  { icon: MapPin, title: "Site Surveying", description: "Thorough site inspections and hazard identification for construction and industrial sites." },
  { icon: Shield, title: "Safety Training", description: "Hands-on training programs for your team on safety protocols and emergency response." },
  { icon: Car, title: "Car Rentals", description: "Premium daily car rentals for business travel. Buses, SUVs, and trucks available." },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-20 lg:py-32 bg-[var(--section-alt)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
           transition={{ duration: 0.35 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">What We Offer</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">Our Services</h2>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Comprehensive safety and mobility solutions tailored for Nigerian businesses.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
               transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl p-8 transition-all duration-200 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
                boxShadow: "0 20px 60px rgba(26, 26, 46, 0.3)",
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/20 group-hover:bg-[var(--primary)] transition-all duration-200 shrink-0">
                <service.icon className="h-7 w-7 text-[var(--primary)] group-hover:text-white transition-colors duration-200" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{service.title}</h3>
              <p className="mt-2 text-white/60 leading-relaxed flex-1">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <WaveDividerNavy position="bottom" color="#0f0f1a" />
    </section>
  );
}
