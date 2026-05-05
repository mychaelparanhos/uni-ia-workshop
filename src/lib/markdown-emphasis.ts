/**
 * Markdown emphasis helper — UNI IA brand rule
 * Converte *texto* em <em class="serif-mint">texto</em>
 *
 * - Escapa HTML antes (defesa em profundidade pra inputs controlados pelo CMS)
 * - Regex com negated class evita backtracking O(n²)
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function em(text: string): string {
  return escapeHtml(text).replace(
    /\*([^*]+)\*/g,
    '<em class="serif-mint">$1</em>'
  );
}
