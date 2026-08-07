# Repository guidance

- Keep the experience mobile-first. Validate at 320, 375, and 390 pixels before desktop.
- Use plain English. Prefer one clear idea per paragraph.
- Do not promise event dates or fireworks unless an official source confirms the exact season.
- Keep the default route at 19 nights and protect 24, 25, and 31 December and 1 January from hotel transfers.
- Use existing design tokens in `app/globals.css` instead of adding isolated colours or shadows.
- Respect `prefers-reduced-motion` for every new animation.
- Keep touch targets at least 44 by 44 pixels.
- Add or update a test whenever route date logic changes.
- Read `PRODUCT.md` and `DESIGN.md` before changing product copy or visual design.
- Install and use Impeccable for visual work: `npx impeccable install --scope=project --providers=codex`.
- Keep Aether CSS effects in `app/aether.css`; use glass only for navigation, controls, and overlays.
- Run `npm run design:audit` after a meaningful UI change.
