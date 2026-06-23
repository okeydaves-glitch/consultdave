// ============================================================================
// Button Component — with CSS press/hover animation
// ============================================================================
// Uses CSS transforms for smooth hover/press feedback instead of Framer Motion.
// This is lighter-weight and avoids type conflicts with motion.button.
//
// Effects:
// - hover: slightly larger (scale 1.02)
// - active/press: slightly smaller (scale 0.97)
// - All transitions are smooth (200ms ease-out)
// ============================================================================

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-all duration-200 ease-out",
          "hover:scale-[1.02] active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100",
          "select-none",

          size === "sm" && "h-8 px-3 text-sm",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-6 text-base",

          variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === "secondary" && "bg-muted text-foreground hover:bg-muted/80",
          variant === "outline" && "border border-border bg-transparent hover:bg-muted",
          variant === "ghost" && "hover:bg-muted",
          variant === "danger" && "bg-destructive text-white hover:bg-destructive/90",

          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
