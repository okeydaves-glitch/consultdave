"use client";

import { motion } from "framer-motion";
import { Shield, Flame, HardHat, MapPin, Car, ClipboardCheck } from "lucide-react";

const services = [
  { icon: ClipboardCheck, title: "Safety Consultancy", description: "Expert advice on workplace safety standards, risk assessments, and compliance for your business." },
  { icon: Flame, title: "Fire Safety Installation", description: "Professional installation of fire extinguishers, alarms, sprinklers, and emergency systems." },
  { icon: HardHat, title: "Equipment Supply", description: "High-quality PPE, safety gear, and industrial equipment for all industries." },
  { icon: MapPin, title: "Site Surveying", description: "Thorough site inspections and hazard identification for construction and industrial sites." },
  { icon: Shield, title: "Safety Training", description: "Hands-on training programs for your team on safety protocols and emergency response." },
  { icon: Car, title: "Car Rentals", description: "Premium daily car rentals for business travel. Sedans, SUVs, and vans available." },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive safety and mobility solutions tailored for Nigerian businesses.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#111111]">{service.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
