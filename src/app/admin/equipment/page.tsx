// ============================================================================
// Admin Equipment Management Page
// ============================================================================
// Lists all equipment items with options to add, edit, or delete.
//
// Route: /admin/equipment
// ============================================================================

import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Button } from "@/components/shared/Button";
import { formatCurrency } from "@/lib/utils";

export default async function AdminEquipmentPage() {
  const supabase = createAdminClient();
  const { data: rawEquipment } = await supabase
    .from("equipment")
    .select("*")
    .order("created_at", { ascending: false });

  const equipment = rawEquipment || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Equipment</h1>
          <p className="text-sm text-muted-foreground">
            Manage your safety equipment inventory.
          </p>
        </div>
        <Link href="/admin/equipment/new">
          <Button variant="primary">Add Equipment</Button>
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium">Name</th>
              <th className="text-left py-3 px-2 font-medium">Category</th>
              <th className="text-right py-3 px-2 font-medium">Price</th>
              <th className="text-right py-3 px-2 font-medium">In Stock</th>
              <th className="text-right py-3 px-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipment.length > 0 ? (
              equipment.map((item: any) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 font-medium">{item.name}</td>
                  <td className="py-3 px-2 capitalize">{item.category?.replace(/_/g, " ")}</td>
                  <td className="py-3 px-2 text-right">{formatCurrency(Number(item.price))}</td>
                  <td className="py-3 px-2 text-right">{item.quantity_available}</td>
                  <td className="py-3 px-2 text-right">
                    <Link
                      href={`/admin/equipment/${item.id}/edit`}
                      className="text-primary hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No equipment yet. Add your first item.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
