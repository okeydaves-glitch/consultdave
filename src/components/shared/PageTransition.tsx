// ============================================================================
// Page Transition Wrapper
// ============================================================================
// Wraps page content with entrance/exit animations.
// Every page in the app gets a subtle fade-in + slide-up when navigated to.
//
// Usage:
//   <PageTransition>
//     <YourPageContent />
//   </PageTransition>
//
// How it works:
// - On mount: content fades in and slides up (400ms)
// - On unmount: content fades out (200ms)
// - Reduced motion users see no animation (respects prefers-reduced-motion)
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
