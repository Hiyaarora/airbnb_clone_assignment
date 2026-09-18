import { expect, test } from "@playwright/test";
import { activeLabel, amenitiesModal, expectClosed, expectOpen, mainInert, scrollLocked } from "./helpers";

test.describe("Listing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Share shows a toast, Save toggles the heart and label", async ({ page }) => {
    await page.getByRole("button", { name: "Share" }).click();
    const toast = page.getByRole("status");
    await expect(toast).toHaveText("Share options");
    await expect(toast).toHaveAttribute("data-visible", "true");

    const save = page.getByRole("button", { name: "Save" });
    await save.click();
    await expect(page.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");
    await expect(toast).toHaveText("Saved to wishlist");
    await page.getByRole("button", { name: "Saved" }).click();
    await expect(toast).toHaveText("Removed from wishlist");
  });

  test("description and review Show more toggle", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "Show more" }).first();
    const text = page.locator("p[data-expanded]").first();
    await expect(text).toHaveAttribute("data-expanded", "false");
    await toggle.click();
    await expect(text).toHaveAttribute("data-expanded", "true");
    await expect(page.getByRole("button", { name: "Show less" }).first()).toBeVisible();
  });

  test("amenities modal opens, traps focus, closes with Escape / backdrop / X and restores focus", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Show all \d+ amenities/ });
    await trigger.click();
    await expectOpen(amenitiesModal(page));
    expect(await scrollLocked(page)).toBe(true);
    expect(await mainInert(page)).toBe(true);
    expect(await activeLabel(page)).toBe("Close");
    await page.keyboard.press("Escape");
    await expectClosed(amenitiesModal(page));
    expect(await activeLabel(page)).toMatch(/Show all \d+ amenities/);

    await trigger.click();
    await page.mouse.click(40, 360); // backdrop
    await expectClosed(amenitiesModal(page));

    await trigger.click();
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expectClosed(amenitiesModal(page));
    expect(await scrollLocked(page)).toBe(false);
  });

  test("sticky section nav appears after the gallery and tracks the active section", async ({ page }) => {
    const bar = page.locator('[aria-label="Listing sections"]').locator("xpath=ancestor::*[@data-visible]");
    await expect(bar).toHaveAttribute("data-visible", "false");
    await page.evaluate(() => window.scrollTo(0, 800));
    await expect(bar).toHaveAttribute("data-visible", "true");
    await expect(page.getByRole("link", { name: "Photos" })).toHaveAttribute("aria-current", "location");
    await page.evaluate(() => window.scrollTo(0, document.getElementById("reviews")!.getBoundingClientRect().top + window.scrollY - 50));
    await expect(page.getByRole("link", { name: "Reviews" })).toHaveAttribute("aria-current", "location");
  });

  test("similar stays carousel pages to the end and back", async ({ page }) => {
    const next = page.getByRole("button", { name: "Next stays" });
    const prev = page.getByRole("button", { name: "Previous stays" });
    await next.scrollIntoViewIfNeeded();
    await expect(prev).toBeDisabled();
    await next.click();
    await expect(next).toBeDisabled();
    await expect(page.getByText("2 / 2")).toBeVisible();
    await prev.click();
    await expect(prev).toBeDisabled();
  });

  test("no horizontal overflow at desktop widths", async ({ page }) => {
    for (const width of [1280, 1440, 1536, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${width}`).toBe(0);
    }
  });
});
