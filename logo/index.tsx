/**
 * @nebbos/brand/logo — the single source of truth for the Nebbos mark.
 *
 * Governed by the Nebbos Brand-Identity System (ADR-270) and ADR-278 AD-3
 * (brand assets live in @nebbos/brand, consumed by Folio + the marketing site).
 * Anything that needs the Nebbos mark imports from HERE — never inline a fresh
 * <svg> and never reach for a generic sparkle glyph.
 *
 * Two exports:
 *   <NebbosMark />  — the swoosh glyph alone. Monochrome via `currentColor`, so
 *                     it inherits text color and themes for free. This is the
 *                     AI/system identity anchor — NOT a per-agent avatar and NOT
 *                     page wallpaper.
 *   <NebbosLogo />  — the full vertical lockup (mark + NEBBOS wordmark) for the
 *                     sidebar brand, auth screens, and the marketing header.
 *
 * Recolor discipline (ADR-270): the mark ships monochrome and may take brand-hue
 * / black / white only, via `currentColor` (set the surrounding text color).
 * NEVER recolor the mark to a status color. The optional duotone variant exposes
 * two tokens (`--mark-brand` / `--mark-neutral`) for tenant theming.
 *
 * Framework-light: this wrapper depends only on `react` (peer). For non-React
 * surfaces (Satori/next-og, email, raw <svg>), import the geometry from
 * `@nebbos/brand/logo/paths` instead and build your own element.
 */
import type { CSSProperties } from "react";

import {
  LOGO_ASPECT,
  LOGO_HEIGHTS,
  LOGO_VIEWBOX,
  MARK_ASPECT,
  MARK_HEIGHTS,
  MARK_VIEWBOX,
  SWOOSH_PATHS,
  WORDMARK_PATHS,
} from "./paths";

export * from "./paths";

/** Minimal classnames joiner — keeps this package free of a `cn`/clsx dependency. */
function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

type MarkSize = "sm" | "md" | "lg" | number;
type MarkTone = "mono" | "duotone";

interface BrandSvgProps {
  /** Named preset or explicit height in px. Width follows the aspect ratio. */
  size?: MarkSize;
  className?: string;
  /**
   * Accessible name. Omit (or pass empty) to render the mark as decorative
   * (`aria-hidden`) — do this when it sits next to a visible "Nebbos" label.
   */
  title?: string;
}

function resolveHeight(size: MarkSize, presets: Record<"sm" | "md" | "lg", number>) {
  return typeof size === "number" ? size : presets[size];
}

/**
 * The Nebbos swoosh mark. Monochrome (`currentColor`) by default; pass
 * `tone="duotone"` to drive the two-layer `--mark-brand` / `--mark-neutral`
 * tokens for tenant theming.
 */
export function NebbosMark({
  size = "md",
  tone = "mono",
  className,
  title,
}: BrandSvgProps & { tone?: MarkTone }) {
  const height = resolveHeight(size, MARK_HEIGHTS);
  const width = Math.round(height * MARK_ASPECT);
  const decorative = !title;

  const duotoneStyle: CSSProperties =
    tone === "duotone" ? { color: "var(--mark-neutral, currentColor)" } : {};

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={width}
      height={height}
      className={cx("shrink-0", className)}
      style={duotoneStyle}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      {!decorative && <title>{title}</title>}
      {SWOOSH_PATHS.map((d, i) => (
        <path
          key={d.slice(0, 12)}
          d={d}
          fill={
            tone === "duotone" && i >= SWOOSH_PATHS.length - 2
              ? "var(--mark-brand, currentColor)"
              : "currentColor"
          }
        />
      ))}
    </svg>
  );
}

/**
 * The full Nebbos vertical lockup (swoosh + NEBBOS wordmark). Monochrome via
 * `currentColor` — set the surrounding text color token to recolor.
 */
export function NebbosLogo({ size = "md", className, title = "Nebbos" }: BrandSvgProps) {
  const height = resolveHeight(size, LOGO_HEIGHTS);
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={width}
      height={height}
      className={cx("shrink-0", className)}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <title>{title}</title>
      {[...SWOOSH_PATHS, ...WORDMARK_PATHS].map((d) => (
        <path key={d.slice(0, 12)} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
