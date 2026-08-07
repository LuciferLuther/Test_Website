import { expect, test } from "@playwright/test";

async function capture(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const dialog = document.querySelector<HTMLElement>(".invitation-gate");
    const envelope = document.querySelector<HTMLElement>(".envelope");
    return {
      storage: window.sessionStorage.getItem("japan-slowly-intro-seen"),
      dialogCount: document.querySelectorAll(".invitation-gate").length,
      dialogDisplay: dialog ? getComputedStyle(dialog).display : null,
      dialogOpacity: dialog ? getComputedStyle(dialog).opacity : null,
      dialogStyle: dialog?.getAttribute("style") ?? null,
      envelopeStyle: envelope?.getAttribute("style") ?? null,
    };
  });
}

test("primary invitation action closes the gate", async ({ page }) => {
  await page.goto("/");
  const before = await capture(page);
  await page.getByRole("button", { name: "Open the Japan winter invitation" }).click();
  await page.waitForTimeout(1_500);
  const after = await capture(page);
  expect(after, `INVITATION_PRIMARY ${JSON.stringify({ before, after })}`).toMatchObject({
    storage: "yes",
    dialogCount: 0,
  });
});

test("skip invitation action closes the gate", async ({ page }) => {
  await page.goto("/");
  const before = await capture(page);
  await page.getByRole("button", { name: "Skip opening" }).click();
  await page.waitForTimeout(1_500);
  const after = await capture(page);
  expect(after, `INVITATION_SKIP ${JSON.stringify({ before, after })}`).toMatchObject({
    storage: "yes",
    dialogCount: 0,
  });
});
