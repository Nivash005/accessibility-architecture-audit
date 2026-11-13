# Lighthouse files

The live workflow writes an HTML report and JSON report here when the home page loads successfully.

- tn-gov-home.report.html — full Lighthouse report.
- tn-gov-home.report.json — raw Lighthouse results.
- summary.md and summary.json — short result summaries.
- connectivity-check.txt — response headers from the GitHub-hosted runner.

A Lighthouse NO_FCP result means the browser did not paint the page. It is not a score and must not be described as a successful audit. See ../environment-limitations.md for the hosted-runner issue.
