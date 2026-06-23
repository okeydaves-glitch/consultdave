"use client";

import { motion } from "framer-motion";

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
    <section className="py-20 lg:py-32 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trusted by leading businesses across Nigeria.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="backdrop-blur bg-white/70 rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="font-bold text-[#111111]">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
