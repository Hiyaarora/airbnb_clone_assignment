import { expect, test } from "@playwright/test";
import { activeLabel, expectClosed, expectOpen, mainInert, scrollLocked, tour, tourScrollTop } from "./helpers";

test.describe("Hero gallery → Photo Tour", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders five photos and the Show all photos button", async ({ page }) => {
    const cells = page.locator("#hero-gallery button[aria-label*='Opens the photo tour']");
    await expect(cells).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Show all photos" })).toBeVisible();
  });

  test("Show all photos opens the tour at the top with URL param, scroll lock and inert page", async ({ page }) => {
    await page.getByRole("button", { name: "Show all photos" }).click();
    await expectOpen(tour(page));
    expect(page.url()).toContain("modal=PHOTO_TOUR_SCROLLABLE");
    expect(await tourScrollTop(page)).toBe(0);
    expect(await scrollLocked(page)).toBe(true);
    expect(await mainInert(page)).toBe(true);
    expect(await activeLabel(page)).toBe("Back");
  });

  test("a hero image opens the tour scrolled to its room (24px below the bar)", async ({ page }) => {
    await page.getByRole("button", { name: /photo 5 of 5/ }).click(); // Exterior photo
    await expectOpen(tour(page));
    const offset = await page.evaluate(() => {
      const section = document.getElementById("tour-room-exterior")!;
      const scroller = section.closest<HTMLElement>('[role="region"]')!;
      return Math.round(section.getBoundingClientRect().top - scroller.getBoundingClientRect().top);
    });
    expect(offset).toBe(24);
  });

  test("Back button, Escape and browser Back all close the tour and restore focus", async ({ page }) => {
    const showAll = page.getByRole("button", { name: "Show all photos" });
    await showAll.click();
    await page.getByRole("button", { name: "Back" }).click();
    await expectClosed(tour(page));
    expect(page.url()).not.toContain("modal=");
    expect(await activeLabel(page)).toBe("Show all photos");
    expect(await scrollLocked(page)).toBe(false);

    await showAll.click();
    await page.keyboard.press("Escape");
    await expectClosed(tour(page));
    expect(await activeLabel(page)).toBe("Show all photos");

    await showAll.click();
    await page.goBack();
    await expectClosed(tour(page));
    expect(await mainInert(page)).toBe(false);
  });

  test("category thumbnails scroll to their room", async ({ page }) => {
    await page.getByRole("button", { name: "Show all photos" }).click();
    await page.getByRole("navigation", { name: "Photo categories" }).getByRole("button", { name: "Gym" }).click();
    await expect.poll(() => tourScrollTop(page)).toBeGreaterThan(1000);
  });

  test("keyboard: Enter on Show all photos opens, Tab is trapped inside the tour", async ({ page }) => {
    await page.getByRole("button", { name: "Show all photos" }).focus();
    await page.keyboard.press("Enter");
    await expectOpen(tour(page));
    await page.keyboard.press("Shift+Tab");
    // wraps to the last focusable element of the tour (last photo), never the page behind
    const label = await activeLabel(page);
    expect(label).toMatch(/photo 43 of 43$/);
  });

  test("deep link restores the tour", async ({ page }) => {
    await page.goto("/?modal=PHOTO_TOUR_SCROLLABLE");
    await expectOpen(tour(page));
    await expect(page.locator('[role="dialog"][aria-label="Photo viewer"]')).toHaveAttribute("data-open", "false");
  });
});
