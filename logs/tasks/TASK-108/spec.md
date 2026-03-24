# CURRENT TASK — TASK-107
**Title**: Fix pre-existing build and lint failures — exclude non-source directories
**Date**: 2026-03-24
**Priority**: Blocking — TASK-106 cannot be marked DONE until build + lint exit 0

---

## PRE-SPEC GATE

DECLARATION:
1. "I am not in a hurry. I have plenty of time." — STATED: YES
2. "I will use first principles thinking." — STATED: YES
3. "The whole target of this project is to earn $2,000 MRR as fast as possible." — STATED: YES

FEATURE STATE CHECK:
- Build/lint config: not a feature — N/A for FEATURE_STATE.md

FILES READ:
- `tsconfig.json`:26 — `"exclude": ["node_modules", ".next", "public", "ads", "scripts", "tests", "dist", "ralph-protocols", "temp"]` — "ralph-protocols" does NOT match folder named "Ralph protocol" (capital R, space, lowercase p) — folder is not excluded, TypeScript compiler picks up `Ralph protocol/templates/validate-env.ts:136` which uses Bun, causing build failure
- `eslint.config.mjs`:25 — `ignores: [".next/**", "node_modules/**", "public/**", "test-results/**", "playwright-report/**"]` — "temp/**" is NOT listed, so ESLint scans `temp/everything-claude-code/scripts/*.js` which contain `@next/next/no-assign-module-variable` violations

DATA VERIFIED:
- Build failure confirmed: `temp/task106_build.log` line 14-15 — `./Ralph protocol/templates/validate-env.ts:136:20 — Type error: Cannot find name 'Bun'`
- Lint failure confirmed: `temp/task106_lint.log` line 27 — `✖ 9 problems (7 errors, 2 warnings)` — all 7 errors in `temp/everything-claude-code/scripts/`
- Root cause: PM moved `ralph-protocols/` folder into project root as `Ralph protocol/` earlier this session. tsconfig had `"ralph-protocols"` (old name) — name mismatch means TypeScript compiler now picks it up.

FIRST PRINCIPLES CHECK:
(a) TypeScript compilation and ESLint should only cover project source code. Non-source directories (evidence temp files, imported reference documents) must be excluded to prevent false failures that mask real errors.
(b) No competitor logic — pure config hygiene.

LIFECYCLE CHECK:
- Data grows: Additional files added to `temp/` or `Ralph protocol/` will also be excluded — correct behaviour.
- Data shrinks: No issue.
- 6 months: No code changes needed — exclusions are permanent.
- Failure mode: If new source code is accidentally placed in `temp/` it would also be excluded — low risk, temp/ is for evidence files only.
- Hard-coded values: Folder name `"Ralph protocol"` — safe to hard-code, this is the actual folder name.

CLEAN SLATE CHECK: YES — cleared TASK-106 spec.

ACCEPTANCE CRITERIA:
- [ ] `npm run build` exits 0 — verified by: `temp/task107_build.log` containing "Compiled successfully" or equivalent
- [ ] `npm run lint` exits 0 — verified by: `temp/task107_lint.log` containing zero errors
- [ ] `temp/task106_build.log` overwritten with clean passing output — verified by: Read tool (no "Failed to compile")
- [ ] `temp/task106_lint.log` overwritten with clean passing output — verified by: Read tool (zero errors)
- [ ] Git commit exists — hash inline in report

No screenshots required — no UI changes.
No http_status.txt required — no pages changed.

---

## SPEC

### Goal
Fix two pre-existing failures that block `npm run build` and `npm run lint`:
1. TypeScript compiler picks up `Ralph protocol/templates/validate-env.ts` (uses Bun — not a project source file)
2. ESLint scans `temp/everything-claude-code/scripts/*.js` (imported ECC toolkit — not project source)

This is a config-only task. No `src/` files change. No GEMINI.md changes.

---

### CHANGE 1 — Fix tsconfig.json exclude

File: `tsconfig.json`

Find:
```
"exclude": ["node_modules", ".next", "public", "ads", "scripts", "tests", "dist", "ralph-protocols", "temp"]
```

Replace with:
```
"exclude": ["node_modules", ".next", "public", "ads", "scripts", "tests", "dist", "ralph-protocols", "Ralph protocol", "temp"]
```

Explanation: The folder was renamed from `ralph-protocols` to `Ralph protocol` when moved into this project. The old name entry is kept (in case a folder with that name exists somewhere) and the new name is added.

---

### CHANGE 2 — Fix eslint.config.mjs ignores

File: `eslint.config.mjs`

Find:
```
    ignores: [".next/**", "node_modules/**", "public/**", "test-results/**", "playwright-report/**"],
```

Replace with:
```
    ignores: [".next/**", "node_modules/**", "public/**", "test-results/**", "playwright-report/**", "temp/**", "Ralph protocol/**", "dist/**"],
```

Explanation: `temp/` contains build evidence and downloaded toolkits — not project source. `Ralph protocol/` contains imported reference documents. `dist/` contains protocol rollout exports. None should be linted.

---

### VERIFY — Run build and lint, save to BOTH task107 and task106 filenames

After making the two config changes, run:

```bash
npm run build 2>&1 | tee temp/task107_build.log
cp temp/task107_build.log temp/task106_build.log

npm run lint 2>&1 | tee temp/task107_lint.log
cp temp/task107_lint.log temp/task106_lint.log
```

Both build and lint MUST exit 0. If either fails — STOP and report the error to PM. Do not proceed to commit.

---

### COMMIT — Config files only

```bash
git add tsconfig.json eslint.config.mjs
git commit -m "TASK-107: Exclude Ralph protocol/ and temp/ from TypeScript and ESLint"
```

---

## EVIDENCE REQUIRED

| # | File | What to show |
|---|---|---|
| 1 | `temp/task107_build.log` | Build exit 0 |
| 2 | `temp/task107_lint.log` | Lint exit 0 |
| 3 | `temp/task106_build.log` | Overwritten with clean build (no "Failed to compile") |
| 4 | `temp/task106_lint.log` | Overwritten with clean lint (zero errors) |
| 5 | Git commit hash | inline — tsconfig.json + eslint.config.mjs only |

No screenshots required — no UI changes.
No http_status.txt required — no pages changed.

---

## NOTE FOR ANTIGRAVITY

This task exists because the PM (Claude Code) moved a folder named `Ralph protocol/` into the project root during a planning session. The folder contains a Bun-specific TypeScript file (`validate-env.ts`) that has nothing to do with this project. TypeScript picked it up because the tsconfig exclude entry still used the old folder name `ralph-protocols`.

Once this task is complete and clean build/lint logs exist for both task107 AND task106, PM will mark both TASK-107 and TASK-106 ✅ DONE.
