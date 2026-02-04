# PM RECOVERY PLAN: Antigravity Directory Launch
## After Uncommanded Code Changes (Feb 4, 2026)

**Status**: 🔴 BLOCKED → 🟡 RECOVERING → 🟢 READY

**Issue**: Antigravity implemented features without clear spec, causing:
- Build errors (missing imports)
- Scope creep (features not in Stage 1)
- Unclear roadmap leading to rework

**Root Cause**: MASTER-TASK-LIST.md was too verbose and ambiguous. Antigravity had to guess what to build.

---

## WHAT WENT WRONG

### Issue 1: Missing Import in `src/lib/queries.ts:356`
**Symptom**: Build failed with `Cannot find name 'payments'`
**Cause**: `payments` table used but not imported
**Fix**: Added `payments` to imports (DONE ✅)
**Status**: Build now passes ✅

### Issue 2: Scope Creep (Features Built That Weren't Requested)
Antigravity built several features not in Stage 1:
- Creator earnings tracking (requires `payments` table JOIN)
- Creator proof cards with real database queries
- Stats bar with auto-updating data
- Category showcase with featured resources

**Question**: Were these supposed to be in Stage 1?
- If YES: Why not specified clearly?
- If NO: Why were they built? Should we revert them?

### Issue 3: Unclear Stage 1 Scope
Previous MASTER-TASK-LIST said:
- "Phase 0: Scrape 1500+ resources" ✅
- "Phase 0.5: GitHub OAuth + Stripe" ✅
- "Phase 3: Redesign homepage" ⚠️ (Was this Stage 1 or Phase 2?)
- "PHASE 1: Community features" ⚠️ (Not clear if needed for launch)

This ambiguity led Antigravity to implement "complete" homepage with database queries, thinking it was the right approach.

---

## IMMEDIATE FIXES APPLIED

| Fix | Status | Evidence |
|-----|--------|----------|
| Add `payments` import to queries.ts | ✅ DONE | Build passes |
| Verify all components load | ✅ TESTING | npm run build succeeds |
| Check for other broken imports | ⏳ IN PROGRESS | Grep for undefined tables |

---

## FAANG-LEVEL PM APPROACH: Clear Specs

### **Principle 1: No Guessing**
Every task must have:
- ✅ **EXACT** acceptance criteria (not "looks good")
- ✅ **EXPLICIT** scope (this IS included, THIS IS NOT)
- ✅ **CLEAR** owner (who's building? who's reviewing?)
- ✅ **SPECIFIED** dependencies (what must exist first?)

### **Principle 2: Defer Complexity**
For Stage 1, build ONLY:
- Static components (no DB queries beyond what exists)
- Basic forms and CTAs
- Pre-written copy and data

DO NOT build (Stage 2+):
- Complex aggregations (creator earnings, stats)
- Real-time data fetching (dashboard, analytics)
- Payment flows (still works, but not required for MVP)

### **Principle 3: Explicit Feature List**
Instead of phases, use a simple feature checklist:

```
STAGE 1 LAUNCH FEATURES (Week 1-2):
├─ ✅ 1,500 resources searchable
├─ ✅ Revenue-focused homepage copy
├─ ✅ 40 fake profiles (static data)
├─ ✅ GitHub OAuth claiming system
├─ ✅ Stripe Connect 80/20 split
├─ ✅ Ads placement on website
└─ ✅ Creator outreach automation

DEFERRED TO STAGE 2 (Week 3-4):
├─ ❌ Creator earnings dashboard (requires complex DB)
├─ ❌ Stats auto-updating (deferred until Week 3)
├─ ❌ Featured sections with live data (use static for MVP)
├─ ❌ Job board
├─ ❌ Community posts
└─ ❌ Newsletter system
```

---

## REVISED MASTER TASK LIST: Stage 1 Only

**Goal**: Crystal clear what's IN vs OUT for Week 1-2 launch

### **Stage 1 Tasks (Week 1-2)**

#### **Antigravity: Technical**

| Task | Detail | Status | Effort |
|------|--------|--------|--------|
| **Scrape & Import 1,500 Resources** | MCPs, rules, workflows | TODO | 6h |
| **Test data loads correctly** | No null/invalid entries | TODO | 1h |
| **GitHub OAuth Claiming** | Creator can claim their tool | TODO | 8h |
| **Stripe Connect Setup** | 80/20 split, auto-payout | TODO | 6h |
| **Test payments work** | Create test transaction | TODO | 1h |
| **Homepage Components** | Use PROVIDED copy (no DB queries) | TODO | 6h |
| **Header & Navigation** | Simple links, no complexity | TODO | 2h |
| **Search functionality** | Filter/search working | TODO | 2h |
| **Responsive design** | 375px, 768px, 1024px | TODO | 3h |
| **GA tracking** | All CTA clicks tracked | TODO | 1h |
| **Build & deploy** | No errors, production-ready | TODO | 2h |

**Total Antigravity Effort**: ~38 hours ✅ Reasonable

#### **Claude: Copy & Data**

| Task | Detail | Status | Effort |
|------|--------|--------|--------|
| **Homepage copy** | Finalized, ready to code | TODO | 2h |
| **Email templates (3)** | For 450 creator outreach | TODO | 1h |
| **Fake profile data** | 40 profiles JSON | TODO | 1h |
| **Auto-responder templates** | SendGrid copy | TODO | 1h |
| **Social media posts** | 2 weeks worth | TODO | 2h |

**Total Claude Effort**: ~7 hours ✅ Reasonable

#### **CEO: Approval & Strategy**

| Task | Detail | Status | Effort |
|------|--------|--------|--------|
| **Approve copy** | Homepage, emails, posts | TODO | 1h |
| **Approve mockup** | Design before Antigravity codes | TODO | 0.5h |
| **Manual outreach** | 10 VIP creator DMs | TODO | 0.5h |
| **Decisions at gates** | Week 2, 4, 8 | TODO | 1h total |

**Total CEO Effort**: ~3 hours ✅ Minimal

---

## WHAT NOT TO BUILD (And Why)

### ❌ Creator Earnings Aggregation
```
Antigravity built: Complex SQL JOIN to sum creator earnings
Why DEFER:
- Requires mature `payments` table (not stable yet)
- 40 fake profiles don't have real payments
- MVP doesn't need this (can show static numbers)
- Add in Stage 2 when real creators exist
```

### ❌ Real-Time Stats Dashboard
```
What: Stats Bar showing "500+ creators, $100k+ earned"
Why DEFER:
- Just hardcode the numbers for Stage 1
- Can update manually Week 2
- Real-time is nice-to-have, not critical
```

### ❌ Featured Resources from DB
```
What: "Featured in [Category]" section pulling from `featuredResources` query
Why DEFER:
- Requires curating "featured" resources
- MVP can show top 6 by ratings (already calculated)
- Or just show static featured set for launch
```

### ❌ Community Features
```
- Follow system
- User posts
- Member directory with profiles
- All DEFERRED to Stage 2 (after validating marketplace demand)
```

### ❌ Advanced SEO
```
- Chrome extension (needs approvals)
- Programmatic landing pages
- Advanced schema markup
All DEFERRED to Week 3-4 (after launch validation)
```

---

## ANTIGRAVITY: WHAT TO DO NOW

### **DO NOT**:
- ❌ Don't build anything not on the list above
- ❌ Don't add new database queries
- ❌ Don't try to guess what's needed

### **DO**:
- ✅ Check this list every day
- ✅ Ask for clarification if anything is unclear
- ✅ Build ONLY what's on the list
- ✅ Test each feature before committing
- ✅ Show work daily (pull requests, not mega-commits)

### **If You're Unsure**:
1. Find the task on the checklist above
2. Read the "Detail" column
3. If still unsure: **STOP and ask** (don't guess)

---

## CLAUDE: WHAT TO DO NOW

### **Write in This Order**:
1. **Homepage copy** (by EOD today)
2. **Email templates** (by tomorrow EOD)
3. **Fake profile data** (by tomorrow EOD)
4. **Social posts** (by Wednesday)
5. **Auto-responders** (by Wednesday)

### **Format for Antigravity**:
- Homepage: Markdown or React components (Claude will provide both)
- Emails: Plain text + HTML versions
- Profiles: JSON array with name, image, earnings, tools, testimonial
- Posts: Markdown ready to schedule
- Auto-responders: Email templates (Subject + Body)

### **Share EVERYTHING**:
- Don't assume Antigravity knows what you meant
- Every copy element needs exact wording
- Every component needs exact structure

---

## ROADMAP CLARITY: Stage 1 vs Stage 2

### **Stage 1: Week 1-2 (MVP Launch)**
**Goal**: Get marketplace live, validate demand

Includes:
- Resources searchable
- Creator claiming works
- Payments process
- 40 fake profiles for credibility
- Ads can be placed
- Email outreach automated
- Revenue from Day 1 (commission + ads)

Does NOT include:
- Creator earnings dashboard
- Advanced stats
- Community features
- Jobs board
- Newsletter
- Chrome extension

### **Stage 2: Week 3-6 (Optimize & Monetize)**
**Goal**: Real creators claim, optimize conversion

Includes:
- Featured creator profiles ($99/month upsell)
- Stats dashboard (creator earnings, leaderboard)
- Job board
- Newsletter system
- Community posts (maybe)

### **Stage 3: Month 2-3+ (Scale)**
**Goal**: Network effects, viral growth

Includes:
- Chrome extension
- Advanced SEO (programmatic landing pages)
- Video/courses (if demand)
- Freelancer marketplace (if demand)

---

## APPROVAL CHECKLIST

Before Antigravity starts coding, confirm:

- [ ] You agree with "STAGE 1 FEATURES" list above
- [ ] You agree with "DO NOT BUILD" list above
- [ ] All tasks above are clear (no ambiguity)
- [ ] You've read the "ANTIGRAVITY: WHAT TO DO NOW" section
- [ ] You know who to ask if unclear (CEO/Claude)

**Do not proceed until all boxes are checked.**

---

## NEXT STEPS

### **Today (Feb 4)**:
1. You approve this plan
2. Claude starts writing copy
3. Antigravity: Wait for copy before coding homepage

### **Tomorrow (Feb 5)**:
1. Claude delivers all copy
2. Antigravity: Build homepage with provided copy
3. CEO: Review and approve

### **Wed-Thu (Feb 6-7)**:
1. Antigravity: Build GitHub OAuth + Stripe
2. Antigravity: Test claiming + payments
3. Antigravity: Deploy to staging

### **Friday (Feb 7)**:
1. Full testing
2. Week 2 Gate: Launch!

---

## LESSONS LEARNED

### **What Went Wrong**:
1. MASTER-TASK-LIST.md was 900+ lines and ambiguous
2. No explicit "DO NOT BUILD" section
3. Phases not clearly tied to "Stage 1 vs Stage 2++"
4. Antigravity had to guess what a "good" homepage should include

### **What We're Fixing**:
1. ✅ This document is SHORT and CLEAR
2. ✅ Explicit feature list (IN and OUT)
3. ✅ Daily check-ins (ask if unclear)
4. ✅ CEO approves design BEFORE building
5. ✅ One task at a time (not mega-commits)

### **Going Forward**:
- Every task has 2-3 sentence description (not 10 pages)
- Explicit scope (this IS, this IS NOT)
- Design mockup before code
- Daily Slack check-in (5 min)
- Immediate escalation if stuck >15 min

---

**Document Version**: 1.0 (FAANG PM Recovery)
**Status**: ✅ Ready for Execution
**Last Updated**: Feb 4, 2026, 2:30 PM

🚨 **APPROVAL REQUIRED BEFORE PROCEEDING**
