// ============================================================================
// Admin Orders Management Page
// ============================================================================
// Lists all equipment orders across all users for admin management.
//
// Route: /admin/orders
// ============================================================================

import { createAdminClient } from "@/lib/supabase/admin";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();

  const { data: rawOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const orders = rawOrders || [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View and manage all equipment orders.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium">Order #</th>
              <th className="text-left py-3 px-2 font-medium">Customer</th>
              <th className="text-left py-3 px-2 font-medium">Date</th>
              <th className="text-right py-3 px-2 font-medium">Amount</th>
              <th className="text-center py-3 px-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2 font-medium">{order.order_number}</td>
                  <td className="py-3 px-2">
                    <p className="font-medium">{order.profiles?.name || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{order.profiles?.email || ""}</p>
                  </td>
                  <td className="py-3 px-2">{formatDate(order.created_at)}</td>
                  <td className="py-3 px-2 text-right">
                    {formatCurrency(Number(order.total_amount))}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
