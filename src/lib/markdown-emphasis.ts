/**
 * Markdown emphasis helper — UNI IA brand rule
 * Converte *texto* em <em class="serif-mint">texto</em>
 */
export function em(text: string): string {
  return text.replace(/\*(.+?)\*/g, '<em class="serif-mint">$1</em>');
}
