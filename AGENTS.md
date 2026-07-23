# AI Agent Instructions

Rules for AI coding agents (Claude Code, GitHub Copilot, Cursor, Codex, etc.) working on
this Docusaurus v3 documentation site, [`docs.linea.build`](https://docs.linea.build).

## Repository areas

| Tab | Directory | Documents |
| --- | --- | --- |
| Linea Mainnet | `docs/network` | Linea Mainnet |
| Lineth Stack | `docs/stack` | Lineth (the operator stack) |
| Protocol | `docs/protocol` | Lineth (the protocol) |
| Reference | `docs/api` | Linea and Lineth |
| Changelog | `docs/changelog` | Linea and Lineth |

See [README.mdx](README.mdx) for full tab descriptions, audiences, and the `src/`
component/theme layout.

## Critical rules

1. **Do not invent protocol or API behavior.** Never state as fact any parameter, return
   value, or behavior you haven't verified against source code, a spec, or another
   authoritative reference. If uncertain, mark it `[VERIFY]` (see `editorial-voice.mdc`).
2. **Use Linea and Lineth precisely.** They're related but distinct terms. Check
   [`/protocol/linea-vs-lineth`](docs/protocol/linea-vs-lineth.mdx) before asserting which
   one applies to a claim, and don't guess from memory. See `.cursor/rules/terminology.mdc`.
3. **Never hardcode brand colors, spacing, or radii in `src/`.** Use the `var(--linea-*)`
   design tokens in `src/css/tokens.css`. See `.cursor/rules/css-styling.mdc`.
4. **Verify before requesting review.** Preview locally with `npm run start`, and confirm
   `npm run build` succeeds.
5. **Pass CI.** PRs run ESLint/Stylelint, TypeScript, Vale spelling/style, and link
   checking. Fix warnings before requesting review; see
   [Quality checks before pushing](README.mdx#quality-checks-before-pushing).

## AI guidance

Detailed rules live in `.cursor/rules/` and apply automatically in Cursor when editing a
file matching their `globs`. Other agents should read the relevant file directly before
editing matching content:

| Rule file | Applies to | Covers |
| --- | --- | --- |
| `content-structure.mdc` | `docs/**/*.{md,mdx}` | Tab/audience/tone, page structure |
| `editorial-voice.mdc` | `docs/**/*.{md,mdx}` | Voice, heading style, `[VERIFY]` markers |
| `terminology.mdc` | `docs/**/*.{md,mdx}` | Casing, Linea/Lineth naming, component capitalization |
| `markdown-formatting.mdc` | `docs/**/*.{md,mdx}` | Frontmatter, links, line wrapping, images |
| `contributor-workflow.mdc` | repo-wide | Issue-first workflow, redirects, PR hygiene |
| `css-styling.mdc` | `src/**/*.{css,tsx,jsx,ts,js}` | CSS architecture, design tokens, forbidden patterns |

Agent skills live under `.agents/skills/<skill-name>/SKILL.md` and are loaded when the
task matches the skill's description:

- **author-doc-page**: scaffold or draft a new documentation page to editorial standards.
- **pr-content-review**: structured editorial pass before opening or merging a PR.
- **linea-dependency-maintenance**: safe npm and GitHub Actions dependency updates.

Skills apply the rule files by reference. If you're extending a skill or rule, keep each
fact in exactly one file and link to it from everywhere else, rather than restating it.

### Machine-readable docs (`llms.txt`)

Separately from the rules above, the site publishes a machine-readable copy of itself for
LLM consumers on build (`scripts/agent-docs/generate.js`). Validate this pipeline with
`npm run agent-docs:check` and `npm run agent-docs:verify-preview`.
