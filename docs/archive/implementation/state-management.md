# State Management Flow Documentation

## Overview

This document defines how state flows between Phase 2 (Components), Phase 3 (Server-Side Filtering), and Phase 4 (localStorage) to prevent synchronization bugs.

---

## Single Source of Truth: URL Params

**Rule:** URL search params are the **single source of truth** for filter state.

**Why:**

- Shareable (users can bookmark filtered views)
- Server-side rendering compatible
- Browser back/forward works correctly
- No state synchronization issues

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Action                          │
│              (clicks filter checkbox)                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Phase 2: Component                         │
│  - Updates URL params via router.push()                 │
│  - Does NOT update local state                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              URL Params Updated                         │
│  Example: /?categories=prompts,rules&q=nextjs          │
└─────┬──────────────────────────────────────────┬────────┘
      │                                           │
      ▼                                           ▼
┌──────────────────────┐              ┌──────────────────────┐
│  Phase 4: localStorage│              │  Phase 3: Server API │
│  - Reads URL params   │              │  - Reads URL params  │
│  - Saves to storage   │              │  - Queries database  │
│  - For persistence    │              │  - Returns results   │
└──────────────────────┘              └──────────┬───────────┘
                                                 │
                                                 ▼
                                      ┌──────────────────────┐
                                      │  Phase 2: Component  │
                                      │  - Re-renders with   │
                                      │    new results       │
                                      └──────────────────────┘
```

---

## Implementation Details

### Phase 2: Components (Read from URL, Write to URL)

```typescript
// ✅ CORRECT: Read from URL params
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export function FilterSidebar({ categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read current state from URL
  const selectedCategories = searchParams.get('categories')?.split(',') || [];

  // Update URL when filter changes
  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);

    // Toggle category
    const current = params.get('categories')?.split(',') || [];
    const updated = current.includes(categorySlug)
      ? current.filter(c => c !== categorySlug)
      : [...current, categorySlug];

    // Update URL
    if (updated.length > 0) {
      params.set('categories', updated.join(','));
    } else {
      params.delete('categories');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {categories.map(cat => (
        <input
          key={cat.slug}
          type="checkbox"
          checked={selectedCategories.includes(cat.slug)}
          onChange={() => handleCategoryChange(cat.slug)}
        />
      ))}
    </div>
  );
}
```

```typescript
// ❌ WRONG: Don't use local state for filters
const [selectedCategories, setSelectedCategories] = useState([]);
// This creates dual state (component + URL) = bugs
```

---

### Phase 3: Server-Side Filtering (Read from URL)

```typescript
// app/page.tsx (Server Component)

export default async function HomePage({ searchParams }: Props) {
  // Read filters from URL params
  const categories = searchParams.categories?.split(',') || [];
  const tags = searchParams.tags?.split(',') || [];
  const search = searchParams.q || '';
  const sort = searchParams.sort || 'recommended';

  // Query database with filters
  const resources = await db
    .select()
    .from(resourcesTable)
    .where(
      and(
        categories.length > 0
          ? inArray(resourcesTable.categoryId, categories)
          : undefined,
        search
          ? or(
              ilike(resourcesTable.title, `%${search}%`),
              ilike(resourcesTable.description, `%${search}%`)
            )
          : undefined
      )
    );

  return <HomePage resources={resources} />;
}
```

---

### Phase 4: localStorage Persistence (Sync URL ↔ localStorage)

```typescript
// hooks/useFilterPersistence.ts

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FILTERS } from '@/constants';

export function useFilterPersistence() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // On mount: Restore from localStorage if URL is empty
  useEffect(() => {
    const hasUrlParams = searchParams.toString().length > 0;

    if (!hasUrlParams) {
      try {
        const saved = localStorage.getItem(FILTERS.STORAGE_KEY);
        if (saved) {
          const filters = JSON.parse(saved);

          // Validate saved filters (remove deleted categories)
          const validCategories = validateCategories(filters.categories);

          // Restore to URL
          const params = new URLSearchParams();
          if (validCategories.length > 0) {
            params.set('categories', validCategories.join(','));
          }
          if (filters.search) {
            params.set('q', filters.search);
          }

          router.push(`?${params.toString()}`);
        }
      } catch (error) {
        console.error('Failed to restore filters:', error);
      }
    }
  }, []);

  // On URL change: Save to localStorage
  useEffect(() => {
    const filters = {
      categories: searchParams.get('categories')?.split(',') || [],
      tags: searchParams.get('tags')?.split(',') || [],
      search: searchParams.get('q') || '',
      sort: searchParams.get('sort') || 'recommended',
    };

    try {
      localStorage.setItem(FILTERS.STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        // Clear old data and retry
        localStorage.clear();
        localStorage.setItem(FILTERS.STORAGE_KEY, JSON.stringify(filters));
      }
    }
  }, [searchParams]);
}
```

---

## Priority Order

When multiple sources have filter data:

1. **URL params** (highest priority)
   - User explicitly navigated to this URL
   - Takes precedence over everything

2. **localStorage** (medium priority)
   - Restore only if URL is empty
   - Validate before restoring

3. **Default filter** (lowest priority)
   - Category with most entries
   - Only if URL and localStorage are empty

---

## Edge Cases

### Case 1: User shares URL with filters

```
User A: /?categories=prompts
User B clicks link → Should see prompts filter (URL wins)
User B's localStorage has 'rules' → Ignored (URL wins)
```

### Case 2: User refreshes page

```
URL: /?categories=prompts
localStorage: { categories: ['rules'] }
Result: Shows prompts (URL wins)
localStorage updated to: { categories: ['prompts'] }
```

### Case 3: User navigates back

```
User on: /?categories=rules
User clicks filter → /?categories=prompts
User clicks back → /?categories=rules
Result: Shows rules (URL history preserved)
```

### Case 4: localStorage has deleted category

```
localStorage: { categories: ['deleted-category', 'prompts'] }
URL: empty
Result: Validate → only restore 'prompts'
Invalid categories silently removed
```

---

## Testing Strategy

### Unit Tests

```typescript
describe('FilterSidebar', () => {
  it('reads selected categories from URL params', () => {
    const searchParams = new URLSearchParams('categories=prompts,rules');
    render(<FilterSidebar />, { searchParams });

    expect(screen.getByLabelText('Prompts')).toBeChecked();
    expect(screen.getByLabelText('Rules')).toBeChecked();
  });

  it('updates URL when filter changes', async () => {
    const { router } = render(<FilterSidebar />);

    await userEvent.click(screen.getByLabelText('Prompts'));

    expect(router.push).toHaveBeenCalledWith('?categories=prompts');
  });
});
```

### Integration Tests

```typescript
describe('Filter persistence', () => {
  it('URL params override localStorage', () => {
    localStorage.setItem('antigravity_filters', JSON.stringify({
      categories: ['prompts']
    }));

    render(<HomePage searchParams={{ categories: 'rules' }} />);

    // Should show rules (URL), not prompts (localStorage)
    expect(screen.getByLabelText('Rules')).toBeChecked();
  });
});
```

---

## Summary

**DO:**

- ✅ Read filter state from URL params
- ✅ Update URL params when filters change
- ✅ Sync URL → localStorage for persistence
- ✅ Validate localStorage before restoring

**DON'T:**

- ❌ Use component state for filters
- ❌ Let localStorage override URL params
- ❌ Assume localStorage data is valid
- ❌ Create multiple sources of truth
