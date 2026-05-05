/**
 * FAQ — single-open accordion + tracking
 * Funciona sem JS via <details> nativo. Este script só
 * adiciona single-open + dataLayer.push.
 */
const faqItems = document.querySelectorAll<HTMLDetailsElement>('details[data-faq-id]');

faqItems.forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      faqItems.forEach((other) => {
        if (other !== details) other.open = false;
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'faq_expand',
        faq_id: details.dataset.faqId,
      });
    }
  });
});
