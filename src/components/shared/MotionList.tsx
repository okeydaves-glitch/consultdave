// ============================================================================
// Motion List — stagger animation container for card grids
// ============================================================================
// Wraps a list of items with a stagger animation.
// Each child item will animate in one after another.
//
// Usage:
//   <MotionList>
//     <div className="grid grid-cols-3 gap-4">
//       {items.map(item => <YourCard key={item.id} />)}
//     </div>
//   </MotionList>
//
// YourCard should have variants={staggerItem} or use <MotionCard>
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import type { ReactNode } from "react";

interface MotionListProps {
  children: ReactNode;
}

export function MotionList({ children }: MotionListProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
