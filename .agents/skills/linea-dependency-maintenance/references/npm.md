# npm Dependency Maintenance

Use these notes only for npm repositories with `package-lock.json`, npm CI, or npm-based hosting/deploy detection.

## Rules

- Keep npm as the only package manager unless the user explicitly asks for a migration.
- Do not commit `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `yarn.lock`, or `packageManager` changes to an npm repo just to inspect dependencies.
- Preserve existing version specifier style. Exact pins stay exact; intentional ranges stay ranges.
- Do not rely on `npm audit fix --force` for dependency-refresh PRs because it can apply semver-major changes or obscure why the tree changed.

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

## Common Validation

Documentation and Docusaurus repos usually need:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --json > /tmp/npm-audit-after.json || true
```

If build/prebuild scripts mutate generated docs, images, or metadata unrelated to dependency maintenance, restore those unrelated files before staging.
