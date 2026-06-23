// ============================================================================
// Cart Page
// ============================================================================
// Shows the user's shopping cart with equipment items they want to purchase.
// Users can adjust quantities, remove items, and proceed to checkout.
//
// Route: /cart
// ============================================================================

import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  // NOTE: The full cart implementation uses Zustand (see lib/hooks.ts).
  // For now, this shows the layout. When Zustand store is connected,
  // it will read from useCartStore and display actual items.
  //
  // The cart data is stored in the browser (localStorage via Zustand persist)
  // because it's temporary — items only become permanent when an order is placed.

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      {/* Empty cart state */}
      <div className="mt-12 flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground">
          Add some safety equipment to get started.
        </p>
        <Link href="/equipment">
          <Button variant="primary">Browse Equipment</Button>
        </Link>
      </div>

      {/* 
        TODO: When cart has items, show:
        - List of cart items with image, name, price, quantity selector, remove button
        - Order summary sidebar with subtotal, delivery info
        - Proceed to checkout button
      */}
    </div>
  );
}
