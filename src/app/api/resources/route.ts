/**
 * API Route: GET /api/resources
 * Returns filtered and sorted resources
 * 
 * Query params:
 * - categories: comma-separated category slugs
 * - tags: comma-separated tag slugs
 * - q: search query
 * - sort: sort option (latest, views, rating, recommended)
 * - page: page number (default: 1)
 * - limit: items per page (default: 30, max: 100)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFilteredResources } from '@/lib/queries';
import { validateAndSanitizeInputs, validateOrigin } from '@/lib/validation';
import { checkRateLimit } from '@/lib/ratelimit';

export async function GET(request: NextRequest) {
  try {
    // 1. Validate origin (CORS)
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // 2. Check rate limit
    const { success, limit, remaining, reset } = await checkRateLimit(request);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many requests',
          limit,
          remaining,
          reset: new Date(reset).toISOString(),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }
    
    // 3. Validate and sanitize inputs
    const { searchParams } = new URL(request.url);
    const { filters, pagination } = validateAndSanitizeInputs(searchParams);
    
    // 4. Query database with validated inputs (Limit/Offset handled in getFilteredResources)
    const { resources: filteredResources, totalCount } = await getFilteredResources(filters, pagination.page, pagination.limit);
    
    // 5. Return response with metadata
    return NextResponse.json({
      data: filteredResources,
      meta: {
        total: totalCount,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(totalCount / pagination.limit),
      },
    }, {
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      
      if (message.includes('invalid input') || message.includes('sanitize')) {
        return NextResponse.json(
          { error: 'Invalid search parameters provided', code: 'INVALID_INPUT' },
          { status: 400 }
        );
      }
      
      // Database connection errors
      if (message.includes('econnrefused') || message.includes('failed to connect') || message.includes('postgreserror')) {
        return NextResponse.json(
          { error: 'Database service is temporarily unavailable', code: 'DB_OFFLINE' },
          { status: 503 }
        );
      }
    }
    
    // Generic error response
    return NextResponse.json(
      { error: 'An unexpected server error occurred', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
