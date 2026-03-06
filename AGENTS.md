# AI Agent Instructions

Rules for AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.) working
on this Docusaurus v3 documentation site.

## When these rules apply

Apply the CSS/styling rules below when modifying files under `src/` — components,
theme overrides, stylesheets, or layouts. Ignore them for documentation content
changes (`.md`, `.mdx` files where only prose is edited).

---

## CSS architecture

The CSS is split into ordered layers. `src/css/custom.css` is the Docusaurus
entry point and contains **only `@import` statements** — never add rules to it.

| Layer file | Purpose |
|---|---|
| `tokens.css` | Design tokens (`:root`, `[data-theme]` custom properties) |
| `fonts.css` | `@font-face` declarations (AtypDisplay, AtypText) |
| `base.css` | Element resets (body, headings, tables, form elements) |
| `utilities.css` | Utility classes consumed from MDX (`.video-container`, `.img-*`, `.mermaid-*`) |
| `docusaurus-overrides.css` | Overrides for Infima / Docusaurus UI (navbar, sidebar, TOC, breadcrumbs, admonitions, code blocks, pagination, search) |
| `vendor-overrides.css` | Third-party plugin overrides (Algolia DocSearch) |

Component-specific styles use co-located **CSS Modules** (`styles.module.css`)
next to the component file.

### Where to add new styles

- **React component** → `src/components/<Name>/styles.module.css` (CSS Module)
- **Swizzled Docusaurus component** → `src/theme/<Name>/styles.module.css`
- **New design token** → `src/css/tokens.css`
- **Docusaurus theme override** → `src/css/docusaurus-overrides.css`
- **Utility class used in MDX** → `src/css/utilities.css`
- **Never** add rules to `custom.css`

---

## Design tokens

Always use tokens instead of hardcoded values. The full token set is in
`src/css/tokens.css`.

### Brand palette (constant across themes)

| Token | Value |
|---|---|
| `--linea-brand-navy` | `#190066` |
| `--linea-brand-purple` | `#6119ef` |
| `--linea-brand-cyan` | `#61dfff` |
| `--linea-brand-pink` | `#fcd6ff` |
| `--linea-brand-yellow` | `#fff068` |
| `--linea-purple-hover` | `#8e5dff` |

### Theme-aware tokens (auto-switch light ↔ dark)

| Token | Light | Dark |
|---|---|---|
| `--linea-text-primary` | `#121212` | `#f8f7f2` |
| `--linea-text-secondary` | `#525252` | `#d1d1d1` |
| `--linea-text-muted` | `#808080` | `#808080` |
| `--linea-text-subtle` | `#a0a0a0` | `#a0a0a0` |
| `--linea-border` | `#e5e5e5` | `#333` |
| `--linea-border-subtle` | `#e5e5e5` | `#2d2d2d` |
| `--linea-surface-elevated` | `#efefeb` | `#2f2f2f` |
| `--linea-hover-bg` | `#EFEFEB` | `rgb(255 255 255 / 8%)` |
| `--linea-active-color` | `#6119ef` | `#a78bfa` |
| `--linea-active-bg` | `rgb(97 25 239 / 10%)` | `rgb(161 107 250 / 15%)` |

### Border radii

| Token | Value |
|---|---|
| `--linea-radius-sm` | `4px` |
| `--linea-radius-md` | `10px` |
| `--linea-radius-lg` | `15px` |
| `--linea-radius-pill` | `50px` |
| `--linea-radius-round` | `100px` |

### Typography

| Token | Value |
|---|---|
| `--font-display-lg` | `40px` |
| `--font-display-md` | `32px` |
| `--font-heading-lg` | `24px` |
| `--font-heading-md` | `18px` |
| `--font-body-md` | `16px` |
| `--font-body-sm` | `14px` |
| `--font-body-xs` | `12px` |

Heading font: `AtypDisplay, sans-serif`. Body font: `AtypText, sans-serif`.

---

## Forbidden patterns

| Pattern | Why | Alternative |
|---|---|---|
| Hardcoded `#190066`, `#6119ef`, `#8e5dff`, `#e5e5e5`, `#333` | Breaks token system | Use `var(--linea-*)` tokens |
| `!important` without a comment | Specificity wars | Increase specificity naturally; comment if unavoidable |
| Build-hash selectors (`.admonitionContent_BuS1`) | Break across Docusaurus versions | Use `.theme-admonition-content` |
| Inline `style={{}}` on components | Unmaintainable, no dark-mode | Use CSS Module |
| Inline `<svg>` in component JSX/TSX | Clutters markup, duplicates easily | Extract to `src/components/icons/` |
| DOM style mutations (`e.target.style`) | Hard to debug | Use `clsx` + class toggling |
| ID selectors (`#my-id`) | Over-specific | Use classes |
| New rules in `custom.css` | It's an import-only entry point | Choose the correct layer file |

---

## Dark mode

- Use theme-aware tokens so a single CSS rule handles both themes.
- Only use `[data-theme="dark"]` when the token system cannot express the
  difference (e.g., SVG data URIs with embedded fill colors).
- New theme-aware tokens go in `src/css/tokens.css` under both `[data-theme]`
  blocks.

---

## Component style pattern

```tsx
import styles from './styles.module.css';
import clsx from 'clsx';

export default function MyComponent({ active }) {
  return <div className={clsx(styles.root, active && styles.active)} />;
}
```

```css
/* styles.module.css */
.root {
  border: 1px solid var(--linea-border);
  border-radius: var(--linea-radius-md);
  color: var(--linea-text-primary);
}
.active {
  color: var(--linea-active-color);
  background: var(--linea-active-bg);
}
```

---

## Selector guidelines for Docusaurus overrides

- Prefer `.theme-*` stable class names over `[class*="..."]` attribute selectors.
- If `[class*="..."]` is the only option, add a comment explaining why.
- Keep selector nesting depth under 4 levels.
- Reuse `--ifm-*` variables when Infima already provides the token you need.

---

## Visual verification

After any CSS change, visually inspect the affected pages in both light and dark
mode, at desktop (1440 px) and mobile (390 px) viewports, to confirm zero
regressions. Key pages to check:

- `/` (homepage)
- `/network/overview/public-data` (doc page with sidebar + TOC)
- `/changelog/release-notes` (changelog layout)
- `/api/reference/eth-sendrawtransaction` (API reference with code blocks)
