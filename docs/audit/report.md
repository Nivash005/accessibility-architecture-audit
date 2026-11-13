# Accessibility Baseline & Repository Architecture Audit

**Target:** Tamil Nadu Government Portal — https://www.tn.gov.in/  
**Audit date:** 13 November 2026  
**Scope:** public homepage, Services surface, accessibility documentation, keyboard navigation methodology, and maintainable full-stack foundation.

## Executive summary

The Tamil Nadu Government Portal is the state's public information/service hub. Its official FAQ describes it as a single-window access point to state information and services and states that accessibility options are provided at the top of the page, including font increase/decrease and colour/contrast options. The current Services page exposes department-wise service navigation across many government departments.

This audit records five high-value accessibility/architecture improvement areas. The findings distinguish **source-observed evidence** from **manual-test items**. No Lighthouse score is fabricated: the repository includes the exact command to generate a current Lighthouse report and a checklist for capturing the required screenshots.

## Five prioritized findings

### WEB-001 — Keyboard navigation must be validated end-to-end
**Priority:** P1  
**WCAG:** 2.1.1 Keyboard, 2.4.3 Focus Order

**Evidence:** The portal exposes a large number of navigation and service links. The official Services page lists department-wise services, while the FAQ states that services are available through the Services tab.

**Risk:** A large navigation surface can become difficult to operate if any interactive element is skipped, pointer-only, or placed in an unexpected focus order.

**Remediation:** Use native links/buttons, preserve logical DOM order, add a skip link, and test every primary navigation path using only Tab/Shift+Tab/Enter/Space.

**Acceptance test:** Every primary service-navigation action is reachable and activatable without a mouse.

---

### WEB-002 — Focus visibility and focus obstruction require a manual pass
**Priority:** P1  
**WCAG:** 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured

**Evidence:** The public portal contains multiple navigation, service, document and form entry points. The official homepage exposes these as distinct content/navigation areas.

**Risk:** On dense public-service pages, a weak focus indicator or sticky content can make keyboard focus difficult to locate.

**Remediation:** Apply a consistent high-contrast `:focus-visible` style and verify that focused elements are not hidden by author-created overlays or sticky regions.

**Acceptance test:** Every focusable control has an obvious focus state and remains sufficiently visible while focused.

---

### WEB-003 — Service information hierarchy should be optimized for scanning and assistive technology
**Priority:** P1  
**WCAG:** 2.4.6 Headings and Labels, 2.4.10 Section Headings

**Evidence:** The current Services page provides a department-wise/service-wise catalogue containing numerous departments, including Revenue, School Education, Transport, Social Welfare and others.

**Risk:** A dense service catalogue can increase navigation cost for screen-reader, keyboard and cognitive users.

**Remediation:** Group services under meaningful headings, use semantic lists, provide descriptive link names, and keep heading levels logical.

**Acceptance test:** A user can identify the department/service grouping without depending on visual position.

---

### WEB-004 — Advertised accessibility controls need keyboard verification
**Priority:** P1  
**WCAG:** 2.1.1 Keyboard, 2.4.7 Focus Visible

**Evidence:** The portal's official FAQ explicitly states that accessibility options are provided at the top of the page, including font increase, font decrease, colour schemes and black/white contrast themes.

**Risk:** An accessibility feature is only useful if users can discover and operate it through their available input method.

**Remediation:** Ensure each control is a native button/control with an accessible name, visible focus, deterministic state, and a keyboard activation path.

**Acceptance test:** A keyboard-only user can locate, activate, and reverse each advertised accessibility setting.

---

### WEB-005 — Application boundaries should separate accessibility/UI concerns from persistence
**Priority:** P2  
**Architecture:** Maintainability boundary

**Evidence:** The portal is a broad service hub spanning departments, documents, forms, schemes, announcements and online services. The official FAQ also describes a CMS workflow in which departments update content and NIC acts as publisher/super administrator.

**Risk:** In a replacement/extension system, coupling React UI components directly to database code would make accessibility changes, testing and future persistence changes harder.

**Remediation:** Keep `client/`, HTTP/API, use-case logic and repositories separate. The starter implementation demonstrates this boundary with a service catalogue vertical slice.

**Acceptance test:** Replacing the in-memory repository with a database does not require changing React components.

## Lighthouse evidence

Run from the repository root:

```bash
npx lighthouse https://www.tn.gov.in/ \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html \
  --output-path=docs/audit/lighthouse/tn-gov-home.html
```

Then save a screenshot of the Lighthouse summary as:

```text
docs/screenshots/01-home-lighthouse.png
```

**Important:** The repository does not contain an invented Lighthouse score. The score must be generated in a real browser environment immediately before submission.

## Keyboard-only evidence

Capture these real-browser screenshots:

```text
02-keyboard-focus.png
03-navigation.png
04-accessibility-controls.png
05-service-navigation.png
```

Use Chrome/Edge with the mouse untouched. Record:
- browser version
- viewport
- date/time
- URL
- key sequence used
- expected vs actual result

## Evidence matrix

| ID | Evidence | Current status |
|---|---|---|
| WEB-001 | Official service/navigation structure + manual keyboard test | Source evidence captured; manual screenshot required |
| WEB-002 | Official homepage structure + focus visibility test | Source evidence captured; manual screenshot required |
| WEB-003 | Current Services page department-wise catalogue | Source evidence captured |
| WEB-004 | Official FAQ accessibility controls | Source evidence captured |
| WEB-005 | Official portal/CMS architecture description + starter architecture | Source evidence captured |

## Conclusion

The project foundation is submission-ready as a code/architecture artifact. The only environment-dependent proof that must be captured on the auditor's machine is the **live Lighthouse report and real keyboard-navigation screenshots**. These are intentionally not fabricated.
