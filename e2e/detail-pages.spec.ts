import { expect, test } from "@playwright/test";

// These slugs come from the permanent seed data in
// supabase/migrations/0002_seed_placeholder_data.sql — stable, always
// approved, safe to depend on in tests without a logged-in admin session.

test.describe("Dynamic detail pages load without errors", () => {
  test("dojo detail page renders", async ({ page }) => {
    const response = await page.goto("/dojo/example-dojo-1");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Example Dojo" })).toBeVisible();
  });

  test("teacher detail page renders", async ({ page }) => {
    const response = await page.goto("/teachers/example-teacher-1");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  });

  test("country page in dojo-grid mode renders the seeded dojo", async ({ page }) => {
    const response = await page.goto("/dojo-directory/australia");
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Example Dojo")).toBeVisible();
  });

  test("country page with its own federation site shows the outbound link, not a dojo grid", async ({
    page,
  }) => {
    const response = await page.goto("/dojo-directory/canada");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("link", { name: /Visit official Canada site/i })).toBeVisible();
  });

  // These three routes call notFound() for a missing record rather than
  // hitting a genuinely unmatched URL. Next.js streams these responses
  // (see loading.md's "Status Codes" section), so the HTTP status is 200 —
  // the actual SEO protection is the noindex meta tag Next.js injects
  // automatically, not the status code. Asserting on status 404 here would
  // be asserting on the wrong thing for this Next.js version.
  test("unknown dojo slug shows the not-found UI, noindexed, not a crash", async ({ page }) => {
    await page.goto("/dojo/this-slug-does-not-exist");
    await expect(page.locator('meta[name="robots"][content="noindex"]').first()).toBeAttached();
  });

  test("unknown teacher slug shows the not-found UI, noindexed, not a crash", async ({
    page,
  }) => {
    await page.goto("/teachers/this-slug-does-not-exist");
    await expect(page.locator('meta[name="robots"][content="noindex"]').first()).toBeAttached();
  });

  test("unknown country slug shows the not-found UI, noindexed, not a crash", async ({
    page,
  }) => {
    await page.goto("/dojo-directory/this-country-does-not-exist");
    await expect(page.locator('meta[name="robots"][content="noindex"]').first()).toBeAttached();
  });
});
