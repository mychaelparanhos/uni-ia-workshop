/**
 * Scroll milestones — dispara scroll_50 e scroll_100 (cada 1x)
 */
let fired50 = false;
let fired100 = false;

function pushMilestone(event: 'scroll_50' | 'scroll_100') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

function check() {
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.documentElement.scrollHeight;
  const pct = scrolled / total;

  if (!fired50 && pct >= 0.5) {
    fired50 = true;
    pushMilestone('scroll_50');
  }
  if (!fired100 && pct >= 0.95) {
    fired100 = true;
    pushMilestone('scroll_100');
  }
}

let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);
