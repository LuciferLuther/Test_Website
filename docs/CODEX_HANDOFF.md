# Codex handoff

## Goal

Continue development of Japan, Slowly as a production-quality mobile-first Next.js app and prepare it for Vercel deployment.

## Read first

1. `PRODUCT.md`
2. `DESIGN.md`
3. `AGENTS.md`
4. `README.md`
5. `VALIDATION.md`

## Required tools and design workflow

Install the project-local Impeccable skill before making visual changes:

```bash
npx impeccable install --scope=project --providers=codex
```

If the installed Impeccable release expects the explicit skills namespace, use:

```bash
npx impeccable skills install -y --providers=codex --scope=project
```

Then use Impeccable to audit and polish the interface. The repository workflow also runs the installation and a deterministic design scan.

Aether CSS is already integrated through `app/aether.css`. Keep it limited to useful translucent surfaces. Do not turn the complete site into glassmorphism.

## First development pass

1. Install dependencies and create `package-lock.json`.
2. Run `npm run verify`.
3. Run Playwright at 320, 375, 390, 768, 1024, and 1440 pixels.
4. Fix any TypeScript, lint, build, accessibility, or overflow problem.
5. Run the Impeccable audit against `app/` and `components/`.
6. Review the invitation opening, mobile dock, itinerary selector, map, saved-place flow, and booking checklist by hand.
7. Preserve plain English and the three-base default route.

## High-priority follow-up work

- Replace provisional event information when official 2026–27 schedules are published.
- Add a Vercel project and `NEXT_PUBLIC_SITE_URL`.
- Add visual regression screenshots to Playwright.
- Add a small content validation test for official-source labels.
- Review image art direction and compression after the first production deployment.

## Definition of done

- `npm run verify` passes.
- Playwright passes on mobile and desktop.
- No horizontal overflow at 320 pixels.
- The invitation and every dialog are keyboard accessible.
- Reduced-motion and reduced-transparency modes remain usable.
- The Vercel preview has no console errors.
