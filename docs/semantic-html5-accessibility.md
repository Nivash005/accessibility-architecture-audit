# Semantic HTML5 & Accessible Component Architecture

## Implementation status

Complete for the dashboard foundation.

### Semantic structure

The dashboard uses:

- `header` for the global identity and navigation.
- `nav` for global and contextual navigation.
- `aside` for dashboard section navigation.
- `main` for the primary page content.
- `section` for independently grouped dashboard areas.
- `article` for self-contained metric and content cards.
- `footer` for site-level information.
- Native `table`, `caption`, `thead`, `tbody`, `th scope`, and `td` for tabular records.
- Native `dialog` for the modal interaction.

## WCAG-oriented controls

- Skip link provides a keyboard route to the main content.
- Every form control has a programmatic label.
- The filter form uses a labelled `fieldset` and `legend`.
- Required and constrained fields use native validation attributes.
- Navigation landmarks have accessible names where multiple landmarks exist.
- The modal has an accessible name and description and supports Escape through the native dialog mechanism.
- Focus-visible styling is provided for interactive controls.
- Status information uses semantic status/alert patterns where applicable.
- Table row headers and column headers are explicitly scoped.

## Multi-page architecture

The repository includes:

- `client/index.html` — dashboard application entry point.
- `client/services.html` — semantic services view.
- `client/reports.html` — semantic reports view.
- `client/src/components/` — reusable React dashboard components.

## Validation

The source HTML is deliberately kept standards-compliant and uses native HTML semantics instead of ARIA replacing native controls. CI should validate the static HTML entry documents before submission.

For final external evidence, run the W3C Nu HTML Checker against the deployed/static HTML documents and retain the validator result with the submission package.
