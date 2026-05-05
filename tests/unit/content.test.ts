import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const workshopPath = resolve(__dirname, '../../src/content/workshop/main.json');
const data = JSON.parse(readFileSync(workshopPath, 'utf-8'));

describe('workshop content data', () => {
  it('has all 15 required sections', () => {
    const required = [
      'workshop', 'hero', 'provas', 'problema', 'passo',
      'entregaveis', 'porQuePresencial', 'paraQuem', 'recap',
      'preco', 'doisCaminhos', 'autoridade', 'garantia',
      'logistica', 'faq', 'ctaFinal',
    ];
    for (const key of required) {
      expect(data, `missing section: ${key}`).toHaveProperty(key);
    }
  });

  it('has exactly 3 lotes (regression: length(3) Zod rule)', () => {
    expect(data.preco.lotes).toHaveLength(3);
  });

  it('lote 1 ativo with R$47 individual / R$70 dupla / 7 vagas', () => {
    const lote1 = data.preco.lotes.find((l: any) => l.numero === 1);
    expect(lote1.preco_individual).toBe(47);
    expect(lote1.preco_dupla).toBe(70);
    expect(lote1.vagas).toBe(7);
    expect(lote1.status_default).toBe('ativo');
  });

  it('workshop date is 2026-05-12T19:00 BRT', () => {
    expect(data.workshop.date).toBe('2026-05-12T19:00:00-03:00');
  });

  it('address matches confirmed user data', () => {
    expect(data.workshop.address).toContain('Rua dos Aimorés');
    expect(data.workshop.address).toContain('2244');
    expect(data.workshop.address).toContain('Lourdes');
    expect(data.workshop.addressLocality).toBe('Belo Horizonte');
    expect(data.workshop.postalCode).toBe('30140-074');
  });

  it('hero accent is "profissional" (regra híbrida sentinel)', () => {
    expect(data.hero.accent).toBe('profissional');
  });

  it('passo has exactly 3 momentos', () => {
    expect(data.passo.momentos).toHaveLength(3);
  });

  it('entregaveis has 4 cards summing R$ 980', () => {
    expect(data.entregaveis.cards).toHaveLength(4);
    const total = data.entregaveis.cards.reduce((a: number, c: any) => a + c.valorNum, 0);
    expect(total).toBe(980);
    expect(data.entregaveis.total.valor).toBe('R$ 980');
  });

  it('logistica has 6 cards', () => {
    expect(data.logistica.cards).toHaveLength(6);
  });

  it('faq has between 5 and 8 items', () => {
    expect(data.faq.items.length).toBeGreaterThanOrEqual(5);
    expect(data.faq.items.length).toBeLessThanOrEqual(8);
  });

  it('all faq items have unique ids', () => {
    const ids = data.faq.items.map((i: any) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
