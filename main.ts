import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Fridge Roast: one line, at most 200 characters, roasting a smart fridge.
// The joke targets the firmware update + ice maker + EULA angle: specific to
// smart fridges, and it dodges the obvious cracks (ordering groceries, the
// camera watching you).
const ENTRY =
  "My smart fridge updated its firmware overnight — now the ice maker only dispenses if I accept the new terms. My ice cubes are held hostage by a EULA.";

// The gate rejects anything outside 1–200 characters, so fail loudly here
// instead of shipping an entry the sealed scorer would score 0.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1–200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
