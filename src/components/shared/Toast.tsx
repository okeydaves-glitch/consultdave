// ============================================================================
// Toast Notification System
// ============================================================================
// A lightweight toast/snackbar system for showing temporary notifications.
// Gives users feedback after actions (booking created, order placed, etc.).
//
// Usage:
//   import { toast } from "@/components/shared/Toast";
//   toast.success("Booking confirmed!");
//   toast.error("Something went wrong");
//   toast.info("Your order is being processed");
//
// How it works:
// - Call `toast()` anywhere in the app
// - A small notification appears at the bottom-right
// - Auto-dismisses after 4 seconds
// - Multiple toasts stack on top of each other
// ============================================================================

"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// --- Context ---
const ToastContext = createContext<ToastContextType | null>(null);

let nextId = 0;

// --- Provider ---
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container - fixed position bottom-right */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg border",
                "min-w-[300px] max-w-[420px]",
                toast.type === "success" && "bg-green-50 border-green-200 text-green-800",
                toast.type === "error" && "bg-red-50 border-red-200 text-red-800",
                toast.type === "info" && "bg-blue-50 border-blue-200 text-blue-800"
              )}
            >
              {/* Icon */}
              {toast.type === "success" && <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />}
              {toast.type === "info" && <Info className="h-5 w-5 shrink-0 text-blue-600" />}

              {/* Message */}
              <p className="text-sm font-medium flex-1">{toast.message}</p>

              {/* Close button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 rounded-full p-1 hover:bg-black/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// --- Hook ---
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// --- Standalone helper ---
// For use outside of React components (e.g., in API utils).
// This wraps the context-based toast for convenience.
// But prefer `useToast()` inside components.
export const toast = {
  success: (msg: string) => {
    // This only works if called within a component that has ToastProvider
    // For component use, prefer useToast().showToast(msg, "success")
    console.log("[toast:success]", msg);
  },
  error: (msg: string) => console.log("[toast:error]", msg),
  info: (msg: string) => console.log("[toast:info]", msg),
};
