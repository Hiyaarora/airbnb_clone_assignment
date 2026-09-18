import { expect, test } from "@playwright/test";
import { activeLabel, expectClosed, expectOpen, lightbox, scrollLocked, tour, tourScrollTop } from "./helpers";

const TOTAL = 43;

async function openLightboxAt(page: import("@playwright/test").Page, index: number) {
  await page.goto("/");
  await page.getByRole("button", { name: "Show all photos" }).click();
  const tile = page.locator(`[data-idx="${index}"]`);
  await tile.scrollIntoViewIfNeeded();
  await tile.click();
  await expectOpen(lightbox(page));
}

const counter = (page: import("@playwright/test").Page) => lightbox(page).getByTestId("lightbox-counter");
const title = (page: import("@playwright/test").Page) => lightbox(page).getByRole("heading");

test.describe("Lightbox", () => {
  test("opens from a tour photo with the correct index, title, counter and URL", async ({ page }) => {
    await openLightboxAt(page, 20);
    await expect(counter(page)).toHaveText(`21 of ${TOTAL}`);
    await expect(title(page)).toHaveText("Gym");
    expect(page.url()).toContain("modalItem=1020");
    expect(await activeLabel(page)).toBe("Close");
    const img = lightbox(page).locator("img");
    await expect(img).toHaveCSS("object-fit", "contain");
  });

  test("next / previous buttons and arrow keys move without wrapping", async ({ page }) => {
    await openLightboxAt(page, 0);
    const prev = page.getByRole("button", { name: "Previous", exact: true });
    const next = page.getByRole("button", { name: "Next", exact: true });
    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();

    await next.click();
    await expect(counter(page)).toHaveText(`2 of ${TOTAL}`);
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText(`3 of ${TOTAL}`);
    await page.keyboard.press("ArrowLeft");
    await expect(counter(page)).toHaveText(`2 of ${TOTAL}`);
    await prev.click();
    await expect(counter(page)).toHaveText(`1 of ${TOTAL}`);
    await page.keyboard.press("ArrowLeft"); // no wrap
    await expect(counter(page)).toHaveText(`1 of ${TOTAL}`);
    await expect(prev).toBeDisabled();
  });

  test("last photo disables Next and ArrowRight is a no-op", async ({ page }) => {
    await openLightboxAt(page, TOTAL - 1);
    await expect(counter(page)).toHaveText(`${TOTAL} of ${TOTAL}`);
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText(`${TOTAL} of ${TOTAL}`);
    await expect(title(page)).toHaveText("Additional photos");
  });

  test("Escape closes only the lightbox; a second Escape closes the tour", async ({ page }) => {
    await openLightboxAt(page, 5);
    const scrollBefore = await tourScrollTop(page);
    await page.keyboard.press("Escape");
    await expectClosed(lightbox(page));
    await expectOpen(tour(page));
    expect(page.url()).not.toContain("modalItem");
    expect(await activeLabel(page)).toMatch(/photo 6 of 43$/); // focus restored to the tile
    expect(await tourScrollTop(page)).toBe(scrollBefore); // tour scroll preserved
    await page.keyboard.press("Escape");
    await expectClosed(tour(page));
    expect(await scrollLocked(page)).toBe(false);
  });

  test("close button and grid button return to the tour", async ({ page }) => {
    await openLightboxAt(page, 3);
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expectClosed(lightbox(page));
    await expectOpen(tour(page));
    await page.locator('[data-idx="3"]').click();
    await expectOpen(lightbox(page));
    await page.getByRole("button", { name: "Show all photos" }).last().click();
    await expectClosed(lightbox(page));
    await expectOpen(tour(page));
  });

  test("backdrop click does nothing", async ({ page }) => {
    await openLightboxAt(page, 3);
    await page.mouse.click(120, 600);
    await expectOpen(lightbox(page));
  });

  test("focus is trapped inside the lightbox and the tour behind is inert", async ({ page }) => {
    await openLightboxAt(page, 3);
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      seen.add(await activeLabel(page));
    }
    expect([...seen].sort()).toEqual(["Close", "Next", "Previous", "Show all photos"]);
    expect(await tour(page).getAttribute("inert")).not.toBeNull();
    expect(await scrollLocked(page)).toBe(true);
  });

  test("browser Back closes the lightbox, then the tour", async ({ page }) => {
    await openLightboxAt(page, 8);
    await page.goBack();
    await expectClosed(lightbox(page));
    await expectOpen(tour(page));
    await page.goBack();
    await expectClosed(tour(page));
  });

  test("deep link restores tour + lightbox at the index", async ({ page }) => {
    await page.goto("/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1012");
    await expectOpen(lightbox(page));
    await expect(counter(page)).toHaveText(`13 of ${TOTAL}`);
    await expect(title(page)).toHaveText("Bedroom");
    await page.keyboard.press("Escape");
    await expectClosed(lightbox(page));
    await expectOpen(tour(page));
    expect(page.url()).not.toContain("modalItem");
    expect(await activeLabel(page)).toBe("Back");
  });
});
