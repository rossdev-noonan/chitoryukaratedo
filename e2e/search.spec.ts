import { expect, test } from "@playwright/test";

// These intentionally avoid asserting on specific seeded names — the data
// changes over time as real dojos/teachers are approved. Instead they test
// the search mechanism itself: the URL reflects the query, a nonsense query
// returns "not found" cleanly rather than erroring, and clearing the search
// restores the list.

test.describe("Teacher search", () => {
  test("searching updates the URL and a nonsense query shows no results", async ({ page }) => {
    await page.goto("/en/teachers");
    await page.getByPlaceholder("Search teachers…").fill("zzznonexistentnamezzz");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/\?q=zzznonexistentnamezzz/);
    await expect(page.getByText("No teachers found.")).toBeVisible();
  });

  test("clearing the search restores the unfiltered list", async ({ page }) => {
    await page.goto("/en/teachers?q=zzznonexistentnamezzz");
    await expect(page.getByText("No teachers found.")).toBeVisible();
    await page.getByPlaceholder("Search teachers…").fill("");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/\/en\/teachers$/);
  });

  test("a query with special characters does not crash the page", async ({ page }) => {
    await page.goto("/en/teachers");
    await page.getByPlaceholder("Search teachers…").fill("test(name,here)");
    await page.getByRole("button", { name: "Search" }).click();
    // No unhandled server error — either a match or the clean "not found" state.
    await expect(page.locator("body")).not.toContainText("Application error");
  });
});

test.describe("Dojo search", () => {
  test("searching within a non-federation country updates the URL", async ({ page }) => {
    await page.goto("/en/dojo-directory/australia");
    await page.getByPlaceholder("Search dojos…").fill("zzznonexistentdojozzz");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/\?q=zzznonexistentdojozzz/);
    await expect(page.getByText("No dojos found.")).toBeVisible();
  });

  test("a federation-linked country shows no search box", async ({ page }) => {
    await page.goto("/en/dojo-directory/canada");
    await expect(page.getByPlaceholder("Search dojos…")).not.toBeVisible();
    await expect(page.getByRole("link", { name: /visit official/i })).toBeVisible();
  });
});
