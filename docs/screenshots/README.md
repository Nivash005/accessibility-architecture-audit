# Screenshots from the live review

These images are created by the GitHub Actions browser run. They should show the live Tamil Nadu Government website, not the React example app.

| File | What it records |
|---|---|
| 01-home-lighthouse.png | Screenshot of the generated Lighthouse report |
| 02-keyboard-focus.png | Home page after the first Tab press |
| 03-navigation.png | Home page after twelve Tab presses |
| 04-accessibility-controls.png | FAQ page at the matching keyboard stop, or at the end of the search sequence if no matching control was found |
| 05-service-navigation.png | Full-page capture of the department-wise Services page |

The run details and raw focus sequence are in docs/audit/keyboard-pass.md and docs/audit/keyboard-results.json. Open the raw report before interpreting a result: the accessibility toolbar search is a bounded keyboard walk, not proof that a control is missing.
