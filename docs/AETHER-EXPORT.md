# Aether CSS export record

This project uses [Aether CSS](https://aethercss.lovable.app/) as a browser-based generator for its material surfaces and colour states. The generated ideas were rewritten as project tokens and semantic classes so the site does not depend on a third-party runtime.

## Selected direction

- Effect family: Glassmorphism.
- Colour model: OKLCH when supported, with hexadecimal and RGBA fallbacks.
- Baseline: opaque and readable.
- Enhancement: backdrop blur, saturation, edge light, and a bounded specular response.
- Liquid distortion: not used as the baseline because it is not dependable across all target browsers.

## Exported recipes

| Recipe | Used for | Blur | Saturation | Solid fallback |
| --- | --- | ---: | ---: | --- |
| Winter Navigation Glass | Scrolled header and phone dock | 22px | 1.35 | `#fbf7ef` |
| Paper Frost | Countdown, selected itinerary, dialog | 18px | 1.22 | `#fbf7ef` |
| Candlelight Glass | Route summary over the hero photo | 16px | 1.18 | `rgba(42, 21, 24, 0.92)` |
| Micro Glass | Map legend | 12px | 1.20 | `rgba(251, 247, 239, 0.97)` |

The implementation lives in `app/aether.css`. `components/ui/aether-runtime.tsx` detects backdrop-filter support, reduced transparency, reduced motion, and pointer type before enabling enhancements.

## State system

Aether's styleguide approach is reflected in the action tokens:

- `--action`: primary burgundy action.
- `--action-hover`: darker hover state.
- `--action-active`: pressed state.
- `--action-focus`: muted gold focus ring.
- `--action-disabled`: quiet warm neutral.

Every material remains readable without blur. Touch devices do not run the pointer-led highlight. Reduced-transparency preferences receive solid surfaces.

## Rules for future changes

1. Do not add glass to ordinary content cards.
2. Use an existing recipe before making a new one.
3. Keep text contrast in the solid fallback first.
4. Test new surfaces with blur disabled.
5. Keep the invitation opening as the main visual moment; glass supports navigation and state rather than becoming the whole aesthetic.
