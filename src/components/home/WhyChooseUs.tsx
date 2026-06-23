"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Fast Response Times",
  "Experienced Technicians",
  "Safety Focused Approach",
  "Transparent Pricing",
  "Nationwide Coverage",
  "Certified Equipment",
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-32 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]">Why Choose Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We bring decades of combined experience in safety consultancy and service delivery. Our team is committed to protecting what matters most.
            </p>

            <div className="mt-10 space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-[#111111]">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-8 -left-8 w-64 h-64 rounded-[60px] bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-[40px] bg-secondary/10 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="rounded-[40px] bg-gradient-to-br from-primary/20 to-primary/5 aspect-square overflow-hidden shadow-xl" />
              <div className="rounded-[40px] bg-gradient-to-br from-secondary/20 to-secondary/5 aspect-square overflow-hidden shadow-xl mt-8" />
              <div className="rounded-[40px] bg-gradient-to-br from-primary/10 to-secondary/10 aspect-square overflow-hidden shadow-xl -mt-8" />
              <div className="rounded-[40px] bg-gradient-to-br from-secondary/10 to-primary/10 aspect-square overflow-hidden shadow-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
