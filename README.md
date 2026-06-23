# SafeRent — Vehicle Rentals & Safety Equipment for Nigerian Businesses

A full-stack B2C web platform combining daily car rentals and industrial safety equipment e-commerce. Built with Next.js and Supabase.

**Serving:** Lagos, Abuja, Port Harcourt

---

## Tech Stack

| Frontend | Backend / Infrastructure |
|----------|------------------------|
| Next.js 16 (App Router) | Supabase (PostgreSQL + Auth + Storage) |
| TypeScript | Paystack (payments) |
| Tailwind CSS v4 | Vercel (hosting) |
| Framer Motion (animations) | SendGrid (email — optional) |
| TanStack Query (data fetching) | |
| Zustand (client state) | |
| React Hook Form + Zod (forms) | |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Set up Supabase
#    - Create a project at supabase.com
#    - Run supabase/migration.sql in SQL Editor
#    - Enable Google OAuth in Auth → Providers
#    - Create storage buckets: car-images, equipment-images, avatars
#    - Copy your URL + anon key + service_role key to .env.local

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                     # Next.js App Router pages + API routes
│   ├── cars/                # Car listing, detail, booking
│   ├── equipment/           # Equipment listing, detail
│   ├── dashboard/           # User dashboard (rentals, purchases, profile)
│   ├── admin/               # Admin panel (cars, equipment, bookings, orders)
│   ├── login/               # Google OAuth login
│   └── api/                 # All backend API route handlers
├── components/
│   ├── shared/              # Button, Input, Modal, Loading, Toast, etc.
│   ├── layout/              # Navbar, Footer
│   ├── auth/                # GoogleSignInButton, AuthGuard
│   ├── car/                 # CarCard, CarFilter, BookingForm
│   └── equipment/           # EquipmentCard, EquipmentFilter
└── lib/
    ├── supabase/            # Browser, server, admin, middleware clients
    ├── api.ts               # API client wrapper
    ├── hooks.ts             # Custom React hooks
    ├── utils.ts             # Utilities + constants
    ├── animations.ts        # Framer Motion variants
    └── providers.tsx        # QueryClient + Supabase providers
```

## Features

### MVP Complete
- **Car rentals** — Browse, filter by city/category, view details, book with date picker
- **Safety equipment** — Browse catalog, filter by category, search, view product details
- **Google OAuth** — Sign in with Google account via Supabase Auth
- **Shopping cart** — Add/remove equipment items (Zustand + localStorage)
- **User dashboard** — View rental history, purchase history, profile, saved addresses
- **Admin panel** — Manage cars, equipment, bookings, orders, view analytics
- **Paystack payments** — Initialize payment, verify callback, webhook handler

### Animations
- Page transitions with fade + slide
- Stagger card entrance on listing pages
- Scroll-triggered reveals on landing page
- Card hover lift + image zoom
- Button press feedback
- Mobile menu slide animation
- Toast notifications
- Modal scale entrance

## Database

PostgreSQL managed through Supabase with 9 tables:
`profiles`, `addresses`, `cars`, `bookings`, `equipment`, `orders`, `order_items`, `payments`, `admin_users`

Row Level Security (RLS) ensures users can only access their own data.

## Documentation

See [DOCUMENTATION.md](DOCUMENTATION.md) for the full project guide covering:
- Architecture deep-dive
- Every file explained
- API reference (all endpoints)
- Database schema details
- Deployment checklist
- Common questions

## License

Private — all rights reserved.
