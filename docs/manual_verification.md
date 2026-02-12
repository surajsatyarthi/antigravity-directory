# Manual Verification Guide: Resource Claiming (ENTRY-009)

As part of the **Hybrid Testing Strategy**, we perform manual verification for the end-to-end OAuth flow to ensure real-world integration with GitHub works as expected, complementing our automated API and UI tests.

## 1. Prerequisites
- [ ] User is **NOT** logged in (Incognito window recommended).
- [ ] A valid GitHub account is available for testing.
- [ ] Database has an unclaimed resource with a valid GitHub URL.

## 2. Verification Steps

### Scenario A: Unauthenticated User Claims Resource
1. **Navigate** to an unclaimed resource page (e.g., `/t/some-tool`).
2. **Verify** the "Claim This Tool" button is visible in the right sidebar.
3. **Click** the button.
4. **Expectation:** Redirect to GitHub Sign-In page (or Auth.js login if not configured to auto-forward).
5. **Action:** Sign in with GitHub.
6. **Expectation:** Redirect back to the resource page and see a success toast "Resource Claimed!".
7. **Verify:** The "Claim This Tool" button is gone. A "Claimed by [Username]" badge appears.

### Scenario B: Authenticated User (Non-Owner)
1. **Login** with a GitHub account that does **NOT** own the repo.
2. **Navigate** to the resource page.
3. **Click** "Claim This Tool".
4. **Expectation:** A failure toast appears: "Verification failed. You must own or contribute to the repo."

### Scenario C: Authenticated Owner
1. **Login** with the GitHub account that **OWNS** the repo linked in the resource.
2. **Navigate** to the resource page.
3. **Click** "Claim This Tool".
4. **Expectation:** Loading spinner -> Success toast "Resource Claimed!".
5. **Verify:** Database `resources` table has `authorId` updated. `resourceClaims` table has a new record.

## 3. Evidence Collection
- Take screenshots of:
  - The unclaimed state (Button visible).
  - The GitHub authorization screen.
  - The Success Toast.
  - The Claimed Badge.
- Record the `resource_claims` row ID if possible.

## 4. Troubleshooting
- If **401 Unauthorized**: Ensure `NEXTAUTH_URL` matches the browser URL.
- If **Verification Failed**: Check that your GitHub user is actually an admin/push contributor to the repo.
