# Gate 1: RFC (Request for Comments)

**Task ID**: #26  
**Task Name**: Username Stale Prop Fix (Mobile Menu)  
**Started**: 2026-02-02T02:12:00Z  
**Status**: IN PROGRESS

---

## Objective

Fix mobile menu showing stale username after route changes due to prop not updating from server component.

---

## Required Checklist

- [x] **Problem clearly defined**: What needs to be fixed/built?
- [x] **Solution approach documented**: How will we solve it?
- [x] **Alternatives considered**: What other approaches were evaluated?
- [ ] **User approval obtained**: Has the user approved this approach?

---

## Problem Statement

**Issue**: Mobile menu component (`MobileMenu.tsx`) receives `username` as a prop from `MarketplaceHeader` (server component). When routes change, the header re-renders with fresh data but the client component doesn't update because it caches the initial prop value.

**Current Implementation** (Line 31 of `MobileMenu.tsx`):
```typescript
const currentUsername = session?.user?.name || initialUsername;
```

**Problem**:
1. `MarketplaceHeader` fetches username from database (server-side)
2. Passes `username` prop to `MobileMenu` (client component)
3. `MobileMenu` uses `initialUsername` as fallback
4. On route change, `initialUsername` prop doesn't update (React prop caching)
5. Result: **Stale username** displayed in mobile menu

**Evidence**: Line 98 shows profile link uses `currentUsername`:
```typescript
href={currentUsername ? `/u/${currentUsername}` : '/settings'}
```

---

## Proposed Solution

**Approach**: Use `useSession()` hook properly to get real-time username updates.

**Fix**:
1. Stop relying on `initialUsername` prop (stale)
2. Use `session?.user?.name` (always fresh from hook)
3. Add username to NextAuth session callback (if not present)
4. Ensure `useSession()` provides username field

**Code Change** (Line 31):
```typescript
// BEFORE (WRONG)
const currentUsername = session?.user?.name || initialUsername;

// AFTER (CORRECT)
const currentUsername = session?.user?.name;
```

**Why This Works**:
- `useSession()` hook re-renders on session changes
- Hook fetches latest session data (not cached like props)
- Removes dependency on stale `initialUsername` prop

---

## Alternatives Considered

| Alternative | Pros | Cons | Reason Not Chosen |
|-------------|------|------|-------------------|
| **Option 1**: Force prop update with key | Forces re-render | Hacky, performance cost | Not addressing root cause |
| **Option 2**: Use React Context | Global state | Overkill for simple fix | `useSession()` already does this |
| **Option 3**: Client-side DB fetch | Always fresh | Extra network call | `useSession()` is optimized |
| **Option 4**: Remove username prop entirely | Simpler | May need auth.ts update | **CHOSEN** - Simplest fix |

---

## Technical Approach

### Step 1: Update `MobileMenu.tsx`
Remove dependency on `initialUsername` prop:

```typescript
// Line 31
const currentUsername = session?.user?.name;
```

### Step 2: Verify NextAuth Session
Ensure `auth.ts` session callback includes username/name:

```typescript
callbacks: {
  session({ session, user }) {
    if (session.user) {
      session.user.name = user.name; // Ensure name is included
    }
    return session;
  }
}
```

### Step 3: Test
- Sign in
- Navigate to different routes
- Verify mobile menu shows correct username
- Verify profile link works

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `session.user.name` is null | Broken profile link | Add fallback to '/settings' |
| `useSession()` not rehydrating | Still shows stale data | Verify NextAuth config |
| Breaking desktop menu | Inconsistent UX | Test both mobile + desktop |

---

## User Approval

- [ ] User has reviewed this RFC  
- [ ] User has approved moving forward

**Approval Date**: _______________  
**Approver**: _______________

---

## Sign-off

**Gate 1 Complete**: [ ]  
**Completed By**: _______________  
**Completion Date**: _______________
