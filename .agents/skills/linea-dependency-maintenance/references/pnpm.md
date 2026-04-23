# pnpm Dependency Maintenance

<!-- markdownlint-disable -->
<!-- vale off -->

Use these notes for pnpm repositories with `pnpm-lock.yaml`, `pnpm-workspace.yaml`, catalogs, overrides, or pnpm-specific CI.

## Rules

- Keep pnpm as the only package manager. Respect `packageManager`, `.npmrc`, `engines`, `engine-strict`, and `only-allow` guards.
- `minimumReleaseAge` is a maturity window in minutes. For example, `4320` means 3 days.
- Respect `minimumReleaseAgeExclude`; do not manually block an excluded package solely because it is inside the maturity window.
- Preserve `catalog:` and `workspace:` dependency references. Update the catalog entry rather than each manifest when a catalog owns the version.

## Baseline

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm outdated -r --format json || true
pnpm audit --json || true
```

Inspect `pnpm-workspace.yaml`, package manifests, `pnpm.overrides`, `minimumReleaseAge`, `minimumReleaseAgeExclude`, `onlyBuiltDependencies`, `patchedDependencies`, LavaMoat/allow-scripts settings, and workspace-specific CI.

## Update Flow

1. Build a workspace-wide inventory of direct dependencies, catalog entries, and overrides.
2. Select the highest eligible same-major version older than the maturity cutoff, unless the package is explicitly excluded.
3. Update shared catalog entries first.
4. Run normal pnpm install to regenerate the lockfile:
   ```bash
   pnpm install
   ```
5. Re-run outdated and audit reports.

## Overrides

- Test whether an override is stale by checking whether removing it changes resolution or audit output in a temporary copy/worktree.
- Prefer targeted selectors such as `parent>child` when a global override changes unrelated tooling.
- Do not force transitive major versions through overrides for Hardhat, Jest/Istanbul, Graph/Matchstick, Playwright, or framework stacks unless compatibility is proven.
- Confirm override effects:
  ```bash
  pnpm why <package> -r
  pnpm audit --json || true
  ```

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

Also check domain-specific tasks when touched: Turbo pipelines, Prisma generate, Playwright browser installs, Storybook visual tests, Foundry/forge, subgraph codegen/tests, Docker builds, and generated artifacts.
