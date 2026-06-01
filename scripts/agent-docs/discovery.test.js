const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "../..");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, filePath), "utf8"));
}

function getHeaderConfig(source) {
  const vercel = readJson("vercel.json");
  return vercel.headers.find((header) => header.source === source);
}

function getRouteConfig(source) {
  const vercel = readJson("vercel.json");
  return vercel.routes.find((route) => route.src === source);
}

function getHeaderValue(source, key) {
  const headerConfig = getHeaderConfig(source);
  assert.ok(headerConfig, `${source} header config is missing`);
  const header = headerConfig.headers.find((item) => item.key === key);
  assert.ok(header, `${source} is missing ${key}`);
  return header.value;
}

test("api catalog is a valid linkset for public Linea APIs", () => {
  const catalog = readJson("static/.well-known/api-catalog");
  assert.ok(Array.isArray(catalog.linkset), "catalog.linkset must be an array");

  const entriesByAnchor = new Map(
    catalog.linkset.map((entry) => [entry.anchor, entry]),
  );

  for (const anchor of [
    "https://rpc.linea.build/",
    "https://rpc.sepolia.linea.build/",
    "https://token-api.linea.build/tokens",
  ]) {
    const entry = entriesByAnchor.get(anchor);
    assert.ok(entry, `${anchor} is missing from the API catalog`);
    assert.ok(
      Array.isArray(entry["service-doc"]) && entry["service-doc"].length > 0,
      `${anchor} must include at least one service-doc link`,
    );
    assert.ok(
      Array.isArray(entry.status) && entry.status.length > 0,
      `${anchor} must include a status link`,
    );
  }

  const tokenApi = entriesByAnchor.get("https://token-api.linea.build/tokens");
  assert.deepEqual(tokenApi["service-desc"], [
    {
      href: "https://token-api.linea.build/docs-yaml",
      type: "text/yaml",
    },
  ]);
});

test("vercel advertises agent discovery resources with Link headers", () => {
  const homepageLink = getHeaderValue("/", "Link");
  assert.match(homepageLink, /<[^>]*api-catalog>/);
  assert.match(homepageLink, /rel="api-catalog"/);
  assert.ok(homepageLink.includes('type="application/linkset+json"'));
  assert.match(homepageLink, /<[^>]*llms\.txt>/);
  assert.ok(homepageLink.includes('type="text/plain"'));

  const catalogContentType = getHeaderValue(
    "/.well-known/api-catalog",
    "Content-Type",
  );
  assert.equal(
    catalogContentType,
    'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  );

  const catalogLink = getHeaderValue("/.well-known/api-catalog", "Link");
  assert.match(catalogLink, /<[^>]*api-catalog>/);
  assert.match(catalogLink, /rel="api-catalog"/);

  const homepageMarkdownRoute = getRouteConfig("^/$");
  assert.ok(homepageMarkdownRoute, "homepage Markdown route is missing");
  assert.match(homepageMarkdownRoute.headers.Link, /<[^>]*api-catalog>/);
  assert.match(homepageMarkdownRoute.headers.Link, /<[^>]*llms\.txt>/);
});

test("markdown negotiation does not rewrite well-known discovery endpoints", () => {
  const vercel = readJson("vercel.json");
  const markdownRoute = vercel.routes.find((route) => route.dest === "/$1.md");
  assert.ok(markdownRoute, "Markdown negotiation route is missing");

  const markdownRoutePattern = new RegExp(markdownRoute.src);
  assert.equal(
    markdownRoutePattern.test("/network/overview/public-data"),
    true,
  );
  assert.equal(markdownRoutePattern.test("/.well-known/api-catalog"), false);
});
