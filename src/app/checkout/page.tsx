// ============================================================================
// Checkout Page
// ============================================================================

// Must be dynamic because AuthGuard uses Supabase client
export const dynamic = "force-dynamic";
// Where users review their order, enter shipping details, and pay.
//
// Flow:
// 1. User reviews items in cart
// 2. Enters or selects a shipping address
// 3. Chooses delivery option (pickup, home, office)
// 4. Clicks "Place Order"
// 5. Backend creates the order and returns a payment URL
// 6. User is redirected to Paystack to pay
//
// Route: /checkout
// ============================================================================

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/shared/Button";

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="mt-8 space-y-8">
          {/* Shipping Information */}
          <section>
            <h2 className="text-xl font-semibold">Shipping Information</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your delivery address.
            </p>
            {/* TODO: AddressForm component */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Street Address"
                className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              />
              <input
                type="text"
                placeholder="City"
                className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              />
              <input
                type="text"
                placeholder="State"
                className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              />
              <input
                type="text"
                placeholder="Postal Code (optional)"
                className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              />
            </div>
          </section>

          {/* Delivery Option */}
          <section>
            <h2 className="text-xl font-semibold">Delivery Option</h2>
            <div className="mt-4 space-y-2">
              {["pickup", "home", "office"].map((option) => (
                <label key={option} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value={option}
                    className="text-primary"
                  />
                  <span className="text-sm font-medium capitalize">{option}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <section>
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your cart is empty. Add items before checking out.
            </p>
          </section>

          {/* Place Order Button */}
          <Button className="w-full" size="lg" disabled>
            Place Order
          </Button>
        </div>
      </div>
    </AuthGuard>
  );
}
