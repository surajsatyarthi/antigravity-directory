# GEMINI.md — Antigravity Project Brief

# This file is auto-loaded by Antigravity IDE at the start of every session.
# Maintained by Claude Code (PM). Do not edit manually.
# Last updated: 2026-03-27

---

## YOUR CAPABILITIES — USE ALL OF THEM, EVERY TASK

You are Google Antigravity IDE. You have the following tools available. Use them — do not pretend they don't exist.

| Capability            | What it means                                                                  | When to use it               |
| --------------------- | ------------------------------------------------------------------------------ | ---------------------------- |
| **File system**       | Read, write, edit any file in the project                                      | Every task                   |
| **Terminal**          | Run shell commands (`pnpm run build`, `pnpm run lint`, `pnpm run dev`, git)    | Every task                   |
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

## THE 4 RULES YOU MUST NEVER BREAK

### RULE 1 — Dark mode only

The site is dark mode. All public pages use `bg-black` as the page background.
Cards use `bg-white/[0.03]`. Text uses `text-white` for headings, `text-gray-400` for secondary.
BANNED on public pages: `bg-white` (for page/card backgrounds), `bg-slate-50`, `text-slate-900` on dark backgrounds.
Only exceptions: Footer uses `bg-slate-900`. Header uses `bg-black/90`.
Card corners: `rounded-none` — LOCKED. No border radius anywhere on cards.

### RULE 2 — No hardcoded numbers

Category counts must come from the database.
Never hardcode resource counts, user counts, or traffic stats.

### RULE 3 — First principles only

Every implementation decision must be justified by first principles (SEO best practices, performance, UX, correctness).
"Competitor X does Y" is never a valid reason to build something.
If a `CURRENT_TASK.md` spec cites competitor behaviour as its sole justification — flag it to the PM before implementing. Do not build tasks that exist only because a competitor does something similar.

### RULE 4 — Plan Submission Workflow (HARDWIRED — Planning Mode)

After creating `implementation_plan.md`, send the founder this exact message:

> "Plan ready for TASK-XXX at `/Users/user/Desktop/antigravity-directory/implementation_plan.md`.
> Core approach: [one sentence summary].
> Please forward to PM (Claude Code) for approval."

The founder passes this to PM (Claude Code). PM reads the file and writes APPROVED or REJECTED.
You receive the PM response back via the founder.

**Do NOT write code before PM writes APPROVED.**
**Do NOT ask the founder to approve — the founder is the messenger only.**

---

## CARD BEHAVIOUR (cursor.directory pattern — non-negotiable)

ResourceCard resting state: `bg-white/[0.03] border-white/[0.06] opacity-60`
ResourceCard hover state: `opacity-100 border-blue-500/40`
Action buttons (copy, bookmark): hidden at rest, `group-hover:flex` on hover

---

## THE 10 LOCKED CATEGORIES (slugs — do not change)

mcp-servers / skills / rules / prompts / agents / workflows / boilerplates / troubleshooting / tutorials / cheatsheets

---

## RALPH PROTOCOL v21.0 (MANDATORY)

Read `.agent/RALPH_PROTOCOL.md` at the start of every task.
It has two parts:
- **Part 1** = PM Protocol (Claude Code's rules — read for awareness)
- **Part 2** = Coder Protocol (your rules — follow exactly)

### YOUR 8-PHASE WORKFLOW (Part 2 summary — full detail in RALPH_PROTOCOL.md)

**Phase 1 — RESEARCH** (mandatory before writing any plan)

Search all 5 sources: GitHub / npm / Web / Reddit / Twitter-X. Log every query + finding.

**Phase 2 — PLAN**

Write `implementation_plan.md`. Send Rule 4 message to founder. Wait for APPROVED.

**Phase 3 — IMPLEMENT**

Only after APPROVED. Nothing outside scope. IRON RULE: any error → STOP → report.

**Phase 4 — VERIFY**

```bash
pnpm run build 2>&1 | tee temp/taskXXX_build.log
pnpm run lint 2>&1 | tee temp/taskXXX_lint.log
```

These 3 files are non-negotiable on every task (use absolute paths):
- `/Users/user/Desktop/antigravity-directory/temp/taskXXX_build.log`
- `/Users/user/Desktop/antigravity-directory/temp/taskXXX_lint.log`
- `/Users/user/Desktop/antigravity-directory/temp/taskXXX_http_status.txt`

Plus screenshots — minimum one per acceptance criterion.
Copy screenshots to `/Users/user/Desktop/antigravity-directory/temp/taskXXX_[page].png`.

PM will Glob for these. Missing = task not done.

**Phase 5 — COMMIT**

# Archive the spec and plan before committing
mkdir -p logs/tasks/TASK-XXX
cp CURRENT_TASK.md logs/tasks/TASK-XXX/spec.md
[ -f implementation_plan.md ] && cp implementation_plan.md logs/tasks/TASK-XXX/plan.md

Stage specific files only. Never `git add -A`.

**Phase 6 — REPORT**

Update logs/TASK_INDEX.md — append one row:
| TASK-XXX | ✅ DONE | YYYY-MM-DD | [git SHA] | logs/tasks/TASK-XXX/ |

9-point evidence report via founder to PM. Do not send if any file is missing.

**Phase 7 — AGENTS.MD**

Update `AGENTS.md` in the relevant folder with anything a future agent should know.

**Phase 8 — WAIT**

Wait for PM verification. Do not start the next task.

---

## RETROGRADE CHECK — WHAT IT IS AND WHAT TO DO WITH IT

Every `CURRENT_TASK.md` spec includes a **RETROGRADE CHECK** section written by the PM.

It answers two questions:
1. Who is this code for — and does that person still exist on a free directory with B2B ads?
2. What adjacent code serves the same dead user type?

**Your job when you see this section:**
- Read it before implementing
- If PM flagged dead adjacent code as **"include in this task"** → delete or fix it as part of the task
- If PM flagged it as **"follow-on task"** → leave it alone, PM will create a separate task
- If you find additional dead code the PM did not flag → report it in your evidence report under "ADDITIONAL DEAD CODE FOUND"

This is how the codebase gets cleaned as we build, not in separate cleanup sprints.

---

## AGENTS.MD — YOUR LONG-TERM CODEBASE MEMORY

After every completed task, if you learned something a future agent should know
about this codebase — add it to `AGENTS.md` in the relevant folder.
If no `AGENTS.md` exists in that folder, create one.

**What belongs here:**
- Component dependencies not obvious from the file itself
- Fields missing from default queries that must be added manually
- Utility functions and where they live
- Patterns that worked and patterns that failed
- Any gotcha that caused a task to fail or require rework

---

## STACK

Next.js 15 / TypeScript / Tailwind / Supabase (PostgreSQL host) / Drizzle ORM (schema + queries) / Google OAuth / Vercel

Schema: `src/drizzle/schema.ts`
Package manager: `pnpm` (not npm)

---

## CURRENT TASK

Always read `CURRENT_TASK.md` in the project root. That file contains your specific task for this session. Implement it exactly. Do not do anything not listed in that file.
