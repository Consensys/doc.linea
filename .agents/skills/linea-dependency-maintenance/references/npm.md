# npm Dependency Maintenance

<!-- markdownlint-disable -->
<!-- vale off -->

Use these notes only for npm repositories with `package-lock.json`, npm CI, or npm-based hosting/deploy detection.

## Rules

- Keep npm as the only package manager unless the user explicitly asks for a migration.
- Do not commit `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `yarn.lock`, or `packageManager` changes to an npm repo just to
  inspect dependencies.
- Pin exact versions (mandatory): in `dependencies`/`devDependencies` write a single exact version, never a `^` or `~`
  range, and tighten any pre-existing range you touch to an exact pin. Floating ranges pull unreviewed releases and
  widen the supply-chain attack surface. Leave intentional `peerDependencies` ranges as ranges — peers declare a
  compatibility window, not an install target.
- Do not rely on `npm audit fix --force` for dependency-refresh PRs because it can apply semver-major changes or obscure
  why the tree changed.

## Baseline

```bash
node --version
npm --version
npm outdated --json || true
npm audit --json > /tmp/npm-audit-before.json || true
```

Inspect `engines.node`, `.nvmrc`, Vercel/Docusaurus config, GitHub Actions, and existing `overrides`.

## Update Flow

1. Select eligible patch/minor direct dependencies using registry publish times.
2. Inspect peer-sensitive updates before editing:
   ```bash
   npm view <package>@<target> peerDependencies --json
   npm view <package>@<target> peerDependenciesMeta --json
   ```
3. Update `package.json` and regenerate the lockfile:
   ```bash
   npm install --package-lock-only
   ```
4. Validate the resulting tree:
   ```bash
   npm ls --all --depth=0
   npm ci
   ```

## Overrides

- Use package-manager-native `overrides` in `package.json`.
- Confirm paths with `npm explain <package>` or `npm ls <package>`.
- Prefer parent-scoped overrides when a broad override creates invalid peer/range errors.
- If the tree becomes invalid, remove the override and document the advisory as blocked.
- Refresh the overrides block after direct bumps so you only keep exceptions still required. Unlike pnpm, `npm audit fix`
  does not write `overrides`, so re-adding them is a manual, deliberate step:
  ```bash
  # 1. Remove the existing overrides block from package.json.
  # 2. Let resolution settle without the overrides.
  npm install
  # 3. Apply only non-major fixes (never --force, which can pull semver-major changes).
  npm audit fix
  # 4. Reinstall so the lockfile reflects the fixed tree.
  npm install
  # 5. Inspect what remains.
  npm audit --json || true
  ```
  Re-add a targeted, exact-pinned override only for each advisory still reported, then validate with `npm ci` since
  changing overrides can shift transitive versions.

## Common Validation

Documentation and Docusaurus repos usually need:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --json > /tmp/npm-audit-after.json || true
```

If build/prebuild scripts mutate generated docs, images, or metadata unrelated to dependency maintenance, restore those
unrelated files before staging.
