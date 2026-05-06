import { test, expect } from '@playwright/test';

const SECTIONS_WITH_IMAGES = [
  { id: 'hero', minImages: 1, label: 'Dobra 01 — Hero' },
  { id: 'provas', minImages: 1, label: 'Dobra 02 — Provas (mychael ensinando)' },
  { id: 'entregaveis', minImages: 4, label: 'Dobra 05 — Entregáveis (4 cards)' },
  { id: 'por-que-presencial', minImages: 1, label: 'Dobra 06 — Por que presencial' },
  { id: 'dois-caminhos', minImages: 1, label: 'Dobra 10 — Dois caminhos' },
  { id: 'autoridade', minImages: 1, label: 'Dobra 11 — Autoridade (foto Mychael)' },
];

test.describe('LP UNI IA · imagens das dobras', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  for (const section of SECTIONS_WITH_IMAGES) {
    test(`${section.label} renderiza pelo menos ${section.minImages} imagem(ns) com alt`, async ({ page }) => {
      const sectionLocator = page.locator(`#${section.id}`);
      await expect(sectionLocator).toBeVisible();

      const images = sectionLocator.locator('img');
      const count = await images.count();
      expect(count, `seção #${section.id} deve ter ao menos ${section.minImages} <img>`).toBeGreaterThanOrEqual(section.minImages);

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt, `<img> #${i} em #${section.id} deve ter alt non-empty`).toBeTruthy();
        expect(alt!.trim().length, `<img> #${i} em #${section.id} alt vazio`).toBeGreaterThan(0);

        // dimensões > 0 (Astro Image injeta width/height automaticamente do asset)
        const width = await img.evaluate((el: HTMLImageElement) => el.naturalWidth || el.width);
        expect(width, `<img> #${i} em #${section.id} deve ter width > 0`).toBeGreaterThan(0);
      }
    });
  }

  test('Hero image tem loading="eager" e fetchpriority="high" (LCP)', async ({ page }) => {
    const heroImg = page.locator('#hero img').first();
    await expect(heroImg).toBeVisible();
    await expect(heroImg).toHaveAttribute('loading', 'eager');
    await expect(heroImg).toHaveAttribute('fetchpriority', 'high');
  });

  test('SVG placeholder antigo do Mychael foi removido de #autoridade', async ({ page }) => {
    const placeholder = page.locator('#autoridade svg text');
    const placeholderCount = await placeholder.count();
    if (placeholderCount > 0) {
      const text = await placeholder.first().textContent();
      expect(text).not.toContain('PLACEHOLDER');
    }
  });
});
