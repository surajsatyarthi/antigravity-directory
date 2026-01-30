# Phase 1: Assessment Report (P1-5 Live Intelligence Badge)

**Issue**: P1-5 Implementation of "Live Intelligence" Metadata Badge
**Gate**: Gate 1 (Physical Audit) & Gate 2 (Logic Mapping)
**Date**: 2026-01-30
**Auditor**: Antigravity Agent

## 1. Physical Audit (Current State)

### Files Analyzed

- **`src/components/BadgeGenerator.tsx`**: Currently hardcodes the embed code with a static `alt` tag and points to `/api/badges/[slug]`. The preview is static.
- **`src/app/api/badges/[slug]/route.ts`**: Returns a static SVG with "Featured on Antigravity". No dynamic metrics.
- **`src/components/ResourceCard.tsx`**: Displays internal badges (Editor's Choice, etc.) but is separate from the external embeddable badge.

### Findings

- The current badge system is **static**.
- The API route returns a cached SVG (86400s = 24h cache) with no dynamic data.
- `BadgeGenerator` preview is a hardcoded UI visual, not the actual SVG via `img` tag (it simulates it).

## 2. Logic Mapping

### Dependencies

- **Database**: `resources` table (needs `views`, `avgRating` columns).
- **API**: `/api/badges/[slug]` is consumed by external websites via `<img>` tags.
- **Frontend**: `BadgeGenerator` component is the user interface for copying the code.

### Constraints / Risks

- **Performance**: Fetching DB stats on every badge load (on external sites) could crush the DB.
  - **Mitigation**: Strict `Cache-Control` (e.g., `s-maxage=3600` for 1 hour).
- **SVG Complexity**: Text width calculation in SVG is hard without JS.
  - **Mitigation**: Use a fixed-width design or simple monospace font alignment (as currently used).
- **Security**: The API route is public. RLS policies on `resources` (created in Batch 1.0) allow public read, so this is safe.

## 3. External Research

- **Shields.io**: Standard for dynamic badges. Uses caching heavily.
- **ProductHunt Embeds**: Updates vote count in near real-time (cached).

## 4. Conclusion

The codebase is ready for this change. The `api/badges/[slug]` route is the single point of truth to modify.

**Approval to Proceed**: YES
