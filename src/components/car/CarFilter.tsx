// ============================================================================
// Car Filter Component
// ============================================================================
// A sidebar/filter bar for the car listing page.
// Lets users filter cars by: location, category, price range, transmission.
//
// When the user changes a filter, the page URL updates and the
// car list re-fetches with the new filter parameters.
// ============================================================================

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CITIES, CAR_CATEGORIES } from "@/lib/utils";

export function CarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current filter values from the URL
  const currentLocation = searchParams.get("location") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentTransmission = searchParams.get("transmission") || "";

  // Update a filter in the URL without losing other filters
  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when filters change
    params.delete("skip");
    router.push(`/cars?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <label className="text-sm font-medium text-foreground">Location</label>
        <select
          value={currentLocation}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="mt-1 flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
        >
          <option value="">All Cities</option>
          {CITIES.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium text-foreground">Category</label>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="mt-1 flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
        >
          <option value="">All Types</option>
          {CAR_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission Filter */}
      <div>
        <label className="text-sm font-medium text-foreground">Transmission</label>
        <select
          value={currentTransmission}
          onChange={(e) => updateFilter("transmission", e.target.value)}
          className="mt-1 flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
        >
          <option value="">All</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
    </div>
  );
}
