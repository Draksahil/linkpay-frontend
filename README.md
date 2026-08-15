# LinkPay — Frontend

A premium "link-in-bio + pay-to-unlock" creator platform. Built as a **frontend-only** deliverable: fully functional against realistic mock data, structured so a real Node.js backend and payment provider can be plugged in later without touching any UI code.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — custom design tokens (see `tailwind.config.ts`)
- **Framer Motion** — micro-interactions and page transitions
- **React Hook Form + Zod** — form state and validation
- **Lucide React** — icons
- No chart library, no state-management library, no UI kit beyond what's listed above — kept intentionally lean per the project brief.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## How the mock layer works

Every page talks to a `services/*` module (`services/auth.ts`, `services/links.ts`, `services/payments.ts`, `services/analytics.ts`, `services/creators.ts`, `services/notifications.ts`) — **never directly to fetch or mock data**. Each service checks `NEXT_PUBLIC_USE_MOCKS`:

- `true` (default): resolves against in-memory data from `lib/mock-data.ts` with a simulated network delay, so loading/skeleton states are real.
- `false`: calls `NEXT_PUBLIC_API_BASE_URL` through `lib/api-client.ts`.

When the real backend is ready, flip the env var — no component changes needed.

**Payments are explicitly mocked.** `services/payments.ts` simulates order creation and a webhook-style confirmation step, but is documented in-line: the frontend must never be the source of truth for "payment succeeded" — that has to come from a backend-verified provider webhook once Razorpay/Stripe is wired in.

## Project structure

```
src/
├── app/                # Next.js App Router pages (see full page list below)
├── components/
│   ├── ui/              # Design-system primitives (Button, Card, Modal, Input, Toggle, Chart...)
│   ├── layout/           # Navbar, Footer, Sidebar, Topbar, MobileNav, AuthShell
│   ├── marketing/         # Landing page sections (Hero, Features, HowItWorks, CtaBanner)
│   ├── profile/            # Public profile components (LinkCard, LinkIcon, SocialIcons)
│   └── dashboard/           # Dashboard-only components (StatCard, LinkRow, LinkForm)
├── services/             # Mock/live API layer — the ONLY place data is fetched
├── lib/                   # mock-data.ts, api-client.ts, utils.ts
├── context/                # ThemeProvider (light/dark/system), ToastProvider
├── hooks/                   # (reserved for shared hooks as the app grows)
└── types/                    # Shared TypeScript interfaces
```

## Pages implemented

**Public / marketing:** Home, Pricing, How It Works, FAQ, Contact, Privacy Policy, Terms
**Auth:** Login, Register, Forgot Password, Reset Password, Verify Email
**Public creator surface:** `/[username]` profile page, Paid Link Unlock, Payment Success, Payment Failed
**Creator dashboard:** Overview, Links (list/add/edit), Appearance (live preview), Analytics, Payments, Withdrawals, Profile, Settings, Notifications
**Admin:** Dashboard, Users, Payments, Reports

## Design notes

- Palette: indigo/violet (`brand-*` in `tailwind.config.ts`) on a near-black ink scale, kept deliberately restrained rather than "rainbow SaaS."
- Type: **Space Grotesk** for display/headings, **Inter** for body text, **JetBrains Mono** for every money figure and stat (dashboard totals, price badges, analytics) — a consistent signature that ties LinkPay's "get paid" promise to how numbers actually look on the page.
- Dark mode is class-based (`darkMode: "class"`) and controlled by `ThemeProvider`, with a `light / dark / system` switch in the dashboard Topbar.
- Every data-driven view has a loading skeleton, an error state, and an empty state — see `components/ui/{skeleton,error-state,empty-state}.tsx`.

## Known limitations (by design, for Day 1)

- No real authentication/session — `services/auth.ts` returns a mock user/token.
- No real payment processing — see the payments note above.
- No drag-and-drop reordering wired up yet (`linksService.reorder` exists and the Links list has grip handles, but the drag interaction itself isn't implemented — a good first task for the next session).
- Admin panel is read-heavy (no real moderation actions).

## Next steps

1. Build the NestJS/Express backend from the companion architecture document and flip `NEXT_PUBLIC_USE_MOCKS=false`.
2. Wire real Google OAuth + JWT refresh flow into `services/auth.ts`.
3. Replace the mock Razorpay button in `/unlock/[linkId]` with the real Razorpay Checkout SDK, confirmed via backend webhook.
4. Add react-beautiful-dnd (or a lighter alternative) for link reordering.
