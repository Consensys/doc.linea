const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const {
  checkAgentDocs,
  generateAgentDocs,
  getMarkdownPathForRoute,
} = require("./lib");

function writeFile(root, filePath, content) {
  const target = path.join(root, filePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "linea-agent-docs-"));

  writeFile(
    root,
    "build/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://docs.linea.build/</loc></url>
  <url><loc>https://docs.linea.build/network/quickstart</loc></url>
  <url><loc>https://docs.linea.build/api/token-api/reference</loc></url>
  <url><loc>https://docs.linea.build/api/linea-smart-contracts/messageservice/l1/l1messagemanager</loc></url>
  <url><loc>https://docs.linea.build/search</loc></url>
</urlset>`,
  );

  writeFile(
    root,
    "build/index.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
      <link rel="alternate" type="text/markdown" href="/index.md">
    </head><body>
      <nav>Navigation that agents should not receive</nav>
      <main><article><h1>Linea Docs</h1><p>Homepage body.</p></article></main>
      <footer>Footer that agents should not receive</footer>
    </body></html>`,
  );

  writeFile(
    root,
    "build/network/quickstart.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
      <link rel="alternate" type="text/markdown" href="/network/quickstart.md">
    </head><body>
      <aside>Sidebar that agents should not receive</aside>
      <main><article>
        <div data-markdown-ignore>Page chrome that agents should not receive</div>
        <h1>Get started</h1>
        <p>Build on Linea.</p>
        <h2>1. Configure a node</h2>
        <p>_Legitimate underscore-led content should stay.</p>
        <p><code>field</code>: <em>[required]</em> Required field with OPERATOR_ROLE and 31000-31003.</p>
        <pre><code class="language-bash">
          <div class="token-line"><span>npm install</span><br></div>
          <div class="token-line"><span>npm test</span><br></div>
        </code></pre>
        <ol>
          <li>
            <p>Add a config file.</p>
            <pre><code class="language-js">const config = {
  url: \`https://rpc.linea.build/\`,
  matcher: /\\[a-z\\._-]+/,
};</code></pre>
          </li>
        </ol>
        <pre><code class="language-tsx">&lt;h1&gt;Example heading&lt;/h1&gt;</code></pre>
        <pre tabindex="0" class="prism-code language-tsx"><code class="codeBlockLines">
          <div class="token-line"><span class="token tag punctuation">&lt;</span><span class="token tag class-name">Web3AuthProvider</span><span class="token tag punctuation">&gt;</span><br></div>
          <div class="token-line"><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">Web3AuthProvider</span><span class="token tag punctuation">&gt;</span><br></div>
        </code></pre>
        <div><p>Was this page helpful?</p><button>Yes</button><button>No</button></div>
      </article></main>
    </body></html>`,
  );

  writeFile(
    root,
    "build/api/token-api/reference.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
      <link rel="alternate" type="text/markdown" href="/api/token-api/reference.md">
    </head><body>
      <div class="menu-content">Redoc navigation that agents should not receive</div>
      <div class="api-content">
        <h1>Linea Token API</h1>
        <p>Token API reference body.</p>
        <div aria-hidden="true"><span>https://token-api.linea.build</span>/tokens</div>
        <table>
          <tbody>
            <tr>
              <td title="page"><span class="property-name">page</span></td>
              <td>
                <div><span>number</span><span>[ 1 .. 1000 ]</span></div>
                <div><span>Default:</span><span>1</span></div>
                <div><p>Page number</p></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="redoc-json"><code>{"logo": "<a href="https://example.com/logo.png">https://example.com/logo.png</a>"}</code></div>
      </div>
    </body></html>`,
  );

  writeFile(
    root,
    "build/search.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
    </head><body>
      <main><h1>Search</h1></main>
    </body></html>`,
  );

  writeFile(
    root,
    "build/404.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
    </head><body>
      <main><h1>Page Not Found</h1></main>
    </body></html>`,
  );

  writeFile(
    root,
    "build/api/linea-smart-contracts/messageservice/l1/l1messagemanager.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
      <link rel="alternate" type="text/markdown" href="/api/linea-smart-contracts/messageservice/l1/l1messagemanager.md">
    </head><body>
      <main><article>
        <h1>L1MessageManager</h1>
        <p>_Generated contract doc emphasis artifact.</p>
        <p>Contract docs body.</p>
      </article></main>
    </body></html>`,
  );

  writeFile(
    root,
    ".docusaurus/docusaurus-plugin-content-docs/default/site-docs-network-quickstart-index-mdx.json",
    JSON.stringify({
      title: "Get started",
      description: "Get started building on Linea.",
      permalink: "/network/quickstart/",
      source: "@site/docs/network/quickstart/index.mdx",
    }),
  );

  writeFile(
    root,
    "static/llms.txt",
    `# Linea Documentation

> Existing editorial introduction.

## Authoritative scope
- Public docs for Linea.

## Old links
- [Old HTML link](https://docs.linea.build/network/quickstart)
`,
  );

  return root;
}

test("maps routes to clean .md artifact paths", () => {
  assert.equal(getMarkdownPathForRoute("/"), "index.md");
  assert.equal(
    getMarkdownPathForRoute("/network/quickstart"),
    "network/quickstart.md",
  );
  assert.equal(
    getMarkdownPathForRoute("/network/quickstart/"),
    "network/quickstart.md",
  );
});

test("generates markdown variants and a complete markdown-linked llms.txt", () => {
  const root = createFixture();

  const result = generateAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });

  assert.deepEqual(result.routes.sort(), [
    "/",
    "/api/linea-smart-contracts/messageservice/l1/l1messagemanager",
    "/api/token-api/reference",
    "/network/quickstart",
  ]);

  const pageMarkdown = fs.readFileSync(
    path.join(root, "build/network/quickstart.md"),
    "utf8",
  );
  assert.match(pageMarkdown, /^# Get started/m);
  assert.match(
    pageMarkdown,
    /^> For the complete Linea documentation index.+\n> Agents can fetch this page as Markdown/m,
  );
  assert.match(pageMarkdown, /Build on Linea\./);
  assert.match(pageMarkdown, /## Section 1\. Configure a node/);
  assert.match(
    pageMarkdown,
    /`field`: _\[required\]_ Required field with OPERATOR_ROLE and 31000-31003\./,
  );
  assert.match(
    pageMarkdown,
    /_Legitimate underscore-led content should stay\./,
  );
  assert.match(pageMarkdown, /```bash\nnpm install\nnpm test\n```/);
  assert.match(
    pageMarkdown,
    /```js\nconst config = \{\n  url: `https:\/\/rpc\.linea\.build\/`,\n  matcher: \/\\\[a-z\\\._-]\+\/,\n\};\n```/,
  );
  assert.doesNotMatch(pageMarkdown, /Sidebar that agents should not receive/);
  assert.doesNotMatch(
    pageMarkdown,
    /Page chrome that agents should not receive/,
  );
  assert.match(pageMarkdown, /```tsx\n<h1>Example heading<\/h1>\n```/);
  assert.match(
    pageMarkdown,
    /```tsx\n<Web3AuthProvider>\n<\/Web3AuthProvider>\n```/,
  );
  assert.doesNotMatch(pageMarkdown, /Was this page helpful/);

  const contractMarkdown = fs.readFileSync(
    path.join(
      root,
      "build/api/linea-smart-contracts/messageservice/l1/l1messagemanager.md",
    ),
    "utf8",
  );
  assert.match(contractMarkdown, /Contract docs body\./);
  assert.doesNotMatch(
    contractMarkdown,
    /Generated contract doc emphasis artifact/,
  );

  const redocMarkdown = fs.readFileSync(
    path.join(root, "build/api/token-api/reference.md"),
    "utf8",
  );
  assert.match(redocMarkdown, /Token API reference body/);
  assert.match(
    redocMarkdown,
    /- page: number \[ 1 \.\. 1000 \] Default: 1 Page number/,
  );
  assert.match(redocMarkdown, /https:\/\/token-api\.linea\.build\/tokens/);
  assert.match(
    redocMarkdown,
    /```json\n\{"logo": "https:\/\/example\.com\/logo\.png"\}\n```/,
  );
  assert.doesNotMatch(redocMarkdown, /<table/);
  assert.doesNotMatch(redocMarkdown, /Redoc navigation/);
  const quickstartHtml = fs.readFileSync(
    path.join(root, "build/network/quickstart.html"),
    "utf8",
  );
  assert.doesNotMatch(quickstartHtml, /<pre data-markdown-ignore/);
  assert.match(
    quickstartHtml,
    /_Legitimate underscore-led content should stay\./,
  );
  assert.match(
    fs.readFileSync(
      path.join(
        root,
        "build/api/linea-smart-contracts/messageservice/l1/l1messagemanager.html",
      ),
      "utf8",
    ),
    /<p data-markdown-ignore="">_Generated contract doc emphasis artifact\.<\/p>/,
  );
  assert.match(
    fs.readFileSync(
      path.join(root, "build/api/token-api/reference.html"),
      "utf8",
    ),
    /class="menu-content" data-markdown-ignore/,
  );

  const llms = fs.readFileSync(path.join(root, "build/llms.txt"), "utf8");
  assert.match(llms, /Existing editorial introduction/);
  assert.match(
    llms,
    /\[Get started\]\(https:\/\/docs\.linea\.build\/network\/quickstart\.md\)/,
  );
  assert.doesNotMatch(llms, /Old HTML link/);
  assert.doesNotMatch(llms, /https:\/\/docs\.linea\.build\/search\.md/);
});

test("checks llms.txt coverage, markdown links, and page directives", () => {
  const root = createFixture();
  generateAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });

  const report = checkAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });

  assert.equal(report.ok, true);
  assert.equal(report.failures.length, 0);
  assert.equal(report.coveredRoutes, 4);
  assert.equal(report.totalRoutes, 4);
});

test("generates markdown for built pages with alternates outside the sitemap", () => {
  const root = createFixture();
  writeFile(
    root,
    "build/network/unlisted.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/plain" href="/llms.txt">
      <link rel="alternate" type="text/markdown" href="/network/unlisted.md">
    </head><body>
      <main><article><h1>Unlisted page</h1><p>Unlisted body.</p></article></main>
    </body></html>`,
  );

  const result = generateAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });

  assert(result.routes.includes("/network/unlisted"));
  assert.match(
    fs.readFileSync(path.join(root, "build/network/unlisted.md"), "utf8"),
    /Unlisted body\./,
  );

  const llms = fs.readFileSync(path.join(root, "build/llms.txt"), "utf8");
  assert.doesNotMatch(llms, /network\/unlisted\.md/);

  const report = checkAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });
  assert.equal(report.ok, true);
});

test("fails when a built page advertises a missing markdown alternate", () => {
  const root = createFixture();
  generateAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });
  writeFile(
    root,
    "build/search.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/markdown" href="/search.md">
    </head><body><main><h1>Search</h1></main></body></html>`,
  );

  const report = checkAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });

  assert.equal(report.ok, false);
  assert.deepEqual(report.failures, [
    "/search has Markdown alternate without generated file: /search.md",
  ]);
});

test("fails when the built 404 page advertises a missing markdown alternate", () => {
  const root = createFixture();
  generateAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });
  writeFile(
    root,
    "build/404.html",
    `<!doctype html><html><head>
      <link rel="alternate" type="text/markdown" href="/404.md">
    </head><body><main><h1>Page Not Found</h1></main></body></html>`,
  );

  const report = checkAgentDocs({
    siteDir: root,
    buildDir: path.join(root, "build"),
    baseUrl: "https://docs.linea.build",
  });

  assert.equal(report.ok, false);
  assert.deepEqual(report.failures, [
    "/404 has Markdown alternate without generated file: /404.md",
  ]);
});
