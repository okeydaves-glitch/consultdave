// ============================================================================
// My Rentals Page
// ============================================================================
// Shows all of the user's car rental bookings with their status.
//
// Route: /dashboard/rentals
// ============================================================================

import { createClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function RentalsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) return null;

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, cars(name, images)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">My Rentals</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View your car rental history.
      </p>

      {bookings && bookings.length > 0 ? (
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border border-border p-4 flex gap-4"
            >
              {/* Mini car image */}
              <div className="h-20 w-28 shrink-0 rounded-lg bg-muted overflow-hidden">
                {booking.cars?.images?.[0] && (
                  <img
                    src={booking.cars.images[0]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{booking.cars?.name || "Car"}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {booking.num_days} day{booking.num_days > 1 ? "s" : ""} ·{" "}
                  {formatCurrency(Number(booking.total_amount))}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">No rentals found.</p>
      )}
    </div>
  );
}
