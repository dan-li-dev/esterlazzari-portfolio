<p align="center">
  <img src="https://esterlazzari.com/avatar.png" height="96px" width="96px" alt="Ester Lazzari Avatar"/>
  <br/>
  <h3 align="center">esterlazzari.com</h3>
  <p align="center">Academic portfolio and research website for Ester Lazzari.</p>
</p>

<p align="center">
  <a href="../../actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/dan-li-dev/esterlazzari-portfolio/ci.yml?branch=main&label=CI&logo=github-actions&logoColor=white&style=flat-square" alt="CI" />
  </a>
  <a href="https://esterlazzari.com">
    <img src="https://img.shields.io/github/deployments/dan-li-dev/esterlazzari-portfolio/Production?label=vercel&logo=vercel&logoColor=white&style=flat-square" alt="Vercel Deployment" />
  </a>
  <a href="../../issues">
    <img src="https://img.shields.io/github/issues/dan-li-dev/esterlazzari-portfolio.svg?style=flat-square" alt="GitHub Issues" />
  </a>
  <a href="../../pulls">
    <img src="https://img.shields.io/github/issues-pr/dan-li-dev/esterlazzari-portfolio.svg?style=flat-square" alt="Pull Requests" />
  </a>
</p>

## Description

Source code for [esterlazzari.com](https://esterlazzari.com) — an academic portfolio for Ester Lazzari, a demographer specializing in fertility, reproductive technologies, and family dynamics. The website showcases research, publications, conference contributions, and current projects in an accessible and modern interface.

Built with a modern full-stack architecture:

<div align="center">
  <img width="48" src="https://cdn.simpleicons.org/react/61DAFB" alt="React" title="React" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" title="Next.js" />
  &nbsp;
  <img width="48" src="https://i.imgur.com/i6ruAIh.png" alt="Payload CMS" title="Payload CMS" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" title="TypeScript" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" title="Tailwind CSS" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/sqlite/003B57" alt="SQLite (local)" title="SQLite (local dev)" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" title="MongoDB (production)" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/vercel/000000" alt="Vercel" title="Vercel" />
  &nbsp;
  <img width="48" src="https://cdn.simpleicons.org/vitest/6E9F18" alt="Vitest" title="Vitest" />
</div>

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+ — `npm install -g pnpm`

No local database setup required — **local development uses SQLite** (a `local.db` file created automatically at the project root). MongoDB is only used in production.

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/dan-li-dev/esterlazzari-portfolio.git
cd esterlazzari-portfolio

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env — only PAYLOAD_SECRET is strictly required for local dev

# 4. Seed the database and start developing
pnpm seed:reset   # creates local.db, runs schema, seeds all content
pnpm dev          # starts at http://localhost:3000
```

> **Tip:** If you ever want a clean slate locally, just run `pnpm seed:reset` again — it deletes `local.db`, recreates the schema, and re-seeds everything. Restart the dev server afterwards.

---

## Environment Variables

Create a `.env` file in the project root. For local development only `PAYLOAD_SECRET` is required:

```env
# Required in all environments
PAYLOAD_SECRET=any-random-strong-string

# Required for seeding the admin user (used by pnpm seed / pnpm seed:reset)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password-here

# Required in production only (app auto-uses SQLite locally)
MONGODB_URI=mongodb://127.0.0.1/esterlazzari

# Required for media uploads (Vercel Blob)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token-here
```

| Variable | Local dev | Production | Description |
|---|:---:|:---:|---|
| `PAYLOAD_SECRET` | Required | Required | Secret key for Payload CMS sessions |
| `ADMIN_EMAIL` | Required | Required | Email for the Payload CMS admin account (used during seeding) |
| `ADMIN_PASSWORD` | Required | Required | Password for the Payload CMS admin account (used during seeding) |
| `MONGODB_URI` | Not needed | Required | MongoDB connection string |
| `BLOB_READ_WRITE_TOKEN` | Optional | Required | Vercel Blob token for media uploads |

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server at `localhost:3000` with hot reload |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint checks |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm devsafe` | Clear `.next` cache and restart dev server |
| `pnpm seed` | Seed all data into an existing empty database |
| `pnpm seed:reset` | Delete `local.db`, recreate schema, and re-seed — restart dev after |
| `pnpm generate:types` | Regenerate Payload CMS TypeScript types after schema changes |
| `pnpm generate:importmap` | Regenerate Payload import map |

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/         # Public-facing website
│   │   ├── containers/     # Page sections (each fetches its own data)
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Payload client, utilities
│   └── (payload)/          # Payload admin (/admin) and API (/api)
├── collections/            # Payload CMS collection definitions
├── globals/                # Payload global settings (About, Footer, Site)
└── payload.config.ts       # Payload configuration
```

Frontend sections are React Server Components that query the database directly via `getPayloadClient()` — no HTTP round-trips.

---

## Contributing

Contributions are welcome, particularly for accessibility improvements, design enhancements, or content corrections.

### Workflow

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Set up locally** following the [Getting Started](#getting-started) steps above.

3. **Make your changes.** After modifying any collection schema, regenerate types:
   ```bash
   pnpm generate:types
   ```

4. **Lint and test** before committing:
   ```bash
   pnpm lint
   pnpm test
   ```

5. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add dark mode toggle
   fix: correct publication date formatting
   docs: update contribution guide
   ```

6. **Open a pull request** against `main` with a description of what changed and why.

### Guidelines

- Keep changes focused — one logical change per PR
- Do not commit `.env`, `local.db`, or any secrets
- UI changes should preserve the existing Tailwind/HSL theming system
- All CMS schema changes must include a `pnpm generate:types` run

---

## License

All rights reserved. Please contact Ester Lazzari for reuse or collaborations.
