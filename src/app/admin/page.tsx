// ============================================================================
// Admin Dashboard Page
// ============================================================================
// Overview of the admin panel with key metrics.
//
// Route: /admin
// ============================================================================

import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminDashboardPage() {
  const supabase = createAdminClient();

  // Fetch counts (using admin client to bypass RLS)
  const { count: totalCars } = await supabase
    .from("cars")
    .select("*", { count: "exact", head: true });

  const { count: totalBookings } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: totalEquipment } = await supabase
    .from("equipment")
    .select("*", { count: "exact", head: true });

  const stats = [
    { label: "Total Cars", value: totalCars || 0 },
    { label: "Total Bookings", value: totalBookings || 0 },
    { label: "Total Orders", value: totalOrders || 0 },
    { label: "Total Equipment", value: totalEquipment || 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of your Consult Dave platform.
      </p>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
