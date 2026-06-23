// ============================================================================
// Animated Section — scroll-triggered reveal
// ============================================================================
// Wraps content with a fade-in + slide-up that triggers when the element
// scrolls into view. Uses IntersectionObserver under the hood via Framer Motion.
//
// Usage:
//   <AnimatedSection delay={0.2}>
//     <YourContent />
//   </AnimatedSection>
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
