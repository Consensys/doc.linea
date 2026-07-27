# Contributing to docs.linea.build

Thanks for helping improve the [Linea documentation](https://docs.linea.build/). This
guide covers the contribution workflow. For editorial standards (voice, terminology,
formatting), see [AGENTS.md](AGENTS.md) and `.cursor/rules/`: they apply to human and AI
contributors alike.

## Before you start

Open an issue describing the change you want to make **before** you start working on it,
and [link to it in your pull request](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
We provide issue templates for [bug reports](.github/ISSUE_TEMPLATE/bug-report.yml),
[enhancements](.github/ISSUE_TEMPLATE/enhancement.yml), and
[partner contributions](.github/ISSUE_TEMPLATE/partner-contribution.yml).

> This is particularly important if you're an ecosystem contributor: submitting your
> details in an issue first makes it much easier for our docs team to process your
> contribution.

## Steps

1. [Fork the repo](https://github.com/Consensys/doc.linea/fork) so you can work on it.
2. Make your changes. See [Writing conventions](README.mdx#writing-conventions) and
   AGENTS.md's linked rule files for editorial standards.
3. Review your changes locally. See
   [Running locally](README.mdx#running-locally) and
   [Quality checks before pushing](README.mdx#quality-checks-before-pushing).
4. Submit your changes as a
   [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

New pull requests are reviewed regularly. Our team does its best to help you get the PR
over the line, though we can't guarantee capacity. Please don't open a PR if you think
you'll be unable to address feedback, fix linter errors, or otherwise respond to review
comments. If that's the case, consider opening an issue instead so the docs team can pick
it up.

If you don't return to your PR for edits within three months of our reviewing it, we'll
close it.

## Guidance for ecosystem contributions

By "ecosystem contributions," we mean contributions from projects in the Linea ecosystem,
such as dapps, libraries, or tooling. If your submission is in this category:

- Keep it informative above all. The docs aren't a marketing channel for your project.
  We may request edits if writing falls too far toward promotional tone: write about your
  project's features and benefits, but avoid superlatives or selling your project.
- You're responsible for maintaining the information about your project. Out-of-date docs
  are an inconvenience for users at best and a bad look for your project at worst. This
  includes keeping links to external sites current and returning for updates as your
  project matures.

## Contributing to the glossary

If you're stumped by Linea, Lineth, or zero-knowledge jargon: we maintain an open source
glossary at
[`/protocol/reference/zero-knowledge-glossary`](https://docs.linea.build/protocol/reference/zero-knowledge-glossary).
The glossary page is generated, so don't edit it directly:

1. [Fork the repo](https://github.com/Consensys/doc.linea/fork).
2. Add your term, in alphabetical order, to `src/lib/glossary.json` with a `term` and a
   `definition`. Keep definitions to a short paragraph or two, and link to other glossary
   terms with `[term](#slug)` where useful.
3. Run `npm run glossary:generate` to regenerate
   `docs/protocol/reference/zero-knowledge-glossary.mdx` from `src/lib/glossary.json`.
4. Open a pull request and tag us for review.

To show a glossary term as a hover tooltip inline in a page, import and use the
`GlossaryTerm` component (`src/theme/GlossaryTerm`):

```mdx
import GlossaryTerm from "@theme/GlossaryTerm";

The <GlossaryTerm term="Coordinator" /> orchestrates batching, and the
<GlossaryTerm term="Sequencer">sequencer</GlossaryTerm> orders transactions.
```

- Self-close (`<GlossaryTerm term="Coordinator" />`) when the visible label matches the
  glossary term exactly.
- Wrap children (`<GlossaryTerm term="Sequencer">sequencer</GlossaryTerm>`) when the page
  uses a different casing, plural, or shortened form than the glossary entry.
- The `term` prop must match a `term` string in `src/lib/glossary.json` (matching is
  case-insensitive, but keep it consistent with the glossary entry for clarity).

## Additional resources

- [Submit a contribution](https://docs-template.consensys.net/contribute/submit-a-contribution)
  using forks and pull requests.
- [Documentation style guide](https://docs-template.consensys.net/contribute/style-guide).
- [Markdown formatting guide](https://docs-template.consensys.net/contribute/format-markdown).
- [Preview the docs locally](https://docs-template.consensys.net/contribute/preview).
- [Guidance on using Vale](https://docs-template.consensys.net/contribute/run-vale).

## Questions

[Create an issue](https://github.com/Consensys/doc.linea/issues), post in the
[community forum](https://community.linea.build/), or reach out via
[Linea Support](https://docs.linea.build/support).
