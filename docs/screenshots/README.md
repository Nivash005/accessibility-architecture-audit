# Browser screenshots

The screenshots in this folder must come from a real browser session on the Tamil Nadu Government Portal. The audit scripts create them only when the relevant page actually loads.

| File | Capture |
|---|---|
| 01-home-lighthouse.png | Lighthouse report summary after a usable page load and scored run. |
| 02-keyboard-focus.png | First Tab stop on the home page. |
| 03-navigation.png | Home page after twelve Tab presses. |
| 04-accessibility-controls.png | FAQ page after keyboard navigation. |
| 05-service-navigation.png | Full-page capture of the Services page. |

## Current status

The latest hosted run did not load the public pages. It created Lighthouse and keyboard diagnostic reports, but no real-page screenshots. No placeholder images have been added.

The keyboard trace is in docs/audit/keyboard-results.md. Lighthouse output and its summary are in docs/audit/lighthouse/.

Do not submit an about:blank screenshot, a browser error or an empty Lighthouse report as proof that the website was audited. Run the local script from a network that can reach the portal and confirm that the captures show the actual site.
