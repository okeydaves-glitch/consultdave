// ============================================================================
// Addresses Page
// ============================================================================
// Shows saved addresses and lets users add/edit/delete them.
//
// Route: /dashboard/addresses
// ============================================================================

import { createClient } from "@/lib/supabase/server";

export default async function AddressesPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) return null;

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">Addresses</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your saved addresses for deliveries.
      </p>

      {addresses && addresses.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-xl border border-border p-4"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  {address.address_type}
                </span>
                {address.is_default && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Default
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm">{address.street}</p>
              <p className="text-sm text-muted-foreground">
                {address.city}, {address.state}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          No addresses saved yet.
        </p>
      )}
    </div>
  );
}
