"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WaveDividerNavy } from "@/components/shared/WaveDivider";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support", prefix: "" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 50);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{prefix}{count}{suffix}</span>;
}

export function StatisticsSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0f0f1a 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#5555ff] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-[#5555ff] blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
               transition={{ duration: 0.35, delay: index * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
              </div>
              <p className="mt-2 text-white/60 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <WaveDividerNavy position="top" color="var(--section-alt)" flip />
    </section>
  );
}
