import AxeBuilder from "@axe-core/playwright";
import { test } from "@playwright/test";

// Scans structural/semantic accessibility (labels, landmarks, alt text, ARIA,
// keyboard reachability) on the pages that exist today. Visual/contrast
// checks are included too. Only the homepage has real design applied so
// far (2026-07-10) — other pages are still structural placeholders pending
// Gil's comps, so contrast findings on those aren't durable yet.

const pagesToScan = [
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
  "/en/login",
];

test.describe("Accessibility (axe-core)", () => {
  for (const path of pagesToScan) {
    test(`${path} has no serious or critical violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );

      if (seriousOrCritical.length > 0) {
        const summary = seriousOrCritical
          .map((v) => `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`)
          .join("\n");
        throw new Error(`Accessibility violations found on ${path}:\n${summary}`);
      }
    });
  }
});
