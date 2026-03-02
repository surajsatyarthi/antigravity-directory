# Gate 7 Security Report - ENTRY-000

**Status:** ❌ BLOCKED
**Timestamp:** 2026-02-14T13:33:22.934Z

## Secrets Detection

- **Secrets Found:** 10 ❌


### Details
- ./.env.local: /secret\s*=\s*['"][^'"]{20,}['"]/i
- ./.env.local: /token\s*=\s*['"][^'"]{20,}['"]/i
- ./.env.local: /AIza[0-9A-Za-z-_]{35}/
- ./.env: /AIza[0-9A-Za-z-_]{35}/
- ./.env.test.local: /secret\s*=\s*['"][^'"]{20,}['"]/i

... and 5 more


## NPM Audit

| Severity | Count |
|----------|-------|
| Critical | 0 ✅ |
| High | 0 ✅ |
| Moderate | 4 |
| Low | 2 |
| **Total** | **6** |

## OWASP Top 10 Checklist

- **Completed:** 0/10
- **Status:** ❌ Incomplete

## Violations

- ❌ 10 secrets detected in code
- ❌ OWASP checklist incomplete (0/10)

## Conclusion

❌ BLOCKED: 2 security issue(s) must be fixed.

---
Generated: 2026-02-14T13:33:22.934Z
