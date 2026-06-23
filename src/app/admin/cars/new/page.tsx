// ============================================================================
// Admin Add Car Page
// ============================================================================
// Form to add a new car to the inventory.
//
// Route: /admin/cars/new
// ============================================================================

import { CITIES, CAR_CATEGORIES } from "@/lib/utils";

export default function AdminAddCarPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Car</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a new vehicle to the rental fleet.
      </p>

      <form className="mt-6 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Car Name</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              placeholder="e.g., Toyota Camry"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
              {CAR_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Year</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Mileage */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Mileage (km)</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Fuel Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Fuel Type</label>
            <select className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Transmission */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Transmission</label>
            <select className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          {/* Seats */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Seats</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Daily Price */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Daily Price (₦)</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Location</label>
            <select className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-10 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Save Car
        </button>
      </form>
    </div>
  );
}
