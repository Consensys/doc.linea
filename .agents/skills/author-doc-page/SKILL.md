---
name: author-doc-page
description: >-
  Scaffold or draft a new docs.linea.build page to editorial standards. Use when creating a
  new page, writing a first draft, or helping a contributor who isn't a professional writer
  produce content that meets the documentation team's expectations.
metadata:
  short-description: Scaffold and draft new docs.linea.build pages
---

# Author a docs.linea.build page

Help create a new documentation page that follows docs.linea.build's editorial standards
from the start.

## When to use

- You need to scaffold a new page or write a first draft.
- You're helping a contributor who isn't a professional writer produce content that meets
  the documentation team's expectations (for example, an ecosystem partner documenting
  their integration).

## Inputs

Ask the user for anything they haven't already provided:

1. **Tab**: which tab is this for? (Linea Mainnet, Lineth Stack, Protocol, Reference,
   Changelog)
2. **Content type**: concept/explanation, how-to guide, reference, or tutorial?
3. **Topic**: what is the page about?
4. **File path**: where should the file live? Suggest one based on the tab and topic if
   the user doesn't specify (see the directory table in
   [README.mdx](../../../README.mdx)).
5. **Source material**: what code, spec, PR, or other reference verifies the content?

## Step 1: Confirm an issue exists, then load the relevant rules

Per `.cursor/rules/contributor-workflow.mdc`, an issue should exist for this change
*before* work starts. Ask the user whether one's already open; if not, point them to
[CONTRIBUTING.md](../../../CONTRIBUTING.md) and the templates in `.github/ISSUE_TEMPLATE/`
so they can open one before you invest time scaffolding and drafting. This matters most
for ecosystem/partner contributors.

Then read these rule files before scaffolding, and apply them by reference rather than
restating them in the draft:

- `.cursor/rules/contributor-workflow.mdc`: issue-first workflow, redirects, PR hygiene.
- `.cursor/rules/content-structure.mdc`: tab, audience, tone, and page-structure
  conventions.
- `.cursor/rules/editorial-voice.mdc`: voice, heading style, and the `[VERIFY]` marker
  convention.
- `.cursor/rules/terminology.mdc`: casing, Linea vs. Lineth naming, and component
  capitalization.
- `.cursor/rules/markdown-formatting.mdc`: frontmatter, links, and file conventions.

Also check how existing pages in the same folder are structured, and match their
conventions for headings, frontmatter fields, and intro style.

## Step 2: Scaffold the page

Create the file with frontmatter (`title`, `description`; no `image`, see
`markdown-formatting.mdc`) and the structure from `content-structure.mdc` for the content
type: an opening (no heading), then content sections, then
verified code samples, then a resources section for links. How-to and tutorial pages use
numbered steps with prerequisites listed first instead.

## Step 3: Write the content

Fill in the scaffold with content based on what the user provides:

- Identify the audience for this tab (`content-structure.mdc`) and write for it.
- Define jargon on first use (`editorial-voice.mdc`).
- Use the correct casing for Linea/Lineth, components, and roles
  (`terminology.mdc`). Check `/protocol/linea-vs-lineth` if you're unsure which product a
  claim belongs to.
- Mark anything you can't verify with `[VERIFY]` rather than guessing.
- No marketing language or superlatives ("best-in-class", "powerful", "seamless").

## Step 4: Verify the page is complete

Before finishing, check:

- [ ] Frontmatter has `title` and `description`, no manual `image` field.
- [ ] Opening answers "what" and "why" in one to two sentences.
- [ ] Structure matches the content type and neighboring pages.
- [ ] Terminology and casing match `terminology.mdc` and the canonical
  `/protocol/linea-vs-lineth` page.
- [ ] Any unverified values are marked `[VERIFY]`.
- [ ] Links are relative where possible, with no `.mdx` extension, and descriptive text.
- [ ] Code samples have language tags and are placed near the bottom of the page.
- [ ] File uses lowercase and dashes, and lives in the correct tab/content-type folder.

## Step 5: Remind the contributor

After creating the page, remind the user to:

1. Add an entry to `redirects.json` if any page was moved, renamed, or removed.
2. Preview locally with `npm run start`.
3. Run `npm run lint` and `npm run typecheck` before opening a PR.
4. Link the issue from Step 1 in the pull request description (see
   [CONTRIBUTING.md](../../../CONTRIBUTING.md)).
