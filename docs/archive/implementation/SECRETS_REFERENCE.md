# 🔐 SECRETS & API KEYS REFERENCE
## Complete Guide to All Environment Variables

**Last Updated**: 2026-02-11
**Owner**: CEO (maintains actual secrets)
**Reference**: PM/Coder (use this guide for setup)

---

## 📋 QUICK REFERENCE

**Total Required Variables**: 18
**Optional Variables**: 3
**Production-Critical**: 14

---

## 🗂️ ENVIRONMENT FILES

### Local Development
- **File**: `.env.local` (create from `.env.example`)
- **Location**: Project root
- **Git**: ❌ NEVER commit (in .gitignore)
- **Who Sets**: CEO provides, Coder copies to `.env.local`

### Production (Vercel)
- **Location**: Vercel Dashboard → Project Settings → Environment Variables
- **Who Sets**: CEO
- **Verification**: Gate 0 - Environment Validation (`npm run validate:env:production`)

---

## 🔑 1. DATABASE

### DATABASE_URL
```bash
DATABASE_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres"
```

**What**: PostgreSQL connection string (Supabase)
**Where to Get**: [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → Database → Connection String
**Used By**: Drizzle ORM, all database queries
**Production**: ✅ REQUIRED
**Security**: 🔴 HIGH - Full database access

**Setup Steps**:
1. Login to Supabase Dashboard
2. Select project: `antigravity-directory`
3. Go to: Settings → Database → Connection pooling
4. Copy: **Connection string (Transaction mode)** ⚠️ NOT Session mode
5. Replace `[password]` with actual database password

**Common Issues**:
- ❌ Using Session mode → Use Transaction mode (`{ prepare: false }`)
- ❌ Wrong project ID → Check project URL in Supabase
- ❌ Firewall blocking → Allow Vercel IPs in Supabase settings

---

## 🔒 2. AUTHENTICATION

### AUTH_SECRET
```bash
AUTH_SECRET="your-secret-key-here-must-be-at-least-32-chars"
```

**What**: NextAuth session encryption key
**Where to Get**: Generate with `openssl rand -base64 32`
**Used By**: NextAuth session management
**Production**: ✅ REQUIRED
**Security**: 🔴 HIGH - Protects all sessions

**Setup Steps**:
```bash
# Generate new secret
openssl rand -base64 32

# Copy output to .env.local
AUTH_SECRET="<paste-generated-secret-here>"
```

**Common Issues**:
- ❌ Less than 32 chars → NextAuth will error
- ❌ Same in dev/prod → NEVER reuse, generate separate for production
- ❌ Spaces in secret → Remove spaces

---

### GOOGLE_CLIENT_ID
```bash
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
```

**What**: Google OAuth Client ID
**Where to Get**: [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
**Used By**: Google Sign-In, NextAuth
**Production**: ✅ REQUIRED
**Security**: 🟡 MEDIUM - Public (safe to expose)

**Setup Steps**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `antigravity-directory` (or create new)
3. Go to: APIs & Services → Credentials
4. Click: Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs:
   - Dev: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://googleantigravity.directory/api/auth/callback/google`
7. Copy Client ID

---

### GOOGLE_CLIENT_SECRET
```bash
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

**What**: Google OAuth Client Secret
**Where to Get**: Same page as Client ID (Google Cloud Console)
**Used By**: Google Sign-In, NextAuth
**Production**: ✅ REQUIRED
**Security**: 🔴 HIGH - Keep secret

**Setup Steps**:
- Same as GOOGLE_CLIENT_ID above
- Copy Client Secret from same page

---

## 💳 3. PAYMENTS - RAZORPAY (India)

### RAZORPAY_KEY_ID
```bash
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"  # Test mode
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxxx"  # Production
```

**What**: Razorpay publishable key (safe to expose in frontend)
**Where to Get**: [Razorpay Dashboard](https://dashboard.razorpay.com/) → Settings → API Keys
**Used By**: Payment checkout, Razorpay integration
**Production**: ✅ REQUIRED (Indian users)
**Security**: 🟡 MEDIUM - Public key

**Setup Steps**:
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to: Settings → API Keys
3. Mode: Test (for development) or Live (for production)
4. Copy Key ID (starts with `rzp_test_` or `rzp_live_`)

---

### RAZORPAY_KEY_SECRET
```bash
RAZORPAY_KEY_SECRET="your-razorpay-secret-key"
```

**What**: Razorpay secret key (payment verification)
**Where to Get**: Same page as Key ID
**Used By**: Server-side payment verification
**Production**: ✅ REQUIRED (Indian users)
**Security**: 🔴 HIGH - NEVER expose to frontend

**Setup Steps**:
- Same as RAZORPAY_KEY_ID above
- Copy Key Secret from same page
- ⚠️ Click "Show" to reveal secret

---

## 💰 4. PAYMENTS - PAYPAL (International)

### PAYPAL_CLIENT_ID
```bash
PAYPAL_CLIENT_ID="your-paypal-client-id"
```

**What**: PayPal REST API Client ID
**Where to Get**: [PayPal Developer Dashboard](https://developer.paypal.com/) → My Apps & Credentials
**Used By**: PayPal checkout, international payments
**Production**: ✅ REQUIRED (international users)
**Security**: 🟡 MEDIUM - Public key

**Setup Steps**:
1. Login to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Go to: My Apps & Credentials
3. Mode: Sandbox (dev) or Live (production)
4. Create App or select existing app
5. Copy Client ID

---

### PAYPAL_CLIENT_SECRET
```bash
PAYPAL_CLIENT_SECRET="your-paypal-secret-key"
```

**What**: PayPal REST API Secret
**Where to Get**: Same page as Client ID
**Used By**: Server-side payment verification
**Production**: ✅ REQUIRED (international users)
**Security**: 🔴 HIGH - NEVER expose to frontend

---

### PAYPAL_MODE
```bash
PAYPAL_MODE="sandbox"  # Development
PAYPAL_MODE="live"     # Production
```

**What**: PayPal environment mode
**Where to Get**: Set manually
**Used By**: PayPal SDK initialization
**Production**: ✅ REQUIRED (must be "live")
**Security**: 🟢 LOW - Just a flag

---

## 🤖 5. AI / CONTENT GENERATION

### GOOGLE_AI_API_KEY
```bash
GOOGLE_AI_API_KEY="AIzaSyXxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**What**: Google Gemini API key for content generation
**Where to Get**: [Google AI Studio](https://makersuite.google.com/app/apikey)
**Used By**: Content suggestions, description generation
**Production**: 🟡 OPTIONAL (enhances UX, not critical)
**Security**: 🔴 HIGH - Keep secret

**Setup Steps**:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click: Create API Key
3. Select project or create new
4. Copy API key

**Common Issues**:
- ❌ Quota exceeded → Check usage in Google Cloud Console
- ❌ API not enabled → Enable Generative Language API

---

## 📧 6. EMAIL (Resend)

### RESEND_API_KEY
```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
```

**What**: Resend API key for transactional emails
**Where to Get**: [Resend Dashboard](https://resend.com/api-keys)
**Used By**: Email notifications, creator alerts
**Production**: ✅ REQUIRED (for notifications)
**Security**: 🔴 HIGH - Keep secret

**Setup Steps**:
1. Login to [Resend](https://resend.com/)
2. Go to: API Keys
3. Click: Create API Key
4. Name: `antigravity-production` or `antigravity-dev`
5. Permissions: Full access
6. Copy key (shown once)

**Common Issues**:
- ❌ Domain not verified → Add/verify domain in Resend
- ❌ Sending limit → Check plan limits

---

## 🚀 7. REDIS (Upstash - Rate Limiting)

### UPSTASH_REDIS_REST_URL
```bash
UPSTASH_REDIS_REST_URL="https://us1-caring-eagle-12345.upstash.io"
```

**What**: Upstash Redis REST endpoint
**Where to Get**: [Upstash Console](https://console.upstash.com/) → Database → REST API
**Used By**: Rate limiting, caching
**Production**: ✅ REQUIRED (prevent abuse)
**Security**: 🟡 MEDIUM - Endpoint URL

**Setup Steps**:
1. Login to [Upstash Console](https://console.upstash.com/)
2. Create new Redis database (or select existing)
3. Go to: Database details → REST API
4. Copy: UPSTASH_REDIS_REST_URL

---

### UPSTASH_REDIS_REST_TOKEN
```bash
UPSTASH_REDIS_REST_TOKEN="AXXXAAIncDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**What**: Upstash Redis authentication token
**Where to Get**: Same page as URL
**Used By**: Rate limiting, caching
**Production**: ✅ REQUIRED (prevent abuse)
**Security**: 🔴 HIGH - Keep secret

---

## 🐛 8. ERROR TRACKING (Sentry)

### SENTRY_DSN
```bash
SENTRY_DSN="https://xxxxx@o123456.ingest.sentry.io/7654321"
```

**What**: Sentry Data Source Name (server-side errors)
**Where to Get**: [Sentry Dashboard](https://sentry.io/) → Project Settings → Client Keys (DSN)
**Used By**: Server-side error tracking
**Production**: 🟡 OPTIONAL (highly recommended)
**Security**: 🟡 MEDIUM - Public, but contains project ID

---

### NEXT_PUBLIC_SENTRY_DSN
```bash
NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@o123456.ingest.sentry.io/7654321"
```

**What**: Sentry DSN for client-side errors
**Where to Get**: Same as SENTRY_DSN
**Used By**: Frontend error tracking
**Production**: 🟡 OPTIONAL (highly recommended)
**Security**: 🟡 MEDIUM - Publicly exposed (safe)

---

### SENTRY_AUTH_TOKEN
```bash
SENTRY_AUTH_TOKEN="sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**What**: Sentry authentication token for releases/sourcemaps
**Where to Get**: [Sentry](https://sentry.io/) → Settings → Auth Tokens
**Used By**: Build-time sourcemap uploads
**Production**: 🟡 OPTIONAL (for debugging)
**Security**: 🔴 HIGH - Keep secret

**Setup Steps**:
1. Go to Sentry → Settings → Auth Tokens
2. Create New Token
3. Scopes: `project:releases`, `project:write`
4. Copy token

---

## 🌐 9. PUBLIC VARIABLES

### NEXT_PUBLIC_SITE_URL
```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"              # Development
NEXT_PUBLIC_SITE_URL="https://googleantigravity.directory" # Production
```

**What**: Public site URL (used in metadata, redirects)
**Where to Get**: Set manually
**Used By**: OpenGraph tags, canonical URLs, redirects
**Production**: ✅ REQUIRED
**Security**: 🟢 LOW - Publicly visible

---

## ⚙️ 10. ENVIRONMENT

### NODE_ENV
```bash
NODE_ENV="development"  # Local development
NODE_ENV="production"   # Vercel production
```

**What**: Node.js environment mode
**Where to Get**: Auto-set by Next.js/Vercel
**Used By**: Build optimizations, error handling
**Production**: ✅ AUTO (Vercel sets this)
**Security**: 🟢 LOW - Just a flag

---

## 📋 CHECKLISTS

### ✅ New Developer Setup

**Step 1: Copy Template**
```bash
cp .env.example .env.local
```

**Step 2: Get Secrets from CEO**
- [ ] DATABASE_URL
- [ ] AUTH_SECRET (or generate: `openssl rand -base64 32`)
- [ ] GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
- [ ] RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET
- [ ] PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET
- [ ] RESEND_API_KEY
- [ ] UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

**Step 3: Validate**
```bash
npm run validate:env
```

**Step 4: Test**
```bash
npm run dev
# Open http://localhost:3000
# Test: Google Sign-In works
```

---

### 🚀 Production Deployment Checklist

**Vercel Environment Variables**:
- [ ] DATABASE_URL (production Supabase)
- [ ] AUTH_SECRET (NEW secret, not dev secret)
- [ ] GOOGLE_CLIENT_ID + SECRET (with prod redirect URI)
- [ ] RAZORPAY_KEY_ID + SECRET (LIVE mode: `rzp_live_...`)
- [ ] PAYPAL_CLIENT_ID + SECRET (LIVE credentials)
- [ ] PAYPAL_MODE="live"
- [ ] RESEND_API_KEY
- [ ] UPSTASH_REDIS_REST_URL + TOKEN
- [ ] NEXT_PUBLIC_SITE_URL="https://googleantigravity.directory"
- [ ] SENTRY_DSN + NEXT_PUBLIC_SENTRY_DSN (optional)
- [ ] SENTRY_AUTH_TOKEN (optional)

**Validation**:
```bash
# Vercel will run this on build
npm run validate:env:production
```

**Post-Deployment**:
- [ ] Test Google Sign-In on production
- [ ] Test payment flow (Razorpay test mode first)
- [ ] Verify emails sending (Resend)
- [ ] Check error tracking (Sentry)

---

## 🔐 SECURITY BEST PRACTICES

### DO's ✅
- ✅ Use different secrets for dev/prod (especially AUTH_SECRET)
- ✅ Rotate secrets every 90 days (production)
- ✅ Use `.env.local` (never `.env`)
- ✅ Validate environment on every deploy (`validate:env`)
- ✅ Use Vercel's encrypted environment variables
- ✅ Test with live keys in production mode first
- ✅ Enable MFA on all provider accounts (Google, Razorpay, PayPal, etc.)

### DON'Ts ❌
- ❌ NEVER commit `.env.local` to git
- ❌ NEVER share secrets in Slack/Discord/Email (use 1Password/LastPass)
- ❌ NEVER reuse prod secrets in dev
- ❌ NEVER hardcode secrets in code
- ❌ NEVER expose server-side secrets to frontend (use `NEXT_PUBLIC_` only for truly public values)
- ❌ NEVER use test mode keys in production (especially payments)

---

## 🆘 TROUBLESHOOTING

### "Environment validation failed"
**Cause**: Missing or invalid environment variables
**Fix**:
```bash
npm run validate:env
# Read error messages, add missing variables to .env.local
```

### "Database connection failed"
**Cause**: Wrong DATABASE_URL or network issue
**Check**:
- [ ] DATABASE_URL format correct?
- [ ] Using Transaction mode connection string (not Session)?
- [ ] Supabase project not paused?
- [ ] Firewall blocking? (allow Vercel IPs)

### "Google Sign-In not working"
**Cause**: Wrong OAuth credentials or redirect URI
**Fix**:
1. Check GOOGLE_CLIENT_ID and SECRET are correct
2. Verify authorized redirect URIs in Google Cloud Console:
   - Dev: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://googleantigravity.directory/api/auth/callback/google`

### "Payment gateway error"
**Cause**: Using test keys in production or vice versa
**Fix**:
- Dev: Use `rzp_test_...` and PayPal sandbox mode
- Prod: Use `rzp_live_...` and PAYPAL_MODE="live"

### "Rate limiting not working"
**Cause**: Upstash Redis not configured
**Fix**:
- Check UPSTASH_REDIS_REST_URL and TOKEN are set
- Test Redis connection in Upstash Console

---

## 📞 WHO TO CONTACT

**Missing Secrets**: CEO (has access to all provider accounts)
**Setup Issues**: PM (this doc) or Coder (Antigravity)
**Provider Issues**: Check provider status pages:
- Supabase: https://status.supabase.com/
- Vercel: https://www.vercel-status.com/
- Razorpay: https://status.razorpay.com/
- PayPal: https://www.paypal-status.com/

---

## 📝 CHANGE LOG

| Date | Change | By |
|------|--------|-----|
| 2026-02-11 | Created comprehensive secrets reference | PM |
| TBD | Add Stripe Connect keys (Phase A) | PM |
| TBD | Add Chrome Extension API keys (Phase 2) | PM |

---

**This is the SINGLE SOURCE OF TRUTH for all secrets/keys.**

**Never ask CEO for individual keys - refer to this doc first.**

**Update this doc when adding new environment variables.**

---

**Version**: 1.0
**Last Updated**: 2026-02-11
**Maintained By**: PM (Claude Code)
