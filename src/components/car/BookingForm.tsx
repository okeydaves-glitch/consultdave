// ============================================================================
// Booking Form Component
// ============================================================================
// The form users fill out to book a car rental.
// Collects: check-in date, check-out date, pickup location, insurance choice.
//
// Validates that:
// - Check-out is after check-in
// - Dates are in the future (not today or earlier)
// - Pickup location is selected
//
// On submit, calls the API to create a booking and get a payment URL.
// ============================================================================

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { calculateBookingDays, formatCurrency, CITIES } from "@/lib/utils";
import { useCreateBooking } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/shared/Toast";
import type { Car } from "@/lib/supabase/types";

// Define the form validation rules with Zod
// Zod lets us specify: field types, required/optional, custom validation
const bookingSchema = z
  .object({
    checkInDate: z
      .string()
      .min(1, "Check-in date is required")
      .refine(
        (val) => new Date(val) > new Date(),
        "Check-in must be in the future"
      ),
    checkOutDate: z
      .string()
      .min(1, "Check-out date is required"),
    pickupLocation: z.string().min(1, "Pickup location is required"),
    insuranceSelected: z.boolean(),
  })
  .refine(
    (data) => new Date(data.checkOutDate) > new Date(data.checkInDate),
    {
      message: "Check-out must be after check-in",
      path: ["checkOutDate"],
    }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  car: Car;
}

export function BookingForm({ car }: BookingFormProps) {
  const router = useRouter();
  const createBooking = useCreateBooking();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      insuranceSelected: false,
      pickupLocation: "",
    },
  });

  // Watch the dates and insurance values to show a live price estimate
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");
  const insuranceSelected = watch("insuranceSelected");

  // Calculate price estimate
  let numDays = 0;
  if (checkInDate && checkOutDate) {
    numDays = calculateBookingDays(checkInDate, checkOutDate);
  }
  const rentalCost = numDays * Number(car.daily_price);
  const insuranceCost = insuranceSelected ? numDays * 2000 : 0; // ₦2,000/day for insurance
  const totalCost = rentalCost + insuranceCost;

  async function onSubmit(data: BookingFormData) {
    try {
      const result = await createBooking.mutateAsync({
        carId: car.id,
        ...data,
      });

      // After booking is created, redirect to the payment page
      showToast("Booking created! Redirecting to payment...", "success");

      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        router.push(`/dashboard/rentals`);
      }
    } catch (error: any) {
      showToast(error?.message || "Failed to create booking", "error");
      console.error("Booking failed:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold">Book This Car</h3>

      {/* Check-in Date */}
      <Input
        label="Check-in Date"
        type="date"
        error={errors.checkInDate?.message}
        {...register("checkInDate")}
      />

      {/* Check-out Date */}
      <Input
        label="Check-out Date"
        type="date"
        error={errors.checkOutDate?.message}
        {...register("checkOutDate")}
      />

      {/* Pickup Location */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          Pickup Location
        </label>
        <select
          className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          {...register("pickupLocation")}
        >
          <option value="">Select a city</option>
          {CITIES.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
        {errors.pickupLocation && (
          <p className="text-sm text-destructive">
            {errors.pickupLocation.message}
          </p>
        )}
      </div>

      {/* Insurance Toggle */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          {...register("insuranceSelected")}
          className="rounded border-border"
        />
        Add insurance (₦2,000/day)
      </label>

      {/* Price Summary */}
      {numDays > 0 && (
        <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>
              {formatCurrency(Number(car.daily_price))} x {numDays} day
              {numDays > 1 ? "s" : ""}
            </span>
            <span>{formatCurrency(rentalCost)}</span>
          </div>
          {insuranceSelected && (
            <div className="flex justify-between">
              <span>Insurance</span>
              <span>{formatCurrency(insuranceCost)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold border-t border-border pt-2">
            <span>Total</span>
            <span>{formatCurrency(totalCost)}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={createBooking.isPending}
      >
        {createBooking.isPending ? "Processing..." : "Book Now"}
      </Button>

      {createBooking.isError && (
        <p className="text-sm text-destructive">
          {createBooking.error?.message || "Failed to create booking"}
        </p>
      )}
    </form>
  );
}
