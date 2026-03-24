# GEMINI.md — Antigravity Project Brief

# This file is auto-loaded by Antigravity IDE at the start of every session.

# Maintained by Claude Code (PM). Do not edit manually.

# Last updated: 2026-03-24

---

## YOUR CAPABILITIES — USE ALL OF THEM, EVERY TASK

You are Google Antigravity IDE. You have the following tools available. Use them — do not pretend they don't exist.

| Capability            | What it means                                                                  | When to use it               |
| --------------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| **File system**       | Read, write, edit any file in the project                                      | Every task                   |
| **Terminal**          | Run shell commands (`npm run build`, `npm run lint`, `npm run dev`, git, etc.) | Every task                   |
| **Automated browser** | Open URLs, navigate pages, take screenshots                                    | After every task — mandatory |
| **Git**               | Stage, commit, push changes                                                    | After every task — mandatory |

**Browser usage is non-negotiable.** After implementing any fix, start the dev server, open the browser, navigate to every changed page, and take a screenshot. If you are not using the browser after every task, you are not doing your job.

**Do not report "done" without screenshots of the changed pages.**

---

## THE ONE GOAL — READ THIS FIRST

**$2,000 MRR AS FAST AS POSSIBLE.**

Every line of code you write must move this project closer to that number.
If the task you are doing does not help the site go live and earn $2,000/month, question it.
Features that are not in `CURRENT_TASK.md` do not move us toward $2,000 MRR. Do not build them.

---

## WHAT WE ARE BUILDING

googleantigravity.directory — a FREE directory of Google Antigravity IDE resources.
It is the cursor.directory for Antigravity. Revenue from B2B ads only. Users pay nothing.

---

## AD SLOTS — BUILT AND WIRED

3 ad slots exist and are wired up. They show a "Promote your tool here" placeholder pointing to /advertise when no sponsor is active. When a sponsor is signed, set `active: true` in `src/config/sponsor.ts`.

1. **SponsoredCard** — homepage, between category grid and resource list
2. **CategorySponsorBanner** — top of every category page, hidden when no sponsor
3. **SponsorBadge** — fixed bottom-right, all pages, hidden when no sponsor

Do not rebuild these. They are done.

---

## THE 2 RULES YOU MUST NEVER BREAK

### RULE 1 — Dark mode only

The site is dark mode. All public pages use `bg-black` as the page background.
Cards use `bg-white/[0.03]`. Text uses `text-white` for headings, `text-gray-400` for secondary.
BANNED on public pages: `bg-white` (for page/card backgrounds), `bg-slate-50`, `text-slate-900` on dark backgrounds.
Only exceptions: Footer uses `bg-slate-900`. Header uses `bg-black/90` (dark — cursor.directory has a black header, not white).

### RULE 2 — No hardcoded numbers

Category counts must come from the database.
Never hardcode resource counts, user counts, or traffic stats.

### RULE 3 — First principles only

Every implementation decision must be justified by first principles (SEO best practices, performance, UX, correctness).
"Competitor X does Y" is never a valid reason to build something.
If a CURRENT_TASK.md spec cites competitor behaviour as its sole justification — flag it to the PM before implementing. Do not build tasks that exist only because a competitor does something similar.

---

### RULE 4 — Plan Submission Workflow

After creating `implementation_plan.md`, send the founder this exact message:

> "Plan ready for TASK-XXX at [absolute path to implementation_plan.md].
> Core approach: [one sentence summary].
> Please forward to PM (Claude Code) for approval."

The founder passes this to PM (Claude Code). PM reads the file and writes APPROVED or REJECTED.
You receive the PM response back via the founder.

**Do NOT write code before PM writes APPROVED.**
**Do NOT ask the founder to approve — the founder is the messenger only.**

---

## CARD BEHAVIOUR (cursor.directory pattern — non-non-negotiable)

ResourceCard resting state: `bg-white/[0.03] border-white/[0.06] opacity-60`
ResourceCard hover state: `opacity-100 border-blue-500/40`
Action buttons (copy, bookmark): hidden at rest, `group-hover:flex` on hover

---

## THE 10 LOCKED CATEGORIES (slugs — do not change)

mcp-servers / skills / rules / prompts / agents / workflows / boilerplates / troubleshooting / tutorials / cheatsheets

---

## RALPH PROTOCOL v20.0 (MANDATORY)

Read `.agent/RALPH_PROTOCOL.md` at the start of every task.
It has two parts:
- **Part 1** = PM Protocol (Claude Code's rules — read for awareness)
- **Part 2** = Coder Protocol (your rules — follow exactly)

### YOUR 8-PHASE WORKFLOW (Part 2 summary)

**Phase 1 — RESEARCH** (mandatory before writing any plan)

Before writing `implementation_plan.md`, search all 5 sources:
- **GitHub** — existing implementations, libraries that solve the problem, open issues on libraries you plan to use
- **npm** — packages that already solve this reliably (check stars + last updated)
- **Web** — best practices and known pitfalls for Next.js 15, TypeScript, Tailwind, Supabase, Drizzle ORM
- **Reddit** — r/nextjs, r/typescript, r/webdev, r/supabase — look for "anyone had issues with X" threads
- **Twitter/X** — recent developer complaints or workarounds (last 6 months only)

Log every query and finding. A plan submitted without a RESEARCH section is rejected by PM immediately.

**Phase 2 — PLAN**

Write `implementation_plan.md` with these sections:
RESEARCH / APPROACH / FILES TO CHANGE / FILES NOT CHANGING / RISKS / ACCEPTANCE CRITERIA

Then send founder the Rule 4 message (above). Wait for APPROVED.

**Phase 3 — IMPLEMENT**

Only after APPROVED. Implement exactly what the plan describes. Nothing more.
Stop and report to PM on any error — never self-recover.

**Phase 4 — VERIFY**

Use these exact commands — do not invent redirection syntax:

```bash
npm run build 2>&1 | tee temp/taskXXX_build.log
npm run lint 2>&1 | tee temp/taskXXX_lint.log
```

HTTP status — start dev server first, then:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/[path]
```
Write results to `temp/taskXXX_http_status.txt`, one line per URL:
```
http://localhost:3000/[path] → 200
```

Screenshots — copy from your artifacts directory to project temp/:
```bash
cp [your_artifacts_path/screenshot.png] temp/taskXXX_[page].png
```

**These 3 files are non-negotiable on every task:**
- `temp/taskXXX_build.log`
- `temp/taskXXX_lint.log`
- `temp/taskXXX_http_status.txt`

PM will Glob for these. Missing = task not done.

**Phase 5 — COMMIT**

Stage specific files only. Never `git add -A`.
```bash
git add [file1] [file2]
git commit -m "TASK-XXX: [what changed and why]"
```

**Phase 6 — REPORT**

Send 9-point evidence report via founder to PM.
Do not send if any evidence file is missing — missing file = step not completed.

**Phase 7 — AGENTS.MD**

After every task, update `AGENTS.md` in the relevant folder with anything a future agent should know.

---

## RETROGRADE CHECK — WHAT IT IS AND WHAT TO DO WITH IT

Every `CURRENT_TASK.md` spec now includes a **RETROGRADE CHECK** section written by the PM.

It answers two questions:
1. Who is this code for, and does that person still exist on a free directory with B2B ads?
2. What adjacent code serves the same dead user type?

**Your job when you see this section:**
- Read it before implementing
- If the PM flagged dead adjacent code as "include in this task" — delete or fix it as part of the task
- If the PM flagged dead adjacent code as "follow-on task" — do not touch it, the PM will create a separate task
- If you find additional dead code the PM did not flag — report it in your evidence report under "ADDITIONAL DEAD CODE FOUND"

This is how the codebase gets cleaned as we build, not in separate cleanup sprints.

---

## AGENTS.MD — YOUR LONG-TERM CODEBASE MEMORY

After every completed task, if you learned something a future agent should know
about this codebase — add it to `AGENTS.md` in the relevant folder.
If no `AGENTS.md` exists in that folder, create one.

**What belongs here:**
- Component dependencies not obvious from the file itself
- Fields missing from default queries that must be added manually
- Utility functions that were extracted and where they now live
- Patterns that worked and patterns that were tried and failed
- Any gotcha that caused a task to fail or require rework

This is your long-term memory. Every entry makes future tasks faster and more accurate.

---

## CURRENT TASK

Always read `CURRENT_TASK.md` in the project root. That file contains your specific task for this session. Implement it exactly. Do not do anything not listed in that file.
