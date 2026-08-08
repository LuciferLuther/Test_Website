# Validation and deployment status

## Checks completed in the delivery environment

- The exact command `npx impeccable install` was invoked from the project root.
- The non-interactive project command `npx impeccable install -y --providers=codex --scope=project` was also invoked.
- Both installer attempts reached npm resolution and stopped at the delivery sandbox's DNS restriction with `EAI_AGAIN` for `registry.npmjs.org`.
- `npx impeccable detect app components` was invoked and reached the same DNS restriction.
- The project now pins Node.js 22.18.0 through `.nvmrc` and requires Node.js 22.18 or newer in `package.json`.
- 5 route and date unit tests passed.
- 44 TypeScript and TSX files parsed successfully with TypeScript 5.8.3.
- `app/globals.css` and `app/aether.css` parsed successfully with PostCSS.
- 14 literal source element IDs were found and all were unique.
- The standalone preview contains 67 unique IDs and every internal navigation target exists.
- A targeted Impeccable preflight found no extreme negative tracking, oversized 10.7rem hero type, repeating linear stripe patterns, image hover transforms, or old eyebrow classes.
- Aether has a readable solid baseline, feature-detected glass enhancement, reduced-transparency fallback, reduced-motion fallback, and touch-safe behaviour.

## Browser pass completed on the standalone preview

The self-contained preview was exercised in Chromium at 320, 390, 768, 1440, and 1920 pixels wide.

The pass covered:

- invitation opening;
- route preset switching;
- map-city switching;
- scrolled-header material state;
- Aether feature detection;
- reduced-motion mode;
- console errors and uncaught page errors;
- horizontal overflow before and after opening the invitation.

All five widths completed with zero horizontal overflow, no console errors, and no uncaught page errors.

The browser pass also found and fixed two real responsive issues before packaging:

1. The generic Aether surface rule was overriding fixed and absolute positioning on the mobile dock, header, and map legend. The rule now preserves each component's layout position.
2. The mobile map's aspect ratio and minimum height could force a wider canvas at 320 pixels. The narrow-screen map now uses an explicit height and no width-derived aspect ratio.

## Checks that require npm registry access

The delivery sandbox cannot resolve the npm registry. It was therefore not possible here to run the dependency-backed Next.js build, ESLint, the full TypeScript project check, Playwright against the live Next.js app, or the official Impeccable detector result.

Run this sequence before the first production deployment:

```bash
npm install
npm run design:install
npm run quality
npx playwright install chromium
npm run test:e2e
```

`npm run quality` runs the route tests, full TypeScript check, ESLint, production Next.js build, and Impeccable detector.

After the first successful `npm install`, commit the generated `package-lock.json`. After `npm run design:install`, commit the project-local skill and hook files that the installer creates for the chosen coding harness.

## GitHub quality gate

`.github/workflows/design-quality.yml` runs the Impeccable detector against `app` and `components` on pull requests. It uploads the JSON report and fails the job for detector findings or command failure.

## Vercel readiness

The project includes App Router metadata, sitemap, robots output, web manifest, Open Graph image route, security headers, local images through `next/image`, local persisted planner state, Vercel Analytics, Speed Insights, safe-area viewport support, and a Vercel project configuration.

Set this environment variable after choosing the final domain:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Redeploy after setting it so canonical URLs, robots output, sitemap URLs, and social metadata use the production domain.
