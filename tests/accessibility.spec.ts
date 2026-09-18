import { expect, test } from "@playwright/test";
import { activeLabel, amenitiesModal, expectOpen, lightbox } from "./helpers";

test.describe("Accessibility", () => {
  test("skip link is the first tab stop, becomes visible on focus and targets main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const link = page.getByRole("link", { name: "Skip to content" });
    await expect(link).toBeFocused();
    const left = await link.evaluate((el) => el.getBoundingClientRect().left);
    expect(left).toBeGreaterThanOrEqual(0);
    await expect(link).toHaveAttribute("href", "#main");
  });

  test("every keyboard-focused control shows the focus ring; tab order starts logo → search → nav", async ({ page }) => {
    await page.goto("/");
    const labels: string[] = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      labels.push(await activeLabel(page));
      const ring = await page.evaluate(() => {
        const cs = getComputedStyle(document.activeElement as Element);
        return `${cs.outlineStyle} ${cs.outlineWidth}`;
      });
      expect(ring, `focus ring on ${labels.at(-1)}`).toBe("solid 2px");
    }
    expect(labels.slice(0, 4)).toEqual(["Skip to content", "Airbnb homepage", "Anywhere", "Anytime"]);
  });

  test("dialogs have names and aria-modal; hidden ones are aria-hidden", async ({ page }) => {
    await page.goto("/");
    const dialogs = page.locator('[role="dialog"]');
    await expect(dialogs).toHaveCount(3);
    for (const name of ["Photo tour", "Photo viewer", "What this place offers"]) {
      const d = page.locator(`[role="dialog"][aria-label="${name}"]`);
      await expect(d).toHaveAttribute("aria-modal", "true");
      await expect(d).toHaveAttribute("aria-hidden", "true");
    }
  });

  test("amenities modal body is keyboard scrollable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Show all \d+ amenities/ }).click();
    await expectOpen(amenitiesModal(page));
    await page.keyboard.press("Tab"); // Close → list region
    expect(await activeLabel(page)).toBe("Amenities list");
    await page.keyboard.press("End");
    const scrolled = await page.locator('[aria-label="Amenities list"]').evaluate((el) => el.scrollTop);
    expect(scrolled).toBeGreaterThan(100);
  });

  test("focus stays inside the lightbox when the focused arrow becomes disabled", async ({ page }) => {
    await page.goto("/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1001");
    await expectOpen(lightbox(page));
    await page.getByRole("button", { name: "Previous", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(lightbox(page).getByTestId("lightbox-counter")).toHaveText("1 of 43");
    expect(await activeLabel(page)).toBe("Close");
  });

  test("lightbox live region announces the current photo", async ({ page }) => {
    await page.goto("/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1019");
    await expectOpen(lightbox(page));
    await expect(lightbox(page).locator("[aria-live]")).toHaveText("Gym, photo 20 of 43");
    await page.keyboard.press("ArrowRight");
    await expect(lightbox(page).locator("[aria-live]")).toHaveText("Gym, photo 21 of 43");
  });

  test("Space and Enter activate focused controls (Show all photos, Close)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Show all photos" }).focus();
    await page.keyboard.press("Space");
    await expectOpen(page.locator('[role="dialog"][aria-label="Photo tour"]'));
    await page.keyboard.press("Enter"); // Back button holds focus → closes
    await expect(page.locator('[role="dialog"][aria-label="Photo tour"]')).toHaveAttribute("data-open", "false");
    await page.getByRole("button", { name: "Share" }).focus();
    await page.keyboard.press("Space");
    await expect(page.getByRole("status")).toHaveText("Share options");
  });

  test("content images have alt text and decorative ones are empty", async ({ page }) => {
    await page.goto("/");
    const missing = await page.evaluate(() => [...document.images].filter((i) => !i.hasAttribute("alt")).length);
    expect(missing).toBe(0);
    const heroAlts = await page.locator("#hero-gallery img").evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).alt));
    expect(heroAlts.every((a) => a === "")).toBe(true); // buttons carry the accessible name
    const tourAlts = await page.locator('[aria-label="Photo tour"] [data-idx] img').evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).alt));
    expect(tourAlts.every((a) => a.length > 0)).toBe(true);
  });
});
