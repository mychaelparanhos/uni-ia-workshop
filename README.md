# Workshop UNI IA — Landing Page

Landing page de conversão para o **Workshop UNI IA — Calendário Fechado em 3 Horas** (1ª edição: 12/05/2026, Lourdes/BH).

**Stack:** Astro 5 · Tailwind 4 · TypeScript strict · Vercel · Zero React · ~2KB JS gzipped.

---

## Setup local

```bash
npm install
cp .env.example .env  # edite os valores
npm run dev           # http://localhost:4321
```

## Build de produção

```bash
npm run build
npm run preview       # serve dist/ local
```

## Variáveis de ambiente

| Var | Default | Descrição |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://uni-ia-workshop.vercel.app` | URL canonical (og:url, schema.org) |
| `PUBLIC_CHECKOUT_URL` | (obrigatório, formato wa.me/) | URL do CTA principal — build falha se inválida |
| `PUBLIC_WHATSAPP_NUMBER` | `+5531999999999` | Footer + link "Fala comigo" pós-FAQ |
| `PUBLIC_LOTE_ATIVO` | `1` | `1 \| 2 \| 3` — controla destaque visual + Schema.org price |
| `PUBLIC_GTM_ID` | (vazio = sem GTM) | Google Tag Manager |
| `PUBLIC_META_PIXEL_ID` | (vazio = sem Pixel) | Meta (Facebook) Pixel |

## Como Mychael troca o lote ativo

Quando o **Lote 1** esgotar (e você quiser ativar o Lote 2):

1. Acesse `vercel.com/dashboard` → projeto `uni-ia-workshop`
2. **Settings** → **Environment Variables**
3. Edite `PUBLIC_LOTE_ATIVO` de `1` pra `2` (ou `3`)
4. Clique **Save** → Vercel pergunta "Redeploy?" → **Yes**
5. Em ~60s o site reflete: lote 2 destacado, lote 1 vira "ESGOTADO"

**Não é preciso editar nenhum arquivo de código.** O preço no Schema.org Event JSON-LD também atualiza automaticamente.

## Comandos

```bash
npm run dev              # dev server
npm run build            # produção
npm run preview          # preview local de dist/
npm run type-check       # astro check (TS)
npm run test             # unit + e2e
npm run test:unit        # vitest
npm run test:e2e         # playwright (precisa npx playwright install)
npm run test:e2e:headed  # playwright em modo visível
npm run test:lighthouse  # lighthouse CI local
```

## Estrutura

```
src/
├── content/
│   ├── config.ts         # Zod schema (3 lotes obrigatórios)
│   └── workshop/main.json # Copy literal de COPY_FINAL_LP.md
├── styles/
│   ├── tokens.css        # @theme inline + @font-face self-host
│   ├── modes.css         # 60-30-10 com data-mode
│   └── global.css        # reset, a11y, headings
├── components/
│   ├── primitives/       # Section, Heading, Accent, CTAButton, icons
│   ├── layout/           # Logo, Header, Footer
│   └── sections/         # 15 dobras (1 por arquivo)
├── layouts/Base.astro    # head + Schema.org Event + GTM/Pixel
├── pages/
│   ├── index.astro       # 15 sections em ordem
│   └── obrigado.astro    # pós-WhatsApp checkout + .ics
├── lib/                  # markdown-emphasis, tracking
├── scripts/              # faq, reveal, header, scroll-milestones
└── integrations/
    └── validate-env.js   # build hook valida wa.me/...
```

## Decisões arquiteturais (locked-in)

- **WhatsApp como checkout v1**: `PUBLIC_CHECKOUT_URL` aponta pra `wa.me/`. Build falha se URL inválida. CTA → conversa → Pix manual → confirmação. Ver TODO-4 pra migração futura pra Stripe/Pagar.me.
- **Env var pra trocar lote**: `PUBLIC_LOTE_ATIVO` no Vercel UI. Mychael não edita TS.
- **Regra híbrida tipográfica**: Inter Black + UMA palavra em `<Accent>` (Instrument Serif Italic mint) em CADA H1/H2. mintDark sobre branco, mint puro sobre preto (contraste WCAG).
- **Sistema 60-30-10**: cada `<Section mode="matrix|editorial|cta-mint">` aplica `data-mode` resolvido em `modes.css`.
- **Performance**: `inlineStylesheets: 'always'`, fontes self-hosted (Latin subset Google Fonts, ~120KB total) com preload Inter-Black + IS-Italic, AVIF+WebP via Astro `<Image>`. JS budget <5KB. Re-subset agressivo pra ~20KB é TODO-2 (Lote 2+).

## Performance budget

| Métrica | Target | Hard limit |
|---|---|---|
| LCP | <1.8s | <2.5s |
| CLS | <0.05 | <0.1 |
| PSI mobile | ≥95 | ≥90 |
| JS bundle gzip | <3KB | <5KB |

## TODOs pendentes

Ver [`TODOS.md`](./TODOS.md):
- TODO-1 (P2): Domínio customizado (workshop.uniia.com.br ou uniia.com.br/workshop)
- TODO-2 (P3): Re-subset automático de fontes em CI
- TODO-3 (P2): Escalar Lighthouse CI de informacional → bloqueante
- TODO-4 (P1): Migrar wa.me → checkout integrado (edição 2)

## Contexto AIOX

Story: [`docs/stories/1.1.lp-workshop-uni-ia.story.md`](./docs/stories/1.1.lp-workshop-uni-ia.story.md)

Eng review CLEARED em 2026-05-05 via `/plan-eng-review` (gstack), com 21 decisões refinadas e 4 tensões cross-model resolvidas.
