# FAANG-Style Ralph Protocol Enforcement

This directory contains the infrastructure for architecturally preventing Ralph Protocol violations.

## Structure

```
.ralph/
├── audit_trail.json          # Immutable log of gate completions (timestamped + hashed)
├── gate_requirements.yml     # Required artifacts and checklists per gate
├── current_gate.txt          # Current working gate (prevents skipping)
└── templates/                # Auto-generated gate templates
    ├── GATE_1_RFC.md
    ├── GATE_3_SECURITY_AUDIT.md
    ├── GATE_7_TDD_PROOF.md
    └── ... (11 templates total)
```

## How It Works

### 1. Immutable Audit Trail (`audit_trail.json`)
- **Append-only** log with cryptographic hashes
- Each gate completion creates timestamped entry
- Hash chains prevent retroactive editing
- Sequential timestamps enforced

### 2. Gate Requirements (`gate_requirements.yml`)
- Defines required artifacts per gate
- Mandates checklists for each gate
- Used by pre-commit hook for validation

### 3. Current Gate Tracking (`current_gate.txt`)
- Stores the current active gate
- Prevents jumping to future gates
- Updated automatically by CLI

### 4. Gate Templates (`templates/`)
- Pre-filled markdown checklists
- Auto-generated when starting a gate
- Ensures comprehensive documentation

## Usage

### Start a Task
```bash
npm run ralph -- task start 27 "JSON-LD Security Fix"
```

### Start a Gate
```bash
npm run ralph -- gate start 3
# ✓ Created artifacts/GATE_3_SECURITY_AUDIT.md
# ✓ Checklist initialized
# ✓ Current gate: 3
```

### Complete a Gate
```bash
npm run ralph -- gate complete 3
# ✓ Checklist verified
# ✓ Artifacts validated
# ✓ Gate 3 recorded in audit trail
# ✓ Ready to start Gate 4
```

### Verify Compliance
```bash
npm run ralph -- verify
# ✅ Gate 1: complete (2026-02-02 01:55:17)
# ✅ Gate 2: complete (2026-02-02 01:57:20)
# ✅ Gate 3: complete (2026-02-02 02:00:15)
# ❌ Gate 4: INCOMPLETE
```

### View Audit Trail
```bash
npm run ralph -- audit
# Shows JSON audit trail with hashes
```

## Prevention Mechanisms

### 1. Sequential Enforcement
Cannot start Gate 7 if Gate 3 is incomplete:
```bash
$ npm run ralph -- gate start 7
❌ Cannot start Gate 7
   Current gate: 3
   Must complete gates sequentially: 3 → 4 → 5 → 6 → 7
```

### 2. Required Artifacts
Cannot complete gate without creating artifacts:
```bash
$ npm run ralph -- gate complete 3
❌ Missing required artifact: GATE_3_SECURITY_AUDIT.md
```

### 3. Immutable Timestamps
Cannot fake completion dates (Git + hashes):
```json
{
  "gate": 3,
  "timestamp": "2026-02-02T02:00:15Z",
  "hash": "abc123...",
  "previousHash": "def456..."
}
```

### 4. Pre-Commit Validation
Git hook prevents commits with incomplete gates:
```bash
$ git commit -m "Add feature"
❌ Ralph Protocol violation
   Gate 3 incomplete
   Missing: GATE_3_SECURITY_AUDIT.md
```

## FAANG Principles Applied

| Principle | Implementation |
|-----------|----------------|
| **Immutability** | Audit trail with hash chains |
| **Sequential workflow** | Current gate tracking + validation |
| **Required artifacts** | Checklist per gate + file existence checks |
| **Automated verification** | CLI tools + pre-commit hooks |
| **Transparency** | Audit trail + verify command |

## Integration with Existing Ralph Protocol

- ✅ Works alongside existing `.git/hooks/pre-commit`
- ✅ Compatible with `RALPH_PROTOCOL.md` documentation
- ✅ Enhances, doesn't replace existing processes
- ✅ Adds architectural enforcement layer

## Developer Guidelines

### DO
- ✅ Use `npm run ralph` for all gate operations
- ✅ Fill out gate checklists completely
- ✅ Run `npm run ralph -- verify` before committing

### DON'T
- ❌ Manually edit `audit_trail.json` (immutable)
- ❌ Skip gates (architecturally blocked)
- ❌ Commit without completing current gate

---

**Result**: Ralph Protocol violations are now **architecturally impossible** ✅
