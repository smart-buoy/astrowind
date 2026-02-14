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

function applyInlineFormatting(input: string): string {
  return input.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
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

  return applyInlineFormatting(escaped).replace(/\n/g, '<br />');
}

/**
 * Renders rich text with simple block handling for frontmatter-like fields.
 * Supported syntax:
 * - paragraph blocks separated by blank lines
 * - bullet list lines prefixed with "-", "*", or "•"
 * - **bold**, *italic*
 * - single line breaks inside paragraph blocks
 */
export function formatFrontmatterRichText(input: string | undefined): string {
  if (!input) return '';

  const escaped = escapeHtml(input).replace(/\r\n/g, '\n');
  const blocks = escaped
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => block.split('\n').map((line) => line.trimEnd()));

  const isListLine = (line: string) => /^(- |\* |• )/.test(line.trim());
  const htmlParts: string[] = [];

  for (const lines of blocks) {
    let paragraphLines: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
      if (paragraphLines.length === 0) return;
      htmlParts.push(`<p>${applyInlineFormatting(paragraphLines.join('<br />'))}</p>`);
      paragraphLines = [];
    };

    const flushList = () => {
      if (listItems.length === 0) return;
      htmlParts.push(`<ul>${listItems.map((line) => `<li>${applyInlineFormatting(line)}</li>`).join('')}</ul>`);
      listItems = [];
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (isListLine(line)) {
        flushParagraph();
        listItems.push(line.replace(/^(- |\* |• )/, ''));
      } else {
        flushList();
        paragraphLines.push(rawLine);
      }
    }

    flushParagraph();
    flushList();
  }

  return htmlParts.join('');
}
