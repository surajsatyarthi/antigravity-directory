# Resend Domain Verification Guide

## Current Status
- **API Key**: ✅ Working (`re_H7mDMrN8...`)
- **Domain**: ⚠️ **PENDING VERIFICATION** (`googleantigravity.directory`)

## Temporary Solution
Emails are currently sent from `onboarding@resend.dev` (Resend's verified domain) until custom domain verification completes.

## DNS Verification Steps

### 1. Access Your Domain Registrar
Log in to where you manage DNS for `googleantigravity.directory` (e.g., GoDaddy, Namecheap, Cloudflare, Google Domains).

### 2. Get DNS Records from Resend
1. Go to Resend dashboard → Domains
2. Click on `googleantigravity.directory` (the pending domain)
3. You'll see 3 DNS records to add:

   **Example records** (yours will have different values):
   
   ```
   Type: TXT
   Name: resend._domainkey
   Value: p=MIGfMA0G... (long string)
   
   Type: TXT  
   Name: @
   Value: v=spf1 include:resend.com ~all
   
   Type: TXT
   Name: _resend
   Value: resend-domain-verification=abc123xyz
   ```

### 3. Add Records to Your DNS
- **TXT Record 1** (DKIM): Used for email authentication
- **TXT Record 2** (SPF): Authorizes Resend to send from your domain
- **TXT Record 3** (Verification): Proves you own the domain

**Important**: 
- Use exact values from Resend (don't copy the examples above)
- TTL can be 3600 (1 hour) or Auto

### 4. Wait for Propagation
- **Typical**: 5-10 minutes
- **Maximum**: Up to 48 hours (rare)

### 5. Verify in Resend
1. Return to Resend dashboard
2. Click **"Verify DNS Records"**
3. Status should change from "Pending" → "Verified"

### 6. Update Email Code (After Verification)
Once verified, update `src/lib/email.ts`:

```typescript
// Change FROM_EMAIL to use your verified domain
const FROM_EMAIL = 'Antigravity Directory <payouts@googleantigravity.directory>';
```

## Testing After Verification

Run this to confirm emails send from your custom domain:

```bash
npx tsx scripts/test-resend-integration.ts
```

Check that the email shows:
- **From**: Antigravity Directory <payouts@googleantigravity.directory>
- **Not**: onboarding@resend.dev

## Current Workaround
✅ Emails **will work NOW** using `onboarding@resend.dev`
⚠️ But will show Resend's domain until you complete verification

## Checklist
- [ ] Access DNS settings for `googleantigravity.directory`
- [ ] Copy DNS records from Resend dashboard
- [ ] Add 3 TXT records to DNS
- [ ] Wait 5-10 minutes
- [ ] Click "Verify DNS Records" in Resend
- [ ] Update `FROM_EMAIL` in `src/lib/email.ts`
- [ ] Test with `npx tsx scripts/test-resend-integration.ts`
