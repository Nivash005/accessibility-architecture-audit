# Final submission checklist

## Project foundation

- [x] Public service website selected and linked
- [x] Five review findings written with priorities and suggested improvements
- [x] Client, server, documentation and tests kept in separate folders
- [x] Architecture and setup explained in the README
- [x] Service-catalogue feature slice included
- [x] Audit CSV included
- [x] Build and test workflow configured
- [x] Human-readable page observations and evidence limitations documented

## Automated audit attempt

- [x] Lighthouse was run against the portal from GitHub-hosted Chromium
- [x] Lighthouse JSON/HTML diagnostic reports saved
- [x] Keyboard workflow attempted Home, Services and FAQ
- [x] Keyboard result records that all three pages timed out
- [x] axe results correctly mark the pages as not checked

## Evidence still needed for a complete live audit

- [ ] A usable Lighthouse report with real category scores
- [ ] Lighthouse summary screenshot from a successful run
- [ ] Home page first-focus screenshot
- [ ] Home page navigation screenshot
- [ ] FAQ/accessibility-controls screenshot
- [ ] Services page screenshot
- [ ] A keyboard trace with actual focusable elements and a reverse Shift+Tab step
- [ ] axe results for all three loaded pages

## Why these items are still open

The hosted browser did not load the Tamil Nadu portal. Lighthouse returned NO_FCP, and the keyboard run received no usable response from the three pages. These are saved as diagnostics; they are not a scored accessibility audit or a completed keyboard pass.

When the portal is reachable from a local Windows browser, run this from PowerShell in the repository root:

\`\`\`powershell
.\scripts\run-audit-local.ps1
\`\`\`

Open the generated reports and check that the screenshots show the real portal before committing them or marking the remaining boxes complete.
