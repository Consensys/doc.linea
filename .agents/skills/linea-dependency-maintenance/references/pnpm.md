# pnpm Dependency Maintenance

<!-- markdownlint-disable -->
<!-- vale off -->

Use these notes for pnpm repositories with `pnpm-lock.yaml`, `pnpm-workspace.yaml`, catalogs, overrides, or
pnpm-specific CI.

## Rules

- Keep pnpm as the only package manager. Respect `packageManager`, `.npmrc`, `engines`, `engine-strict`, and
  `only-allow` guards.
- `minimumReleaseAge` is a maturity window in minutes. For example, `4320` means 3 days.
- Respect `minimumReleaseAgeExclude`; do not manually block an excluded package solely because it is inside the maturity
  window. Treat the list as read-only — never add or widen entries to push a fresher version through.
- Preserve `catalog:` and `workspace:` dependency references. Update the catalog entry rather than each manifest when a
  catalog owns the version.
- Pin exact versions (mandatory): no `^` or `~` ranges in `dependencies`/`devDependencies`, catalog entries, or
  overrides. Pin the concrete version at the catalog definition so consumers can keep using `catalog:`. Leave
  intentional `peerDependencies` ranges as ranges — peers declare a compatibility window, not an install target.

## Baseline

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm outdated -r --format json || true
pnpm audit --json || true
```

Inspect `pnpm-workspace.yaml`, package manifests, `pnpm.overrides`, `minimumReleaseAge`, `minimumReleaseAgeExclude`,
`onlyBuiltDependencies`, `patchedDependencies`, LavaMoat/allow-scripts settings, and workspace-specific CI.

## Update Flow

1. Build a workspace-wide inventory of direct dependencies, catalog entries, and overrides.
2. Select the highest eligible same-major version older than the maturity cutoff, unless the package is explicitly
   excluded.
3. Update shared catalog entries first.
4. Run normal pnpm install to regenerate the lockfile:
   ```bash
   pnpm install
   ```
5. Re-run outdated and audit reports.

## Overrides

- Test whether an override is stale by checking whether removing it changes resolution or audit output in a temporary
  copy/worktree.
- Prefer targeted selectors such as `parent>child` when a global override changes unrelated tooling.
- Do not force a transitive dependency to a new major through an override unless the dependent package is proven to
  support that major. Deep toolchains are the usual victims: the parent targets an older major's API, so jamming a newer
  one in to silence an audit breaks it at runtime. When unsure, leave the advisory blocked and track it instead.
- Confirm override effects:
  ```bash
  pnpm why <package> -r
  pnpm audit --json || true
  ```
- Refresh the whole overrides block after direct bumps. Remove the existing overrides from the repo's pnpm source config,
  then let resolution settle, run `pnpm audit --fix`, and reinstall so the lockfile reflects the fixed tree. In workspace
  repos the live source config is often top-level `overrides` in `pnpm-workspace.yaml`; otherwise check `package.json` for
  `pnpm.overrides` or `resolutions`. Do not edit generated `pnpm-lock.yaml` override metadata by hand:
  ```bash
  # remove the live overrides block from pnpm-workspace.yaml or package.json first
  pnpm i
  pnpm audit --fix
  pnpm i
  ```
  On pnpm 10, `pnpm audit --fix` writes the overrides for you, so the manual work is to review and prune what it
  generated, not to re-add from scratch. Recent pnpm versions can also edit maturity-gate settings; revert any generated
  changes to `minimumReleaseAge`, `minimumReleaseAgeExclude`, or related settings before keeping the override result. On
  older pnpm versions, use the remaining audit output to add targeted exact overrides manually. In both cases, drop
  overrides for advisories no longer reported, pin each kept one to an exact version, and revert any that force an
  incompatible transitive major (see the transitive-major rule above).
- `minimumReleaseAge` gates overrides too: pnpm refuses an exact-version override still inside the maturity window, and a
  range override can silently resolve to an older, still-vulnerable in-range version. Confirm with `pnpm why <package> -r`
  and a re-audit that the intended patched version actually landed. If the only patched version is still inside the
  maturity window, treat the advisory as blocked and track it until it matures — never add it to
  `minimumReleaseAgeExclude`. If `pnpm audit --fix` adds such an exclusion, revert it; do not accept the silent,
  still-vulnerable fallback or compensate for maturity failures with config changes.
- Re-run validation, since shifting overrides can move transitive versions across the workspace.

## Common Validation

Choose checks by affected workspace:

```bash
pnpm run lint
pnpm run prettier
pnpm run build
pnpm run test
```

For monorepos, prefer filtered checks where they match CI:

```bash
pnpm run --filter=<workspace> lint
pnpm run --filter=<workspace> build
pnpm run --filter=<workspace> test
```

Also check domain-specific tasks when touched: Turbo pipelines, Prisma generate, Playwright browser installs, Storybook
visual tests, Foundry/forge, subgraph codegen/tests, Docker builds, and generated artifacts.
