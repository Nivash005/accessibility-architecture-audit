# Live audit: access limitation

I attempted to run Lighthouse and the keyboard walkthrough from GitHub-hosted Chromium on 13 November 2026. The hosted browser could not load the portal pages.

## What the run recorded

- Lighthouse requested https://www.tn.gov.in/ but did not receive a first contentful paint. Its JSON result contains NO_FCP; the final displayed URL is about:blank, and all category scores are null.
- The keyboard script attempted Home, Services and FAQ. All three pages returned no usable response, so it recorded zero real-page Tab stops.
- axe-core marked all three pages as not checked. It did not scan a blank browser page and count that as a pass.
- The old Lighthouse screenshot showed the diagnostic report, not the Tamil Nadu website. That image has been removed from the source screenshots folder so it cannot be mistaken for website evidence.

The Actions history is available here:
https://github.com/Nivash005/accessibility-architecture-audit/actions

## Possible certificate clue

A third-party scan checked on 11 November 2026 reported that the certificate for the bare hostname tn.gov.in had expired on that date and that the bare hostname redirects to www.tn.gov.in. This is not a direct certificate test of the www hostname and it does not prove the cause of the hosted Chromium timeouts. It is recorded as a possible item for the site administrator to check, not as a confirmed finding about the www endpoint.

Source: https://sitetrails.com/tn.gov.in

## What this means for the submission

There is no valid Lighthouse score from the hosted runs, and there are no real website screenshots from those attempts. I have kept those items pending rather than making up scores or using a screenshot of about:blank.

The official pages' text content can still be reviewed, but a text snapshot is not a replacement for the browser evidence expected by the task.

## How to finish from a network that can reach the portal

On a Windows machine where the website opens normally:

1. Pull the latest main branch.
2. Open PowerShell in the project folder.
3. Run .\scripts\run-audit-local.ps1.
4. Open the Lighthouse report and keyboard trace.
5. Check that the screenshots show the real portal pages.
6. Commit the generated evidence to main.

The local script uses normal certificate validation. Do not turn off certificate checks to force a score. If the portal still does not load, record the error and ask the site administrator to check its HTTPS configuration.
