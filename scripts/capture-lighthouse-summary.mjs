import { chromium } from "playwright";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const reportDir = resolve("docs/audit/lighthouse");
const screenshotDir = resolve("docs/screenshots");
await mkdir(reportDir, { recursive: true });
await mkdir(screenshotDir, { recursive: true });

const files = await readdir(reportDir);
const htmlName = files.find((name) => name.startsWith("tn-gov-home") && name.endsWith(".html"));
const jsonName = files.find((name) => name.startsWith("tn-gov-home") && name.endsWith(".json"));

if (!htmlName || !jsonName) {
  const note = [
    "# Lighthouse result",
    "",
    "- Status: No usable Lighthouse report was produced.",
    "- Scores: Not available. No score has been estimated or filled in.",
    "- Next step: Check the GitHub Actions log and run scripts/run-audit-local.ps1 from a network that can open the portal.",
    ""
  ].join("\n");
  await writeFile(resolve(reportDir, "summary.md"), note);
  console.log(note);
  process.exit(0);
}

const report = JSON.parse(await readFile(resolve(reportDir, jsonName), "utf8"));
const runtimeError = report.runtimeError || null;
const hasScores = !runtimeError && report.categories && Object.keys(report.categories).length > 0;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(pathToFileURL(resolve(reportDir, htmlName)).href, { waitUntil: "load" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: resolve(screenshotDir, "01-home-lighthouse.png"),
    fullPage: false
  });
} finally {
  await browser.close();
}

const categories = hasScores
  ? Object.entries(report.categories).map(([key, item]) => ({
      key,
      title: item.title,
      score: item.score === null ? null : Math.round(item.score * 100)
    }))
  : [];
const failedAudits = hasScores
  ? Object.values(report.audits || {})
      .filter((audit) => audit.score === 0)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        displayValue: audit.displayValue || ""
      }))
  : [];

const summary = {
  capturedAt: new Date(report.fetchTime || Date.now()).toISOString(),
  requestedUrl: report.requestedUrl || "https://www.tn.gov.in/",
  finalUrl: report.finalDisplayedUrl || null,
  lighthouseVersion: report.lighthouseVersion || null,
  status: hasScores ? "completed" : "no-usable-page-load",
  runtimeError: runtimeError ? {
    code: runtimeError.code || null,
    message: runtimeError.message || null
  } : null,
  scores: Object.fromEntries(categories.map((item) => [item.key, item.score])),
  failedAudits,
  note: hasScores
    ? "The page loaded and Lighthouse returned category scores."
    : "Lighthouse did not receive a usable page paint. Do not treat this as a scored accessibility audit."
};

await writeFile(resolve(reportDir, "summary.json"), JSON.stringify(summary, null, 2) + "\n");

const scoreRows = categories.length
  ? categories.map((item) => "| " + item.title + " | " + (item.score === null ? "Not scored" : item.score + "/100") + " |")
  : ["| All categories | Not scored |"];
const failedRows = failedAudits.length
  ? failedAudits.map((item) => "- **" + item.title + "** (" + item.id + ")" + (item.displayValue ? " — " + item.displayValue : ""))
  : ["No failed-audit list is available because the page did not produce a usable run."];

const lines = [
  "# Lighthouse run summary",
  "",
  "- Captured: " + summary.capturedAt,
  "- Requested URL: " + summary.requestedUrl,
  "- Final URL: " + (summary.finalUrl || "No final page URL"),
  "- Lighthouse version: " + (summary.lighthouseVersion || "Not reported"),
  "- Status: " + summary.status,
  "",
  "## Scores",
  "",
  "| Category | Score |",
  "|---|---:|",
  ...scoreRows,
  "",
  "## Result",
  "",
  runtimeError
    ? "Lighthouse runtime error: " + runtimeError.code + " — " + runtimeError.message
    : summary.note,
  "",
  "## Failed audits",
  "",
  ...failedRows,
  "",
  "Lighthouse is a point-in-time automated test. If the page did not load, this file is a diagnostic record rather than an accessibility score.",
  ""
].join("\n");

await writeFile(resolve(reportDir, "summary.md"), lines.join("\n"));
console.log(lines.join("\n"));
