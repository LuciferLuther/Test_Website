# Repository guidance

- Run `npm run design:install` after the first dependency install. It invokes the official `npx impeccable install` flow for the active coding harness.
- Read `PRODUCT.md` and `DESIGN.md` before changing the interface. Keep both files current when product truth or the visual system changes.
- Run `npm run design:detect` before shipping a UI change. Do not add broad ignores; fix the issue or document one narrow exception.
- Keep the experience mobile-first. Validate at 320, 375, and 390 pixels before desktop.
- Use plain English. Prefer one clear idea per paragraph and one name for each action.
- Do not promise event dates or fireworks unless an official source confirms the exact season.
- Keep the fixed route at 16 nights. The 24 December Hakone-to-Sapporo move is intentional; protect 25 and 31 December and 1 January from hotel transfers.
- Use existing tokens in `app/globals.css` and `app/aether.css` instead of adding isolated colours, radii, or shadows.
- Reserve `aether-surface` for navigation, overlays, and live controls where transparent layering has a purpose. Ordinary content does not become glass.
- Respect `prefers-reduced-motion` and `prefers-reduced-transparency` for every new effect.
- Keep touch targets at least 44 by 44 pixels and never depend on hover for an action.
- The invitation opening is the focal animation. Routine interactions should be short and explain a state change.
- Add or update a test whenever route date logic changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
