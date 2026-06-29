// ============================================================================
// Utility Functions
// ============================================================================
// This file contains small, reusable helper functions used across the app.
// ============================================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() - Merge Tailwind CSS class names
 *
 * Combines clsx (for conditional classes) with tailwind-merge
 * (for resolving conflicting Tailwind classes).
 *
 * Example:
 *   <button className={cn("px-4 py-2", isActive && "bg-blue-500", className)}>
 *
 * If `isActive` is true and `className` is "bg-red-500",
 * the result would be "px-4 py-2 bg-red-500" (tailwind-merge
 * resolves the conflict and keeps the last one).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * formatCurrency() - Format a number as Nigerian Naira
 *
 * Example: formatCurrency(15000) => "₦15,000.00"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * formatDate() - Format a date string for display
 *
 * Example: formatDate("2024-12-25") => "Dec 25, 2024"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * generateOrderNumber() - Create a unique order reference
 *
 * Format: "ORD-" + timestamp + 4 random chars
 * Example: "ORD-1702345678-aB3k"
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * calculateBookingDays() - Calculate number of days between two dates
 *
 * The check-out date is exclusive (if you check in Dec 20 and out Dec 25,
 * that's 5 days).
 */
export function calculateBookingDays(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * CITIES - The cities we operate in
 * Used in dropdowns and filters throughout the app
 */
export const CITIES = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "rivers", label: "Rivers" },
  { value: "imo", label: "Imo" },
] as const;

/**
 * CAR_CATEGORIES - Types of cars available for rent
 */
export const CAR_CATEGORIES = [
  { value: "bus", label: "Bus" },
  { value: "suv", label: "SUV" },
  { value: "truck", label: "Truck" },
] as const;

/**
 * EQUIPMENT_CATEGORIES - Types of safety equipment sold
 */
export const EQUIPMENT_CATEGORIES = [
  { value: "ppe", label: "PPE (Personal Protective Equipment)" },
  { value: "fall_protection", label: "Fall Protection" },
  { value: "respiratory", label: "Respiratory" },
  { value: "head_protection", label: "Head Protection" },
  { value: "eye_protection", label: "Eye Protection" },
  { value: "hand_protection", label: "Hand Protection" },
  { value: "foot_protection", label: "Foot Protection" },
  { value: "hearing_protection", label: "Hearing Protection" },
] as const;

/**
 * BOOKING_STATUSES - Possible states of a car booking
 */
export const BOOKING_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

/**
 * ORDER_STATUSES - Possible states of an equipment order
 */
export const ORDER_STATUSES = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;
