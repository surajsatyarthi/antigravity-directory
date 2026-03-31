SESSION-PROTOCOL-CONFIRMED: 2026-03-31

# CURRENT TASK — TASK-117: Fix Canonical Tags — Remove Layout Poison, Add to 11 Pages

## RESEARCH
- Web: Query: "Next.js 15 canonical tag inheritance layout metadata alternates fix duplicate canonical" → URL: https://nextjs.org/docs/app/api-reference/functions/generate-metadata → Finding: "Metadata objects exported from multiple segments in the same route are shallowly merged together. Duplicate keys are replaced based on their ordering. This means metadata with nested fields such as openGraph and robots that are defined in an earlier segment are overwritten by the last segment to define them."
- Reddit: Not accessible from PM (Claude Code). Reddit research delegated to Antigravity for future reference.
- Twitter/X: Query: "Next.js canonical tag layout poisoning SEO fix 2026" → URL: https://dev.to/federico_sciuca/the-nextjs-seo-bug-that-made-google-ignore-my-entire-site-and-how-i-found-it-2mg0 → Finding: "Google Search Console reported: 'Duplicate without user-selected canonical' with the user-declared canonical showing as 'None' — despite the tag being present in the final HTML." (Root cause: layout canonical inherited by all child pages that don't define their own.)

## WHAT TO BUILD
Remove `alternates: { canonical: '/' }` from `src/app/layout.tsx`. This single line poisons every page that does not define its own canonical — Google sees those pages as duplicates of the homepage. Then add a correct absolute canonical to the 11 pages that currently have none: `/advertise`, `/submit`, `/privacy`, `/terms`, `/google-antigravity`, `/tools`, and the 5 tools subpages. Also convert `/privacy` and `/terms` from `'use client'` to server components (they use no client hooks — confirmed by grep) so they can export static metadata. This fixes 23 "Duplicate without user-selected canonical" errors in GSC and unblocks those 11 pages for indexing.

## TECHNICAL SPEC

**Important**: Make each file change independently, one file at a time. Build must pass after all changes.

---

### File 1: `src/app/layout.tsx`

Remove the `alternates` block from the root metadata export (lines 55–57).

**Find and remove these 3 lines exactly** (they appear inside the `export const metadata` object):
```
  alternates: {
    canonical: '/',
  },
```
After removal the metadata object should jump directly from the `verification` block to the closing `};`.

---

### File 2: `src/app/advertise/page.tsx`

Add `alternates` to the existing `metadata` export. Find the closing of the `openGraph` block and add before the final `};`:

**Old**:
```typescript
  openGraph: {
    title: 'Advertise on Antigravity Directory',
    description: 'The only Antigravity IDE directory. Reach every developer building with Google Antigravity IDE.',
    images: ['/og-image.png'],
  },
};
```

**New**:
```typescript
  openGraph: {
    title: 'Advertise on Antigravity Directory',
    description: 'The only Antigravity IDE directory. Reach every developer building with Google Antigravity IDE.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.googleantigravity.directory/advertise',
  },
};
```

---

### File 3: `src/app/google-antigravity/page.tsx`

Add `alternates` to the existing `metadata` export. Also add the missing comma after the `openGraph` closing brace.

**Old**:
```typescript
  openGraph: {
    title: "Antigravity: The Complete Guide",
    description: "Master Google Antigravity IDE with our comprehensive guide. Everything you need to know about Gemini 3 agentic development.",
    type: "article",
    url: "https://www.googleantigravity.directory/google-antigravity",
  }
};
```

**New**:
```typescript
  openGraph: {
    title: "Antigravity: The Complete Guide",
    description: "Master Google Antigravity IDE with our comprehensive guide. Everything you need to know about Gemini 3 agentic development.",
    type: "article",
    url: "https://www.googleantigravity.directory/google-antigravity",
  },
  alternates: {
    canonical: 'https://www.googleantigravity.directory/google-antigravity',
  },
};
```

---

### File 4: `src/app/privacy/page.tsx`

Remove `'use client'` (line 1 — this page has no hooks, no state, no browser APIs — confirmed safe). Add `Metadata` import and `metadata` export.

**Old** (first 5 lines of file):
```typescript
'use client';

import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
```

**New** (replace with):
```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.googleantigravity.directory/privacy',
  },
};

export default function PrivacyPage() {
```

---

### File 5: `src/app/terms/page.tsx`

Same pattern as File 4.

**Old** (first 5 lines of file):
```typescript
'use client';

import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
```

**New** (replace with):
```typescript
import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.googleantigravity.directory/terms',
  },
};

export default function TermsPage() {
```

---

### File 6: `src/app/submit/page.tsx`

This is a server component with no `metadata` export. Add `Metadata` import and `metadata` export after existing imports.

**Old** (lines 1–9):
```typescript
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { SubmitForm } from '@/components/SubmitForm';


export default async function SubmitPage() {
```

**New** (replace with):
```typescript
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { db } from '@/lib/db';
import { categories } from '@/drizzle/schema';
import { SubmitForm } from '@/components/SubmitForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.googleantigravity.directory/submit',
  },
};

export default async function SubmitPage() {
```

---

### File 7: `src/app/tools/page.tsx`

Add `alternates` to the existing `metadata` export.

**Old**:
```typescript
export const metadata = {
  title: 'Free AI Developer Tools | Antigravity',
  description: 'Essential utilities for AI engineering: Token counters, pricing calculators, and prompt optimizers.',
};
```

**New**:
```typescript
export const metadata = {
  title: 'Free AI Developer Tools | Antigravity',
  description: 'Essential utilities for AI engineering: Token counters, pricing calculators, and prompt optimizers.',
  alternates: {
    canonical: 'https://www.googleantigravity.directory/tools',
  },
};
```

---

### File 8: `src/app/tools/json-to-pydantic/page.tsx`

**Old**:
```typescript
export const metadata = {
  title: 'JSON to Pydantic Converter | Antigravity Tools',
  description: 'Convert JSON objects to Python Pydantic v2 models instantly. Supports nested objects, lists, and type inference for AI engineering workflows.',
};
```

**New**:
```typescript
export const metadata = {
  title: 'JSON to Pydantic Converter | Antigravity Tools',
  description: 'Convert JSON objects to Python Pydantic v2 models instantly. Supports nested objects, lists, and type inference for AI engineering workflows.',
  alternates: {
    canonical: 'https://www.googleantigravity.directory/tools/json-to-pydantic',
  },
};
```

---

### File 9: `src/app/tools/prompt-generator/page.tsx`

**Old**:
```typescript
export const metadata = {
  title: 'AI Prompt Optimizer',
  description: 'Turn basic prompts into professional system instructions using Google Gemini 1.5 Flash.',
};
```

**New**:
```typescript
export const metadata = {
  title: 'AI Prompt Optimizer',
  description: 'Turn basic prompts into professional system instructions using Google Gemini 1.5 Flash.',
  alternates: {
    canonical: 'https://www.googleantigravity.directory/tools/prompt-generator',
  },
};
```

---

### File 10: `src/app/tools/rag-visualizer/page.tsx`

**Old**:
```typescript
export const metadata = {
  title: 'RAG Text Chunking Visualizer',
  description: 'Visualize how your text is split for Vector Databases using different chunk sizes and overlap settings.',
};
```

**New**:
```typescript
export const metadata = {
  title: 'RAG Text Chunking Visualizer',
  description: 'Visualize how your text is split for Vector Databases using different chunk sizes and overlap settings.',
  alternates: {
    canonical: 'https://www.googleantigravity.directory/tools/rag-visualizer',
  },
};
```

---

### File 11: `src/app/tools/roi-calculator/page.tsx`

**Old**:
```typescript
export const metadata = {
  title: 'LLM Cost & ROI Calculator',
  description: 'Compare API costs for OpenAI, Anthropic, Gemini, and Llama models. Calculate monthly expenses based on your token usage.',
};
```

**New**:
```typescript
export const metadata = {
  title: 'LLM Cost & ROI Calculator',
  description: 'Compare API costs for OpenAI, Anthropic, Gemini, and Llama models. Calculate monthly expenses based on your token usage.',
  alternates: {
    canonical: 'https://www.googleantigravity.directory/tools/roi-calculator',
  },
};
```

---

### File 12: `src/app/tools/token-counter/page.tsx`

**Old**:
```typescript
export const metadata = {
  title: 'TikToken Counter',
  description: 'Real-time token counting using OpenAI tiktoken logic. Estimate API costs for GPT-4 instantly.',
};
```

**New**:
```typescript
export const metadata = {
  title: 'TikToken Counter',
  description: 'Real-time token counting using OpenAI tiktoken logic. Estimate API costs for GPT-4 instantly.',
  alternates: {
    canonical: 'https://www.googleantigravity.directory/tools/token-counter',
  },
};
```

---

### Build + Lint + HTTP check

After all 12 file changes:

```bash
pnpm build 2>&1 | tee temp/task117_build.log
pnpm lint 2>&1 | tee temp/task117_lint.log
```

Start dev server and verify canonical tags in HTML:

```bash
curl -s http://localhost:3000/advertise | grep -o 'canonical[^"]*"[^"]*"' | tee temp/task117_canonical.txt
curl -s http://localhost:3000/privacy | grep -o 'canonical[^"]*"[^"]*"' >> temp/task117_canonical.txt
curl -s http://localhost:3000/submit | grep -o 'canonical[^"]*"[^"]*"' >> temp/task117_canonical.txt
curl -s http://localhost:3000/terms | grep -o 'canonical[^"]*"[^"]*"' >> temp/task117_canonical.txt
curl -s http://localhost:3000/google-antigravity | grep -o 'canonical[^"]*"[^"]*"' >> temp/task117_canonical.txt
curl -s http://localhost:3000/tools | grep -o 'canonical[^"]*"[^"]*"' >> temp/task117_canonical.txt
curl -s http://localhost:3000/tools/token-counter | grep -o 'canonical[^"]*"[^"]*"' >> temp/task117_canonical.txt
```

Each line in `temp/task117_canonical.txt` must show the page's own URL, NOT `/`.

Also verify layout no longer emits `canonical: '/'` for a page that has its own:
```bash
curl -s http://localhost:3000/advertise | grep 'canonical' | tee -a temp/task117_canonical.txt
```
Must show exactly ONE canonical link (not two — no duplicate from layout).

---

## QA — PLAYWRIGHT TESTS
- Test 1: navigate to `http://localhost:3000/advertise` → check page source → expect `<link rel="canonical" href="https://www.googleantigravity.directory/advertise"/>`
- Test 2: navigate to `http://localhost:3000/privacy` → check page source → expect `<link rel="canonical" href="https://www.googleantigravity.directory/privacy"/>`
- Test 3: navigate to `http://localhost:3000/tools/token-counter` → check page source → expect `<link rel="canonical" href="https://www.googleantigravity.directory/tools/token-counter"/>`
- Test 4: navigate to `http://localhost:3000/` → check page source → expect canonical is `https://www.googleantigravity.directory` (homepage still correct, not broken)

## RETROGRADE CHECK
- Who is this code for? Google's crawler, not users. These are HTML meta tags — no user sees them. But they directly affect which pages Google considers canonical and whether they get indexed.
- Adjacent dead code: none.
- Antigravity action: none. After Antigravity commits, PM will submit affected URLs to Google Search Console for re-indexing.

## SCREENSHOTS
NONE — this task changes only HTML metadata (server-rendered `<link rel="canonical">` tags). No visual UI changes. Verification is via `temp/task117_canonical.txt` content.

## ACCEPTANCE CRITERIA
- [ ] `src/app/layout.tsx` no longer contains `alternates: { canonical: '/' }` — verified by: `git diff src/app/layout.tsx` showing 3 lines removed
- [ ] `/advertise` canonical in HTML is `https://www.googleantigravity.directory/advertise` — verified by: `temp/task117_canonical.txt` line 1
- [ ] `/privacy` canonical in HTML is `https://www.googleantigravity.directory/privacy` — verified by: `temp/task117_canonical.txt` line 2
- [ ] `/submit` canonical in HTML is `https://www.googleantigravity.directory/submit` — verified by: `temp/task117_canonical.txt` line 3
- [ ] `/terms` canonical in HTML is `https://www.googleantigravity.directory/terms` — verified by: `temp/task117_canonical.txt` line 4
- [ ] `/google-antigravity` canonical in HTML is `https://www.googleantigravity.directory/google-antigravity` — verified by: `temp/task117_canonical.txt` line 5
- [ ] `/tools` canonical in HTML is `https://www.googleantigravity.directory/tools` — verified by: `temp/task117_canonical.txt` line 6
- [ ] `/tools/token-counter` canonical in HTML is `https://www.googleantigravity.directory/tools/token-counter` — verified by: `temp/task117_canonical.txt` line 7
- [ ] Build exit 0 — verified by: `temp/task117_build.log` last line
- [ ] Lint exit 0 — verified by: `temp/task117_lint.log` last line

## QUESTIONS FROM ANTIGRAVITY

## PM ANSWERS
