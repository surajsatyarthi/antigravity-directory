/**
 * Input validation utilities for Phase 3 API routes
 * Prevents SQL injection, XSS, and invalid inputs
 */

import { FILTERS } from '@/constants';
import { FilterState } from '@/types/database';

export function validateFilterParams(searchParams: URLSearchParams): FilterState {
  console.log('[validateFilterParams] Raw params:', searchParams.toString());
  
  // Validate categories
  const categoriesParam = searchParams.get('categories');
  const categories = categoriesParam 
    ? categoriesParam.split(',').filter(Boolean).map(sanitizeSlug)
    : [];
  
  // Validate tags
  const tagsParam = searchParams.get('tags');
  const tags = tagsParam
    ? tagsParam.split(',').filter(Boolean).map(sanitizeSlug)
    : [];
  
  // Validate badges
  const badgesParam = searchParams.get('badges');
  const badgeTypes = badgesParam
    ? badgesParam.split(',').filter(Boolean).map(sanitizeSlug)
    : [];
  
  // Validate search query
  const search = sanitizeSearchQuery(searchParams.get('q') || '');
  
  // Validate sort option
  const sortParam = searchParams.get('sort') || FILTERS.DEFAULT_SORT;
  const sort = validateSortOption(sortParam);
  
  const result = {
    categories,
    tags,
    search,
    sort,
    badgeTypes,
  };

  console.log('[validateFilterParams] Validated result:', result);
  return result;
}

/**
 * Sanitize slug (category or tag)
 * Only allows lowercase letters, numbers, and hyphens
 */
function sanitizeSlug(slug: string): string {
  // Remove any characters that aren't lowercase letters, numbers, or hyphens
  const sanitized = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  // Limit length to prevent abuse
  return sanitized.slice(0, 100);
}

/**
 * Sanitize search query
 * Prevents XSS and limits length
 */
function sanitizeSearchQuery(query: string): string {
  // Trim whitespace
  let sanitized = query.trim();
  
  // Limit length
  if (sanitized.length > 200) {
    sanitized = sanitized.slice(0, 200);
  }
  
  // Remove any HTML tags (prevent XSS)
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // Remove SQL comment sequences
  sanitized = sanitized.replace(/--/g, '');
  sanitized = sanitized.replace(/\/\*/g, '');
  sanitized = sanitized.replace(/\*\//g, '');
  
  return sanitized;
}

/**
 * Validate sort option against whitelist
 */
function validateSortOption(sort: string): FilterState['sort'] {
  const validOptions = FILTERS.SORT_OPTIONS.map(opt => opt.value);
  
  if (validOptions.includes(sort as any)) {
    return sort as FilterState['sort'];
  }
  
  return FILTERS.DEFAULT_SORT;
}

/**
 * Validate pagination parameters
 */
export function validatePaginationParams(searchParams: URLSearchParams) {
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');
  
  // Parse and validate page number
  let page = parseInt(pageParam || '1', 10);
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (page > 1000) { // Prevent excessive pagination
    page = 1000;
  }
  
  // Parse and validate limit
  let limit = parseInt(limitParam || '30', 10);
  if (isNaN(limit) || limit < 1) {
    limit = 30;
  }
  if (limit > 100) { // Prevent excessive results per page
    limit = 100;
  }
  
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
}

/**
 * Validate request origin (CORS)
 * Only allow requests from same origin or whitelisted domains
 */
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  
  // Same-origin requests don't have Origin header
  if (!origin) {
    return true;
  }
  
  // Whitelist of allowed origins
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'https://googleantigravity.directory',
    'http://localhost:3000', // Development
  ];
  
  return allowedOrigins.includes(origin);
}

/**
 * Check if input contains potential SQL injection attempts
 * Returns true if suspicious patterns detected
 */
export function containsSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|TRUNCATE)\b)/i,
    /(UNION\s+SELECT)/i,
    /(;\s*DROP)/i,
    /(--)/,
    /(\bOR\b\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?)/i,
    /(\bOR\b\s+['"]?[^'"]+['"]?\s*=\s*['"]?[^'"]+['"]?)/i,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate and sanitize all inputs in one go
 * Throws error if validation fails
 */
export function validateAndSanitizeInputs(searchParams: URLSearchParams): {
  filters: FilterState;
  pagination: { page: number; limit: number; offset: number };
} {
  // Check for SQL injection attempts
  const allParams = Array.from(searchParams.entries())
    .map(([_, value]) => value)
    .join(' ');
  
  if (containsSQLInjection(allParams)) {
    throw new Error('Invalid input detected');
  }
  
  // Validate filters
  const filters = validateFilterParams(searchParams);
  
  // Validate pagination
  const pagination = validatePaginationParams(searchParams);
  
  return { filters, pagination };
}
