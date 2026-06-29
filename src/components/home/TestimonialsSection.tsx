"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chidi Okafor",
    company: "Okafor Construction Ltd",
    text: "Consult Dave handled our fire safety installation across three sites. Professional, thorough, and on time. Highly recommended.",
  },
  {
    name: "Amara Nwosu",
    company: "Nwosu Logistics",
    text: "The car rental service is exceptional. Clean vehicles, prompt delivery, and excellent customer service every time.",
  },
  {
    name: "Tunde Balogun",
    company: "Balogun Industries",
    text: "We rely on Consult Dave for all our PPE and safety equipment. Quality products, fair pricing, and fast delivery.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--section-alt)] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
           transition={{ duration: 0.35 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Trusted by leading businesses across Nigeria.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
               transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl p-6 lg:p-8 shadow-lg bg-[var(--card)] hover:shadow-xl transition-all duration-200 relative flex flex-col"
            >
              <Quote className="h-8 w-8 text-[var(--primary)]/20 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--muted-foreground)] leading-relaxed flex-1">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="mt-6 pt-6">
                <p className="font-bold text-[var(--foreground)]">{testimonial.name}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
