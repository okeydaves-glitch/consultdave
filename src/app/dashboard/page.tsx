// ============================================================================
// Dashboard Overview Page
// ============================================================================
// Shows a summary of the user's account: recent bookings, orders, etc.
//
// Route: /dashboard
// ============================================================================

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get current user's session
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null; // AuthGuard will handle this
  }

  // Fetch user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // Fetch recent bookings
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("*, cars(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome, {profile?.name || session?.user?.email}
        </h1>
        <p className="text-muted-foreground">Here is your account overview.</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/cars">
          <Button variant="primary">Rent a Car</Button>
        </Link>
        <Link href="/equipment">
          <Button variant="outline">Buy Equipment</Button>
        </Link>
      </div>

      {/* Recent Bookings */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Rentals</h2>
          <Link href="/dashboard/rentals" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        {recentBookings && recentBookings.length > 0 ? (
          <div className="mt-4 space-y-2">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 text-sm"
              >
                <div>
                  <p className="font-medium">{booking.cars?.name || "Car"}</p>
                  <p className="text-muted-foreground">
                    {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(Number(booking.total_amount))}</p>
                  <span className="text-xs capitalize text-muted-foreground">{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No rentals yet.{" "}
            <Link href="/cars" className="text-primary hover:underline">
              Rent a car
            </Link>
          </p>
        )}
      </section>

      {/* Recent Orders */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Purchases</h2>
          <Link href="/dashboard/purchases" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="mt-4 space-y-2">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 text-sm"
              >
                <div>
                  <p className="font-medium">Order #{order.order_number}</p>
                  <p className="text-muted-foreground">{formatDate(order.created_at)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(Number(order.total_amount))}</p>
                  <span className="text-xs capitalize text-muted-foreground">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No purchases yet.{" "}
            <Link href="/equipment" className="text-primary hover:underline">
              Buy equipment
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
