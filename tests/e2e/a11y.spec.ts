import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('a11y baseline', () => {
  test('axe-core: 0 critical/serious violations on /', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const serious = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact || '')
    );
    if (serious.length) {
      console.log(JSON.stringify(serious, null, 2));
    }
    expect(serious).toHaveLength(0);
  });

  test('axe-core: 0 critical/serious violations on /obrigado', async ({ page }) => {
    await page.goto('/obrigado');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const serious = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact || '')
    );
    expect(serious).toHaveLength(0);
  });

  test('skip-link is keyboard-accessible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() =>
      document.activeElement?.classList.contains('skip-link')
    );
    expect(focused).toBe(true);
  });

  test('respects prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    // .fade-up elements should be visible already (no opacity 0)
    const opacity = await page.locator('.fade-up').first().evaluate(
      (el) => window.getComputedStyle(el).opacity
    );
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
    await context.close();
  });
});
