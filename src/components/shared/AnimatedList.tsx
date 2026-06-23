// ============================================================================
// Animated List Item — for dashboard/admin row animations
// ============================================================================
// Wraps a single list item with a fade-in + slide-up animation.
// Works with any list of items, animating them as they appear.
// ============================================================================

"use client";

import { motion } from "framer-motion";

interface AnimatedListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedListItem({ children, className }: AnimatedListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
