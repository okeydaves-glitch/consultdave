// ============================================================================
// Equipment Filter Component
// ============================================================================
// Filter sidebar for the equipment listing page.
// Lets users filter by category and search by name.
// ============================================================================

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { EQUIPMENT_CATEGORIES } from "@/lib/utils";
import { useState } from "react";

export function EquipmentFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const currentCategory = searchParams.get("category") || "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("skip");
    router.push(`/equipment?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateFilter("search", search);
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch}>
        <label className="text-sm font-medium text-foreground">Search</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equipment..."
            className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          />
          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-3 text-sm text-primary-foreground"
          >
            Go
          </button>
        </div>
      </form>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium text-foreground">Category</label>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="mt-1 flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
        >
          <option value="">All Categories</option>
          {EQUIPMENT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
