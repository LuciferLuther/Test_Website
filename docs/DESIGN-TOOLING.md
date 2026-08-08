# Design tooling

## Impeccable

Install the project-local Impeccable skill from the repository root:

```bash
npx impeccable install
```

Then reload the coding harness and run:

```text
/impeccable polish the home experience
/impeccable audit the mobile planner
```

The repository already contains `PRODUCT.md` and `DESIGN.md`, so every Impeccable command starts with the product, audience, constraints, and visual system used by this project.

Run the deterministic source detector with:

```bash
npm run design:detect
```

The strict detector exits with code 2 when it finds issues. The report command writes JSON while preserving detector exit behaviour:

```bash
npm run design:detect:json
```

## Aether CSS

[Aether CSS](https://aethercss.lovable.app/) is a browser-based CSS generator, so there is no package to add. The production recipes created from its Glassmorphism and OKLCH styleguide approach live in `app/aether.css`.

The runtime helper in `components/ui/aether-runtime.tsx` adds:

- backdrop-filter feature detection;
- solid fallbacks;
- reduced-transparency handling;
- a fine-pointer specular highlight for marked surfaces;
- no pointer tracking on touch devices or with reduced motion.

Surfaces are marked with `data-aether` and an `aether-surface` variant. Do not add the class to ordinary content cards. It is reserved for navigation, overlays, and controls where transparent layering has a clear purpose.
