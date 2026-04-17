# HACS Foundation — Hope Alive Children Spring Foundation

## Project Overview

Production-ready charity website for Hope Alive Children Spring Foundation (HACS Foundation) — a Nigerian orphanage in Makurdi, Benue State. Motto: "Giving Love a Chance".

## Architecture

pnpm workspace monorepo with:
- **`artifacts/hacs-foundation`** — React + Vite frontend (port 8081, preview at `/`)
- **`artifacts/api-server`** — Express 5 backend API (port 8080, proxied through Vite dev server)
- **`lib/db`** — PostgreSQL + Drizzle ORM schema
- **`lib/api-spec`** — OpenAPI spec (used to generate client hooks via Orval)
- **`lib/api-client-react`** — Generated React Query hooks + custom fetch with `credentials: include`
- **`lib/api-zod`** — Generated Zod schemas

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS v4 + Shadcn UI
- **Fonts**: Lora (serif headings) + Inter (body) loaded from Google Fonts in index.html
- **Routing**: wouter
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Session-based admin auth (express-session). Env: ADMIN_USERNAME / ADMIN_PASSWORD (default: admin / hacsadmin2024)
- **Payment**: Stripe checkout sessions (graceful 503 if STRIPE_SECRET_KEY not set), bank transfer, PayPal, KoraPay stubs
- **Email**: Nodemailer (admin at hacs1960@gmail.com, foundation at hacsfoundation10@gmail.com)
- **Validation**: Zod, drizzle-zod, react-hook-form
- **API codegen**: Orval (from OpenAPI spec)

## Frontend Pages

- `/` — Home (hero, stats, programs overview, testimonials, CTA)
- `/about` — About Us (story, values, identity)
- `/mission` — Mission & Vision
- `/goals` — Goals & Objectives (10 strategic goals)
- `/programs` — Programs & Services (6 programs in detail)
- `/donate` — Donation form (amount presets, payment method tabs, bank transfer info)
- `/donate/thank-you` — Post-donation confirmation (verifies Stripe if session_id present)
- `/gallery` — Photo gallery (falls back to Unsplash placeholders if DB empty)
- `/faq` — FAQ accordion (falls back to default FAQs if DB empty)
- `/contact` — Contact form with honeypot anti-spam
- `/privacy` — Privacy Policy
- `/terms` — Terms of Use
- `/admin/login` — Admin login
- `/admin` — Admin dashboard (Overview, Donations, Contacts, Gallery, FAQs management)

## Foundation Contact Details

- Address: Shop No 6, Udoo Plaza, Terwase Agbadu Road, Opp NKST Church, Makurdi, Benue State, Nigeria
- Phone: 08036238076, 09016662836
- Email: hacsfoundation10@gmail.com
- Admin email: hacs1960@gmail.com
- Zenith Bank Naira: 1224366497 (Hope Alive Children Spring Foundation)
- Zenith Bank Dollar: 5074649270 (Hope Alive Children Spring Foundation)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Important Notes

- All mutations use `{ data: Body }` wrapper (Orval codegen pattern)
- `credentials: "include"` added to custom-fetch for session cookie support
- Vite proxies `/api/*` → `http://localhost:8080` for dev
- CORS configured with `origin: true, credentials: true`
- Stripe gracefully returns 503 if STRIPE_SECRET_KEY env var not set
- Payment keys to add later: STRIPE_SECRET_KEY, VITE_PAYPAL_CLIENT_ID, KORAPAY_SECRET_KEY

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
