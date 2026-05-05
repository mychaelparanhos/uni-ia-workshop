import { test, expect } from '@playwright/test';

test.describe('FAQ accordion', () => {
  test('opens an item on click', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('details[data-faq-id]').first();
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
  });

  test('single-open: opening item B closes item A', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('details[data-faq-id]');
    const a = items.nth(0);
    const b = items.nth(1);
    await a.locator('summary').click();
    await expect(a).toHaveAttribute('open', '');
    await b.locator('summary').click();
    await expect(b).toHaveAttribute('open', '');
    // a deve estar fechado
    const aOpen = await a.evaluate((el) => (el as HTMLDetailsElement).open);
    expect(aOpen).toBe(false);
  });

  test('FAQ works without JS (details native)', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    const first = page.locator('details[data-faq-id]').first();
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await context.close();
  });

  test('faq_expand event fires on open', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => { (window as any).dataLayer = []; });
    const first = page.locator('details[data-faq-id]').first();
    await first.locator('summary').click();
    await page.waitForTimeout(100);
    const events = await page.evaluate(() => (window as any).dataLayer);
    expect(events.some((e: any) => e.event === 'faq_expand')).toBe(true);
  });
});
