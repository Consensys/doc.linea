const process = require("node:process");

const previewUrl = process.argv[2] || process.env.AGENT_DOCS_PREVIEW_URL;

if (!previewUrl) {
  console.error(
    "Usage: node scripts/agent-docs/verify-preview.js <preview-url>",
  );
  process.exit(1);
}

const baseUrl = new URL(previewUrl);
const EXPECTED_NEGOTIATED_MARKDOWN_HEADERS = new Map([
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "SAMEORIGIN"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["permissions-policy", "camera=(), microphone=(), geolocation=()"],
]);
const EXPECTED_API_CATALOG_ANCHORS = [
  "https://rpc.linea.build/",
  "https://rpc.sepolia.linea.build/",
  "https://token-api.linea.build/tokens",
];

function buildUrl(pathname) {
  return new URL(pathname, baseUrl).toString();
}

async function fetchText(pathname, options) {
  const response = await fetch(buildUrl(pathname), options);
  const text = await response.text();

  return {
    contentType: response.headers.get("content-type") || "",
    headers: response.headers,
    ok: response.ok,
    status: response.status,
    text,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertMarkdownResponse(label, result) {
  assert(result.ok, `${label} returned HTTP ${result.status}`);
  assert(
    result.contentType.includes("text/markdown"),
    `${label} returned ${result.contentType || "no content-type"}`,
  );
  assert(
    !/^\s*<!doctype html/i.test(result.text),
    `${label} returned HTML instead of Markdown`,
  );
  assert(
    /For the complete Linea documentation index/.test(result.text),
    `${label} is missing the agent docs directive`,
  );
}

function assertExpectedHeaders(label, result, expectedHeaders) {
  for (const [headerName, expectedValue] of expectedHeaders) {
    const actualValue = result.headers.get(headerName) || "";
    assert(
      actualValue === expectedValue,
      `${label} returned ${headerName}: ${actualValue || "missing"}; expected ${expectedValue}`,
    );
  }
}

function assertApiCatalog(label, result) {
  assert(result.ok, `${label} returned HTTP ${result.status}`);
  assert(
    result.contentType.includes("application/linkset+json"),
    `${label} returned ${result.contentType || "no content-type"}`,
  );

  let catalog;
  try {
    catalog = JSON.parse(result.text);
  } catch (error) {
    throw new Error(`${label} returned invalid JSON: ${error.message}`);
  }

  assert(Array.isArray(catalog.linkset), `${label} is missing linkset[]`);
  const anchors = new Set(catalog.linkset.map((entry) => entry.anchor));
  for (const anchor of EXPECTED_API_CATALOG_ANCHORS) {
    assert(anchors.has(anchor), `${label} is missing ${anchor}`);
  }
}

async function main() {
  const homepage = await fetchText("/");
  assert(homepage.ok, `/ returned HTTP ${homepage.status}`);
  const homepageLink = homepage.headers.get("link") || "";
  assert(
    homepageLink.includes('rel="api-catalog"') &&
      homepageLink.includes("/.well-known/api-catalog"),
    "/ is missing the API catalog Link header",
  );
  assert(
    homepageLink.includes("/llms.txt"),
    "/ is missing the llms.txt Link header",
  );

  const apiCatalog = await fetchText("/.well-known/api-catalog");
  assertApiCatalog("API catalog", apiCatalog);

  const apiCatalogViaAccept = await fetchText("/.well-known/api-catalog", {
    headers: { Accept: "text/markdown" },
  });
  assertApiCatalog("Accept: text/markdown API catalog", apiCatalogViaAccept);

  const apiCatalogHead = await fetchText("/.well-known/api-catalog", {
    method: "HEAD",
  });
  assert(
    apiCatalogHead.ok,
    `HEAD API catalog returned HTTP ${apiCatalogHead.status}`,
  );
  assert(
    (apiCatalogHead.headers.get("link") || "").includes('rel="api-catalog"'),
    "HEAD API catalog is missing the API catalog Link header",
  );

  const publicDataViaAccept = await fetchText("/network/overview/public-data", {
    headers: { Accept: "text/markdown" },
  });
  assertMarkdownResponse(
    "Accept: text/markdown public-data route",
    publicDataViaAccept,
  );
  assertExpectedHeaders(
    "Accept: text/markdown public-data route",
    publicDataViaAccept,
    EXPECTED_NEGOTIATED_MARKDOWN_HEADERS,
  );
  assert(
    /^#\s+Public data/m.test(publicDataViaAccept.text),
    "Accept: text/markdown public-data route is missing the page heading",
  );

  const publicDataDirect = await fetchText("/network/overview/public-data.md");
  assertMarkdownResponse("Direct public-data .md route", publicDataDirect);

  const searchPage = await fetchText("/search");
  assert(searchPage.ok, `/search returned HTTP ${searchPage.status}`);
  assert(
    !/href=["']\/search\.md["']/.test(searchPage.text),
    "/search advertises a missing /search.md alternate",
  );

  const searchViaAccept = await fetchText("/search", {
    headers: { Accept: "text/markdown" },
  });
  assert(
    searchViaAccept.ok,
    `Accept: text/markdown search route returned HTTP ${searchViaAccept.status}`,
  );
  assert(
    searchViaAccept.contentType.includes("text/html"),
    `Accept: text/markdown search route returned ${searchViaAccept.contentType || "no content-type"}`,
  );

  const notFoundViaAccept = await fetchText("/404", {
    headers: { Accept: "text/markdown" },
  });
  assert(
    !notFoundViaAccept.contentType.includes("text/markdown"),
    "Accept: text/markdown /404 route returned a Markdown response",
  );

  const missingPage = await fetchText("/this-route-does-not-exist-for-agents");
  assert(
    !/href=["']\/404\.md["']/.test(missingPage.text),
    "unknown routes advertise a missing /404.md alternate",
  );

  const appMarkdown = await fetchText("/network/build/launch-an-app/app.md");
  assertMarkdownResponse("Launch-an-app .md route", appMarkdown);
  for (const expected of [
    "components/provider.tsx",
    "Web3AuthProvider",
    "app/layout.tsx",
    "ConnectWallet.tsx",
    "useWeb3AuthConnect",
  ]) {
    assert(
      appMarkdown.text.includes(expected),
      `Launch-an-app .md route is missing ${expected}`,
    );
  }

  console.log(`Agent docs preview checks passed for ${baseUrl.origin}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
