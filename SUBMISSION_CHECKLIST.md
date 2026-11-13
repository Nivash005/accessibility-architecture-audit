# Final review checklist

This is the list I use to check the repository before handing it in.

## Project and documentation

- [x] Public website selected and linked
- [x] Five findings described with priorities and suggested improvements
- [x] Client, server, docs and tests kept in separate folders
- [x] Architecture and local setup explained in the README
- [x] First service-catalogue feature slice included
- [x] Audit CSV included
- [x] GitHub Actions CI configured

## Live audit evidence

- [ ] Lighthouse HTML and JSON reports are present in `docs/audit/lighthouse/`
- [ ] Lighthouse summary screenshot is present
- [ ] Home-page keyboard focus screenshot is present
- [ ] Navigation screenshot is present
- [ ] FAQ/accessibility screenshot is present
- [ ] Services-page screenshot is present
- [ ] Keyboard trace and axe results have a date and tested URL

The audit workflow is designed to create these files and commit them to `main`. I only tick the items above after checking that the files exist in the repository.

## Before submission

- [ ] Open the reports and make sure they are readable.
- [ ] Check the screenshots show the real website and not a browser error page.
- [ ] Read the findings next to the evidence; do not describe an automated warning as a confirmed user failure.
- [ ] Keep the final README and report consistent with the latest audit run.

