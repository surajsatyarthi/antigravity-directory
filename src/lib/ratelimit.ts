import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface Options {
  limit: number;
  windowMs: number;
}

/**
 * Basic in-memory rate limiter for Edge/Serverless environments.
 * For production with high traffic, use Redis.
 */
export async function rateLimit(request: NextRequest, options: Options) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const windowMs = options.windowMs;
  const limit = options.limit;

  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return null;
  }

  store[ip].count++;

  if (store[ip].count > limit) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((store[ip].resetTime - now) / 1000).toString(),
        }
      }
    );
  }

  return null;
}
