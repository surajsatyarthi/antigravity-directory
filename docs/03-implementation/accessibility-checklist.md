# Accessibility Checklist for Phase 2 Components

## Overview

This checklist ensures WCAG AA compliance is **built into** Phase 2 components, not added later in Phase 7. Phase 7 will be **validation**, not implementation.

**Target:** WCAG 2.1 Level AA

---

## FilterSidebar Component

### Keyboard Navigation

- [ ] All checkboxes focusable with Tab key
- [ ] Space key toggles checkbox
- [ ] Enter key toggles checkbox
- [ ] Focus visible on all interactive elements
- [ ] Tab order follows visual order (top to bottom)
- [ ] Escape key closes accordion (if applicable)

### Screen Reader Support

- [ ] Accordion has `role="region"` and `aria-labelledby`
- [ ] Accordion button has `aria-expanded` state
- [ ] Accordion button has `aria-controls` pointing to panel ID
- [ ] Each checkbox has descriptive `aria-label`
  - Example: `aria-label="Filter by Prompts category"`
- [ ] Checkbox count announced
  - Example: `aria-label="Filter by Prompts category, 52 resources"`
- [ ] Live region announces filter count changes
  - `<div aria-live="polite" aria-atomic="true">{count} results found</div>`

### Visual Design

- [ ] Focus indicator has 3:1 contrast ratio
- [ ] Text has 4.5:1 contrast ratio (normal text)
- [ ] Text has 3:1 contrast ratio (large text 18px+)
- [ ] Interactive elements minimum 44x44px touch target
- [ ] Disabled checkboxes visually distinct

### Code Example

```tsx
<div role="region" aria-labelledby="filter-heading">
  <h3 id="filter-heading">Filters</h3>

  <button
    aria-expanded={isExpanded}
    aria-controls="category-panel"
    onClick={() => setIsExpanded(!isExpanded)}
  >
    Function
  </button>

  <div id="category-panel" hidden={!isExpanded}>
    {categories.map((cat) => (
      <label key={cat.slug}>
        <input
          type="checkbox"
          aria-label={`Filter by ${cat.name} category, ${cat.count} resources`}
          checked={isSelected(cat.slug)}
          onChange={() => handleChange(cat.slug)}
        />
        {cat.name} ({cat.count})
      </label>
    ))}
  </div>

  <div aria-live="polite" aria-atomic="true" className="sr-only">
    {resultsCount} results found
  </div>
</div>
```

---

## TopFilterBar Component

### Search Input

#### Keyboard Navigation

- [ ] Search input focusable
- [ ] Enter key triggers search
- [ ] Escape key clears search
- [ ] Clear button (X) focusable and keyboard accessible

#### Screen Reader Support

- [ ] Input has `role="searchbox"`
- [ ] Input has descriptive `aria-label`
  - Example: `aria-label="Search resources by title or description"`
- [ ] Search button has `aria-label="Search"`
- [ ] Clear button has `aria-label="Clear search"`
- [ ] Search results announced via live region

#### Visual Design

- [ ] Placeholder text has 4.5:1 contrast
- [ ] Focus indicator visible
- [ ] Input border has 3:1 contrast

#### Code Example

```tsx
<div role="search">
  <input
    type="search"
    role="searchbox"
    aria-label="Search resources by title or description"
    placeholder="Type and press Enter to search..."
    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button aria-label="Clear search" onClick={handleClear}>
    ×
  </button>
</div>
```

### Category Pills

#### Keyboard Navigation

- [ ] Pills focusable with Tab
- [ ] Space/Enter activates pill
- [ ] Arrow keys navigate between pills (optional)

#### Screen Reader Support

- [ ] Pills have `role="radio"` (single-select)
- [ ] Pills have `aria-checked` state
- [ ] Group has `role="radiogroup"`
- [ ] Group has `aria-label="Filter by category group"`

#### Visual Design

- [ ] Active state has 3:1 contrast with inactive
- [ ] Text has 4.5:1 contrast
- [ ] Minimum 44x44px touch target

#### Code Example

```tsx
<div role="radiogroup" aria-label="Filter by category group">
  {groups.map((group) => (
    <button
      key={group}
      role="radio"
      aria-checked={selectedGroup === group}
      onClick={() => setSelectedGroup(group)}
    >
      {group}
    </button>
  ))}
</div>
```

### Sort Dropdown

#### Keyboard Navigation

- [ ] Dropdown button focusable
- [ ] Space/Enter opens dropdown
- [ ] Arrow keys navigate options
- [ ] Enter selects option
- [ ] Escape closes dropdown

#### Screen Reader Support

- [ ] Button has `aria-haspopup="listbox"`
- [ ] Button has `aria-expanded` state
- [ ] Options have `role="option"`
- [ ] Selected option has `aria-selected="true"`
- [ ] Dropdown has `role="listbox"`

#### Code Example

```tsx
<button
  aria-haspopup="listbox"
  aria-expanded={isOpen}
  aria-label="Sort by"
>
  {selectedSort}
</button>

<ul role="listbox" hidden={!isOpen}>
  {options.map(opt => (
    <li
      key={opt.value}
      role="option"
      aria-selected={selectedSort === opt.value}
      onClick={() => handleSelect(opt.value)}
    >
      {opt.label}
    </li>
  ))}
</ul>
```

---

## ResourceCard Component

### Keyboard Navigation

- [ ] Entire card is keyboard accessible
- [ ] Card link focusable
- [ ] Focus indicator visible on card
- [ ] Bookmark button separately focusable

### Screen Reader Support

- [ ] Card has semantic HTML (`<article>`)
- [ ] Card title is heading (`<h3>`)
- [ ] Integration icons have `aria-label`
  - Example: `aria-label="Built with Next.js, TypeScript, and React"`
- [ ] Stats have descriptive labels
  - Example: `<span aria-label="5 star rating">⭐ 5.0</span>`
- [ ] Tags have proper semantic markup

### Visual Design

- [ ] Hover state has 3:1 contrast
- [ ] Text has 4.5:1 contrast
- [ ] Icons have text alternatives
- [ ] Focus indicator visible

### Code Example

```tsx
<article>
  <a href={`/resources/${resource.slug}`}>
    <div aria-label={`Built with ${resource.integrations.join(', ')}`}>
      {/* Integration icons */}
    </div>

    <h3>{resource.title}</h3>

    <p>{resource.description}</p>

    <div>
      <span aria-label={`${resource.rating} star rating`}>
        ⭐ {resource.rating}
      </span>
      <span aria-label={`${resource.views} views`}>👁 {resource.views}</span>
    </div>

    <div>
      {resource.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </a>
</article>
```

---

## Global Requirements

### Color Contrast

- [ ] Normal text (< 18px): 4.5:1 minimum
- [ ] Large text (≥ 18px): 3:1 minimum
- [ ] UI components: 3:1 minimum
- [ ] Focus indicators: 3:1 minimum

### Touch Targets

- [ ] All interactive elements: 44x44px minimum
- [ ] Adequate spacing between targets

### Focus Management

- [ ] Focus visible on all interactive elements
- [ ] Focus order follows visual order
- [ ] No keyboard traps
- [ ] Skip links provided (if needed)

### Semantic HTML

- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Landmarks used (`<nav>`, `<main>`, `<aside>`)
- [ ] Lists use `<ul>`/`<ol>`
- [ ] Buttons use `<button>`, not `<div>`

---

## Testing Tools

### Automated Testing

```bash
# Install
pnpm add -D jest-axe @axe-core/playwright

# Run in tests
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const results = await axe(container);
expect(results).toHaveNoViolations();
```

### Manual Testing

- [ ] Test with keyboard only (unplug mouse)
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Test with browser zoom at 200%
- [ ] Test color contrast with browser DevTools
- [ ] Test with Windows High Contrast mode

### Browser Extensions

- [ ] axe DevTools
- [ ] WAVE
- [ ] Lighthouse (Accessibility score > 95)

---

## Acceptance Criteria

Before Phase 2 is considered complete:

- [ ] All components pass automated axe tests
- [ ] All components keyboard navigable
- [ ] All components screen reader friendly
- [ ] Color contrast ratios meet WCAG AA
- [ ] Touch targets meet minimum size
- [ ] Lighthouse Accessibility score > 95
- [ ] Manual keyboard testing passed
- [ ] Manual screen reader testing passed

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Inclusive Components](https://inclusive-components.design/)
