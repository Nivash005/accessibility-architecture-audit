# A practical accessibility audit and a small full-stack starter

This repository started as an assignment: choose a public-service website, look at how a person actually moves through it, write down what could be better, and build a project structure that would make improvements easier to maintain.

I chose the **[Government of Tamil Nadu portal](https://www.tn.gov.in/)** because it is a real entry point for government information and links to services used by citizens. The portal's own [FAQ](https://www.tn.gov.in/faq.php) describes its purpose and lists accessibility options such as text-size and contrast settings. Those statements are useful context, but they are not proof that every page or control works for every user. The live tests in this repository check the experience rather than simply repeating the site's claims.

## What is here

- `docs/audit/report.md` explains the scope, findings and priorities.
- `docs/audit/lighthouse/` holds the Lighthouse report and score summary from the live run.
- `docs/audit/keyboard-pass.md` and `keyboard-results.json` record the keyboard walkthrough.
- `docs/screenshots/` contains captures from the pages that were tested.
- `accessibility-audit-template.csv` is the issue register in spreadsheet-friendly form.
- `client/` is a React/Vite service-list interface.
- `server/` is a small Express API that supplies the service list.
- `docs/architecture/README.md` explains why those parts are kept separate.

## Run it locally

You will need Node.js 20 or newer and npm.

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

The web client runs at http://localhost:5173. The API runs at http://localhost:4000; Vite forwards /api requests to it during development.

Run the tests with:

```bash
npm test
```

## How the starter app is put together

The first feature is deliberately small: show a list of public-service examples.

```text
Browser -> React page -> GET /api/services -> Express route -> service data
```

The browser does not know how the server stores its data. Today the example data is held in memory. A database can be introduced behind the server later without teaching the React components about database tables or drivers. The entries are examples, not live application links from the Government portal.

## Re-running the website audit

The **Live website accessibility audit** workflow runs Lighthouse and a keyboard-only browser walkthrough against three public pages:

- [Home](https://www.tn.gov.in/)
- [Services](https://www.tn.gov.in/services.php)
- [FAQ](https://www.tn.gov.in/faq.php)

It saves the HTML/JSON Lighthouse output, the keyboard trace and real browser screenshots in this repository. You can run it again from **Actions → Live website accessibility audit → Run workflow**. It also runs automatically when the audit script or workflow changes.

The equivalent local Lighthouse command is:

```bash
npx lighthouse https://www.tn.gov.in/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html --output-path=docs/audit/lighthouse/tn-gov-home.html
```

The screenshots are evidence from a particular browser, viewport and date. They are not a certificate of WCAG conformance. A human should still review the full page, test with a screen reader, and check any manual Lighthouse audits before making a compliance claim.

## Main references

- [Tamil Nadu Government portal](https://www.tn.gov.in/)
- [Portal FAQ](https://www.tn.gov.in/faq.php)
- [Services page](https://www.tn.gov.in/services.php)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/wcag/)
- [Chrome DevTools accessibility reference](https://developer.chrome.com/docs/devtools/accessibility/)
