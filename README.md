# Japan, Slowly

A production Next.js app for a relaxed winter trip through Tokyo, Hakodate, and Sapporo from 15 December 2026 to 3 January 2027.

The app is designed for a couple who want fewer hotel changes, a special Christmas, real snow, onsen time, and a calm New Year. It uses the mood of a premium digital invitation: warm paper, an opening envelope, fine botanical details, cinematic scenes, large editorial type, and soft motion.

The visual system and interface code are original. No source code or proprietary artwork from the design reference website is included.

## What is included

- Animated tap-to-open invitation with keyboard and reduced-motion support.
- Mobile-first interface with a one-hand navigation dock.
- Full desktop web-app layout for larger screens.
- Interactive 19-night route builder with four pace options.
- Warnings when a custom route creates a hotel move on 24, 25, or 31 December, or 1 January.
- Interactive Japan map with hotel bases, day trips, route lines, flights, train links, and regional zoom.
- Calm day plans for Tokyo, Hakodate, and Sapporo.
- Christmas, fireworks, snow, New Year, and onsen guidance.
- Searchable and sortable city explorer with persistent saved comparisons.
- Open-jaw and Tokyo-return airport planning.
- Persistent booking checklist.
- Original SVG scenes for Hakodate, Otaru, onsen, traditional streets, and torii paths.
- Metadata, sitemap, robots output, web manifest, dynamic Open Graph image, security headers, Vercel Analytics, and Speed Insights.
- App-level loading, error, and not-found screens.
- Unit tests, Playwright browser tests, and GitHub Actions checks.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Motion for React
- Zustand with safe persisted state and explicit client hydration
- Native CSS design system and responsive animations
- Next Image and Next Font
- Vercel Web Analytics and Speed Insights
- Node test runner and Playwright

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality commands

```bash
npm run test       # route and date rules
npm run typecheck  # full TypeScript project check
npm run lint       # Next.js, React, and accessibility rules
npm run build      # production Next.js build
npm run test:e2e   # mobile and desktop browser tests
npm run verify     # unit tests, types, lint, and production build
```

Install Playwright's Chromium binary before the first end-to-end run:

```bash
npx playwright install chromium
```

See [`VALIDATION.md`](./VALIDATION.md) for the checks completed before delivery and the checks to run after dependency installation.

## Deploy to Vercel

### GitHub flow

1. Create a GitHub repository.
2. Copy this project into the repository root.
3. Run `npm install` and commit the generated `package-lock.json`.
4. Run `npm run verify`.
5. Push the `main` branch.
6. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
7. Add this environment variable after choosing the final domain:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

8. Deploy again so canonical URLs, sitemap URLs, robots output, and social metadata use the final domain.
9. Enable Web Analytics and Speed Insights in the Vercel dashboard.

### Vercel CLI flow

```bash
npm install
npx vercel
npx vercel --prod
```

The app does not require a database, CMS, API key, or server secret.

## How the app is organised

Trip content is kept separate from the interface in `data/trip.ts`:

- `routePresets`: city order, nights, and route choices.
- `cities`: scores, map positions, labels, and practical notes.
- `dayPlans`: relaxed daily suggestions.
- `bookingTasks`: booking checklist content.
- `officialSources`: event and transport source links.

Planner choices are stored locally through `store/trip-store.ts`. The store waits for client hydration and sanitises old or invalid saved values before using them.

Visual tokens, layout rules, responsive behaviour, and motion live in `app/globals.css`. Large features are split into focused components under `components/`.

## Project structure

```text
app/                  App Router page, metadata, fallbacks, icon, and global CSS
components/           Main experience sections
components/ui/        Modal, media renderer, icons, botanical art, and original SVG scenes
data/                  Typed itinerary and city content
lib/                   Date, URL, and formatting helpers
store/                 Persisted Zustand planner state
tests/                 Unit tests for route and date logic
e2e/                   Playwright interaction and overflow tests
.github/workflows/     GitHub Actions quality checks
Remote media           Two licensed Wikimedia photographs, allowlisted through Next Image
```

## Images and artwork

The project uses two Creative Commons photographs and original project artwork. Exact source links, licences, and modification notes are in [`CREDITS.md`](./CREDITS.md).

## Event accuracy

The interface separates confirmed dates from recurring events whose 2026 programme is still pending. Check every official event page again before paying for a non-refundable hotel, dinner, or transport booking.

## Codex, Impeccable, and Aether CSS

The repository is prepared for Codex development through `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, and [`docs/CODEX_HANDOFF.md`](./docs/CODEX_HANDOFF.md).

Install the project-local design skill from the repository root:

```bash
npm run design:install
```

The GitHub workflow runs the requested `npx impeccable install` command on the development branch and falls back to the explicit `skills install` syntax when required by the current release. It also creates an `impeccable-report.json` design audit.

Aether CSS is used as the source for the app's restrained glass layer. The implementation is in `app/aether.css`, with solid browser fallbacks and reduced-transparency support. It is intentionally limited to navigation, countdown, map controls, and overlays.
