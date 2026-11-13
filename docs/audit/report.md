# Accessibility audit report

**Website:** Tamil Nadu Government Portal – https://www.tn.gov.in/  
**Pages in scope:** Home, Services and FAQ  
**Purpose:** record the main navigation and accessibility questions raised by this public-service website.

## Why I selected this portal

The portal is a starting point for people looking for Tamil Nadu Government information and services. Its FAQ describes it as a single-window source for state information. The same FAQ says that font-size and contrast options are available at the top of the site.

I selected it because the service directory contains many departments and because the portal itself makes an explicit statement about accessibility support.

## A note about the evidence

The hosted browser environment used for this audit could not load the portal. Chromium timed out while navigating to the home page, Services and FAQ; Lighthouse returned NO_FCP because the page did not paint content. The failed run is documented in environment-limitations.md.

That means the findings below are review priorities based on the public page structure and the portal's own documentation. They should not be presented as five confirmed WCAG failures. The live Lighthouse and keyboard evidence still needs to be captured from a browser/network that can load the site.

## Findings

### 1. Make the Services list easier to scan

**Priority: High**

The Services page groups a long list of departments, including Revenue, School Education, Transport and Social Welfare. A department-wise list is a sensible starting point, but it still asks visitors to know which department is likely to own the service they need.

**Why this matters:** People may not know the name of the responsible department. A long list also takes more effort to move through with a keyboard or screen reader.

**Suggested improvement:** Keep the department grouping, add a short explanation at the top, use descriptive headings, and consider a search or filter that lets people narrow the list.

**Evidence:** https://www.tn.gov.in/services.php

### 2. Check the accessibility controls from the visitor's point of view

**Priority: High**

The portal FAQ says that people can increase or decrease font size and change colour/contrast settings. Those options are useful only when visitors can find them and understand how they work.

**Why this matters:** A setting that is hard to locate, has an unclear name or cannot be used from the keyboard can leave the people who need it without a practical way to use it.

**Suggested improvement:** Make each control easy to identify, give it a useful accessible name, show its current state, and make sure it works with keyboard input as well as a pointer.

**Evidence:** https://www.tn.gov.in/faq.php. A live keyboard check is still needed to confirm how the controls behave.

### 3. Keep the keyboard focus easy to follow

**Priority: High**

The home page links to different content areas and service information. A keyboard user should always be able to see which link or control is active as they move through the page.

**Why this matters:** When focus is difficult to see, visitors can lose their place or activate the wrong item.

**Suggested improvement:** Use a clear focus indicator for every interactive element. Check that a fixed header, menu or other page content does not cover the focused control.

**Evidence:** This is a required check in the keyboard audit method. It is not marked as passed or failed until the live page can be loaded and inspected.

### 4. Make page sections easy to navigate by headings

**Priority: Medium**

The home page brings together several different types of information, such as documents, contact details, press releases, forms and schemes. Clear headings and landmarks help visitors jump to the section they are looking for.

**Why this matters:** People using screen readers often move by headings and landmarks. Meaningful link names also help when links are read out of context.

**Suggested improvement:** Use a clear page heading, logical section headings and semantic navigation/main/footer landmarks. Do not use visual styling alone to represent a heading.

**Evidence:** The page structure should be checked with Lighthouse/axe and then reviewed in a screen reader. The hosted audit could not reach the live page, so there is no automated result to quote yet.

### 5. Keep the demo application's responsibilities separate

**Priority: Medium**

The starter project has a React client and an Express server. The browser requests the service list from the API; the server returns data from a separate module. The current data is stored in memory.

**Why this matters:** When page components also contain database logic, testing and changing either side becomes harder. It also makes it more difficult to keep accessibility behaviour separate from persistence.

**Suggested improvement:** Keep user interaction in the client, HTTP routes in the server, and future database access behind a data-access layer.

**Evidence:** The code in client/src and server/src, along with the architecture notes.

## Priority summary

| Finding | Priority | Main action |
|---|---|---|
| Services list takes effort to scan | High | Improve headings and provide a way to narrow choices |
| Advertised accessibility controls need end-to-end verification | High | Check names, state and keyboard operation |
| Keyboard focus should remain visible | High | Inspect the full Tab and Shift+Tab path |
| Page sections should be easy to navigate | Medium | Use semantic headings and landmarks |
| Demo application should remain maintainable | Medium | Keep UI, API and data responsibilities separate |

## What this report does not claim

This is a baseline review, not an accessibility certification. Lighthouse and axe can catch many technical issues, but they cannot judge every service journey or tell us whether a person can complete it comfortably with their own assistive technology. The keyboard script is a repeatable browser test; it does not replace testing by people who use screen readers, magnification or switch devices.

I have kept the live-site checks marked as pending until a browser run produces usable evidence.
