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

## TODO-5: Corrigir contraste WCAG AA do mint-dark sobre branco

**What:** O token `--color-mint-dark` (#00b380) tem contraste 2.7:1 sobre branco — abaixo do WCAG AA mínimo de 4.5:1. Afeta `passo__sai`, `passo__num`, `entregaveis__num` e outros elementos que usam mint sobre branco em texto pequeno (<18pt).

**Why:** axe-core aponta como "serious" — usuários com baixa visão não conseguem ler. SEO/Lighthouse a11y score sofre.

**Pros:** Acessibilidade conforme WCAG AA; melhor leitura geral.

**Cons:** Mudar tom do mint (de #00b380 para ~#008060) afeta identidade visual estabelecida no design system v1.5.

**Context:** Issue está em `src/styles/tokens.css` (`--color-mint-dark`). Solução A: escurecer mint-dark para passar WCAG AA. Solução B: aumentar font-weight desses elementos (700+ em texto pequeno passa). Solução C: aumentar font-size para >18pt (relaxa para 3:1). Já existem 5 testes a11y failing pré-existentes por isso.

**Depends on:** Decisão de design (Uma) sobre alterar token vs aumentar peso/tamanho.

**Priority:** P2 — não bloqueia conversão mas degrada inclusão.

---

## TODO-6: Corrigir contraste do `passo__horario` (#8e8e93 sobre branco)

**What:** Texto cinza `#8e8e93` em fonte 11.2px tem contraste 3.26:1 — abaixo do WCAG AA. Afeta horários ("19h-20h", "20h-21h", "21h-22h") nos cards do passo a passo.

**Why:** axe-core aponta como "serious". Horários são informação útil — não devem ser ilegíveis.

**Pros:** Acessibilidade; horário fica mais visível.

**Cons:** Pode quebrar a hierarquia visual (mono em cinza claro era proposital).

**Context:** Em `src/components/sections/04-PassoAPasso.astro`. Trocar `var(--color-gray-4)` por `var(--color-gray-5)` ou aumentar para 12px+ resolve.

**Priority:** P2.

---

## TODO-7: Adicionar `tabindex=0` ao wrapper da tabela em PorQuePresencial

**What:** `.porque__table-wrap` faz scroll horizontal em mobile mas não é focável via teclado, falha "scrollable-region-focusable" do axe.

**Why:** Usuários só de teclado não conseguem rolar a tabela.

**Pros:** Inclusão; conformidade WCAG.

**Cons:** Adiciona um stop de tab.

**Context:** Em `src/components/sections/06-PorQuePresencial.astro`, adicionar `tabindex="0"` e `role="region" aria-label="Tabela comparativa"` ao wrapper.

**Priority:** P2.

---

## TODO-8: Atualizar test legado de `whatsapp_click` em `/obrigado`

**What:** `tests/e2e/obrigado.spec.ts:22` falha porque assume que CTA aponta para `wa.me`, mas atualmente é Ticto.

**Why:** Test obsoleto desde a migração para checkout Ticto. Falsa-falha em CI.

**Pros:** CI green.

**Cons:** —

**Context:** Mesma natureza do fix em `tests/e2e/ctas.spec.ts:35` — atualizar regex para aceitar `checkout.ticto.app|wa.me|api.whatsapp.com`.

**Priority:** P3 — pré-existente.

---

