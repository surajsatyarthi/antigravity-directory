# Agents.md - Permanent Learnings

This file tracks permanent patterns, gotchas, and learnings for the Antigravity Directory project.

## Project Context

- **Stack:** Next.js 14 (App Router), TypeScript, PostgreSQL, Drizzle ORM
- **Testing:** Vitest, React Testing Library, Playwright
- **Payments:** PayPal, Razorpay
- **Features:** Resource directory, featured listings, contact enrichment

## Learnings

### Next.js App Router Patterns

**API Routes:**

- Use `NextRequest` and `NextResponse` from `next/server`
- Routes are defined as `route.ts` files in `app/api/` directory
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`

**Example:**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Process request
  return NextResponse.json({ data }, { status: 200 });
}
```

### Payment Integration

**PayPal:**

- Business logic in `src/lib/payment/paypal.ts`
- Env vars: `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MODE`
- Two-step flow: create order → capture payment

**Razorpay:**

- Business logic in `src/lib/payment/razorpay.ts`
- Env vars: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- Amounts must be in paise (multiply rupees by 100)
- Webhook signature verification required (HMAC SHA-256)

### Testing Best Practices

- Use `vi.mock()` for mocking external APIs
- Reset mocks between tests
- Test files mirror source structure: `tests/api/payments/` for `app/api/payments/`
- Coverage target: 80%+

### Common Gotchas

**Vitest Mock Leakage:**

- Using `vi.mock()` without a factory creates a shared mock object.
- `vi.resetAllMocks()` only clears the state of the mock, not necessarily the `mockRejectedValue` implementation if it was set globally.
- **Solution:** Use `mockReset()` on specific functions or use `mockImplementationOnce` within `it` blocks for total isolation.
- Always mock the database (`@/lib/db`) and schema (`@/drizzle/schema`) for API tests.

---

**Last Updated:** January 14, 2026
