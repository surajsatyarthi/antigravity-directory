# CURRENT TASK — TASK-034: Social Sharing Bar + SponsorBadge Text Fix
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-11
**Priority**: HIGH — social sharing drives organic traffic + virality. Each resource share = a backlink signal.

---

## CONTEXT

Add a social sharing bar to every resource detail page (`/t/[slug]`).
Also fix the "SPONSORED BY" text colour in `SponsorBadge.tsx` — currently `text-gray-500` (too dim on dark bg).

Channels: **WhatsApp, X (Twitter), Facebook, Email, Copy Link**.

---

## FILES TO CHANGE — 3 FILES ONLY

1. `src/components/ShareBar.tsx` — CREATE NEW
2. `src/app/t/[slug]/page.tsx` — add import + render ShareBar
3. `src/components/SponsorBadge.tsx` — fix one class: `text-gray-500` → `text-gray-400`

**DO NOT touch any other file.**

---

## MANDATORY CROSS-CHECK BEFORE TOUCHING ANYTHING

```bash
grep -n "ShareBar" src/app/t/\[slug\]/page.tsx
grep -rn "ShareBar" src/components/
grep -n "text-gray-500" src/components/SponsorBadge.tsx
```

Expected readings:
- `ShareBar` grep: zero results in both (component does not exist yet) — confirmed by PM
- `SponsorBadge.tsx`: line 26 has `text-gray-500` on the "Sponsored by" span — confirmed by PM reading the file

If readings differ — STOP and report to PM.

---

## PM VERIFIED CONTENT

### `src/app/t/[slug]/page.tsx` (PM read full file)

Current imports end at line 12:
```typescript
import { CopyButton } from '@/components/CopyButton';
```
ShareBar import goes on line 13, immediately after:
```typescript
import { ShareBar } from '@/components/ShareBar';
```

ShareBar renders between the Tags block and BadgeGenerator. PM verified:
- Line 277–288: Tags block — closes with `</div>` after the tags map
- Line 291: `<BadgeGenerator slug={resource.slug} title={resource.title} />`
- ShareBar inserts between line 288 and line 291

The resource data available at render time:
- `resource.title` — string, the resource title
- `resource.slug` — string, used to build the canonical URL: `https://googleantigravity.directory/t/${resource.slug}`

### `src/components/SponsorBadge.tsx` (PM read full file)

Line 26 exact content:
```typescript
<span className="text-[9px] font-mono text-gray-500 mb-1.5 uppercase tracking-widest">Sponsored by</span>
```
Fix: `text-gray-500` → `text-gray-400`. One word change. Nothing else.

---

## PART 1 — CREATE `src/components/ShareBar.tsx`

Create new file. Full implementation:

```typescript
'use client';

import { useState } from 'react';
import { Link } from 'lucide-react';

interface ShareBarProps {
  url: string;
  title: string;
}

export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mb-12 flex flex-wrap items-center gap-3">
      <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mr-2">
        Share
      </span>

      {shares.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-none"
        >
          {label}
        </a>
      ))}

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-all rounded-none"
      >
        <Link className="w-3 h-3" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
```

---

## PART 2 — EDIT `src/app/t/[slug]/page.tsx`

**Change 1 — add import on line 13** (after the CopyButton import):

Old:
```typescript
import { CopyButton } from '@/components/CopyButton';
```

New:
```typescript
import { CopyButton } from '@/components/CopyButton';
import { ShareBar } from '@/components/ShareBar';
```

**Change 2 — insert ShareBar between Tags block and BadgeGenerator:**

Old (lines 288–295):
```typescript
            )}


            {/* Badge Flywheel Section */}
            <BadgeGenerator
              slug={resource.slug}
              title={resource.title}
            />
```

New:
```typescript
            )}

            {/* Social Sharing */}
            <ShareBar
              url={`https://googleantigravity.directory/t/${resource.slug}`}
              title={resource.title}
            />

            {/* Badge Flywheel Section */}
            <BadgeGenerator
              slug={resource.slug}
              title={resource.title}
            />
```

No other changes to this file.

---

## PART 3 — EDIT `src/components/SponsorBadge.tsx`

Line 26 only. Change one class:

Old:
```typescript
      <span className="text-[9px] font-mono text-gray-500 mb-1.5 uppercase tracking-widest">Sponsored by</span>
```

New:
```typescript
      <span className="text-[9px] font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Sponsored by</span>
```

Nothing else changes in this file.

---

## PART 4 — BUILD + COMMIT + DEPLOY

```bash
npm run build
```

Must exit 0.

```bash
git add src/components/ShareBar.tsx src/app/t/\[slug\]/page.tsx src/components/SponsorBadge.tsx
git commit -m "feat(sharing): add ShareBar to resource detail pages + fix SponsorBadge text colour"
git push origin main
```

Wait for Vercel GREEN.

---

## PART 5 — SCREENSHOTS

Using automated browser, navigate to any resource detail page (e.g. `https://googleantigravity.directory/t/github-mcp-server`) and take:

1. `temp/task034_sharebar.png` — full view of the ShareBar showing all 5 buttons
2. `temp/task034_copy_clicked.png` — after clicking "Copy Link", showing "Copied!" state
3. `temp/task034_sponsor_badge.png` — bottom-right SponsorBadge showing brighter "SPONSORED BY" text
4. `temp/task034_vercel_green.png` — Vercel deployment showing green

---

## DO NOT DO

- Do NOT add rounded-* classes — all buttons must be `rounded-none`
- Do NOT change anything else in `SponsorBadge.tsx` beyond the one class
- Do NOT change anything else in `t/[slug]/page.tsx` beyond the two changes above
- Do NOT commit with `git add -A` — stage only the 3 specified files

---

## MANDATORY REPORT FORMAT

```
TASK-034 REPORT
==============================

--- CROSS-CHECK ---
ShareBar grep (t/[slug]/page.tsx): [paste output]
ShareBar grep (components/): [paste output]
text-gray-500 grep (SponsorBadge.tsx): [paste output]

--- PART 1: ShareBar.tsx ---
File created: [YES/NO]
'use client' at line 1: [YES/NO]
rounded-none on all buttons: [YES/NO]
Copy Link shows "Copied!" state: [YES/NO]

--- PART 2: t/[slug]/page.tsx ---
ShareBar import added: [YES/NO]
ShareBar rendered between Tags and BadgeGenerator: [YES/NO]
Exact changed lines: [paste]

--- PART 3: SponsorBadge.tsx ---
text-gray-500 → text-gray-400 changed: [YES/NO]
Exact changed line: [paste]

--- PART 4: BUILD + DEPLOY ---
Build exit code: [0 / error]
Build output (last 5 lines): [paste]
Files staged: [paste — must be exactly 3 files]
Commit hash: [paste]
Vercel deploy: [GREEN / ERROR]

--- PART 5: SCREENSHOTS ---
task034_sharebar.png: [YES/NO]
task034_copy_clicked.png: [YES/NO]
task034_sponsor_badge.png: [YES/NO]
task034_vercel_green.png: [YES/NO]

--- BUGS SPOTTED (do not fix, report only) ---
1.
```
