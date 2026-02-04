# STAGE 1 SPECIFICATION: Launch to Market (Week 1-2)
## googleantigravity.directory MVP

**Period**: Week 1-2 (Feb 4-18)
**Goal**: Get marketplace live with resources, claiming, and payments working
**Success Metric**: 40+ creator claims, 5+ first sales, $100-200 revenue
**Team**: Antigravity (dev), Claude (copy), CEO (approval)

---

## 🎯 IN SCOPE (Build These)

### **Resources & Search**
- ✅ 1,500+ MCPs, rules, workflows searchable
- ✅ Category filtering (MCP, Rules, Workflows, Skills)
- ✅ Search by name/description
- ✅ No null or invalid data
- ✅ Performance: Page loads <2 seconds

### **Creator Claiming**
- ✅ GitHub OAuth login (creator claims "their tool")
- ✅ Button on homepage: "Claim Your Tool"
- ✅ Redirect to `/claim/[toolSlug]`
- ✅ Creator logs in, confirms it's theirs, done
- ✅ Tool now shows creator name + bio

### **Payments (Stripe Connect)**
- ✅ Buyer clicks "Buy" on tool page
- ✅ Charge card $29 (example price)
- ✅ 80% goes to creator's Stripe Connect account
- ✅ 20% goes to platform
- ✅ Creator gets paid within 2 days
- ✅ Test: Create 1 real transaction, verify split works

### **Homepage (Revenue-Focused)**
- ✅ Hero: "Build, Share, and Earn with Antigravity"
- ✅ Copy: Exact wording from copywriting spec
- ✅ 3 value props: Creators earn 80%, Users discover, Companies hire
- ✅ CTA buttons: "Claim Your Tool", "Browse Tools", "Post Job"
- ✅ Search bar (already built)
- ✅ Mobile responsive (375px, 768px, 1024px)

### **Ads Placement**
- ✅ Navbar sponsor slot (reserved for sponsor logo)
- ✅ Homepage banner (reserved for sponsor)
- ✅ Sidebar box (reserved for sponsor)
- ✅ Admin panel to manage ads (basic)
- ✅ NOT MONETIZED YET (just placeholders)

### **Creator Outreach (Automated)**
- ✅ Email templates written (by Claude)
- ✅ 450 creator emails extracted from GitHub
- ✅ Batch send via SendGrid (Antigravity setup)
- ✅ Auto-responder for basic questions
- ✅ Manual replies: Only flag complex Qs to CEO

### **Analytics & Tracking**
- ✅ Google Analytics 4 enabled
- ✅ Event tracking on all CTAs:
  - "hero_claim_click"
  - "hero_browse_click"
  - "hero_jobs_click"
  - "search_performed"
- ✅ Conversion tracking (email signup)

### **Data & Copy (Pre-Written)**
- ✅ 40 fake creator profiles (provided by Claude as JSON)
- ✅ Homepage copy (exact, from spec)
- ✅ Email templates (3 versions, provided)
- ✅ Social media posts (14 for 2 weeks, provided)
- ✅ Auto-responder copy (provided)

---

## 🚫 OUT OF SCOPE (Do NOT Build)

### **❌ Creator Earnings Dashboard**
- Do NOT show real earnings aggregation
- Do NOT query `payments` table to sum creator earnings
- Do NOT show creator leaderboard
- **Why**: 40 fake profiles don't have real payments. Add in Stage 2.

### **❌ Stats Auto-Updating**
- Do NOT query database for "X creators", "Y tools sold"
- **Workaround**: Hardcode numbers (500 creators, 2,200 tools, $100k earnings)
- **Update**: Manually change these numbers Week 2 if needed
- **Real version**: Add in Stage 2

### **❌ Featured Resources with DB Queries**
- Do NOT build "Featured in [Category]" sections with DB queries
- **Workaround**: Show top 6 resources by ratings (already cached)
- Or: Show static "Featured for Launch" set (provided by Claude)
- **Real version**: Add in Stage 2

### **❌ Community Features**
- Do NOT build follow system
- Do NOT build user posts
- Do NOT build comments
- Do NOT build member directory profiles
- **These are Stage 2+** (after marketplace demand validated)

### **❌ Job Board**
- Do NOT build job posting form
- Do NOT build job search
- Do NOT build job notifications
- **This is Stage 2+**

### **❌ Newsletter System**
- Do NOT build newsletter signup with email
- Do NOT build email campaigns
- **This is Stage 2+**

### **❌ Advanced SEO**
- Do NOT build Chrome extension
- Do NOT build programmatic landing pages
- Do NOT build advanced schema markup
- **These are Week 3-4+**

### **❌ Video/Freelancer Features**
- Deferred to Phase 2
- Not relevant for MVP

---

## 📋 EXACT TASK LIST (Daily Checklist)

### **Antigravity Dev Tasks**

**Day 1 (Feb 4)**: Prep & Setup
- [ ] Read this spec document
- [ ] Ask any questions (5 minute limit)
- [ ] Pull latest main branch
- [ ] Verify build passes: `npm run build`

**Day 2-3 (Feb 5-6)**: Homepage Build
- [ ] Build HeroSection component (use Claude's copy)
- [ ] Build Header with navigation
- [ ] Build SearchInput (already exists)
- [ ] Build 3-column value props section
- [ ] Build CTA buttons (Claim, Browse, Jobs)
- [ ] Test responsive design (375px, 768px, 1024px)
- [ ] Commit to GitHub

**Day 4-5 (Feb 7-8)**: GitHub OAuth
- [ ] Build `/claim/[toolSlug]` page
- [ ] Implement GitHub OAuth flow
- [ ] Creator can claim tool (test with 3 creators)
- [ ] Tool shows creator name after claim
- [ ] Test: Verify claiming works end-to-end
- [ ] Commit to GitHub

**Day 6-7 (Feb 9-10)**: Stripe Connect
- [ ] Setup Stripe Connect accounts
- [ ] Build checkout flow
- [ ] Test: Buy a tool for $29
- [ ] Verify 80/20 split works
- [ ] Verify creator gets paid in 2 days
- [ ] Test: Repeat with 4-5 transactions
- [ ] Commit to GitHub

**Day 8-9 (Feb 11-12)**: Analytics & Ads
- [ ] Setup Google Analytics 4
- [ ] Add event tracking to all CTAs
- [ ] Test: Click CTAs, verify GA events fire
- [ ] Add ad placement containers (navbar, homepage)
- [ ] Test: Ads display correctly (even if no sponsor yet)
- [ ] Commit to GitHub

**Day 10 (Feb 13)**: Final Testing
- [ ] Full build: `npm run build` (no errors)
- [ ] Lighthouse score 80+ (performance)
- [ ] Test on mobile (iOS Safari, Chrome)
- [ ] Test on desktop (Chrome, Firefox)
- [ ] Test: Create 5 test claims
- [ ] Test: Create 5 test purchases
- [ ] Create git tag: `v1.0.0-stage1-ready`

### **Claude Copy Tasks**

**By Feb 5 EOD**:
- [ ] Homepage copy (exact wording)
- [ ] 3 email templates (for 450 creator outreach)
- [ ] 40 fake creator profiles (JSON format)
- [ ] 14 social media posts (2 weeks worth)
- [ ] Auto-responder templates (Subject + Body)

### **CEO Approval Tasks**

**By Feb 4, 5pm**:
- [ ] Review PM-RECOVERY-PLAN.md
- [ ] Approve STAGE-1-SPEC.md
- [ ] Confirm you agree with IN/OUT scope

**By Feb 6**:
- [ ] Review homepage copy
- [ ] Review design mockup
- [ ] Approve (or request changes)

**Feb 7-13**:
- [ ] Monitor daily progress
- [ ] Approve pull requests
- [ ] Make Go/No-Go decision for launch

---

## 🚨 BLOCKERS & ESCALATION

If Antigravity is stuck >15 minutes on ANY task:
1. **DO NOT** guess or build workarounds
2. **DO** post question in Slack
3. **DO** wait for reply (max 30 min)
4. **If still stuck**: Escalate to CEO

Examples:
- "Should fake profiles have 'fake' label?" → Ask
- "What should happen after creator claims?" → Ask
- "Should we validate email domain?" → Ask
- "Can I use this library?" → Ask

**Do not proceed without clarity.**

---

## ✅ DEFINITION OF DONE

When Antigravity says "homepage is done", verify:
- [ ] All components built (no TODOs)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive on 3 breakpoints
- [ ] All CTAs clickable
- [ ] GA events fire
- [ ] Lighthouse 80+

When Antigravity says "claiming is done", verify:
- [ ] OAuth flow works
- [ ] Creator can claim tool
- [ ] Tool shows creator name
- [ ] Test with 5 different creators
- [ ] No errors in console

When Antigravity says "payments is done", verify:
- [ ] Can buy tool with test card
- [ ] 80/20 split calculated correctly
- [ ] Creator account gets money
- [ ] Platform account gets money
- [ ] Test with 5 transactions
- [ ] No payment errors

---

## 📅 TIMELINE

| Date | Milestone | Owner | Status |
|------|-----------|-------|--------|
| Feb 4 | Spec approval | CEO | 🟡 PENDING |
| Feb 5-6 | Homepage build | Antigravity | 🔄 TODO |
| Feb 7-8 | GitHub OAuth | Antigravity | 🔄 TODO |
| Feb 9-10 | Stripe Connect | Antigravity | 🔄 TODO |
| Feb 11-12 | Analytics + Ads | Antigravity | 🔄 TODO |
| Feb 13 | Final testing | Antigravity | 🔄 TODO |
| Feb 14 | Deploy staging | Antigravity | 🔄 TODO |
| Feb 15 | CEO sign-off | CEO | 🔄 TODO |
| Feb 16 | Deploy production | Antigravity | 🔄 TODO |
| Feb 17-18 | Monitor launch | All | 🔄 TODO |

---

## 🎯 SUCCESS CRITERIA (Week 2 Gate)

### **Technical**
- ✅ Build passes with 0 errors
- ✅ Lighthouse 80+
- ✅ No TypeScript errors
- ✅ All tests passing

### **Functional**
- ✅ Homepage loads <2 seconds
- ✅ Search works
- ✅ Claiming works (test with 5 creators)
- ✅ Payments work (test with 5 transactions)
- ✅ GA tracking works
- ✅ Mobile responsive

### **Business**
- ✅ 40+ creator claims from outreach
- ✅ 5+ first purchases
- ✅ $100-200 revenue generated
- ✅ 0 refunds
- ✅ 0 customer complaints

### **Go/No-Go Decision**
- ✅ ALL checks passed = GO (launch)
- ⚠️ 1 check failed = YELLOW (fix + retry)
- ❌ 2+ checks failed = STOP (pivot strategy)

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] All code merged to main
- [ ] All tests passing
- [ ] Build passes: `npm run build`
- [ ] Lighthouse 80+
- [ ] Staging environment tested
- [ ] Analytics configured
- [ ] Email templates configured
- [ ] Ads placeholder ready
- [ ] GitHub OAuth production keys set
- [ ] Stripe Connect live (not test)
- [ ] Database backup taken
- [ ] Rollback plan documented
- [ ] CEO approval obtained

---

## 📞 CONTACT & QUESTIONS

**Unclear about a task?**
- Option 1: Re-read this spec (answer might be here)
- Option 2: Ask CEO in Slack (mention task name)
- Option 3: DM Claude (for copy-related Qs)

**Blocked >15 min?**
- Post in Slack immediately
- Tag CEO + relevant person
- Don't guess or proceed without clarity

**Want to change scope?**
- DO NOT change it without CEO approval
- Even "small" changes can break launch
- Ask first, always

---

**Document Version**: 1.0 (Stage 1 MVP Spec)
**Status**: 🟡 PENDING CEO APPROVAL
**Last Updated**: Feb 4, 2026

✅ **READY FOR EXECUTION** (after CEO approval)
