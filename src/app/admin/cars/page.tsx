// ============================================================================
// Admin Cars Management Page
// ============================================================================
// Lists all cars with options to add, edit, or delete.
// Only accessible by admin users.
//
// Route: /admin/cars
// ============================================================================

import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Button } from "@/components/shared/Button";
import { formatCurrency } from "@/lib/utils";

export default async function AdminCarsPage() {
  const supabase = createAdminClient();
  const { data: rawCars } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  const cars = rawCars || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cars</h1>
          <p className="text-sm text-muted-foreground">
            Manage your vehicle inventory.
          </p>
        </div>
        <Link href="/admin/cars/new">
          <Button variant="primary">Add Car</Button>
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium">Name</th>
              <th className="text-left py-3 px-2 font-medium">Location</th>
              <th className="text-left py-3 px-2 font-medium">Category</th>
              <th className="text-right py-3 px-2 font-medium">Daily Price</th>
              <th className="text-center py-3 px-2 font-medium">Available</th>
              <th className="text-right py-3 px-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car: any) => (
                <tr key={car.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 font-medium">{car.name}</td>
                  <td className="py-3 px-2 capitalize">{car.location?.replace("_", " ")}</td>
                  <td className="py-3 px-2 capitalize">{car.category}</td>
                  <td className="py-3 px-2 text-right">{formatCurrency(Number(car.daily_price))}</td>
                  <td className="py-3 px-2 text-center">
                    {car.is_available ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      className="text-primary hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No cars yet. Add your first car.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
