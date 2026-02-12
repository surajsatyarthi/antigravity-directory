---
tags: [ACTIVE, PRD, PHASE_0]
phase: Phase 0 - E2E Testing Infrastructure
owner: PM
status: APPROVED
created: 2026-02-11
last_updated: 2026-02-12
ledger_entry: ENTRY-001
---

# Phase 0: E2E Testing Infrastructure PRD

**Version**: 1.0
**Author**: PM (Claude Code)
**Date Created**: 2026-02-11
**Status**: ✅ APPROVED
**Ledger Reference**: [ENTRY-001]

---

## 📋 EXECUTIVE SUMMARY

**Problem**: Zero E2E test coverage creates risk of shipping bugs and breaking existing features.

**Solution**: Implement Playwright E2E testing framework with Docker integration, comprehensive test coverage for all critical paths, CI/CD automation, and pre-commit hooks.

**Impact**:
- Prevents regressions on all critical user flows
- Enables confident deployments
- Automates quality assurance
- Foundation for all future feature testing

**Timeline**: 14 hours (1.75 days)

**Dependencies**: None (foundational work)

---

## 🎯 BUSINESS OBJECTIVES

### Primary Goals
1. **Risk Mitigation**: Prevent shipping broken features to production
2. **Velocity**: Enable faster development with automated regression testing
3. **Quality**: Achieve FAANG-level test coverage (90%+ critical paths)
4. **Confidence**: Deploy with evidence-based quality assurance

### Success Metrics
- [ ] 90%+ critical path coverage
- [ ] 100% test pass rate before any deployment
- [ ] <30 seconds total test execution time
- [ ] Zero flaky tests (99%+ reliability)
- [ ] CI/CD blocks merges if tests fail

---

## 👥 USER STORIES

### As a Developer
- I want automated tests so I can refactor confidently without breaking things
- I want pre-commit hooks so I catch bugs before pushing code
- I want fast test execution so I'm not slowed down

### As a Product Manager
- I want test coverage so I know features work as specified
- I want CI/CD integration so broken code never reaches production
- I want test reports so I can verify quality gates

### As a CEO
- I want quality assurance so we don't ship bugs to users
- I want automation so we don't rely on manual testing
- I want evidence so I can approve deployments confidently

---

## 🔧 TECHNICAL REQUIREMENTS

### 1. Playwright Installation & Configuration
**Deliverables**:
- Playwright installed via npm
- `playwright.config.ts` configured for 3 browsers (Chromium, Firefox, WebKit)
- Base URL configuration for local/staging/production
- Screenshot/video capture on failure
- Parallel execution enabled
- Retry logic for flaky tests (max 2 retries)

**Acceptance Criteria**:
- [ ] `npx playwright test` runs successfully
- [ ] Tests run in all 3 browsers
- [ ] Configuration documented
- [ ] Sample test passing

---

### 2. Docker Integration (Orb Stack)
**Deliverables**:
- `docker-compose.yml` for test environment
- Database container for test data isolation
- Environment variable configuration
- Test data seeding scripts
- Container health checks

**Acceptance Criteria**:
- [ ] Docker containers start via Orb Stack
- [ ] Test database isolated from dev/prod
- [ ] Tests can run against containerized environment
- [ ] Clean teardown after tests

---

### 3. Core E2E Tests - Homepage & Search
**File**: `tests/e2e/homepage.spec.ts`

**Test Cases**:
```typescript
describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    // Verify hero section displays
    // Verify search bar exists
    // Verify directory grid visible
  })

  test('search functionality works', async ({ page }) => {
    // Type in search bar
    // Verify results filter in real-time
    // Verify no results message when applicable
  })

  test('mobile responsive', async ({ page }) => {
    // Test 375px (mobile)
    // Test 768px (tablet)
    // Test 1024px (desktop)
  })
})
```

**Acceptance Criteria**:
- [ ] All 5+ tests passing
- [ ] Coverage >90% for homepage
- [ ] Tests run in <10 seconds

---

### 4. Core E2E Tests - Resource Browsing
**File**: `tests/e2e/browsing.spec.ts`

**Test Cases**:
```typescript
describe('Resource Browsing', () => {
  test('category filter works', async ({ page }) => {
    // Click MCP filter
    // Verify only MCP resources shown
    // Click multiple filters
    // Verify combined filtering
  })

  test('resource cards display correctly', async ({ page }) => {
    // Verify card has title
    // Verify card has description
    // Verify card has category badge
    // Verify card has creator info
  })

  test('resource detail page loads', async ({ page }) => {
    // Click resource card
    // Verify detail page displays
    // Verify all metadata shown
    // Verify back button works
  })
})
```

**Acceptance Criteria**:
- [ ] All 5+ tests passing
- [ ] Tests cover all resource types (MCPs, Rules, Workflows)
- [ ] Tests run in <10 seconds

---

### 5. Core E2E Tests - Authentication
**File**: `tests/e2e/auth.spec.ts`

**Test Cases**:
```typescript
describe('Authentication', () => {
  test('login modal opens', async ({ page }) => {
    // Click "Login" button
    // Verify modal displays
    // Verify Google OAuth button present
  })

  test('OAuth flow works', async ({ page }) => {
    // Mock OAuth response
    // Verify redirect to callback
    // Verify session created
    // Verify user logged in
  })

  test('protected routes redirect', async ({ page }) => {
    // Visit /dashboard (unauthenticated)
    // Verify redirects to login
    // Login
    // Verify redirects back to /dashboard
  })

  test('logout works', async ({ page }) => {
    // Login
    // Click logout
    // Verify session cleared
    // Verify redirected to homepage
  })
})
```

**Acceptance Criteria**:
- [ ] All 5+ tests passing
- [ ] OAuth mocking works reliably
- [ ] Tests run in <15 seconds

---

### 6. Core E2E Tests - Dashboard (Creator Flows)
**File**: `tests/e2e/dashboard.spec.ts`

**Test Cases**:
```typescript
describe('Dashboard', () => {
  test('dashboard loads for authenticated user', async ({ page }) => {
    // Login as creator
    // Visit /dashboard
    // Verify dashboard displays
    // Verify user resources shown
  })

  test('settings page accessible', async ({ page }) => {
    // Click settings
    // Verify settings page loads
    // Verify profile edit form exists
  })

  test('submission form accessible', async ({ page }) => {
    // Click "Submit Resource"
    // Verify form displays
    // Verify all required fields present
  })
})
```

**Acceptance Criteria**:
- [ ] All 5+ tests passing
- [ ] Creator workflows covered
- [ ] Tests run in <10 seconds

---

### 7. CI/CD Integration
**File**: `.github/workflows/e2e-tests.yml`

**Workflow Requirements**:
```yaml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Install Playwright browsers
      - Run E2E tests
      - Upload test reports
      - Upload screenshots/videos on failure
```

**Acceptance Criteria**:
- [ ] Tests run on every PR
- [ ] Tests run on push to main
- [ ] PR blocked if tests fail
- [ ] Test reports uploaded as artifacts
- [ ] Failure screenshots visible in CI logs

---

### 8. Pre-Commit Test Hooks
**Integration**: Git pre-commit hook

**Behavior**:
- Run affected E2E tests before commit
- Block commit if tests fail
- Show clear error messages
- Allow bypass with `--no-verify` (discouraged)

**Acceptance Criteria**:
- [ ] Hook installed via setup script
- [ ] Tests run automatically on commit
- [ ] Commit blocked if tests fail
- [ ] Clear error output shown

---

## 📊 TEST COVERAGE TARGETS

| Area | Critical Path Coverage | Target |
|------|------------------------|--------|
| Homepage & Search | Hero, Search, Directory Grid | 95%+ |
| Resource Browsing | Filtering, Cards, Detail Pages | 90%+ |
| Authentication | Login, Logout, Protected Routes | 90%+ |
| Dashboard | Creator Dashboard, Settings | 85%+ |
| **Overall** | **All Critical User Flows** | **90%+** |

---

## 🚀 IMPLEMENTATION PHASES

### Phase 0.1: Setup (3 hours)
**Tasks**:
- [ENTRY-002] Install Playwright & Configure
- Setup Docker Compose
- Create test helper utilities
- Write 1 sample test

**Deliverables**:
- ✅ Playwright installed
- ✅ Configuration files created
- ✅ Docker environment working
- ✅ Sample test passing

---

### Phase 0.2: Core Tests (6 hours)
**Tasks**:
- [ENTRY-003] E2E Tests - Homepage & Search (2h)
- [ENTRY-004] E2E Tests - Browsing (2h)
- [ENTRY-005] E2E Tests - Authentication (2h)

**Deliverables**:
- ✅ 15+ tests written and passing
- ✅ 90%+ coverage of core flows
- ✅ All tests run in <30 seconds total

---

### Phase 0.3: Dashboard Tests (2 hours)
**Tasks**:
- [ENTRY-006] E2E Tests - Dashboard (2h)

**Deliverables**:
- ✅ Creator workflows tested
- ✅ Dashboard functionality verified

---

### Phase 0.4: Automation (3 hours)
**Tasks**:
- [ENTRY-007] CI/CD Integration (1h)
- Pre-commit hook setup (1h)
- Documentation & cleanup (1h)

**Deliverables**:
- ✅ GitHub Actions workflow active
- ✅ Pre-commit hooks installed
- ✅ README updated with testing instructions

---

## 🔐 SECTION 9: AUTHENTICATION TEST FIXTURES (TECHNICAL IMPLEMENTATION)

### Overview
This section provides concrete technical guidance for creating authenticated test sessions in Playwright E2E tests. The approach uses **database session injection** rather than OAuth mocking, as NextAuth redirects make route interception impractical.

---

### 9.1 Strategy: Database Session Injection

**Why This Approach**:
- ✅ OAuth route mocking is unreliable (redirects happen before Playwright can intercept)
- ✅ Database session injection creates real NextAuth sessions
- ✅ Sessions are recognized by NextAuth middleware automatically
- ✅ No complex OAuth flow mocking required
- ✅ Works identically to production authentication

**How It Works**:
1. Insert test user into `users` table
2. Create session record in `sessions` table
3. Set `next-auth.session-token` cookie in Playwright browser context
4. NextAuth recognizes valid session → user is authenticated

---

### 9.2 Session Table Schema

**Database Table**: `sessions` (src/drizzle/schema.ts:56-62)

```typescript
sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),  // UUID - must match cookie value
  userId: text('userId')                             // Foreign key to users.id
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),  // Must be future date
});
```

**Required Fields**:
- `sessionToken`: UUID string (must be unique, matches cookie)
- `userId`: Foreign key to test user
- `expires`: Timestamp in the future (e.g., `new Date(Date.now() + 24 * 60 * 60 * 1000)` = 24 hours)

---

### 9.3 Cookie Structure

**Cookie Name**: `next-auth.session-token` (or `__Secure-next-auth.session-token` in production HTTPS)

**Cookie Properties**:
```typescript
{
  name: 'next-auth.session-token',
  value: sessionToken,  // Same UUID as sessions.sessionToken
  domain: 'localhost',
  path: '/',
  httpOnly: true,
  sameSite: 'Lax',
  expires: futureTimestamp  // Same as sessions.expires
}
```

**Important**: The cookie `value` MUST match the `sessionToken` in the database exactly.

---

### 9.4 Helper Function Signature

**File**: `tests/e2e/helpers/test-utils.ts`

```typescript
/**
 * Creates an authenticated session for E2E tests via database injection.
 *
 * @param role - 'USER' or 'ADMIN' - determines test user permissions
 * @param userData - Optional user data overrides (email, name, etc.)
 * @returns Object containing userId, sessionToken, and user record
 *
 * @example
 * // Create authenticated USER session
 * const { userId, sessionToken } = await createAuthenticatedSession('USER');
 * await context.addCookies([{
 *   name: 'next-auth.session-token',
 *   value: sessionToken,
 *   domain: 'localhost',
 *   path: '/',
 *   httpOnly: true,
 *   sameSite: 'Lax',
 * }]);
 */
async function createAuthenticatedSession(
  role: 'USER' | 'ADMIN',
  userData?: Partial<{
    email: string;
    name: string;
    username: string;
    bio: string;
    githubUsername: string;
  }>
): Promise<{
  userId: string;
  sessionToken: string;
  user: typeof users.$inferSelect;
}> {
  // Implementation:
  // 1. Generate UUID for userId and sessionToken
  // 2. Insert user record with specified role
  // 3. Insert session record with 24-hour expiry
  // 4. Return userId, sessionToken, user object
}
```

---

### 9.5 Implementation Example

**Step 1: Create Helper Function** (`tests/e2e/helpers/test-utils.ts`)

```typescript
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../src/lib/db';
import { users, sessions } from '../../../src/drizzle/schema';

export async function createAuthenticatedSession(
  role: 'USER' | 'ADMIN' = 'USER',
  userData?: Partial<{
    email: string;
    name: string;
    username: string;
  }>
) {
  const userId = uuidv4();
  const sessionToken = uuidv4();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // 1. Create test user
  const [user] = await db.insert(users).values({
    id: userId,
    email: userData?.email || `test-${role.toLowerCase()}-${Date.now()}@example.com`,
    name: userData?.name || `Test ${role}`,
    username: userData?.username || `test-${role.toLowerCase()}-${Date.now()}`,
    role: role,
  }).returning();

  // 2. Create session
  await db.insert(sessions).values({
    sessionToken,
    userId,
    expires,
  });

  return { userId, sessionToken, user };
}
```

**Step 2: Use in Playwright Tests** (`tests/e2e/dashboard.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
import { createAuthenticatedSession, cleanupDatabase } from './helpers/test-utils';

test.describe('Dashboard - Authenticated User', () => {
  test.beforeEach(async () => {
    await cleanupDatabase();
  });

  test('USER can access dashboard', async ({ context, page }) => {
    // Create authenticated session
    const { sessionToken } = await createAuthenticatedSession('USER');

    // Set authentication cookie
    await context.addCookies([{
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    }]);

    // Navigate to protected route
    await page.goto('/dashboard');

    // Verify user is authenticated
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('ADMIN can access admin panel', async ({ context, page }) => {
    // Create admin session
    const { sessionToken } = await createAuthenticatedSession('ADMIN', {
      name: 'Admin User',
      email: 'admin@test.com'
    });

    // Set authentication cookie
    await context.addCookies([{
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    }]);

    // Navigate to admin route
    await page.goto('/admin');

    // Verify admin access granted
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('h1')).toContainText('Admin Panel');
  });
});
```

---

### 9.6 Playwright Test Fixtures (Advanced)

**For reusable authenticated contexts** (reduces boilerplate):

```typescript
// tests/e2e/helpers/fixtures.ts
import { test as base } from '@playwright/test';
import { createAuthenticatedSession, cleanupDatabase } from './test-utils';

export const test = base.extend({
  authenticatedUserContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    const { sessionToken } = await createAuthenticatedSession('USER');

    await context.addCookies([{
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    }]);

    await use(context);
    await context.close();
    await cleanupDatabase();
  },

  authenticatedAdminContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    const { sessionToken } = await createAuthenticatedSession('ADMIN');

    await context.addCookies([{
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    }]);

    await use(context);
    await context.close();
    await cleanupDatabase();
  },
});

// Usage in tests:
test('USER dashboard access', async ({ authenticatedUserContext }) => {
  const page = await authenticatedUserContext.newPage();
  await page.goto('/dashboard');
  // User is already authenticated!
});
```

---

### 9.7 USER vs ADMIN Role Differentiation

**USER Role** (`role: 'USER'`):
- Access: `/dashboard`, `/settings`, `/submit`
- Permissions: Edit own profile, submit resources, bookmark resources
- Use for: General creator/user flows

**ADMIN Role** (`role: 'ADMIN'`):
- Access: `/admin`, `/admin/submissions`, `/admin/users` + all USER routes
- Permissions: Approve submissions, manage users, edit any resource
- Use for: Admin panel testing, moderation workflows

**Testing Strategy**:
```typescript
// Test protected route authorization
test('USER cannot access admin panel', async ({ context, page }) => {
  const { sessionToken } = await createAuthenticatedSession('USER');

  await context.addCookies([{
    name: 'next-auth.session-token',
    value: sessionToken,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    sameSite: 'Lax',
  }]);

  await page.goto('/admin');

  // Verify redirect or 403 error
  await expect(page).toHaveURL('/dashboard'); // Or '/403'
});
```

---

### 9.8 Cleanup Strategy

**Per-Test Cleanup**:
```typescript
test.afterEach(async () => {
  await cleanupDatabase(); // Removes test users, sessions
});
```

**Session Isolation**:
- Each test creates unique `sessionToken` (UUID)
- Database cleanup prevents session leakage between tests
- No shared state between test runs

---

### 9.9 Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| Session not recognized | Cookie domain mismatch | Use `localhost` not `127.0.0.1` |
| User not authenticated | Cookie name wrong | Use `next-auth.session-token` exactly |
| Session expired | `expires` in past | Set `expires` to future date (24h+) |
| Database error | Foreign key violation | Create user BEFORE session |
| Cookie not set | Missing httpOnly/sameSite | Match cookie structure exactly |

---

### 9.10 Acceptance Criteria

**Authentication Fixtures Complete When**:
- [ ] `createAuthenticatedSession()` helper implemented in test-utils.ts
- [ ] Function supports both USER and ADMIN roles
- [ ] Cookie structure matches NextAuth requirements exactly
- [ ] Dashboard tests use fixtures successfully
- [ ] Admin panel tests verify role-based access control
- [ ] No OAuth mocking attempted (database-only approach)
- [ ] Session cleanup prevents test pollution
- [ ] Documentation added to test README

---

**Section Status**: ✅ COMPLETE
**Next**: Use this implementation in [ENTRY-006] E2E Tests - Dashboard

---

## 📈 SUCCESS CRITERIA

### Functional Requirements
- [x] Playwright installed and configured
- [ ] Docker test environment working
- [ ] 90%+ critical path coverage
- [ ] GitHub Actions workflow created
- [ ] Pre-commit hooks active
- [ ] All tests passing (100% pass rate)
- [ ] Zero flaky tests

### Non-Functional Requirements
- [ ] Test execution time <30 seconds total
- [ ] Tests run in parallel
- [ ] Screenshots captured on failure
- [ ] Test reports generated
- [ ] Documentation complete

### Ralph Protocol (Technical Quality)
- [ ] Gate 1: Build compiles ✅
- [ ] Gate 7: Code style (lint passes) ✅
- [ ] Gate 11: Tests pass (100% of new tests) ✅
- [ ] Gate 12: CI/CD passes ✅

---

## 🚧 DEPENDENCIES & BLOCKERS

### Current Blockers
1. **[ENTRY-015] Lint Error** 🚨
   - Status: BLOCKING all commits
   - Impact: Cannot commit test code until fixed
   - Action: Fix lint configuration BEFORE starting Phase 0

### Dependencies
- None (foundational work)

### Required Before Launch
- This Phase 0 must complete BEFORE Phase A (Payment System)
- Cannot deploy to production without E2E tests passing

---

## 🎯 RISKS & MITIGATION

### Risk 1: Flaky Tests
**Probability**: Medium
**Impact**: High (blocks deployments)
**Mitigation**:
- Use Playwright's auto-wait functionality
- Implement retry logic (max 2 retries)
- Use data-testid selectors (not CSS)
- Avoid timing-dependent assertions

### Risk 2: Slow Test Execution
**Probability**: Low
**Impact**: Medium (slows development)
**Mitigation**:
- Run tests in parallel
- Use test sharding for large suites
- Optimize test setup/teardown
- Target <30 seconds total runtime

### Risk 3: OAuth Mocking Complexity
**Probability**: Medium
**Impact**: Medium (auth tests fail)
**Mitigation**:
- Use Playwright's route mocking
- Create reusable auth fixtures
- Document mock setup clearly
- Test with real OAuth in staging

---

## 📚 DOCUMENTATION REQUIREMENTS

### For Developers
- [ ] README.md updated with test instructions
- [ ] Test writing guide created
- [ ] Playwright configuration documented
- [ ] Docker setup instructions

### For PM/CEO
- [ ] Test coverage report generated
- [ ] Quality gates documented
- [ ] CI/CD workflow explained
- [ ] Deployment checklist updated

---

## 🔄 POST-IMPLEMENTATION

### Monitoring
- Track test pass rate in CI/CD
- Monitor test execution time
- Review flaky test reports weekly

### Maintenance
- Update tests when features change
- Add tests for all new features
- Review coverage monthly
- Refactor flaky tests immediately

---

## ✅ APPROVAL

**Approved By**: PM (Claude Code)
**Date**: 2026-02-11
**Status**: ✅ APPROVED

**Rationale**:
- Zero current E2E coverage = high risk
- RICE Score: 4,000 (highest priority)
- Foundation for all future quality assurance
- Required before production launch

**Conditions**:
1. Fix [ENTRY-015] lint error BEFORE starting this work
2. Complete all Phase 0 tasks before proceeding to Phase A
3. Achieve 90%+ coverage target (non-negotiable)

---

## 📎 RELATED DOCUMENTS

- [PROJECT_LEDGER.md](../../PROJECT_LEDGER.md) - Entries 001-007
- [RICE_SCORING_ANALYSIS.md](../05-reports/RICE_SCORING_ANALYSIS.md)
- [PROTOCOLS_AND_STANDARDS.md](../../.claude/memory/PROTOCOLS_AND_STANDARDS.md)
- [Ralph Protocol](.agent/RALPH_PROTOCOL.md)

---

**Last Updated**: 2026-02-12 06:45
**Last Change**: Added Section 9 - Authentication Test Fixtures (Technical Implementation)
**Next Review**: After Phase 0 completion
