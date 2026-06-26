---
name: linea-dependency-maintenance
description:
  Safely plan and execute JavaScript/TypeScript dependency maintenance across npm and pnpm repositories, including npm
  lockfiles, pnpm workspaces, catalogs, overrides, release-age policies, audits, CI validation, Dependabot boundaries,
  PRs, and GitHub tracking issues. Use whenever the user asks to update, bump, refresh, audit, clean, modernize, or
  review dependencies, reduce vulnerabilities, clean overrides, or prepare dependency PRs/issues.
metadata:
  short-description: Safe npm/pnpm dependency maintenance
---

# Dependency Maintenance

<!-- markdownlint-disable -->
<!-- vale off -->

Use this workflow to maximize safe dependency progress without changing the repository's package-manager contract or
hiding remaining risk.

## Preflight

1. Read repo instructions first: `AGENTS.md`, `CLAUDE.md`, package-specific instructions, and `CONTRIBUTING.md`.
2. Detect the package-manager contract from lockfiles, `packageManager`, CI, deploy config, and package-manager guard
   scripts:
   - npm repo: use npm, preserve `package-lock.json`, and validate with `npm ci`.
   - pnpm repo: use pnpm, preserve `pnpm-lock.yaml`, `pnpm-workspace.yaml`, catalogs, and overrides.
   - Do not introduce a different lockfile, workspace file, package-manager metadata, or install command.
3. Check branch and worktree state with `git status --short --branch`. If unrelated changes are present, use an isolated
   worktree or avoid touching those files.
4. Read `.nvmrc`, `.node-version`, `engines`, `.npmrc`, CI workflows, deploy config, and `dependabot.yml`.
5. Capture the baseline: outdated report, audit report, lockfile state, and relevant validation commands.

## Policy

- Treat release-age and cooldown rules as hard gates. Compute exact cutoff timestamps before selecting versions.
- In pnpm repos, `minimumReleaseAge` is a maturity window in minutes. Treat the configured `minimumReleaseAgeExclude`
  list as read-only: respect the existing entries, but never add or widen it to push a fresher version through — the
  maturity window is a hard gate, not a hurdle to bypass.
- Treat npm/pnpm dependency updates as owned by this skill. Do not re-enable Dependabot npm/pnpm package-ecosystem jobs
  unless the user explicitly asks; GitHub Actions, Docker, and other non-JavaScript ecosystems may remain under
  Dependabot.
- Pin exact versions (mandatory). Every npm/pnpm `dependencies`/`devDependencies` specifier must be an exact pin, never
  a `^` caret or `~` tilde range. Floating ranges silently pull unreviewed releases and widen the supply-chain attack
  surface, so a single exact version is the only safe and reproducible default. When a bump touches a manifest, also
  tighten any pre-existing `^`/`~` range on that package to an exact pin. The exception is `peerDependencies`: those
  declare the version range a consumer must satisfy (the package never installs them itself), so pinning them exact
  invents false incompatibilities — leave intentional peer ranges as ranges.
- Preserve reference style otherwise: keep `catalog:` references, `workspace:` references, and repo-specific package
  placement unchanged. Pin the concrete version at the catalog definition so consumers stay on `catalog:`.
- Default PR scope is eligible patch and minor updates. Major upgrades, risky transitive fixes, and broad migrations get
  tracking issues unless the user explicitly approves doing them now.
- Prefer official migration guides, changelogs, package registry metadata, and advisory pages for decisions that affect
  risk.

## Inventory

Build an inventory from direct dependencies, dev dependencies, peer dependencies, optional dependencies, catalogs,
overrides, lockfiles, and audit output.

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

Replace `<skill-dir>` with the directory containing this `SKILL.md`. Adjust `--days` or `--minutes` to match the repo
policy.

## Triage

Classify every candidate before changing files:

- Safe now: patch/minor, older than cutoff, peer-compatible, and locally validatable.
- Blocked non-major: too fresh, peer-conflicting, runtime-breaking, upstream-pinned, or requiring nontrivial code/config
  migration.
- Major migration: semver-major or framework/toolchain migration that needs a dedicated issue.
- Audit-only blocked: no patched version, incompatible transitive major, bundled dependency, or upstream package must
  move first.
- Removable: unused dependency that should be deleted instead of bumped.

Group tightly coupled packages together when separate bumps are likely to create peer, type, or runtime friction.

## Apply

- Update catalogs before workspace manifests when dependencies are shared through `catalog:`.
- In npm repos, update `package.json` and regenerate `package-lock.json` with npm. Prefer lockfile-only install when
  appropriate, then validate with clean install.
- In pnpm repos, regenerate `pnpm-lock.yaml` with normal pnpm install flow. Do not bypass `minimumReleaseAge`.
- Preserve package-manager script safety settings such as `engine-strict`, `ignore-scripts`, LavaMoat allow-scripts, and
  `only-allow`.
- Keep code/config changes minimal and only when required by the dependency update.
- If a supposedly safe update breaks validation, revert just that candidate and document why it moved to blocked work.

## Overrides

Treat overrides as temporary exceptions:

- Remove stale overrides after direct bumps when they no longer affect resolution or audit posture.
- Keep or add only targeted overrides that are compatible with the dependent package and materially improve security or
  toolchain behavior.
- Avoid broad overrides for transitive major jumps unless upstream compatibility is proven.
- Document every kept override with package path, advisory or compatibility reason, current resolution, target
  resolution, and remaining risk.

Refresh overrides after the direct bumps land, so you only keep exceptions that are still required. Let natural
resolution catch up first, then keep overrides only for advisories that remain. The flow is the same regardless of
package manager, but the exact commands differ, so use the ones in the matching reference file:

1. Remove the existing overrides block from the package manager's source config. For pnpm, inspect the repo first: the
   live block can be top-level `overrides` in `pnpm-workspace.yaml`, `pnpm.overrides` in `package.json`, or `resolutions`.
   For npm, use `overrides` in `package.json`. Do not edit generated lockfile override metadata by hand.
2. Reinstall so resolution settles without the overrides.
3. Apply the package manager's audit fix. For npm, run `npm audit fix` without `--force`, which stays non-major. For
   pnpm, run `pnpm audit --fix`; on pnpm 10 this can write targeted overrides pinning the patched versions, while older
   pnpm versions may require adding targeted exact overrides manually from the remaining audit output. If pnpm edits
   `minimumReleaseAge`, `minimumReleaseAgeExclude`, or related maturity-gate settings, revert those edits immediately; do
   not use audit fix to bypass the maturity gate.
4. Reinstall again so the lockfile reflects the fixed tree.

Then inspect the result — do not trust the audit fix blindly:

- Any advisory still reported needs a deliberate, documented override pinned to an exact version (Policy); anything now
  resolved should stay removed.
- An audit fix can pin a transitive dependency to a new **major**. Before keeping such an override, confirm the
  dependent package actually supports it; otherwise revert it and track the advisory as blocked (see the transitive-major
  rule in `references/pnpm.md`).
- In pnpm repos, `minimumReleaseAge` also gates overrides: pnpm refuses an exact-version override still inside the
  maturity window and can silently fall back to an older in-range version that is still vulnerable. Confirm with
  `pnpm why <pkg> -r` plus a re-audit that the intended patched version actually landed. If the only patched version is
  still inside the maturity window, treat the advisory as blocked and track it until the version matures — never widen
  `minimumReleaseAgeExclude` to force it in. If `pnpm audit --fix` adds such an exclusion, revert it; do not accept the
  silent, still-vulnerable fallback or compensate for maturity failures with config changes.
- Re-run validation, because dropping or changing overrides can shift transitive versions across the workspace.

See `references/pnpm.md` and `references/npm.md` for the per-manager commands (on pnpm 10 `pnpm audit --fix` rewrites
overrides automatically; npm never writes `overrides`, so its flow relies on `npm audit fix` without `--force` plus
manual targeted overrides).

## Validation

Run the narrowest meaningful checks first, then broaden by blast radius:

- install or clean install
- audit after changes
- lint, typecheck, build, and tests
- repo-specific checks such as Docusaurus prebuild/build, Turbo filters, Prisma generate, Playwright/Storybook browsers,
  Docker builds, Foundry/forge, subgraph codegen/tests, or generated-doc checks

If a command cannot run, report why. If CI fails, inspect the actual logs and classify the failure as introduced by the
update, exposed baseline debt, or external/non-actionable.

## Open The PR

Open the PR only after local validation is green. Opening a PR is an outward-facing action, so commit the work on a
dedicated branch, then pause and confirm with the user before pushing and creating the PR.

- Branch from the repo's base branch, stage the manifest and lockfile changes together, and commit with the repository's
  Conventional Commit format. Do not assume a universal type or scope; use the repo-approved prefix and set the
  description to `refresh dependencies`.
- Open a PR.

Open English follow-up issues for deferred major upgrades or blocked migration streams. Each issue should include
official docs, current and target versions, expected code areas, migration plan, validation, rollout risk, and rollback
notes.

## Stop And Ask

Pause before contract deployments, public API breakage, package-manager migration, broad refactors, invalid override
trees, or CI failures that suggest a cross-cutting regression.

## Additional Resources

- For npm/package-lock repositories, read `references/npm.md`.
- For pnpm workspace/catalog/override repositories, read `references/pnpm.md`.
- For reproducible release-age inventory, run `scripts/eligible-updates`.
