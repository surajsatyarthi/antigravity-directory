# Gate 6 Test Quality Report - ENTRY-000

**Status:** ❌ BLOCKED
**Timestamp:** 2026-02-14T13:33:23.103Z

## Coverage Analysis

- **Current Coverage:** 78.50%
- **Previous Coverage:** 75.20%
- **Delta:** +3.30%
- **Lines:** 1570/2000
- **Branches:** 340/450

## Test Quality

- **Tests Analyzed:** 143
- **Average Assertions/Test:** 4.54
- **Low Quality Tests (<3 assertions):** 36

### Test Details

- tests/unit/schema.test.ts - Test #1: 1.5 assertions
- tests/unit/schema.test.ts - Test #2: 1.5 assertions
- tests/unit/profile-utils.test.ts - Test #1: 2.0 assertions
- tests/unit/profile-utils.test.ts - Test #2: 2.0 assertions
- tests/unit/profile-utils.test.ts - Test #3: 2.0 assertions
- tests/unit/profile-utils.test.ts - Test #4: 2.0 assertions
- tests/unit/lib/enrich-contacts.test.ts - Test #1: 5.2 assertions
- tests/unit/lib/enrich-contacts.test.ts - Test #2: 5.2 assertions
- tests/unit/lib/enrich-contacts.test.ts - Test #3: 5.2 assertions
- tests/unit/lib/enrich-contacts.test.ts - Test #4: 5.2 assertions


... and 133 more

## Mock Ratio Analysis

- **Tests Analyzed:** 36
- **High Mock Tests (>80%):** 0

### Mock Usage

- tests/unit/schema.test.ts: 0.0% mocked 
- tests/unit/profile-utils.test.ts: 0.0% mocked 
- tests/unit/lib/enrich-contacts.test.ts: 41.8% mocked 
- tests/unit/lib/payment.test.ts: 28.6% mocked 
- tests/unit/lib/safeJsonLd.test.ts: 0.0% mocked 
- tests/integration/resource-claiming.spec.ts: 0.0% mocked 
- tests/api/checkout-paypal-capture.test.ts: 36.1% mocked 
- tests/api/checkout-paypal-create.test.ts: 23.4% mocked 
- tests/api/checkout-razorpay-create.test.ts: 30.3% mocked 
- tests/api/checkout-razorpay-verify.test.ts: 28.6% mocked 

## Integration Tests

- **Total Integration Tests:** 1
- **Real Tests (with external calls):** 0
- **Mocked Tests:** 1
- **Real Test Ratio:** 0.0%

## Violations

- ❌ 36 tests with < 3 assertions
- ❌ Only 0 real integration tests (need >=3)

## Conclusion

❌ BLOCKED: 2 violation(s) must be fixed before proceeding.

---
Generated: 2026-02-14T13:33:29.685Z
