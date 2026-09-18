// Matches text-bearing nodes between our dump and the reference dump by their visible text
// and reports typography/colour/size differences. Usage: node tests/visual/diff-text.mjs [ours] [ref]
import { readFileSync } from "node:fs";

const [, , oursPath = "tests/visual/out/default-1280x576.txt", refPath = "docs/reference-measurements/rendered-dom-1280x576.txt"] = process.argv;

const parse = (file) =>
  readFileSync(file, "utf8")
    .split("\n")
    .map((line) => {
      const m = line.match(/^(\s*)(\w+) \[([-\d.,]+)\](?: "([^"]*)")?(?: \{([^}]*)\})? (\{.*\})?$/);
      if (!m || !m[4]) return null;
      const [x, y, w, h] = m[3].split(",").map(Number);
      let props = {};
      try { props = JSON.parse(m[6] ?? "{}"); } catch { /* ignore */ }
      return { tag: m[2], x, y, w, h, text: m[4].trim(), props };
    })
    .filter(Boolean);

const ours = parse(oursPath);
const ref = parse(refPath);
const keys = ["fontSize", "fontWeight", "lineHeight", "color", "letterSpacing", "textDecoration"];
const norm = (v, k) => {
  if (v === undefined) return k === "fontSize" ? "14px" : k === "fontWeight" ? "400" : k === "color" ? "rgb(34, 34, 34)" : k === "lineHeight" ? "20px" : "none";
  if (k === "lineHeight" && v === "20.02px") return "20px";
  if (k === "textDecoration") return v.split(" ")[0];
  return v;
};
const round = (n) => Math.round(n * 10) / 10;

let issues = 0;
const seen = new Set();
for (const a of ours) {
  if (a.text.length < 3 || seen.has(a.text)) continue;
  seen.add(a.text);
  const b = ref.find((r) => r.text === a.text && r.tag !== "body");
  if (!b) continue;
  const diffs = [];
  for (const k of keys) {
    const va = norm(a.props[k], k);
    const vb = norm(b.props[k], k);
    if (k === "lineHeight" && va !== vb) {
      const na = parseFloat(va), nb = parseFloat(vb);
      if (Math.abs(na - nb) <= 0.6) continue;
    }
    if (va !== vb) diffs.push(`${k}: ${va} ≠ ${vb}`);
  }
  if (Math.abs(a.h - b.h) > 1.5) diffs.push(`h: ${round(a.h)} ≠ ${round(b.h)}`);
  if (a.tag !== b.tag && !(["div", "p", "span", "h2", "h3"].includes(a.tag) && ["div", "p", "span", "h2", "h3"].includes(b.tag))) diffs.push(`tag: ${a.tag} ≠ ${b.tag}`);
  if (diffs.length) {
    issues++;
    console.log(`"${a.text.slice(0, 40)}" → ${diffs.join("; ")}`);
  }
}
console.log(`\n${issues} text nodes differ (of ${seen.size} compared)`);
