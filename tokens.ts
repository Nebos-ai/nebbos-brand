/**
 * @nebbos/brand — typed brand tokens (the single source of brand truth as JS).
 *
 * These mirror the CSS custom properties in `theme.css` (the canonical Folio
 * THEME CONTRACT, ADR-240 AD-3) so the marketing design system — which does NOT
 * import Folio — can consume the same brand values in TS/JS contexts where CSS
 * custom properties are unavailable (Satori/next-og images, email/PDF token
 * maps, JS chart libraries, motion configs).
 *
 * theme.css remains canonical for the runtime CSS layer; this file is the typed
 * projection of the SAME values. When the brand changes, both move together in
 * one version bump (ADR-278 AD-3 single-source-of-truth).
 */

/** Brand palette — founder refresh 2026-06-26 (slate neutral + blue/indigo accent). */
export const color = {
  /* ---- ink / background anchors (slate ramp) ---- */
  ink: "#0c0e12", // slate-950 — dark-mode background
  ink2: "#13161b", // slate-900
  text: "#fafafa", // slate-25 — dark-mode foreground

  /* slate neutral ramp (hex anchors from the theme.css brand-palette note) */
  slate25: "#fafafa",
  slate50: "#f7f7f7",
  slate100: "#f0f0f1",
  slate200: "#ececed",
  slate300: "#cecfd2",
  slate400: "#94979c",
  slate500: "#85888e",
  slate600: "#61656c",
  slate700: "#373a41",
  slate800: "#22262f",
  slate900: "#13161b",
  slate950: "#0c0e12",

  /* blue/indigo accent set */
  accentPrimary: "#637dff", // Blue Aura — primary action (dark)
  accentPrimaryLight: "#4a5fe0", // Blue Aura darkened for light-bg contrast (5.02:1)
  accentFocus: "#67e8ff", // cyan — secondary / focus (dark)
  accentFocusLight: "#0aa6c2", // focus on light bg
  accentTail: "#bbc7ff", // pastel light indigo — gradient tail

  /* status (founder palette 2026-06-26) */
  ok: "#96e072", // positive green (dark)
  okLight: "#2e7d32", // darkened for light-bg legibility (4.9:1)
  warn: "#f94144", // brand attention red (dark)
  warnLight: "#d92d30", // darkened for light-bg legibility (4.6:1)
  bad: "#f94144",
  badLight: "#d92d30",
  neutral: "#f1ede6", // warm cream — numbers with no +/- valence (dark)
  neutralLight: "#373a41", // slate-700 — warm dark neutral (light)

  /* chart series (distinct from status) */
  chart1: "#637dff",
  chart2: "#67e8ff",
  chart3: "#96e072",
  chart4: "#ffd27e",
  chart5: "#bbc7ff",
} as const;

/** Border radius scale (Folio). */
export const radius = {
  sm: "8px",
  md: "11px",
  lg: "16px",
  xl: "18px",
  pill: "999px",
} as const;

/** Font family stacks (the host app provides the --font-* variables). */
export const font = {
  display: "var(--font-bricolage), ui-sans-serif, system-ui, sans-serif",
  sans: "var(--font-inter), var(--font-dm-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
  mono: "var(--font-geist-mono), var(--font-dm-mono), ui-monospace, SFMono-Regular, monospace",
} as const;

/** Fluid type ramp (clamp expressions, matches theme.css --font-size-*). */
export const fontSize = {
  xs: "clamp(.75rem,   .73rem + .10vw,  .8125rem)",
  sm: "clamp(.8125rem, .79rem + .12vw,  .875rem)",
  base: "clamp(.9375rem, .91rem + .15vw,  1.0625rem)",
  lg: "clamp(1.0625rem,1rem + .30vw,    1.1875rem)",
  xl: "clamp(1.25rem,  1.12rem + .60vw, 1.5rem)",
  "2xl": "clamp(1.625rem, 1.40rem + 1.0vw, 2.125rem)",
  "3xl": "clamp(2.0rem,   1.55rem + 1.8vw, 3.0rem)",
  "4xl": "clamp(2.8rem,   1.50rem + 6.0vw, 7.0rem)",
} as const;

/** Motion — easing curves (Folio). */
export const easing = {
  fluid: "cubic-bezier(.16, 1, .3, 1)",
  out: "cubic-bezier(.22, 1, .36, 1)",
  spring: "cubic-bezier(.34, 1.4, .64, 1)",
} as const;

/** Z-index system (Folio). */
export const zIndex = {
  field: 0,
  scrim: 1,
  content: 2,
  nav: 40,
  overlay: 55,
  sidebar: 60,
  cmdk: 100,
} as const;

const tokens = { color, radius, font, fontSize, easing, zIndex } as const;

export type BrandTokens = typeof tokens;
export default tokens;
