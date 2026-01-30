# SECURITY-CHECKLIST [#002]: dangerouslySetInnerHTML Audit

**Date**: 2026-01-30
**Ralph Protocol**: Commandment #2 - Security Law
**Status**: IN PROGRESS
**Priority**: P1 (Executed in Weekend Sprint)

---

## Executive Summary

**Files Audited**: 7 total (1 safe, 6 requiring review)
**High-Risk Findings**: [Pending Audit]
**Remediation Actions**: [Pending Audit]
**Status**: NEEDS FIXES

---

## Audit Methodology

1. Search for `dangerouslySetInnerHTML` in codebase
2. Trace data source (static vs user-generated content)
3. Classify risk level:
   - ✅ **SAFE**: Static content only
   - ⚠️ **LOW RISK**: Server-controlled, no UGC
   - 🚨 **HIGH RISK**: User-generated content (UGC)
4. Apply fixes for HIGH RISK findings
5. Document all findings

---

## Audit Results

### File 1: `src/components/Analytics.tsx`

**Status**: ✅ SAFE
**Code Context**:

```typescript
<script dangerouslySetInnerHTML={{ __html: `window.dataLayer = ...` }} />
```

**Justification**: Hardcoded analytics snippet, no user input.

### File 2: `src/app/prompts/[slug]/page.tsx`

**Status**: ✅ SAFE
**Code Context**: Static content from `PROMPTS` constant.
**Action**: None required.

### File 3: `src/app/google-antigravity/page.tsx`

**Status**: ✅ SAFE
**Code Context**: Static content from `jsonLd` object.
**Action**: None required.

### File 4: `src/app/t/[slug]/page.tsx`

**Status**: 🚨 HIGH RISK (Fixed)
**Risk Level**: High (User-generated content in JSON-LD)
**Data Source**: `resource.description` (DB)
**Action**: Applied `safeJsonLdString()` to title, description, and category.

### File 5: `src/app/u/[username]/page.tsx`

**Status**: 🚨 HIGH RISK (Fixed)
**Risk Level**: High (User-generated content in JSON-LD)
**Data Source**: `user.bio` (DB)
**Action**: Applied `safeJsonLdString()` to name and bio.

### File 6: `src/app/categories/[slug]/page.tsx`

**Status**: 🚨 HIGH RISK (Fixed)
**Risk Level**: High (User-generated content in JSON-LD)
**Data Source**: `category.description` (DB)
**Action**: Applied `safeJsonLdString()` to name and description.

### File 7: `src/components/SubmitForm.tsx`

**Status**: ✅ SAFE
**Code Context**: Static content from `FAQS` constant.
**Action**: None required.

---

## High-Risk Findings Summary

- **3 files** identified with potential XSS via JSON-LD injection.
- **Root Cause**: Unsanitized database content passed to `JSON.stringify` inside `<script>` tags.
- **Fix**: Implemented `safeJsonLdString` utility to escape unsafe characters.

---

## Remediation Actions

### Action 1: Install DOMPurify

```bash
pnpm add dompurify @types/dompurify jsdom @types/jsdom
```

**Status**: ✅ Complete

### Action 2: Create Safe HTML Utility

**File**: `src/lib/utils/safeHtml.ts` (Created)

- Includes `safeHtml` (DOMPurify)
- Includes `safeJsonLdString` (JSON-LD escaping)

### Action 3: Apply Fixes to High-Risk Files

- `src/app/t/[slug]/page.tsx`: Fixed
- `src/app/u/[username]/page.tsx`: Fixed
- `src/app/categories/[slug]/page.tsx`: Fixed

---

## Conclusion

**Risk Status Before Audit**: 🚨 6 files unknown risk
**Risk Status After Audit**: ✅ All known risks mitigated
