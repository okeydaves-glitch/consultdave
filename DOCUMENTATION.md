# SafeRent Platform — Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Getting Started](#4-getting-started)
5. [Project Structure](#5-project-structure)
6. [Database Schema](#6-database-schema)
7. [API Reference](#7-api-reference)
8. [Key Concepts Explained](#8-key-concepts-explained)
9. [Admin Panel](#9-admin-panel)
10. [Deployment](#10-deployment)

---

## 1. Project Overview

**SafeRent** is a B2C web platform that combines vehicle rental and industrial safety equipment e-commerce. It serves businesses in Nigeria (Lagos, Abuja, Port Harcourt) who need to rent cars daily and purchase safety equipment.

### Core Features (MVP)
- **Daily car rentals** — Sedans, SUVs, vans, and trucks available by the day
- **Safety equipment marketplace** — PPE, fall protection, respiratory gear, and more
- **Google OAuth login** — Sign in with your Google account
- **User dashboard** — View rental and purchase history
- **Admin panel** — Manage inventory, view bookings and orders
- **Paystack payments** — Bank transfer and mobile money via Paystack

### What's NOT Included (Post-MVP)
- Equipment rental (purchase only)
- User reviews/ratings
- Loyalty rewards
- Mobile app
- Real-time chat
- AI recommendations

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Full-stack React framework |
| **Language** | TypeScript | Type-safe JavaScript |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework |
| **Database** | Supabase (PostgreSQL) | Managed database with REST API |
| **Auth** | Supabase Auth | Google OAuth, session management |
| **Storage** | Supabase Storage | Image uploads for cars/equipment |
| **State Mgmt** | TanStack Query | Server-state (data fetching) |
| **Client State** | Zustand | Client-state (cart, UI toggles) |
| **Forms** | React Hook Form + Zod | Form handling & validation |
| **Icons** | Lucide React | SVG icon library |
| **Payments** | Paystack | Nigerian payment gateway |
| **Hosting** | Vercel | Frontend + API route hosting |

### Why This Stack?

| Decision | Reason |
|----------|--------|
| **Supabase over Express.js** | Built-in auth, managed Postgres, real-time, file storage — less code to write and maintain |
| **Next.js API routes over separate backend** | Single deployment, shared types, no CORS issues |
| **Supabase JS Client over Prisma** | Native Supabase integration, RLS built-in, no code generation step |
| **TanStack Query over plain fetch** | Automatic caching, re-fetching, loading/error states without boilerplate |
| **Zustand over Redux** | Minimal boilerplate, no providers needed, works outside React |

---

## 3. Architecture

### Before (Original Plan)
```
Frontend (Next.js / Vercel)  ────  Backend (Express.js / Render)  ────  PostgreSQL
                                     │
                               Prisma ORM
```

### After (Supabase)
```
Frontend (Next.js / Vercel)
    │
    ├── Server Components → Direct Supabase queries
    ├── Client Components → useQuery → API routes → Supabase
    ├── API Routes → Supabase (admin client for write ops)
    │
    └── Supabase (single provider)
         ├── Auth (Google OAuth)
         ├── Database (PostgreSQL + RLS)
         └── Storage (images)
```

### Key Architecture Points

- **Server Components** (pages without `"use client"`) fetch data directly from Supabase on the server. This is fast and good for SEO.
- **Client Components** (pages with `"use client"`) use TanStack Query to fetch from our API routes (`/api/*`), which in turn use Supabase.
- **API Routes** handle operations that need server-side business logic (booking calculations, payment processing, admin operations).
- **Admin operations** use the Supabase `service_role` key to bypass RLS and access all data.

### Data Flow: Booking a Car

1. User browses cars on `/cars` (Server Component → direct Supabase query)
2. User clicks a car → `/cars/[id]` page loads with details
3. User fills out booking form (Client Component)
4. Form submits to `POST /api/bookings` (API Route)
5. API Route:
   - Verifies user auth
   - Calculates price (days × daily rate + insurance)
   - Creates booking record in Supabase
   - Initializes Paystack payment
   - Returns payment URL
6. User redirected to Paystack to pay
7. Paystack redirects back → verify payment → booking confirmed

---

## 4. Getting Started

### Prerequisites

- Node.js 18+ 
- npm
- A Supabase account (free tier works)
- A Paystack account (test mode for development)

### Step 1: Clone & Install

```bash
git clone <your-repo-url>
cd consultdave
npm install
```

### Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. In the SQL Editor, run the migration file at `supabase/migration.sql`
3. In Authentication → Providers, enable Google OAuth:
   - Get your Google Client ID from [Google Cloud Console](https://console.cloud.google.com)
   - Add the callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. In Storage, create buckets: `car-images`, `equipment-images`, `avatars`
5. Copy your project URL, anon key, and service_role key from Settings → API

### Step 3: Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Your Supabase service_role key (SECRET)
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` — Your Paystack public key
- `PAYSTACK_SECRET_KEY` — Your Paystack secret key (SECRET)

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Create Admin Account

To access the admin panel, you need to add yourself to the `admin_users` table.
You can do this via the Supabase dashboard's SQL Editor:

```sql
-- Replace with your email and a bcrypt-hashed password
INSERT INTO admin_users (email, password_hash, role)
VALUES ('admin@yourcompany.com', '<bcrypt-hashed-password>', 'admin');
```

---

## 5. Project Structure

```
consultdave/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout (Navbar + Footer + Providers)
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Global styles & CSS variables
│   │   ├── not-found.tsx             # 404 page
│   │   │
│   │   ├── (auth)/login/page.tsx     # Login page
│   │   ├── login/page.tsx            # Login redirect (route group workaround)
│   │   ├── auth/callback/route.ts    # OAuth callback handler
│   │   │
│   │   ├── cars/
│   │   │   ├── page.tsx              # Car listing (with filters)
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Car detail page
│   │   │       └── book/page.tsx     # Booking flow page
│   │   │
│   │   ├── equipment/
│   │   │   ├── page.tsx              # Equipment listing
│   │   │   └── [id]/page.tsx         # Equipment detail
│   │   │
│   │   ├── cart/page.tsx             # Shopping cart
│   │   ├── checkout/page.tsx         # Checkout page
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            # Dashboard layout (sidebar)
│   │   │   ├── page.tsx              # Overview / summary
│   │   │   ├── rentals/page.tsx      # My rentals
│   │   │   ├── purchases/page.tsx    # My purchases
│   │   │   ├── profile/page.tsx      # Profile info
│   │   │   └── addresses/page.tsx    # Saved addresses
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Admin layout (sidebar)
│   │   │   ├── page.tsx              # Admin dashboard
│   │   │   ├── cars/
│   │   │   │   ├── page.tsx          # Manage cars
│   │   │   │   ├── new/page.tsx      # Add car
│   │   │   │   └── [id]/edit/page.tsx # Edit car
│   │   │   ├── equipment/
│   │   │   │   ├── page.tsx          # Manage equipment
│   │   │   │   ├── new/page.tsx      # Add equipment
│   │   │   │   └── [id]/edit/page.tsx # Edit equipment
│   │   │   ├── bookings/page.tsx     # All bookings
│   │   │   ├── orders/page.tsx       # All orders
│   │   │   └── analytics/page.tsx    # Business metrics
│   │   │
│   │   ├── about/page.tsx            # About page
│   │   ├── contact/page.tsx          # Contact page
│   │   │
│   │   └── api/                      # API Route handlers
│   │       ├── auth/
│   │       │   ├── callback/route.ts # OAuth exchange
│   │       │   ├── me/route.ts       # Current user info
│   │       │   └── logout/route.ts   # Sign out
│   │       ├── cars/
│   │       │   ├── route.ts          # GET (list), POST (create)
│   │       │   └── [id]/route.ts     # GET, PUT, DELETE
│   │       ├── bookings/
│   │       │   ├── route.ts          # POST (create), GET (list)
│   │       │   └── [id]/cancel/route.ts
│   │       ├── equipment/
│   │       │   ├── route.ts          # GET (list), POST (create)
│   │       │   └── [id]/route.ts     # GET, PUT, DELETE
│   │       ├── orders/
│   │       │   ├── route.ts          # POST (create), GET (list)
│   │       │   └── [id]/cancel/route.ts
│   │       ├── payments/
│   │       │   ├── initialize/route.ts  # Start Paystack payment
│   │       │   ├── verify/route.ts      # Confirm payment
│   │       │   ├── webhook/route.ts     # Paystack webhook
│   │       │   └── [id]/route.ts        # Get payment details
│   │       ├── users/me/
│   │       │   ├── route.ts             # GET/PUT profile
│   │       │   └── addresses/route.ts   # GET/POST addresses
│   │       └── admin/
│   │           ├── analytics/route.ts
│   │           ├── bookings/route.ts
│   │           ├── bookings/[id]/status/route.ts
│   │           ├── orders/route.ts
│   │           ├── orders/[id]/status/route.ts
│   │           └── users/[id]/status/route.ts
│   │
│   ├── components/
│   │   ├── shared/                    # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── layout/                    # Layout components
│   │   │   ├── Navbar.tsx             # Server component
│   │   │   ├── NavbarClient.tsx       # Client part (mobile menu, auth)
│   │   │   └── Footer.tsx
│   │   ├── auth/                      # Auth components
│   │   │   ├── GoogleSignInButton.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── car/                       # Car-specific components
│   │   │   ├── CarCard.tsx
│   │   │   ├── CarFilter.tsx
│   │   │   └── BookingForm.tsx
│   │   └── equipment/                 # Equipment-specific components
│   │       ├── EquipmentCard.tsx
│   │       └── EquipmentFilter.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts     # Browser-side Supabase client
│   │   │   ├── server.ts     # Server-side Supabase client (cookies)
│   │   │   ├── admin.ts      # Admin client (service_role, bypasses RLS)
│   │   │   ├── middleware.ts # Route handler middleware client
│   │   │   └── types.ts      # Database type definitions
│   │   ├── api.ts            # API client wrapper
│   │   ├── hooks.ts          # Custom React hooks
│   │   ├── utils.ts          # Utility functions
│   │   └── providers.tsx     # QueryClient provider
│   │
│   └── middleware.ts          # Next.js middleware (session refresh)
│
├── supabase/
│   └── migration.sql          # Full database schema SQL
│
├── public/                    # Static assets (images, icons)
├── .env.example               # Environment variable template
└── DOCUMENTATION.md           # This file
```

---

## 6. Database Schema

The database is PostgreSQL, managed through Supabase.

### Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User profiles (extends auth.users) | id, email, name, phone |
| `addresses` | Saved delivery/billing addresses | user_id, street, city, state |
| `cars` | Rental vehicles | name, category, daily_price, location |
| `bookings` | Car rental bookings | user_id, car_id, dates, total_amount, status |
| `equipment` | Safety products for sale | name, category, price, quantity_available |
| `orders` | Equipment purchase orders | user_id, order_number, total_amount, status |
| `order_items` | Items within an order | order_id, equipment_id, quantity |
| `payments` | Payment transactions | user_id, amount, reference_code, status |
| `admin_users` | Admin panel access | email, password_hash, role |

### Row Level Security (RLS)

RLS ensures users can only access their own data. The key policies are:

- **profiles**: Users can read/update only their own profile
- **addresses**: Users can CRUD only their own addresses
- **cars**: Anyone can view (public listing)
- **bookings**: Users can CRUD only their own bookings
- **equipment**: Anyone can view (public listing)
- **orders**: Users can view only their own orders
- **payments**: Users can view only their own payments

Admin operations bypass RLS using the service_role key.

### Status Flow

**Booking statuses**: `pending → confirmed → completed → cancelled`  
**Order statuses**: `pending → paid → shipped → delivered → cancelled`

---

## 7. API Reference

All API routes are under `/api/`. They are Next.js Route Handlers that run server-side.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/auth/callback?code=xxx` | No | OAuth callback (Google redirects here) |
| GET | `/auth/me` | Yes | Get current user info |
| POST | `/auth/logout` | Yes | Sign out |

### Cars

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cars` | No | List cars (filters: location, category, transmission) |
| GET | `/cars/[id]` | No | Get car details |
| POST | `/cars` | Admin | Create car |
| PUT | `/cars/[id]` | Admin | Update car |
| DELETE | `/cars/[id]` | Admin | Delete car |

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | Yes | Create booking (returns payment URL) |
| GET | `/bookings` | Yes | List user's bookings |
| POST | `/bookings/[id]/cancel` | Yes | Cancel booking |

### Equipment

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/equipment` | No | List equipment (filters: category, search) |
| GET | `/equipment/[id]` | No | Get item details |
| POST | `/equipment` | Admin | Create equipment |
| PUT | `/equipment/[id]` | Admin | Update equipment |
| DELETE | `/equipment/[id]` | Admin | Delete equipment |

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders` | Yes | Create order (returns payment URL) |
| GET | `/orders` | Yes | List user's orders |
| POST | `/orders/[id]/cancel` | Yes | Cancel order |

### Payments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/payments/initialize` | Yes | Start Paystack payment |
| POST | `/payments/verify` | No | Verify payment after callback |
| POST | `/payments/webhook` | No | Paystack webhook handler |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/me` | Yes | Get profile + addresses |
| PUT | `/users/me` | Yes | Update profile |
| GET | `/users/me/addresses` | Yes | List addresses |
| POST | `/users/me/addresses` | Yes | Create address |

### Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/analytics` | Admin | Business metrics |
| GET | `/admin/bookings` | Admin | All bookings |
| GET | `/admin/orders` | Admin | All orders |

---

## 8. Key Concepts Explained

### Server Components vs Client Components

**Server Components** (default in Next.js App Router):
- Run on the server only
- Can access databases directly (no API call needed)
- Cannot use hooks (useState, useEffect, etc.)
- Cannot handle user interactions (clicks, typing)
- Better for: fetching data, SEO, static content

**Client Components** (add `"use client"` at the top):
- Run in the browser
- Can use React hooks
- Can handle user interactions
- Cannot directly access databases (use API routes or Supabase client)
- Better for: forms, interactive elements, real-time updates

**Rule of thumb**: Start with a Server Component. Only add `"use client"` when you need interactivity.

### Supabase Clients

We have 3 Supabase clients for different contexts:

| Client | File | Key | Where to Use |
|--------|------|-----|-------------|
| Browser | `client.ts` | anon key | Client Components, browser-side |
| Server | `server.ts` | anon key + cookies | Server Components, API routes |
| Admin | `admin.ts` | service_role | Admin API routes (bypasses RLS) |

The **anon key** is safe to expose in the browser. The **service_role key** must NEVER be exposed to the client.

### Row Level Security (RLS)

RLS is Supabase's built-in security layer. When a user queries the database from the client:
1. Supabase checks their auth token
2. Applies RLS policies (e.g., `WHERE user_id = auth.uid()`)
3. Returns only allowed data

Even if a malicious user tries `supabase.from("payments").select("*")`, RLS ensures they only see their own payments.

### TanStack Query

TanStack Query manages all server-state fetches. Key concepts:

- **queryKey**: A unique identifier for each query (e.g., `["cars", { location: "lagos" }]`). Changing the key triggers a refetch.
- **staleTime**: How long data is considered "fresh" before refetching (default: 1 minute)
- **gcTime**: How long inactive data stays in cache (default: 5 minutes)
- **isPending**: True while data is being fetched
- **error**: Any error that occurred during fetching

### Zustand (Cart)

The shopping cart uses Zustand with persist middleware. Cart data is stored in the browser's localStorage so it survives page refreshes. The cart is temporary — items only become permanent when an order is placed.

---

## 9. Admin Panel

Access the admin panel at `/admin/`.

### Features
- **Dashboard** — Overview of key metrics (total cars, bookings, orders, equipment)
- **Cars** — View, add, edit, and manage car inventory
- **Equipment** — View, add, edit, and manage safety equipment
- **Bookings** — View all customer bookings across all users
- **Orders** — View all customer orders
- **Analytics** — Revenue tracking and business metrics

### Admin Access
Admin users are stored in the `admin_users` table (separate from regular `profiles`). To create an admin:

```sql
INSERT INTO admin_users (email, password_hash, role)
VALUES ('your-email@example.com', '<bcrypt-hash>', 'admin');
```

> **Note**: Admin authentication is not yet implemented in the current version. The admin panel is accessible to anyone who knows the URL. In production, add an auth check to the admin layout.

---

## 10. Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables from `.env.example`
5. Deploy!

### Before Going Live Checklist

- [ ] Run the Supabase migration on your production database
- [ ] Set up Google OAuth for your production domain
- [ ] Configure Paystack webhooks (point to `/api/payments/webhook`)
- [ ] Create Supabase Storage buckets (car-images, equipment-images, avatars)
- [ ] Make all storage buckets public or set up proper RLS
- [ ] Set up proper admin authentication
- [ ] Add error tracking (Sentry)
- [ ] Test the full booking flow end-to-end
- [ ] Test the full purchase flow end-to-end
- [ ] Test Paystack payment + webhook
- [ ] Add proper email notifications (SendGrid)

### Environment Variables Required in Production

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ENVIRONMENT=production
```

---

## Common Questions

### Why does the login page redirect to dashboard?

The login page checks if you're already logged in. If you are, it redirects to `/dashboard`. If not, it shows the Google sign-in button.

### How do I add cars to the database?

Use the admin panel at `/admin/cars/new`, or insert directly via the Supabase dashboard.

### Why is my cart empty after I refresh?

The Zustand cart store needs to be fully set up (see the commented code in `lib/hooks.ts`). Once the persist middleware is enabled, cart data is saved to localStorage and survives refreshes.

### How do I test payments?

Set your Paystack keys to test mode (keys starting with `pk_test_` and `sk_test_`). Use Paystack's test card numbers to simulate payments.
