# 🦅 Ralph Protocol: Issues Log

**Last Updated**: 2026-01-30 (Architect Audit)
**Git HEAD**: `7dbfa22`

---

## 🚨 P0 BLOCKERS (Must Fix Before Phase 2)

| ID       | Status     | Priority | Description                                  | Owner       | Effort | Due Date   |
| :------- | :--------- | :------- | :------------------------------------------- | :---------- | :----- | :--------- |
| **P0-1** | `RESOLVED` | `P0`     | Mobile Menu doesn't close on route change    | Antigravity | 30 min | 2026-02-01 |
| **P0-2** | `RESOLVED` | `P0`     | Missing Gate 3 approval docs (Mobile Drawer) | Antigravity | 2 hrs  | 2026-02-01 |
| **P0-3** | `RESOLVED` | `P0`     | No production verification screenshots       | Antigravity | 3 hrs  | 2026-02-01 |

**BLOCKER DEADLINE**: February 1, 2026 EOD (48 hours)

---

## ⚠️ P1 ISSUES (Defer to Phase 2.1)

| ID       | Status     | Priority | Description                                | Owner       | Effort | Audit Ref      |
| :------- | :--------- | :------- | :----------------------------------------- | :---------- | :----- | :------------- |
| **P1-1** | `RESOLVED` | `P1`     | Username stale prop in MobileMenu          | Antigravity | 4 hrs  | Risk #1        |
| **P1-2** | `RESOLVED` | `P1`     | SearchInput hydration layout shift risk    | Antigravity | 3 hrs  | Risk #3        |
| **P1-3** | `RESOLVED` | `P1`     | Security audit: 8 dangerouslySetInnerHTML  | Antigravity | 6 hrs  | Security Law   |
| **P1-4** | `RESOLVED` | `P1`     | Add 5 new high-intent comparison pairs     | Antigravity | 24 hrs | Competitor Gap |
| **P1-5** | `OPEN`     | `P1`     | Implement Live Intelligence metadata badge | Antigravity | 8 hrs  | Strategy Audit |
| **P1-6** | `RESOLVED` | `P1`     | Enable Supabase RLS policies               | Antigravity | 4 hrs  | Security Risk  |

**Total P1 Effort**: 45 hours (~1.5 sprints)

---

## 🔒 RALPH PROTOCOL BREACHES

| Breach ID | Gate     | Description                          | Status | Remediation                                    |
| :-------- | :------- | :----------------------------------- | :----- | :--------------------------------------------- |
| **B-001** | Gate 3   | No implementation_plan.md for Drawer | `OPEN` | Create `phase_2_execution_report_mobile_ux.md` |
| **B-002** | Gate 9   | Missing UI proof screenshots         | `OPEN` | Capture on 3 devices + add to ui_verification  |
| **B-003** | Gate 9.5 | No production verification log       | `OPEN` | Test on prod URL + timestamped screenshots     |

---

## 📊 HISTORICAL ISSUES (Resolved)

| ID      | Status     | Priority | Description          | Owner       | Resolved Date |
| :------ | :--------- | :------- | :------------------- | :---------- | :------------ |
| **001** | `RESOLVED` | `P0`     | Protocol Restoration | Antigravity | 2026-01-28    |

---

## 📋 ISSUE DETAILS

### P0-1: Mobile Menu Route Change Bug

**File**: `src/components/MobileMenu.tsx:15`
**Problem**: `isOpen` state has no route listener. Menu stays open after navigation.

**Reproduction**:

1. Open mobile menu (☰)
2. Click any nav link
3. Menu remains open over new page

**Fix**:

```typescript
import { usePathname } from 'next/navigation';

const pathname = usePathname();
useEffect(() => {
  setIsOpen(false);
}, [pathname]);
```

**Impact**: Users cannot navigate properly on mobile
**Severity**: CRITICAL
**Reference**: Architect Audit Section I, Risk #2

---

### P0-2: Missing Blueprint Documentation

**Ralph Gate**: Gate 3 (Blueprint)
**Commit**: `3fa0020` - "feat(ui): Add Mobile Filter Drawer"

**Violation**: No `implementation_plan.md` created before code execution

**Required Deliverable**:

- Create: `docs/reports/phase_2_execution_report_mobile_ux.md`
- Include: Decision rationale, UX considerations, approval trail
- Update: Protocol compliance log

**Impact**: Protocol erosion, sets bad precedent
**Reference**: Architect Audit Section III, Gate Skip #1

---

### P0-3: Production Verification Missing

**Ralph Gate**: Gate 9.5 (Production Verification)

**Missing Evidence**:

- ❌ Mobile device testing on production URL
- ❌ Safari/Chrome mobile animation verification
- ❌ Layout shift testing on small screens
- ❌ Timestamped production screenshots

**Required Deliverable**:

- Create: `docs/reports/production_verification_mobile_ux.md`
- Test devices: iPhone SE, Pixel 5, iPad Mini
- Include: Screenshots with URL + timestamp visible

**Impact**: Cannot prove production quality
**Reference**: Architect Audit Section III, Gate Skip #3

---

### P1-3: Security Audit Required

**Ralph Commandment**: #2 - Security Law

**Files Requiring Audit** (8 total):

1. ✅ `src/components/Analytics.tsx` - Safe (static GA4)
2. ⚠️ `src/app/prompts/[slug]/page.tsx` - AUDIT NEEDED
3. ⚠️ `src/app/google-antigravity/page.tsx` - AUDIT NEEDED
4. ⚠️ `src/app/t/[slug]/page.tsx` - AUDIT NEEDED
5. ⚠️ `src/app/u/[username]/page.tsx` - AUDIT NEEDED
6. ⚠️ `src/app/categories/[slug]/page.tsx` - AUDIT NEEDED
7. ⚠️ `src/components/SubmitForm.tsx` - AUDIT NEEDED

**Action Plan**:

1. Install dompurify: `pnpm add dompurify @types/dompurify`
2. Create utility: `lib/utils/safeHtml.ts`
3. Audit each file for user-generated content
4. Replace UGC-related innerHTML with sanitized version
5. Create: `SECURITY-CHECKLIST [#002]`

**Risk**: Potential XSS if any file uses user input
**Reference**: Architect Audit Section III, Security Law Violation

---

### P1-4: Comparison Engine Expansion

**Strategic Gap**: Need 5 additional high-intent comparison pairs

**Target Comparisons** (in priority order):

1. **Claude vs ChatGPT** (Agentic Perspective)
   - Traffic: 500-800/mo
   - Revenue: $299-$598/mo
   - Effort: 5 hours

2. **GitHub Copilot vs Cursor**
   - Traffic: 300-500/mo
   - Revenue: $299-$498/mo
   - Effort: 4 hours

3. **Gemini 3 vs Claude 3.5 for Coding**
   - Traffic: 200-400/mo
   - Revenue: $199-$398/mo
   - Effort: 6 hours

4. **Vercel vs Netlify for AI Apps**
   - Traffic: 250-400/mo
   - Revenue: $199-$398/mo
   - Effort: 4 hours

5. **Supabase vs PlanetScale for Vector Search**
   - Traffic: 150-300/mo
   - Revenue: $99-$299/mo
   - Effort: 5 hours

**Total Impact**: +1,400-2,400 uniques/mo, +$1,095-$2,191/mo
**Reference**: Architect Audit Section IV

---

## 🔍 MONITORING & NEXT REVIEW

**Next Audit**: Phase 2 Week 2 (post-comparison launch)
**Status**: 🟡 CONDITIONAL GO - Awaiting P0 Resolution
**Responsible**: Antigravity Agent
**Review Frequency**: Weekly during Phase 2
