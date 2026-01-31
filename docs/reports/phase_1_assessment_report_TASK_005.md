# Phase 1: Assessment Report - Task 5 (Search Hydration)

**Task:** Search Input Hydration Fix (CLS Risk)
**Rank:** 5
**Date:** 2026-02-01
**Auditor:** Antigravity Agent

---

## 1. Physical Audit (Gate 1)

**File:** `src/components/SearchInput.tsx`

**Current State:**
```tsx
  const searchParams = useSearchParams();
  // ...
  const [query, setQuery] = useState(''); // <-- Initializes empty
  // ...
  useEffect(() => {
    // Syncs from URL after mount
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams]);
```

**Observations:**
1.  **Late Binding:** The input is initially empty (`''`), then snaps to the search term (`'foo'`) after hydration.
2.  **Suspense:** `MarketplaceHeader.tsx` wraps this component in `<Suspense>`.
3.  **CLS/Flash:** The user sees the skeleton -> empty input -> filled input. This visual jump is the "CLS Risk".

## 2. Logic Mapping (Gate 2)

**Dependencies:**
- `next/navigation`: `useSearchParams`, `useRouter`.
- `lucide-react`: `Search` icon.

**Problem:**
We want the input to be pre-filled with the URL query *immediately* upon visibility, avoiding the empty flash.

**Research Items:**
1.  Can we initialize state directly? `useState(searchParams.get('q') || '')`
    - *Risk:* Hydration mismatch if server renders static shell?
    - *Mitigation:* We are inside `<Suspense>`, so maybe client-only rendering is guaranteed?
    - *Check:* Next.js `useSearchParams` behavior.

2.  **Alternatives Considered (For RPC v4.0):**
    A. **Uncontrolled Input:** Use `defaultValue={searchParams.get('q')}`.
    B. **Direct Initialization:** `useState(initialQuery)`.
    C. **Server Prop:** Pass `q` from server component to client component prop.

## 3. Conclusion
The current implementation sacrifices UX (flash) for safety. We need a solution that provides both safe hydration AND immediate data availability.
