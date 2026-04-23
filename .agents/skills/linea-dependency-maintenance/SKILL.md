---
name: linea-dependency-maintenance
description: Safely plan and execute JavaScript/TypeScript dependency maintenance across npm and pnpm repositories, including npm lockfiles, pnpm workspaces, catalogs, overrides, release-age policies, audits, CI validation, Dependabot boundaries, PRs, and GitHub tracking issues. Use whenever the user asks to update, bump, refresh, audit, clean, modernize, or review dependencies, reduce vulnerabilities, clean overrides, or prepare dependency PRs/issues.
metadata:
  short-description: Safe npm/pnpm dependency maintenance
---

# Dependency Maintenance

<!-- markdownlint-disable -->
<!-- vale off -->

Use this workflow to maximize safe dependency progress without changing the repository's package-manager contract or hiding remaining risk.

## Preflight

1. Read repo instructions first: `AGENTS.md`, `CLAUDE.md`, package-specific instructions, and `CONTRIBUTING.md`.
2. Detect the package-manager contract from lockfiles, `packageManager`, CI, deploy config, and package-manager guard scripts:
   - npm repo: use npm, preserve `package-lock.json`, and validate with `npm ci`.
   - pnpm repo: use pnpm, preserve `pnpm-lock.yaml`, `pnpm-workspace.yaml`, catalogs, and overrides.
   - Do not introduce a different lockfile, workspace file, package-manager metadata, or install command.
3. Check branch and worktree state with `git status --short --branch`. If unrelated changes are present, use an isolated worktree or avoid touching those files.
4. Read `.nvmrc`, `.node-version`, `engines`, `.npmrc`, CI workflows, deploy config, and `dependabot.yml`.
5. Capture the baseline: outdated report, audit report, lockfile state, and relevant validation commands.

## Policy

- Treat release-age and cooldown rules as hard gates. Compute exact cutoff timestamps before selecting versions.
- In pnpm repos, `minimumReleaseAge` is a maturity window in minutes; respect `minimumReleaseAgeExclude` exactly.
- Treat npm/pnpm dependency updates as owned by this skill. Do not re-enable Dependabot npm/pnpm package-ecosystem jobs unless the user explicitly asks; GitHub Actions, Docker, and other non-JavaScript ecosystems may remain under Dependabot.
- Preserve version style: exact pins, ranges, `catalog:` references, `workspace:` references, and repo-specific package placement.
- Default PR scope is eligible patch and minor updates. Major upgrades, risky transitive fixes, and broad migrations get tracking issues unless the user explicitly approves doing them now.
- Prefer official migration guides, changelogs, package registry metadata, and advisory pages for decisions that affect risk.

## Inventory

Build an inventory from direct dependencies, dev dependencies, peer dependencies, optional dependencies, catalogs, overrides, lockfiles, and audit output.

Use native commands first:

```bash
npm outdated --json || true
npm audit --json || true
npm explain <package>
npm ls <package>

pnpm outdated -r --format json || true
pnpm audit --json || true
pnpm why <package> -r
```

When registry-age gates matter, use the bundled helper as a reproducible first pass:

```bash
node <skill-dir>/scripts/eligible-updates --manager auto --days 3
```

Replace `<skill-dir>` with the directory containing this `SKILL.md`. Adjust `--days` or `--minutes` to match the repo policy.

## Triage

Classify every candidate before changing files:

- Safe now: patch/minor, older than cutoff, peer-compatible, and locally validatable.
- Blocked non-major: too fresh, peer-conflicting, runtime-breaking, upstream-pinned, or requiring nontrivial code/config migration.
- Major migration: semver-major or framework/toolchain migration that needs a dedicated issue.
- Audit-only blocked: no patched version, incompatible transitive major, bundled dependency, or upstream package must move first.
- Removable: unused dependency that should be deleted instead of bumped.

Group tightly coupled packages together when separate bumps are likely to create peer, type, or runtime friction.

## Apply

- Update catalogs before workspace manifests when dependencies are shared through `catalog:`.
- In npm repos, update `package.json` and regenerate `package-lock.json` with npm. Prefer lockfile-only install when appropriate, then validate with clean install.
- In pnpm repos, regenerate `pnpm-lock.yaml` with normal pnpm install flow. Do not bypass `minimumReleaseAge`.
- Preserve package-manager script safety settings such as `engine-strict`, `ignore-scripts`, LavaMoat allow-scripts, and `only-allow`.
- Keep code/config changes minimal and only when required by the dependency update.
- If a supposedly safe update breaks validation, revert just that candidate and document why it moved to blocked work.

## Overrides

Treat overrides as temporary exceptions:

- Remove stale overrides after direct bumps when they no longer affect resolution or audit posture.
- Keep or add only targeted overrides that are compatible with the dependent package and materially improve security or toolchain behavior.
- Avoid broad overrides for transitive major jumps unless upstream compatibility is proven.
- Document every kept override with package path, advisory or compatibility reason, current resolution, target resolution, and remaining risk.

## Validation

Run the narrowest meaningful checks first, then broaden by blast radius:

- install or clean install
- audit after changes
- lint, typecheck, build, and tests
- repo-specific checks such as Docusaurus prebuild/build, Turbo filters, Prisma generate, Playwright/Storybook browsers, Docker builds, Foundry/forge, subgraph codegen/tests, or generated-doc checks

If a command cannot run, report why. If CI fails, inspect the actual logs and classify the failure as introduced by the update, exposed baseline debt, or external/non-actionable.

## Tracking

Open one draft PR for safe updates unless the user asks otherwise. Include:

- updated packages and grouped stacks
- release-age cutoff and skipped versions with publish timestamps
- audit before/after summary
- overrides removed, kept, added, or narrowed
- blocked non-major updates and remaining advisories
- major or blocked migration issue links
- validation commands and caveats

Open English `chore(deps): ...` issues for deferred major upgrades or blocked migration streams. Each issue should include official docs, current and target versions, expected code areas, migration plan, validation, rollout risk, and rollback notes.

## Stop And Ask

Pause before contract deployments, public API breakage, package-manager migration, broad refactors, invalid override trees, or CI failures that suggest a cross-cutting regression.

## Additional Resources

- For npm/package-lock repositories, read `references/npm.md`.
- For pnpm workspace/catalog/override repositories, read `references/pnpm.md`.
- For reproducible release-age inventory, run `scripts/eligible-updates`.
