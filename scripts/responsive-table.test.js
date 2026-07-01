const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");

function readRepoFile(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("MDX table component wraps tables in the responsive table container", () => {
  const source = readRepoFile("src/theme/MDXComponents/index.js");

  assert.match(source, /@theme-original\/MDXComponents/);
  assert.match(source, /className="linea-table-wrapper"/);
  assert.match(source, /table:\s*ResponsiveTable/);
});

test("table CSS keeps native table layout and moves overflow to the wrapper", () => {
  const baseCss = readRepoFile("src/css/base.css");
  const wrapperRule = baseCss.match(/\.linea-table-wrapper\s*\{[^}]+\}/s)?.[0];
  const tableRule = baseCss.match(
    /\.linea-table-wrapper\s*>\s*table\s*\{[^}]+\}/s,
  )?.[0];
  const cellRule = baseCss.match(
    /\.linea-table-wrapper\s*>\s*table\s+thead\s+th,\s*\.linea-table-wrapper\s*>\s*table\s+tbody\s+td\s*\{[^}]+\}/s,
  )?.[0];

  assert.ok(wrapperRule, "expected a .linea-table-wrapper rule");
  assert.match(wrapperRule, /overflow-x:\s*auto/);
  assert.match(wrapperRule, /-webkit-overflow-scrolling:\s*touch/);

  assert.ok(tableRule, "expected tables inside the wrapper to be styled");
  assert.match(tableRule, /display:\s*table/);
  assert.match(tableRule, /width:\s*100%/);
  assert.match(tableRule, /min-width:\s*100%/);
  assert.doesNotMatch(tableRule, /width:\s*max-content/);
  assert.doesNotMatch(tableRule, /overflow-x:\s*auto/);

  assert.ok(cellRule, "expected responsive cell sizing to be scoped");
  assert.match(cellRule, /min-width:\s*min\(12rem,\s*45vw\)/);
  assert.match(cellRule, /max-width:\s*min\(32rem,\s*85vw\)/);
  assert.doesNotMatch(baseCss, /table\s+thead\s+th,\s*table\s+tbody\s+td\s*\{/);
});

test("table scrollbar styling targets the responsive wrapper", () => {
  const overridesCss = readRepoFile("src/css/docusaurus-overrides.css");

  assert.match(overridesCss, /\.linea-table-wrapper::-webkit-scrollbar/);
  assert.doesNotMatch(overridesCss, /table::-webkit-scrollbar/);
});

test("client module wraps raw MDX table elements that bypass MDXComponents", () => {
  const config = readRepoFile("docusaurus.config.js");
  const source = readRepoFile("src/clientModules/responsiveTables.js");

  assert.match(config, /responsiveTables\.js/);
  assert.match(source, /\.theme-doc-markdown table/);
  assert.match(source, /\.redoc-markdown table/);
  assert.match(source, /className\s*=\s*"linea-table-wrapper"/);
  assert.match(source, /onRouteDidUpdate/);
});
