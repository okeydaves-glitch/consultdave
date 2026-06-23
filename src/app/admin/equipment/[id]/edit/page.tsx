// ============================================================================
// Admin Edit Equipment Page
// ============================================================================
// Form to edit existing safety equipment.
//
// Route: /admin/equipment/[id]/edit
// ============================================================================

import { createAdminClient } from "@/lib/supabase/admin";
import { EQUIPMENT_CATEGORIES } from "@/lib/utils";
import { notFound } from "next/navigation";

interface EditEquipmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditEquipmentPage({ params }: EditEquipmentPageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: rawItem } = await supabase
    .from("equipment")
    .select("*")
    .eq("id", id)
    .single();

  const item = rawItem as any;

  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Equipment: {item.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update product details.</p>

      <form className="mt-6 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Product Name</label>
            <input
              type="text"
              defaultValue={item.name}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select
              defaultValue={item.category}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
              {EQUIPMENT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Price (₦)</label>
            <input
              type="number"
              defaultValue={Number(item.price)}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Quantity Available</label>
            <input
              type="number"
              defaultValue={item.quantity_available}
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            />
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
