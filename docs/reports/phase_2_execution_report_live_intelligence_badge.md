# Phase 2 Execution Report: Live Intelligence Badge

**Issue**: P1-5 Implement Live Intelligence Metadata Badge
**Date**: 2026-01-30
**Gate**: Gate 3 (Blueprint)
**Status**: Planning
**Ralph Protocol**: Strict Adherence

---

## Executive Summary

To drive higher click-through rates and establish trust, we will upgrade the static "Featured on Antigravity" badge to a "Live Intelligence" badge that displays real-time metrics (Views/Rating). This leverages our existing data to provide value to creators and users.

---

## Gate 3: Blueprint & User Approval

### Problem Statement

**Static Trust Signal**: The current badge is a static SVG saying "Featured on Antigravity". It does not communicate the popularity or quality of the tool, missing an opportunity to leverage social proof.

### Implementation Decision

**Component 1**: Dynamic Badge API (`/api/badges/[slug]`)

- **Change**: Fetch `views` and `avgRating` from database using Drizzle.
- **Output**: SVG with metrics row (e.g., "👁️ 1.2k • ★ 4.8").
- **Caching**: `s-maxage=300` (5 mins) to balance fresh data with DB load.

**Component 2**: Badge Generator Preview (`BadgeGenerator.tsx`)

- **Change**: Update the preview visual to match the new SVG design.
- **UX**: Show creators exactly what their live badge will look like.

### Design Rationale

**Why SVG?**:

- Zero-dependency embed for creators (`<img src="...">`).
- Works on GitHub READMEs, Notion, and all websites.
- No JavaScript required on host site.

**Why 5-minute Cache?**:

- "Live" feel without killing the database.
- Prevents abuse (DoS) via badge embeds on high-traffic external sites.

### Technical Architecture

**API Route**: `src/app/api/badges/[slug]/route.ts`

```typescript
// Pseudo-code
const resource = await db.query.resources.findFirst({
  where: eq(slug, params.slug),
  columns: { title: true, views: true, avgRating: true }
});

const svg = renderSvg({
  title: "Antigravity",
  stats: \`\${formatCompact(resource.views)} views • \${resource.avgRating.toFixed(1)} ★\`
});

return new NextResponse(svg, {
  headers: { 'Cache-Control': 'public, s-maxage=300' }
});
```

### Risk Analysis

1.  **Database Load**:
    - **Risk**: High. If a badge is embedded on a popular site (e.g., Vercel.com), it could spike DB and serverless function usage.
    - **Mitigation**: Edge Caching (`s-maxage`). If load becomes critical, we will switch to a statically generated badge updated via cron (Batch job).

2.  **SVG Layout Breaking**:
    - **Risk**: Medium. Long titles or large numbers could overflow.
    - **Mitigation**: Truncate title and use fixed character widths.

---

## Gate 3 Checklist

- [x] Problem clearly defined (static badge lacks social proof)
- [x] Solution approach documented (Dynamic SVG API)
- [x] Risks analyzed (DB load, layout)
- [x] Technical architecture planned (Drizzle query + SVG render)
- [ ] User approval obtained (Pending)

---

## Verification Plan

### Automated Verification

1.  **Cache Header Check**: `curl -I` to verify `max-age=300`.
2.  **Content Check**: `curl` payload to verify view count is present in SVG text.

### Manual Verification

1.  **Visual Audit**: Check `BadgeGenerator` preview.
2.  **External Test**: Embed badge in a dummy HTML file.

---

**Documented By**: Antigravity Agent
**Ralph Protocol Status**: Pending Approval
