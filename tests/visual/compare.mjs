// Compares landmark geometry between our dump and the reference dump (same line format).
// Usage: node tests/visual/compare.mjs [ours.txt] [reference.txt]
import { readFileSync } from "node:fs";

const [, , oursPath = "tests/visual/out/default-1280x576.txt", refPath = "docs/reference-measurements/rendered-dom-1280x576.txt"] = process.argv;

const parse = (file) =>
  readFileSync(file, "utf8")
    .split("\n")
    .map((line) => {
      const m = line.match(/^(\s*)(\w+) \[([-\d.,]+)\](?: "([^"]*)")?(?: \{([^}]*)\})?/);
      if (!m) return null;
      const [x, y, w, h] = m[3].split(",").map(Number);
      return { tag: m[2], x, y, w, h, text: m[4] ?? "", attrs: m[5] ?? "", line };
    })
    .filter(Boolean);

const ours = parse(oursPath);
const ref = parse(refPath);

// Landmarks identified by visible text (first match with matching tag where given).
const LANDMARKS = [
  ["Header", (n) => n.tag === "header" && n.y < 10],
  ["h1", (n) => n.tag === "h1"],
  ["Share", (n) => n.text === "Share"],
  ["Hero grid", (n) => n.attrs.includes("id=heroGrid") || n.attrs.includes("id=hero-gallery")],
  ["Show all photos", (n) => n.text === "Show all photos"],
  ["Overview h2", (n) => n.tag === "h2" && n.text.startsWith("Entire")],
  ["Meta line", (n) => n.text.startsWith("3 guests")],
  ["Guest favourite text", (n) => n.text.startsWith("One of the most loved")],
  ["Hosted by", (n) => n.text.startsWith("Hosted by")],
  ["Outdoor entertainment", (n) => n.text === "Outdoor entertainment"],
  ["Self check-in", (n) => n.text === "Self check-in"],
  ["Translation notice", (n) => n.text.startsWith("Some info has been")],
  ["Description p", (n) => n.tag === "p" && n.text.startsWith("🌴")],
  ["Show more (desc)", (n) => n.tag === "button" && n.text === "Show more" && n.y < 2000],
  ["Where you'll sleep", (n) => n.text.startsWith("Where you")],
  ["Bedroom caption", (n) => n.text === "Bedroom" && n.tag === "div"],
  ["What this place offers", (n) => n.tag === "h2" && n.text === "What this place offers"],
  ["Kitchen", (n) => n.text === "Kitchen" && n.tag === "span"],
  ["Show all 50 amenities", (n) => n.text.startsWith("Show all 50")],
  ["5 nights in Candolim", (n) => n.text.startsWith("5 nights in")],
  ["October 2026", (n) => n.text === "October 2026"],
  ["Clear dates", (n) => n.text === "Clear dates"],
  ["Promo text", (n) => n.text.startsWith("Get 10% off")],
  ["Price ₹ 28,499 (card)", (n) => n.text === "₹ 28,499" && n.w > 70],
  ["CHECK-IN", (n) => /^CHECK-IN$/i.test(n.text)],
  ["Reserve (card)", (n) => n.text === "Reserve" && n.h > 44],
  ["Report this listing", (n) => n.text === "Report this listing"],
  ["4.95 big", (n) => n.text === "4.95" && n.h > 100],
  ["Guest favourite title", (n) => n.text === "Guest favourite" && n.h > 25],
  ["How reviews work", (n) => n.text === "How reviews work"],
  ["Overall rating", (n) => n.text === "Overall rating"],
  ["Cleanliness", (n) => n.text === "Cleanliness" && n.h < 25],
  ["Comfort chip", (n) => n.tag === "button" && n.text.startsWith("Comfort")],
  ["Amit", (n) => n.text === "Amit"],
  ["Aheesh", (n) => n.text === "Aheesh"],
  ["Samiksha", (n) => n.text === "Samiksha"],
  ["Vaibhav S", (n) => n.text === "Vaibhav S"],
  ["Show all 19 reviews", (n) => n.text.startsWith("Show all 19")],
  ["Where you’ll be", (n) => n.text.startsWith("Where you’ll be")],
  ["Candolim, Goa, India", (n) => n.text === "Candolim, Goa, India"],
  ["Exact location", (n) => n.text.startsWith("Exact location")],
  ["Neighbourhood highlights", (n) => n.text === "Neighbourhood highlights"],
  ["Meet your host", (n) => n.text === "Meet your host"],
  ["Mirashya Homes (card)", (n) => n.text === "Mirashya Homes"],
  ["1,463", (n) => n.text === "1,463"],
  ["Co-Hosts", (n) => n.text === "Co-Hosts"],
  ["Host details", (n) => n.text === "Host details"],
  ["Message host", (n) => n.text === "Message host"],
  ["Things to know", (n) => n.text === "Things to know"],
  ["Cancellation policy", (n) => n.text === "Cancellation policy"],
  ["More stays nearby", (n) => n.text === "More stays nearby"],
  ["Beautiful Studio", (n) => n.text.startsWith("Beautiful Studio")],
  ["Page height", (n) => n.tag === "body"],
];

const find = (list, pred) => list.find(pred);
console.log("Landmark".padEnd(28), "ours(x,y,w,h)".padEnd(24), "ref(x,y,w,h)".padEnd(24), "Δy   Δh");
for (const [name, pred] of LANDMARKS) {
  const a = find(ours, pred);
  const b = find(ref, pred);
  const fmt = (n) => (n ? `${Math.round(n.x)},${Math.round(n.y)},${Math.round(n.w)},${Math.round(n.h)}` : "—");
  const dy = a && b ? Math.round(a.y - b.y) : "";
  const dh = a && b ? Math.round(a.h - b.h) : "";
  console.log(name.padEnd(28), fmt(a).padEnd(24), fmt(b).padEnd(24), String(dy).padStart(4), String(dh).padStart(4));
}
