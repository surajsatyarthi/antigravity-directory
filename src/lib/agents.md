# Backend Rulebook & Memory (src/lib)

This file serves as the long-term memory for anyone editing backend logic in `src/lib`.

## Sorting Engine: Diversity & Authority

- **Primary Rule**: Use a Weighted Score for homepage sorting to ensure a mix of badges.
- **Weights**:
  - Editor's Choice: +10,000
  - Trending: +6,000
  - User's Choice: +4,000
  - Featured: +2,000
- **The Engine**: Always add `${resources.views}` to the weight. This allows organic listings with high traffic to compete with secondary badge types (Trending/User's Choice) for top-fold visibility.
- **Order**: Always use `desc(sql_weighted_score)` followed by `desc(publishedAt)` as a secondary tie-breaker.

## Historical Fixes

- **[2026-01-12]**: Implemented the "Diversity Engine" refactor to prevent "Editor's Choice" from monopolizing the homepage grid.
