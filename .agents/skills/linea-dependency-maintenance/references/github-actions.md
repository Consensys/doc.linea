# GitHub Actions Dependency Maintenance

<!-- markdownlint-disable -->
<!-- vale off -->

Use these notes for the GitHub Actions referenced by `.github/workflows/*.yml` and `.github/actions/**/action.yml`.

## Rules

- Pin every external action to a full 40-character commit SHA, never a tag or branch ref (`@v4`, `@main`). A tag is
  movable: the upstream repo can repoint it at new code that then runs in CI without review.
- Keep the human-readable version as an end-of-line comment (`uses: actions/checkout@<sha> # v6.0.3`) and update it in
  the same edit as the SHA, so the pin stays auditable and the two never drift.
- Release-age gate (mandatory): only adopt a SHA whose release (tag) is older than 7 days. Actions use a longer window
  than the 3-day JS/npm/pnpm gate because an action runs with repository scope in CI, so a fresh release is higher-risk
  supply-chain surface. This is a hard gate — hold the bump until the release matures.
- Default scope is same-major (patch/minor) bumps. Track semver-major action bumps as issues; they can change runner or
  Node baselines and need deliberate migration.
- Local actions (`uses: ./.github/actions/...`) are first-party and are not pinned.
- Dependabot keeps opening the routine `github-actions` PRs. Do not disable that job; its cooldown in `dependabot.yml`
  (7 days) matches this maturity window. This skill covers manual/agent sweeps and enforcing the rules above on every PR.

## Baseline

```bash
gh --version            # the checks below need an authenticated gh CLI
# list every external action pin and its current version comment
grep -rnE 'uses:\s+[^./]' .github/workflows .github/actions
```

## Update Flow

1. Inventory the pins with a reproducible first pass:
   ```bash
   node <skill-dir>/scripts/eligible-actions --days 7
   ```
2. For a candidate `owner/repo`, list same-major releases and their publish dates:
   ```bash
   gh api "repos/<owner>/<repo>/releases?per_page=100" --jq '.[] | "\(.tag_name)\t\(.published_at)"'
   ```
3. Pick the newest same-major tag whose `published_at` is older than the cutoff. Resolve it to a commit SHA:
   ```bash
   gh api "repos/<owner>/<repo>/commits/<tag>" --jq '.sha'
   ```
   For an action that publishes tags without releases, fall back to the tag commit date:
   ```bash
   gh api "repos/<owner>/<repo>/commits/<tag>" --jq '.commit.committer.date'
   ```
4. Replace the SHA and the version comment together, on the same line, everywhere the action is used:
   ```
   - uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2
   + uses: actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3
   ```

## Validation

- Confirm no mutable refs remain — every external `uses:` must be a 40-character SHA with a standard version comment
  (` # vX.Y.Z` or ` # X.Y.Z`, space before `#`):
  ```bash
  grep -rnE 'uses:\s+[^./][^@]+@[^ ]+' .github/workflows .github/actions \
    | grep -vE '@[0-9a-f]{40} +# v?[0-9]+\\.[0-9]+\\.[0-9]+'
  ```
  The command should print nothing. Any line it prints is an unpinned action, a tag/branch ref, or a non-standard
  version comment (for example `#v7.2.0` without a leading space).
- Re-run `scripts/eligible-actions` and confirm each bumped action now shows no eligible update, and that anything left
  behind is either too fresh (blocked by the age gate) or a tracked major.

## Inventory Script Limits

`scripts/eligible-actions` scans each YAML line for `uses: owner/repo@ref` without surrounding quotes. It does not match
refs wrapped in single or double quotes (for example `uses: 'actions/checkout@<sha>'`). This repo uses unquoted refs;
if a workflow adopts quoted `uses:` lines, inventory that pin manually or extend the script before relying on the output.

Inventory groups external actions by action path (the `uses` value before `@`), not just `owner/repo`. GitHub API
lookups always use the first two path segments (`owner/repo`). When the same action appears on multiple lines, the
script compares SHAs across files. If more than one SHA is pinned, the row
includes `conflictingPins: true` and a `pinVariants` list — reconcile those pins before acting on bump suggestions for
that action. When the same SHA carries different version comments, the row includes `commentDrift: true`.

Release discovery merges GitHub releases with tag-only semver tags so newer tag-only versions are not missed when older
formal releases still exist.

Eligible bump suggestions include a commit SHA only when `gh api repos/<owner>/<repo>/commits/<tag>` resolves one. If
SHA lookup fails for the newest mature same-major candidate, the script reports no eligible bump instead of falling back
to an older tag.
