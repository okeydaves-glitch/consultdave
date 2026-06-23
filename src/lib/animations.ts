// ============================================================================
// Animation Variants & Utilities
// ============================================================================
// Reusable Framer Motion animation variants for consistent animations
// across the entire app.
//
// Using variants means we define the animation once and apply it everywhere.
// ============================================================================

import { type Variants } from "framer-motion";

// ============================================================================
// Page Transition
// ============================================================================
// Wraps page content with a fade-in + slight slide-up on mount.
// Gives a polished feel when navigating between pages.
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth feel
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// Stagger Container
// ============================================================================
// For lists of items that should animate in one after another.
// Use as the parent `variants` prop, and each child uses `item`.
//
// Example:
//   <motion.div variants={staggerContainer} initial="hidden" animate="visible">
//     {items.map(item => (
//       <motion.div key={item.id} variants={staggerItem}>
//         {item.name}
//       </motion.div>
//     ))}
//   </motion.div>
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================================================
// Fade In (simple)
// ============================================================================
// Just fades in without moving — good for images, backgrounds.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// ============================================================================
// Slide Up
// ============================================================================
// Fades in while sliding up — good for section headers.
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ============================================================================
// Scale In
// ============================================================================
// Pops in with a subtle scale — good for modals, cards.
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ============================================================================
// Button Hover/Tap
// ============================================================================
// Used directly on buttons with whileHover and whileTap.
export const buttonTap = { scale: 0.97 };
export const buttonHover = { scale: 1.02 };

// ============================================================================
// Card Hover
// ============================================================================
// Subtle lift effect when hovering cards.
export const cardHover = {
  y: -4,
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  transition: { duration: 0.2, ease: "easeOut" },
};
