# Run this from PowerShell in the repository root.
$ErrorActionPreference = "Stop"

Write-Host "Installing the browser audit tools..."
npm install --no-save --no-package-lock lighthouse playwright axe-core
if ($LASTEXITCODE -ne 0) { throw "Could not install the audit tools." }

Write-Host "Installing Chromium for Playwright..."
npx playwright install chromium
if ($LASTEXITCODE -ne 0) { throw "Could not install Chromium." }

$env:CHROME_PATH = node -e "const { chromium } = require('playwright'); process.stdout.write(chromium.executablePath())"
if (-not $env:CHROME_PATH) { throw "Playwright did not return a Chromium path." }

New-Item -ItemType Directory -Force -Path "docs/audit/lighthouse", "docs/screenshots" | Out-Null

Write-Host "Running Lighthouse against the public portal..."
npx lighthouse https://www.tn.gov.in/ --chrome-path="$env:CHROME_PATH" --only-categories=accessibility,performance,best-practices,seo --output=html --output=json --output-path=docs/audit/lighthouse/tn-gov-home --chrome-flags="--headless"
$lighthouseExitCode = $LASTEXITCODE

Write-Host "Running the keyboard and axe checks..."
node scripts/run-keyboard-audit.mjs
if ($LASTEXITCODE -ne 0) { throw "The keyboard/axe script did not complete. Check the error above." }

Write-Host "Preparing the Lighthouse summary and screenshot..."
node scripts/capture-lighthouse-summary.mjs
if ($LASTEXITCODE -ne 0) { throw "The Lighthouse summary could not be created." }

if ($lighthouseExitCode -ne 0) {
  Write-Warning "Lighthouse returned a non-zero exit code. Open docs/audit/lighthouse/summary.md and check whether the page loaded before using any score."
} else {
  Write-Host "Audit commands finished. Review docs/audit and docs/screenshots before submitting."
}
