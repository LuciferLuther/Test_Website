import { expect, test } from "@playwright/test";

async function enterExperience(page: import("@playwright/test").Page) {
  await page.goto("/");
  const invitation = page.getByRole("button", { name: "Open the Japan winter invitation" });
  await expect(invitation).toBeVisible();
  await invitation.click();
  await expect(page.getByRole("heading", { name: /Japan,/ })).toBeVisible();
}

test("the fixed route is clear and can be copied", async ({ page }) => {
  await enterExperience(page);
  await page.getByRole("button", { name: /See our route/ }).click();
  await expect(page.getByRole("heading", { name: "Our winter route" })).toBeVisible();
  await expect(page.getByText("9 nights · Christmas, snow, New Year, and day trips")).toBeVisible();
  await page.getByRole("button", { name: /Copy route/ }).click();
  await expect(page.getByRole("button", { name: /Copied/ })).toBeVisible();
});

test("the map, day tabs, and saved places are interactive", async ({ page }) => {
  await enterExperience(page);
  await page.locator("#map").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Select Tokyo" }).click();
  await expect(page.locator(".map-detail").getByRole("heading", { name: "Tokyo" })).toBeVisible();
  await page.locator("#days").scrollIntoViewIfNeeded();
  await page.locator(".day-city-tabs").getByRole("button", { name: /Hakone/ }).click();
  await expect(page.locator(".day-plan-intro").getByRole("heading", { name: "Hakone" })).toBeVisible();
  await page.locator("#places").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Save Sapporo" }).click();
  await expect(page.getByText("Quick comparison")).toBeVisible();
});

test("the booking checklist persists after reload", async ({ page }) => {
  await enterExperience(page);
  await page.locator("#book").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /International flights/ }).click();
  await expect(page.getByText("1/10")).toBeVisible();
  await page.reload();
  await page.locator("#book").scrollIntoViewIfNeeded();
  await expect(page.getByText("1/10")).toBeVisible();
});

test("the mobile layout keeps fixed controls and the map inside the viewport", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile-only visual guard");
  await enterExperience(page);
  const initial = await page.evaluate(() => {
    const dock = document.querySelector<HTMLElement>(".mobile-dock");
    return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, dockPosition: dock ? getComputedStyle(dock).position : "missing" };
  });
  expect(initial.overflow).toBeLessThanOrEqual(1);
  expect(initial.dockPosition).toBe("fixed");

  await page.locator("#map").scrollIntoViewIfNeeded();
  const map = await page.evaluate(() => {
    const card = document.querySelector<HTMLElement>(".map-card");
    const stage = document.querySelector<HTMLElement>(".map-stage");
    if (!card || !stage) return null;
    const cardRect = card.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    return { pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, stageOverflow: stageRect.width - cardRect.width };
  });
  expect(map).not.toBeNull();
  expect(map!.pageOverflow).toBeLessThanOrEqual(1);
  expect(map!.stageOverflow).toBeLessThanOrEqual(1);
});

test("Aether materials progressively enhance without hiding the app", async ({ page }) => {
  await enterExperience(page);
  await expect(page.locator("html")).toHaveAttribute("data-aether", /^(glass|solid)$/);
  await expect(page.locator(".countdown")).toHaveClass(/aether-surface--paper/);
  await expect(page.locator(".mobile-dock")).toHaveClass(/aether-surface--nav/);
  await page.locator("#plan").scrollIntoViewIfNeeded();
  await expect(page.locator(".plan-result")).toHaveAttribute("data-aether", "selected-itinerary");
});
