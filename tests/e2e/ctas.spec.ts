import { test, expect } from '@playwright/test';

test.describe('CTAs — dataLayer events', () => {
  test('CTA hero pushes cta_hero_click', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      (window as any).dataLayer = [];
      // Bloqueia navigate pra capturar dataLayer antes do unload
      document.querySelectorAll('a[data-track]').forEach((a) => {
        a.addEventListener('click', (e) => e.preventDefault(), { capture: true });
      });
    });
    const cta = page.locator('#hero [data-track="cta_hero_click"]').first();
    await expect(cta).toBeVisible();
    await cta.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(150);
    const events = await page.evaluate(() => (window as any).dataLayer);
    const hasEvent = events.some((e: any) => e.event === 'cta_hero_click');
    expect(hasEvent).toBe(true);
  });

  test('all expected data-track buttons exist', async ({ page }) => {
    await page.goto('/');
    const expected = [
      'cta_hero_click',
      'cta_preco_click',
      'cta_dupla_click',
      'cta_dois_caminhos_click',
      'cta_final_click',
      'cta_header_click',
      'whatsapp_click',
    ];
    for (const evt of expected) {
      const count = await page.locator(`[data-track="${evt}"]`).count();
      expect(count, `missing data-track="${evt}"`).toBeGreaterThan(0);
    }
  });

  test('CTAs point to PUBLIC_CHECKOUT_URL (Ticto)', async ({ page }) => {
    await page.goto('/');
    const heroCta = page.locator('#hero [data-track="cta_hero_click"]').first();
    const href = await heroCta.getAttribute('href');
    expect(href).toMatch(/^https:\/\/(checkout\.ticto\.app|wa\.me|api\.whatsapp\.com)\//);
  });
});
