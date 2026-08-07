import { expect, test } from "@playwright/test";

async function expectClientReady(page: import("@playwright/test").Page) {
  await expect(page.locator("html[data-app-hydrated='true']")).toHaveCount(1, { timeout: 10_000 });
}

test("the first invitation tap works before or after hydration", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const invitation = page.getByRole("button", { name: "Open the Japan winter invitation" });

  await expect(invitation).toBeVisible();
  await invitation.click();
  await expect(page.getByRole("dialog")).toBeHidden({ timeout: 5_000 });
  await expectClientReady(page);

  await page.getByRole("button", { name: /More snow/ }).click();
  await expect(page.getByRole("heading", { name: "More snow" })).toBeVisible();
});

test("the native skip control also dismisses the invitation", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const skip = page.getByRole("button", { name: "Skip opening" });

  await expect(skip).toBeVisible();
  await skip.click();
  await expect(page.getByRole("dialog")).toBeHidden({ timeout: 5_000 });
  await expectClientReady(page);
});
