import { test, expect } from '@playwright/test';

test.describe('LP Workshop UNI IA — smoke', () => {
  test('renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    await page.goto('/');
    await expect(page).toHaveTitle(/Workshop UNI IA/);
    expect(errors).toHaveLength(0);
  });

  test('all 15 sections are rendered', async ({ page }) => {
    await page.goto('/');
    const sections = await page.locator('section[data-mode]').count();
    expect(sections).toBe(15);
  });

  test('outline: 1 H1 + 14 H2', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('h1').count()).toBe(1);
    expect(await page.locator('h2').count()).toBe(14);
  });

  test('skip-link is present and points to #preco', async ({ page }) => {
    await page.goto('/');
    const skip = page.locator('a.skip-link');
    await expect(skip).toHaveAttribute('href', '#preco');
  });

  test('schema.org Event JSON-LD is present', async ({ page }) => {
    await page.goto('/');
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(ld).toBeTruthy();
    const data = JSON.parse(ld!);
    expect(data['@type']).toBe('Event');
    expect(data.startDate).toContain('2026-05-12T19:00');
  });

  test('OG meta tags are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
  });
});
