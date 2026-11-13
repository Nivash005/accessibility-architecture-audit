import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const pagesToReview = [
  { name: 'home', url: 'https://www.tn.gov.in/' },
  { name: 'services', url: 'https://www.tn.gov.in/services.php' },
  { name: 'faq', url: 'https://www.tn.gov.in/faq.php' },
];

const docsDirectory = path.resolve('docs');
const screenshotsDirectory = path.join(docsDirectory, 'screenshots');
const auditDirectory = path.join(docsDirectory, 'audit');
const viewport = { width: 1440, height: 1000 };
const accessibilityWords = /font|contrast|colour|color|accessib/i;

await fs.mkdir(screenshotsDirectory, { recursive: true });
await fs.mkdir(auditDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport,
  locale: 'en-IN',
  timezoneId: 'Asia/Kolkata',
  reducedMotion: 'reduce',
});

async function loadPage(target) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  let response = null;
  let navigationError = null;
  try {
    response = await page.goto(target.url, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });
    await page.waitForTimeout(2000);
  } catch (error) {
    navigationError = error.message;
  }

  return { page, response, navigationError, consoleErrors, pageErrors };
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const tidy = (text) => (text || '').replace(/\\s+/g, ' ').trim().slice(0, 180);
    const accessibleName = (element) => tidy(
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      element.innerText ||
      element.textContent ||
      element.querySelector('img')?.getAttribute('alt') ||
      '',
    );
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((element) => ({
      level: Number(element.tagName.slice(1)),
      text: tidy(element.innerText || element.textContent),
    }));
    const links = [...document.querySelectorAll('a[href]')].map((element) => ({
      name: accessibleName(element),
      href: element.href,
    }));
    const buttons = [...document.querySelectorAll('button,[role="button"]')].map((element) => ({
      name: accessibleName(element),
      tag: element.tagName.toLowerCase(),
    }));
    const headingSkips = [];
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index].level > headings[index - 1].level + 1) {
        headingSkips.push({ from: headings[index - 1], to: headings[index] });
      }
    }
    const controls = [...document.querySelectorAll('a,button,input,[role="button"]')]
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        name: accessibleName(element),
        href: element.href || null,
      }))
      .filter((element) => /font|contrast|colour|color|accessib/i.test(element.name));

    return {
      url: location.href,
      title: document.title,
      language: document.documentElement.lang || null,
      headingCount: headings.length,
      headings,
      h1Count: headings.filter((heading) => heading.level === 1).length,
      headingSkips,
      linkCount: links.length,
      unnamedLinks: links.filter((link) => !link.name),
      buttonCount: buttons.length,
      unnamedButtons: buttons.filter((button) => !button.name),
      imagesMissingAlt: document.querySelectorAll('img:not([alt])').length,
      imagesWithEmptyAlt: document.querySelectorAll('img[alt=""]').length,
      accessibilityRelatedControls: controls,
    };
  });
}

async function keyboardWalk(page, limit = 36) {
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1000);

  const stops = [];
  for (let index = 1; index <= limit; index += 1) {
    await page.keyboard.press('Tab');
    const stop = await page.evaluate((tabNumber) => {
      const element = document.activeElement;
      if (!element || element === document.body || element === document.documentElement) {
        return { index: tabNumber, tag: 'body', label: '', inViewport: false };
      }
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const label = (
        element.getAttribute('aria-label') ||
        element.getAttribute('title') ||
        element.innerText ||
        element.textContent ||
        ''
      ).replace(/\\s+/g, ' ').trim().slice(0, 160);
      const outlineVisible = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;

      return {
        index: tabNumber,
        tag: element.tagName.toLowerCase(),
        role: element.getAttribute('role'),
        label,
        href: element.href || null,
        tabIndex: element.tabIndex,
        matchesFocusVisible: element.matches(':focus-visible'),
        outline: style.outlineStyle + ' ' + style.outlineWidth + ' ' + style.outlineColor,
        outlineVisible,
        boxShadowVisible: style.boxShadow !== 'none',
        inViewport: rect.width > 0 && rect.height > 0 &&
          rect.bottom > 0 && rect.top < innerHeight &&
          rect.right > 0 && rect.left < innerWidth,
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
      };
    }, index);

    stops.push(stop);
    if (index === 1) {
      await page.screenshot({ path: path.join(screenshotsDirectory, '02-keyboard-focus.png') });
    }
    if (index === 12) {
      await page.screenshot({ path: path.join(screenshotsDirectory, '03-navigation.png') });
    }
  }

  const expectedPreviousStop = stops.length > 1 ? stops[stops.length - 2] : null;
  await page.keyboard.press('Shift+Tab');
  const reverseResult = await page.evaluate(() => {
    const element = document.activeElement;
    return {
      tag: element?.tagName?.toLowerCase() || null,
      label: (
        element?.getAttribute('aria-label') ||
        element?.innerText ||
        element?.textContent ||
        ''
      ).replace(/\\s+/g, ' ').trim().slice(0, 160),
      href: element?.href || null,
    };
  });

  const reverseMatches = Boolean(expectedPreviousStop &&
    expectedPreviousStop.tag === reverseResult.tag &&
    expectedPreviousStop.label === reverseResult.label &&
    expectedPreviousStop.href === reverseResult.href);

  return {
    tabStops: stops,
    expectedPreviousStop,
    reverseResult,
    reverseTabMatchesPreviousStop: reverseMatches,
  };
}

const results = {
  startedAt: new Date().toISOString(),
  browser: 'Chromium ' + browser.version(),
  viewport,
  inputMethod: 'Playwright keyboard events only during the Tab / Shift+Tab walkthrough. No mouse or pointer input was used.',
  pages: {},
};

try {
  const home = await loadPage(pagesToReview[0]);
  const homeResult = {
    httpStatus: home.response?.status() ?? null,
    finalUrl: home.page.url(),
    navigationError: home.navigationError,
    consoleErrors: home.consoleErrors,
    pageErrors: home.pageErrors,
    structure: await inspectPage(home.page).catch((error) => ({ error: error.message })),
    keyboard: null,
  };

  if (!home.navigationError && home.response?.ok()) {
    homeResult.keyboard = await keyboardWalk(home.page);
  }
  results.pages.home = homeResult;
  await home.page.close();

  const services = await loadPage(pagesToReview[1]);
  const serviceResult = {
    httpStatus: services.response?.status() ?? null,
    finalUrl: services.page.url(),
    navigationError: services.navigationError,
    consoleErrors: services.consoleErrors,
    pageErrors: services.pageErrors,
    structure: await inspectPage(services.page).catch((error) => ({ error: error.message })),
  };
  if (!services.navigationError && services.response?.ok()) {
    await services.page.screenshot({
      path: path.join(screenshotsDirectory, '05-service-navigation.png'),
      fullPage: true,
    });
  }
  results.pages.services = serviceResult;
  await services.page.close();

  const faq = await loadPage(pagesToReview[2]);
  const faqResult = {
    httpStatus: faq.response?.status() ?? null,
    finalUrl: faq.page.url(),
    navigationError: faq.navigationError,
    consoleErrors: faq.consoleErrors,
    pageErrors: faq.pageErrors,
    structure: await inspectPage(faq.page).catch((error) => ({ error: error.message })),
    accessibilityControlTabStop: null,
    first45TabStops: [],
  };

  if (!faq.navigationError && faq.response?.ok()) {
    await faq.page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
    await faq.page.waitForTimeout(1000);

    for (let index = 1; index <= 45; index += 1) {
      await faq.page.keyboard.press('Tab');
      const item = await faq.page.evaluate((tabNumber) => {
        const element = document.activeElement;
        const label = (
          element?.getAttribute('aria-label') ||
          element?.getAttribute('title') ||
          element?.innerText ||
          element?.textContent ||
          ''
        ).replace(/\\s+/g, ' ').trim().slice(0, 150);
        return {
          index: tabNumber,
          tag: element?.tagName?.toLowerCase() || null,
          label,
          href: element?.href || null,
        };
      }, index);

      faqResult.first45TabStops.push(item);
      if (/font|contrast|colour|color|accessib/i.test(item.label)) {
        faqResult.accessibilityControlTabStop = item;
        await faq.page.screenshot({
          path: path.join(screenshotsDirectory, '04-accessibility-controls.png'),
        });
        break;
      }
    }

    if (!faqResult.accessibilityControlTabStop) {
      await faq.page.screenshot({
        path: path.join(screenshotsDirectory, '04-accessibility-controls.png'),
      });
    }
  }

  results.pages.faq = faqResult;
  await faq.page.close();

  results.finishedAt = new Date().toISOString();
  await fs.writeFile(
    path.join(auditDirectory, 'keyboard-results.json'),
    JSON.stringify(results, null, 2) + '\\n',
  );

  const homeStops = homeResult.keyboard?.tabStops || [];
  const stopsWithoutComputedRing = homeStops.filter((stop) =>
    !stop.outlineVisible && !stop.boxShadowVisible && !stop.matchesFocusVisible,
  );
  const firstStop = homeStops[0];
  const faqControl = faqResult.accessibilityControlTabStop;
  const pageLines = Object.entries(results.pages).map(([name, item]) => {
    const status = item.httpStatus === null ? 'No response' : 'HTTP ' + item.httpStatus;
    return '| ' + name + ' | ' + status + ' | ' + (item.navigationError ? 'Navigation failed' : 'Loaded') + ' |';
  });

  const lines = [
    '# Live keyboard walkthrough',
    '',
    'Run: ' + results.startedAt + ' to ' + results.finishedAt,
    'Browser: ' + results.browser + '; viewport: ' + viewport.width + ' x ' + viewport.height + '.',
    '',
    'The Tab sequence was sent through the browser keyboard API. No pointer input was used. This is a repeatable keyboard walkthrough, not a full assistive-technology assessment.',
    '',
    '## Pages reached',
    '',
    '| Page | Response | Result |',
    '|---|---:|---|',
    ...pageLines,
    '',
    '## Homepage keyboard sequence',
    '',
    '- Tab stops recorded: ' + homeStops.length + '.',
    '- First Tab stop: ' + (firstStop ? firstStop.tag + ': ' + (firstStop.label || '(no text captured)') : 'not recorded') + '.',
    '- Shift+Tab returned to the preceding stop: ' + (homeResult.keyboard?.reverseTabMatchesPreviousStop ? 'Yes' : 'No or not verifiable') + '.',
    '- Stops without a computed outline, box-shadow or :focus-visible match: ' + stopsWithoutComputedRing.length + ' of ' + homeStops.length + '. This is a CSS signal only; inspect the screenshots before treating it as a failure.',
    '',
    '### Captured Tab stops',
    '',
    '| # | Element | Label | Focus styling detected | In viewport |',
    '|---:|---|---|---|---|',
    ...homeStops.map((stop) =>
      '| ' + stop.index + ' | ' + stop.tag + ' | ' + (stop.label || '').replaceAll('|', '\\|') +
      ' | ' + (stop.matchesFocusVisible || stop.outlineVisible || stop.boxShadowVisible ? 'Yes' : 'Not detected') +
      ' | ' + (stop.inViewport ? 'Yes' : 'No') + ' |',
    ),
    '',
    '## Advertised accessibility controls',
    '',
    faqControl
      ? 'A keyboard stop matching font, contrast, colour or accessibility wording appeared on the FAQ page at Tab ' +
        faqControl.index + ': **' + faqControl.tag + ' — ' + faqControl.label + '**.'
      : 'No keyboard stop matching font, contrast, colour or accessibility wording appeared in the first 45 Tab stops on the FAQ page. The official FAQ describes these options, but this sequence did not locate a matching focusable control. This is a reason for a closer manual check, not proof that the feature is absent.',
    '',
    '## Screenshots',
    '',
    '- docs/screenshots/02-keyboard-focus.png — first keyboard focus state on the home page.',
    '- docs/screenshots/03-navigation.png — home page after twelve Tab presses.',
    '- docs/screenshots/04-accessibility-controls.png — focused matching control if found, otherwise the FAQ at the end of the search sequence.',
    '- docs/screenshots/05-service-navigation.png — Services page, full-page capture.',
    '',
    '## What this walkthrough cannot prove',
    '',
    'It does not replace a screen-reader test, a human review of every menu and form, or a full WCAG conformance assessment. The raw trace records the browser, page responses, focus order and computed focus styling so another reviewer can repeat the same route.',
    '',
  ];

  await fs.writeFile(path.join(auditDirectory, 'keyboard-pass.md'), lines.join('\\n') + '\\n');
} finally {
  await browser.close();
}
