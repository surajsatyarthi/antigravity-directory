# 🚨 ANTIGRAVITY ACTION PLAN: Critical Blockers

**FROM**: Claude (PM)
**TO**: Antigravity (Developer)
**STATUS**: 🔴 WORK BLOCKED - IMMEDIATE ACTION REQUIRED
**DEADLINE**: 24 hours to acknowledge + fix timeline

---

## 📋 YOU'VE GOT CRITICAL FEEDBACK

Your Phase 0 work (seed scripts) has **9 critical/major blockers** preventing deployment.

**Documents to Read**:
1. **PM_CRITICAL_REVIEW_2026-02-03.md** (12 pages) - Full technical feedback
2. **MASTER-TASK-LIST.md** (lines 114-150) - Blocker summary in task list
3. **Ralph Protocol v6.0** (hardened gates) - Workflow enforcement

**Time Commitment**: ~45 minutes to read, understand, and commit to fixes

---

## 🔴 CRITICAL BLOCKERS (Must Fix in 24h)

### Blocker 1: Workflow Violation (STOPS EVERYTHING)

**Your Issue**: Code written but NOT submitted to REPORT-CENTER.md

**Why It Matters**:
- No audit trail
- No approval checkpoint
- Ralph Protocol v6.0 requires this

**Fix (3 steps)**:
```
STEP 1: Edit /docs/REPORT-CENTER.md
        Navigate to "### Task 0.1.1: Build MCP Scraper"
        Fill in "**What Antigravity Should Submit**" section with:
        - Code file path: /scripts/seed-50-tools.ts, /scripts/weekly-scraper.ts
        - Test results: npm run test (once you write them)
        - Sample output: 5 example resources from database
        - Issues encountered: list any blockers
        - Ready for PM review: YES/NO

STEP 2: Submit your plan
        Create /docs/plans/PHASE_0_PLAN.md with:
        - Problem statement: Why scrape 1500 tools?
        - Solution: How seed scripts work
        - Alternatives Considered:
          * Option 1: Manual import (rejected - too slow)
          * Option 2: API import (current choice - faster)
          * Option 3: CSV upload (rejected - requires manual prep)
        - Why chosen solution is best
        - Implementation steps (what you did)

STEP 3: Get approval
        Share plan in Slack/email asking for CEO/PM sign-off
        Once approved, link it in REPORT-CENTER.md entry
```

**Time Estimate**: 30 minutes
**Deadline**: TODAY

---

### Blocker 2: No Tests (Ralph Gate 7 Violation)

**Your Issue**: Zero tests for seed scripts. Gate 7 requires tests.

**What You Need**:
```typescript
// File: src/__tests__/scripts/seed-50-tools.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { seedTools } from '../../scripts/seed-50-tools';

describe('seed-50-tools', () => {
  let db: any;

  beforeAll(async () => {
    // Setup test database
    db = setupTestDB();
  });

  afterAll(async () => {
    // Cleanup test database
    await db.cleanup();
  });

  it('should seed exactly 50 tools', async () => {
    const result = await seedTools(db);
    const count = await db.query('SELECT COUNT(*) FROM resources');
    expect(count).toBe(50);
  });

  it('should validate all tools have required fields', async () => {
    const result = await seedTools(db);
    const tools = await db.query('SELECT * FROM resources WHERE author_id = admin');

    tools.forEach(tool => {
      expect(tool.title).toBeTruthy();
      expect(tool.url).toBeTruthy();
      expect(tool.category_id).toBeTruthy();
    });
  });

  it('should skip tools with missing categories', async () => {
    const result = await seedTools(db);
    const skipped = result.skipped || [];

    expect(skipped.length).toBeGreaterThan(0);
    skipped.forEach(item => {
      expect(item.reason).toContain('category');
    });
  });

  it('should handle duplicate URLs gracefully', async () => {
    // Insert duplicate
    await db.query('INSERT INTO resources (url, title, category_id) VALUES (?, ?, ?)',
      ['https://github.com/openai/gpt', 'Test', 1]);

    // Try to seed same URL again
    const result = await seedTools(db);

    // Should skip or update, not error
    expect(result.error).toBeNull();
  });
});
```

**Commands to Run**:
```bash
# Write tests (copy above)
cat > src/__tests__/scripts/seed-50-tools.test.ts << 'EOF'
[paste test code above]
EOF

# Run tests
npm run test -- seed-50-tools.test.ts

# Check coverage
npm run test -- --coverage

# Target: 80%+ coverage
```

**Time Estimate**: 2-3 hours
**Deadline**: 24 hours

---

### Blocker 3: N+1 Query Problem (weekly-scraper.ts)

**Your Issue** (lines 76-102):
```typescript
// WRONG:
for (const resource of githubResources) {
  const response = await fetch(...); // 50 API calls
  await sql`UPDATE ...`; // 50 database calls
}
// Result: 101 operations total (SLOW)
```

**Fix** (use batch operations):
```typescript
// RIGHT:
const limiter = pLimit(5); // Max 5 concurrent requests

const githubResources = await sql`
  SELECT id, title, url, github_stars
  FROM resources WHERE url LIKE '%github.com%'
  LIMIT 50`;

// Fetch all in parallel (max 5 concurrent)
const updates = await Promise.all(
  githubResources.map(r =>
    limiter(async () => {
      const data = await fetchGitHubRepoWithRetry(r.url);
      return {
        id: r.id,
        stars: data.stargazers_count,
        forks: data.forks_count
      };
    })
  )
);

// Single batch update
if (updates.length > 0) {
  await sql`
    UPDATE resources SET
      github_stars = data.stars,
      github_forks = data.forks
    FROM (VALUES ${updates.map(u => sql`(${u.id}, ${u.stars}, ${u.forks})`)})
    AS data(id, stars, forks)
    WHERE resources.id = data.id
  `;
}
```

**Why This Matters**:
- Old way: 101 operations = slow + hits rate limits
- New way: 7 operations = fast + respects API limits
- FAANG standard: Always batch operations

**Time Estimate**: 45 minutes
**Deadline**: 24 hours

---

### Blocker 4: No Transaction Safety (seed-50-tools.ts)

**Your Issue**:
```typescript
// WRONG - No transaction wrapping
for (const tool of TOOLS) {
  await sql`INSERT INTO resources VALUES (...)`;
  // If crashes halfway = partial data in DB
}
```

**Fix** (wrap in transaction):
```typescript
// RIGHT - Automatic rollback on error
const result = await sql.begin(async (tx) => {
  let success = 0;
  for (const tool of TOOLS) {
    try {
      validateTool(tool); // Validate first
      await tx`INSERT INTO resources (title, url, category_id, slug)
               VALUES (${tool.title}, ${tool.url}, ${categoryId}, ${slug})`;
      success++;
    } catch (err) {
      console.error(`Failed to seed: ${tool.title}`, err);
      // Transaction will rollback automatically on throw
      throw err;
    }
  }
  return { success, total: TOOLS.length };
});

console.log(`✅ Seeded ${result.success}/${result.total} tools`);
```

**Why This Matters**:
- Prevents partial database states
- FAANG standard: All multi-step ops use transactions
- Amazon/Google requirement

**Time Estimate**: 30 minutes
**Deadline**: 24 hours

---

## 🟠 MAJOR ISSUES (Should Fix in 24h)

### Issue 5: Duplicate Property (seed-50-tools.ts line 50)

```typescript
// WRONG:
{ title: "LangChain", ..., verified: true, verified: true, stars: 85000 }

// RIGHT:
{ title: "LangChain", ..., verified: true, stars: 85000 }
```

**Time Estimate**: 5 minutes

---

### Issue 6: Missing Error Handling

Add try/catch to all external API calls:

```typescript
async function fetchWithRetry(url: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, { timeout: 5000 });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      // Exponential backoff
      const delay = 1000 * Math.pow(2, i);
      console.warn(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

**Time Estimate**: 1 hour

---

### Issue 7: Missing Rate Limiting

```typescript
import pLimit from 'p-limit';

const limiter = pLimit(5); // Max 5 concurrent GitHub API calls

const results = await Promise.all(
  resources.map(r => limiter(() => fetchGitHub(r)))
);
```

**Time Estimate**: 30 minutes

---

### Issue 8: Ralph Gate 0 Validation

Run this BEFORE any future work:

```bash
.agent/workflows/validate-ralph-gates.sh Phase_0_1_1
```

This generates an audit log proving:
- [ ] Research phase completed (3+ web searches documented)
- [ ] Dependencies identified (who depends on this code?)
- [ ] Git state captured (HEAD hash, branches, stashes)

**Time Estimate**: 20 minutes

---

### Issue 9: Law 23 Documentation

Add to your plan (from Blocker 1):

```markdown
## Alternatives Considered

### Option 1: Manual CSV Import
- **Description**: Create CSV file, upload via admin UI
- **Pros**: Simple, no code needed
- **Cons**: Time-consuming (1500 tools × 5min = 125 hours)
- **Rejected**: Too slow for tight timeline

### Option 2: API Scraper (CHOSEN)
- **Description**: Automated script scrapes tools, validates, imports
- **Pros**: Fast (2 hours), automated, repeatable
- **Cons**: Requires API endpoints to exist
- **Chosen**: Fastest path to 1500+ resources

### Option 3: Database Sync
- **Description**: Direct database transfer from competitor
- **Pros**: Fastest possible
- **Cons**: Legal/ethical issues
- **Rejected**: Not viable

### Why Option 2 (API Scraper) is Best
- Respects competitor's terms (public API)
- Fastest implementation (meets timeline)
- Automated for future updates
- Aligns with FAANG standards
```

**Time Estimate**: 30 minutes

---

## ✅ YOUR TIMELINE (24 HOURS)

### HOURS 0-1: READ & ACKNOWLEDGE
- [ ] Read PM_CRITICAL_REVIEW_2026-02-03.md
- [ ] Understand all 9 blockers
- [ ] Slack/email: "I understand the issues, committing to fixes"

**Deadline**: 1 hour from now

### HOURS 1-3: WORKFLOW FIXES
- [ ] Submit to REPORT-CENTER.md (Blocker 1)
- [ ] Create PHASE_0_PLAN.md (Blocker 1)
- [ ] Get CEO/PM approval (Blocker 1)

**Deadline**: 3 hours from now

### HOURS 3-6: CRITICAL CODE FIXES
- [ ] Add transactions to seed script (Blocker 4) - 30 min
- [ ] Fix N+1 query problem (Blocker 3) - 45 min
- [ ] Remove duplicate property (Issue 5) - 5 min
- [ ] Add error handling (Issue 6) - 1 hour
- [ ] Add rate limiting (Issue 7) - 30 min

**Deadline**: 6 hours from now

### HOURS 6-24: TESTS & VALIDATION
- [ ] Write tests for seed scripts (Blocker 2) - 3 hours
- [ ] Run: npm run test - Pass all tests
- [ ] Run: npm run build - Must pass
- [ ] Run: npm run ralph - Must pass (12/12 checks)
- [ ] Run: .agent/workflows/validate-ralph-gates.sh (Issue 8)
- [ ] Document alternatives in plan (Issue 9)

**Deadline**: 24 hours from now

---

## 🎯 SUCCESS CRITERIA

By end of 24 hours, you must have:

```
✅ REPORT-CENTER.md entry submitted (Blocker 1)
✅ Implementation plan with alternatives (Blocker 1)
✅ Tests written and passing (Blocker 2)
✅ N+1 query fixed (Blocker 3)
✅ Transactions added (Blocker 4)
✅ Duplicate property removed (Issue 5)
✅ Error handling added (Issue 6)
✅ Rate limiting added (Issue 7)
✅ Gate 0 audit log generated (Issue 8)
✅ Alternatives documented (Issue 9)
✅ npm run build: PASS ✅
✅ npm run test: PASS ✅
✅ npm run ralph: 12/12 PASS ✅
```

If ALL of these check out → APPROVED FOR DEPLOYMENT

If ANY are missing → BLOCKED UNTIL FIXED

---

## ❓ QUESTIONS?

**Q: Why is this so critical?**
A: FAANG standards aren't optional. Google/Meta/Amazon require this level of quality. Your code blocks production until it meets standards.

**Q: Why the 24-hour timeline?**
A: You were at 0% on Phase 0. Now you're at partial. We need to unblock the critical path. This is the fastest fix timeline without compromising quality.

**Q: Can I shortcut anything?**
A: No. Every blocker (1-4) and issue (5-7) is a production risk. Ralph v6.0 requires gates (0, 2, 7, 23). No shortcuts.

**Q: What if I can't fix in 24 hours?**
A: Acknowledge that and commit to a realistic timeline. Better to say "48 hours" and deliver than promise "24 hours" and deliver nothing.

---

## 📞 NEXT STEPS

1. **NOW**: Read PM_CRITICAL_REVIEW_2026-02-03.md (30 min)
2. **IN 1 HOUR**: Slack confirmation you understand issues
3. **IN 6 HOURS**: REPORT-CENTER.md + plan submitted
4. **IN 24 HOURS**: All fixes complete, tests passing, approved

---

**Signed**: Claude (PM)
**Date**: 2026-02-03
**Status**: 🔴 WORK BLOCKED - AWAITING YOUR ACKNOWLEDGMENT

🚀 Let's ship production-quality code.
