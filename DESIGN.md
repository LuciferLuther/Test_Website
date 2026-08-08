# Japan, Slowly — Design System

## Visual world

**Sacred Winter Invitation** combines a premium printed invitation with a calm mobile travel planner. The atmosphere comes from ivory paper, burgundy ink, muted gold, winter photography, fine botanical geometry, editorial serif type, and a restrained frosted-glass layer for navigation and live controls.

The reference at `https://webgencyinvitations.com/thesacredgarden` sets the emotional bar: intimate, ceremonial, tactile, and carefully paced. The implementation must remain original. Do not copy its source, artwork, written content, or exact composition.

## Experience mode

The opening is an experience. The planner beneath it is an operating interface. Expression belongs in the invitation, hero, holiday stories, and selected moments. Planning controls favour clarity, stability, and fast feedback.

## Typography

- Display: Cormorant Garamond, weights 400–700, normal and italic.
- Body and controls: Manrope.
- Display headings use tight but readable tracking. The hero stays at or below 6rem and earns impact through composition rather than extreme scale.
- Body copy is 16 pixels or larger on mobile with a comfortable line height.
- Labels describe state or meaning; generic kickers above every section heading are not part of this system.

## Core palette

The hexadecimal values are fallbacks. Modern browsers receive equivalent OKLCH tokens from `app/aether.css`.

| Token | Fallback | Purpose |
| --- | --- | --- |
| `--paper` | `#f4ece2` | Main warm background |
| `--paper-bright` | `#fbf7ef` | Raised paper and readable glass |
| `--paper-deep` | `#e8d9ca` | Dividers and quiet depth |
| `--ink` | `#34251f` | Primary text |
| `--ink-soft` | `#6c5d55` | Supporting text |
| `--wine` | `#7c263b` | Main action and identity |
| `--wine-deep` | `#4b1825` | Pressed and dark action state |
| `--gold` | `#bd9357` | Focus, detail, and celebration |
| `--gold-light` | `#e2c28c` | Detail on dark surfaces |
| `--sage` | `#78846f` | Quiet natural accent |
| `--ice` | `#dce5e1` | Winter accent |

## Aether CSS material system

Aether CSS is used as a generator and design reference, not as a runtime package. The custom recipes live in `app/aether.css`; the exported values are recorded in `docs/AETHER-EXPORT.md`.

### Paper Frost

Used for the countdown, the selected itinerary, and modal content. It has high opacity for readable text, 18–22 pixels of blur, moderate saturation, a light edge, a soft downward shadow, and a pointer-led specular highlight on fine-pointer devices.

### Winter Navigation Glass

Used only for the scrolled header and mobile bottom dock. It stays compact and does not compete with content.

### Candlelight Glass

Used over photography in the hero route summary. It is darker, has a warm gold edge, and keeps white text at accessible contrast.

### Micro Glass

Used for the map legend. It helps the legend remain readable while preserving the map beneath it.

### Fallbacks

- Without `backdrop-filter`, surfaces become opaque paper or wine.
- With `prefers-reduced-transparency: reduce`, blur is removed and opacity increases.
- Pointer-led highlights run only with a fine pointer and no reduced-motion preference.
- Liquid distortion is not a baseline effect because it is not dependable across Safari and Firefox.

## Shape and depth

- Small controls: pill only when the content is short and control-like.
- General UI radius: 14–24 pixels.
- Invitation and editorial image frames may be softer and larger.
- Depth uses one soft, downward shadow. Avoid a border plus an unrelated heavy shadow.
- Glass is used only where transparency explains the layer: navigation, overlay, or live control.

## Motion thesis

The envelope opening is the authored focal sequence. It turns planning into an invitation through embossed paper, a wax seal, a warm seam of light, a folding flap, and a printed card that rises from the envelope. The full sequence is about 2.4 seconds and uses transform, opacity, blur, light, and shadow. Reduced motion closes it almost immediately.

Supporting motion has three jobs:

1. Show continuity when the route or map changes.
2. Confirm actions such as saving, copying, or completing a booking task.
3. Give glass controls a quiet material response to pointer position.

Routine state changes use 150–300 milliseconds. Layout and overlay transitions use 300–500 milliseconds. Arrivals use `cubic-bezier(0.16, 1, 0.3, 1)`. Exits are faster. Avoid bounce, elastic motion, and repeated identical section entrances.

## Mobile first

- Base layout is a single column.
- The bottom dock is the main phone navigation and sits inside the safe area.
- Core controls remain in thumb reach and are at least 44 pixels high.
- Text and controls never require hover.
- Progressive disclosure is used for day details and destination detail.
- Desktop adds side-by-side comparison and larger map space; it does not merely scale the phone layout.

## Browser surfaces

Selection, focus rings, caret, scrollbars, disabled controls, and form controls use the same palette. Keyboard focus must stay obvious on both paper and wine surfaces.

## Accessibility

- Body text targets WCAG AA contrast.
- No essential state depends on colour, motion, or transparency alone.
- All icon-only actions have accessible names.
- The invitation and dialogs trap focus and restore it when closed.
- Reduced motion removes loops and long transitions.
- Reduced transparency removes backdrop blur.
