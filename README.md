# Accessibility audit of the Tamil Nadu Government Portal

This repository is my practical audit and a small full-stack starter project. I chose the [Tamil Nadu Government Portal](https://www.tn.gov.in/) because people use it to find government information, forms, department contacts and links to public services.

The point of the exercise is not to redesign the government website. It is to look at how a citizen might move through it, record issues that could make that harder, and build a clean starting point for an accessible service catalogue.

## What is in this repository?

- **`client/`** – a small React page that reads service entries from the API.
- **`server/`** – an Express API that returns the service catalogue.
- **`docs/audit/`** – the audit notes, method, sources and space for Lighthouse output.
- **`docs/architecture/`** – why the client and server are kept separate.
- **`docs/screenshots/`** – browser evidence from the audit.
- **`scripts/`** – scripts that run the keyboard-only browser pass and prepare the Lighthouse screenshot.
- **`tests/`** – a short acceptance checklist.
- **`.github/workflows/`** – CI checks and the live website audit workflow.

## Run the project locally

You will need Node.js 20 or newer.

From the repository root:

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

The client runs at [http://localhost:5173](http://localhost:5173). The API runs at [http://localhost:4000](http://localhost:4000).

To run the tests:

```bash
npm test
```

The catalogue data is sample data for this project. It is not an official Tamil Nadu Government service, and the demo does not collect applications or personal information.

## How I approached the audit

I looked at three parts of the portal:

1. The home page, where people start looking for information.
2. The Services page, which groups services by government department.
3. The FAQ, which explains the portal's purpose and lists the accessibility options it says are available.

The audit uses Lighthouse for an automated snapshot and browser keyboard input to record the focus path. Those tools are useful, but they do not replace a person using a screen reader or testing the site with assistive technology. The report keeps that distinction clear.

The [audit report](docs/audit/report.md) explains the five findings, their impact and suggested fixes. The [method](docs/audit/methodology.md) explains how the evidence was collected.

## Architecture in one picture

```text
Browser
  |
  v
React service catalogue
  |
  | GET /api/services
  v
Express route
  |
  v
Service-list function
  |
  v
Sample service data
```

The browser only knows about the API. It does not import server files or know how the data is stored. That gives the project a clear place to add a database later without rewriting the page.

## Audit evidence

The live audit workflow runs when audit-related files change on `main`. It creates:

- a Lighthouse HTML report and JSON results in `docs/audit/lighthouse/`;
- screenshots of the Lighthouse report and the three portal pages;
- a keyboard focus trace and automated accessibility findings.

The workflow uses a real browser against the live public website. The results can change when the website changes, so the reports include a timestamp. See [the screenshot guide](docs/screenshots/README.md) for the file names.

## A note about the findings

The five findings are improvement areas, not a claim that the portal has failed every related WCAG criterion. I have separated what is visible in the portal or its own documentation from what the automated checks report. A proper conformance assessment would also need manual testing with people who use assistive technology.

## References

- [Tamil Nadu Government Portal](https://www.tn.gov.in/)
- [Services](https://www.tn.gov.in/services.php)
- [Frequently asked questions](https://www.tn.gov.in/faq.php)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [Playwright keyboard documentation](https://playwright.dev/docs/input#keyboard)

