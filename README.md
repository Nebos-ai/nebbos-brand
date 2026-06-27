# @nebbos/brand

**The single source of brand truth for Nebbos** — logo, color, type, motion, radius,
shadow, and z-index tokens. Consumed by **both** the platform design system (Folio,
`@nebos/ui` in `nebos-frontend`) **and** the marketing site (`nebbos-site`).

Resolves **ADR-278 AD-3** ("brand tokens become ONE shared `@nebbos/brand`, consumed by
both surfaces") and the brand-mark scope of **ADR-270** (the logo now lives here; Folio
consumes it). Folio is platform-only; the marketing site gets its own design system but
shares these tokens, so there is exactly one place a rebrand happens.

## Install

This package is distributed via a **git-tag URL** from its public repo — no registry auth
anywhere (local, CI, Railway). Add to `package.json`:

```jsonc
{
  "dependencies": {
    "@nebbos/brand": "github:Nebos-ai/nebbos-brand#v1.0.0"
  }
}
```

Pin a tag (`#v1.0.0`) — a rebrand is one tag bump propagated to both consumers.

## Entry points

| Import | What you get |
| --- | --- |
| `@nebbos/brand/theme.css` | **Canonical** runtime token layer — the Folio THEME CONTRACT (`@theme inline` registrations, `:root` dark default, `[data-theme="light"]` flips). `@import` it after `@import "tailwindcss"`. |
| `@nebbos/brand/tokens.css` | Layer-1 OKLCH reference primitives (12-stop ramps + radius). `theme.css` is what most apps want; this is the lower primitive layer. |
| `@nebbos/brand/tokens` | The same brand values as **typed JS** (`color`, `radius`, `font`, `fontSize`, `easing`, `zIndex`) for surfaces where CSS custom properties are unavailable (Satori/next-og, email/PDF, JS charts, motion config). |
| `@nebbos/brand/logo` | React components `<NebbosMark />` + `<NebbosLogo />` (monochrome via `currentColor`; `react` is an optional peer). |
| `@nebbos/brand/logo/paths` | Framework-light geometry (path data, viewBoxes, aspect ratios) for non-React surfaces. |
| `@nebbos/brand/logo/mark.svg`, `@nebbos/brand/logo/lockup.svg` | Static SVG assets for URL contexts (favicon, OG image, email). |
| `@nebbos/brand` (default) | The typed tokens (re-export of `./tokens`). |

### CSS — apps

```css
/* app/globals.css */
@import "tailwindcss";
@import "@nebbos/brand/theme.css";
```

In `nebos-frontend`, Folio's `@nebos/ui/folio/theme.css` re-imports this file, so the app's
existing `@import "@nebos/ui/folio/theme.css"` is unchanged — Folio consumes the brand
tokens rather than defining them, with zero app blast radius.

### Logo — React

```tsx
import { NebbosMark, NebbosLogo } from "@nebbos/brand/logo";

<NebbosMark size="md" className="text-action" />   // swoosh glyph, AI/system anchor
<NebbosLogo size="lg" />                            // full vertical lockup
```

The mark ships monochrome and inherits text color via `currentColor`. **Never** recolor
the mark to a status color (status rides a separate badge + label).

### Tokens — JS / TS

```ts
import tokens, { color, radius, easing } from "@nebbos/brand/tokens";

color.accentPrimary; // "#637dff" (Blue Aura)
radius.lg;           // "16px"
easing.fluid;        // "cubic-bezier(.16, 1, .3, 1)"
```

## Versioning

Semver via git tags:

- **major** — palette / theme-contract break.
- **minor** — new tokens.
- **patch** — value tweaks.

Tag and push to release: `git tag v1.1.0 && git push origin v1.1.0`. Consumers then bump
the `#vX.Y.Z` ref.

## Publishing to a registry (future option)

v1 consumers use the **git-tag dependency above** — no registry needed. A GitHub Actions
workflow (`.github/workflows/publish.yml`) is included as a documented future option: on a
`v*` tag it can publish `@nebbos/brand` to **GitHub Packages** (scope binds to the org
`Nebos-ai`). It is disabled by default (manual `workflow_dispatch`) so v1 stays git-tag
only.

## Layout

```
nebbos-brand/
  index.ts            # default entry — re-exports typed tokens
  tokens.ts           # typed brand tokens (color/radius/font/motion/z)
  theme.css           # CANONICAL runtime token layer (Folio THEME CONTRACT)
  tokens.css          # Layer-1 OKLCH reference primitives
  logo/
    index.tsx         # <NebbosMark> + <NebbosLogo> (react optional peer)
    paths.ts          # framework-light geometry (path data + viewBoxes)
    nebbos-mark.svg   # static swoosh asset
    nebbos-lockup.svg # static full-lockup asset
  archive/
    idvor-tokens.css  # RETIRED (ADR-240 AD-4) — kept for history, not exported
  .github/workflows/publish.yml
```

## Provenance

Extracted verbatim (byte-for-byte token values) from `@nebos/ui` in `nebos-frontend`:
`packages/ui/src/folio/theme.css` → `theme.css`, `packages/ui/src/tokens.css` →
`tokens.css`, and `components/brand/nebbos-logo.tsx` → `logo/`. The retired
`idvor/tokens.css` (superseded by the Folio theme contract per ADR-240 AD-4) is archived,
not exported.
