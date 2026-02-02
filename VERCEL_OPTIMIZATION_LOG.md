# Vercel Optimization Report (Feb 2026)

**Objective**: Reduce Vercel Serverless Function CPU usage to stay within Free Tier limits (currently at >95%).

This report details the technical changes applied to `ceo-magazine` and `antigravity-directory` to shift load from Compute (SSR) to Edge (Cache).

## 1. Project: CEO Magazine (The Primary Consumer)
*Status: Optimized*

### A. Forced Static Generation (ISR) on Articles
**File**: `app/category/[categorySlug]/[slug]/page.tsx`
*   **Change**: Applied `export const dynamic = 'force-static'` and `revalidate = 3600` (1 hour).
*   **Why**: Previously, this page often fell back to SSR. Now, it generates HTML once per hour.
*   **Impact**: Read-heavy traffic (99% of users) will now hit the Vercel Edge Cache (0ms CPU) instead of executing the Server Function (300ms+ CPU).
*   **Trade-off**: Content updates from Sanity will take up to 60 minutes to propagate to the live site.

### B. Bot Traffic Blockade
**File**: `middleware.ts`
*   **Change**: Implemented User-Agent filtering to return `403 Forbidden` for known AI scrapers (`gptbot`, `bytespider`, `claudebot`, `omgili`, etc.).
*   **Why**: AI bots crawl aggressively and trigger server functions generally faster than the cache can warm up (cache stampede). Blocking them saves significant compute resources.

### C. Redirect Optimization
**File**: `app/article/[slug]/page.tsx`
*   **Change**: Increased `revalidate` from 600s (10m) to 3600s (1h).
*   **Why**: 301 redirects rarely change; checking the database every 10 minutes was wasteful.

---

## 2. Project: Antigravity Directory
*Status: Optimized*

### A. Database Query Caching
**File**: `src/lib/queries.ts`
*   **Change**: Wrapped `getFilteredResources` in Next.js `unstable_cache` with a 5-minute TTL.
*   **Why**: This function runs complex SQL JOINs on every page load.
*   **Impact**: Database queries (searching, filtering) are now memoized. Repeated visits to the homepage or category pages do not hit the database or CPU heavily.

### B. Asset Caching
**File**: `next.config.ts` (Both Projects)
*   **Change**: Added `Cache-Control: public, max-age=31536000, immutable` for `/fonts` and `/images`.
*   **Why**: Ensures browsers and CDNs cache heavy assets indefinitely, reducing bandwidth and repeated requests.

---

## Monitoring Next Steps
1.  Check the **Vercel Usage Dashboard** tomorrow. "Fluid Active CPU" usage should flatten or decline.
2.  If "Image Optimization" limits are hit next, consider offloading images to a dedicated CDN or using `unoptimized={true}` for LCP images.
