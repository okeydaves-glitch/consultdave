// ============================================================================
// Input Component
// ============================================================================
// A reusable form input with label and error message support.
// Works with React Hook Form via the `register` prop or standard HTML.
//
// Usage with React Hook Form:
//   <Input
//     label="Email"
//     {...register("email")}
//     error={errors.email?.message}
//   />
//
// Usage without React Hook Form:
//   <Input
//     label="Full Name"
//     value={name}
//     onChange={(e) => setName(e.target.value)}
//   />
// ============================================================================

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;       // Optional label shown above the input
  error?: string;       // Error message shown below the input (red text)
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    // Generate an ID if none provided (used by the label's "htmlFor" attribute)
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1">
        {/* Label - only shown if the `label` prop is provided */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        {/* The actual input element */}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            // Base styles
            "flex h-10 w-full rounded-lg border px-3 py-2 text-sm",
            "bg-background text-foreground",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",

            // Border color changes to red if there's an error
            error ? "border-destructive" : "border-border",

            className
          )}
          {...props}
        />

        {/* Error message - only shown if the `error` prop is provided */}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
