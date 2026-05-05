/**
 * Fade-up reveal — progressive enhancement, FOUC-safe
 *
 * Estratégia:
 * 1. Adiciona html.js-fade pra ativar opacity:0 inicial
 * 2. Marca elementos JÁ no viewport como is-visible imediatamente
 *    (sem animação — eles devem aparecer instantâneo)
 * 3. Resto: IntersectionObserver dispara is-visible quando entram
 *
 * Sem JS: fade-up é no-op (CSS default = visible).
 * Com prefers-reduced-motion: pula tudo.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-fade');

  const items = document.querySelectorAll<HTMLElement>('.fade-up');
  const viewportH = window.innerHeight;

  // 1ª passada: marca quem já tá no viewport como visible (sem animar)
  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportH && rect.bottom > 0) {
      el.classList.add('is-visible');
    }
  });

  // 2ª passada: observer pra quem ainda não entrou
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}
