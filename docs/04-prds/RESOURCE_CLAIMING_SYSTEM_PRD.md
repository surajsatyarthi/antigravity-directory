# PRD: Resource Claiming System (GitHub OAuth)

**Document Type**: Product Requirements Document
**Status**: ✅ APPROVED
**Entry ID**: ENTRY-009
**Created**: 2026-02-13
**Owner**: PM
**Reference**: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)

---

## 🎯 OBJECTIVE

Enable creators to claim ownership of their resources via GitHub OAuth verification, allowing them to set prices and earn 80% from sales.

**Business Model Alignment**: FREE claiming (no submission fees), creators earn via 80/20 sales split.

---

## 📋 USER STORIES

### As a Creator
- I want to claim my resource listed on the directory (FREE)
- I want to verify ownership via my GitHub account
- I want to set a price on my claimed resource
- I want to see my claimed resources in my dashboard
- I want to receive a welcome email after claiming

### As a User (Browser)
- I want to see who created a resource (claimed badge)
- I want to trust that claimed resources are verified

### As Platform
- I want to verify creator ownership via GitHub OAuth
- I want to prevent fraudulent claims
- I want to track all claims for audit
- I want to build creator relationships

---

## 🏗️ TECHNICAL REQUIREMENTS

### 1. Database Schema

```sql
-- Add claiming fields to resources table
ALTER TABLE resources
  ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS claimed_via TEXT DEFAULT 'github_oauth';

-- Create claims history table
CREATE TABLE resource_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL REFERENCES resources(id),
  user_id UUID NOT NULL REFERENCES users(id),
  github_username TEXT NOT NULL,
  github_repo_url TEXT NOT NULL,
  repo_owner TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  verification_method TEXT NOT NULL DEFAULT 'github_oauth',
  verification_status TEXT NOT NULL DEFAULT 'verified',
  claimed_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(resource_id) -- One claim per resource
);

-- Index for user claims lookup
CREATE INDEX idx_resource_claims_user_id ON resource_claims(user_id);
CREATE INDEX idx_resources_author_id ON resources(author_id);
```

### 2. GitHub OAuth Verification

**Authentication Flow**:
1. User clicks "Claim This Resource" button
2. If not authenticated → Redirect to GitHub OAuth (NextAuth)
3. After OAuth → Return to claim flow
4. System verifies ownership via GitHub API

**Verification Methods** (in priority order):

**Method 1: Repo Owner** (Primary)
```typescript
// GitHub API: Get repo info
GET https://api.github.com/repos/{owner}/{repo}

// Response includes owner.login
// Compare with authenticated user's GitHub username
```

**Method 2: Repo Contributor** (Fallback)
```typescript
// GitHub API: Get contributors
GET https://api.github.com/repos/{owner}/{repo}/contributors

// Check if authenticated user is in contributors list
```

**Verification Rules**:
- User's GitHub username MUST match repo owner.login OR
- User MUST be in contributors list (with commits)
- Verification happens server-side only (never trust client)

### 3. API Routes

**POST /api/resources/[id]/claim**

Request:
```typescript
{} // No body needed, user from session
```

Response (Success):
```typescript
{
  success: true,
  claim: {
    id: "claim_xxx",
    resourceId: "res_xxx",
    claimedAt: "2026-02-13T...",
    githubUsername: "octocat"
  }
}
```

Response (Error):
```typescript
{
  error: "NOT_REPO_OWNER",
  message: "You must be the owner or contributor of this repository",
  githubUsername: "yourname",
  repoOwner: "actualowner"
}
```

**Server-Side Logic**:
1. Check user authentication (NextAuth session)
2. Fetch resource from database (get GitHub URL)
3. Parse repo owner/name from GitHub URL
4. Call GitHub API to verify ownership
5. If verified:
   - Insert into `resource_claims` table
   - Update `resources.author_id` to user ID
   - Send welcome email to creator
   - Return success
6. If not verified:
   - Return error with reason

**GET /api/resources/[id]/claim-status**

Response:
```typescript
{
  claimed: boolean,
  claimedBy?: {
    username: string,
    githubUsername: string,
    claimedAt: string
  },
  canClaim: boolean, // true if user is authenticated and verified
  verificationRequired: "github_oauth"
}
```

### 4. UI Components

**ClaimButton.tsx** (new component)

Props:
```typescript
interface ClaimButtonProps {
  resourceId: string;
  githubUrl: string;
  isClaimed: boolean;
  claimedBy?: {
    username: string;
    githubUsername: string;
  };
}
```

States:
- **Unclaimed + Not Authenticated**: "Claim This Resource" → Redirects to login
- **Unclaimed + Authenticated**: "Claim This Resource" → Initiates claim
- **Claimed by Others**: No button, shows "Claimed by @username" badge
- **Claimed by You**: Shows "Claimed by You" badge with edit options

**Update Resource Detail Page** (`src/app/t/[slug]/page.tsx`):

Add sections:
```tsx
{/* Claiming Section */}
<div className="claim-section">
  {isClaimed ? (
    <Badge>Claimed by @{claimedBy.githubUsername}</Badge>
  ) : (
    <ClaimButton
      resourceId={resource.id}
      githubUrl={resource.githubUrl}
      isClaimed={false}
    />
  )}
</div>
```

### 5. GitHub API Integration

**Rate Limiting**:
- GitHub API: 5,000 requests/hour (authenticated)
- Use `GITHUB_API_TOKEN` for server-side calls
- Cache verification results for 5 minutes

**Error Handling**:
- `404`: Repo not found → Show error "Repository does not exist"
- `403`: Rate limit exceeded → Show error "Too many requests, try again later"
- `401`: Invalid token → Log error, show generic message

### 6. Environment Variables

```bash
# GitHub OAuth (from NextAuth - should exist)
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# GitHub API (for server-side verification)
GITHUB_API_TOKEN=ghp_xxx  # Personal Access Token with public_repo scope
```

Add to `.env.example`:
```bash
# GitHub OAuth (NextAuth)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# GitHub API (Server-side verification)
GITHUB_API_TOKEN=ghp_your_personal_access_token
```

---

## ✅ ACCEPTANCE CRITERIA

### Must Have (MVP)
- [ ] Claim button shows only on unclaimed resources
- [ ] Claim button requires GitHub authentication
- [ ] GitHub API verifies repo ownership (owner or contributor)
- [ ] Claim succeeds for verified owners/contributors
- [ ] Claim fails for non-owners with clear error message
- [ ] `resource_claims` table records all claims
- [ ] `resources.author_id` updates on successful claim
- [ ] "Claimed by @username" badge shows after claim
- [ ] E2E tests cover claim flow (5+ scenarios)

### Should Have (Phase 2)
- [ ] Welcome email sent to creator after claim
- [ ] Creator dashboard shows claimed resources
- [ ] Claim analytics (total claims, success rate)
- [ ] Bulk claim feature (claim multiple resources)

### Could Have (Future)
- [ ] Claim via npm package ownership verification
- [ ] Claim via website verification (meta tag)
- [ ] Claim dispute resolution flow

---

## 🔒 SECURITY REQUIREMENTS

1. **Verification**:
   - MUST verify via GitHub API server-side
   - Never trust client-provided GitHub username
   - Cache verification for max 5 minutes
   - Verify repo owner OR contributor status

2. **Fraud Prevention**:
   - One claim per resource (database constraint `UNIQUE(resource_id)`)
   - Cannot claim already-claimed resources
   - Must have active GitHub account
   - Log all claim attempts for audit

3. **Access Control**:
   - Only authenticated users can claim
   - Only verified owners/contributors can claim successfully
   - Rate limit: 10 claim attempts per hour per user

4. **Data Protection**:
   - Store only public GitHub data (username, repo URL)
   - Log verification attempts for debugging
   - No sensitive GitHub API tokens exposed to client

---

## 📊 SUCCESS METRICS

### Technical Metrics
- Claim success rate: >90%
- GitHub API call time: <500ms
- Verification accuracy: 100%
- E2E test coverage: 100% of claim scenarios

### Business Metrics
- Total claims: Track daily/weekly
- Claim-to-price-set rate: >50% (claimed resources get priced)
- Creator engagement: >30% claim within 7 days of launch
- Fraud attempts: <1% (blocked by verification)

---

## 🚫 OUT OF SCOPE

- ❌ Claim verification fees (claims are FREE per marketplace model)
- ❌ Manual claim approval (automated via GitHub OAuth)
- ❌ Claim NFT/blockchain verification
- ❌ Claim transfer between users (locked to first claimant)
- ❌ Claim expiration (claims are permanent)

---

## 📁 REFERENCE DOCUMENTS

- Business Model: [MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)
- Database Schema: `src/drizzle/schema.ts`
- Auth Config: `src/auth.ts` or `auth.config.ts`
- GitHub OAuth Docs: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps
- GitHub API Docs: https://docs.github.com/en/rest/repos/repos

---

## 🎯 IMPLEMENTATION NOTES

**For Coder**:
1. Read MARKETPLACE_MODEL_SPEC.md first (understand FREE claiming)
2. Check existing NextAuth GitHub OAuth setup in `src/auth.ts`
3. Create database migration via Drizzle
4. Test with real GitHub repos (use test accounts)
5. Mock GitHub API in E2E tests (don't hit real API in tests)
6. Provide screenshot of successful claim + database record

**GitHub API Limitations**:
- Rate limit: 5,000 req/hour (authenticated)
- Public repos only (private repos not supported)
- Contributors endpoint limited to 500 contributors

**Edge Cases to Handle**:
- Repo deleted after resource listed
- Repo made private after claim
- User's GitHub account deleted
- Multiple contributors claiming same resource (first wins)

---

**Status**: ✅ APPROVED - Ready for implementation
**Estimated Effort**: 4-5 hours
**Priority**: HIGH (Phase 1 - Marketplace Launch)
