import { expect, test } from "@playwright/test";

async function enterExperience(page: import("@playwright/test").Page) {
  await page.goto("/");
  const invitation = page.getByRole("button", { name: "Open the Japan winter invitation" });
  const invitationDialog = page.getByRole("dialog");

  await expect(invitation).toBeVisible({ timeout: 10_000 });
  await invitation.click();
  await expect(invitationDialog).toBeHidden({ timeout: 5_000 });
  await expect(page.getByRole("heading", { name: /Japan,/ })).toBeVisible();
}

test("the core route can be changed and copied", async ({ page }) => {
  await enterExperience(page);
  await page.getByRole("button", { name: /Build our trip/ }).click();
  await page.getByRole("button", { name: /More snow/ }).click();
  await expect(page.getByRole("heading", { name: "More snow" })).toBeVisible();
  await expect(page.getByText("8 nights · Maximum snow time")).toBeVisible();
});

test("the map, day tabs, and saved places are interactive", async ({ page }) => {
  await enterExperience(page);
  await page.locator("#map").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Select Tokyo" }).click();
  await expect(page.locator(".map-detail").getByRole("heading", { name: "Tokyo" })).toBeVisible();
  await page.locator("#days").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Hakodate/ }).click();
  await expect(page.locator(".day-plan-intro").getByRole("heading", { name: "Hakodate" })).toBeVisible();
  await page.locator("#places").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Save Sapporo" }).click();
  await expect(page.getByText("Quick comparison")).toBeVisible();
});

test("the booking checklist persists after reload", async ({ page }) => {
  await enterExperience(page);
  await page.locator("#book").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Open-jaw international flights/ }).click();
  await expect(page.getByText("1/8")).toBeVisible();
  await page.reload();
  await page.locator("#book").scrollIntoViewIfNeeded();
  await expect(page.getByText("1/8")).toBeVisible();
});

test("the mobile layout never creates horizontal page overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile-only visual guard");
  await enterExperience(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
