# भारती भाषा ओलंपियाड (Bharati Bhasha Olympiad) — Next.js App

A Next.js 16 (App Router) full-stack application: public marketing site + admin
dashboard, with API routes implemented as native Next.js Route Handlers.

## Getting Started

**Prerequisites:** Node.js 18.18+ (Node 20 LTS recommended)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

`npm run build` runs `next build` (type-checked, zero errors) and produces an
optimized production build in `.next/`. `npm start` serves that build with
`next start`.

## Admin Panel

- URL: `/admin/login`
- Demo credentials: `admin@bharatibhasha.org` / `admin123` (any password
  `admin123`/`admin` also works, matching the original demo auth logic)

## Project Structure

- `src/app/` — Next.js App Router: `(site)/` route group holds all public
  pages (with the shared header/footer layout), `admin/` holds the admin
  dashboard routes, `api/` holds the backend Route Handlers.
- `src/views/` — page-level React components rendered by the routes above
  (kept separate from `src/app` to avoid colliding with Next's reserved
  `pages/` convention).
- `src/components/` — layout, shared, and admin UI components.
- `src/context/AppContext.tsx` — app-wide state (language/theme/toasts/admin
  auth) plus a thin `navigateTo()` wrapper around Next's router.
- `src/server/models/dataStore.ts` — in-memory demo data store used by the
  admin API routes.
