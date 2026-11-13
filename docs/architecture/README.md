# Architecture

## Goal
Provide a small, testable full-stack foundation for an accessible public-service experience.

## Boundaries

### `client/`
Owns:
- semantic HTML
- keyboard interaction
- visual focus states
- API consumption
- user-facing error/loading states

Must not:
- import server modules
- access database drivers
- contain persistence logic

### `server/`
Owns:
- HTTP routing
- validation
- service orchestration
- repository interfaces/implementations

Must not:
- know about React components
- contain browser-specific behavior

### `docs/`
Owns:
- audit evidence
- architecture decisions
- setup instructions

### `tests/`
Owns:
- acceptance/integration scenarios crossing client/server boundaries

## First vertical feature slice

**Service catalogue**

```text
GET /api/services
       |
       v
service route
       |
       v
service use-case
       |
       v
service repository
       |
       v
JSON
       |
       v
React service list
```

The current repository uses an in-memory repository to keep setup friction low. The repository interface is intentionally the seam where PostgreSQL/SQLite can be introduced later.

## Accessibility architecture rules

1. Prefer native HTML elements.
2. Do not use `div`/`span` as interactive controls.
3. Every form control has a programmatic label.
4. Every interactive element has a visible focus state.
5. Focus order follows the visual/semantic order.
6. Dialogs have a keyboard escape path.
7. Errors are associated with the relevant control.
8. Language changes are represented semantically.
9. Automated checks supplement, not replace, manual keyboard testing.
10. Accessibility acceptance tests are part of CI.
