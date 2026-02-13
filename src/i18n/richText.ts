const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] ?? char);
}

/**
 * Renders a minimal, safe rich-text subset for translations.
 * Supported syntax:
 * - **bold**
 * - *italic*
 */
export function formatTranslationRichText(input: string | undefined): string {
  if (!input) return '';

  const escaped = escapeHtml(input).replace(/\r\n/g, '\n');

  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}
