# What I could verify from the public pages

**Checked:** 13 November 2026  
**Source:** official Tamil Nadu Government Portal pages as returned by the web-readable text snapshot.

I was able to inspect the text content indexed for these official pages, even though Chromium in the hosted audit runner could not load them. This is useful for checking what the portal publishes, but it does not expose the full live DOM, visual appearance, keyboard behaviour or control state.

## Home page

The page text includes:

- a Screen Reader Access link;
- an Accessibility Menu;
- Text To Speech;
- Bigger Text and Small Text;
- Line Height, Highlight Links, Text Spacing and Cursor options;
- Light-Dark and Invert Colors options;
- Reset All Settings;
- a Skip To Main Content link;
- navigation groups for Government, Documents, Services, News & Events and Others.

The page content also includes sections for Documents, Contact Directory, Press Releases, Forms, Schemes and What's New.

**What this tells me:** the portal provides several accessibility-related entry points and a broad navigation structure. The text snapshot does not tell me whether every menu control is keyboard reachable, whether its state is announced, or whether the skip link moves focus to the right place. Those checks still need a working browser session.

## Services page

The text snapshot shows three catalogue views: Department Wise, Service wise and Category wise. It also shows a Search control and a department list with entries such as Commercial Taxes and Registration, Energy, Environment, Finance, Higher Education, Revenue and Disaster Management, School Education, Social Welfare and Transport.

**What this tells me:** the site already provides more than a plain list; visitors can choose a catalogue view and search. The audit should check whether the search field has a programmatic label, whether changing the view is keyboard-operable, and whether results are announced when the view changes.

## FAQ

The official FAQ says that the portal is intended to provide single-window access to state information and services. It also says the portal is GIGW compliant and lists font-size and contrast options. The FAQ describes a content-management workflow in which departments have nodal officers who update content and NIC acts as publisher/super administrator.

**What this tells me:** the FAQ is the source for the portal's own accessibility and CMS statements. Those statements are not an independent conformance test. The keyboard and assistive-technology checks are still needed to confirm how the features work for visitors.

## Sources

- Home: https://www.tn.gov.in/
- Services: https://www.tn.gov.in/services.php
- FAQ: https://www.tn.gov.in/faq.php
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

The official pages were text-readable through the web index on the audit date. The full-page browser screenshots and Lighthouse scores are still pending because the hosted Chromium environment could not establish a usable page load.
