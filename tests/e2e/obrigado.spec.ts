import { test, expect } from '@playwright/test';

test.describe('/obrigado page', () => {
  test('renders successfully', async ({ page }) => {
    await page.goto('/obrigado');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Recebido');
  });

  test('has download link to .ics', async ({ page }) => {
    await page.goto('/obrigado');
    const ics = page.locator('a[href*=".ics"]');
    await expect(ics).toBeVisible();
  });

  test('back-to-LP link works', async ({ page }) => {
    await page.goto('/obrigado');
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/\/$/);
  });

  test('WhatsApp CTA fires whatsapp_click event', async ({ page }) => {
    await page.goto('/obrigado');
    await page.evaluate(() => { (window as any).dataLayer = []; });
    const cta = page.locator('[data-track="whatsapp_click"]').first();
    await cta.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(100);
    const events = await page.evaluate(() => (window as any).dataLayer);
    expect(events.some((e: any) => e.event === 'whatsapp_click')).toBe(true);
  });
});
