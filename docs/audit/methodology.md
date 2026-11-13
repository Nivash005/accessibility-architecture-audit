# How to repeat the audit

I kept the scope to three pages so the same checks can be run again later:

- Home: https://www.tn.gov.in/
- Services: https://www.tn.gov.in/services.php
- FAQ: https://www.tn.gov.in/faq.php

## Lighthouse

Lighthouse runs against the home page in Chromium. It collects Accessibility, Performance, Best Practices and SEO results.

The intended output files are:

- docs/audit/lighthouse/tn-gov-home.report.html
- docs/audit/lighthouse/tn-gov-home.report.json
- docs/audit/lighthouse/summary.md
- docs/screenshots/01-home-lighthouse.png

A Lighthouse score is only a snapshot of one page, viewport and run. It can change when content, network conditions or third-party resources change.

## Keyboard walkthrough

The Playwright script sends Tab and Shift+Tab events through Chromium. It does not use a mouse to move between controls.

On the home page it records the first 24 Tab stops, then sends Shift+Tab once to check reverse movement. For each stop it records the element type, visible label, link target, focus-visible match, outline styling and whether the element is in the viewport.

It then opens the FAQ and Services pages. The FAQ pass checks the first 45 Tab stops for text associated with font, contrast, colour or accessibility controls. This is a search for likely controls; it does not prove that a control works correctly.

The results are written to docs/audit/keyboard-results.md and docs/audit/keyboard-results.json. Screenshots are saved under docs/screenshots/.

## axe-core

axe-core runs on the home, Services and FAQ pages when Chromium receives a usable page response. A page that cannot be loaded is marked not checked; a blank browser tab is never counted as a passing result.

The raw output is saved in docs/audit/axe-results.json. It contains rule IDs, impact, affected elements and help links.

## Running the audit on Windows

GitHub-hosted Chromium timed out before the Tamil Nadu portal rendered during the first attempts. When that happens, a local browser is the better place to repeat the check.

Open PowerShell in the repository folder and run:

\`\`\`powershell
.\\scripts\\run-audit-local.ps1
\`\`\`

The script installs Lighthouse, Playwright and axe-core, downloads Chromium, then runs both checks. It does not disable certificate validation.

## Interpreting the results

A missing focus ring in a computed CSS property is a signal to inspect, not automatic proof of a WCAG failure. Likewise, an axe violation should be checked in context before deciding how it affects a visitor. Record what was observed, the page where it happened and the evidence file that supports it.
