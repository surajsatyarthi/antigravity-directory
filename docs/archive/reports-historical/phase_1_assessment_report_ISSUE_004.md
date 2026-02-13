# Phase 1: Assessment Report - Issue 004

**Issue:** Security Audit: "dangerouslySetInnerHTML" Usage
**Rank:** 4 (Criticality)
**Date:** 2026-02-01
**Auditor:** Antigravity Agent

---

## 1. Physical Audit (Gate 1)

**Objective:** Identify all instances of `dangerouslySetInnerHTML` and verify compliance with Ralph Protocol (Law #2: No `dangerouslySetInnerHTML` without `dompurify`, Law #3: Use `safeJsonLd`).

**Scan Results:**
Found 7 source files using `dangerouslySetInnerHTML`:

1.  **`src/components/Analytics.tsx`**
    *   **Usage:** Inserting Google Analytics (GA4) initialization script.
    *   **Compliance:** 🔴 **FAIL**. Does not use `dompurify` or any sanitization. Direct violation of Law #2.
    *   **Risk:** Low (Env var injection), but strict protocol violation.

2.  **`src/components/SubmitForm.tsx`**
    *   **Usage:** Rendering FAQ answers.
    *   **Compliance:** ✅ **PASS**. Uses `safeHtml(faq.a)`. `safeHtml` uses `isomorphic-dompurify`.

3.  **`src/app/categories/[slug]/page.tsx`**
    *   **Usage:** JSON-LD injection.
    *   **Compliance:** ✅ **PASS**. Uses `safeJsonLd(jsonLd)`.

4.  **`src/app/google-antigravity/page.tsx`**
    *   **Usage:** JSON-LD injection.
    *   **Compliance:** ✅ **PASS**. Uses `safeJsonLd(jsonLd)`.

5.  **`src/app/prompts/[slug]/page.tsx`**
    *   **Usage:** JSON-LD injection.
    *   **Compliance:** ✅ **PASS**. Uses `safeJsonLd()`.

6.  **`src/app/u/[username]/page.tsx`**
    *   **Usage:** JSON-LD injection.
    *   **Compliance:** ✅ **PASS**. Uses `safeJsonLd()`.

7.  **`src/app/t/[slug]/page.tsx`**
    *   **Usage:** JSON-LD injection (3 instances).
    *   **Compliance:** ✅ **PASS**. Uses `safeJsonLd()`.

**Dependencies:**
- `isomorphic-dompurify` (Used in `safeHtml`)
- `safeHtml` (Utility)
- `safeJsonLd` (Utility)

---

## 2. Logic Mapping (Gate 2)

**Problem:** `Analytics.tsx` cannot use `safeHtml` because `safeHtml` strips `<script>` tags, which are required for GA4.
**Solution Strategy:** Eliminate `dangerouslySetInnerHTML` entirely by migrating to `@next/third-parties/google`.
**Alternative:** Create a specific `safeScript` utility, but the library approach is cleaner and recommended by Next.js.

**Research (Web Search Required):**
1.  "next/third-parties google analytics implementation"
2.  "ralph protocol exception for analytics scripts" (Internal check: No exception found in playbook).

**Impact Analysis:**
- changing `Analytics.tsx` requires verifying that events still fire.
- `src/components/Analytics.tsx` currently handles:
    1.  Vercel Analytics (`<VercelAnalytics />`)
    2.  GA4 Script Injection
    3.  Custom Event: `ai_citation_visit`
    4.  Pageview tracking on route change.

**Plan Preview:**
- Install `@next/third-parties` (if not present).
- Replace manual `<script>` in `Analytics.tsx` with `<GoogleAnalytics gaId={...} />`.
- Ensure custom events in `useEffect` still work (they rely on `window.gtag`, which `@next/third-parties` provides).

---

## 3. Conclusion

We have one confirmed violation to fix in `src/components/Analytics.tsx`. The other files are compliant but served as a good audit baseline.
