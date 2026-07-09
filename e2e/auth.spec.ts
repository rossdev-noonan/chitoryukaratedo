import { expect, test } from "@playwright/test";

test.describe("Admin authentication", () => {
  test("visiting /admin while logged out redirects to /login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("wrong credentials show an error, not a silent failure", async ({ page }) => {
    await page.goto("/login");
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
    await page.goto("/login");
    await page.getByRole("button", { name: "Log in" }).click();
    // Native HTML5 required-field validation keeps us on /login rather than
    // navigating away or crashing.
    await expect(page).toHaveURL(/\/login$/);
  });

  test("forgot password link goes to the reset flow", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await expect(page).toHaveURL(/\/reset-password$/);
    await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
  });

  test("visiting /accept-invite with no token shows the expired-link state, not a crash", async ({
    page,
  }) => {
    await page.goto("/accept-invite");
    await expect(
      page.getByRole("alert").filter({ hasText: /invalid or has expired/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Set password" })).toBeDisabled();
  });
});
