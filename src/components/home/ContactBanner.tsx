"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Globe } from "lucide-react";

export function ContactBanner() {
  return (
    <section className="py-20 lg:py-32 bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#111111] text-white rounded-[40px] p-10 lg:p-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold">Let&apos;s Talk Safety</h2>
              <p className="mt-4 text-lg text-white/60">
                Get in touch for a free consultation and quote. We respond within 24 hours.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-primary transition-colors group"
              >
                <MessageCircle className="h-6 w-6 text-primary group-hover:text-white" />
                <div>
                  <p className="text-xs text-white/60">WhatsApp</p>
                  <p className="text-sm font-semibold">Chat Now</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-primary transition-colors group"
              >
                <Globe className="h-6 w-6 text-primary group-hover:text-white" />
                <div>
                  <p className="text-xs text-white/60">Instagram</p>
                  <p className="text-sm font-semibold">Follow Us</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-primary transition-colors group"
              >
                <Phone className="h-6 w-6 text-primary group-hover:text-white" />
                <div>
                  <p className="text-xs text-white/60">Phone</p>
                  <p className="text-sm font-semibold">+234 800 CONSULT</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-primary transition-colors group"
              >
                <Mail className="h-6 w-6 text-primary group-hover:text-white" />
                <div>
                  <p className="text-xs text-white/60">Email</p>
                  <p className="text-sm font-semibold">hello@consultdave.com</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
