---
description: FAANG-Style Production Deployment Playbook
---

# Production Deployment Playbook

**Owner**: Engineering Team  
**Last Updated**: 2026-02-02  
**Review Cycle**: Monthly

---

## Overview

This playbook defines the **Standard Operating Procedure** for deploying code to production, based on FAANG (Google, Meta, Amazon, Netflix) best practices.

**Deployment Philosophy**:
- ✅ **Gradual rollout** (not big bang)
- ✅ **Automated with safety rails**
- ✅ **Rollback faster than rollout**
- ✅ **Monitor before declaring success**

---

## Deployment Tiers

| Tier | Environment | Traffic % | Automated? | Approval |
|------|-------------|-----------|------------|----------|
| **Tier 0** | Local Dev | 0% | No | Self |
| **Tier 1** | Staging | 0% | Yes | CI/CD |
| **Tier 2** | Canary (Prod) | 5% | Yes | Auto (or manual override) |
| **Tier 3** | Production | 100% | Yes (after canary) | Auto (if canary passes) |

---

## Pre-Deployment Checklist

### Phase 1: Code Quality Gates ✅

**Must Pass Before Deployment**:

- [ ] **All Tests Passing**
  ```bash
  npm run test           # Unit tests
  npm run test:e2e       # E2E tests
  npm run build          # Production build
  ```

- [ ] **No Console Errors**
  ```bash
  # Check build output for warnings
  grep -i "error\|warn" .next/build-manifest.json
  ```

- [ ] **TypeScript Validates**
  ```bash
  npx tsc --noEmit
  ```

- [ ] **Lighthouse Score > 90**
  ```bash
  # Run on key pages
  lighthouse https://staging.antigravity.dev --only-categories=performance
  ```

- [ ] **Security Scan Passed**
  ```bash
  npm audit --production
  # Fix any CRITICAL or HIGH vulnerabilities
  ```

---

### Phase 2: Ralph Protocol Gates ✅

- [ ] **Gate 1-11 Complete**
  ```bash
  npm run ralph -- verify
  # Must show all 11 gates ✅
  ```

- [ ] **Artifacts Documented**
  - [ ] `implementation_plan.md` exists
  - [ ] `walkthrough.md` created
  - [ ] MASTER_TASK_LIST.md updated

- [ ] **Code Review Approved**
  - [ ] At least 1 reviewer approval
  - [ ] No unresolved comments

---

### Phase 3: Pre-Flight Checks ✅

- [ ] **Database Migrations Safe**
  ```bash
  # If migrations exist, ensure they're backward compatible
  npm run drizzle:generate
  # Review migration SQL - NO destructive changes
  ```

- [ ] **Environment Variables Synced**
  ```bash
  vercel env pull .env.production
  # Compare with .env.local - ensure all vars present
  ```

- [ ] **Feature Flags Ready** (if applicable)
  - [ ] New features behind flags
  - [ ] Gradual rollout plan documented

- [ ] **Rollback Plan Documented**
  - Previous commit SHA: `________________`
  - Rollback command ready: `git revert <sha>`

- [ ] **Monitoring Setup**
  - [ ] Vercel analytics enabled
  - [ ] Error tracking configured (Sentry)
  - [ ] Alert thresholds set

---

## Deployment Process

### Step 1: Staging Deployment (Tier 1)

**Automatically triggered on push to `main`**

```bash
git checkout main
git pull origin main
git merge <feature-branch>
git push origin main
```

**Vercel Auto-Deploy**:
- Staging URL: `https://staging-antigravity.vercel.app`
- Wait for deployment: ~2-3 minutes

**Staging Verification**:
```bash
# 1. Check deployment status
vercel --prod --yes

# 2. Run smoke tests
curl -I https://staging-antigravity.vercel.app
# Should return: 200 OK

# 3. Test key user flows
playwright test tests/e2e/critical-flows.spec.ts --project=chromium
```

**Go/No-Go Decision**:
- ✅ All smoke tests pass → Proceed to Canary
- ❌ Any test fails → STOP, fix issues, redeploy staging

---

### Step 2: Canary Deployment (Tier 2) - 5% Traffic

**Goal**: Expose changes to 5% of users, monitor for errors

// turbo
**Deploy Canary**:
```bash
# Tag canary release
git tag -a "v1.$(date +%Y%m%d-%H%M)" -m "Canary: Task #26 Username Fix"
git push --tags

# Vercel supports canary via environment
vercel --prod --env CANARY=true
```

**Monitoring Window**: 30 minutes minimum

**Metrics to Watch**:
| Metric | Threshold | Action if Exceeded |
|--------|-----------|-------------------|
| Error Rate | < 0.5% | Rollback immediately |
| Bounce Rate | < 60% | Investigate, consider rollback |
| Page Load Time | < 3s (p95) | Optimize before full rollout |
| 5xx Errors | 0 | Rollback immediately |

**Monitoring Commands**:
```bash
# 1. Check error rate (Vercel CLI)
vercel logs --follow

# 2. Check real-time analytics
open https://vercel.com/dashboard/analytics

# 3. Query error logs
vercel logs --since 30m | grep -i "error"
```

**Canary Decision Matrix**:

| Scenario | Error Rate | Load Time | Decision |
|----------|------------|-----------|----------|
| **Green** | <0.1% | <2s | ✅ Proceed to 100% |
| **Yellow** | 0.1-0.5% | 2-3s | ⚠️ Extend canary, investigate |
| **Red** | >0.5% | >3s | 🚨 ROLLBACK |

---

### Step 3: Full Production Rollout (Tier 3) - 100% Traffic

**Only if Canary is Green** ✅

// turbo
**Promote Canary to Production**:
```bash
# Remove canary flag, deploy to all users
vercel --prod

# Or use Vercel dashboard: "Promote to Production"
```

**Post-Deployment Verification** (5 minutes):

1. **Smoke Test Key Pages**:
   ```bash
   curl -I https://antigravity.dev
   curl -I https://antigravity.dev/categories/ai-coding
   curl -I https://antigravity.dev/t/chatgpt
   ```

2. **User Flow Test**:
   - [ ] Sign in works
   - [ ] Mobile menu displays username
   - [ ] Navigation works
   - [ ] Search functions

3. **Performance Check**:
   ```bash
   lighthouse https://antigravity.dev --only-categories=performance
   # Must score > 90
   ```

4. **Error Monitoring** (15-minute window):
   ```bash
   vercel logs --follow | grep -i "error"
   # Should see NO new errors
   ```

---

### Step 4: Monitoring & Validation (30 minutes)

**Critical Metrics Dashboard**:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Uptime | 99.9% | ___% | [ ] |
| Error Rate | <0.1% | ___% | [ ] |
| Avg Load Time | <2s | ___s | [ ] |
| Bounce Rate | <60% | ___% | [ ] |
| Active Users | >___ | ___ | [ ] |

**Alert Thresholds**:
- 🔴 **Critical**: Error rate > 1% → Auto-rollback
- 🟡 **Warning**: Error rate > 0.5% → Manual review
- 🟢 **Normal**: Error rate < 0.1%

**Success Criteria**:
- [ ] No increase in error rate (vs. baseline)
- [ ] Page load times stable or improved
- [ ] No user-reported issues (check email, Twitter)
- [ ] Vercel analytics show normal traffic patterns

---

## Rollback Procedures

### Automatic Rollback Triggers

**Vercel will auto-rollback if**:
- Build fails
- Health checks fail (if configured)

**Manual rollback needed if**:
- Error rate spikes (>1%)
- Critical bug discovered
- Performance degradation

---

### Fast Rollback (< 2 minutes)

**Option 1: Vercel Dashboard (Fastest)**
```
1. Go to: https://vercel.com/dashboard/deployments
2. Find previous stable deployment
3. Click "..." → "Redeploy"
4. Confirm: "Redeploy to Production"
```

**Option 2: Git Revert (Safe)**
```bash
# Find last good commit
git log --oneline -5

# Revert to previous commit
git revert <bad-commit-sha> --no-edit

# Push (triggers auto-deploy)
git push origin main
```

**Option 3: Vercel CLI**
```bash
# List recent deployments
vercel ls

# Promote previous deployment
vercel promote <previous-deployment-url>
```

**Post-Rollback**:
1. Announce in Slack/Discord: "Rolled back deploy due to [reason]"
2. Create incident report
3. Fix issue in feature branch
4. Re-deploy following full process

---

## Incident Response

### Severity Levels

| Level | Definition | Response Time | Action |
|-------|------------|---------------|--------|
| **P0** | Site down, data loss | <5 min | Rollback immediately |
| **P1** | Major feature broken | <15 min | Rollback or hotfix |
| **P2** | Minor bug, workaround exists | <1 hour | Fix in next deploy |
| **P3** | Cosmetic issue | <24 hours | Schedule fix |

---

### P0 Incident Playbook

**Site Down / Critical Error**

1. **Immediate Action** (0-5 min):
   ```bash
   # Rollback to last known good state
   vercel promote <last-good-deployment>
   ```

2. **Communication** (5-10 min):
   - Post status page update
   - Alert team in Slack
   - Email affected users (if applicable)

3. **Investigation** (10-30 min):
   - Check Vercel logs: `vercel logs --since 1h`
   - Check error tracking (Sentry)
   - Identify root cause

4. **Resolution** (30+ min):
   - Fix issue in isolated branch
   - Run full test suite
   - Deploy via staging → canary → production

5. **Post-Mortem** (24-48 hours):
   - Document incident
   - Identify prevention measures
   - Update deployment playbook

---

## Deployment Automation

### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      # 1. Pre-flight checks
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Security audit
        run: npm audit --production --audit-level=moderate
      
      # 2. Deploy to Vercel
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      
      # 3. Post-deployment checks
      - name: Smoke tests
        run: |
          curl -f https://antigravity.dev || exit 1
          curl -f https://antigravity.dev/api/health || exit 1
      
      # 4. Notify team
      - name: Slack notification
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Deployment ${{ job.status }}'
```

---

## Deployment Checklist (Print & Complete)

### Pre-Deployment
- [ ] All tests passing
- [ ] Ralph Protocol gates 1-11 complete
- [ ] Code review approved
- [ ] Staging deployed and verified
- [ ] Rollback plan documented

### Deployment
- [ ] Canary deployed (5% traffic)
- [ ] Monitored for 30 minutes
- [ ] No errors detected
- [ ] Promoted to 100% production

### Post-Deployment
- [ ] Smoke tests passed
- [ ] User flows verified
- [ ] Performance acceptable
- [ ] No increase in errors
- [ ] Team notified

### Sign-off
**Deployed by**: _______________  
**Date**: _______________  
**Commit SHA**: _______________  
**Rollback SHA**: _______________

---

## Best Practices (FAANG Principles)

### Google's Approach
- **Gradual Rollouts**: Start at 1%, ramp to 100% over hours/days
- **Automated Canary Analysis**: Machine learning detects anomalies
- **Blameless Post-Mortems**: Focus on systems, not people

### Meta's Approach
- **Shadow Mode**: New code runs in parallel, doesn't affect users
- **Automated Rollback**: If error rate increases, auto-rollback
- **Feature Flags**: All new features behind flags

### Netflix's Approach
- **Chaos Engineering**: Test failures in production
- **Red/Black Deployments**: Two production environments, instant switch
- **Simian Army**: Automated failure injection to test resilience

### Amazon's Approach
- **Two-Pizza Teams**: Small teams own deployment end-to-end
- **Deployment Windows**: Avoid Fridays/holidays
- **Incremental Deploys**: Deploy constantly, small changes

---

## Metrics to Track

### Deployment Health
| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Deployment Frequency** | >3/week | Count commits to main |
| **Lead Time** | <1 hour | Time from commit to production |
| **Mean Time to Recovery** | <15 min | Time to rollback on failure |
| **Change Failure Rate** | <5% | % of deploys requiring rollback |

### Production Health
| Metric | Target | Tool |
|--------|--------|------|
| **Uptime** | 99.9% | Vercel Analytics |
| **Error Rate** | <0.1% | Sentry |
| **Page Load Time (p95)** | <3s | Lighthouse CI |
| **Bounce Rate** | <60% | Google Analytics |

---

## Emergency Contacts

**Deployment Issues**:
- Primary: [Your Name] - [Phone]
- Secondary: [Backup Name] - [Phone]

**Vercel Support**:
- Dashboard: https://vercel.com/support
- Status: https://vercel-status.com

**Database Issues**:
- Neon Support: support@neon.tech

---

## Workflow Commands

### Daily Deployment
```bash
// turbo
# Run this workflow for standard deploys
npm run deploy:production
```

### Hotfix Deployment
```bash
// turbo
# Emergency fix, skip canary
npm run deploy:hotfix
```

### Rollback
```bash
// turbo
# Rollback to previous version
npm run deploy:rollback
```

---

**Version**: 1.0  
**Last Updated**: 2026-02-02  
**Next Review**: 2026-03-02
