# Validation and deployment status

## Checks completed in the delivery environment

- 42 TypeScript and TSX source files parsed successfully with TypeScript 5.8.3.
- 5 route and date unit tests passed.
- The full CSS file parsed with no syntax errors and has balanced block braces.
- The standalone visual preview passed 24 scripted Chromium checks, including invitation flow, route switching, holiday warnings, map interaction, day tabs, saved places, search, airport options, checklist state, desktop navigation, and horizontal overflow at 320, 375, 390, 768, 1024, 1440, and 1920 pixels.
- No console errors or uncaught page errors were found during the standalone preview run.

## Checks that must run after dependencies are installed

This delivery environment could not reach the npm registry. Because of that, it was not possible here to run a dependency-backed Next.js build, ESLint, the full TypeScript project check, or Playwright against the live Next.js app.

Run these commands before the first production deployment:

```bash
npm install
npm run verify
npx playwright install chromium
npm run test:e2e
```

`npm run verify` runs the unit tests, TypeScript project check, ESLint, and the production Next.js build.

After the first successful `npm install`, commit the generated `package-lock.json`. The included GitHub Actions workflow uses `npm ci` automatically when that lock file exists.

## Vercel readiness

The project includes the App Router, metadata, sitemap, robots output, web manifest, Open Graph image route, security headers, local images through `next/image`, local persisted planner state, Vercel Analytics, Speed Insights, and a Vercel project configuration.

Set this environment variable in Vercel after choosing the final domain:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Redeploy after setting it so canonical URLs, robots output, sitemap URLs, and social metadata use the production domain.
