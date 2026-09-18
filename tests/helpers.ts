import { expect, type Locator, type Page } from "@playwright/test";

// CSS locators on purpose: closed dialogs carry aria-hidden="true", which getByRole would skip.
export const tour = (page: Page) => page.locator('[role="dialog"][aria-label="Photo tour"]');
export const lightbox = (page: Page) => page.locator('[role="dialog"][aria-label="Photo viewer"]');
export const amenitiesModal = (page: Page) => page.locator('[role="dialog"][aria-label="What this place offers"]');

/** Hidden dialogs stay mounted (for exit transitions); "open" means data-open="true" and visible. */
export async function expectOpen(dialog: Locator) {
  await expect(dialog).toHaveAttribute("data-open", "true");
  await expect(dialog).toBeVisible();
}

export async function expectClosed(dialog: Locator) {
  await expect(dialog).toHaveAttribute("data-open", "false");
  await expect(dialog).toBeHidden();
}

export const activeLabel = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return "body";
    return el.getAttribute("aria-label") ?? el.textContent?.trim().slice(0, 40) ?? el.tagName;
  });

export const scrollLocked = (page: Page) => page.evaluate(() => document.body.dataset.scrollLocked === "true");

export const mainInert = (page: Page) => page.evaluate(() => document.querySelector("main")!.hasAttribute("inert"));

export const tourScrollTop = (page: Page) =>
  page.getByRole("region", { name: "Photo tour content" }).evaluate((el) => Math.round(el.scrollTop));
