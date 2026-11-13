import { chromium } from "playwright";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const reportDir = resolve(root, "docs/audit/lighthouse");
const screenshotDir = resolve(root, "docs/screenshots");
await mkdir(screenshotDir, { recursive: true });

const files = await readdir(reportDir);
const htmlName = files.find((name) => name.startsWith("tn-gov-home") && name.endsWith(".html"));
const jsonName = files.find((name) => name.startsWith("tn-gov-home") && name.endsWith(".json"));

if (!htmlName || !jsonName) {
  throw new Error(`Lighthouse outputs not found. Files in report folder: ${files.join(", ")}`);
}

const lighthouse = JSON.parse(await readFile(resolve(reportDir, jsonName), "utf8"));
const categories = Object.entries(lighthouse.categories || {}).map(([key, item]) => ({
  key,
  title: item.title,
  score: item.score === null ? "Not scored" : Math.round(item.score * 100)
}));
const failedAudits = Object.values(lighthouse.audits || {})
  .filter((audit) => audit.score === 0 && audit.details?.type !== "opportunity")
  .map((audit) => ({ title: audit.title, description: audit.description, displayValue: audit.displayValue || "" }));

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`file://${resolve(reportDir, htmlName)}`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: resolve(screenshotDir, "01-home-lighthouse.png"),
    fullPage: false
  });
} finally {
  await browser.close();
}

const timestamp = new Date(lighthouse.fetchTime || Date.now()).toISOString();
const lines = [
  "# Lighthouse run summary",
  "",
  `- **Run date:** ${timestamp}`,
  `- **Tested URL:** ${lighthouse.finalUrl || "Not reported"}`,
  `- **Lighthouse version:** ${lighthouse.lighthouseVersion || "Not reported"}`,
  "",
  "## Scores",
  "",
  "| Category | Score |",
  "|---|---:|",
  ...categories.map((item) => `| ${item.title} | ${item.score}${typeof item.score === "number" ? "/100" : ""} |`),
  "",
  "## Audits that need attention",
  "",
  ...(failedAudits.length
    ? failedAudits.slice(0, 20).map((audit) => `- **${audit.title}:** ${audit.displayValue || audit.description}`)
    : ["No failed Lighthouse audits were returned in this run."]),
  "",
  "## Files",
  "",
  `- HTML report: ` + `\`docs/audit/lighthouse/${htmlName}\``,
  `- JSON report: ` + `\`docs/audit/lighthouse/${jsonName}\``,
  "- Screenshot: `docs/screenshots/01-home-lighthouse.png`",
  "",
  "Lighthouse scores are a point-in-time result and can change with page content, network conditions and third-party resources.",
  ""
].join("\\n");

await writeFile(resolve(reportDir, "summary.md"), lines, "utf8");
console.log(lines);
