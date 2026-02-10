# 🦅 RALPH PROTOCOL v6.5 (PHASE 1 ENHANCED)
## FAANG-Standard Technical Quality Gates

**Version:** 6.5 (Phase 1: Environment Validation)
**Effective Date:** 2026-02-11
**Status:** ACTIVE & MECHANICALLY ENFORCED
**Owner:** AI Coder
**Latest Enhancement:** Environment pre-flight validation with active connectivity testing

---

## EXECUTIVE SUMMARY

Ralph Protocol ensures **FAANG-level code quality** through 12 sequential gates and 11 non-negotiable commandments. After Incident #001 (Gate 2 bypass), the protocol was hardened from "honor system" to "mechanical enforcement."

**Phase 1 Enhancement (v6.5 - 2026-02-11):**
Added **pre-flight environment validation** with active connectivity testing to prevent RALPH-003 class failures (wrong environment configuration causing wasted debugging cycles). New **Gate 0** now validates environment integrity BEFORE development starts and is required by pre-commit hooks.

---

## 🆕 PHASE 1 ENHANCEMENTS (v6.5)

### Problem Identified
The gap analysis revealed that while v6.0 claimed "mechanical enforcement," agents could still:
- Start work with misconfigured environments (wrong ports, dead URLs)
- Waste hours debugging environment issues instead of catching them upfront
- Bypass research gates during development (only blocked at commit time)

### Solution: Gate 0 - Environment Pre-Flight Validation

**New Mandatory Step** before ANY development work:

```bash
npm run validate:env
```

**What it validates:**
1. ✅ All required environment variables present and correctly formatted
2. ✅ Supabase URL is accessible (active HTTP ping)
3. ✅ Supabase Auth service responds to health checks
4. ✅ Local ports match configuration (prevents 54321 vs 55321 mismatches)
5. ✅ Generates `.env-validated.log` as proof of validation

**Enforcement:**
- `predev` hook: Blocks `npm run dev` until validation passes
- Pre-commit hook: Rejects commits without `.env-validated.log`
- Validation expires after 24 hours (warning shown)

**Impact:**
- Prevents entire class of environment-related debugging loops
- Catches configuration errors in <5 seconds instead of after hours of work
- Enables confident development knowing infrastructure is ready

---

## CORE PRINCIPLES

```yaml
fail_safe_by_default: true      # Missing validation = blocked
single_source_of_truth: true    # This file is the authority
architectural_enforcement: true  # Make violations impossible
evidence_based: true            # Every gate requires proof
```

---

## 4-LAYER ENFORCEMENT ARCHITECTURE (v6.5)

```
┌─────────────────────────────────────────────────────┐
│ LAYER 0: ENVIRONMENT PRE-FLIGHT (NEW v6.5) 🆕       │
│ • npm run validate:env REQUIRED                     │
│ • Active connectivity tests (Supabase, Auth, DB)    │
│ • Port availability checks (prevents mismatches)    │
│ • Generates .env-validated.log (expires 24h)        │
│ ❌ BLOCKS npm run dev if environment invalid        │
└────────────────────┬────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────┐
│ LAYER 1: MANDATORY GATE 0 VALIDATION                │
│ • Audit log required BEFORE any work                │
│ • Research audit (3+ web searches)                  │
│ • Dependency analysis mandatory                     │
└────────────────────┬────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────┐
│ LAYER 2: PLAN APPROVAL CHECKPOINT                   │
│ • "Alternatives Considered" section required        │
│ • CEO/PM approval signature                         │
│ • Plan link in commit message                       │
│ ❌ NO CODE BEFORE APPROVAL                          │
└────────────────────┬────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────┐
│ LAYER 3: BUILD STATUS GATE                          │
│ ✅ npm run build (must pass)                        │
│ ✅ npm run test (80%+ coverage)                     │
│ ✅ npm run lint (must pass)                         │
│ ✅ Security scan (12/12 checks)                     │
│ ✅ Environment validation log present               │
└─────────────────────────────────────────────────────┘
```

---

## THE 11 COMMANDMENTS

| # | Law | Rule | Severity | Enforcement |
|---|-----|------|----------|-------------|
| 1 | **Limit Law** | All SELECT queries must include LIMIT | P0 | Scanner blocks |
| 2 | **Security Law** | Never use dangerouslySetInnerHTML without DOMPurify | P0 | Build fails |
| 3 | **JSON-LD Law** | Always use safeJsonLd() utility | P0 | Scanner blocks |
| 4 | **Revenue Law** | Payment code uses database, not in-memory | P0 | Deploy blocked |
| 5 | **Sequential Law** | All 12 gates in strict order | P0 | Audit log required |
| 6 | **Proof Law** | Evidence = Logs + Screenshots + Git Hash | P0 | Logs required |
| 7 | **Air-Gap Law** | DB writes via server-side only | P0 | Build fails |
| 8 | **Context Law** | Reports anchor to Git HEAD | P1 | Hash verified |
| 9 | **Semantic Law** | Commits reference TASK_ID | P1 | Hook rejects |
| 10 | **Integrity Law** | Reports pass validation | P1 | Exit code blocks |
| 11 | **RFC Law** | Plan has "Alternatives" + approval | P0 | Hook rejects |

---

## THE 12 QUALITY GATES

### PHASE 1: ASSESSMENT

| Gate | Name | Time | Requirements |
|------|------|------|--------------|
| **G1** | Physical Audit & State | 1-2h | Verify current code/production via direct observation |
| **G2** | Logic Mapping & Research | 2-3h | 3+ web searches, dependency analysis, edge cases |

### PHASE 2: PLANNING

| Gate | Name | Time | Requirements |
|------|------|------|--------------|
| **G3** | Blueprint & RFC | 1-2h | Implementation plan with "Alternatives Considered", CEO approval |

### PHASE 3: EXECUTION

| Gate | Name | Time | Requirements |
|------|------|------|--------------|
| **G4** | Implementation | Varies | Execute approved plan, no scope creep |
| **G5** | Security Audit | 30m | FAANG P0 scanner (12 checks) |
| **G6** | Performance Audit | 30m | Lighthouse 90+, bundle size check |
| **G7** | Code Quality & Build | 10m | lint, typecheck, build pass |
| **G8** | TDD Proof | 2-4h | Unit + E2E tests, 80%+ coverage |
| **G9** | Accessibility Audit | 1h | Axe scan, keyboard nav, ARIA labels |

### PHASE 4: VERIFICATION

| Gate | Name | Time | Requirements |
|------|------|------|--------------|
| **G10** | Staging Deployment | 30m | Deploy to staging, smoke tests |
| **G11** | Production Verification | 1h + 24h | Live verification, screenshots, monitoring |

### PHASE 5: DOCUMENTATION

| Gate | Name | Time | Requirements |
|------|------|------|--------------|
| **G12** | Documentation & Walkthrough | 30m | What changed, how to use, rollback procedure |

---

## SECURITY CHECKS (12 Total)

### Code Checks (4)
- SEC-001: Payment replay attack (no in-memory Set/Map)
- SEC-002: Mock data fallbacks in production
- SEC-003: XSS via dangerouslySetInnerHTML
- SEC-004: SQL injection patterns

### Dependency Checks (2)
- DEP-001: Required packages installed
- DEP-002: Lock file sync (pnpm-lock.yaml)

### Build Checks (3)
- BLD-001: TypeScript compilation
- BLD-002: Next.js build succeeds
- BLD-003: ESLint passes

### Deployment Checks (3)
- DPL-001: Environment variables documented
- DPL-002: Git state clean
- DPL-003: No hardcoded secrets

---

## EVIDENCE REQUIREMENTS

### Before Starting Work (NEW v6.5)
```
✅ .env-validated.log           (Environment pre-flight validation)
                                 - Generated by: npm run validate:env
                                 - Contains: connectivity test results
                                 - Expires: 24 hours
```

### Before Implementation
```
✅ audit-gate-0-TASK_ID.log    (Research + dependency audit)
✅ implementation_plan.md       (Plan with Alternatives)
✅ plan-approval.txt            (CEO/PM signature)
```

### During Implementation
```
✅ git log with Plan reference
✅ npm run ralph output         (Security scan)
✅ npm run build output         (Build success)
```

### After Completion
```
✅ gates.txt                    (All gates passed)
✅ pre-submission-gate.txt      (Checklist complete)
✅ self-audit.txt               (Spec alignment)
✅ screenshots/                 (Visual proof)
```

---

## PRE-SUBMISSION CHECKLIST

```markdown
# Pre-Submission Gate — [TASK_ID]

## Quality Gates
- [ ] npm run build — PASSED
- [ ] npm run lint — PASSED
- [ ] npm run test — PASSED (coverage ≥80%)
- [ ] Security scan — PASSED (12/12)

## Spec Compliance
- [ ] Read full task spec
- [ ] Every deliverable implemented
- [ ] All UI sections rendered
- [ ] All API routes correct status codes

## Code Quality
- [ ] No `any` types
- [ ] No unused imports
- [ ] No placeholder comments
- [ ] Auth checks on protected routes

## Evidence
- [ ] gates.txt saved
- [ ] screenshots captured
- [ ] self-audit.txt complete
```

---

## ENFORCEMENT MECHANISMS

### Pre-commit Hook (v6.5 Enhanced)
```bash
# .git/hooks/pre-commit
#!/bin/bash

# NEW v6.5: Check environment validation
if ! test -f ".env-validated.log"; then
  echo "❌ BLOCKED: Environment not validated"
  echo "Fix: Run 'npm run validate:env' first"
  exit 1
fi

# Check Gate 0 audit exists
if ! test -f "audit-gate-0-*.log"; then
  echo "❌ BLOCKED: No Gate 0 audit log"
  exit 1
fi

# Check plan approval
if ! grep -q "APPROVED" implementation_plan.md; then
  echo "❌ BLOCKED: Plan not approved"
  exit 1
fi

# Check build
npm run build || exit 1
npm run lint || exit 1
npm run test || exit 1
```

### CI/CD Pipeline
- All 12 gates checked on PR
- Security scan runs automatically
- Merge blocked if any gate fails

---

## BYPASS PREVENTION

| Mechanism | Prevents |
|-----------|----------|
| Pre-commit hook with fail-safe | Committing without validation |
| Artifact existence check | Claiming gate complete without files |
| Security scanner | Shipping P0 vulnerabilities |
| CI/CD required checks | Merging PRs without all gates |
| File content hashing | Empty artifact files |
| Git commit verification | Fake production deploy claims |

---

**Created:** 2026-02-09
**Status:** ACTIVE & ENFORCED
**Escalation:** Any violation = P0 incident report
