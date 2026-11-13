# Final submission checklist

## Project foundation

- [x] Public service website selected and linked
- [x] Five findings described with priorities and suggested improvements
- [x] Client, server, documentation and tests kept in separate folders
- [x] Architecture and setup explained in the README
- [x] Service-catalogue feature slice included
- [x] Audit CSV included
- [x] Build and test workflow configured

## Live website evidence

- [ ] Usable Lighthouse HTML and JSON reports
- [ ] Lighthouse screenshot showing a real report with scores
- [ ] Home page first-focus screenshot
- [ ] Home page navigation screenshot
- [ ] FAQ/accessibility-controls screenshot
- [ ] Services page screenshot
- [ ] Keyboard trace with real Tab and Shift+Tab stops
- [ ] axe results for all three pages

## Why these are still unchecked

The hosted browser could not load the Tamil Nadu portal. Lighthouse returned NO_FCP and Chromium timed out on the three pages. The failed attempts are documented in docs/audit/environment-limitations.md. A screenshot of about:blank is not being counted as evidence.

When the portal is reachable from a local Windows browser, run this from PowerShell in the repository root:

\`\`\`powershell
.\\scripts\\run-audit-local.ps1
\`\`\`

Open the generated reports, check that screenshots show the actual portal, and only then mark the items above complete.
