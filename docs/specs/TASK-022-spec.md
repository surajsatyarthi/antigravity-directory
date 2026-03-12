# TASK-022: Remove Auth + Public Submit Form
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-10
**Priority**: PRE-LAUNCH BLOCKER

---

## CONTEXT

Auth/login was built for a creator marketplace that no longer exists. Regular users have no reason to sign in. The SIGN IN button and bookmark button are broken promises. Admin manages submissions directly in Supabase. Submit form becomes public.

`submissions.userId` is `.notNull()` — requires DB migration to make nullable before auth check can be removed from submit action.

---

## MANDATORY CROSS-CHECK — RUN BEFORE TOUCHING ANY FILE

```bash
grep -n "SIGN IN\|handleSignIn\|handleSignOut" src/components/Header.tsx
grep -n "BookmarkButton" src/components/ResourceCard.tsx
grep -n "session?.user?.id" src/app/submit/actions.ts
grep -n "isDashboardPage\|isAdminPage" src/middleware.ts
```

All must return results. If any line missing — STOP and report to PM.

---

## PART 1 — DB MIGRATION: Make userId nullable on submissions

Run against Supabase DB:
```sql
ALTER TABLE submissions ALTER COLUMN user_id DROP NOT NULL;
```

Update `src/drizzle/schema.ts` — submissions table:
```
# BEFORE (PM verified line):
userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

# AFTER:
userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
```

---

## PART 2 — DELETE THESE FILES

PM verified: zero active consumers outside these files.

```bash
git rm src/components/BookmarkButton.tsx
git rm src/lib/actions/bookmark.ts
git rm src/app/auth/signin/page.tsx
git rm src/app/dashboard/page.tsx
git rm src/app/dashboard/actions.ts
git rm src/components/EdwardOutreachPanel.tsx
git rm src/components/ClaimButton.tsx
git rm src/components/ClaimModal.tsx
git rm src/components/FollowButton.tsx
git rm src/lib/actions/follow.ts
git rm src/lib/actions/profile.ts
```

---

## PART 3 — MODIFY: `src/components/Header.tsx`

PM VERIFIED (read 2026-03-10):
- Line 3: `import { Zap, User, LogOut } from 'lucide-react';`
- Lines 4–8: auth, db, users, eq, handleSignIn/handleSignOut imports
- Lines 14–20: session fetch + username DB query
- Line 52: `<NavLinks session={session} username={username} />`
- Lines 64–102: session conditional (avatar/signout vs signin)
- Line 107: `<MobileMenu session={session} />`

Changes:
1. Line 3 → `import { Zap } from 'lucide-react';`
2. Delete lines 4–8
3. Delete lines 14–20
4. Remove `async` from function signature
5. Line 52 → `<NavLinks />`
6. Delete lines 64–102. Right section keeps ONLY the SUBMIT button:
```tsx
<div className="flex items-center gap-4 pl-4 border-l border-white/[0.08] h-6">
  <Link href="/submit" className="flex items-center justify-center px-3 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] font-semibold tracking-wide rounded-md transition-all whitespace-nowrap">
    <Zap className="w-2.5 h-2.5 mr-1.5" />
    <span>SUBMIT</span>
  </Link>
</div>
```
7. Line 107 → `<MobileMenu />`

---

## PART 4 — MODIFY: `src/components/NavLinks.tsx`

Check first:
```bash
grep -n "session\|username" src/components/NavLinks.tsx | head -10
```
If session/username props exist — remove them from interface and any conditional rendering.

---

## PART 5 — MODIFY: `src/components/MobileMenu.tsx`

PM VERIFIED (read 2026-03-10):
- Line 6: `import { Menu, X, Zap, User, LogOut } from 'lucide-react';`
- Line 8: `import { handleSignIn, handleSignOut } from '@/lib/actions/auth';`
- Line 9: `import { useSession } from 'next-auth/react';`
- Line 10: `import { Session } from 'next-auth';`
- Lines 12–14: MobileMenuProps interface with session
- Lines 19–25: session/auth state logic
- Lines 115–146: auth conditional block

Changes:
1. Line 6 → `import { Menu, X } from 'lucide-react';`
2. Delete lines 8–10 (handleSignIn/handleSignOut, useSession, Session imports)
3. Delete MobileMenuProps interface
4. Change function signature → `export function MobileMenu()`
5. Delete lines 19–25
6. Delete lines 115–146 (entire auth block)

---

## PART 6 — MODIFY: `src/components/ResourceCard.tsx`

PM VERIFIED (read 2026-03-10):
- Line 3: `import { BookmarkButton } from './BookmarkButton';`
- Line 20: `isBookmarked?: boolean;`
- Lines 121–125: `<BookmarkButton ... />`

Changes:
1. Delete line 3
2. Delete line 20
3. Delete lines 121–125 (keep the ArrowRight circle div, remove only BookmarkButton)

---

## PART 7 — MODIFY: `src/app/submit/actions.ts`

PM VERIFIED (read 2026-03-10):
- Line 7: `import { auth } from '@/auth';`
- Lines 21–25: session check + unauthorized return
- Line 66: `userId: session.user.id,`
- Lines 70–103: payment verification block

Changes:
1. Delete line 7
2. Delete lines 21–25
3. Line 66 → `userId: null,`
4. Delete lines 70–103 (payment verification — marketplace remnant)

---

## PART 8 — MODIFY: `src/middleware.ts`

PM VERIFIED (read 2026-03-10):
- Line 9: `const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");`
- Lines 12–17: auth page redirect logic
- Lines 44–54: dashboard protection block

Changes:
1. Delete line 9
2. Delete lines 12–17
3. Delete lines 44–54
4. Keep admin route protection (lines 20–42)

---

## PART 9 — BUILD + LINT

```bash
npm run build
npm run lint
```
Both exit 0.

---

## PART 10 — HTTP CHECK

```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/submit
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/mcp-servers
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/auth/signin
```
Expected: 200, 200, 200, 404

---

## PART 11 — SCREENSHOTS

- `temp/task022_homepage.png` — header, no SIGN IN
- `temp/task022_resource_card.png` — card, no bookmark button
- `temp/task022_submit.png` — submit form loads without auth
- `temp/task022_mobile_menu.png` — mobile menu, no sign in option

---

## PART 12 — COMMIT

```bash
git add src/components/Header.tsx src/components/MobileMenu.tsx src/components/ResourceCard.tsx src/app/submit/actions.ts src/middleware.ts src/drizzle/schema.ts
git commit -m "feat(cleanup): remove auth from user-facing UI — no signin, no bookmarks, public submit form"
git log --oneline -1
```

---

## DO NOT DELETE
- `src/auth.ts` — needed for admin route protection
- `src/lib/actions/auth.ts` — referenced by auth.ts
- `/admin/*` pages

## DO NOT COMMIT temp/ screenshots
