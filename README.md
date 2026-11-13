# Accessibility Baseline & Repository Architecture Audit

**Audited public service:** [Tamil Nadu Government Portal](https://www.tn.gov.in/)

This repository provides an accessibility audit, a maintainable client/server starter architecture, and a reproducible verification plan.

## Project contents

- `client/` — React + Vite accessible service catalogue
- `server/` — Express API and service-list use case
- `docs/audit/` — findings, methodology, source references, and Lighthouse evidence destination
- `docs/architecture/` — architecture boundaries
- `docs/screenshots/` — instructions for live audit evidence
- `tests/` — acceptance checklist
- `.github/workflows/` — CI workflow
- `accessibility-audit-template.csv` — prioritized issue register
- `Audit_Report.pdf` — printable audit summary

## Five prioritized findings

| ID | Finding | Priority |
|---|---|---|
| WEB-001 | Validate complete keyboard navigation and focus order | P1 |
| WEB-002 | Verify visible focus and focus obstruction | P1 |
| WEB-003 | Improve service catalogue information hierarchy | P1 |
| WEB-004 | Verify advertised accessibility controls are keyboard-operable | P1 |
| WEB-005 | Keep UI, API, use-case, and persistence boundaries separate | P2 |

Read the complete [audit report](docs/audit/report.md) or open the [PDF report](Audit_Report.pdf).

## Architecture

```text
accessibility-architecture-audit/
├── client/
│   └── src/
├── server/
│   ├── src/
│   └── test/
├── docs/
│   ├── audit/
│   ├── architecture/
│   └── screenshots/
├── tests/
├── .github/workflows/
├── accessibility-audit-template.csv
├── Audit_Report.pdf
├── package.json
└── README.md
```

## Local setup

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

Client: http://localhost:5173  
API: http://localhost:4000

Run tests:

```bash
npm test
```

## Lighthouse

Generate a real report immediately before submission:

```bash
mkdir -p docs/audit/lighthouse
npx lighthouse https://www.tn.gov.in/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html \
  --output-path=docs/audit/lighthouse/tn-gov-home.html
```

Save the Lighthouse summary screenshot as `docs/screenshots/01-home-lighthouse.png`.

## Keyboard-only pass

Use Chrome/Edge without the mouse:
1. Reload and use Tab to traverse focusable elements.
2. Use Shift+Tab to verify reverse order.
3. Activate links with Enter and buttons with Space/Enter.
4. Verify focus is visible and never fully obscured.
5. Verify menus/dialogs can be operated and exited without a keyboard trap.

Save real captures in `docs/screenshots/` using the names listed in [screenshot instructions](docs/screenshots/README.md).

## Evidence integrity

This repository does not claim a Lighthouse score or manual keyboard result that was not actually captured. The report distinguishes official-source evidence from hands-on verification still to be performed in a real browser. Do not submit mock/generated screenshots as audit evidence.

## First vertical slice

`Service Catalogue` demonstrates:

```text
React UI → GET /api/services → Express route → service use case → in-memory data
```

The in-memory implementation is the seam for a later database-backed repository. UI components do not import persistence modules.

## References

- [Tamil Nadu Government Portal](https://www.tn.gov.in/)
- [Tamil Nadu Portal FAQ](https://www.tn.gov.in/faq.php)
- [Tamil Nadu Services](https://www.tn.gov.in/services.php)
- [WCAG 2.2](https://www.w3.org/TR/wcag/)
- [Chrome DevTools Accessibility](https://developer.chrome.com/docs/devtools/accessibility/reference)

See [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for final evidence and publication tasks.
