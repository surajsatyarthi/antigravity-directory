# 📦 BATCH 1.1: METADATA OPTIMIZATION

**Phase:** SEO Foundation (Days 1-2)
**Total Time:** 6 hours
**Status:** 🟡 PENDING
**Last Updated:** January 27, 2026

---

## ⚡ QUICK START

**Execute in 3 sessions (Antigravity can't auto-switch models):**

| Session | Model             | Tasks                            | Time      |
| ------- | ----------------- | -------------------------------- | --------- |
| 1️⃣      | Gemini Flash 2.0  | 1.1.1 + 1.1.2 (Metadata updates) | 45 min    |
| 2️⃣      | Claude Sonnet 4.5 | 1.1.3 + 1.1.4 (Hero + Hub page)  | 2.5 hours |
| 3️⃣      | Manual            | 1.1.5 + 1.1.6 (GSC + Deploy)     | 1 hour    |

**After all 3 sessions:** Zip evidence folder and submit for review.

---

## 🤖 INSTRUCTIONS FOR EXECUTION

**IMPORTANT: Antigravity CANNOT auto-switch models. Execute in 3 separate sessions:**

### **SESSION 1: Gemini Flash Tasks (45 min)**

1. Open project in Antigravity
2. Select model: **Gemini Flash 2.0**
3. Run: `mkdir -p evidence`
4. Say: "Read BATCH_1.1_METADATA_OPTIMIZATION.md, execute GROUP A tasks (1.1.1 and 1.1.2), and collect evidence"

### **SESSION 2: Claude Sonnet Tasks (2.5 hours)**

1. Switch model to: **Claude Sonnet 4.5**
2. Say: "Read BATCH_1.1_METADATA_OPTIMIZATION.md, execute GROUP B tasks (1.1.3 and 1.1.4), and collect evidence"

### **SESSION 3: Manual Tasks (1 hour)**

1. Manually complete:
   - Task 1.1.5: Google Search Console submission (follow instructions in doc)
   - Task 1.1.6: Git commit and deploy (run terminal commands)
2. Collect evidence for both tasks

### **SESSION 4: Package Evidence**

1. Run: `cd evidence && zip -r ../evidence.zip . && cd ..`
2. Share `evidence.zip` with Product Manager for review

**DO NOT skip evidence collection. DO NOT take screenshots of terminal outputs. Follow instructions exactly.**

---

## 🎯 BATCH OVERVIEW

**Goal:** Establish "Google Antigravity" keyword dominance across all metadata, create hero section, launch first hub page, and verify Google Search Console.

**Success Criteria:**

- ✅ "Google Antigravity" appears 10+ times across metadata
- ✅ Hero section with H1 tag live on homepage
- ✅ /google-antigravity hub page live with FAQPage schema
- ✅ Google Search Console verified
- ✅ All changes deployed to production

**Token Budget:** ~50K tokens (Gemini Flash FREE, Claude Sonnet ~40K)

---

## 📸 EVIDENCE COLLECTION STRATEGY

**CRITICAL: Antigravity must create evidence folder BEFORE starting tasks:**

```bash
mkdir -p evidence
```

**Evidence Types:**

1. **Terminal Outputs → TEXT FILES** (grep, git diff, build logs, curl outputs)
   - Saves tokens during Product Manager review
   - Easy to parse and verify
   - Must redirect output to evidence/\*.txt files

2. **Visual Elements → SCREENSHOTS** (UI, pages, GSC dashboard)
   - ONLY for things that need visual verification
   - Maximum 6-7 screenshots for entire batch
   - Save as evidence/\*.png files

**File Naming Convention:**

- `1.1.X_description.txt` for terminal outputs
- `1.1.X_description.png` for screenshots

**Batch 1.1 Expected Evidence Files:**

- 10-12 text files (~5-10KB total)
- 6-7 screenshots (~2-3MB total)
- Total review tokens: ~10K (efficient!)

---

## 📋 TASK LIST

---

## 🔄 MODEL SWITCHING WORKFLOW

**Antigravity CANNOT auto-switch models. You must manually select the model for each group.**

### **GROUP A: GEMINI FLASH TASKS (30-45 min)**

Switch Antigravity to: **Gemini Flash 2.0**

Execute in sequence:

- ✅ Task 1.1.1: Update Root Layout Metadata (30 min)
- ✅ Task 1.1.2: Update Homepage Metadata (15 min)

**After completing Group A → SWITCH MODEL**

---

### **GROUP B: CLAUDE SONNET TASKS (2.5 hours)**

Switch Antigravity to: **Claude Sonnet 4.5**

Execute in sequence:

- ✅ Task 1.1.3: Add Hero Section (1 hour)
- ✅ Task 1.1.4: Create /google-antigravity Hub Page (1.5 hours)

**After completing Group B → MANUAL TASKS**

---

### **GROUP C: MANUAL TASKS (1 hour)**

No model needed:

- ✅ Task 1.1.5: Submit to Google Search Console (30 min)
- ✅ Task 1.1.6: Git Commit & Deploy (30 min)

---

## 📋 DETAILED TASK SPECIFICATIONS

### **TASK 1.1.1: Update Root Layout Metadata**

- **File:** `src/app/layout.tsx` (lines 17-52)
- **Model:** Gemini Flash 2.0 (Primary) | Gemini Pro (Backup)
- **Priority:** 🔴 CRITICAL
- **Time:** 30 minutes

#### Detailed Prompt:

```
Read src/app/layout.tsx and update the metadata object (lines 17-52) with the following changes:

1. Change metadataBase to: new URL('https://googleantigravity.directory')
2. Update title.template to: "%s | Google Antigravity Directory"
3. Update title.default to: "Google Antigravity Directory | MCP Servers, Rules & Prompts"
4. Update description to: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, and prompts for Gemini 3-powered agentic development."
5. Add keywords array: ["google antigravity", "antigravity ide", "mcp servers", "antigravity rules", "gemini 3", "ai coding", "agentic development", "antigravity prompts", "mcp directory"]
6. Update all OpenGraph and Twitter metadata to match new branding

Preserve all existing structure and only modify the content values.

EVIDENCE COLLECTION (mandatory - run these commands after completing the task):
1. Run: grep "Google Antigravity" src/app/layout.tsx > evidence/1.1.1_grep_output.txt
2. Run: git diff src/app/layout.tsx > evidence/1.1.1_git_diff.txt
3. Run: wc -w src/app/layout.tsx >> evidence/1.1.1_grep_output.txt
4. Verify no TypeScript errors by checking terminal output

Save all terminal outputs as TEXT files in evidence/ folder. Do NOT take screenshots of terminal.
```

#### Ralph Protocol v3.3 Evidence Required (SSOT):

```bash
# Gate 1: Physical Audit (Audit metadata state)
grep "Google Antigravity" src/app/layout.tsx
grep "googleantigravity.directory" src/app/layout.tsx

# Gate 6.5-7: Execution Proof
git diff src/app/layout.tsx
wc -w src/app/layout.tsx
```

#### Evidence Package Checklist:

- [ ] Terminal screenshot showing grep results with "Google Antigravity" present
- [ ] Git diff showing before/after metadata
- [ ] Keyword count = 9 keywords in array
- [ ] No TypeScript errors in terminal

---

### **TASK 1.1.2: Update Homepage Metadata**

- **File:** `src/app/page.tsx` (lines 29-32)
- **Model:** Gemini Flash 2.0 (Primary) | Gemini Pro (Backup)
- **Priority:** 🔴 CRITICAL
- **Time:** 15 minutes

#### Detailed Prompt:

```
Read src/app/page.tsx and update the generateMetadata function (around line 29-32) to return:

{
  title: "Google Antigravity Directory - 500+ Curated MCP Servers & AI Tools",
  description: "The complete resource hub for Google Antigravity IDE. Discover 500+ curated MCP servers, coding rules, prompts, and workflows for Gemini 3-powered agentic development. Free resources for developers.",
  openGraph: {
    title: "Google Antigravity Directory - 500+ Curated Resources",
    description: "The complete resource hub for Google Antigravity IDE. 500+ MCP servers, rules, and prompts.",
    type: "website"
  }
}

Ensure this is SEO-optimized for the main homepage.

EVIDENCE COLLECTION (mandatory - run these commands after completing the task):
1. Run: grep "Google Antigravity Directory" src/app/page.tsx > evidence/1.1.2_grep_output.txt
2. Run: git diff src/app/page.tsx > evidence/1.1.2_git_diff.txt
3. Run: npm run build 2>&1 | tail -20 > evidence/1.1.2_build_log.txt
4. Count description characters and add to evidence file

Save all terminal outputs as TEXT files in evidence/ folder. Do NOT take screenshots of terminal.
```

#### Ralph Protocol v3.3 Evidence Required (SSOT):

```bash
# Gate 1: Physical Audit
grep "Google Antigravity Directory" src/app/page.tsx

# Gate 7: Implementation Proof
git diff src/app/page.tsx
npm run build
```

#### Evidence Package Checklist:

- [ ] Terminal screenshot showing grep match
- [ ] Git diff output
- [ ] Build success log
- [ ] Description character count = 150-160 chars

---

### **TASK 1.1.3: Add Hero Section to DirectoryIntelligence**

- **File:** `src/components/DirectoryIntelligence.tsx`
- **Model:** Claude Sonnet 4.5 (Primary) | Claude Opus (Backup)
- **Priority:** 🔴 CRITICAL
- **Time:** 1 hour

#### Detailed Prompt:

```
Read src/components/DirectoryIntelligence.tsx and add a hero section at the top of the component (before the existing content).

Hero section requirements:
1. Black gradient background (from #000000 to #0A0A0A)
2. Large H1: "Google Antigravity Directory" (text-4xl font-black)
3. Subtitle: "The Complete Resource Hub for Gemini 3-Powered Agentic Development" (text-xl text-gray-400)
4. 3 stat badges in a row:
   - "🤖 Gemini 3 Powered"
   - "📦 500+ Resources"
   - "⚡ Updated Daily"
5. Search bar (reuse existing search input from component)
6. Spacing: py-16 for desktop, py-8 for mobile

Design style: Match the existing dark theme, use lucide-react icons, keep it clean and modern.

EVIDENCE COLLECTION (mandatory - run these commands after completing the task):
1. Run: git diff src/components/DirectoryIntelligence.tsx > evidence/1.1.3_git_diff.txt
2. Run: grep -i "Google Antigravity Directory" src/components/DirectoryIntelligence.tsx > evidence/1.1.3_grep_output.txt
3. Run: npm run build 2>&1 | tail -20 > evidence/1.1.3_build_log.txt
4. SCREENSHOT ONLY: Take screenshot of http://localhost:3000 showing hero section (save as evidence/1.1.3_hero_screenshot.png)
5. SCREENSHOT ONLY: Browser inspect element showing H1 tag (save as evidence/1.1.3_h1_tag.png)

Save terminal outputs as TEXT files. Only take 2 screenshots for visual verification.
```

#### Competitor Reference:

antigravity.codes has NO hero section - this is our opportunity to beat them on UX and SEO (H1 tag advantage).

#### Ralph Protocol Evidence Required:

```bash
# Run these commands:
git diff src/components/DirectoryIntelligence.tsx
grep -i "Google Antigravity Directory" src/components/DirectoryIntelligence.tsx
npm run build
# Screenshot of http://localhost:3000 showing hero section
```

#### Evidence Package Checklist:

- [ ] Git diff showing hero section addition
- [ ] Build success log (no TypeScript errors)
- [ ] Screenshot of homepage with hero section visible
- [ ] H1 tag present (verify with browser inspect element screenshot)
- [ ] Mobile responsive check (screenshot at 375px width)

---

### **TASK 1.1.4: Create /google-antigravity Hub Page**

- **File:** `src/app/google-antigravity/page.tsx` (NEW FILE)
- **Model:** Claude Sonnet 4.5 (Primary) | Claude Opus (Backup)
- **Priority:** 🔴 CRITICAL
- **Time:** 1.5 hours

#### Detailed Prompt:

```
Create a new file at src/app/google-antigravity/page.tsx with a comprehensive hub page about Google Antigravity.

Requirements:
1. Metadata: title="What is Google Antigravity? Complete Guide", description with keywords
2. H1: "Google Antigravity: The Complete Guide"
3. Table of Contents (4-5 sections)
4. Sections:
   - What is Google Antigravity?
   - Key Features (Gemini 3, MCP Servers, Agentic Development)
   - Getting Started Guide
   - Best Resources (link to /mcp-servers, /rules, /prompts)
   - FAQ section
5. Internal links to other pages
6. CTA: "Browse 500+ Resources" button
7. JSON-LD structured data (FAQPage schema with 5 FAQs)

Style: Use Tailwind, dark theme, match existing component design patterns.
Word count target: 1,500-2,000 words for SEO depth.

EVIDENCE COLLECTION (mandatory - run these commands after completing the task):
1. Run: ls -lh src/app/google-antigravity/page.tsx > evidence/1.1.4_file_creation.txt
2. Run: cat src/app/google-antigravity/page.tsx | head -50 > evidence/1.1.4_file_preview.txt
3. Run: grep "FAQPage" src/app/google-antigravity/page.tsx >> evidence/1.1.4_file_creation.txt
4. Run: npm run build 2>&1 | tail -20 > evidence/1.1.4_build_log.txt
5. Run: wc -w src/app/google-antigravity/page.tsx >> evidence/1.1.4_file_creation.txt
6. SCREENSHOT ONLY: Take screenshot of http://localhost:3000/google-antigravity (save as evidence/1.1.4_page_screenshot.png)

Save terminal outputs as TEXT files. Only take 1 screenshot for page verification.
```

#### Competitor Reference:

antigravity.codes does NOT have this page. This is a MASSIVE SEO opportunity - will rank for "what is google antigravity" and capture informational search intent.

#### Ralph Protocol Evidence Required:

```bash
# Run these commands:
ls -lh src/app/google-antigravity/page.tsx
cat src/app/google-antigravity/page.tsx | head -50
grep "FAQPage" src/app/google-antigravity/page.tsx
npm run build
curl http://localhost:3000/google-antigravity | grep "Google Antigravity"
wc -w src/app/google-antigravity/page.tsx
```

#### Evidence Package Checklist:

- [ ] File creation proof (`ls -lh` output)
- [ ] First 50 lines preview (`cat | head`)
- [ ] Build success log
- [ ] Screenshot of http://localhost:3000/google-antigravity
- [ ] FAQPage schema present (grep output)
- [ ] Word count = 400-500 words in code (renders 1500-2000)
- [ ] Internal links working (click test video/screenshots)

---

### **TASK 1.1.5: Submit to Google Search Console**

- **Platform:** Google Search Console
- **Model:** N/A (Manual task)
- **Priority:** 🔴 CRITICAL
- **Time:** 30 minutes

#### Step-by-Step Instructions:

```
1. Go to https://search.google.com/search-console
2. Add property: googleantigravity.directory
3. Verification method: HTML tag (add to src/app/layout.tsx in <head>)
   OR DNS TXT record (if you control DNS)
4. Submit sitemap: https://googleantigravity.directory/sitemap.xml
5. Request indexing for:
   - Homepage (/)
   - /google-antigravity
   - /mcp-servers
6. Enable email alerts for crawl errors

EVIDENCE COLLECTION (mandatory - manual task requires screenshots only):
1. SCREENSHOT: GSC dashboard showing "Property verified" (save as evidence/1.1.5_gsc_verified.png)
2. SCREENSHOT: Sitemap submitted successfully (save as evidence/1.1.5_sitemap_submitted.png)
3. SCREENSHOT: "Request Indexing" confirmation for homepage (save as evidence/1.1.5_indexing_request.png)
4. If using HTML method, save git diff of layout.tsx showing verification tag

Take 3 screenshots total. Ensure date stamps are visible in screenshots.
```

#### Competitor Reference:

antigravity.codes has GSC verified + 480K indexed pages = their SEO moat. We MUST start indexing NOW to compete.

#### Ralph Protocol Evidence Required:

```
No terminal commands needed (manual task).
Screenshots only.
```

#### Evidence Package Checklist:

- [ ] Screenshot: GSC dashboard showing "Property verified"
- [ ] Screenshot: Sitemap submitted successfully
- [ ] Screenshot: "Request Indexing" confirmation for homepage
- [ ] HTML verification tag added to layout.tsx (if using HTML method)
- [ ] Date stamp visible in screenshots

---

### **TASK 1.1.6: Git Commit & Deploy**

- **Platform:** Git + Vercel/Production
- **Model:** N/A (Terminal commands)
- **Priority:** 🔴 CRITICAL
- **Time:** 30 minutes

#### Terminal Commands Sequence:

```bash
# 1. Stage changes
git add src/app/layout.tsx src/app/page.tsx src/components/DirectoryIntelligence.tsx src/app/google-antigravity/

# 2. Provenance Flow Block (MANDATORY per Ralph Protocol)
date
git rev-parse --short HEAD

# 3. Create commit with proper message
git commit -m "feat: implement Batch 1.1 - Google Antigravity SEO foundation

- Update root layout metadata with Google Antigravity keywords
- Update homepage metadata for SEO optimization
- Add hero section to DirectoryIntelligence component
- Create /google-antigravity hub page with FAQPage schema
- Verify Google Search Console and submit sitemap

SEO Impact: Target 'google antigravity' keyword cluster
Ralph Protocol: Phase 1 Gate 1 (Assessment) complete

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. Push to production
git push origin main

# 5. Verify deployment (if using Vercel)
# Wait 2-3 minutes, then:
curl -I https://googleantigravity.directory/
curl https://googleantigravity.directory/ | grep "Google Antigravity"
curl https://googleantigravity.directory/google-antigravity | grep "Complete Guide"

EVIDENCE COLLECTION (mandatory - run these commands after deployment):
1. Run: date > evidence/1.1.6_provenance.txt
2. Run: git rev-parse --short HEAD >> evidence/1.1.6_provenance.txt
3. Run: git log -1 --oneline >> evidence/1.1.6_provenance.txt
4. Run: git push origin main 2>&1 > evidence/1.1.6_push_log.txt
5. Run: curl -I https://googleantigravity.directory/ > evidence/1.1.6_deployment_verification.txt
6. Run: curl https://googleantigravity.directory/ | grep "Google Antigravity" >> evidence/1.1.6_deployment_verification.txt
7. SCREENSHOT ONLY: Live homepage with hero visible (save as evidence/1.1.6_live_homepage.png)

Save all terminal outputs as TEXT files. Only take 1 screenshot of live site.
```

#### Ralph Protocol Evidence Required:

```bash
# Provenance Flow Block (MANDATORY):
date  # Must show current timestamp
git rev-parse --short HEAD  # Must show commit hash

# Deployment verification:
git log -1 --oneline  # Show last commit
curl -I https://googleantigravity.directory/  # Must return 200 OK
```

#### Evidence Package Checklist:

- [ ] Provenance Flow Block output (date + git hash)
- [ ] Commit hash from `git log -1 --oneline`
- [ ] Git push success log
- [ ] Deployment success log (Vercel/Netlify/hosting platform)
- [ ] Live URL screenshot of homepage showing hero
- [ ] Live URL screenshot of /google-antigravity page
- [ ] `curl` output showing 200 OK status

---

## 🚦 RALPH PROTOCOL: BATCH 1.1 EXIT CRITERIA

### Gate 1 (Assessment) Requirements:

Before Product Manager approves Batch 1.2, you MUST provide:

#### ✅ Evidence Checklist (Submit to Product Manager):

**TEXT FILES (zip and share):**

- [ ] evidence/1.1.1_grep_output.txt (keyword verification)
- [ ] evidence/1.1.1_git_diff.txt (layout.tsx changes)
- [ ] evidence/1.1.2_grep_output.txt (homepage verification)
- [ ] evidence/1.1.2_git_diff.txt (page.tsx changes)
- [ ] evidence/1.1.2_build_log.txt (first build success)
- [ ] evidence/1.1.3_git_diff.txt (hero section code)
- [ ] evidence/1.1.3_grep_output.txt (H1 verification)
- [ ] evidence/1.1.3_build_log.txt (second build success)
- [ ] evidence/1.1.4_file_creation.txt (hub page creation proof)
- [ ] evidence/1.1.4_file_preview.txt (first 50 lines)
- [ ] evidence/1.1.4_build_log.txt (third build success)
- [ ] evidence/1.1.6_provenance.txt (date + git hash)
- [ ] evidence/1.1.6_push_log.txt (deployment log)
- [ ] evidence/1.1.6_deployment_verification.txt (curl outputs)

**SCREENSHOTS (share individually or zip):**

- [ ] evidence/1.1.3_hero_screenshot.png (homepage with hero)
- [ ] evidence/1.1.3_h1_tag.png (browser inspect showing H1)
- [ ] evidence/1.1.4_page_screenshot.png (/google-antigravity page)
- [ ] evidence/1.1.5_gsc_verified.png (GSC verification)
- [ ] evidence/1.1.5_sitemap_submitted.png (sitemap submission)
- [ ] evidence/1.1.5_indexing_request.png (indexing confirmation)
- [ ] evidence/1.1.6_live_homepage.png (production homepage)

**Format:** Zip entire evidence/ folder and share with Product Manager for review.

#### 🎯 Success Metrics:

- "Google Antigravity" appears 10+ times across metadata ✓
- Hero section H1 is properly tagged (SEO) ✓
- /google-antigravity page has FAQPage schema ✓
- GSC shows property verified ✓
- Production deployment successful ✓
- All internal links working ✓

---

## ⚠️ ERROR HANDLING

### If Build Fails:

1. Share full error log with Product Manager
2. Do NOT proceed to next task
3. Wait for debugging instructions

### If GSC Verification Fails:

1. Try DNS TXT record method instead of HTML tag
2. Check domain DNS propagation (https://dnschecker.org)
3. Screenshot error message for Product Manager

### If Deployment Fails:

1. Check Vercel/hosting platform logs
2. Verify git push succeeded
3. Check for build errors in hosting dashboard
4. Share logs with Product Manager

### If Task Takes 2x Estimated Time:

1. STOP immediately
2. Document what's blocking you
3. Ask Product Manager for guidance
4. Do NOT continue burning tokens

---

## 📊 TOKEN BUDGET TRACKING

**Estimated Token Usage:**

- Task 1.1.1: ~5K tokens (Gemini Flash - FREE)
- Task 1.1.2: ~3K tokens (Gemini Flash - FREE)
- Task 1.1.3: ~20K tokens (Claude Sonnet)
- Task 1.1.4: ~25K tokens (Claude Sonnet)
- Task 1.1.5: 0 tokens (Manual)
- Task 1.1.6: 0 tokens (Terminal)

**Total Batch 1.1:** ~50K tokens (well within budget)

**Remaining After Batch:** 117K tokens (safe to continue)

---

## 🎯 NEXT STEPS

After completing Batch 1.1 and receiving GREEN LIGHT from Product Manager:

**Batch 1.2:** Hub Pages Creation (Days 3-5)

- Create /mcp-servers hub page
- Create /rules hub page
- Create /troubleshooting hub page (COMPETITOR GETS 6K VIEWS/WEEK)
- Create /workflows hub page
- Create /prompts hub page
- Update sitemap.ts
- Deploy all hub pages

---

## 📝 NOTES FOR ANTIGRAVITY EXECUTION

1. **Read this document first** before starting any task
2. **Execute tasks sequentially** (1.1.1 → 1.1.2 → 1.1.3 → 1.1.4 → 1.1.5 → 1.1.6)
3. **Collect evidence as you go** (don't wait until the end)
4. **Test locally first** (npm run dev, check browser)
5. **Only deploy after all tasks pass** local testing
6. **Return to Product Manager** with complete evidence package for review

---

**Created:** January 27, 2026
**Ralph Protocol Version:** v3.3 (SSOT)
**Product Manager:** Claude Code (VSCode)
**Execution Agent:** Antigravity (Gemini Flash + Claude Sonnet)
