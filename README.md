# Accessibility audit of the Tamil Nadu Government Portal

This is my accessibility review of the Tamil Nadu Government Portal and a small full-stack project built around the idea of a service directory.

I chose this website because people use it to find government information, department contacts, forms and links to public services. I wanted to look at how someone might move through that information, especially when using a keyboard.

This is an independent student project. It is not connected to the Government of Tamil Nadu.

## What you will find here

- **client/** – React page for browsing a sample service list.
- **server/** – Express API that returns the list.
- **docs/audit/** – audit report, method, results and limitations.
- **docs/architecture/** – explanation of the client/server split.
- **docs/screenshots/** – browser evidence captured during the audit.
- **scripts/** – repeatable browser audit scripts.
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

The audit combines Lighthouse, axe-core and keyboard events sent through Chromium. The keyboard script records the elements reached with Tab and Shift+Tab. These automated checks are useful for repeating the same route, but they do not replace a person testing with a screen reader or other assistive technology.

## Running the live audit

The GitHub Actions workflow tries to audit the live portal. If the hosted runner can reach the site, it saves the Lighthouse report, keyboard trace, axe results and screenshots in this repository.

The first hosted attempts timed out before the portal painted any content. Lighthouse reported NO_FCP, and the browser did not receive a usable page response. I have documented that instead of entering made-up scores or keeping a blank browser screenshot as if it were site evidence.

The portal may still be reachable from a normal browser on your own network. On Windows, open PowerShell in the repository folder and run:

\`\`\`powershell
.\\scripts\\run-audit-local.ps1
\`\`\`

That script installs the audit tools, runs Lighthouse, walks the pages with keyboard input and creates the evidence files. After it finishes, review the reports before committing them.

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
- Audit method: docs/audit/methodology.md
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
