# Live audit: access limitation

I tried to run Lighthouse and the keyboard walkthrough from GitHub-hosted Chromium on 13 November 2026. The runner could not load the public portal.

## What happened

- Lighthouse navigated to https://www.tn.gov.in/ but did not receive a page paint. It returned NO_FCP and protocol timeouts.
- The earlier keyboard walkthrough timed out on the home page, Services page and FAQ page. It received no usable HTTP response and recorded zero real-page Tab stops.
- The screenshot from that failed Lighthouse attempt shows the Lighthouse error report on an about:blank page. It is a diagnostic, not a screenshot of the government website, so it must not be presented as a successful page capture.

The failed hosted runs are visible in GitHub Actions:
https://github.com/Nivash005/accessibility-architecture-audit/actions

One run produced an artifact, but its evidence commit conflicted with a newer commit. The report was inspected and not treated as a successful audit.

## What this means

There is no valid Lighthouse score from those attempts, and the site screenshots were not captured. I have left those checks pending rather than filling the report with invented scores or blank browser captures.

The official portal's indexed pages remain available for checking the site's published information, but search-index content is not a substitute for a live browser session.

## How to finish from a network that can reach the portal

On a Windows machine where the site opens normally:

1. Pull the latest main branch.
2. Open PowerShell in the project folder.
3. Run .\\scripts\\run-audit-local.ps1.
4. Open the Lighthouse report and review the keyboard trace.
5. Confirm the screenshots show the actual government website.
6. Commit the generated files to main.

The local script uses normal certificate validation. If the portal does not load in a normal browser on that machine either, the issue is not solved by ignoring certificate warnings; record the error and try again from a network where the site is available.
