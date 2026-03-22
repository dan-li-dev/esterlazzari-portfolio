# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build
pnpm start        # Run production build
pnpm lint         # ESLint checks
pnpm devsafe      # Clean .next cache and restart dev server
pnpm generate:types  # Regenerate Payload CMS TypeScript types (run after modifying collections)
pnpm generate:importmap  # Regenerate Payload import map
pnpm seed            # Seed all data into an existing empty database
pnpm seed:reset      # Delete local.db, recreate schema, seed all data — restart dev server after
```

## Environment Variables

Required in `.env`:
```
MONGODB_URI=mongodb://127.0.0.1/your-database-name
PAYLOAD_SECRET=YOUR_SECRET_HERE
BLOB_READ_WRITE_TOKEN=VERCEL_BLOB_SECRET_HERE
```

## Architecture

This is a **Next.js 15 + Payload CMS 3** portfolio site using the App Router. The two systems live in the same Next.js app under separate route groups:

- **`src/app/(frontend)/`** — Public-facing website
- **`src/app/(payload)/`** — Payload admin dashboard at `/admin` and REST/GraphQL API at `/api`

### Data Flow

Frontend sections are **React Server Components** that call `getPayloadClient()` (from `src/app/(frontend)/lib/payload.ts`) to fetch content server-side directly from MongoDB — no HTTP round-trips. Payload collections are publicly readable (`access: { read: () => true }`).

### Collections (`src/collections/`)

| Collection | Purpose |
|---|---|
| `Publications` | Research papers (title, authors, journal, date, links) |
| `Projects` | Current projects — `pinned` field filters what appears on homepage |
| `Conferences` | Conference appearances — `planned` field for upcoming events |
| `MediaCoverage` | News/press mentions |
| `Media` | File uploads stored on Vercel Blob |
| `Users` | Admin-only CMS users |

After modifying any collection schema, run `pnpm generate:types` to update TypeScript types.

### Frontend Structure

The homepage (`src/app/(frontend)/page.tsx`) composes section containers in sequence. Each container lives in `src/app/(frontend)/containers/` and fetches its own data. Reusable UI pieces are in `src/app/(frontend)/components/`.

**Path alias:** `@/*` maps to `src/*`.

### Styling

- Tailwind CSS with HSL-based CSS custom properties for theming
- Dark mode via `data-theme="dark"` attribute on the root element
- Font: Montserrat (Google Fonts, weights 400 & 700)
- Scroll animations via `scrollreveal` (initialized in `scroll-effect.tsx`)

### Deployment

- **Vercel** — primary target; Vercel Blob is used for media storage
- **Docker** — `Dockerfile` and `docker-compose.yml` available for self-hosting with local MongoDB
