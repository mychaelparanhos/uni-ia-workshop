# Changelog
All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-05-05

### Added
- 9 imagens reais nas dobras 01, 02, 05 (4 cards), 06, 10 e 11 — substituem placeholders SVG e dão prova material da promessa
- Foto profissional do Mychael na Dobra 11 (Autoridade) substituindo o SVG placeholder
- Mockup do Calendário de 30 dias na Dobra 05 com `quality={88}` — entregável principal renderiza em alta fidelidade
- Imagem do Workshop em ação (Card 1), Kit de Bordo (Card 3), grupo WhatsApp (Card 4)
- Foto do Mychael ensinando na Dobra 02 (Provas) reforçando "professor no Sebrae"
- Comparativo visual sala-vs-sozinho na Dobra 06 (Por que presencial)
- Imagem editorial na Dobra 10 (Dois caminhos) sobre fundo matrix
- Suite e2e `tests/e2e/images.spec.ts` (8 testes) que valida presença, alt text e dimensões em todas as dobras com imagem
- 5 sentinels novos em `content.test.ts` travando copy chave (headline hero, Sebrae, "Últimas 2 vagas", refraseamento garantia, "todo mundo posta")

### Changed
- Hero headline reescrito: "Aprenda a usar IA da forma *correta* e crie 30 dias de conteúdo profissional em 3 horas. Presencial em BH."
- Provas reposicionada com Sebrae como protagonista (professor de Marketing e Inovação) + novos números (100+ empresas, 8+ dígitos somados, consultor de IA desde 2022)
- Lote 1 ganha tag de escassez "Últimas 2 vagas · Primeira turma"
- Dobra 04 (Passo a passo) — Momento 2 sem "tempo se divide por 24" (frase obscura virou produção concreta: 1 → 5 → 15 posts em 30min)
- Dobra 11 (Autoridade) reestruturada com 3 subseções (Quem eu sou / Resultados / Por que estou fazendo isso) e Sebrae no centro
- Dobra 12 (Garantia) — "tirei a barreira do meio" virou "vou direto ao ponto" (refraseamento mais limpo)
- Dobra 14 (FAQ #4) — resposta sobre upsell mais transparente e direta
- Dobra 03 (Problema) — 3 frases de dor refraseadas para "todo mundo posta", "mercado andou e você não", "copiando e colando"
- Hero CTA: "Garantir Vaga · de R$ 97 por R$ 47" (ancoragem visível no botão)
- 3 bullets do Hero agora trazem data/local/escassez ao invés de copy abstrata

### Fixed
- a11y: `<ul>` em `03-Problema.astro` continha `<p>` direto como child — separado em `<div class="problema__col">` wrapper
- a11y: contraste do footer copyright subido de cinza-claro para `rgba(255,255,255,0.72)` (passa WCAG AA)
- Astro `<Image>` service: Vercel imageService só ativo quando `VERCEL=1`. Build local usa Sharp (gera WebP), evita 404 em `astro preview`

### Performance
- 9 imagens otimizadas via Sharp em build local: 13.5MB raw → ~500KB WebP total
- Hero: 1.6MB → 17KB WebP (LCP critical, com `loading="eager"` + `fetchpriority="high"`)
- Calendário (Card 2 entregável principal): 1.4MB → 43KB com `quality={88}`
- Foto Mychael perfil: 952KB → 7KB WebP
- Em produção (Vercel), `<Image>` usa `/_vercel/image?...` API com AVIF/WebP negotiation

### Quality
- 23/23 unit tests passing (18 originais + 5 novos sentinels)
- 8/8 e2e images tests passing em desktop/tablet/mobile
- Eng Review CLEARED via /plan-eng-review (Net: 0 critical, 5 decisões fechadas D1-D5)

## [0.1.0] - 2026-05-05

### Added
- Landing page completa do Workshop UNI IA — Lote 1 Decolagem (15 dobras)
- Página /obrigado com instruções pós-WhatsApp checkout + arquivo .ics
- Sistema 60-30-10 com peso narrativo (matrix · editorial · cta-mint)
- Regra híbrida tipográfica (Inter Black + Instrument Serif Italic mint) em todos H1/H2
- Astro Content Collection com Zod schema validando 3 lotes obrigatórios
- Build hook que valida formato wa.me/ em PUBLIC_CHECKOUT_URL
- Schema.org Event JSON-LD dinâmico (consome lote ativo via env var)
- Self-host fontes (Inter 400/500/700/800 + Instrument Serif Italic) com preload
- 7 specs E2E (Playwright) + 18 unit tests (Vitest)
- CI workflows: type-check + tests bloqueante; Lighthouse CI informacional

### Changed
- WhatsApp como checkout v1 (PUBLIC_CHECKOUT_URL aponta pra wa.me/)
- PUBLIC_LOTE_ATIVO env var pra trocar lote sem editar código
- Mobile typography ajustada (H1 36px em <480px com hyphenation)
- Tabela de ancoragem (Dobra 09) vira cards stack em mobile <720px

### Performance
- inlineStylesheets: 'always' (zero CSS request bloqueante)
- HTML 92KB · JS 1KB gzip · Total dist 276KB
- Build time ~700ms

### Quality
- Eng Review CLEARED (PR Quality Score 9.5/10)
- QA Health Score 95/100 (5 issues found, 5 fixed)
- 0 console errors · 0 type errors · 18/18 unit tests passing

[0.1.0]: https://github.com/mychaelparanhos/uni-ia-workshop/releases/tag/v0.1.0
