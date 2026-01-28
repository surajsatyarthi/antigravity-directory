import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Basic in-memory rate limiter for Edge/Serverless environments.
 * For production with high traffic, use Redis.
 *
 * Default: 100 requests per 15 minutes per IP
 */
export async function checkRateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000
): Promise<RateLimitResult> {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();

  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: store[ip].resetTime,
    };
  }

  store[ip].count++;

  const remaining = Math.max(0, limit - store[ip].count);
  const success = store[ip].count <= limit;

  return {
    success,
    limit,
    remaining,
    reset: store[ip].resetTime,
  };
}
