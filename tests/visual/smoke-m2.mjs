// Quick behavioural smoke check for Milestone 2 (replaced by Playwright specs in M9).
import { chromium } from "@playwright/test";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
p.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });

const btn = p.getByRole("button", { name: /Show all 50 amenities/ });
await btn.scrollIntoViewIfNeeded();
await btn.click();
await p.waitForTimeout(400);
const opened = await p.evaluate(() => ({
  focus: document.activeElement?.getAttribute("aria-label"),
  locked: document.body.dataset.scrollLocked,
  mainInert: document.querySelector("main")?.hasAttribute("inert"),
  dialogHidden: document.querySelector("[role=dialog]")?.getAttribute("aria-hidden"),
}));
await p.keyboard.press("Tab");
const afterTab = await p.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName);
await p.keyboard.press("Escape");
await p.waitForTimeout(400);
const closed = await p.evaluate(() => ({
  focus: document.activeElement?.textContent?.trim().slice(0, 30),
  locked: document.body.dataset.scrollLocked ?? null,
  mainInert: document.querySelector("main")?.hasAttribute("inert"),
}));
await p.evaluate(() => window.scrollTo(0, 700));
await p.waitForTimeout(500);
const sticky = await p.evaluate(() => {
  const bar = document.querySelector('[aria-label="Listing sections"]')?.closest("[data-visible]");
  return `${getComputedStyle(bar).opacity} active=${bar.querySelector("[aria-current]")?.textContent}`;
});
await p.evaluate(() => window.scrollTo(0, 0));
await p.getByRole("button", { name: "Share" }).click();
await p.waitForTimeout(300);
const toast = await p.evaluate(() => {
  const t = document.querySelector("[role=status]");
  return `${t.textContent} opacity=${getComputedStyle(t).opacity}`;
});
await p.getByRole("button", { name: "Save" }).click();
await p.waitForTimeout(300);
const saved = await p.evaluate(() => document.querySelector('[aria-pressed="true"]')?.textContent);
console.log(JSON.stringify({ opened, afterTab, closed, sticky, toast, saved, errors }, null, 1));
await b.close();
