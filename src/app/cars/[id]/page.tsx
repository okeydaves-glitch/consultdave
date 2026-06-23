// ============================================================================
// Car Detail Page
// ============================================================================
// Shows full details of a single car.
// Users can see specs, images, features, and use the booking form.
//
// Route: /cars/[id]
// ============================================================================

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { BookingForm } from "@/components/car/BookingForm";
import { Car, Users, Fuel, Gauge, Calendar } from "lucide-react";
import type { Car as CarType } from "@/lib/supabase/types";

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the car by ID
  const { data: car } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (!car) {
    notFound();
  }

  const typedCar = car as CarType;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left: Car Details */}
        <div>
          {/* Car Image Gallery */}
          <div className="aspect-[16/9] rounded-xl bg-muted overflow-hidden">
            {typedCar.images?.[0] ? (
              <img
                src={typedCar.images[0]}
                alt={typedCar.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Car className="h-16 w-16 text-muted-foreground/40" />
              </div>
            )}
          </div>

          {/* Car Title & Price */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold">{typedCar.name}</h1>
            <p className="mt-2 text-2xl font-bold text-primary">
              {formatCurrency(Number(typedCar.daily_price))}
              <span className="text-sm font-normal text-muted-foreground"> / day</span>
            </p>
          </div>

          {/* Specs Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-4 text-center">
              <Users className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-sm font-medium">{typedCar.seats} Seats</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <Gauge className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-sm font-medium capitalize">{typedCar.transmission}</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <Fuel className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-sm font-medium capitalize">{typedCar.fuel_type}</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <Calendar className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-sm font-medium">{typedCar.year}</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <Car className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-sm font-medium">{typedCar.mileage.toLocaleString()} km</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <span className="text-sm font-medium capitalize">
                {typedCar.location.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Features */}
          {typedCar.features && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Features</h2>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                {Object.entries(typedCar.features as Record<string, boolean>).map(
                  ([key, value]) =>
                    value && (
                      <li key={key} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Booking Form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border p-6">
            <BookingForm car={typedCar} />
          </div>
        </div>
      </div>
    </div>
  );
}
