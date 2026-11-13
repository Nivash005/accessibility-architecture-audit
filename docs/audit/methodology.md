# How the audit was run

This page describes the repeatable checks used in this repository. Results belong in the report files created by the workflow, not in this procedure document.

## Pages

| Page | Reason for including it |
|---|---|
| https://www.tn.gov.in/ | Main entry point and primary navigation |
| https://www.tn.gov.in/services.php | Department-wise service catalogue |
| https://www.tn.gov.in/faq.php | The portal's own explanation of its accessibility options and purpose |

## Lighthouse

The workflow runs Lighthouse against the homepage and keeps both the HTML report and machine-readable JSON. The score summary records the date, Lighthouse version, browser user agent, failed audits and manual audits.

To repeat it locally:

```bash
npx lighthouse https://www.tn.gov.in/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html --output-path=docs/audit/lighthouse/tn-gov-home.html
```

Read the audit details, not only the overall score. A passing automated accessibility score is not proof of WCAG compliance.

## Keyboard walkthrough

The Playwright script opens the three pages at a 1440 x 1000 viewport. On the homepage it presses Tab 36 times, records the active element and its computed focus styling, then presses Shift+Tab and checks whether focus returns to the preceding stop. It also looks for the advertised font, contrast or accessibility controls during the first 45 Tab stops on the FAQ page.

No mouse or pointer events are used during the keyboard sequence. The screenshots show the first focus state, the page after twelve Tab presses, the FAQ accessibility-control search and the Services page.

The script records:

- tag, label, link destination and tab index of each focused element;
- whether :focus-visible matches;
- computed outline and box-shadow values;
- whether the focused element is within the viewport;
- page title and language, heading sequence, unnamed links/buttons and missing image alt attributes.

## Manual review still matters

A script can record focus order, but it cannot decide whether a link name is helpful, whether the sequence feels natural, or whether a screen-reader user understands the service structure. Review the screenshots and JSON with the live page open. For a stronger assessment, repeat the critical tasks using a screen reader and at least one mobile viewport.
