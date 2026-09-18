// Behavioural smoke check for the Photo Tour + Lightbox flow against the documented reference behaviour.
import { chromium } from "@playwright/test";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 576 } });
const errors = [];
p.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
p.on("pageerror", (e) => errors.push(String(e)));
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });

const state = () =>
  p.evaluate(() => {
    const tour = document.querySelector('[aria-label="Photo tour"]');
    const lb = document.querySelector('[aria-label="Photo viewer"]');
    const scroller = tour?.querySelector("[class*=scroll]");
    const f = document.activeElement;
    return {
      url: location.search,
      tour: tour?.getAttribute("data-open"),
      tourOpacity: getComputedStyle(tour).opacity,
      lightbox: lb?.getAttribute("data-open"),
      counter: lb?.querySelector("[class*=counter]")?.textContent ?? "",
      title: lb?.querySelector("h2")?.textContent ?? "",
      tourScroll: Math.round(scroller?.scrollTop ?? -1),
      locked: document.body.dataset.scrollLocked ?? null,
      mainInert: document.querySelector("main").hasAttribute("inert"),
      tourInert: tour?.hasAttribute("inert"),
      focus: `${f.tagName}${f.getAttribute("aria-label") ? "[" + f.getAttribute("aria-label") + "]" : ""}${f.textContent.trim().slice(0, 15)}`,
      prevDisabled: lb?.querySelector('[aria-label=Previous]')?.disabled,
      nextDisabled: lb?.querySelector('[aria-label=Next]')?.disabled,
    };
  });

const log = {};
// 1. Hero image 3 → tour scrolled to Living room 2
await p.getByRole("button", { name: /image 3$/ }).click();
await p.waitForTimeout(500);
log.heroClick = await state();
log.room1SectionTop = await p.evaluate(() => {
  const s = document.getElementById("tour-room-living-room-2");
  const sc = s.closest("[class*=scroll]");
  return Math.round(s.getBoundingClientRect().top - sc.getBoundingClientRect().top);
});
// 2. Escape closes the tour, focus back to hero button
await p.keyboard.press("Escape");
await p.waitForTimeout(500);
log.escapeTour = await state();
// 3. Show all photos → tour at top
await p.getByRole("button", { name: "Show all photos" }).click();
await p.waitForTimeout(500);
log.showAll = await state();
// 4. Open lightbox from tile idx 20
await p.locator('[data-idx="20"]').scrollIntoViewIfNeeded();
await p.locator('[data-idx="20"]').click();
await p.waitForTimeout(500);
log.lightbox20 = await state();
// 5. ArrowRight ×2, ArrowLeft ×1
await p.keyboard.press("ArrowRight");
await p.keyboard.press("ArrowRight");
await p.keyboard.press("ArrowLeft");
await p.waitForTimeout(200);
log.afterArrows = await state();
// 6. Jump to the end and check no wrap
await p.keyboard.press("End"); // no-op expected
for (let i = 0; i < 25; i++) await p.keyboard.press("ArrowRight");
await p.waitForTimeout(200);
log.atLast = await state();
await p.keyboard.press("ArrowRight");
log.pastLast = (await state()).counter;
// 7. Tab stays inside the lightbox
const tabs = [];
for (let i = 0; i < 5; i++) {
  await p.keyboard.press("Tab");
  tabs.push((await state()).focus);
}
log.tabCycle = tabs;
// 8. Backdrop click does nothing
await p.mouse.click(150, 500);
await p.waitForTimeout(200);
log.backdrop = (await state()).lightbox;
// 9. Escape closes lightbox only; focus returns to the tile
await p.keyboard.press("Escape");
await p.waitForTimeout(500);
log.escapeLightbox = await state();
// 10. Browser back closes the tour
await p.goBack();
await p.waitForTimeout(500);
log.browserBack = await state();
// 11. Deep link restore
await p.goto("http://localhost:3000/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1005", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
log.deepLink = await state();
log.deepLinkImage = await p.evaluate(() => {
  const img = document.querySelector('[aria-label="Photo viewer"] img');
  const r = img.getBoundingClientRect();
  return `${Math.round(r.width)}x${Math.round(r.height)} fit=${getComputedStyle(img).objectFit} natural=${img.naturalWidth}x${img.naturalHeight}`;
});
await p.screenshot({ path: "tests/visual/out/lightbox-deeplink.png" });
await p.keyboard.press("Escape");
await p.waitForTimeout(400);
log.afterDeepLinkEscape = await state();
await p.keyboard.press("Escape");
await p.waitForTimeout(400);
log.afterSecondEscape = await state();
log.errors = errors;
console.log(JSON.stringify(log, null, 1));
await b.close();
