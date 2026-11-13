# Accessibility audit of the Tamil Nadu Government Portal

This is my accessibility review of the Tamil Nadu Government Portal and a small full-stack project built around the idea of a service directory.

I chose this website because people use it to find government information, department contacts, forms and links to public services. I wanted to look at how someone might move through that information, especially when using a keyboard.

This is an independent student project. It is not connected to the Government of Tamil Nadu.

## What you will find here

- **client/** – React page for browsing a sample service list.
- **server/** – Express API that returns the list.
- **docs/audit/** – findings, method, page observations, browser results and limitations.
- **docs/architecture/** – explanation of the client/server split.
- **docs/screenshots/** – instructions for real browser captures.
- **scripts/** – repeatable browser audit scripts and a Windows runner.
- **tests/** – app checks and a short manual acceptance list.
- **.github/workflows/** – build/test checks and the live website audit.

## Run the demo

Install Node.js 20 or newer. From the repository root, run:

\`\`\`bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
\`\`\`

Open http://localhost:5173. The API is available at http://localhost:4000.

Run the tests and build with:

\`\`\`bash
npm test
npm run build
\`\`\`

The three catalogue entries are sample content. They point visitors to the official portal; the demo does not accept applications or collect personal details.

## How I reviewed the portal

I used three pages:

1. Home – https://www.tn.gov.in/
2. Services – https://www.tn.gov.in/services.php
3. FAQ – https://www.tn.gov.in/faq.php

The official page text shows that the portal provides a Screen Reader Access link, a Skip To Main Content link and an Accessibility Menu. The Services page has Department Wise, Service wise and Category wise views, plus a Search control. I wrote down those observations in [page-observations.md](docs/audit/page-observations.md).

The audit workflow also tries Lighthouse, axe-core and keyboard navigation in Chromium. It records what happened rather than treating a blank tab as a passing result.

## Current browser result

The latest GitHub-hosted run finished, but it could not get a usable page load:

- Lighthouse returned **NO_FCP**. The final URL was about:blank and no category score was produced.
- The keyboard walkthrough timed out on Home, Services and FAQ, so it recorded zero real-page Tab stops.
- axe-core marked all three pages **not checked** because none of the pages loaded.

The reports are saved in docs/audit/lighthouse/ and docs/audit/keyboard-results.md. The run is also visible in the [GitHub Actions history](https://github.com/Nivash005/accessibility-architecture-audit/actions).

I have not invented a score or added screenshots of the blank browser tab. The successful live-browser evidence is still needed before the assignment can be called fully complete.

## Run the live audit from Windows

If the portal opens in a normal browser on your network, open PowerShell in the repository folder and run:

\`\`\`powershell
.\scripts\run-audit-local.ps1
\`\`\`

The script installs Lighthouse, Playwright and axe-core, downloads Chromium, and runs the checks. Review the output before committing it. Do not disable certificate validation to force a score.

## How the app is organised

\`\`\`text
Browser
  |
  v
React service directory
  |
  | GET /api/services
  v
Express route
  |
  v
Service-list function
  |
  v
Sample data
\`\`\`

The React page only talks to the API. It does not know where the server stores its data. The sample array can later be replaced with SQLite or PostgreSQL without making the browser component responsible for database work.

## Where to start

- Audit report: docs/audit/report.md
- Observations from the official page text: docs/audit/page-observations.md
- Browser audit method: docs/audit/methodology.md
- Lighthouse result: docs/audit/lighthouse/summary.md
- Keyboard/axe result: docs/audit/keyboard-results.md
- Hosted-runner limitation: docs/audit/environment-limitations.md
- Architecture notes: docs/architecture/README.md
- Screenshot guide: docs/screenshots/README.md
- Submission checklist: SUBMISSION_CHECKLIST.md

## References

- https://www.tn.gov.in/
- https://www.tn.gov.in/services.php
- https://www.tn.gov.in/faq.php
- https://www.w3.org/TR/WCAG22/
- https://developer.chrome.com/docs/lighthouse/overview/
- https://playwright.dev/docs/input#keyboard
