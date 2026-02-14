# Production Verification Playbook

**Version**: 1.0
**Created**: 2026-02-14 (Post-INCIDENT-001)
**Owner**: PM (Gate 8 gatekeeper)
**Purpose**: Step-by-step manual testing for production deployments

---

## 🎯 WHEN TO USE THIS PLAYBOOK

**MANDATORY for**:
- Every production deployment
- Every hotfix deployment
- Post-incident verification
- Gate 8 approval process

**NEVER skip this playbook**, even if:
- "Tests passed" locally
- "Worked in development"
- "Only a small change"
- Time pressure or urgency

---

## ⏱️ TIME COMMITMENT

**Total Time**: 30-45 minutes
- Environment verification: 5 min
- Critical flow testing: 20-30 min
- Log monitoring: 10 min
- Documentation: 5 min

**Frequency**: Once per deployment (before Gate 8 approval)

---

## 📋 PRE-VERIFICATION SETUP

### Step 1: Access Production Environment

1. **Open Incognito/Private Browser Window**
   - Why: Ensures no cached credentials or state
   - Browser: Chrome, Firefox, or Safari

2. **Navigate to Production URL**
   - Primary: https://www.googleantigravity.directory
   - Verify HTTPS (padlock icon)
   - Check SSL certificate (should be Let's Encrypt)

3. **Open Developer Tools**
   - Press F12 or Cmd+Option+I (Mac)
   - Go to Console tab
   - Clear console
   - Watch for errors during testing

4. **Prepare Test Accounts**
   - Google account for OAuth testing
   - GitHub account for OAuth testing
   - PayPal sandbox account (if testing payments)
   - Razorpay test cards (if testing payments)

---

## ✅ VERIFICATION CHECKLIST

### 1. Environment Variable Verification (5 minutes)

**Goal**: Confirm production environment matches development

**Steps**:
1. Open Vercel dashboard → Project Settings → Environment Variables
2. Compare against `.env.local` file
3. Verify critical variables exist:

**Authentication**:
- [ ] `AUTH_SECRET` - Present and different from local
- [ ] `AUTH_URL` - Points to production domain
- [ ] `GOOGLE_CLIENT_ID` - Present
- [ ] `GOOGLE_CLIENT_SECRET` - Present
- [ ] `GITHUB_CLIENT_ID` - Present
- [ ] `GITHUB_CLIENT_SECRET` - Present

**Database**:
- [ ] `DATABASE_URL` - Points to production database
- [ ] Connection pooling configured

**Payment Providers**:
- [ ] `RAZORPAY_KEY_ID` - LIVE key (not test)
- [ ] `RAZORPAY_KEY_SECRET` - Present
- [ ] `PAYPAL_CLIENT_ID` - LIVE credentials
- [ ] `PAYPAL_CLIENT_SECRET` - Present
- [ ] `PAYPAL_MODE=live` - Set to "live" not "sandbox"

**Email**:
- [ ] `RESEND_API_KEY` - Production API key

**Result**: All critical variables present ✅ or Missing variables ❌

---

### 2. Homepage & Navigation (3 minutes)

**Goal**: Verify basic site functionality

**Steps**:
1. Load homepage (https://www.googleantigravity.directory)
2. Check console for errors
3. Verify page renders correctly
4. Test navigation

**Checklist**:
- [ ] Homepage loads (no 500/404 errors)
- [ ] Zero console errors on homepage
- [ ] Hero section displays
- [ ] Resource directory visible (876+ resources)
- [ ] Category filters work
- [ ] Search bar functional
- [ ] Navigation menu works (Browse, Tools, etc.)
- [ ] Footer displays with correct links

**Screenshot**: Capture homepage for documentation

---

### 3. Google OAuth Authentication (5 minutes)

**Goal**: Verify Google sign-in works end-to-end

**Steps**:
1. Click "Sign In" or "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. Select Google account
4. Grant permissions
5. Redirected back to site
6. User session created
7. Test sign out

**Checklist**:
- [ ] "Sign in with Google" button visible
- [ ] Click button → redirected to Google
- [ ] Google consent screen loads (no errors)
- [ ] URL contains valid `client_id` (not "undefined")
- [ ] Select account → redirected back to site
- [ ] User logged in (name/avatar visible)
- [ ] User session persists (refresh page, still logged in)
- [ ] Sign out works (user logged out)

**Console Check**: Zero errors during OAuth flow

**Common Issues**:
- `client_id=undefined` → Missing `GOOGLE_CLIENT_ID` in Vercel
- Redirect URI mismatch → Check Google Console authorized redirect URIs

---

### 4. GitHub OAuth Authentication (5 minutes)

**Goal**: Verify GitHub sign-in works end-to-end

**Steps**:
1. Sign out (if still logged in from Google test)
2. Click "Sign in with GitHub"
3. Redirected to GitHub OAuth authorization
4. Authorize application
5. Redirected back to site
6. User session created

**Checklist**:
- [ ] "Sign in with GitHub" button visible
- [ ] Click button → redirected to GitHub
- [ ] GitHub authorization screen loads
- [ ] URL contains valid `client_id` (not "undefined")
- [ ] **CRITICAL**: Verify URL is `https://github.com/login/oauth/authorize?client_id=<VALID_ID>`, NOT `client_id=undefined`
- [ ] Click "Authorize" → redirected back to site
- [ ] User logged in (GitHub username/avatar visible)
- [ ] User session persists

**Console Check**: Zero errors during OAuth flow

**Common Issues** (INCIDENT-001):
- `client_id=undefined` → Missing `GITHUB_CLIENT_ID` in Vercel ❌
- This was the root cause of INCIDENT-001 production outage

**Evidence**: Screenshot GitHub authorization URL showing valid client_id

---

### 5. Resource Claiming Flow (7 minutes)

**Goal**: Verify GitHub OAuth claim flow works end-to-end

**Prerequisites**: Must be logged in with GitHub account

**Steps**:
1. Find an unclaimed resource (browse directory)
2. Click on unclaimed resource
3. Click "Claim this Resource" button
4. GitHub OAuth flow (should already be authorized)
5. Redirected back to resource page
6. Resource now marked as "claimed"
7. Owner badge appears

**Checklist**:
- [ ] Unclaimed resource identified
- [ ] "Claim this Resource" button visible
- [ ] Click button → GitHub OAuth redirect
- [ ] OAuth URL has valid `client_id` (**not undefined**)
- [ ] Authorization completes
- [ ] Redirected back to resource page
- [ ] Resource status changed to "claimed"
- [ ] Owner badge shows GitHub username
- [ ] Claim appears in creator dashboard

**Console Check**: Zero errors during claim flow

**Critical Test**: This is the PRIMARY USER FLOW - if this fails, platform is broken

---

### 6. Resource Pricing (5 minutes)

**Goal**: Verify creator can set prices and enable monetization

**Prerequisites**: Must own a claimed resource

**Steps**:
1. Navigate to your claimed resource
2. Go to pricing/monetization settings
3. Set price (e.g., $10)
4. Enable monetization
5. Verify price displays on resource page

**Checklist**:
- [ ] Pricing settings accessible
- [ ] Can set custom price ($5 - $500 range)
- [ ] 80/20 commission split displayed
- [ ] Creator sees "You'll earn 80%" message
- [ ] Enable monetization toggle works
- [ ] Price displays on public resource page
- [ ] "Buy for $X" button appears

**Console Check**: Zero errors during pricing setup

---

### 7. Payment Flow - Razorpay (Optional - 5 minutes)

**Goal**: Verify Razorpay payment processing works

**Prerequisites**: Resource with price set, NOT logged in as owner

**Steps**:
1. Navigate to priced resource (in incognito window)
2. Click "Buy for $X" button
3. Razorpay checkout modal opens
4. Enter test card details
5. Complete payment
6. Verify purchase confirmation

**Test Card Details**:
- Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: 123

**Checklist**:
- [ ] "Buy" button visible
- [ ] Click button → Razorpay modal opens
- [ ] Payment form loads (no errors)
- [ ] Can enter card details
- [ ] Submit payment → processing
- [ ] Payment confirmed
- [ ] Download link appears
- [ ] Purchase recorded in database

**Console Check**: Zero errors during payment flow

**Skip if**: Not critical for every deployment (only test if payment code changed)

---

### 8. Creator Dashboard (3 minutes)

**Goal**: Verify creator can view earnings and sales

**Prerequisites**: Must be logged in as creator with sales

**Steps**:
1. Navigate to creator dashboard (/creator/dashboard)
2. Verify earnings display
3. Check sales history
4. Test payout request (if available)

**Checklist**:
- [ ] Creator dashboard loads
- [ ] Total earnings displayed correctly
- [ ] Sales history shows transactions
- [ ] Revenue split shown (80% to creator)
- [ ] Payout request button functional
- [ ] Can request payout (if balance > $10)

---

### 9. Production Logs Monitoring (10 minutes)

**Goal**: Monitor for errors in production logs

**Steps**:
1. Open Vercel dashboard → Deployments → Latest → Logs
2. Filter for errors: `level:error`
3. Watch logs during testing
4. Continue monitoring for 30 minutes after deployment

**Checklist**:
- [ ] No database connection errors
- [ ] No authentication errors
- [ ] No payment API errors
- [ ] No missing environment variable errors
- [ ] No 500 Internal Server Errors
- [ ] Warning count acceptable (<10 in 30 min)

**Common Errors to Watch**:
- `process.env.XXX is undefined` → Missing env var
- `ECONNREFUSED` → Database connection issue
- `401 Unauthorized` → API credential issue
- `PaymentError` → Payment provider misconfiguration

**Action if errors found**: STOP deployment, rollback, investigate

---

### 10. Performance Check (5 minutes)

**Goal**: Verify production performance is acceptable

**Steps**:
1. Open Chrome DevTools → Lighthouse
2. Run audit (Mobile + Desktop)
3. Check performance metrics

**Checklist**:
- [ ] Performance score: 90+ (mobile)
- [ ] Performance score: 95+ (desktop)
- [ ] SEO score: 95+
- [ ] Best Practices: 90+
- [ ] Accessibility: 85+
- [ ] First Contentful Paint: <2s
- [ ] Time to Interactive: <3s

**Screenshot**: Capture Lighthouse results

**Action if scores low**: Investigate performance bottlenecks, may not be blocker for urgent hotfixes

---

## 📊 VERIFICATION SUMMARY TEMPLATE

**Use this template to document verification results**:

```
## PRODUCTION VERIFICATION - [ENTRY-XXX]

**Verified by**: [PM Name]
**Date**: [YYYY-MM-DD HH:MM:SS]
**Production URL**: https://www.googleantigravity.directory
**Deployment**: [Vercel deployment ID]

### Results Summary
- Environment Variables: ✅ All present
- Homepage & Navigation: ✅ Passed
- Google OAuth: ✅ Passed
- GitHub OAuth: ✅ Passed
- Resource Claiming: ✅ Passed
- Resource Pricing: ✅ Passed
- Payment Flow: ⏭️ Skipped (not changed)
- Creator Dashboard: ✅ Passed
- Production Logs: ✅ Zero errors (30 min)
- Performance: ✅ Lighthouse 92/100

### Issues Found
- None

### Evidence
- Screenshots: [Link to folder]
- Video walkthrough: [Link]
- Lighthouse report: [Link]
- Production logs: [Link]

**FINAL VERDICT**: ✅ PRODUCTION VERIFIED - Gate 8 approved

**Signature**: [PM Name]
**Timestamp**: [YYYY-MM-DD HH:MM:SS]
```

---

## 🚨 FAILURE SCENARIOS

### If GitHub OAuth fails (client_id=undefined):

**Symptoms**:
- Redirect URL: `https://github.com/login/oauth/authorize?client_id=undefined`
- GitHub returns 404 error
- Cannot complete claim flow

**Root Cause**: Missing `GITHUB_CLIENT_ID` in Vercel

**Fix**:
1. Verify GitHub OAuth app exists
2. Add credentials to Vercel:
   ```bash
   vercel env add GITHUB_CLIENT_ID production
   vercel env add GITHUB_CLIENT_SECRET production
   ```
3. Redeploy: `vercel --prod`
4. Re-test verification

**Lesson**: This was INCIDENT-001 - always verify OAuth before approval

---

### If Payment Processing fails:

**Symptoms**:
- Payment modal doesn't open
- API errors in console
- `401 Unauthorized` from payment provider

**Root Cause**: Missing payment credentials or wrong mode (sandbox vs live)

**Fix**:
1. Verify Razorpay/PayPal credentials in Vercel
2. Confirm `PAYPAL_MODE=live` (not "sandbox")
3. Check webhook secrets configured
4. Redeploy if needed

---

### If Database Errors appear:

**Symptoms**:
- `ECONNREFUSED` in logs
- `Connection pool exhausted`
- Data not saving

**Root Cause**: Database connection string incorrect or pooling misconfigured

**Fix**:
1. Verify `DATABASE_URL` points to production database
2. Check connection pooling settings
3. Verify database is online (Supabase dashboard)
4. Check firewall rules (IP whitelist)

---

## 🎓 POST-INCIDENT LEARNINGS

**From INCIDENT-001** (2026-02-14):

**What We Missed**:
- Approved deployment in 2 minutes (too fast)
- Never manually tested GitHub OAuth on production
- Assumed "tests passed" meant production ready
- Didn't verify environment variables

**What We Learned**:
- Manual testing is NON-NEGOTIABLE
- OAuth providers must be tested on production
- Environment parity must be verified
- Test quality matters more than test count

**New Rule**: NEVER approve Gate 8 without completing this entire playbook

---

## 📞 ESCALATION

**If critical issues found during verification**:

1. **STOP deployment** - Do not approve Gate 8
2. **Document issues** - Screenshot errors, copy logs
3. **Notify coder** - Return task with detailed findings
4. **Create incident** - If already deployed, create incident doc
5. **Rollback if needed** - Use Vercel dashboard to rollback

**Never skip verification** even under time pressure. Better to delay launch than deploy broken code.

---

**Created**: 2026-02-14
**Owner**: PM (Claude Code)
**Status**: ACTIVE - Mandatory for all deployments
**Related**: `.agent/GATE_8_PRODUCTION_CHECKLIST.md`
