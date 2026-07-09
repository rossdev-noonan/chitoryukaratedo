import { expect, test } from "@playwright/test";

// Full submission isn't tested end-to-end here — Turnstile requires solving
// a real challenge, which isn't reliably automatable in headless CI without
// swapping in Cloudflare's dedicated always-pass test site key (a separate
// piece of setup, not done yet). Confirmed via manual debugging that
// Cloudflare's own bot detection declines to render the interactive iframe
// challenge at all under headless-automated Chromium (the widget's hidden
// response input appears, but no iframe ever loads) — so these tests check
// what's reliably observable: the widget was invoked, and submission stays
// gated until it verifies.

test.describe("Contact form", () => {
  test("send is disabled by default, before the form is even filled in", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("button", { name: "Send" })).toBeDisabled();
  });

  test("the Turnstile widget is invoked on the page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator('input[name="cf-turnstile-response"]')).toBeAttached({
      timeout: 15_000,
    });
  });

  test("send button stays disabled until Turnstile verification completes", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Message").fill("Test message");
    // Turnstile hasn't returned a token yet immediately after filling the
    // other fields, so submission must stay blocked.
    await expect(page.getByRole("button", { name: "Send" })).toBeDisabled();
  });
});
