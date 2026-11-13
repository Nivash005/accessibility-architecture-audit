# Submission Checklist

## Before pushing to GitHub

### Required
- [x] Public service website selected
- [x] Audit report
- [x] Five accessibility/architecture findings
- [x] Severity/remediation priorities
- [x] Architecture tree
- [x] Client/server/docs/tests directories
- [x] Local setup instructions
- [x] First vertical feature slice
- [x] Audit CSV
- [x] CI workflow
- [ ] Run Lighthouse and save `docs/screenshots/01-home-lighthouse.png`
- [ ] Save generated Lighthouse HTML under `docs/audit/lighthouse/`
- [ ] Perform keyboard-only pass
- [ ] Save `02-keyboard-focus.png`
- [ ] Save `03-navigation.png`
- [ ] Save `04-accessibility-controls.png`
- [ ] Save `05-service-navigation.png`

## Git commands

```bash
git init
git add .
git commit -m "feat: accessibility baseline and full-stack architecture audit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## Final GitHub README proof

The repository README should make these items visible immediately:
1. Audited website
2. Audit findings
3. Architecture tree
4. Local setup
5. Lighthouse command
6. Keyboard-only methodology
7. First vertical slice
8. Screenshot evidence

## Do not fabricate

Do not type a Lighthouse score into the report unless it came from an actual Lighthouse run. Do not use generated/mock images as evidence screenshots. Real browser captures are the strongest proof.
