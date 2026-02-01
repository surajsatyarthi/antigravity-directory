# Gate 2: Deep Research

**Task ID**: #26  
**Task Name**: Username Stale Prop Fix (Mobile Menu)  
**Started**: 2026-02-02T02:13:30Z  
**Status**: IN PROGRESS

---

## Objective

Deep dive into codebase to understand session management and username propagation.

---

## Required Checklist

- [x] **Codebase analyzed**: Relevant files and modules identified
- [x] **Dependencies identified**: All external dependencies documented
- [x] **Edge cases documented**: Boundary conditions and error scenarios listed
- [x] **Technical constraints noted**: Platform limitations, performance considerations

---

## Codebase Analysis

### Files Affected

| File | Purpose | Changes Needed |
|------|---------|----------------|
| `src/components/MobileMenu.tsx` | Mobile menu component | Remove `initialUsername` dependency (Line 31) |
| `src/auth.ts` | NextAuth configuration | Add `username` to session callback (Line 21-28) |
| `src/components/MarketplaceHeader.tsx` | Server component fetching username | Potentially remove username prop pass |

### Current Data Flow

```
1. MarketplaceHeader (server) → auth() → session
2. MarketplaceHeader → db.select() → username (from DB)
3. MarketplaceHeader → <MobileMenu username={username} />
4. MobileMenu (client) → useSession() → session (different instance!)
5. MobileMenu → initialUsername (STALE, from prop)
```

**Problem**: Two different session sources creating data mismatch.

---

## Dependencies

**Direct Dependencies**:
- `next-auth` v5.x (auth provider)
- `@auth/drizzle-adapter` (session storage)
- `next-auth/react` (useSession hook)

**Indirect Dependencies**:
- Drizzle ORM (database queries)
- Next.js Server Components (SSR)

**Key Finding**: `useSession()` hook fetches from `/api/auth/session` endpoint, NOT from server component props.

---

## Edge Cases

- [x] **Null username**: User signed in but no username set → Falls back to `/settings`
- [x] **Session loading**: `useSession()` returns undefined initially → Shows loading state
- [x] **Multiple tabs**: User updates username in one tab → Other tabs need to refresh
- [x] **Sign out**: Session becomes null → Mobile menu should hide profile link
- [x] **First-time users**: No username in DB → Should redirect to settings
- [ ] **Race condition**: Component renders before session loads → Handled by `useSession()` status

**Critical Edge Case**:
```typescript
// What if session.user.name is undefined?
const currentUsername = session?.user?.name; // Could be undefined!
```

**Mitigation**: Always provide fallback to `/settings` in href:
```typescript
href={currentUsername ? `/u/${currentUsername}` : '/settings'}
```

---

## Technical Constraints

### Performance
- **Load time targets**: No impact (removing prop dependency)
- **Bundle size limits**: No change (no new dependencies)
- **Memory constraints**: Slight improvement (one less prop)

### Compatibility
- **Browser support**: All (NextAuth supports all browsers)
- **Node version**: v18+ (current)
- **NextAuth version**: v5.x (beta but stable)

### Session Management

**Current NextAuth Session Callback** (`src/auth.ts` Line 21-28):
```typescript
async session({ session, user }) {
  if (session.user) {
    session.user.id = user.id;
    // @ts-ignore
    session.user.role = user.role || 'USER';
  }
  return session;
}
```

**Issue**: `username` NOT included in session!

**Options**:
1. **Add username to session callback** (RECOMMENDED)
2. Keep fetching from DB in server component (current, causes stale data)
3. Fetch in client component (extra network call)

---

## Root Cause Analysis

### Why Username is Stale

**Server Component** (`MarketplaceHeader`):
```typescript
const session = await auth(); // Server-side session
const user = await db.select({ username: users.username })
  .from(users)
  .where(eq(users.id, session.user.id))
  .limit(1);
const username = user?.username;

<MobileMenu session={session} username={username} />
```

**Client Component** (`MobileMenu`):
```typescript
const { data: session } = useSession(); // Client-side session (different!)
const currentUsername = session?.user?.name || initialUsername; // WRONG
```

**Problem**: `initialUsername` prop is from server render, but `useSession()` fetches fresh data from API. These are **two different session objects**.

---

## Proposed Fix Validation

### Option A: Add Username to Session Callback (BEST)

**Change `src/auth.ts`**:
```typescript
async session({ session, user }) {
  if (session.user) {
    session.user.id = user.id;
    session.user.name = user.name; // Username from DB
    // @ts-ignore  
    session.user.role = user.role || 'USER';
  }
  return session;
}
```

**Pros**:
- ✅ Session always has username
- ✅ No stale data
- ✅ Works across all components

**Cons**:
- ⚠️ Requires DB query on every session fetch (acceptable, already happening)

---

### Option B: Remove Username Prop Entirely

**Change `MobileMenu.tsx`**:
```typescript
// Remove prop from interface
interface MobileMenuProps {
  session: Session | null;
  // username: string | null | undefined; // DELETE
}

// Remove prop usage
export function MobileMenu({ session: initialSession }: MobileMenuProps) {
  const { data: session } = useSession();
  const currentUsername = session?.user?.name; // ONLY from session
}
```

**Change `MarketplaceHeader.tsx`**:
```typescript
<MobileMenu session={session} /> // Remove username prop
```

**Pros**:
- ✅ Simpler interface
- ✅ Single source of truth (session)

**Cons**:
- ⚠️ Requires session callback to include username (Option A)

---

## Findings Summary

1. **Root Cause**: Client component uses `useSession()` (API call) but falls back to stale `initialUsername` prop from server component
2. **Solution**: Remove prop dependency, ensure session includes username
3. **Implementation**: Two-file change (auth.ts + MobileMenu.tsx)
4. **Risk**: Minimal (session callback already exists, just adding field)

---

## Sign-off

- [x] All relevant code reviewed
- [x] Dependencies documented
- [x] Edge cases identified
- [ ] Gate 2 complete

**Completed By**: Antigravity AI  
**Completion Date**: 2026-02-02T02:15:00Z
