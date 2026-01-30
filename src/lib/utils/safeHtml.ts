import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML to prevent XSS attacks
 * @param dirty - Untrusted HTML string
 * @returns Sanitized HTML safe for rendering
 */
export function safeHtml(dirty: string): string {
  if (typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'a',
      'ul', 'ol', 'li', 'code', 'pre', 'blockquote',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOWED_URI_REGEXP: /^https?:\/\//,
  });
}

/**
 * Sanitizes HTML for markdown content (more permissive)
 */
export function safeMarkdownHtml(dirty: string): string {
  if (typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'a',
      'ul', 'ol', 'li', 'code', 'pre', 'blockquote',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'title'],
    ALLOWED_URI_REGEXP: /^(https?:\/\/|\/|#)/,
  });
}

// NOTE: safeJsonLdString has been moved to safeJsonLd.ts 
// to allow usage in Client Components without pulling in jsdom.
