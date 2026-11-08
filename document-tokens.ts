/**
 * @nebbos/brand — document and deck token sets (LRNE-36).
 *
 * Two NEW groups, additive to tokens.ts (no existing token changes). tokens.ts
 * serves email/PDF-adjacent JS surfaces with the platform palette; THESE sets
 * carry the printed-document style and the marketing-deck style.
 *
 * documentTokens: the Nebbos document format ratified by the founder 2026-09-28
 *   (memory feedback_nebbos_document_format_style_ratified_2026_09_28, derived
 *   from nebbos-technical-reference.pdf v14). Every PDF or HTML Nebbos document
 *   conforms to it.
 * deckTokens: the Delta brief editorial marketing register, recorded as given
 *   in the delta-brief-editorial skill (assets/tokens.css, references/design-system.md).
 *
 * Single source for three readers: the Python document engine (nebos-backend
 * LRNE-33), the in-app TypeScript reader and the style check. The JSON files
 * tokens/document.json and tokens/deck.json are exports of THESE objects
 * (`npm run export:tokens`); tests fail if they drift.
 *
 * Changing any value requires a version bump and a new snapshot in
 * tokens/snapshots/ (see tests/document-tokens.test.ts). Additive only.
 *
 * Erasable TypeScript only (no enums), so Node can run this file directly.
 */

export const DOCUMENT_TOKENS_VERSION = "1.0.0";

export const documentTokens = {
  name: "nebbos-document",
  version: DOCUMENT_TOKENS_VERSION,
  source: "founder ratification 2026-09-28; nebbos-technical-reference.pdf v14",
  fonts: {
    body: {
      family: "Manrope",
      role: "body and UI",
      weights: [300, 400, 500, 600, 700],
      files: {
        "300": "fonts/manrope/Manrope-Light.ttf",
        "400": "fonts/manrope/Manrope-Regular.ttf",
        "500": "fonts/manrope/Manrope-Medium.ttf",
        "600": "fonts/manrope/Manrope-SemiBold.ttf",
        "700": "fonts/manrope/Manrope-Bold.ttf",
      },
      license: "fonts/manrope/OFL.txt",
    },
    mono: {
      family: "Fira Code",
      role: "code, pre, table cells marked mono",
      weights: [400, 500],
      files: {
        "400": "fonts/fira-code/FiraCode-Regular.ttf",
        "500": "fonts/fira-code/FiraCode-Medium.ttf",
      },
      license: "fonts/fira-code/OFL.txt",
    },
    wordmark: {
      family: "Fraunces",
      role: "the Nebbos cover wordmark only, nowhere else",
      opticalSize: 144,
      files: null,
    },
    pdfOverlay: {
      family: "Helvetica",
      role: "PDF header and footer overlay (reportlab built-in, not embedded)",
      sizePt: 7.5,
      files: null,
    },
  },
  color: {
    paper: "#FFFFFF",
    paper2: "#F7F5F1",
    ink: "#1D1C22",
    ink2: "#4A4952",
    ink3: "#6B6A73",
    accent: "#FF6B1E",
    gold: "#9A5D2A",
    lineSoft: "#ECE9E2",
    line: "#D4D2CC",
  },
  page: {
    size: "A4",
    margin: { top: "20mm", right: "18mm", bottom: "22mm", left: "18mm" },
    marginMm: { top: 20, right: 18, bottom: 22, left: 18 },
    screenMaxWidthPx: 1080,
  },
  typeScale: {
    title: { sizePx: 30, weight: 600 },
    subtitle: { sizePx: 17, weight: 400 },
    section: { sizePx: 22, weight: 600 },
    subsection: { sizePx: 15, weight: 600 },
    table: { sizePx: 13 },
    tableHeader: { sizePx: 10, uppercase: true, letterSpaced: true },
    code: { sizePx: 12 },
  },
  layout: {
    cover: {
      topBorderPx: 4,
      markSizePx: { width: 46, height: 48 },
      wordmarkHeightPx: 30,
      classificationLetterSpacing: "0.2em",
    },
    sectionTitleBottomBorderPx: 2,
    tableRowBorder: "lineSoft",
    tableHeaderBorder: "line",
    noteLeftBorderPt: 3,
    codeLeftBorderPx: 3,
    pdfHeader: { offsetFromTopMm: 12, ruleWidthPt: 0.4 },
    pdfFooter: { offsetFromBottomMm: 10, ruleWidthPt: 0.4 },
  },
} as const;

export const DECK_TOKENS_VERSION = "1.0.0";

const deckLight = {
  paper: "#FFFFFF",
  paper2: "#EDEEEB",
  paper3: "#E1DAD0",
  ink: "#1D1C22",
  ink2: "#3F4045",
  ink3: "#606162",
  muted: "#5F6067",
  navy: "#557994",
  navy2: "#6B8089",
  navy3: "#A3C1DB",
  navy4: "#557994",
  accent: "#A36630",
  accent2: "#F6A03F",
  gold: "#A36630",
  gold2: "#F6A03F",
  success: "#3F7A5C",
  warning: "#B8862B",
  rule: "#D8D6D5",
  rule2: "#E7E7E7",
} as const;

const deckDark = {
  paper: "#1D1C22",
  paper2: "#1B1B20",
  paper3: "#232329",
  ink: "#F4F4F6",
  ink2: "#C9CACF",
  ink3: "#9C9C9D",
  muted: "#7E7F87",
  navy: "#A3C1DB",
  navy2: "#AEB6C1",
  navy3: "#BBC1BF",
  navy4: "#6D7787",
  accent: "#F6A03F",
  accent2: "#FDDA88",
  gold: "#F6A03F",
  gold2: "#FDDA88",
  success: "#6BB596",
  warning: "#E0AC44",
  rule: "#2E2E34",
  rule2: "#212127",
} as const;

export const deckTokens = {
  name: "nebbos-deck-delta-brief-editorial",
  version: DECK_TOKENS_VERSION,
  source:
    "delta-brief-editorial skill (assets/tokens.css, references/design-system.md); Delta brief NEB-26-02 Rev 19; marketing register ratified 2026-08-22",
  fonts: {
    serif: {
      stack: [
        "trust-3a",
        "Trust 3A",
        "Newsreader",
        "Charter",
        "Iowan Old Style",
        "Georgia",
        "serif",
      ],
      role: "display and headings",
      files: null,
      licenseNote:
        "Trust 3A is served from Adobe Fonts kit gkk3ycm (domain allowlist); not self-hostable. Newsreader (Google Fonts) is the fallback.",
    },
    sans: {
      stack: [
        "Host Grotesk",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "system-ui",
        "sans-serif",
      ],
      role: "body and UI",
      files: null,
      licenseNote: "Google Fonts, weights 300-800 with italics.",
    },
    mono: {
      stack: [
        "JetBrains Mono",
        "SF Mono",
        "Menlo",
        "Consolas",
        "Roboto Mono",
        "monospace",
      ],
      role: "numbers, code, IDs",
      files: null,
      licenseNote: "Google Fonts, weights 400 and 500.",
    },
    weights: { xlight: 200, light: 300, bold: 700 },
    lineHeight: { display: 1.08, text: 1.1 },
    bodySizePx: 15,
    bodyLineHeight: 1.55,
  },
  color: { light: deckLight, dark: deckDark },
  shapes: {
    emphasisCardRadius: "0 30px 0 0",
    plusMarker: { longPx: 19, thicknessPx: 1.5, color: "orange" },
    eyebrow: {
      case: "uppercase",
      letterSpacing: "0.18em",
      font: "mono",
      color: "gold",
    },
  },
} as const;
