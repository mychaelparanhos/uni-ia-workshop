/**
 * Sticky header reveal — IntersectionObserver no sentinel do hero
 * Quando o sentinel sai da view, header recebe data-revealed=true
 */
const header = document.getElementById('site-header');
const sentinel = document.getElementById('hero-sentinel');

if (header && sentinel && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      header.dataset.revealed = (!entry.isIntersecting).toString();
    },
    { threshold: 0 }
  );
  observer.observe(sentinel);
}
