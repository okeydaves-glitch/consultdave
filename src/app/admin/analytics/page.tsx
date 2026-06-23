// ============================================================================
// Admin Analytics Page
// ============================================================================
// Shows business analytics and metrics.
//
// Route: /admin/analytics
// ============================================================================

import { createAdminClient } from "@/lib/supabase/admin";
import { formatCurrency } from "@/lib/utils";

export default async function AdminAnalyticsPage() {
  const supabase = createAdminClient();

  // Fetch aggregate data - select * to avoid type issues with partial selects
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*");

  const { data: orders } = await supabase
    .from("orders")
    .select("*");

  // Calculate totals
  const totalBookingRevenue =
    bookings?.reduce((sum: number, b: any) => sum + Number(b.total_amount), 0) || 0;
  const totalOrderRevenue =
    orders?.reduce((sum: number, o: any) => sum + Number(o.total_amount), 0) || 0;

  const totalBookings = bookings?.length || 0;
  const totalOrders = orders?.length || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Business performance metrics.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Booking Revenue</p>
          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(totalBookingRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Order Revenue</p>
          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(totalOrderRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="mt-2 text-3xl font-bold">{totalBookings}</p>
        </div>
        <div className="rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
        </div>
      </div>

      {/* Revenue breakdown */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Revenue Breakdown</h2>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between rounded-lg border border-border p-4 text-sm">
            <span>Car Rentals (Bookings)</span>
            <span className="font-medium">{formatCurrency(totalBookingRevenue)}</span>
          </div>
          <div className="flex justify-between rounded-lg border border-border p-4 text-sm">
            <span>Equipment Sales (Orders)</span>
            <span className="font-medium">{formatCurrency(totalOrderRevenue)}</span>
          </div>
          <div className="flex justify-between rounded-lg border border-border bg-muted p-4 text-sm font-semibold">
            <span>Total Revenue</span>
            <span>{formatCurrency(totalBookingRevenue + totalOrderRevenue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
