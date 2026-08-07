import { expect, test } from "@playwright/test";

async function capture(page: import("@playwright/test").Page) {
  return page.evaluate(() => ({
    storage: window.sessionStorage.getItem("japan-slowly-intro-seen"),
    dialogCount: document.querySelectorAll(".invitation-gate[role='dialog']").length,
  }));
}

async function waitForHydratedInvitation(page: import("@playwright/test").Page) {
  await page.goto("/");
  await expect(page.locator(".invitation-gate[data-hydrated='true']")).toBeVisible({ timeout: 10_000 });
}

test("primary invitation action closes the gate", async ({ page }) => {
  await waitForHydratedInvitation(page);
  await page.getByRole("button", { name: "Open the Japan winter invitation" }).click();
  await expect(page.getByRole("dialog")).toBeHidden({ timeout: 5_000 });
  await expect.poll(() => capture(page)).toMatchObject({ storage: "yes", dialogCount: 0 });
});

test("skip invitation action closes the gate", async ({ page }) => {
  await waitForHydratedInvitation(page);
  await page.getByRole("button", { name: "Skip opening" }).click();
  await expect(page.getByRole("dialog")).toBeHidden({ timeout: 5_000 });
  await expect.poll(() => capture(page)).toMatchObject({ storage: "yes", dialogCount: 0 });
});
