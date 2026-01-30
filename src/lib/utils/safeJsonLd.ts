/**
 * Sanitizes an object for JSON-LD usage to prevent script injection.
 * Escapes < and > to prevent </script> attacks.
 */
export function safeJsonLd(obj: any): string {
  if (!obj) return '{}';
  const json = JSON.stringify(obj);
  // Encodes < and > to prevent </script> attacks
  return json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
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
