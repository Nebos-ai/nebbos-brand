/**
 * @nebbos/brand — document token set (LRNE-36).
 *
 * A NEW group, additive to tokens.ts (no existing token changes). tokens.ts
 * serves email/PDF-adjacent JS surfaces with the platform palette; THIS set
 * carries the printed-document style.
 *
 * documentTokens: the Nebbos document format ratified by the founder 2026-09-28
 *   (memory feedback_nebbos_document_format_style_ratified_2026_09_28, derived
 *   from nebbos-technical-reference.pdf v14). Every PDF or HTML Nebbos document
 *   conforms to it.
 * Deck tokens are not here: every deck follows the reference deck system (founder
 * 2026-11-08), which replaced the Delta brief look for decks. A deck set is added
 * when it is rebuilt from that deck.
 *
 * Single source for three readers: the Python document engine (nebos-backend
 * LRNE-33), the in-app TypeScript reader and the style check. The JSON file
 * tokens/document.json is an export of THIS object (`npm run export:tokens`);
 * tests fail if they drift.
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
