// Reads hover/focus computed styles on our build for comparison with docs/reference-states.md.
import { chromium } from "@playwright/test";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });

const probe = (sel) =>
  p.locator(sel).first().evaluate((el) => {
    const cs = getComputedStyle(el);
    const after = getComputedStyle(el, "::after");
    const img = el.querySelector("img");
    const ic = img ? getComputedStyle(img) : null;
    return `bg=${cs.backgroundColor} border=${cs.borderColor} tf=${cs.transform} after=${after.backgroundColor}` + (ic ? ` img.tf=${ic.transform} img.filter=${ic.filter}` : "");
  });

const out = {};
const hoverProbe = async (name, sel) => {
  await p.hover(sel);
  await p.waitForTimeout(450);
  out[name] = await probe(sel);
};
await hoverProbe("hero cell", "#hero-gallery button");
await hoverProbe("show all photos", "#hero-gallery > button");
await hoverProbe("share", 'button:has(> span:text("Share"))');
await hoverProbe("header globe", 'button[aria-label="Choose a language and currency"]');
await hoverProbe("become a host", 'a:text("Become a host")');
await hoverProbe("outline button", 'button:text("Show all 50 amenities")');
await hoverProbe("message host", 'button:text("Message host")');
await hoverProbe("chip", 'button:has-text("Comfort")');
await p.getByRole("button", { name: "Show all photos" }).click();
await p.waitForTimeout(500);
await hoverProbe("tour back", 'button[aria-label="Back"]');
await hoverProbe("tour nav thumb", '[aria-label="Photo categories"] button');
await hoverProbe("tour tile", '[data-idx="0"]');
await p.locator('[data-idx="0"]').click();
await p.waitForTimeout(500);
await hoverProbe("lightbox next", 'button[aria-label="Next"]');
await hoverProbe("lightbox close", 'button[aria-label="Close"]');
out["lightbox prev (disabled)"] = await p.evaluate(() => {
  const el = document.querySelector('button[aria-label="Previous"]');
  const cs = getComputedStyle(el);
  return `opacity=${cs.opacity} border=${cs.borderColor}`;
});
// focus ring
await p.keyboard.press("Tab");
out["focus ring"] = await p.evaluate(() => {
  const cs = getComputedStyle(document.activeElement);
  return `${document.activeElement.getAttribute("aria-label")} outline=${cs.outline} offset=${cs.outlineOffset}`;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
