"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-[#f5f5f5] dark:bg-[#1a1a2e] text-[#666666] dark:text-[#999999] hover:bg-[#e8e8e8] dark:hover:bg-[#2a2a3a] transition-all duration-300"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
