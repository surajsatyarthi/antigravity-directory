# GEMINI.md — Antigravity Project Brief

# This file is auto-loaded by Antigravity IDE at the start of every session.

# Maintained by Claude Code (PM). Do not edit manually.

# Last updated: 2026-03-09

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

---

## CARD BEHAVIOUR (cursor.directory pattern — non-non-negotiable)

ResourceCard resting state: `bg-white/[0.03] border-white/[0.06] opacity-60`
ResourceCard hover state: `opacity-100 border-blue-500/40`
Action buttons (copy, bookmark): hidden at rest, `group-hover:flex` on hover

---

## THE 10 LOCKED CATEGORIES (slugs — do not change)

mcp-servers / skills / rules / prompts / agents / workflows / boilerplates / troubleshooting / tutorials / cheatsheets

---

## QUALITY GATES AND PROTOCOLS (MANDATORY)

We now use centralized protocols managed via the `.agent` folder.

**CRITICAL: You must read and follow `.agent/RALPH_PROTOCOL.md` for all tasks.**

Every task goes through explicit Gates (like G1 for Auth/Audit, G13 for Browser Preview, G14 for PM Approval). You must follow the exact Evidence tracking steps described in the Ralph Protocol.

### MANDATORY VERIFICATION BEFORE REPORTING A TASK "DONE"

1. Verify no violations of the `Iron Rule` (Stop on error).
2. `npm run build` → must exit 0.
3. `npm run lint` → must exit 0.
4. Preview the changes using your automated browser.
5. Create G13 report/screenshots as required.

---

## FULL SPECS (read these for detailed requirements)

- Product scope: `docs/01-business/PRODUCT_BRIEF.md`
- Component design rules: `docs/new-start/DESIGN_SPEC.md`
- SEO implementation: `docs/02-strategy/SEO_PROGRAMMATIC_PLAN.md`
- Current task: `CURRENT_TASK.md`

---

## CURRENT TASK

Always read `CURRENT_TASK.md` in the project root. That file contains your specific task for this session. Implement it exactly. Do not do anything not listed in that file.
