import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/history",
  "/leadership",
  "/dojo-directory",
  "/teachers",
  "/news",
  "/events",
  "/resources",
  "/sohonbu-experience",
  "/contact",
  "/privacy",
  "/terms",
];

test.describe("Public pages load without errors", () => {
  for (const route of publicRoutes) {
    test(`${route} returns 200 and renders nav`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    });
  }
});

test("navigating from the homepage to the dojo directory works", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Dojo Directory" }).click();
  await expect(page).toHaveURL(/\/dojo-directory$/);
});

test("visiting an unknown route shows a 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});
