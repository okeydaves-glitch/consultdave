"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Globe, ThumbsUp } from "lucide-react";

export function ContactBanner() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--hero-bg)] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
           transition={{ duration: 0.35 }}
          className="rounded-[40px] p-6 sm:p-10 lg:p-16 relative overflow-hidden"
          style={{
            background: "var(--card-gradient)",
            boxShadow: "var(--card-gradient-shadow)",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5555ff]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5555ff]/5 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">
                Let&apos;s Talk Safety
              </h2>
              <p className="mt-4 text-lg text-[var(--muted-foreground)]">
                Get in touch for a free consultation and quote. We respond within 24 hours.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.15 }}
                className="mt-8"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary)]/80 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                >
                  <ThumbsUp className="h-5 w-5" />
                  Book a Consultation
                </a>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl p-4 sm:p-6 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 sm:gap-3"
                style={{ background: "var(--card-subtle)" }}
              >
                <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#25D366]/20 group-hover:bg-[#25D366] transition-all duration-200">
                  <MessageCircle className="h-5 w-5 sm:h-7 sm:w-7 text-[#25D366] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted-foreground)]">WhatsApp</p>
                  <p className="text-sm sm:text-base font-bold text-[var(--foreground)]">Chat Now</p>
                </div>
              </motion.a>
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="group rounded-2xl p-4 sm:p-6 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 sm:gap-3"
                style={{ background: "var(--card-subtle)" }}
              >
                <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#E4405F]/20 group-hover:bg-[#E4405F] transition-all duration-200">
                  <Globe className="h-5 w-5 sm:h-7 sm:w-7 text-[#E4405F] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted-foreground)]">Instagram</p>
                  <p className="text-sm sm:text-base font-bold text-[var(--foreground)] break-all">@consultdave</p>
                </div>
              </motion.a>
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="group rounded-2xl p-4 sm:p-6 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 sm:gap-3"
                style={{ background: "var(--card-subtle)" }}
              >
                <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/20 group-hover:bg-[var(--primary)] transition-all duration-200">
                  <Phone className="h-5 w-5 sm:h-7 sm:w-7 text-[var(--primary)] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted-foreground)]">Phone</p>
                  <p className="text-sm sm:text-base font-bold text-[var(--foreground)]">+234 800 CONSULT</p>
                </div>
              </motion.a>
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="group rounded-2xl p-4 sm:p-6 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 sm:gap-3"
                style={{ background: "var(--card-subtle)" }}
              >
                <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/20 group-hover:bg-[var(--primary)] transition-all duration-200">
                  <Mail className="h-5 w-5 sm:h-7 sm:w-7 text-[var(--primary)] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted-foreground)]">Email</p>
                  <p className="text-sm sm:text-base font-bold text-[var(--foreground)] break-all">hello@consultdave.com</p>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
