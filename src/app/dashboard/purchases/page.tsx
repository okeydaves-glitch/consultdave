// ============================================================================
// My Purchases Page
// ============================================================================
// Shows all of the user's equipment orders with their status.
//
// Route: /dashboard/purchases
// ============================================================================

import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function PurchasesPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) return null;

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(quantity, unit_price, equipment(name))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">My Purchases</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View your equipment order history.
      </p>

      {orders && orders.length > 0 ? (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Order #{order.order_number}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(Number(order.total_amount))}</p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "paid"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order items */}
              {order.order_items && order.order_items.length > 0 && (
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {order.order_items.map((item: any, i: number) => (
                    <p key={i}>
                      {item.equipment?.name || "Item"} x{item.quantity} —{" "}
                      {formatCurrency(Number(item.subtotal))}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">No purchases found.</p>
      )}
    </div>
  );
}
