# Acceptance Tests

## Accessibility
- [ ] Skip link is reachable with first `Tab`.
- [ ] All primary navigation links are reachable by keyboard.
- [ ] Focus is visible on every interactive element.
- [ ] `Shift+Tab` reverses focus order.
- [ ] No keyboard trap occurs.
- [ ] Error status uses `role="alert"`.
- [ ] Loading status uses `role="status"`.
- [ ] Headings form a logical hierarchy.

## API
- [ ] `GET /health` returns `{ "ok": true }`.
- [ ] `GET /api/services` returns an array.
- [ ] Unknown routes return JSON 404.
