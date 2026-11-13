import { chromium } from "playwright";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const axeScript = require.resolve("axe-core/axe.min.js");
const root = process.cwd();
const screenshots = resolve(root, "docs/screenshots");
const auditDir = resolve(root, "docs/audit");
const baseUrl = "https://www.tn.gov.in/";
const pagesToCheck = [
  { name: "Home", url: baseUrl },
  { name: "FAQ", url: new URL("faq.php", baseUrl).href },
  { name: "Services", url: new URL("services.php", baseUrl).href }
];

await mkdir(screenshots, { recursive: true });
await mkdir(auditDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1
});

const axeResults = [];
const keyboardTrace = [];
const pageDetails = [];

function compact(value, max = 140) {
  return (value || "").replace(/\\s+/g, " ").trim().slice(0, max);
}

async function openPage(item) {
  const page = await context.newPage();
  const response = await page.goto(item.url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });
  await page.locator("body").waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(1200);
  pageDetails.push({
    name: item.name,
    requestedUrl: item.url,
    finalUrl: page.url(),
    title: await page.title(),
    httpStatus: response?.status() ?? null
  });

  await page.addScriptTag({ path: axeScript });
  const axe = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]
      }
    });
    return {
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        helpUrl: violation.helpUrl,
        description: violation.description,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary
        }))
      })),
      passes: result.passes.length,
      incomplete: result.incomplete.length,
      inapplicable: result.inapplicable.length
    };
  });
  axeResults.push({ ...item, finalUrl: page.url(), ...axe });
  return page;
}

try {
  const home = await openPage(pagesToCheck[0]);

  for (let index = 1; index <= 24; index += 1) {
    await home.keyboard.press("Tab");
    await home.waitForTimeout(80);
    const focused = await home.evaluate(() => {
      const element = document.activeElement;
      if (!element) return null;
      const style = getComputedStyle(element);
      return {
        tag: element.tagName.toLowerCase(),
        text: (element.innerText || element.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 140),
        id: element.id || "",
        role: element.getAttribute("role") || "",
        ariaLabel: element.getAttribute("aria-label") || "",
        href: element.getAttribute("href") || "",
        tabIndex: element.tabIndex,
        focusVisible: element.matches(":focus-visible"),
        outline: style.outlineStyle === "none" ? "none" : `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
        boxShadow: style.boxShadow === "none" ? "none" : "present"
      };
    });
    keyboardTrace.push({ page: "Home", key: "Tab", step: index, focused });

    if (index === 1) {
      await home.screenshot({ path: resolve(screenshots, "02-keyboard-focus.png") });
    }
    if (index === 10) {
      await home.screenshot({ path: resolve(screenshots, "03-navigation.png") });
    }
  }

  await home.keyboard.press("Shift+Tab");
  const reverseFocus = await home.evaluate(() => {
    const element = document.activeElement;
    return {
      tag: element?.tagName?.toLowerCase() || "",
      text: (element?.innerText || element?.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 140),
      id: element?.id || "",
      href: element?.getAttribute("href") || ""
    };
  });
  keyboardTrace.push({ page: "Home", key: "Shift+Tab", step: 1, focused: reverseFocus });

  const faq = await openPage(pagesToCheck[1]);
  for (let index = 1; index <= 8; index += 1) {
    await faq.keyboard.press("Tab");
    if (index === 5) {
      await faq.screenshot({ path: resolve(screenshots, "04-accessibility-controls.png") });
    }
  }
  if (!(await import("node:fs/promises")).stat(resolve(screenshots, "04-accessibility-controls.png")).catch(() => null)) {
    await faq.screenshot({ path: resolve(screenshots, "04-accessibility-controls.png") });
  }

  const services = await openPage(pagesToCheck[2]);
  await services.screenshot({
    path: resolve(screenshots, "05-service-navigation.png"),
    fullPage: true
  });
  for (let index = 1; index <= 8; index += 1) {
    await services.keyboard.press("Tab");
  }

  const timestamp = new Date().toISOString();
  const escapeCell = (value) => String(value ?? "").replace(/\\|/g, "\\\\|").replace(/\\n/g, " ");
  const report = [
    "# Keyboard-only browser pass",
    "",
    `- **Run date:** ${timestamp}`,
    "- **Browser:** Chromium (headless, Playwright)",
    "- **Input used:** Tab and Shift+Tab keyboard events; no mouse clicks were used for navigation",
    "- **Viewport:** 1440 × 900 CSS pixels",
    "",
    "This is a repeatable automated keyboard pass. It is useful evidence of the focus sequence, but it is not a substitute for a person using a screen reader or other assistive technology.",
    "",
    "## Pages opened",
    "",
    "| Page | HTTP | Final URL |",
    "|---|---:|---|",
    ...pageDetails.map((page) => `| ${page.name} | ${page.httpStatus ?? "unknown"} | ${page.finalUrl} |`),
    "",
    "## Home page focus sequence",
    "",
    "| Step | Key | Element | Name/text | Focus-visible | Outline |",
    "|---:|---|---|---|---|---|",
    ...keyboardTrace.map((entry) => {
      const f = entry.focused || {};
      const element = [f.tag, f.id ? `#${f.id}` : "", f.role ? `role=${f.role}` : ""].filter(Boolean).join(" ");
      return `| ${entry.step} | ${entry.key} | ${escapeCell(element)} | ${escapeCell(f.ariaLabel || f.text || f.href)} | ${f.focusVisible ?? "n/a"} | ${escapeCell(f.outline)} |`;
    }),
    "",
    "## Screenshots",
    "",
    "- `docs/screenshots/02-keyboard-focus.png` — first Tab stop on the home page.",
    "- `docs/screenshots/03-navigation.png` — tenth Tab stop on the home page.",
    "- `docs/screenshots/04-accessibility-controls.png` — FAQ after keyboard navigation.",
    "- `docs/screenshots/05-service-navigation.png` — Services page.",
    "",
    "## Notes",
    "",
    "- A keyboard focus sequence is recorded above, including a reverse Tab step.",
    "- The presence of a focus-visible match or CSS outline is a browser-level indicator, not a complete visual contrast assessment.",
    "- The screenshots and trace should be reviewed together before describing any issue as a confirmed WCAG failure.",
    ""
  ].join("\\n");

  await writeFile(resolve(auditDir, "keyboard-results.md"), report, "utf8");
  await writeFile(
    resolve(auditDir, "axe-results.json"),
    JSON.stringify({ runAt: timestamp, browser: "Chromium", pages: axeResults }, null, 2),
    "utf8"
  );

  console.log(JSON.stringify({
    runAt: timestamp,
    pages: pageDetails,
    keyboardSteps: keyboardTrace.length,
    axeViolations: axeResults.reduce((total, page) => total + page.violations.length, 0)
  }, null, 2));
} finally {
  await browser.close();
}
