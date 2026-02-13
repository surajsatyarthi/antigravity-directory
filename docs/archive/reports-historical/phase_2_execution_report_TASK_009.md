# Ralph Gate 3: Blueprint & RFC (TASK_009)

**Date:** February 4, 2026
**TASK_ID:** TASK_009
**Status:** 🟡 PENDING APPROVAL

---

## 🎯 1. Problem Statement
The current directory layout has a "scrolling conflict":
1. The left sidebar (FilterSidebar) cannot be scrolled independently.
2. Reaching bottom filters requires scrolling the main page.
3. Main page scroll triggers infinite loading of resources.
4. Redundant horizontal category tabs consume vertical space and add UX noise.

---

## 💡 2. Proposed Solution
Transform the layout into a "FAANG-Standard" split-scroll architecture:

### 2.1 CSS / Layout Changes
- **FilterSidebar**:
  - Set `position: sticky; top: 80px;` (accounts for main header).
  - Set `height: calc(100vh - 80px);`.
  - Add `overflow-y: auto;` and hide scrollbar for clean look.
- **Header Refactor**:
  - Remove `<CategoryTabs />` from `page.tsx`.
  - Ensure main `Header` doesn't overlap sidebar.

### 2.2 Component Updates
- **FilterSidebar.tsx**: Update the container `aside` and the inner `div`.
- **page.tsx**: Remove category tabs integration, adjust column widths if necessary.

---

## 🔄 3. Alternatives Considered

| Alternative | Pros | Cons |
| :--- | :--- | :--- |
| **Keep CategoryTabs** | Faster navigation for sub-categories | Redundant with sidebar; clutters UI. |
| **Pagination instead of Infinite Scroll** | Fixes the "moving target" issue | Worse UX for discovery-heavy sites. |
| **Double Sidebar** | More space for secondary nav | Too cramped on smaller desktops. |
| **Split-Scroll (Proposed)** | Fixed filters, clean header, unlimited growth | Requires careful CSS viewport handling. |

---

## ⚖️ 4. Trade-offs Analysis
- **Trade-off**: Removing `CategoryTabs` removes the horizontal "quick switch".
- **Mitigation**: The `FilterSidebar` already contains all categories with counts, providing better context than the horizontal tabs.
- **Risk**: Sticky viewport height can be tricky on mobile.
- **Mitigation**: `MobileFilterDrawer` already handles mobile view separately, so this change will strictly target the `lg:block` desktop sidebar.

---

## ✅ 5. User Approval (REQUIRED)

> [!IMPORTANT]
> **Antigravity (AI)**: "I propose removing the horizontal CategoryTabs and making the left FilterSidebar independently scrollable with a fixed height. This will stop the infinite loader from interfering with your filter selection. Do you approve this plan?"

**Approval Signature:** ✅ USER_APPROVED_VIA_CHAT (2026-02-04)
