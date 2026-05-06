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

  it('hero accent is "correta" (regra híbrida sentinel)', () => {
    expect(data.hero.accent).toBe('correta');
  });

  it('hero headline opens with new promise "Aprenda a usar IA"', () => {
    expect(data.hero.headline).toContain('Aprenda a usar IA');
  });

  it('lote 1 legenda flags scarcity "Últimas 2 vagas"', () => {
    const lote1 = data.preco.lotes.find((l: any) => l.numero === 1);
    expect(lote1.legenda).toContain('Últimas 2 vagas');
  });

  it('provas repositioning: Sebrae present in subheadline OR accent', () => {
    const haystack = `${data.provas.subheadline} ${data.provas.accent} ${data.provas.headlinePre}`;
    expect(haystack).toContain('Sebrae');
  });

  it('garantia bloco1 dropped the old "tirei a barreira" phrasing', () => {
    expect(data.garantia.bloco1).not.toContain('tirei a barreira');
    expect(data.garantia.bloco1).toContain('vou direto ao ponto');
  });

  it('problema autocriticas[2] reflects "todo mundo posta" refraseamento', () => {
    expect(data.problema.autocriticas[2]).toContain('todo mundo');
  });

  it('passo has exactly 3 pilares (Método Calendário Fechado)', () => {
    expect(data.passo.pilares).toHaveLength(3);
    const icones = data.passo.pilares.map((p: any) => p.icone);
    expect(icones).toEqual(['contexto', 'volume', 'correcao']);
  });

  it('passo has 3 jornada items mapping to time slots', () => {
    expect(data.passo.jornada).toHaveLength(3);
    expect(data.passo.jornada[0].horario).toMatch(/19h/);
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

  it('faq has between 4 and 8 items', () => {
    expect(data.faq.items.length).toBeGreaterThanOrEqual(4);
    expect(data.faq.items.length).toBeLessThanOrEqual(8);
  });

  it('faq has no upsell question (removed deliberately)', () => {
    const hasUpsell = data.faq.items.some((i: any) => i.id === 'upsell' || /R\$1\.?400|empurrar curso/.test(i.pergunta));
    expect(hasUpsell).toBe(false);
  });

  it('all faq items have unique ids', () => {
    const ids = data.faq.items.map((i: any) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
