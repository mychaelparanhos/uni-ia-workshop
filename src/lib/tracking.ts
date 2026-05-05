/**
 * Tracking dispatcher wrapper — UNI IA Workshop LP
 * window.dataLayer já é inicializado is:inline no <head> de Base.astro
 */
export type TrackEvent =
  | 'cta_hero_click'
  | 'cta_preco_click'
  | 'cta_dupla_click'
  | 'cta_dois_caminhos_click'
  | 'cta_final_click'
  | 'cta_header_click'
  | 'whatsapp_click'
  | 'faq_expand'
  | 'scroll_50'
  | 'scroll_100'
  | 'page_view';

export function track(event: TrackEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload, ts: Date.now() });
}
