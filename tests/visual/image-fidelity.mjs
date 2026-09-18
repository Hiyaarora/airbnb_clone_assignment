// Measures how far next/image output is from the original JPEG at the rendered size,
// and audits loading/object-fit attributes of every image on the page.
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3000";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "networkidle" });

const result = await p.evaluate(async () => {
  const load = (src) =>
    new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = src;
    });
  const draw = (img, w, h) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    return ctx.getImageData(0, 0, w, h).data;
  };
  const diff = (a, b) => {
    let sum = 0, max = 0;
    for (let i = 0; i < a.length; i += 4) {
      const d = (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3;
      sum += d;
      if (d > max) max = d;
    }
    return { mean: +(sum / (a.length / 4)).toFixed(3), max };
  };

  // Hero cell 1 renders at 560×494 at a 1120 track.
  const hero = document.querySelector("#hero-gallery img");
  const original = new URL(hero.currentSrc).searchParams.get("url") ?? hero.currentSrc;
  const orig = await load(original);
  const w = Math.round(hero.getBoundingClientRect().width);
  const h = Math.round(hero.getBoundingClientRect().height);
  const base = draw(orig, w, h);
  const out = { rendered: `${w}x${h}`, original, served: hero.currentSrc.slice(0, 80), naturalServed: `${hero.naturalWidth}x${hero.naturalHeight}` };
  for (const q of [75, 90]) {
    const served = await load(`/_next/image?url=${encodeURIComponent(original)}&w=1080&q=${q}`);
    out[`q${q}`] = diff(base, draw(served, w, h));
  }
  const cur = await load(hero.currentSrc);
  out.current = diff(base, draw(cur, w, h));

  out.images = [...document.images].map((i) => {
    const cs = getComputedStyle(i);
    const r = i.getBoundingClientRect();
    return {
      src: (new URL(i.currentSrc || i.src).searchParams.get("url") ?? i.src).split("/").slice(-2).join("/").slice(0, 40),
      box: `${Math.round(r.width)}x${Math.round(r.height)}`,
      ratio: +(r.width / r.height).toFixed(3),
      fit: cs.objectFit,
      pos: cs.objectPosition,
      loading: i.loading,
      fetchpriority: i.getAttribute("fetchpriority"),
      complete: i.complete,
    };
  });
  return out;
});
console.log(JSON.stringify(result, null, 1));
await b.close();
