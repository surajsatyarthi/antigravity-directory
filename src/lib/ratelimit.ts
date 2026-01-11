/**
 * Rate limiting for Phase 3 API routes
 * Prevents DoS attacks and abuse
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
// For development, we'll use in-memory rate limiting
// For production, configure Upstash Redis
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : undefined;

/**
 * Rate limiter for API routes
 * Allows 10 requests per 10 seconds per IP
 */
export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  : {
      // Mock rate limiter for development (always allows)
      limit: async () => ({ success: true, limit: 10, remaining: 10, reset: Date.now() }),
    };

/**
 * Get client identifier from request
 * Uses IP address or falls back to 'anonymous'
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (depending on hosting)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'anonymous';
  
  return ip.trim();
}

/**
 * Check rate limit for a request
 * Returns { success: boolean, limit, remaining, reset }
 */
export async function checkRateLimit(request: Request) {
  const identifier = getClientIdentifier(request);
  return await ratelimit.limit(identifier);
}
