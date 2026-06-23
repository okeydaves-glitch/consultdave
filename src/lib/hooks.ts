// ============================================================================
// Custom React Hooks
// ============================================================================
// Hooks are reusable functions that let you use React features (state, effects)
// and Supabase/TanStack Query features in a clean, reusable way.
//
// Each hook here wraps a common data-fetching pattern so components
// don't have to repeat the same TanStack Query boilerplate.
//
// Usage in a component:
//   const { data: cars, isLoading } = useCars({ location: "lagos" });
// ============================================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { api } from "@/lib/api";
import type { Car, Booking, Equipment, Order } from "@/lib/supabase/types";

// ============================================================================
// useAuth() - Get the currently logged-in user
// ============================================================================
// Returns: { user, session, isLoading }
export function useAuth() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return { user: null, session: null };

      // Also fetch the user's profile from our profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      return {
        user: { ...session.user, profile },
        session,
      };
    },
    // Auth state changes rarely, so cache it longer
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ============================================================================
// useCars() - Fetch car listings with optional filters
// ============================================================================
// Usage:
//   const { data, isLoading } = useCars({ location: "lagos", category: "suv" });
//   // data.cars, data.total, data.hasMore
export function useCars(filters?: {
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  skip?: number;
  take?: number;
}) {
  return useQuery({
    queryKey: ["cars", filters],
    queryFn: () => api.get<{ cars: Car[]; total: number; hasMore: boolean }>("/cars", { ...filters }),
  });
}

// ============================================================================
// useCar() - Fetch a single car by ID
// ============================================================================
// Usage: const { data: car, isLoading } = useCar("abc-123");
export function useCar(id: string) {
  return useQuery({
    queryKey: ["cars", id],
    queryFn: () => api.get<Car>(`/cars/${id}`),
    enabled: !!id, // Don't fetch if no ID is provided
  });
}

// ============================================================================
// useEquipment() - Fetch equipment listings with optional filters
// ============================================================================
export function useEquipment(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  skip?: number;
  take?: number;
}) {
  return useQuery({
    queryKey: ["equipment", filters],
    queryFn: () =>
      api.get<{ equipment: Equipment[]; total: number; hasMore: boolean }>(
        "/equipment",
        filters
      ),
  });
}

// ============================================================================
// useEquipmentItem() - Fetch a single equipment item by ID
// ============================================================================
export function useEquipmentItem(id: string) {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => api.get<Equipment>(`/equipment/${id}`),
    enabled: !!id,
  });
}

// ============================================================================
// useBookings() - Fetch the current user's bookings
// ============================================================================
export function useBookings(status?: string) {
  return useQuery({
    queryKey: ["bookings", status],
    queryFn: () => api.get<{ bookings: Booking[]; total: number }>("/bookings", { status }),
  });
}

// ============================================================================
// useOrders() - Fetch the current user's orders
// ============================================================================
export function useOrders(status?: string) {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: () => api.get<{ orders: Order[]; total: number }>("/orders", { status }),
  });
}

// ============================================================================
// useCreateBooking() - Create a new car booking
// ============================================================================
// Returns a mutate function. Call it like:
//   const createBooking = useCreateBooking();
//   createBooking.mutate({ carId, checkInDate, checkOutDate, ... });
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      carId: string;
      checkInDate: string;
      checkOutDate: string;
      pickupLocation: string;
      insuranceSelected: boolean;
    }) => api.post<{ booking: Booking; paymentUrl: string }>("/bookings", data),
    onSuccess: () => {
      // After creating a booking, refresh the bookings list
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// ============================================================================
// useCreateOrder() - Create a new equipment order
// ============================================================================
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      items: { equipmentId: string; quantity: number }[];
      shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode?: string;
      };
      deliveryOption: "pickup" | "home" | "office";
    }) => api.post<{ order: Order; paymentUrl: string }>("/orders", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// ============================================================================
// useCart() - Shopping cart state (Zustand store)
// ============================================================================
// This would be a full Zustand store. For now, it's a placeholder
// that shows where the cart logic goes.
// ============================================================================

// TODO: Create a proper Zustand store for cart management
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
//
// interface CartItem {
//   equipmentId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }
//
// interface CartStore {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (equipmentId: string) => void;
//   updateQuantity: (equipmentId: string, quantity: number) => void;
//   clearCart: () => void;
//   total: () => number;
// }
//
// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (item) => {
//         const existing = get().items.find(i => i.equipmentId === item.equipmentId);
//         if (existing) {
//           set({ items: get().items.map(i =>
//             i.equipmentId === item.equipmentId
//               ? { ...i, quantity: i.quantity + item.quantity }
//               : i
//           )});
//         } else {
//           set({ items: [...get().items, item] });
//         }
//       },
//       removeItem: (equipmentId) => {
//         set({ items: get().items.filter(i => i.equipmentId !== equipmentId) });
//       },
//       updateQuantity: (equipmentId, quantity) => {
//         set({ items: get().items.map(i =>
//           i.equipmentId === equipmentId ? { ...i, quantity } : i
//         )});
//       },
//       clearCart: () => set({ items: [] }),
//       total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
//     }),
//     { name: "saferent-cart" }
//   )
// );
