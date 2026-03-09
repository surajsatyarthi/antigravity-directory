# CURRENT TASK — TASK-016: Dark Mode Fix — Cards + Header + Nav
**Assigned by**: Claude Code (PM)
**Date**: 2026-03-08
**Priority**: CRITICAL — entire site is light mode on a dark background
**Tier**: M (multiple components, ~80 line changes across 6 files)

---

## BEFORE-STATE SCREENSHOTS
Already captured in TASK-015. Skip to fixes.

---

## MANDATORY CROSS-CHECK PROTOCOL
Before making ANY change: open the file, find the exact line listed, confirm the PM VERIFIED CONTENT matches what you see. If it does NOT match — STOP and report to PM. Do not implement that fix.

---

## FIX 1 — ResourceCard dark mode
**File**: `src/components/ResourceCard.tsx`

**Line 30 — PM VERIFIED CONTENT:**
```
className={`group relative flex flex-col sm:flex-row items-start sm:items-center bg-white border rounded-xl overflow-hidden opacity-60 hover:opacity-100 hover:border-blue-300 hover:shadow-sm transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-white ${
```
OLD: `bg-white border rounded-xl overflow-hidden opacity-60 hover:opacity-100 hover:border-blue-300 hover:shadow-sm transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-white`
NEW: `bg-white/[0.03] border rounded-none overflow-hidden opacity-60 hover:opacity-100 hover:border-blue-500/40 transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-black`

**Line 33 — PM VERIFIED CONTENT:**
```
        : 'border-slate-200'
```
OLD: `'border-slate-200'`
NEW: `'border-white/[0.06]'`

**Line 83 — PM VERIFIED CONTENT:**
```
             <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-400 transition-colors mb-1 tracking-tight leading-tight truncate pr-8 sm:pr-0">
```
OLD: `text-slate-900`
NEW: `text-white`

**Line 93 — PM VERIFIED CONTENT:**
```
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
```
OLD: `border-t border-slate-200 sm:border-0`
NEW: `border-t border-white/[0.06] sm:border-0`

**Line 101 — PM VERIFIED CONTENT:**
```
              <span className="text-sm font-bold font-mono text-slate-900">
```
OLD: `text-slate-900`
NEW: `text-white`

**Line 143 — PM VERIFIED CONTENT:**
```
        <button className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:border-slate-400 transition-colors">
```
OLD: `bg-white border border-slate-200 text-slate-600`
NEW: `bg-white/[0.06] border border-white/[0.12] text-gray-400`

---

## FIX 2 — Header dark mode
**File**: `src/components/Header.tsx`

**Line 23 — PM VERIFIED CONTENT:**
```
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
```
OLD: `bg-white/90 backdrop-blur-md border-b border-slate-200`
NEW: `bg-black/90 backdrop-blur-md border-b border-white/[0.08]`

**Line 31 — PM VERIFIED CONTENT:**
```
            <span className="text-[17px] font-black tracking-[-0.03em] font-mono lowercase text-slate-900 leading-[1.1] premium-text-glow">
```
OLD: `text-slate-900`
NEW: `text-white`

**Line 55 — PM VERIFIED CONTENT:**
```
          <div className="flex items-center gap-4 pl-4 border-l border-slate-200 h-6">
```
OLD: `border-l border-slate-200`
NEW: `border-l border-white/[0.08]`

**Line 58 — PM VERIFIED CONTENT:**
```
              className="flex items-center justify-center px-3 py-1 bg-white/95 hover:bg-white text-black text-[11px] font-semibold tracking-wide rounded-md transition-all whitespace-nowrap"
```
OLD: `bg-white/95 hover:bg-white text-black`
NEW: `bg-white/[0.08] hover:bg-white/[0.15] text-white`

**Line 75 — PM VERIFIED CONTENT:**
```
                      className="w-7 h-7 rounded-full border border-slate-200 group-hover:border-blue-500 transition-colors"
```
OLD: `border border-slate-200 group-hover:border-blue-500`
NEW: `border border-white/[0.12] group-hover:border-blue-500`

**Line 78 — PM VERIFIED CONTENT:**
```
                      <div className="w-7 h-7 rounded-full bg-gray-950 flex items-center justify-center text-slate-400 group-hover:bg-gray-900 transition-colors border border-slate-200">
```
OLD: `border border-slate-200`
NEW: `border border-white/[0.12]`

**Line 97 — PM VERIFIED CONTENT:**
```
                  className="text-slate-400 hover:text-slate-900 transition-colors text-[11px] font-semibold tracking-wide whitespace-nowrap"
```
OLD: `hover:text-slate-900`
NEW: `hover:text-white`

**Line 67 — PM VERIFIED CONTENT (broken link):**
```
                  href={username ? `/u/${username}` : '/settings'}
```
OLD: `href={username ? \`/u/${username}\` : '/settings'}`
NEW: `href="/dashboard"`

---

## FIX 3 — SearchInput dark mode
**File**: `src/components/SearchInput.tsx`

**Line 76 — PM VERIFIED CONTENT:**
```
          "w-full bg-white border border-slate-200 focus:border-white transition-all text-slate-900 placeholder:text-gray-600 outline-none",
```
OLD: `bg-white border border-slate-200 focus:border-white transition-all text-slate-900 placeholder:text-gray-600`
NEW: `bg-white/[0.06] border border-white/[0.08] focus:border-white/[0.25] transition-all text-white placeholder:text-gray-500`

---

## FIX 4 — NavLinks dark mode
**File**: `src/components/NavLinks.tsx`

**Line 27 — PM VERIFIED CONTENT:**
```
          ? "text-slate-400 cursor-not-allowed hover:text-slate-900"
```
OLD: `hover:text-slate-900`
NEW: `hover:text-slate-400`

**Line 29 — PM VERIFIED CONTENT:**
```
            ? "text-slate-900"
```
OLD: `"text-slate-900"`
NEW: `"text-white"`

**Line 30 — PM VERIFIED CONTENT:**
```
            : item.label === 'MCPs' ? "text-slate-900 hover:text-blue-400" : "text-slate-500 hover:text-slate-900";
```
OLD: `item.label === 'MCPs' ? "text-slate-900 hover:text-blue-400" : "text-slate-500 hover:text-slate-900"`
NEW: `item.label === 'MCPs' ? "text-white hover:text-blue-400" : "text-slate-400 hover:text-white"`

---

## FIX 5 — MobileMenu dark mode
**File**: `src/components/MobileMenu.tsx`

**Line 36 — PM VERIFIED CONTENT:**
```
        className="md:hidden p-2 text-slate-400 hover:text-slate-900 focus:outline-none"
```
OLD: `hover:text-slate-900`
NEW: `hover:text-white`

**Line 48 — PM VERIFIED CONTENT:**
```
        <div className="absolute top-14 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
```
OLD: `bg-white/95 backdrop-blur-xl border-b border-slate-200`
NEW: `bg-black/95 backdrop-blur-xl border-b border-white/[0.08]`

**Line 53 — PM VERIFIED CONTENT:**
```
                    className={`text-lg font-bold hover:text-slate-900 ${pathname === '/' ? 'text-slate-900' : 'text-slate-500'}`}
```
OLD: `hover:text-slate-900 ${pathname === '/' ? 'text-slate-900' : 'text-slate-500'}`
NEW: `hover:text-white ${pathname === '/' ? 'text-white' : 'text-slate-400'}`

**Line 65 — PM VERIFIED CONTENT:**
```
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2 px-1">
```
OLD: `text-slate-500`
NEW: `text-slate-400`

**Line 68 — PM VERIFIED CONTENT:**
```
                                <div className="flex flex-col gap-3 pl-4 border-l border-slate-200">
```
OLD: `border-l border-slate-200`
NEW: `border-l border-white/[0.08]`

**Line 77 — PM VERIFIED CONTENT:**
```
                                className={`text-base font-bold hover:text-slate-900 flex items-center gap-2 ${isChildActive ? 'text-slate-900' : 'text-slate-400'}`}
```
OLD: `hover:text-slate-900 flex items-center gap-2 ${isChildActive ? 'text-slate-900' : 'text-slate-400'}`
NEW: `hover:text-white flex items-center gap-2 ${isChildActive ? 'text-white' : 'text-slate-400'}`

**Line 95 — PM VERIFIED CONTENT:**
```
                        className={`text-lg font-bold hover:text-slate-900 flex items-center gap-2 ${isActive ? 'text-slate-900' : 'text-slate-500'}`}
```
OLD: `hover:text-slate-900 flex items-center gap-2 ${isActive ? 'text-slate-900' : 'text-slate-500'}`
NEW: `hover:text-white flex items-center gap-2 ${isActive ? 'text-white' : 'text-slate-400'}`

**Line 103 — PM VERIFIED CONTENT:**
```
                <div className="h-px w-full bg-slate-100 my-1" />
```
OLD: `bg-slate-100`
NEW: `bg-white/[0.08]`

**Line 113 — PM VERIFIED CONTENT:**
```
            <div className="h-px w-full bg-slate-100" />
```
OLD: `bg-slate-100`
NEW: `bg-white/[0.08]`

**Line 119 — PM VERIFIED CONTENT (also broken link):**
```
                            href={currentUsername ? `/u/${currentUsername}` : '/settings'}
```
OLD: `href={currentUsername ? \`/u/${currentUsername}\` : '/settings'}`
NEW: `href="/dashboard"`

**Line 121 — PM VERIFIED CONTENT:**
```
                            className="flex items-center gap-3 text-slate-500 hover:text-slate-900"
```
OLD: `text-slate-500 hover:text-slate-900`
NEW: `text-slate-400 hover:text-white`

**Line 141 — PM VERIFIED CONTENT:**
```
                        className="w-full py-3 bg-white text-black font-black uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors"
```
OLD: `bg-white text-black ... hover:bg-gray-200`
NEW: `bg-white/[0.08] text-white ... hover:bg-white/[0.15]`

---

## FIX 6 — Stale comment
**File**: `src/app/page.tsx`

**Line 115 — PM VERIFIED CONTENT:**
```
        {/* 1. Creator Marketplace Hero */}
```
OLD: `{/* 1. Creator Marketplace Hero */}`
NEW: `{/* Hero */}`

---

## PHASE 2 — BUILD + LINT

After all fixes:
```bash
npm run build
npm run lint
```
Both must exit 0. If either fails — stop, report the full error output, do not commit.

---

## PHASE 3 — AFTER SCREENSHOTS + EVIDENCE

After build + lint exit 0:

Screenshot every page:
```bash
# Also check HTTP status
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/mcp-servers
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/skills
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/rules
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/advertise
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/submit
```

Then commit:
```bash
git add -A
git commit -m "fix(ui): dark mode — header, nav, search, ResourceCard all dark"
git log --oneline -1
git diff HEAD~1 HEAD
```

---

## MANDATORY REPORT FORMAT

```
TASK-016 REPORT
==============================

--- CROSS-CHECK RESULTS ---
Fix 1 ResourceCard line 30 matches: [YES/NO]
Fix 1 ResourceCard line 33 matches: [YES/NO]
Fix 1 ResourceCard line 83 matches: [YES/NO]
Fix 1 ResourceCard line 93 matches: [YES/NO]
Fix 1 ResourceCard line 101 matches: [YES/NO]
Fix 1 ResourceCard line 143 matches: [YES/NO]
Fix 2 Header line 23 matches: [YES/NO]
Fix 2 Header line 31 matches: [YES/NO]
Fix 2 Header line 55 matches: [YES/NO]
Fix 2 Header line 58 matches: [YES/NO]
Fix 2 Header line 67 matches: [YES/NO]
Fix 2 Header line 75 matches: [YES/NO]
Fix 2 Header line 78 matches: [YES/NO]
Fix 2 Header line 97 matches: [YES/NO]
Fix 3 SearchInput line 76 matches: [YES/NO]
Fix 4 NavLinks line 27 matches: [YES/NO]
Fix 4 NavLinks line 29 matches: [YES/NO]
Fix 4 NavLinks line 30 matches: [YES/NO]
Fix 5 MobileMenu line 36 matches: [YES/NO]
Fix 5 MobileMenu line 48 matches: [YES/NO]
Fix 5 MobileMenu line 53 matches: [YES/NO]
Fix 5 MobileMenu line 65 matches: [YES/NO]
Fix 5 MobileMenu line 68 matches: [YES/NO]
Fix 5 MobileMenu line 77 matches: [YES/NO]
Fix 5 MobileMenu line 95 matches: [YES/NO]
Fix 5 MobileMenu line 103 matches: [YES/NO]
Fix 5 MobileMenu line 113 matches: [YES/NO]
Fix 5 MobileMenu line 119 matches: [YES/NO]
Fix 5 MobileMenu line 121 matches: [YES/NO]
Fix 5 MobileMenu line 141 matches: [YES/NO]
Fix 6 page.tsx line 115 matches: [YES/NO]

--- BUILD + LINT ---
npm run build exit code: [0 / error]
npm run build full output:
[paste]

npm run lint exit code: [0 / error]
npm run lint full output:
[paste]

--- GIT ---
Commit hash: [paste]
Diff:
[paste git diff HEAD~1 HEAD]

--- AFTER SCREENSHOTS ---

Homepage after:
[ATTACH SCREENSHOT]
Observations: [dark header? dark cards? white text visible?]

/mcp-servers after:
[ATTACH SCREENSHOT]
Observations: [dark header? dark cards?]

/skills after:
[ATTACH SCREENSHOT]
Observations:

/rules after:
[ATTACH SCREENSHOT]
Observations:

/advertise after:
[ATTACH SCREENSHOT]
Observations:

/submit after:
[ATTACH SCREENSHOT]
Observations:

--- HTTP STATUS PER PAGE ---
http://localhost:3000 → [status code]
http://localhost:3000/mcp-servers → [status code]
http://localhost:3000/skills → [status code]
http://localhost:3000/rules → [status code]
http://localhost:3000/advertise → [status code]
http://localhost:3000/submit → [status code]

--- BROWSER CONSOLE ---
Errors: [paste or "none"]

--- NETWORK TAB ---
DB data loading: [yes/no — paste one API response excerpt]

--- SCREEN RECORDING (MANDATORY) ---
[ATTACH RECORDING — hover over ResourceCards on homepage, open mobile menu, show dark state throughout]
Missing recording = task not done.

--- BUGS SPOTTED (do not fix, report only) ---
1.
2.
3.
```

---

## DO NOT DO
- Do NOT fix anything not listed above
- Do NOT change any files not listed above
- Report all other bugs you see — PM decides what to fix next
