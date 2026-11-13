# Accessibility audit: Government of Tamil Nadu portal

**Website:** https://www.tn.gov.in/  
**Pages in scope:** Home, Services and FAQ  
**Audit type:** focused baseline review, not a formal WCAG conformance assessment

## Why I chose this website

The Tamil Nadu portal brings together government information and links to services across departments. That makes it a useful public-service example: a visitor may arrive with a specific task and may not know which department owns it. The portal's FAQ says the site is intended as a single-window point for government information and services. It also says the site offers text-size and contrast options. I treated those as claims worth checking, not as a substitute for checking the pages themselves.

## What I checked

I looked at three pages: the home page, the department-wise Services page and the FAQ. The audit combines a Lighthouse run with a browser-based keyboard walkthrough. The walkthrough uses Tab and Shift+Tab without pointer input, records the focused element and saves screenshots of focus states and page structure. It is a repeatable check, but it is not a screen-reader test and does not cover every interaction on the site.

The actual run information is stored alongside this report:

- [Lighthouse score and failed-audit summary](lighthouse/report-summary.md)
- [Full Lighthouse HTML report](lighthouse/tn-gov-home.html)
- [Keyboard walkthrough notes](keyboard-pass.md)
- [Raw keyboard trace](keyboard-results.json)
- [Screenshot evidence](../screenshots/)

## Findings and why they matter

The priorities below are triage priorities for this review. They do not mean that a WCAG failure has been established unless the live results identify a specific failing condition.

### 1. Keyboard users need a predictable route through the main navigation — P1

The Services page groups links by department. That gives visitors useful context, but the route into and through those groups still needs to work with a keyboard. A visitor should be able to move in a logical order, see where focus is, and activate a link without needing a mouse.

**What to check:** compare the sequence in keyboard-pass.md with the visible page. Look for skipped links, confusing focus order, focus that disappears, or elements that cannot be activated from the keyboard.

**Suggested fix if an issue is confirmed:** use native links and buttons, keep DOM order meaningful, and provide a visible skip link to the main content.

### 2. Focus needs to remain visible as the user moves — P1

A focus outline is the user's pointer when they are not using a mouse. This matters especially on a page with many navigation links. The raw keyboard trace records whether Chromium matched :focus-visible and whether an outline or box-shadow was computed. The screenshots are the visual evidence; CSS values alone are not enough to decide whether focus is clear.

**What to check:** open 02-keyboard-focus.png and 03-navigation.png. Also note any focus target that is outside the visible viewport.

**Suggested fix if an issue is confirmed:** add a consistent, high-contrast :focus-visible treatment and ensure fixed or sticky content does not cover the focused element.

### 3. Department and service headings should make the page easy to scan — P1

The service catalogue covers many areas of government. Clear heading levels and link names help people who scan visually, navigate by headings with a screen reader, or are not familiar with the department structure. The browser script records heading order and links without an accessible name so that the review can point to specific examples rather than making a general claim.

**What to check:** review the heading list and unnamed-link data in keyboard-results.json.

**Suggested fix if an issue is confirmed:** group services under meaningful headings, keep heading levels in order, and give each link a name that makes sense out of context.

### 4. The accessibility options described in the FAQ should be easy to find and use — P1

The official FAQ describes text-size and contrast options. A control that exists but is hard to find or cannot be operated from the keyboard is not useful to the person who needs it. The walkthrough looks for focusable controls whose names mention font, colour, contrast or accessibility. Not finding one in the first 45 Tab stops is recorded as a lead for manual follow-up, not automatically as proof that the feature is missing.

**What to check:** see the accessibility-control result in keyboard-pass.md and the FAQ screenshot.

**Suggested fix if an issue is confirmed:** use native buttons with clear names, expose the current setting, and ensure keyboard activation changes the page in a predictable way.

### 5. Keep interface, API and data responsibilities separate — P2

The starter app is intentionally smaller than the government portal. Its purpose is to show how a new service-list feature could be built without coupling the browser to a database. React owns presentation and interaction; Express owns the HTTP boundary; service data stays on the server. This is an architecture recommendation for the project being built, not a claim about the internal implementation of the government portal.

**Suggested approach:** if the in-memory examples are replaced with a database, put database access behind a repository or service module and keep the API response stable for the client.

## Scope and limitations

- Lighthouse only checks what it can detect in the captured page state. A high score does not prove conformance.
- Keyboard automation covers a bounded number of Tab stops. It does not understand whether every link is helpful or whether a page makes sense to someone using a screen reader.
- The accessibility toolbar may behave differently at other viewport sizes, languages or browser settings.
- No account-only service, form submission or payment workflow was tested.

The best next manual check is to repeat the same route with a screen reader (for example NVDA with Firefox or Chrome) and inspect any Lighthouse items marked as manual.
