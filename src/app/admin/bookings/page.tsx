// ============================================================================
// Admin Bookings Management Page
// ============================================================================
// Lists all bookings across all users for admin management.
//
// Route: /admin/bookings
// ============================================================================

import { createAdminClient } from "@/lib/supabase/admin";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminBookingsPage() {
  const supabase = createAdminClient();

  // Select all fields and handle joined data manually
  const { data: rawBookings } = await supabase
    .from("bookings")
    .select("*, cars(name, images)")
    .order("created_at", { ascending: false });

  const bookings = rawBookings as any[] || [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Bookings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View and manage all car rental bookings.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium">Customer</th>
              <th className="text-left py-3 px-2 font-medium">Car</th>
              <th className="text-left py-3 px-2 font-medium">Dates</th>
              <th className="text-right py-3 px-2 font-medium">Amount</th>
              <th className="text-center py-3 px-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking: any) => (
                <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2">
                    <p className="font-medium">{booking.profiles?.name || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{booking.profiles?.email || ""}</p>
                  </td>
                  <td className="py-3 px-2">{booking.cars?.name || "Unknown"}</td>
                  <td className="py-3 px-2">
                    {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {formatCurrency(Number(booking.total_amount))}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
