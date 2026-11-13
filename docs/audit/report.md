# Accessibility audit report

**Website:** Tamil Nadu Government Portal - https://www.tn.gov.in/  
**Pages in scope:** Home, Services and FAQ  
**Review date:** 13 November 2026

## Why I selected this portal

The portal is a starting point for people looking for Tamil Nadu Government information and services. Its FAQ describes the site as a single-window source for state information. The same page says that the portal is GIGW compliant and advertises font-size and contrast options.

I selected it because the Services page brings together a large number of departments, while the home page includes several different ways to move through information.

## What I was able to inspect

The official pages were text-readable through the web index on the review date, even though the hosted Chromium runner could not load them.

The Home page text snapshot includes a Screen Reader Access link, a Skip To Main Content link and an Accessibility Menu with text-to-speech, bigger/smaller text, line height, text spacing, link highlighting, cursor and colour/theme options.

The Services page snapshot shows Department Wise, Service wise and Category wise views, a Search control and a long department list.

The FAQ states that the portal is GIGW compliant and advertises font and contrast options. It also explains that departments update portal content through a CMS workflow, with NIC acting as publisher/super administrator.

These are observations about the published page content. They do not prove how the controls behave in a real keyboard or screen-reader session.

## Hosted browser limitation

The GitHub-hosted Chromium run did not load the pages. Lighthouse returned NO_FCP with about:blank as the final URL and all category scores null. The keyboard run recorded zero focus stops because Home, Services and FAQ did not return a usable page response. axe therefore marked all three pages as not checked.

I have not used those failed runs as page screenshots or accessibility scores. The diagnostic details are in environment-limitations.md.

## Findings and recommended fixes

These findings combine what the official pages publish with the checks still required to establish whether the experience works well. They are review findings, not five confirmed WCAG failures.

### 1. Make the Services directory easier to narrow down

**Priority: High**  
**Relevant WCAG topics:** 2.4.6 Headings and Labels; 2.4.10 Section Headings

The Services page offers Department Wise, Service wise and Category wise views, plus a Search control. It also lists many separate government departments.

**Why I flagged it:** The choice of departments is useful when a visitor already knows who owns a service. It may be less obvious for someone who only knows what they need to do.

**Suggested improvement:** Keep the three catalogue views, make their names clear, and make sure the search field has a proper label. When the view or results change, provide feedback that assistive technology can announce.

**Evidence:** Official Services page text snapshot: https://www.tn.gov.in/services.php

### 2. Verify the advertised accessibility menu works from the keyboard

**Priority: High**  
**Relevant WCAG topics:** 2.1.1 Keyboard; 4.1.2 Name, Role, Value

The Home page text snapshot lists an Accessibility Menu with text-to-speech, bigger/smaller text, line height, link highlighting, text spacing, cursor and colour/theme options. The FAQ also advertises font and contrast settings.

**Why I flagged it:** The portal tells visitors these options are available, so visitors should be able to find, operate and reset them using their chosen input method.

**Suggested improvement:** Check every control's accessible name, role, state and keyboard activation. Confirm that the setting changes visibly and that Reset All Settings returns the page to a predictable state.

**Evidence:** Home page and official FAQ: https://www.tn.gov.in/ and https://www.tn.gov.in/faq.php

### 3. Check that Skip To Main Content really moves focus to the main area

**Priority: High**  
**Relevant WCAG topics:** 2.4.1 Bypass Blocks; 2.4.3 Focus Order

The Home page text snapshot contains a Skip To Main Content link and a Screen Reader Access link.

**Why I flagged it:** A skip link is a good starting point, but its presence in the page text does not tell us whether it is visible at the right time, whether the target exists, or whether focus moves to the main content.

**Suggested improvement:** With the keyboard, press Tab from the top of the page, activate the skip link with Enter, and confirm the page moves to the main content rather than only changing the scroll position.

**Evidence:** Home page text snapshot: https://www.tn.gov.in/

### 4. Keep the large page structure predictable

**Priority: Medium**  
**Relevant WCAG topics:** 1.3.1 Info and Relationships; 2.4.6 Headings and Labels

The Home page brings together Documents, Contact Directory, Press Releases, Forms, Schemes and What's New. Its main navigation is grouped into Government, Documents, Services, News & Events and Others.

**Why I flagged it:** With several content groups on one page, heading order and landmarks matter. A visitor should be able to jump to a section and understand where they are.

**Suggested improvement:** Use one clear page heading, meaningful section headings and landmarks. Make link text understandable when read outside its surrounding card or paragraph.

**Evidence:** Home page text snapshot: https://www.tn.gov.in/

### 5. Keep the demo app's page and data responsibilities separate

**Priority: Medium**  
**Architecture topic:** Maintainability and testability

The starter app uses React for the service list and Express for the API. The browser calls /api/services, and the server returns records from a separate module.

**Why I flagged it:** Putting database queries inside page components would make the UI harder to test and make later data changes more disruptive.

**Suggested improvement:** Keep the browser focused on presentation, put HTTP routes in the server and add a repository layer when persistent storage is introduced.

**Evidence:** client/src and server/src, explained in docs/architecture/README.md.

## Priority summary

| Finding | Priority | Suggested next step |
|---|---|---|
| Service directory has many choices | High | Check search labels, view controls and feedback |
| Accessibility menu needs keyboard verification | High | Test names, states, activation and reset |
| Skip link needs end-to-end verification | High | Confirm it moves focus to main content |
| Long home page needs clear structure | Medium | Review headings, landmarks and link names |
| Demo app should remain easy to maintain | Medium | Keep UI, API and data access separate |

## What this audit does not claim

This is a baseline review, not an accessibility certification. The text snapshot helps identify what the portal offers, but it does not expose the full DOM or visual behaviour. Lighthouse and axe can catch many technical issues, but they cannot judge every service journey. The Playwright keyboard walkthrough sends real keyboard events in Chromium, but it does not replace a person testing with a screen reader, magnification or switch device.

The live browser results remain pending until the portal loads in a normal, certificate-validating browser session.
