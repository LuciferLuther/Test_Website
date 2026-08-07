# Japan, Slowly — Design system

## Direction

A premium digital invitation that becomes a practical travel app.

The mood is warm ivory paper, burgundy ink, muted gold, botanical line work, winter photography, and calm editorial typography. The experience should feel crafted and romantic without becoming decorative noise.

## Reference boundaries

The project may learn from the pacing and atmosphere of the supplied Sacred Garden reference, but it must remain an original design. Do not copy its source code, exact compositions, illustrations, text, or proprietary assets.

## Mobile-first rules

- Start every layout at 320 pixels.
- Use one clear column before adding desktop grids.
- Keep important actions within thumb reach.
- Keep tap targets at least 44 by 44 pixels.
- Do not hide essential information behind hover.
- Keep the bottom dock above device safe areas.
- Test 320, 375, and 390 pixels before desktop.

## Typography

- Display: Cormorant Garamond.
- Body and controls: Manrope.
- Large editorial headings are welcome, but body copy must remain easy to scan.
- Avoid very long centred paragraphs.
- Use sentence case for most labels.

## Colour

- Paper: warm ivory and cream.
- Ink: brown-black, never pure black.
- Primary accent: deep burgundy.
- Secondary accent: muted antique gold.
- Support colours: quiet sage and winter ice.
- Maintain readable contrast on every translucent surface.

## Aether CSS glass layer

Aether CSS is used as a generator and design reference for the app's translucent surfaces. Use its broadly supported Glassmorphism approach rather than experimental Chromium-only Liquid Glass distortion.

The implementation lives in `app/aether.css` and is used for:

- the scrolled site header;
- the mobile navigation dock;
- the countdown panel;
- the map card and map legend;
- the selected-place map panel.

Direction: a restrained blend of the Aether presets **Silk Veil** and **Fluid Amber**. The result should remain warm, low-contrast, and compatible with the paper invitation style.

Rules:

- Do not put every section in glass.
- Glass is for floating navigation, controls, and overlays.
- Always provide a solid fallback.
- Respect reduced-transparency preferences.
- Text contrast is more important than the effect.

Reference: https://aethercss.lovable.app/

## Motion

- Use slow, soft easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Prefer opacity, transform, and path drawing.
- Avoid bounce and elastic motion.
- Motion should explain state changes, not delay access.
- Respect `prefers-reduced-motion` everywhere.

## Interaction

- Buttons need clear hover, pressed, keyboard-focus, and disabled states.
- Dialogs must trap focus and restore it when closed.
- The map must work with keyboard controls.
- Every state change needs visible feedback.
- Keep controls stable so the layout does not jump.

## Anti-patterns

- No purple-to-blue startup gradients.
- No generic dashboard card grids.
- No nested cards without a clear hierarchy.
- No tiny grey text on coloured surfaces.
- No excessive pills.
- No decorative animation that blocks reading.
- No fake precision around weather or event schedules.
