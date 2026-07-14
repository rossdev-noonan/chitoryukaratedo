import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/en",
  "/en/about",
  "/en/history",
  "/en/leadership",
  "/en/dojo-directory",
  "/en/teachers",
  "/en/news",
  "/en/events",
  "/en/resources",
  "/en/sohonbu-experience",
  "/en/contact",
  "/en/privacy",
  "/en/terms",
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
  await page.goto("/en");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  await primaryNav.getByRole("button", { name: "Community" }).hover();
  await primaryNav.getByRole("menuitem", { name: "Dojo Directory" }).click();
  await expect(page).toHaveURL(/\/en\/dojo-directory$/);
});

test("desktop navigation reopens after Escape while the pointer remains over it", async ({
  page,
}) => {
  await page.goto("/en");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  const community = primaryNav.getByRole("button", { name: "Community" });

  await community.hover();
  await expect(primaryNav.getByRole("menuitem", { name: "Dojo Directory" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(primaryNav.getByRole("menuitem", { name: "Dojo Directory" })).toBeHidden();

  await community.dispatchEvent("pointermove");
  await expect(primaryNav.getByRole("menuitem", { name: "Dojo Directory" })).toBeVisible();
  await primaryNav.getByRole("menuitem", { name: "Dojo Directory" }).click();
  await expect(page).toHaveURL(/\/en\/dojo-directory$/);
});

test("desktop dropdown stays clickable while crossing the gap below its trigger", async ({
  page,
}) => {
  await page.goto("/en");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  const community = primaryNav.getByRole("button", { name: "Community" });
  await community.hover();

  const triggerBox = await community.boundingBox();
  const directoryLink = primaryNav.getByRole("menuitem", { name: "Dojo Directory" });
  const linkBox = await directoryLink.boundingBox();
  if (!triggerBox || !linkBox) throw new Error("Dropdown geometry is unavailable");

  await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height);
  await page.mouse.move(linkBox.x + linkBox.width / 2, linkBox.y + linkBox.height / 2, {
    steps: 6,
  });
  await expect(directoryLink).toBeVisible();
  await directoryLink.click();
  await expect(page).toHaveURL(/\/en\/dojo-directory$/);
});

test("visiting an unmatched route redirects to a locale prefix, then 404s", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveURL(/\/en\/this-page-does-not-exist$/);
});
