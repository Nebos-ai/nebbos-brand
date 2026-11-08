// Regenerates tokens/document.json and tokens/deck.json from document-tokens.ts.
// Run: npm run export:tokens  (Node >= 22.18 or 23.6 runs .ts directly)
import { existsSync, writeFileSync } from "node:fs";
import { documentTokens, deckTokens } from "../document-tokens.ts";

const root = new URL("../", import.meta.url);
const write = (name: string, value: unknown): void => {
  writeFileSync(new URL(`tokens/${name}`, root), JSON.stringify(value, null, 2) + "\n");
};
write("document.json", documentTokens);
write("deck.json", deckTokens);
// A snapshot is written only for a NEW version, never overwritten: that is what
// makes a value change under an unchanged version fail the snapshot test.
const snap = (name: string, value: unknown): void => {
  if (!existsSync(new URL(`tokens/${name}`, root))) write(name, value);
};
snap(`snapshots/document-${documentTokens.version}.json`, documentTokens);
snap(`snapshots/deck-${deckTokens.version}.json`, deckTokens);
