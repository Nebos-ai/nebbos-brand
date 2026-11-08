import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  documentTokens,
  deckTokens,
  DOCUMENT_TOKENS_VERSION,
  DECK_TOKENS_VERSION,
} from "../document-tokens.ts";

const root = new URL("../", import.meta.url);
const readJson = (rel: string): unknown => JSON.parse(readFileSync(new URL(rel, root), "utf8"));

// Ratified values, typed out independently of the module under test
// (memory feedback_nebbos_document_format_style_ratified_2026_09_28).
const RATIFIED_COLORS = {
  paper: "#FFFFFF",
  paper2: "#F7F5F1",
  ink: "#1D1C22",
  ink2: "#4A4952",
  ink3: "#6B6A73",
  accent: "#FF6B1E",
  gold: "#9A5D2A",
  lineSoft: "#ECE9E2",
  line: "#D4D2CC",
};

test("document.json carries every ratified document token", () => {
  const doc = readJson("tokens/document.json") as typeof documentTokens;
  assert.deepEqual(doc.color, RATIFIED_COLORS);
  assert.equal(doc.fonts.body.family, "Manrope");
  assert.deepEqual(doc.fonts.body.weights, [300, 400, 500, 600, 700]);
  assert.equal(doc.fonts.mono.family, "Fira Code");
  assert.deepEqual(doc.fonts.mono.weights, [400, 500]);
  assert.equal(doc.fonts.wordmark.family, "Fraunces");
  assert.equal(doc.fonts.wordmark.opticalSize, 144);
  assert.equal(doc.fonts.pdfOverlay.family, "Helvetica");
  assert.equal(doc.fonts.pdfOverlay.sizePt, 7.5);
  assert.equal(doc.page.size, "A4");
  assert.deepEqual(doc.page.margin, { top: "20mm", right: "18mm", bottom: "22mm", left: "18mm" });
  const px = (k: keyof typeof doc.typeScale): number => doc.typeScale[k].sizePx;
  assert.deepEqual(
    [px("title"), px("subtitle"), px("section"), px("subsection"), px("table"), px("tableHeader"), px("code")],
    [30, 17, 22, 15, 13, 10, 12],
  );
  assert.equal(doc.typeScale.tableHeader.uppercase, true);
  assert.equal(doc.layout.cover.topBorderPx, 4);
  assert.equal(doc.layout.cover.classificationLetterSpacing, "0.2em");
  assert.equal(doc.layout.sectionTitleBottomBorderPx, 2);
  assert.equal(doc.layout.codeLeftBorderPx, 3);
});

test("JSON exports equal the TypeScript objects (one source for engine and app)", () => {
  assert.deepEqual(readJson("tokens/document.json"), JSON.parse(JSON.stringify(documentTokens)));
  assert.deepEqual(readJson("tokens/deck.json"), JSON.parse(JSON.stringify(deckTokens)));
});

test("deck tokens record the Delta brief editorial fonts and colours as given", () => {
  assert.deepEqual(deckTokens.fonts.serif.stack.slice(0, 3), ["trust-3a", "Trust 3A", "Newsreader"]);
  assert.equal(deckTokens.fonts.sans.stack[0], "Host Grotesk");
  assert.equal(deckTokens.fonts.mono.stack[0], "JetBrains Mono");
  assert.equal(deckTokens.color.light.paper, "#FFFFFF");
  assert.equal(deckTokens.color.light.ink, "#1D1C22");
  assert.equal(deckTokens.color.light.gold, "#A36630");
  assert.equal(deckTokens.color.light.accent2, "#F6A03F");
  assert.equal(deckTokens.color.dark.paper, "#1D1C22");
  assert.equal(Object.keys(deckTokens.color.light).length, 19);
  assert.equal(Object.keys(deckTokens.color.dark).length, 19);
  assert.equal(deckTokens.shapes.emphasisCardRadius, "0 30px 0 0");
});

// sfnt directory: version 0x00010000 (TrueType outlines), glyf present, fvar absent (static).
function sfntTables(rel: string): string[] {
  const buf = readFileSync(new URL(rel, root));
  assert.equal(buf.readUInt32BE(0), 0x00010000, `${rel} is not a TrueType font`);
  const n = buf.readUInt16BE(4);
  assert.ok(n > 0);
  const tags: string[] = [];
  for (let i = 0; i < n; i++) tags.push(buf.toString("latin1", 12 + i * 16, 16 + i * 16));
  return tags;
}

test("every font file named in the tokens exists, loads as a static TTF and has its OFL licence", () => {
  for (const group of [documentTokens.fonts.body, documentTokens.fonts.mono]) {
    assert.ok(existsSync(new URL(group.license, root)), `${group.license} missing`);
    assert.match(readFileSync(new URL(group.license, root), "utf8"), /SIL OPEN FONT LICENSE Version 1\.1/);
    assert.equal(Object.keys(group.files).length, group.weights.length);
    for (const rel of Object.values(group.files)) {
      const tags = sfntTables(rel);
      assert.ok(tags.includes("glyf"), `${rel} has no glyf table`);
      assert.ok(!tags.includes("fvar"), `${rel} is a variable font, expected static`);
    }
  }
});

test("snapshot: values changed without a version bump fail", () => {
  for (const [name, tokens, version] of [
    ["document", documentTokens, DOCUMENT_TOKENS_VERSION],
    ["deck", deckTokens, DECK_TOKENS_VERSION],
  ] as const) {
    const rel = `tokens/snapshots/${name}-${version}.json`;
    assert.ok(existsSync(new URL(rel, root)), `no snapshot for ${name} ${version}: bump the version and run npm run export:tokens`);
    assert.deepEqual(
      JSON.parse(JSON.stringify(tokens)),
      readJson(rel),
      `${name} tokens changed but version is still ${version}: bump the version, then run npm run export:tokens`,
    );
  }
});
