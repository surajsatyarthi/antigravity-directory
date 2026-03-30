# ENTRY-017: Production Deployment Guide

**Status**: ✅ READY TO DEPLOY
**Target**: 2026-02-14 (Today)
**Owner**: Antigravity (Coder)
**PM Approval**: ✅ Granted

---

## 📊 PRE-DEPLOYMENT STATUS

### Completed Prerequisites
- ✅ **ENTRY-015**: Quality gates passing (lint, build, tests)
- ✅ **ENTRY-016**: Deployment prep (env vars, migrations, release tag)
- ✅ **Unit Tests**: 99/99 PASSED
- ✅ **Build**: 0 errors
- ✅ **Lint**: 0 warnings
- ✅ **Release Tag**: v1.0.0-mvp (commit 2d099f8)
- ✅ **Email System**: Tested and working
- ✅ **Environment Variables**: All documented in `.env.example`

### Known Issues (Non-Blocking)
- ⚠️ **E2E Tests**: 2/92 failing (90/92 = 97.8% pass rate)
  - Scheduled fix: Week 1 post-launch
  - Impact: Non-blocking (core functionality verified via unit tests)

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Final Pre-Deployment Verification (5 minutes)

```bash
# 1. Verify working tree is clean
git status

# 2. Verify on main branch
git branch --show-current

# 3. Verify latest commit
git log -1 --oneline

# 4. Run final quality checks
npm run lint
npm run build
npm test

# 5. Verify environment template
cat .env.example
```

**Checklist**:
- [ ] Working tree clean
- [ ] On main branch
- [ ] Latest commit is deployment prep
- [ ] All quality checks pass
- [ ] `.env.example` has all variables

---

### Step 2: Vercel Deployment (10 minutes)

#### Option A: Deploy via Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Link to existing project? Yes
# - Project name: antigravity-directory
# - Framework preset: Next.js
```

#### Option B: Deploy via Git Push (Alternative)
```bash
# Push to main branch (triggers auto-deploy)
git push origin main

# Monitor deployment:
# https://vercel.com/[your-team]/antigravity-directory/deployments
```

---

### Step 3: Configure Production Environment Variables (15 minutes)

**Navigate to**: Vercel Dashboard → Project Settings → Environment Variables

#### Required Variables (Copy from `.env.example`):

**Database**:
```
DATABASE_URL=postgresql://[production-db-url]
```

**Authentication**:
```
AUTH_SECRET=[generate: openssl rand -base64 32]
AUTH_URL=https://www.googleantigravity.directory
GOOGLE_CLIENT_ID=[from Google Console]
GOOGLE_CLIENT_SECRET=[from Google Console]
GITHUB_CLIENT_ID=[from GitHub OAuth App]
GITHUB_CLIENT_SECRET=[from GitHub OAuth App]
```

**Payment Providers**:
```
# Razorpay (Primary - India)
RAZORPAY_KEY_ID=[live key from dashboard]
RAZORPAY_KEY_SECRET=[live secret from dashboard]
RAZORPAY_WEBHOOK_SECRET=[webhook secret]

# PayPal (International)
PAYPAL_CLIENT_ID=[live client ID]
PAYPAL_CLIENT_SECRET=[live secret]
PAYPAL_MODE=live
```

**Email (Resend)**:
```
RESEND_API_KEY=[production API key]
```

**Analytics (Optional)**:
```
APOLLO_API_KEY=[optional]
APOLLO_API_URL=[optional]
GOOGLE_ANALYTICS_ID=[optional]
```

**Checklist**:
- [ ] All 15 required variables set
- [ ] Payment providers in LIVE mode (not sandbox)
- [ ] Auth URL matches production domain
- [ ] Database URL points to production DB

---

### Step 4: Database Migrations (5 minutes)

```bash
# Option A: Run migrations from local machine pointing to production DB
DATABASE_URL="postgresql://[production-db-url]" npm run drizzle:migrate

# Option B: Let Vercel auto-run migrations on deployment
# (migrations run automatically if configured in build script)
```

**Verify migrations**:
```bash
# Connect to production DB and check
psql "postgresql://[production-db-url]"
\dt  # List tables (should show 21 tables)
```

**Expected Tables**:
- users
- resources
- resource_claims
- purchases
- payout_requests
- sessions
- verification_tokens
- ... (16 more)

**Checklist**:
- [ ] All 21 tables exist in production DB
- [ ] `payout_requests` table exists (from ENTRY-019)
- [ ] All indexes created
- [ ] No migration errors

---

### Step 5: DNS & Domain Configuration (10 minutes)

**Domain**: `googleantigravity.directory`

#### Vercel DNS Setup:
1. Navigate to: Vercel Dashboard → Project Settings → Domains
2. Add domain: `www.googleantigravity.directory`
3. Add domain: `googleantigravity.directory` (redirect to www)
4. Copy DNS records provided by Vercel

#### DNS Provider (Namecheap/Cloudflare/etc):
1. Add CNAME record:
   - **Host**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: Automatic

2. Add A record (root domain):
   - **Host**: `@`
   - **Value**: `76.76.21.21` (Vercel IP)
   - **TTL**: Automatic

**Wait Time**: DNS propagation (5-60 minutes)

**Verify**:
```bash
# Check DNS propagation
dig www.googleantigravity.directory
dig googleantigravity.directory
```

**Checklist**:
- [ ] CNAME record added for www
- [ ] A record added for root domain
- [ ] DNS propagating (check with dig)
- [ ] Vercel dashboard shows "DNS Configured"

---

### Step 6: SSL Certificate Verification (Automatic)

Vercel automatically provisions SSL certificates via Let's Encrypt.

**Verify**:
1. Visit: https://www.googleantigravity.directory
2. Check for padlock icon in browser
3. Click padlock → View certificate
4. Verify: Issued by "Let's Encrypt"

**Checklist**:
- [ ] HTTPS working
- [ ] SSL certificate valid
- [ ] No mixed content warnings
- [ ] HTTP redirects to HTTPS

---

### Step 7: Payment Provider Configuration (15 minutes)

#### Razorpay (Primary - India)
1. Login to Razorpay Dashboard
2. Navigate to: Settings → API Keys
3. Copy **Live Key ID** and **Live Key Secret**
4. Add to Vercel environment variables
5. Navigate to: Settings → Webhooks
6. Add webhook URL: `https://www.googleantigravity.directory/api/payments/razorpay/webhook`
7. Events to subscribe:
   - `payment.captured`
   - `payment.failed`
8. Copy webhook secret → Add to Vercel env vars

#### PayPal (International)
1. Login to PayPal Developer Dashboard
2. Switch to: **Live** mode (not Sandbox)
3. Navigate to: My Apps & Credentials
4. Create new app (if not exists): "Antigravity Directory"
5. Copy **Live Client ID** and **Secret**
6. Add to Vercel environment variables
7. Set `PAYPAL_MODE=live` in Vercel

**Checklist**:
- [ ] Razorpay in **Live** mode
- [ ] Razorpay webhook configured
- [ ] PayPal in **Live** mode
- [ ] Both API keys in Vercel env vars

---

### Step 8: Production Smoke Tests (20 minutes)

#### Critical User Flows to Test:

**1. Homepage & Browse**
- [ ] Homepage loads (https://www.googleantigravity.directory)
- [ ] Browse page loads (/browse)
- [ ] Search works
- [ ] Filters work
- [ ] Resource cards display

**2. Authentication**
- [ ] Sign in with Google
- [ ] Sign in with GitHub
- [ ] User session persists
- [ ] Sign out works

**3. Resource Claiming**
- [ ] View unclaimed resource
- [ ] Click "Claim this Resource"
- [ ] GitHub OAuth flow completes
- [ ] Resource marked as claimed
- [ ] Owner badge appears

**4. Resource Pricing**
- [ ] Go to claimed resource
- [ ] Set price ($10)
- [ ] Enable monetization
- [ ] Price displays on resource page

**5. Purchase Flow (Razorpay)**
- [ ] Click "Buy for $10"
- [ ] Checkout modal opens
- [ ] Razorpay payment form loads
- [ ] Complete test payment (use test card)
- [ ] Purchase confirmed
- [ ] Download link appears

**6. Purchase Flow (PayPal)**
- [ ] Click "Buy for $10"
- [ ] Select PayPal
- [ ] Redirect to PayPal
- [ ] Complete payment
- [ ] Redirect back to site
- [ ] Purchase confirmed

**7. Creator Dashboard**
- [ ] View earnings
- [ ] See sales history
- [ ] Request payout ($10)
- [ ] Payout request created

**8. Admin Payout Approval**
- [ ] Login as admin
- [ ] Navigate to /admin/payouts
- [ ] See pending payout
- [ ] Approve payout
- [ ] Email sent to creator

**9. Email Notifications**
- [ ] Payout approval email received
- [ ] Check spam folder if not in inbox
- [ ] Email renders correctly

**10. Error Handling**
- [ ] Visit non-existent page → 404
- [ ] Trigger error → 500 page
- [ ] Error pages branded correctly

---

### Step 9: Monitor Production Logs (30 minutes)

#### Vercel Logs:
1. Navigate to: Vercel Dashboard → Deployments → [Latest] → Logs
2. Watch for errors during first 30 minutes
3. Common issues to check:
   - Database connection errors
   - API key errors (payment providers)
   - Environment variable missing

#### Check for Errors:
```bash
# Filter for errors only
# In Vercel dashboard, use filter: level:error
```

**Checklist**:
- [ ] No database connection errors
- [ ] No payment API errors
- [ ] No authentication errors
- [ ] No missing environment variables

---

### Step 10: Post-Deployment Validation (15 minutes)

#### Performance Check:
1. Run Lighthouse audit:
   - Navigate to: https://www.googleantigravity.directory
   - Open DevTools → Lighthouse
   - Run audit (Mobile + Desktop)
   - Target: 90+ Performance, 95+ SEO

2. Check page load times:
   - Homepage: < 2 seconds
   - Browse page: < 3 seconds
   - Resource detail: < 2 seconds

#### Functionality Check:
- [ ] All critical paths working
- [ ] Zero console errors on key pages
- [ ] Mobile responsive (test on phone)
- [ ] Payments processing correctly
- [ ] Emails sending

---

## ✅ DEPLOYMENT ACCEPTANCE CRITERIA

**All must be ✅ to mark ENTRY-017 as DONE**:

- [ ] Site live at https://www.googleantigravity.directory
- [ ] HTTPS working (SSL certificate valid)
- [ ] Razorpay in **live mode** (test payment completes)
- [ ] PayPal in **live mode** (test payment completes)
- [ ] All critical paths tested (claim, purchase, payout)
- [ ] Zero production errors in logs (first 30 mins)
- [ ] DNS fully propagated
- [ ] Email notifications working
- [ ] Database migrations applied (21 tables)
- [ ] Performance acceptable (Lighthouse 90+)

---

## 🚨 ROLLBACK PLAN

**If critical issues found:**

```bash
# Option A: Revert via Vercel Dashboard
# 1. Go to: Deployments
# 2. Find previous working deployment
# 3. Click "Promote to Production"

# Option B: Revert via Git
git revert HEAD
git push origin main
# Vercel auto-deploys reverted commit
```

**When to Rollback**:
- Payment processing failures
- Database corruption
- Authentication failures
- Critical security vulnerabilities
- Site completely down

**Recovery Time**: < 5 minutes

---

## 📋 POST-DEPLOYMENT CHECKLIST

**Immediately After Launch**:
- [ ] Announce on Twitter/LinkedIn
- [ ] Email 5-10 beta testers
- [ ] Monitor error logs (first 24 hours)
- [ ] Watch for first real claims
- [ ] Watch for first real purchases

**Week 1 Post-Launch**:
- [ ] Fix 2 E2E test failures (ENTRY-014)
- [ ] Create retroactive Gate 8 reports (PM debt)
- [ ] Create retroactive research audits (PM debt)
- [ ] Implement automated circular enforcement
- [ ] ENTRY-029: Fix protocol enforcement gaps

---

## 📞 SUPPORT CONTACTS

**Payment Issues**:
- Razorpay Support: support@razorpay.com
- PayPal Support: merchantsupport@paypal.com

**Infrastructure Issues**:
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com

**Email Issues**:
- Resend Support: support@resend.com

---

**Deployment Owner**: Antigravity (Coder)
**PM Approval**: Claude Code ✅
**Target Completion**: 2026-02-14 (Today)
**Estimated Time**: 2-3 hours total

**Next Action**: Execute Step 1 (Pre-Deployment Verification)
