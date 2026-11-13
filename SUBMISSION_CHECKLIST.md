# Final review checklist

The project structure, source files, audit notes and CI workflow are in the repository. The live-site workflow is responsible for producing the Lighthouse report and browser screenshots.

## Project files

- [x] One public-service website selected
- [x] Five prioritized accessibility/architecture review areas documented
- [x] Remediation and acceptance guidance included
- [x] Monorepo folders for client, server, docs and tests
- [x] Local setup and first service-list feature described
- [x] CSV issue register included
- [x] GitHub Actions test workflow added
- [x] Live Lighthouse / keyboard workflow added

## Live browser evidence

These items are only complete when the GitHub Actions run has succeeded and the files are visible in the repository:

- [ ] Lighthouse HTML and JSON reports saved under docs/audit/lighthouse/
- [ ] Lighthouse summary screenshot saved as docs/screenshots/01-home-lighthouse.png
- [ ] First keyboard focus screenshot saved as docs/screenshots/02-keyboard-focus.png
- [ ] Keyboard navigation screenshot saved as docs/screenshots/03-navigation.png
- [ ] FAQ accessibility-control screenshot saved as docs/screenshots/04-accessibility-controls.png
- [ ] Services page screenshot saved as docs/screenshots/05-service-navigation.png
- [ ] Keyboard trace and notes saved under docs/audit/

## Before presenting the work

1. Open the screenshots and compare them with the notes in the report.
2. Check that the screenshots show the live portal, not the prototype.
3. Read the failed Lighthouse audits and confirm which ones relate to actual user barriers.
4. Repeat the main task with a screen reader if one is available.
5. Do not call the result a WCAG certification. It is a focused student audit.

To rerun the live checks, open the repository's Actions tab and run **Live website accessibility audit**.
