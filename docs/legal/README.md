# 📜 Legal Compliance Documentation

**Purpose**: DMCA safe harbor, Terms of Service, legal protection docs
**Owner**: PM (creates), CEO (reviews), Legal (future)
**Created**: 2026-02-13
**Status**: Active

---

## 📁 CONTENTS

### Active Documents

1. **DMCA_AGENT_REGISTRATION.md** (ENTRY-018)
   - US Copyright Office registration guide
   - Agent designation form template
   - Renewal process (every 3 years)
   - Filing fee: $6

2. **TOS_IP_WARRANTIES.md** (ENTRY-018)
   - Intellectual property warranty clauses
   - Resource claiming terms
   - Repeat infringer policy
   - Platform indemnification

3. **DMCA Takedown Page** (ENTRY-018)
   - Implemented at: `src/app/dmca/page.tsx`
   - Public-facing DMCA notice submission
   - Counter-notification process
   - 24-48 hour response timeline

---

## 🎯 LEGAL COMPLIANCE CHECKLIST

### DMCA Safe Harbor (17 USC §512(c))
- [ ] Designated agent registered with Copyright Office
- [ ] Agent info displayed on website
- [ ] Takedown notice process documented
- [ ] Counter-notification process available
- [ ] Repeat infringer policy implemented (3 strikes)
- [ ] Response timeline: 24-48 hours

### Terms of Service
- [ ] IP warranty clause (users confirm ownership)
- [ ] Platform indemnification clause
- [ ] Right to remove infringing content
- [ ] Termination policy for repeat infringers
- [ ] User acknowledgment of DMCA process

### Privacy Policy
- [ ] Data collection disclosure
- [ ] Third-party services (Razorpay, PayPal, Supabase)
- [ ] User rights (GDPR, CCPA if applicable)
- [ ] Cookie policy

---

## 📚 REFERENCES

- **Business Model**: [../01-business/MARKETPLACE_MODEL_SPEC.md](../01-business/MARKETPLACE_MODEL_SPEC.md)
- **Legal Analysis**: [../01-business/UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md](../01-business/UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md)
- **DMCA Law**: 17 USC §512(c) - Safe Harbor Provisions
- **Copyright Office**: https://www.copyright.gov/dmca-directory/

---

## 🚀 QUICK LINKS

| Document | Location | Status |
|----------|----------|--------|
| DMCA Agent Guide | `DMCA_AGENT_REGISTRATION.md` | ENTRY-018 |
| TOS IP Warranties | `TOS_IP_WARRANTIES.md` | ENTRY-018 |
| DMCA Page (code) | `../../src/app/dmca/page.tsx` | ENTRY-018 |
| Legal Analysis | `../01-business/UNCLAIMED_RESOURCES_LEGAL_ANALYSIS.md` | ✅ Complete |

---

## ⚠️ IMPORTANT NOTES

1. **Not Legal Advice**: These documents are templates. Consult attorney before launch.
2. **Registration Required**: DMCA agent must be registered with US Copyright Office ($6 fee).
3. **Update Frequency**: Review quarterly, update agent registration every 3 years.
4. **Enforcement**: DMCA takedown requests must be processed within 24-48 hours.

---

## 🔄 MAINTENANCE

**Quarterly Review**:
- Check for legal/regulatory changes
- Update TOS if business model changes
- Verify DMCA agent registration is current

**After Legal Review**:
- Move draft docs to active
- Archive old versions in `archive/` folder
- Update website footer links

---

**Status**: Ready for ENTRY-018 execution
**Next**: PM creates DMCA_AGENT_REGISTRATION.md and TOS_IP_WARRANTIES.md
