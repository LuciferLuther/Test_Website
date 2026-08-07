import { expect, test } from "@playwright/test";

test("client runtime hydrates the invitation", async ({ page }) => {
  const consoleMessages: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  const badResponses: string[] = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.stack ?? error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText ?? "unknown"}`));
  page.on("response", (response) => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3_000);

  const state = await page.evaluate(() => ({
    readyState: document.readyState,
    hydratedGate: Boolean(document.querySelector(".invitation-gate[data-hydrated='true']")),
    placeholderGate: Boolean(document.querySelector(".invitation-gate[aria-hidden='true']")),
    invitationButtons: Array.from(document.querySelectorAll<HTMLButtonElement>(".invitation-gate button")).map((button) => button.textContent?.trim()),
    scriptSources: Array.from(document.scripts).map((script) => script.src).filter(Boolean),
    nextGlobals: Object.keys(window).filter((key) => key.toLowerCase().includes("next")).slice(0, 20),
    storage: window.sessionStorage.getItem("japan-slowly-intro-seen"),
    bodyTextStart: document.body.innerText.slice(0, 240),
  }));

  expect(
    { state, consoleMessages, pageErrors, failedRequests, badResponses },
    `CLIENT_RUNTIME ${JSON.stringify({ state, consoleMessages, pageErrors, failedRequests, badResponses })}`,
  ).toMatchObject({
    state: { readyState: "complete", hydratedGate: true, placeholderGate: false },
    pageErrors: [],
    failedRequests: [],
    badResponses: [],
  });
});
