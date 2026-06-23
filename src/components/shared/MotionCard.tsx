// ============================================================================
// Motion Card Wrapper
// ============================================================================
// A motion-enabled card wrapper used in the car and equipment listing pages.
// Cards animate in with a stagger effect and lift on hover.
//
// Usage:
//   <MotionCard>
//     <YourCardContent />
//   </MotionCard>
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { staggerItem, cardHover } from "@/lib/animations";
import type { ReactNode, HTMLAttributes } from "react";

interface MotionCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: "div" | "a" | "link";
  href?: string;
}

export function MotionCard({ children, className, ...props }: MotionCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={cardHover}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
