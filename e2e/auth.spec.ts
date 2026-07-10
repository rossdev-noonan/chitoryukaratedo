import { expect, test } from "@playwright/test";

test.describe("Admin authentication", () => {
  test("visiting /admin while logged out redirects to /en/login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/en\/login$/);
  });

  test("wrong credentials show an error, not a silent failure", async ({ page }) => {
    await page.goto("/en/login");
    await page.getByLabel("Email").fill("nonexistent@example.com");
    await page.getByLabel("Password").fill("wrong-password-123");
    await page.getByRole("button", { name: "Log in" }).click();
    // Next.js's own route announcer also carries role="alert" (always
    // empty), so filter by content rather than relying on role alone.
    await expect(
      page.getByRole("alert").filter({ hasText: /invalid email or password/i }),
    ).toBeVisible();
  });

  test("empty login form is blocked by required fields, not submitted", async ({ page }) => {
    await page.goto("/en/login");
    await page.getByRole("button", { name: "Log in" }).click();
    // Native HTML5 required-field validation keeps us on /en/login rather
    // than navigating away or crashing.
    await expect(page).toHaveURL(/\/en\/login$/);
  });

  test("forgot password link goes to the reset flow", async ({ page }) => {
    await page.goto("/en/login");
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await expect(page).toHaveURL(/\/en\/reset-password$/);
    await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
  });

  test("visiting /accept-invite with no token shows the expired-link state, not a crash", async ({
    page,
  }) => {
    await page.goto("/en/accept-invite");
    await expect(
      page.getByRole("alert").filter({ hasText: /invalid or has expired/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Set password" })).toBeDisabled();
  });

  test("a stray auth token landing on the homepage is forwarded to /en/reset-password", async ({
    page,
  }) => {
    // Links sent directly from the Supabase Dashboard (rather than through
    // our own app flows) fall back to the project's bare Site URL with no
    // path, dropping the token on the homepage. AuthRedirectGuard exists to
    // catch that and forward it to the page that actually knows what to do
    // with it.
    await page.goto("/?code=fake-stray-code");
    await expect(page).toHaveURL(/\/en\/reset-password\?code=fake-stray-code$/);
    await expect(page.getByRole("button", { name: "Set password" })).toBeVisible();
  });

  test("normal homepage visits with no token are not redirected past the locale prefix", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });
});
