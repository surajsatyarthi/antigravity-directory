import { describe, it, expect } from 'vitest';
import { safeJsonLd, safeJsonLdString } from '@/lib/utils/safeJsonLd';

describe('safeJsonLd', () => {
  it('should sanitize basic objects', () => {
    const obj = { name: 'Test', url: 'https://example.com' };
    const result = safeJsonLd(obj);
    expect(result).toBe('{"name":"Test","url":"https://example.com"}');
  });

  it('should escape < and > characters to prevent XSS', () => {
    const obj = {
      name: '</script><script>alert("XSS")</script>',
      description: '<img src=x onerror=alert(1)>',
    };
    const result = safeJsonLd(obj);
    
    // Should escape < and > with unicode
    expect(result).toContain('\\u003c/script\\u003e');
    expect(result).toContain('\\u003cscript\\u003e');
    expect(result).toContain('\\u003cimg');
    expect(result).not.toContain('</script>');
    expect(result).not.toContain('<script>');
  });

  it('should handle null objects', () => {
    const result = safeJsonLd(null);
    expect(result).toBe('{}');
  });

  it('should handle undefined objects', () => {
    const result = safeJsonLd(undefined);
    expect(result).toBe('{}');
  });

  it('should sanitize nested objects', () => {
    const obj = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Company</script>><script>alert(1)</script>',
      address: {
        streetAddress: '<script>malicious</script>',
      },
    };
    const result = safeJsonLd(obj);
    
    expect(result).not.toContain('</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('\\u003cscript\\u003e');
  });

  it('should sanitize arrays', () => {
    const obj = {
      items: ['<script>test</script>', 'normal', '</script>'],
    };
    const result = safeJsonLd(obj);
    
    expect(result).not.toContain('<script>');
    expect(result).toContain('\\u003cscript\\u003e');
  });

  it('should preserve valid JSON structure', () => {
    const obj = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Antigravity?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An AI-powered IDE',
          },
        },
      ],
    };
    const result = safeJsonLd(obj);
    const parsed = JSON.parse(result);
    
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('FAQPage');
    expect(parsed.mainEntity).toHaveLength(1);
  });
});

describe('safeJsonLdString', () => {
  it('should escape < and > in strings', () => {
    const dirty = '</script><script>alert("XSS")</script>';
    const result = safeJsonLdString(dirty);
    
    expect(result).toBe('\\u003c/script\\u003e\\u003cscript\\u003ealert("XSS")\\u003c/script\\u003e');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it('should handle empty strings', () => {
    const result = safeJsonLdString('');
    expect(result).toBe('');
  });

  it('should handle null', () => {
    const result = safeJsonLdString(null as any);
    expect(result).toBe('');
  });

  it('should preserve safe strings', () => {
    const safe = 'This is a safe string with no HTML';
    const result = safeJsonLdString(safe);
    expect(result).toBe(safe);
  });
});
