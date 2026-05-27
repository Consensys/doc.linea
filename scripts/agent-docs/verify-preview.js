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

async function main() {
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
