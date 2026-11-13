# How the audit is run

I kept the scope small enough to repeat: the home page, the Services page and the FAQ. The same pages are used each time so the results can be compared over time.

## 1. Lighthouse

The live audit workflow runs Lighthouse in headless Chromium against the portal home page. It saves both formats:

- `docs/audit/lighthouse/tn-gov-home.report.html`
- `docs/audit/lighthouse/tn-gov-home.report.json`

The workflow also captures the top of the HTML report as `docs/screenshots/01-home-lighthouse.png`.

For a local run, install Lighthouse and Chrome, then use:

```bash
npx lighthouse https://www.tn.gov.in/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html --output=json \
  --output-path=docs/audit/lighthouse/tn-gov-home.report \
  --chrome-flags="--headless --no-sandbox"
```

A Lighthouse score is a snapshot, not a permanent property of a website. Network conditions, page content and third-party resources can change the result.

## 2. Keyboard-only pass

The Playwright script opens each page in Chromium and sends keyboard input. It does not click page controls with a mouse.

On the home page it:
1. presses Tab repeatedly and records the focused element;
2. records the element's tag, visible text, role, link target and focus-visible state;
3. presses Shift+Tab to check that focus can move backwards;
4. captures the first focus state and a later navigation state.

It then captures the FAQ and Services pages. The script records what it can inspect; it does not declare a control usable just because it received focus.

The result is saved to `docs/audit/keyboard-results.md`, with screenshots in `docs/screenshots/`.

## 3. Automated accessibility checks

The same browser session runs axe-core on the home, Services and FAQ pages. The raw results are saved to `docs/audit/axe-results.json`. The report includes rule IDs, impact, affected selectors and help links.

Automated checks are only one part of an accessibility review. They cannot fully assess reading order, whether instructions are clear, whether a workflow is understandable, or whether a person can complete it with their assistive technology.

## 4. Re-running the audit

The GitHub Actions workflow runs when audit scripts or the audit documentation change on `main`. It saves its output back to this repository. It can also be started manually from the Actions tab using **Run workflow**.

When reviewing a new result, compare the date and the page URL before comparing scores. Do not copy an old score into a new report.

