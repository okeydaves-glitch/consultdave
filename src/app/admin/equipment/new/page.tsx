// ============================================================================
// Admin Add Equipment Page
// ============================================================================
// Form to add new safety equipment to the inventory.
//
// Route: /admin/equipment/new
// ============================================================================

import { EQUIPMENT_CATEGORIES } from "@/lib/utils";

export default function AdminAddEquipmentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Equipment</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a new safety product to the store.
      </p>

      <form className="mt-6 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Product Name</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm">
              {EQUIPMENT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Price (₦)</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Quantity Available</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Manufacturer */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Manufacturer</label>
            <input
              type="text"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>

          {/* Warranty */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Warranty (months)</label>
            <input
              type="number"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={3}
            className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="h-10 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Save Equipment
        </button>
      </form>
    </div>
  );
}
