import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Scans structural/semantic accessibility (labels, landmarks, alt text, ARIA,
// keyboard reachability) on the pages that exist today. Visual/contrast
// checks are included too, but the current styling is a structural
// placeholder pending Gil's design — contrast findings against placeholder
// colors aren't durable, so re-run this after the real design lands and
// treat any contrast findings from today as informational, not blocking.

const pagesToScan = [
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
  "/login",
];

test.describe("Accessibility (axe-core)", () => {
  for (const path of pagesToScan) {
    test(`${path} has no serious or critical violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

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
