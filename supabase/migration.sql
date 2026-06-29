-- ============================================================================
-- SafeRent Database Schema - Supabase Migration
-- ============================================================================
-- This SQL file creates ALL the tables for the SafeRent platform.
--
-- HOW TO USE:
-- 1. Go to your Supabase project dashboard
-- 2. Open the "SQL Editor" tab
-- 3. Paste this entire file
-- 4. Click "Run" to execute
--
-- Or use the Supabase CLI:
--   supabase db push
--
-- WHAT THIS SCHEMA DOES:
-- Creates tables for: users (profiles), addresses, cars, bookings,
-- equipment, orders, order_items, payments, and admin users.
-- Also sets up Row Level Security (RLS) to keep data safe.
-- ============================================================================

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
-- This extends Supabase's built-in auth.users table.
-- When a user signs up via Google OAuth, a trigger automatically
-- creates a row here with their info.
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  phone       TEXT,
  profile_picture TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update the updated_at timestamp whenever a row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- ADDRESSES TABLE
-- ============================================================================
-- Users can save multiple addresses (billing, delivery) for orders.
-- ============================================================================
CREATE TABLE IF NOT EXISTS addresses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  address_type TEXT NOT NULL CHECK (address_type IN ('billing', 'delivery')),
  street      TEXT NOT NULL,
  city        TEXT NOT NULL,
  state       TEXT NOT NULL,
  postal_code TEXT,
  is_default  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CARS TABLE
-- ============================================================================
-- Each car listed for rental. Images are stored as a JSON array of URLs.
-- ============================================================================
CREATE TABLE IF NOT EXISTS cars (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  category          TEXT NOT NULL CHECK (category IN ('bus', 'suv', 'truck')),
  year              INT NOT NULL,
  mileage           INT NOT NULL,
  fuel_type         TEXT NOT NULL CHECK (fuel_type IN ('petrol', 'diesel', 'hybrid')),
  transmission      TEXT NOT NULL CHECK (transmission IN ('manual', 'automatic')),
  seats             INT NOT NULL,
  daily_price       DECIMAL(10,2) NOT NULL,
  location          TEXT NOT NULL CHECK (location IN ('lagos', 'abuja', 'rivers', 'imo')),
  images            JSONB DEFAULT '[]'::jsonb,
  features          JSONB,
  insurance_info    JSONB,
  cancellation_policy TEXT,
  is_available      BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes speed up common queries (filtering by location, availability)
CREATE INDEX IF NOT EXISTS idx_cars_location ON cars(location);
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(is_available);
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category);

-- ============================================================================
-- BOOKINGS TABLE
-- ============================================================================
-- Tracks car rental bookings. Status flow:
--   pending -> confirmed -> completed
--   pending -> cancelled
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_id            UUID NOT NULL REFERENCES cars(id),
  check_in_date     DATE NOT NULL,
  check_out_date    DATE NOT NULL,
  num_days          INT NOT NULL,
  daily_rate        DECIMAL(10,2) NOT NULL,
  total_amount      DECIMAL(12,2) NOT NULL,
  insurance_selected BOOLEAN DEFAULT FALSE,
  insurance_amount  DECIMAL(10,2) DEFAULT 0,
  pickup_location   TEXT NOT NULL,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_id        UUID,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_car ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ============================================================================
-- EQUIPMENT TABLE
-- ============================================================================
-- Safety equipment available for purchase (not rental).
-- ============================================================================
CREATE TABLE IF NOT EXISTS equipment (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  category          TEXT NOT NULL,
  description       TEXT,
  price             DECIMAL(10,2) NOT NULL,
  quantity_available INT NOT NULL DEFAULT 0,
  manufacturer      TEXT,
  certifications    JSONB,
  images            JSONB DEFAULT '[]'::jsonb,
  usage_guidelines  TEXT,
  warranty_months   INT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_equipment_updated_at
  BEFORE UPDATE ON equipment
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================
-- Equipment purchase orders. Status flow:
--   pending -> paid -> shipped -> delivered
--   pending -> cancelled (only if not yet paid)
--   paid -> cancelled (partial refund)
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  order_number      TEXT NOT NULL UNIQUE,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount      DECIMAL(12,2) NOT NULL,
  shipping_address  JSONB NOT NULL,
  delivery_option   TEXT NOT NULL CHECK (delivery_option IN ('pickup', 'home', 'office')),
  payment_id        UUID,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ============================================================================
-- ORDER ITEMS TABLE
-- ============================================================================
-- Individual items within an order. Each row is one product line.
-- ============================================================================
CREATE TABLE IF NOT EXISTS order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  equipment_id  UUID NOT NULL REFERENCES equipment(id),
  quantity      INT NOT NULL,
  unit_price    DECIMAL(10,2) NOT NULL,
  subtotal      DECIMAL(12,2) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id, equipment_id)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================================================
-- PAYMENTS TABLE
-- ============================================================================
-- Tracks all payment transactions.
-- A payment can be linked to either a booking (car rental) or an order (equipment).
-- ============================================================================
CREATE TABLE IF NOT EXISTS payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount          DECIMAL(12,2) NOT NULL,
  currency        TEXT DEFAULT 'NGN',
  payment_method  TEXT CHECK (payment_method IN ('bank_transfer', 'mobile_money')),
  provider        TEXT NOT NULL CHECK (provider IN ('paystack', 'flutterwave')),
  reference_code  TEXT NOT NULL UNIQUE,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  related_type    TEXT NOT NULL CHECK (related_type IN ('booking', 'order')),
  related_id      UUID NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference_code);

-- ============================================================================
-- ADMIN USERS TABLE
-- ============================================================================
-- Separate from regular users. Admins log in with email + password
-- to the admin panel at /admin.
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'moderator')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- RLS is Supabase's built-in security layer. It ensures users can ONLY
-- access data that belongs to them, even if they know other users' IDs.
--
-- Think of RLS as adding a WHERE user_id = current_user_id() clause
-- to EVERY query automatically. Even if someone sends a malicious query
-- from the browser, RLS blocks it.
-- ============================================================================

-- Enable RLS on all tables (tables without RLS are publicly accessible!)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================
-- Each policy defines WHO can do WHAT on a table.
-- auth.uid() is the ID of the currently logged-in user.

-- PROFILES: Users can read/update their own profile only
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ADDRESSES: Users can CRUD their own addresses
CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own addresses"
  ON addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  USING (auth.uid() = user_id);

-- CARS: Everyone can view available cars (public listing)
CREATE POLICY "Anyone can view cars"
  ON cars FOR SELECT
  USING (TRUE);

-- Only admin users can insert/update/delete cars
-- (Handled via service_role key in admin API routes, not RLS)

-- BOOKINGS: Users can CRUD their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- EQUIPMENT: Everyone can view equipment (public listing)
CREATE POLICY "Anyone can view equipment"
  ON equipment FOR SELECT
  USING (TRUE);

-- ORDERS: Users can view/create their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ORDER ITEMS: Users can view items from their own orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- PAYMENTS: Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);
