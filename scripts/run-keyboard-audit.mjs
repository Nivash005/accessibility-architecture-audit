import { chromium } from "playwright";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const axeScript = require.resolve("axe-core/axe.min.js");
const screenshots = resolve("docs/screenshots");
const auditDir = resolve("docs/audit");
const baseUrl = process.env.AUDIT_BASE_URL || "https://www.tn.gov.in/";
const pagesToCheck = [
  { name: "Home", url: baseUrl },
  { name: "Services", url: new URL("services.php", baseUrl).href },
  { name: "FAQ", url: new URL("faq.php", baseUrl).href }
];

await mkdir(screenshots, { recursive: true });
await mkdir(auditDir, { recursive: true });

const startedAt = new Date().toISOString();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: "en-IN",
  timezoneId: "Asia/Kolkata",
  reducedMotion: "reduce"
});

const pageDetails = [];
const axeResults = [];
const keyboardTrace = [];

async function inspectPage(item) {
  const page = await context.newPage();
  let response = null;
  let navigationError = null;

  try {
    response = await page.goto(item.url, {
      waitUntil: "domcontentloaded",
      timeout: 20000
    });
    await page.locator("body").waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(1000);
  } catch (error) {
    navigationError = error.message;
  }

  const details = {
    name: item.name,
    requestedUrl: item.url,
    finalUrl: page.url(),
    title: await page.title().catch(() => ""),
    httpStatus: response ? response.status() : null,
    loaded: Boolean(response && response.ok() && !navigationError),
    navigationError
  };
  pageDetails.push(details);

  if (details.loaded) {
    await page.addScriptTag({ path: axeScript });
    const axe = await page.evaluate(async () => {
      const result = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]
        }
      });
      return {
        status: "checked",
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
    axeResults.push({ ...details, ...axe });
  } else {
    axeResults.push({
      ...details,
      status: "not checked",
      reason: "The page did not return a successful response. No blank-page axe result was recorded."
    });
  }

  return { page, details };
}

async function getFocusedElement(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    if (!element) return null;
    const style = getComputedStyle(element);
    const label = (
      element.getAttribute("aria-label") ||
      element.getAttribute("title") ||
      element.innerText ||
      element.textContent ||
      ""
    ).replace(/\s+/g, " ").trim().slice(0, 140);

    return {
      tag: element.tagName.toLowerCase(),
      id: element.id || "",
      role: element.getAttribute("role") || "",
      label,
      href: element.href || "",
      tabIndex: element.tabIndex,
      focusVisible: element.matches(":focus-visible"),
      outline: style.outlineStyle === "none"
        ? "none"
        : style.outlineStyle + " " + style.outlineWidth + " " + style.outlineColor,
      boxShadow: style.boxShadow === "none" ? "none" : "present"
    };
  });
}

try {
  const home = await inspectPage(pagesToCheck[0]);
  if (home.details.loaded) {
    for (let index = 1; index <= 24; index += 1) {
      await home.page.keyboard.press("Tab");
      await home.page.waitForTimeout(80);
      const focused = await getFocusedElement(home.page);
      keyboardTrace.push({ page: "Home", key: "Tab", step: index, focused });

      if (index === 1) {
        await home.page.screenshot({ path: resolve(screenshots, "02-keyboard-focus.png") });
      }
      if (index === 12) {
        await home.page.screenshot({ path: resolve(screenshots, "03-navigation.png") });
      }
    }

    await home.page.keyboard.press("Shift+Tab");
    keyboardTrace.push({
      page: "Home",
      key: "Shift+Tab",
      step: 1,
      focused: await getFocusedElement(home.page)
    });
  }
  await home.page.close();

  const services = await inspectPage(pagesToCheck[1]);
  if (services.details.loaded) {
    await services.page.screenshot({
      path: resolve(screenshots, "05-service-navigation.png"),
      fullPage: true
    });
  }
  await services.page.close();

  const faq = await inspectPage(pagesToCheck[2]);
  const faqStops = [];
  let accessibilityControl = null;

  if (faq.details.loaded) {
    for (let index = 1; index <= 45; index += 1) {
      await faq.page.keyboard.press("Tab");
      const stop = await getFocusedElement(faq.page);
      faqStops.push({ step: index, ...stop });

      if (/font|contrast|colour|color|accessib/i.test(stop.label)) {
        accessibilityControl = { step: index, ...stop };
        break;
      }
    }
    await faq.page.screenshot({
      path: resolve(screenshots, "04-accessibility-controls.png")
    });
  }
  await faq.page.close();

  const finishedAt = new Date().toISOString();
  const results = {
    startedAt,
    finishedAt,
    browser: "Chromium " + browser.version(),
    viewport: "1440 x 900 CSS pixels",
    inputMethod: "Tab and Shift+Tab keyboard events only; no mouse navigation",
    pages: pageDetails,
    keyboardTrace,
    faqTabStops: faqStops,
    accessibilityControl
  };

  await writeFile(resolve(auditDir, "keyboard-results.json"), JSON.stringify(results, null, 2) + "\n");
  await writeFile(resolve(auditDir, "axe-results.json"), JSON.stringify({
    startedAt,
    browser: results.browser,
    pages: axeResults
  }, null, 2) + "\n");

  const clean = (value) => String(value || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  const pageRows = pageDetails.map((page) =>
    "| " + page.name + " | " + (page.httpStatus === null ? "No response" : page.httpStatus) +
    " | " + (page.loaded ? "Loaded" : "Not reached") + " |"
  );
  const stopRows = keyboardTrace.map((entry) => {
    const focus = entry.focused || {};
    const element = focus.tag + (focus.id ? "#" + focus.id : "");
    const styled = focus.focusVisible || focus.outline !== "none" || focus.boxShadow === "present";
    return "| " + entry.step + " | " + entry.key + " | " + clean(element) +
      " | " + clean(focus.label || focus.href) + " | " + (styled ? "Detected" : "Not detected") + " |";
  });
  const axeLines = axeResults.map((page) => {
    if (page.status !== "checked") return "- **" + page.name + ":** not checked — " + page.reason;
    return "- **" + page.name + ":** " + page.violations.length + " axe violation rule(s), " +
      page.passes + " passed rule(s), " + page.incomplete + " incomplete check(s).";
  });

  const lines = [
    "# Keyboard and axe results",
    "",
    "- Started: " + startedAt,
    "- Finished: " + finishedAt,
    "- Browser: Chromium " + browser.version(),
    "- Viewport: 1440 × 900 CSS pixels",
    "- Input: Tab and Shift+Tab events; no mouse navigation",
    "",
    "This is an automated keyboard walkthrough, not a screen-reader assessment or a formal WCAG certification.",
    "",
    "## Page responses",
    "",
    "| Page | HTTP status | Result |",
    "|---|---:|---|",
    ...pageRows,
    "",
    "## Home-page focus sequence",
    "",
    "- Recorded Tab stops: " + keyboardTrace.filter((entry) => entry.page === "Home" && entry.key === "Tab").length,
    "- A reverse Tab event was sent after the forward sequence: " + (keyboardTrace.some((entry) => entry.key === "Shift+Tab") ? "Yes" : "No"),
    "",
    "| Step | Key | Element | Name or link target | Focus style |",
    "|---:|---|---|---|---|",
    ...stopRows,
    "",
    "## FAQ controls",
    "",
    accessibilityControl
      ? "A matching control label was encountered at Tab stop " + accessibilityControl.step +
        ": **" + accessibilityControl.label + "**. This confirms it received focus, not that its function was fully tested."
      : (pageDetails.find((page) => page.name === "FAQ")?.loaded
          ? "No matching font, contrast, colour or accessibility label appeared in the first 45 Tab stops. This needs a closer manual check; it does not prove that the controls are absent."
          : "The FAQ page did not load, so the advertised accessibility controls could not be checked."),
    "",
    "## axe-core",
    "",
    ...axeLines,
    "",
    "## Screenshot files",
    "",
    "- 02-keyboard-focus.png — first Tab stop on the home page (only created if the page loaded).",
    "- 03-navigation.png — home page after twelve Tab presses (only created if the page loaded).",
    "- 04-accessibility-controls.png — FAQ after keyboard input (only created if the page loaded).",
    "- 05-service-navigation.png — Services page (only created if the page loaded).",
    "",
    "A missing screenshot means the page could not be opened during this run. It is not replaced with a screenshot of a blank tab.",
    ""
  ];
  await writeFile(resolve(auditDir, "keyboard-results.md"), lines.join("\n"));
  console.log(lines.join("\n"));
} finally {
  await context.close();
  await browser.close();
}
