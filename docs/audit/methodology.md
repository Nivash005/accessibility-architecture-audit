# Audit Methodology

## Lighthouse

Run:

```bash
npx lighthouse https://www.tn.gov.in/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html \
  --output-path=docs/audit/lighthouse/tn-gov-home.html
```

Record:
- Accessibility score
- Failed audits
- Passed audits
- Manual audits
- Screenshot of the Lighthouse summary
- Date/time and browser version

Do not copy a score from a third-party article or historical report into the current audit.

## Keyboard-only

Test with mouse/trackpad untouched.

| Step | Expected |
|---|---|
| Tab from page start | Focus enters a predictable order |
| Shift+Tab | Focus reverses predictably |
| Enter on links | Link activates |
| Space on buttons | Button activates |
| Escape | Open overlays/menus close where applicable |
| Focus indicator | Always visible |
| Sticky content | Does not completely hide focused controls |
| Dialogs | Focus is managed and escape path exists |
| Forms | Every control has a usable label |
| Skip link | Allows bypassing repeated navigation |

Chrome's accessibility documentation notes that automated tools can detect many markup issues, but keyboard/screen-reader usability requires manual testing.

## Evidence capture

Save screenshots under:

```text
docs/screenshots/
```

Recommended names:

```text
01-home-lighthouse.png
02-keyboard-focus.png
03-navigation.png
04-accessibility-controls.png
05-service-navigation.png
```
