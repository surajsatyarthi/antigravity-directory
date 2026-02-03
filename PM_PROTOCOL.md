# 🎯 PM PROTOCOL - STRATEGIC BUSINESS GATES
## Product Manager Accountability Framework for Antigravity.Directory

**Version:** 1.0
**Effective Date:** 2026-02-03
**Status:** ACTIVE
**Mission:** Ensure every approved task drives toward $35K MRR while preventing strategic misalignment

---

## EXECUTIVE SUMMARY

The PM Protocol is the **PM-level equivalent to Ralph Protocol**. While Ralph enforces code quality and technical correctness, PM Protocol enforces **strategic correctness, business alignment, and growth velocity**.

**Key Principle:** A task can pass all 12 Ralph gates (perfect code) but fail PM Protocol and still be rejected. Strategic misalignment is worse than code bugs because it wastes time and tokens.

**Real-World Example:**
- ✅ Batch 2: Perfectly extracted 8 Cursor IDE rules (Ralph: 12/12 ✅)
- ❌ Batch 2: Rules are for wrong product (PM: FAILED Gate 1)
- 🚫 **Result:** Entire batch rejected despite technical perfection

---

## THE PM PROTOCOL GATES (7 Gates)

### GATE 1: Strategic Alignment ⚔️
**Purpose:** Verify work aligns with Antigravity.Directory mission (not any random adjacent product)

**Requirement Checklist:**
- [ ] Work is explicitly FOR Antigravity IDE, not Cursor IDE or other IDEs
- [ ] Work advances the marketplace model (curated directory + community)
- [ ] Work does NOT duplicate competitor features (antigravity.codes)
- [ ] Work has clear competitive differentiation from alternatives
- [ ] PM has validated product positioning before approval

**Validation Question for PM:**
> "If I approve this, will it move us closer to owning the Antigravity IDE ecosystem? Or am I building for the wrong platform?"

**Evidence Required:**
- In approval message: "This work is for [Antigravity IDE / Cursor IDE / Other]"
- Problem statement explicitly references Antigravity market
- If content: verify it's about Antigravity, not competitor products

**Failure Mode (Batch 2):**
- ❌ Approved extraction of Cursor IDE rules for Antigravity directory
- ❌ No validation that rules were actually Antigravity-specific
- ❌ Result: 8 resources added to wrong product category

**Gate 1 Status:** 🔴 FAILED (Batch 2) → requires root cause fix

---

### GATE 2: Product-Market Fit Validation 🎯
**Purpose:** Verify work solves a real user problem in the Antigravity ecosystem

**Requirement Checklist:**
- [ ] User research or data supports this feature (Google Trends, Reddit, Discord, GitHub)
- [ ] Feature is in top 3 user requests or pain points
- [ ] Competitive analysis confirms gap (TAAFT, antigravity.codes, cursor.directory don't have this)
- [ ] Success metric defined (how we measure if users actually want this)
- [ ] Estimated impact on user retention/engagement quantified

**Validation Question for PM:**
> "Do we have proof that users want this? Or am I guessing?"

**Evidence Required:**
- Research document: "Users searching for X" with supporting data
- Competitive gap analysis showing why this matters
- Success metric: "If feature ships, X metric should improve by Y%"

**Example - Good:**
- ✅ "Users searching 'How autonomous is [agent]?' - need reliability ratings"
- ✅ Competitive gap: antigravity.codes has no autonomy scoring
- ✅ Metric: "Feature success = 20+ autonomy ratings per month"

**Example - Bad:**
- ❌ "I think users will want this"
- ❌ No data validating the assumption
- ❌ Approved anyway because code was technically sound

**Impact on $35K MRR:**
- Features with product-market fit drive user retention (lock-in)
- Retention enables higher monetization (sponsorships, featured tiers)
- Features without PMF waste development time on features users don't use

---

### GATE 3: Monetization Path Clarity 💰
**Purpose:** Verify how the work contributes to $10K MRR baseline (milestone toward $35K)

**Requirement Checklist:**
- [ ] Work explicitly assigned to one of 5 revenue streams:
  - [ ] Listings revenue ($49-$149 per submission)
  - [ ] Featured tiers (profiles, resources, jobs)
  - [ ] Display advertising (navbar, profile banner, inline sponsored cards)
  - [ ] Sponsorships/partnerships
  - [ ] Other (specify)
- [ ] Estimated revenue impact quantified: "$X MRR expected" or "Foundation for $X MRR later"
- [ ] Timeline to revenue identified
- [ ] If "foundation layer" - clear path to monetization documented

**Validation Question for PM:**
> "If this ships perfectly, how does it make money? Or how does it unlock future money?"

**Evidence Required:**
- Revenue stream assignment with reasoning
- MRR impact estimate (or "enables $X in Phase Y")
- Monetization timeline: "Ships in Phase 1, monetizes in Phase 3"

**Example - Good:**
- ✅ "Member profiles (Gate 1-2 work) are foundation for featured profiles tier"
- ✅ "Featured profiles = $99/month, target 20 users = $1,980 MRR"
- ✅ "Ships in Phase 1, monetized in Phase 4"

**Example - Bad:**
- ❌ "This is important infrastructure"
- ❌ No monetization path identified
- ❌ Shipped as "nice to have" when it's actually critical path to revenue

**Current Status:**
- Phase 0 work (content seeding): Foundation → monetized in Phase 4
- Phase 1 work (community): Lock-in → enables 50%+ higher monetization rates
- Phase 4 work (sponsorships): Direct revenue → MRR target

---

### GATE 4: SEO Impact Assessment 📈
**Purpose:** Verify work improves organic visibility (market reach) in Antigravity IDE ecosystem

**Requirement Checklist:**
- [ ] SEO impact identified: Does this create new indexed pages? Improve rankings?
- [ ] Target keywords defined: "This page ranks for these 5-10 searches"
- [ ] Competitive keyword analysis: "We outrank antigravity.codes on these"
- [ ] Internal linking strategy: How does this page connect to others?
- [ ] Estimated organic traffic impact: "+X visitors/month"
- [ ] Timeline to SEO impact: "Ranks in 2-4 weeks" or "Foundation layer"

**Validation Question for PM:**
> "If this ships, will Google rank it? Will it drive traffic? Or is it invisible?"

**Evidence Required:**
- SEO keyword research document
- Competitor SERP analysis (where does antigravity.codes rank? Where will we?)
- Page count impact (e.g., "1000 member profiles = 1000 indexed pages")
- Traffic projection with reasoning

**Example - Good:**
- ✅ Member profiles: 1000 pages indexed = 1000+ long-tail rankings
- ✅ Keyword: "[username] antigravity" ranks for profile discoveryability
- ✅ Traffic estimate: "1000 profiles × 5 searches each = 5000+ annual organic visits"

**Example - Bad:**
- ❌ "Admin dashboard" (important functionally, invisible to Google)
- ❌ No SEO keywords targeted
- ❌ Zero organic traffic expected but shipped anyway

**Current Status:**
- Landing pages (Gate 3.2): +5000 visitors/day projected
- Member profiles (Phase 1): 1000+ indexed pages, entity stacking with social links
- Chrome extension (Phase 3.5): DR 99 backlink = permanent domain authority boost

---

### GATE 5: Virality as Product 🔄
**Purpose:** Verify work includes network effects and sharing incentives (growth mechanics)

**Requirement Checklist:**
- [ ] Growth mechanic identified: How does one user's action create value for others?
- [ ] Retention mechanic identified: Why do users return?
- [ ] Sharing incentive included: Is there a reason to invite friends?
- [ ] Viral coefficient estimated: "Assuming X% share rate and Y% conversion, 1 user brings Z new users"
- [ ] Competitive advantage in virality documented

**Validation Question for PM:**
> "Does this create a self-reinforcing loop? Or does every user need individual acquisition?"

**Evidence Required:**
- Product virality document explaining network effects
- Comparison to cursor.directory or similar platform
- Viral coefficient math (even rough estimates)
- Retention metrics: "Users return X times/month"

**Example - Good:**
- ✅ Member profiles: Following creates social graph (retention)
- ✅ Profiles incomplete → users invited by email to complete (acquisition)
- ✅ Contributions shown on profile → creators return to monitor views (retention)
- ✅ Followers see contributions → discover new resources (content virality)
- ✅ Viral coefficient: Rough estimate "1 user invites 0.3-0.5 new users"

**Example - Bad:**
- ❌ Admin features (no virality, no retention hook)
- ❌ Content features without attribution (creator doesn't know impact)
- ❌ No network effects (value doesn't increase with more users)

**Current Strategy:**
- **Community as moat:** 71k members (cursor.directory) = network effects
- **Social graph:** Following + followers = daily return reason
- **Profile gamification:** Completion score = retention hook
- **Content attribution:** Creators see stats = motivation to contribute more

---

### GATE 6: Virality as Engineering ⚙️
**Purpose:** Verify growth mechanics are technically implemented and measurable

**Requirement Checklist:**
- [ ] Analytics tracking implemented: Can we measure virality?
  - [ ] Invitation tracking (who invited whom)
  - [ ] Referral attribution (traffic source = shared link from user profile)
  - [ ] Viral loop metrics (share → click → signup → confirmed)
- [ ] Technical virality features implemented:
  - [ ] Social sharing buttons with tracking UTM params
  - [ ] Shareable profile links: `/u/[username]?ref=[inviter_id]`
  - [ ] Referral dashboards for creators (see who they invited)
  - [ ] Notification system (alert user when someone follows them, invites them, etc.)
- [ ] Viral loop tested end-to-end
- [ ] Metrics dashboard shows virality KPIs

**Validation Question for PM:**
> "Can we actually measure if virality mechanics work? Or are we flying blind?"

**Evidence Required:**
- Analytics tracking plan (what metrics, where, how)
- Shareable URL format with UTM parameters
- Referral dashboard UI mockup or implementation
- Testing evidence: "Tested invitation flow end-to-end"

**Example - Good:**
- ✅ Profile URLs include `?ref=user_id_123` tracking
- ✅ Database tracks `referrer_id` on signup
- ✅ Dashboard shows "You invited 15 people" to creator
- ✅ Metrics: Viral coefficient = (signups from referral / new users) measured weekly

**Example - Bad:**
- ❌ Profiles shareable but no tracking
- ❌ Users invited but we don't know who did the inviting
- ❌ Features shipped but no analytics to measure impact

**Current Implementation:**
- Phase 1: Social graph + follows (structure for virality)
- Phase 1.3: Follow notifications (engagement hook)
- Phase 4.1: Referral tracking on signup
- Phase 4.2: Creator dashboard with "people you invited" stats

---

### GATE 7: MRR Target Validation 💹
**Purpose:** Verify work tracks against $10K MRR baseline (stepping stone to $35K)

**Requirement Checklist:**
- [ ] Revenue model assigned to one of 5 streams
- [ ] MRR target from this feature quantified
- [ ] Monetization timeline clear: Phase 1, 2, 3, or 4?
- [ ] Pricing tier validated:
  - [ ] Are pricing tiers competitive? (vs cursor.directory, TAAFT)
  - [ ] Do customers pay? (validate pricing with research if new)
  - [ ] Is there ceiling/floor on revenue? (explain limits)
- [ ] Customer acquisition cost (CAC) estimate
- [ ] Lifetime value (LTV) estimate
- [ ] CAC < LTV confirmed?

**Validation Question for PM:**
> "If we ship this and 100% of customers use it, do we hit $10K MRR? If not, when?"

**Evidence Required:**
- Financial model: Units × Price = MRR
- Pricing comparison vs competitors
- Customer acquisition path (how do they find us?)
- Retention projection (% staying each month)

**Example - Good:**
- ✅ Featured member profiles: 30 members × $99/month = $2,970 MRR
- ✅ Jobs board: 40 jobs/month × $299 = $11,960 MRR
- ✅ Display ads: 5 placements × $2000 = $10,000 MRR
- ✅ Total Phase 4 = $44K MRR (exceeds $35K target)

**Example - Bad:**
- ❌ "This will generate revenue eventually"
- ❌ No pricing strategy defined
- ❌ No CAC/LTV math
- ❌ Shipped as "high priority" with no revenue impact

**Current $35K MRR Path:**
- Month 1: $3K (50 listings @ $60 avg)
- Month 2: $17K (listings $6K + featured $1K + jobs $5K + ads $2K + sponsorships $3K)
- Month 3: $31K (scaling all channels)
- Month 4: $44K+ (full monetization)

---

## PM PROTOCOL ENFORCEMENT

### When to Apply PM Protocol
**Apply BEFORE shipping any feature:**
1. New user-facing features
2. New content categories (Rules, MCPs, etc.)
3. Monetization changes
4. Major product changes
5. Content sourcing/curation changes

**DON'T apply for:**
- Infrastructure improvements (database tuning, caching)
- Internal admin tools
- Bug fixes (use Ralph only)
- Performance optimizations (use Ralph only)

### How to Apply PM Protocol

**For PM (You):**
1. Before approving work, walk through Gates 1-7
2. For each gate, document: ✅ PASS or ❌ FAIL with reasoning
3. If any gate fails, request changes or reject
4. If all gates pass, give approval with gate checklist shown

**For Developer:**
1. Include PM Gate evidence in implementation
2. Sections in task description:
   ```
   ## Strategic Alignment (Gate 1)
   - Work is for: Antigravity IDE ✅

   ## Product-Market Fit (Gate 2)
   - User research: [Link to evidence]

   ## Monetization (Gate 3)
   - Revenue stream: Featured tier
   - Expected MRR: $1,980/month

   ## SEO Impact (Gate 4)
   - Pages: 1000 member profiles
   - Traffic: +1000 monthly visitors

   ## Virality (Gates 5-6)
   - Sharing mechanic: Follow button
   - Analytics: Referral tracking via UTM

   ## MRR Validation (Gate 7)
   - Units: 20 featured members @ $99 = $1,980
   ```

### Gate Assessment Template

Use this when evaluating if a task passes PM Protocol:

```markdown
# PM Protocol Assessment - [TASK_NAME]

## Gate 1: Strategic Alignment
- Product: Antigravity IDE ✅ / Cursor IDE ❌ / Other
- Competitive position: Advances marketplace model ✅ / Duplicates competitor ❌
- **Status:** ✅ PASS / ❌ FAIL

## Gate 2: Product-Market Fit
- User research: [Evidence link]
- Competitive gap: [Why we're different]
- Success metric: [How we measure if users want this]
- **Status:** ✅ PASS / ❌ FAIL

## Gate 3: Monetization Path
- Revenue stream: [Listings / Featured / Ads / Sponsorship / Other]
- MRR impact: $X expected
- Timeline: Phase Y
- **Status:** ✅ PASS / ❌ FAIL

## Gate 4: SEO Impact
- Pages created: X indexed pages
- Keywords: [5-10 target keywords]
- Traffic impact: +X visitors/month
- Ranking vs competitors: Outranks antigravity.codes ✅ / At parity ⚠️
- **Status:** ✅ PASS / ❌ FAIL

## Gate 5: Virality as Product
- Growth mechanic: [How one user brings others]
- Retention hook: [Why users return]
- Sharing incentive: [Why users invite]
- **Status:** ✅ PASS / ❌ FAIL

## Gate 6: Virality as Engineering
- Analytics: Tracking implemented ✅ / Not implemented ❌
- Referral system: [How sharing is measured]
- Metrics dashboard: [How to view KPIs]
- **Status:** ✅ PASS / ❌ FAIL

## Gate 7: MRR Validation
- Revenue model: [Units × Price = MRR]
- $10K baseline met: ✅ / Not yet (foundation layer) ⚠️
- Pricing validated: ✅ / Needs research ❌
- **Status:** ✅ PASS / ⚠️ CONDITIONAL / ❌ FAIL

---

## OVERALL DECISION
- ✅ APPROVED (all gates pass)
- ⚠️ CONDITIONAL (foundation layer, success metrics tracked)
- 🚫 REJECTED (strategic misalignment, needs redesign)
```

---

## REAL-WORLD EXAMPLE: Batch 2 Post-Mortem

### What Happened
Batch 2 Task: Extract and import 8 Cursor IDE rules for Antigravity.Directory

### Ralph Protocol Result
- Gate 1: ✅ Physical Audit - code quality verified
- Gate 2: ✅ Logic Mapping - dependencies analyzed
- Gate 3-12: ✅ All gates passed (perfect technical execution)
- **Ralph Score: 12/12 ✅**

### PM Protocol Result
- Gate 1: ❌ Strategic Alignment - Rules are FOR Cursor IDE, not Antigravity IDE
  - Work directly contradicts platform differentiation
  - Wastes space on competitor ecosystem
  - Shows PM didn't validate product mission

- **PM Score: 0/7 ❌ → REJECTED ENTIRE BATCH**

### Root Cause Analysis
**PM Failure (Not Developer Failure):**
- ❌ PM didn't validate content before approval
- ❌ PM didn't spot-check 8 rules to verify they were Antigravity-specific
- ❌ PM treated "technical correctness" as equivalent to "strategic correctness"

### Prevention (Why PM Protocol Exists)
Future batches must pass BOTH:
- ✅ Ralph Protocol (code quality)
- ✅ PM Protocol (strategic correctness)

**Neither alone is sufficient.**

---

## PM ACCOUNTABILITY

### Your Responsibility (as PM)

You are accountable for:

1. **Gate 1-3 Validation**
   - Verify strategic alignment before giving developer approval
   - You don't need to code; you need to read the PRD and ask: "Is this for the right product?"
   - Cost if missed: Entire feature is wasted effort (see Batch 2)

2. **Gate 4 Validation**
   - Request SEO analysis before shipping
   - You don't need to write the code; you need to ask: "Will Google rank this?"
   - Cost if missed: Launch invisible to search, competitors rank instead

3. **Gate 5-7 Validation**
   - Confirm growth + monetization math before shipping
   - You don't need technical skills; you need business judgment
   - Cost if missed: Ship a feature, no revenue, no growth

### Enforcement Mechanism

If you miss a PM Protocol gate, same consequences as developer missing Ralph gates:

- ❌ **Miss Gate 1 (Strategic Alignment):** Entire batch fails approval (Batch 2 example)
- ❌ **Miss Gate 3 (Monetization):** Feature shipped without revenue path (lost $X MRR)
- ❌ **Miss Gate 4 (SEO):** Page lives on dark side of the internet (lost organic traffic)
- ❌ **Miss Gate 5-6 (Virality):** Network doesn't grow (lost exponential growth)

**Non-negotiable:** Before you approve any task, walk through all 7 gates. If you can't complete the assessment, ask developer for the missing analysis.

---

## INTEGRATION WITH RALPH PROTOCOL

### How They Work Together

```
Developer → Ralph Protocol (Passes 12/12) ✅
              ↓
         PM Gate Review (Passes 7/7)?
              ↓
         YES → Approved ✅
         NO → Rejected 🚫
```

**Example Outcomes:**

| Scenario | Ralph | PM | Decision |
|----------|-------|----|----|
| Perfect feature, right product | 12/12 ✅ | 7/7 ✅ | APPROVED ✅ |
| Perfect code, wrong product | 12/12 ✅ | 0/7 ❌ | REJECTED 🚫 |
| Good code, incomplete monetization | 12/12 ✅ | 5/7 ⚠️ | CONDITIONAL ⚠️ |
| Broken code, right product | 6/12 ❌ | 7/7 ✅ | REJECTED 🚫 |

---

## GATES CHECKLIST FOR FUTURE BATCHES

### Pre-Approval Checklist (Your Process)

When developer says "Feature X is ready for review":

- [ ] Have I read the task description?
- [ ] Do I understand what problem it solves?
- [ ] Is it for Antigravity IDE (not competitor)? → Gate 1
- [ ] Do users actually want this (not guess)? → Gate 2
- [ ] How does it make money? → Gate 3
- [ ] Will Google rank it? → Gate 4
- [ ] Does it have growth mechanics? → Gate 5
- [ ] Is growth measurable? → Gate 6
- [ ] Does it ladder to $10K MRR? → Gate 7
- [ ] All 7 gates pass? → APPROVE
- [ ] Any gate fails? → REJECT or REQUEST CHANGES

---

## GLOSSARY

| Term | Definition |
|------|-----------|
| **Strategic Alignment** | Work advances Antigravity.Directory mission, not competitor platforms |
| **Product-Market Fit** | Users demonstrably want the feature (data, not assumptions) |
| **Monetization Path** | Clear mechanism and timeline for revenue generation |
| **SEO Impact** | Feature is discoverable by Google and ranks for valuable keywords |
| **Virality as Product** | Feature includes network effects (one user brings others) |
| **Virality as Engineering** | Network effects are measurable via analytics |
| **MRR Validation** | Revenue impact quantified against $10K baseline target |
| **Gate** | A stage that must be passed before proceeding |
| **Ralph Protocol** | Code quality enforcement (12 gates, technical) |
| **PM Protocol** | Strategic alignment enforcement (7 gates, business) |

---

## NEXT STEPS

1. **Batch 3 Planning:** Review all pending work through PM Protocol lens
2. **Batch 2 Fix:** Clear incorrect Cursor rules, replace with Antigravity rules
3. **Future Approvals:** Use PM Protocol assessment template for every task
4. **Metrics Tracking:** Monthly review of MRR ladder and SEO impact

---

**Created:** 2026-02-03
**Created By:** PM (Claude Code)
**Version:** 1.0 (Initial - Gates 1-7)
**Status:** ACTIVE
**Next Review:** After Batch 3 completion
