# TODOs — Landing Page Workshop UNI IA

> Itens deferidos durante o /plan-eng-review. Todos têm contexto suficiente pra alguém retomar em 3 meses.

---

## TODO-1: Definir domínio customizado

**What:** Configurar `workshop.uniia.com.br` (ou `uniia.com.br/workshop`) com DNS+SSL no Vercel.

**Why:** Schema.org Event JSON-LD, canonical URL e Open Graph metatags ficam apontando pra URL provisória do Vercel (`uni-ia-workshop.vercel.app`) durante o MVP. Trocar depois quebra autoridade SEO já indexada.

**Pros:** SEO autoridade desde o primeiro indexamento; URL profissional; subdomínio dedicado isola edições futuras.

**Cons:** Coordenar com registro de domínio (uniia.com.br tem registrar?); DNS propagation 24-48h; dependência externa.

**Context:** `PUBLIC_SITE_URL` env var no Vercel dashboard aceita o valor — quando definir domínio, trocar var, redeploy resolve. `Base.astro` lê dessa env pra montar canonical + og:url + JSON-LD url.

**Depends on:** Decisão Mychael × Paulo sobre subdomínio vs path; verificar registrar atual.

**Priority:** P2 — pode ficar até Lote 2.

---

## TODO-2: Re-subset automático de fontes em CI

**What:** Workflow GitHub Actions que roda `glyphhanger` (ou `subfont`) sobre o conteúdo renderizado da LP e regenera os arquivos `.woff2` em `public/fonts/`.

**Why:** Subset agressivo pra MVP cobre só os ~80 caracteres únicos da copy atual (~20KB total). Se Mychael adicionar copy nova com glyph fora do subset (acentos especiais, símbolos), a fonte renderiza fallback (system-ui) — quebra silenciosa do brand.

**Pros:** Previne regressão silenciosa; aceita expansão de copy sem manutenção manual.

**Cons:** ~30 min setup; depende de `glyphhanger` instalado em CI; complexidade extra.

**Context:** No MVP, subset gerado uma vez localmente. Se mudar copy, re-rodar manual: `npx glyphhanger ./dist/index.html --subset='public/fonts/Inter-*.woff2'`. Esse TODO automatiza.

**Depends on:** LP em produção + baseline de copy estável.

**Priority:** P3 — só vira problema quando copy mudar.

---

## TODO-3: Escalar Lighthouse CI de informacional pra bloqueante

**What:** Mudar `lighthouse.yml` workflow de `assertions: warn` pra `assertions: error` nas métricas LCP/CLS/PSI.

**Why:** MVP roda Lighthouse CI mas só reporta scores no PR (não bloqueia merge) pra evitar fricção de prazo. Pra Lote 2 e edições futuras, gate sólido previne regressão de performance.

**Pros:** Zero deploy de regressão; baseline forte.

**Cons:** Requer 2-3 PRs de baseline antes de ativar (capturar valores estáveis); 1 typo CSS pode atrasar deploy 30 min.

**Context:** Workflow já existe em `.github/workflows/lighthouse.yml` com `assertions: warn`. Trocar pra `error` quando baseline estável.

**Depends on:** LP em produção 2-3 semanas pra baseline.

**Priority:** P2 — fazer antes de Lote 2.

---

## TODO-4: Migrar wa.me pra checkout integrado

**What:** Substituir CTA → WhatsApp manual por integração real (Stripe Payment Link, Pagar.me Link, ou Hotmart).

**Why:** Pra Lote 1 (7 vagas, deadline curto), WhatsApp + Pix manual é o caminho mais rápido. Mas pra Lote 2/3 e edições futuras com mais vagas, Mychael não escala como atendente humano.

**Pros:** Conversão automática 24/7; comprovante automático; reduz fricção.

**Cons:** ~1-2 dias de integração; taxa do gateway (3-5%); precisa testar fluxo.

**Context:** `PUBLIC_CHECKOUT_URL` env var já existe. Quando criar checkout, trocar var de `https://wa.me/...` pra URL do gateway. Build hook valida formato. Manter wa.me como fallback de emergência.

**Depends on:** Conta no gateway escolhido; criar produto com R$47.

**Priority:** P1 — fazer antes de Lote 2.

---

