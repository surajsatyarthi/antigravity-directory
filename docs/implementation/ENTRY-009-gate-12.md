
# Gate 12: Resource Claiming System (ENTRY-009)

## 1. Feature Description
Implemented the Resource Claiming System allowing creators to claim ownership of their resources listed on the directory. This ensures that the original authors can manage their listings and receive earnings. The system uses GitHub OAuth to verify ownership or contributorship of the linked GitHub repository.

## 2. Technical Implementation
- **Database**:
    - Added `authorId`, `claimedAt`, `claimedVia` to `resources` table.
    - Created `resource_claims` table to track claim history and verification details.
- **Backend**:
    - `POST /api/resources/[id]/claim`: Validates session, checks GitHub URL, verifies user against GitHub API (checks ownership or contributor status), and updates DB.
    - `GET /api/resources/[id]/claim-status`: Returns claim status (used for validation).
- **Frontend**:
    - `ClaimButton` component: Handles the claim UI flow, including authentication redirect and success/error feedback.
    - Updated Resource Detail Page to display the claim button or "Claimed by" badge.

## 3. Security & Quality
- **Authentication**: Requires valid GitHub OAuth session.
- **Verification**: Server-side verification of GitHub repo ownership/contributorship using GitHub API.
- **Idempotency**: Prevents double claiming via DB constraints and API checks.
- **Audit**: Tracks all claims in `resource_claims` table.

## 4. Testing Evidence
- **E2E Tests**: `tests/e2e/resource-claiming.spec.ts` verifies:
    - Claim button visibility on unclaimed resources.
    - Authentication redirection for unauthenticated users.
- **Manual Verification**: verified the full flow locally.

## 5. Artifacts
- **Migration**: `0005_next_black_tarantula.sql`
- **Code**: `src/api/resources/[id]/claim/route.ts`, `src/components/ClaimButton.tsx`
