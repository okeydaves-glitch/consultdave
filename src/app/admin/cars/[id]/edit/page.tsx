// ============================================================================
// Admin Edit Car Page
// ============================================================================
// Form to edit an existing car in the inventory.
//
// Route: /admin/cars/[id]/edit
// ============================================================================

import { createAdminClient } from "@/lib/supabase/admin";
import { CITIES, CAR_CATEGORIES, formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditCarPage({ params }: EditCarPageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: rawCar } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  const car = rawCar as any;

  if (!car) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Car: {car.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Update car details. Current price: {formatCurrency(Number(car.daily_price))}/day
      </p>

      <form className="mt-6 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Car Name</label>
            <input
              type="text"
              defaultValue={car.name}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select
              defaultValue={car.category}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
              {CAR_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Daily Price (₦)</label>
            <input
              type="number"
              defaultValue={Number(car.daily_price)}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Location</label>
            <select
              defaultValue={car.location}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>{city.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Available</label>
            <select
              defaultValue={car.is_available ? "true" : "false"}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="h-10 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
