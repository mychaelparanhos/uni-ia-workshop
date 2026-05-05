/**
 * IntersectionObserver — fade-up reveal
 * Respeita prefers-reduced-motion (CSS já desliga, mas evita work)
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
} else {
  // Sem IO ou reduced motion — mostra tudo
  document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('is-visible'));
}
