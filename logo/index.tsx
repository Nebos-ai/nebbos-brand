/**
 * @nebbos/brand/logo — the single source of truth for the Nebbos mark.
 *
 * v2.0.0 (2026-09-13): the canonical mark is the flower-of-life — 19
 * stroked rings in the sacred-geometry hex packing. Renders monochrome
 * via `stroke="currentColor"` so the whole mark inherits text color
 * and themes for free. Supersedes the v1.x swoosh geometry (retired
 * to ./archive/ under the additive-only governance doctrine).
 *
 * Governed by ADR-270 (superseded 2026-09-13 by the flower-of-life
 * identity fork resolution).
 *
 * One export:
 *   <NebbosMark />  — the flower-of-life mark alone. Monochrome via
 *                     `currentColor`. This is the AI/system identity
 *                     anchor — NOT a per-agent avatar and NOT page
 *                     wallpaper.
 *
 * The v1.x <NebbosLogo /> vertical lockup (swoosh + wordmark) is
 * removed from the primary export surface pending a flower-of-life
 * lockup design. The legacy React wrapper for the swoosh mark is not
 * ported; consumers who genuinely need to render the historical mark
 * import the geometry from "@nebbos/brand/logo/archive/paths" and
 * build their own element.
 *
 * Framework-light: this wrapper depends only on `react` (peer). For
 * non-React surfaces (Satori/next-og, email, raw <svg>), import the
 * geometry from "@nebbos/brand/logo/paths" instead and build your own
 * element from RING_PATHS + MARK_VIEWBOX + MARK_STROKE_WIDTH.
 */

import { MARK_ASPECT, MARK_HEIGHTS, MARK_STROKE_WIDTH, MARK_VIEWBOX, RING_PATHS } from "./paths";

export * from "./paths";

/** Minimal classnames joiner — keeps this package free of a `cn`/clsx dependency. */
function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

type MarkSize = "sm" | "md" | "lg" | number;

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
 * The Nebbos flower-of-life mark. Monochrome (`currentColor`) — set the
 * surrounding text color to recolor. 19 stroked rings on a 246×257
 * canvas at MARK_STROKE_WIDTH=6.
 */
export function NebbosMark({ size = "md", className, title }: BrandSvgProps) {
  const height = resolveHeight(size, MARK_HEIGHTS);
  const width = Math.round(height * MARK_ASPECT);
  const decorative = !title;

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={width}
      height={height}
      fill="none"
      className={cx("shrink-0", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      {!decorative && <title>{title}</title>}
      {RING_PATHS.map((d) => (
        <path
          key={d.slice(0, 12)}
          d={d}
          stroke="currentColor"
          strokeWidth={MARK_STROKE_WIDTH}
        />
      ))}
    </svg>
  );
}
