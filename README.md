# Japan, Slowly

A mobile-first Next.js app for a relaxed winter trip through Tokyo, Hakone, and Sapporo from 17 December 2026 to 3 January 2027.

The app helps a couple plan fewer hotel changes while protecting the parts that matter most: Christmas, New Year, reliable snow, onsen time, beautiful scenery, and slow days together.

The visual direction is an original interpretation of a premium digital invitation. It uses warm paper, burgundy ink, muted gold, botanical details, winter photography, clear editorial type, and restrained glass surfaces.

## What is included

- Tap-to-open invitation with keyboard support and reduced-motion support.
- Mobile-first layout with safe-area handling and one-hand bottom navigation.
- Larger desktop planning layout without changing the information structure.
- One fixed 16-night route with clear dates for every stay.
- A clear warning for the planned 24 December move, with 25 and 31 December and 1 January protected.
- Interactive Japan map with bases, day trips, train routes, flights, and regional zoom.
- Relaxed day plans for Tokyo, Hakone, and Sapporo.
- Clear Christmas, snow, fireworks, New Year, and onsen guidance.
- Searchable city explorer with saved comparisons.
- Haneda arrival, domestic winter flights, and a final Narita buffer night.
- Persistent booking checklist.
- Original SVG scenes and two credited Creative Commons photographs.
- Vercel metadata, analytics, speed insights, security headers, sitemap, robots, manifest, and Open Graph image.
- Unit tests, Playwright tests, GitHub Actions, and an Impeccable design gate.

## Design toolchain

### Impeccable

Run the official installer from the project root:

```bash
npx impeccable install
```

The same command is available as:

```bash
npm run design:install
```

The repository already contains:

- `PRODUCT.md` with the audience, trip goal, language, and product rules;
- `DESIGN.md` with the visual system, motion rules, mobile strategy, and accessibility rules;
- `.impeccable/config.json` with the shared detector and hook settings;
- `.github/workflows/design-quality.yml`, which runs the detector on pull requests and fails when findings remain.

Run the source detector with:

```bash
npm run design:detect
```

### Aether CSS

[Aether CSS](https://aethercss.lovable.app/) is used as the generator and reference for the glass material system. The output is adapted into the project rather than loaded from a third-party runtime.

- `app/aether.css` contains the OKLCH palette, interaction states, glass recipes, and solid fallbacks.
- `components/ui/aether-runtime.tsx` enables supported enhancements and respects reduced motion, reduced transparency, and touch input.
- `docs/AETHER-EXPORT.md` records the selected Aether recipes and exact values.

Glass is limited to navigation, overlays, and live planning controls. Normal content is not wrapped in decorative glass cards.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Motion for React
- Zustand with safe persisted state and explicit client hydration
- Aether-derived CSS material system with native CSS and OKLCH fallbacks
- Next Image and Next Font
- Vercel Web Analytics and Speed Insights
- Node test runner and Playwright
- Impeccable CLI and design skill workflow

## Run locally

Requirements: Node.js 22.18 or newer and npm.

```bash
npm install
npm run design:install
npm run dev
```

Open `http://localhost:3000`.

After the Impeccable installer finishes, reload the coding tool so its project-local skill and hooks are visible.

## Quality commands

```bash
npm run test                # route and date rules
npm run typecheck           # full TypeScript project check
npm run lint                # Next.js, React, and accessibility rules
npm run build               # production Next.js build
npm run test:e2e            # mobile and desktop browser tests
npm run design:detect       # Impeccable source detector
npm run verify              # tests, types, lint, and production build
npm run quality             # verify plus Impeccable
```

Install Playwright's Chromium binary before the first end-to-end run:

```bash
npx playwright install chromium
```

See `VALIDATION.md` for the checks completed in the delivery environment and the commands that still need registry access.

## Deploy to Vercel

### GitHub flow

1. Create a GitHub repository.
2. Copy this project into the repository root.
3. Run `npm install` and commit the generated `package-lock.json`.
4. Run `npm run design:install` and commit the project-local Impeccable files it creates for your coding harness.
5. Run `npm run quality`.
6. Push the `main` branch.
7. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
8. Add the final site URL:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

9. Deploy again so canonical URLs, sitemap URLs, robots output, and social metadata use the final domain.
10. Enable Web Analytics and Speed Insights in the Vercel dashboard.

### Vercel CLI flow

```bash
npm install
npm run design:install
npm run quality
npx vercel
npx vercel --prod
```

The app does not require a database, CMS, API key, or server secret.

## Project structure

```text
app/                         App Router pages, metadata, global CSS, and Aether CSS
components/                  Main planner sections
components/ui/               Aether runtime, modal, icons, botanical art, and scenes
data/                        Typed route, city, day-plan, and booking content
docs/                        Design-tool records and installer notes
lib/                         Date, URL, and formatting helpers
store/                       Persisted Zustand planner state
tests/                       Unit tests for route and date logic
e2e/                         Playwright interaction and overflow tests
.github/workflows/           Build checks and Impeccable design gate
.impeccable/                 Shared Impeccable project configuration
public/images/               Licensed photographs and local artwork
PRODUCT.md                   Product truth used by Impeccable
DESIGN.md                    Visual and interaction system used by Impeccable
```

## Content and image accuracy

Trip data is kept in `data/trip.ts`. Event information separates confirmed dates from recurring events whose 2026 programme is still pending. Check official event pages again before paying for non-refundable hotels, dinners, or transport.

Image licences and modification notes are in `CREDITS.md`.
