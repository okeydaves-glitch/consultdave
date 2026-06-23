// ============================================================================
// Database Type Definitions
// ============================================================================
// These TypeScript types describe the shape of our database tables.
// In a full setup, you'd run `supabase gen types typescript --linked`
// to auto-generate these from your actual database schema.
//
// For now, we define them manually so TypeScript gives us autocomplete
// and catches mistakes when we query Supabase.
// ============================================================================

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// --- USERS ---
// Maps to the auth.users table that Supabase manages
export interface Profile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

// --- ADDRESSES ---
export interface Address {
  id: string;
  user_id: string;
  address_type: "billing" | "delivery";
  street: string;
  city: string;
  state: string;
  postal_code: string | null;
  is_default: boolean;
  created_at: string;
}

// --- CARS ---
export interface Car {
  id: string;
  name: string;
  category: "sedan" | "suv" | "van" | "truck";
  year: number;
  mileage: number;
  fuel_type: "petrol" | "diesel" | "hybrid";
  transmission: "manual" | "automatic";
  seats: number;
  daily_price: number;
  location: "lagos" | "abuja" | "port_harcourt";
  images: string[];
  features: Json | null;
  insurance_info: Json | null;
  cancellation_policy: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

// --- BOOKINGS ---
export interface Booking {
  id: string;
  user_id: string;
  car_id: string;
  check_in_date: string;
  check_out_date: string;
  num_days: number;
  daily_rate: number;
  total_amount: number;
  insurance_selected: boolean;
  insurance_amount: number;
  pickup_location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  payment_id: string | null;
  created_at: string;
  updated_at: string;
}

// --- EQUIPMENT ---
export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  quantity_available: number;
  manufacturer: string | null;
  certifications: Json | null;
  images: string[];
  usage_guidelines: string | null;
  warranty_months: number | null;
  created_at: string;
  updated_at: string;
}

// --- ORDERS ---
export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  shipping_address: Json;
  delivery_option: "pickup" | "home" | "office";
  payment_id: string | null;
  created_at: string;
  updated_at: string;
}

// --- ORDER ITEMS ---
export interface OrderItem {
  id: string;
  order_id: string;
  equipment_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
}

// --- PAYMENTS ---
export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: "bank_transfer" | "mobile_money";
  provider: "paystack" | "flutterwave";
  reference_code: string;
  status: "pending" | "completed" | "failed";
  related_type: "booking" | "order";
  related_id: string;
  created_at: string;
  updated_at: string;
}

// --- ADMIN USERS ---
// Separate table from regular users, for admin panel access
export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "moderator";
  created_at: string;
  updated_at: string;
}

// The Database type maps table names to their row types
// This is used by the Supabase client for type-safe queries
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Profile, "id">> };
      addresses: { Row: Address; Insert: Omit<Address, "id" | "created_at">; Update: Partial<Omit<Address, "id">> };
      cars: { Row: Car; Insert: Omit<Car, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Car, "id">> };
      bookings: { Row: Booking; Insert: Omit<Booking, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Booking, "id">> };
      equipment: { Row: Equipment; Insert: Omit<Equipment, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Equipment, "id">> };
      orders: { Row: Order; Insert: Omit<Order, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Order, "id">> };
      order_items: { Row: OrderItem; Insert: Omit<OrderItem, "id" | "created_at">; Update: Partial<Omit<OrderItem, "id">> };
      payments: { Row: Payment; Insert: Omit<Payment, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Payment, "id">> };
      admin_users: { Row: AdminUser; Insert: Omit<AdminUser, "id" | "created_at" | "updated_at">; Update: Partial<Omit<AdminUser, "id">> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
