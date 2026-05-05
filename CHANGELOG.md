# Changelog
All notable changes to this project will be documented in this file.

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
