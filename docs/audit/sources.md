# Sources used in this review

I used the portal's own pages to understand what the site says it does. I used W3C and browser-tool documentation to choose the checks.

## Official Tamil Nadu Government sources

- Home page: https://www.tn.gov.in/
- Services page: https://www.tn.gov.in/services.php
- FAQ: https://www.tn.gov.in/faq.php

The official FAQ says the portal is intended to provide single-window access to state information and services. It says that accessibility options such as font increase/decrease, colour schemes and black/white contrast themes are available. It also describes the portal's GIGW compliance statement and its department-based CMS publishing workflow.

The Home page text snapshot lists a Screen Reader Access link, Skip To Main Content, and an Accessibility Menu containing text-to-speech, text size, line-height, link highlighting, text spacing, cursor and colour/theme options.

The Services page text snapshot shows Department Wise, Service wise and Category wise views, a Search control, and department links.

## Other sources used to interpret the runner failure

- SiteTrails domain scan: https://sitetrails.com/tn.gov.in

A scan checked on 11 November 2026 reported that the certificate presented for the bare tn.gov.in hostname expired on 11 November 2026 and that the bare hostname redirects to www.tn.gov.in. This is a third-party scan and does **not** prove the certificate presented by www.tn.gov.in is expired. It is recorded only as a possible clue when investigating the browser timeouts.

## Standards and tools

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Lighthouse documentation: https://developer.chrome.com/docs/lighthouse/overview/
- Playwright keyboard input: https://playwright.dev/docs/input#keyboard
- axe-core: https://github.com/dequelabs/axe-core

The portal is the source for statements about its own pages and advertised features. The browser-generated reports are the evidence for what automated tests actually ran. Neither source should be mistaken for a complete conformance certificate.
