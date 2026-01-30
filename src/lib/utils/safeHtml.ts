import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a window/document context for server-side sanitization if needed
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

/**
 * Sanitizes HTML to prevent XSS attacks
 * @param dirty - Untrusted HTML string
 * @returns Sanitized HTML safe for rendering
 */
export function safeHtml(dirty: string): string {
  if (typeof dirty !== 'string') return '';
  return purify.sanitize(dirty, {
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
  return purify.sanitize(dirty, {
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

/**
 * Sanitizes string for JSON-LD usage to prevent script injection
 * specifically escaping closing script tags
 */
export function safeJsonLdString(dirty: string): string {
  if (!dirty) return '';
  // Encodes < and > to prevent </script> attacks
  return dirty.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
