const fs = require("node:fs");
const path = require("node:path");

const cheerio = require("cheerio");
const { XMLParser } = require("fast-xml-parser");
const TurndownService = require("turndown");
const { gfm } = require("turndown-plugin-gfm");

const DEFAULT_BASE_URL = "https://docs.linea.build";
const MAX_LLMS_CHARS = 100000;
const LLMS_WARNING_CHARS = Math.floor(MAX_LLMS_CHARS * 0.8);
const SKIPPED_ROUTES = new Set(["/search"]);

const GROUPS = [
  { title: "Start here", test: (route) => route === "/" },
  { title: "Network", test: (route) => route.startsWith("/network/") },
  { title: "Protocol", test: (route) => route.startsWith("/protocol/") },
  { title: "Stack", test: (route) => route.startsWith("/stack/") },
  { title: "API reference", test: (route) => route.startsWith("/api/") },
  {
    title: "Changelog and risk",
    test: (route) => route.startsWith("/changelog/"),
  },
  { title: "Other documentation", test: () => true },
];

function normalizeRoute(route) {
  if (!route || route === "/") return "/";
  const withSlash = route.startsWith("/") ? route : `/${route}`;
  return withSlash.replace(/\/+$/, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMarkdownPathForRoute(route) {
  const normalized = normalizeRoute(route);
  if (normalized === "/") return "index.md";
  return `${normalized.slice(1)}.md`;
}

function getMarkdownUrlForRoute(route, baseUrl = DEFAULT_BASE_URL) {
  return new URL(getMarkdownPathForRoute(route), `${baseUrl}/`).toString();
}

function getHtmlPathCandidates(route) {
  const normalized = normalizeRoute(route);
  if (normalized === "/") return ["index.html"];

  const withoutLeadingSlash = normalized.slice(1);
  return [
    `${withoutLeadingSlash}.html`,
    path.join(withoutLeadingSlash, "index.html"),
  ];
}

function findHtmlPath(buildDir, route) {
  for (const candidate of getHtmlPathCandidates(route)) {
    const fullPath = path.join(buildDir, candidate);
    if (fs.existsSync(fullPath)) return fullPath;
  }
  return null;
}

function readSitemapRoutes({
  buildDir,
  baseUrl = DEFAULT_BASE_URL,
  includeSkipped = false,
}) {
  const sitemapPath = path.join(buildDir, "sitemap.xml");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(sitemap);
  const urls = parsed.urlset?.url ?? [];
  const urlEntries = Array.isArray(urls) ? urls : [urls];
  const base = new URL(baseUrl);

  return urlEntries
    .map((entry) => entry.loc)
    .filter(Boolean)
    .map((loc) => new URL(loc))
    .filter((url) => url.origin === base.origin)
    .map((url) => normalizeRoute(url.pathname))
    .filter((route) => includeSkipped || !SKIPPED_ROUTES.has(route));
}

function readDocsMetadata(siteDir) {
  const metadataDir = path.join(
    siteDir,
    ".docusaurus/docusaurus-plugin-content-docs/default",
  );

  if (!fs.existsSync(metadataDir)) return new Map();

  const metadata = new Map();
  for (const fileName of fs.readdirSync(metadataDir)) {
    if (!fileName.startsWith("site-docs-") || !fileName.endsWith(".json")) {
      continue;
    }

    const fullPath = path.join(metadataDir, fileName);
    const doc = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    if (!doc.permalink) continue;

    metadata.set(normalizeRoute(doc.permalink), {
      title: doc.title,
      description: doc.description,
      source: doc.source,
    });
  }

  return metadata;
}

function createTurndownService() {
  const turndown = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    headingStyle: "atx",
  });

  turndown.use(gfm);

  function getCodeText(code) {
    const tokenLines = Array.from(code.querySelectorAll(".token-line"));
    if (tokenLines.length) {
      return tokenLines.map((line) => line.textContent).join("\n");
    }

    return code.textContent;
  }

  turndown.addRule("fencedCodeBlockWithLanguage", {
    filter(node) {
      return (
        node.nodeName === "PRE" &&
        node.firstChild &&
        node.firstChild.nodeName === "CODE"
      );
    },
    replacement(content, node) {
      void content;
      const code = node.firstChild;
      const className = code.getAttribute("class") || "";
      const languageMatch = className.match(/language-([A-Za-z0-9_+-]+)/);
      const language = languageMatch ? languageMatch[1] : "";
      const text = getCodeText(code).replace(/\n+$/, "");
      return `\n\n\`\`\`${language}\n${text}\n\`\`\`\n\n`;
    },
  });

  return turndown;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getReadableText($, element) {
  const clone = $(element).clone();

  clone.find("script, style, button, svg").remove();
  clone.find("br").replaceWith("\n");
  clone
    .find("p, div, li, tr, td, th, span, strong, em, code")
    .each(function addWordBoundaries() {
      $(this).prepend(" ");
      $(this).append(" ");
    });

  return clone
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getCompactText($, element) {
  const clone = $(element).clone();

  clone.find("script, style, button, svg").remove();

  return clone
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function prepareRedocForMarkdown($) {
  $(".api-content [aria-hidden='true']").each(function exposeRequestUrl() {
    const text = getReadableText($, this).replace(/\s+(\/[^\s]+)/g, "$1");
    if (/^https?:\/\/[^\s]+\/[^\s]+/.test(text)) {
      $(this).replaceWith(`<p>${escapeHtml(text)}</p>`);
    }
  });

  $(".api-content .redoc-json").each(function replaceJsonSample() {
    const code = $(this).find("code").first();
    const text = getCompactText($, code.length ? code : this);
    if (text) {
      $(this).replaceWith(
        `<pre><code class="language-json">${escapeHtml(text)}</code></pre>`,
      );
    }
  });

  $(".api-content table").each(function replaceParameterTable() {
    const rows = [];

    $(this)
      .find("tr")
      .each(function readRow() {
        const cells = $(this)
          .children("th, td")
          .map((index, cell) => {
            void index;
            return getReadableText($, cell);
          })
          .get()
          .filter(Boolean);

        if (cells.length === 1) {
          rows.push(cells[0]);
        } else if (cells.length > 1) {
          rows.push(`- ${cells[0]}: ${cells.slice(1).join("; ")}`);
        }
      });

    if (rows.length) {
      $(this).replaceWith(
        `<div>${rows.map((row) => `<p>${escapeHtml(row)}</p>`).join("")}</div>`,
      );
    }
  });
}

// Markdown extraction has two chrome-removal layers: source components can mark
// UI-only wrappers with data-markdown-ignore, and these selectors cover
// third-party or generated DOM that cannot be annotated in React.
function removeChrome($) {
  $(
    [
      "[data-markdown-ignore]",
      "script",
      "style",
      "noscript",
      "nav",
      "footer",
      "aside",
      "button",
      ".navbar",
      ".breadcrumbs",
      ".theme-doc-sidebar-container",
      ".theme-doc-toc-desktop",
      ".theme-doc-footer",
      ".theme-edit-this-page",
      ".pagination-nav",
      ".tocCollapsible",
      ".hash-link",
      "[aria-hidden='true']",
    ].join(","),
  ).remove();

  $("p")
    .filter(function isFeedbackPrompt() {
      return $(this).text().trim() === "Was this page helpful?";
    })
    .each(function removeFeedbackWidget() {
      $(this).parent().remove();
    });
}

function outdentFencedCodeBlocks(markdown) {
  const lines = markdown.split("\n");
  let fenceIndent = null;

  return lines
    .map((line) => {
      const openingFence = line.match(/^(\s*)```/);

      if (fenceIndent === null && openingFence) {
        fenceIndent = openingFence[1];
        return line.slice(fenceIndent.length);
      }

      if (fenceIndent !== null) {
        const outdented = line.startsWith(fenceIndent)
          ? line.slice(fenceIndent.length)
          : line;

        if (/^```/.test(outdented)) {
          fenceIndent = null;
        }

        return outdented;
      }

      return line;
    })
    .join("\n");
}

function replaceOutsideFencedCodeBlocks(markdown, pattern, replacement) {
  const lines = markdown.split("\n");
  let inFence = false;

  return lines
    .map((line) => {
      if (/^```/.test(line)) {
        inFence = !inFence;
        return line;
      }

      if (inFence) return line;

      return line.replace(pattern, replacement);
    })
    .join("\n");
}

function normalizeMarkdown(markdown) {
  return replaceOutsideFencedCodeBlocks(
    outdentFencedCodeBlocks(markdown).replace(/\u00a0/g, " "),
    /\\([\[\]_.-])/g,
    "$1",
  )
    .replace(/^(#{1,6})\s+(\d+\.\s+)/gm, "$1 Section $2")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getTitleFromArticle($, fallback) {
  const h1 = $("article h1, main h1, h1").first().text().trim();
  return h1 || fallback || "Linea documentation";
}

function getContentRoot($) {
  const article = $("article").first();
  if (article.length) return article;

  const main = $("main").first();
  if (main.length) return main;

  const redocApiContent = $(".api-content").first();
  if (redocApiContent.length) return redocApiContent;

  return $("body").first();
}

function htmlToMarkdown({ html, route, metadata, baseUrl = DEFAULT_BASE_URL }) {
  const $ = cheerio.load(html);
  prepareRedocForMarkdown($);
  removeChrome($);

  const title = getTitleFromArticle($, metadata?.title);
  const contentRoot = getContentRoot($);
  const source = contentRoot.length ? contentRoot.html() : $("body").html();
  const turndown = createTurndownService();
  let markdown = normalizeMarkdown(turndown.turndown(source || ""));

  if (!new RegExp(`^#\\s+${escapeRegExp(title)}\\s*$`, "m").test(markdown)) {
    markdown = `# ${title}\n\n${markdown}`;
  }

  const canonical = new URL(
    route === "/" ? "/" : route,
    `${baseUrl}/`,
  ).toString();
  const markdownUrl = getMarkdownUrlForRoute(route, baseUrl);
  const directive = [
    `> For the complete Linea documentation index, see [llms.txt](/llms.txt).`,
    `> Agents can fetch this page as Markdown at [${markdownUrl}](${markdownUrl}).`,
  ].join("\n");

  return normalizeMarkdown(
    [`<!-- Canonical: ${canonical} -->`, directive, markdown, ""].join("\n\n"),
  );
}

function addMarkdownIgnoreAttributes(html) {
  const $ = cheerio.load(html, { decodeEntities: false });
  $(
    [
      '[role="region"][aria-label="Skip to main content"]',
      ".theme-announcement-bar",
      ".menu-content",
    ].join(","),
  ).attr("data-markdown-ignore", "");

  $("p, li")
    .filter(function isGeneratedDocEmphasisArtifact() {
      return $(this).text().trim().startsWith("_");
    })
    .attr("data-markdown-ignore", "");

  return $.html();
}

function truncate(value, maxLength = 140) {
  const compact = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 1).trimEnd()}…`;
}

function readEditorialHeader(siteDir) {
  const existingPath = path.join(siteDir, "static/llms.txt");
  if (!fs.existsSync(existingPath)) {
    return "# Linea Documentation\n\n> Canonical public documentation for Linea.";
  }

  const existing = fs.readFileSync(existingPath, "utf8").trimEnd();
  const lines = existing.split(/\r?\n/);
  const firstSameOriginLink = lines.findIndex((line) =>
    /https:\/\/docs\.linea\.build\//.test(line),
  );

  if (firstSameOriginLink === -1) return existing;

  let cutIndex = firstSameOriginLink;
  for (let index = firstSameOriginLink; index >= 0; index -= 1) {
    if (/^##\s+/.test(lines[index])) {
      cutIndex = index;
      break;
    }
  }

  return lines.slice(0, cutIndex).join("\n").trimEnd();
}

function groupRoutes(pages) {
  const grouped = new Map(GROUPS.map((group) => [group.title, []]));

  for (const page of pages) {
    const group = GROUPS.find((candidate) => candidate.test(page.route));
    grouped.get(group.title).push(page);
  }

  return grouped;
}

function buildLlmsTxt({ siteDir, pages, baseUrl = DEFAULT_BASE_URL }) {
  const sections = [readEditorialHeader(siteDir)];
  const grouped = groupRoutes(pages);

  for (const [title, groupPages] of grouped.entries()) {
    if (!groupPages.length) continue;

    sections.push(
      [
        `## ${title}`,
        ...groupPages.map((page) => {
          const url = getMarkdownUrlForRoute(page.route, baseUrl);
          const description = truncate(page.description);
          return description
            ? `- [${page.title}](${url}): ${description}`
            : `- [${page.title}](${url})`;
        }),
      ].join("\n"),
    );
  }

  const llms = `${sections.join("\n\n")}\n`;
  if (llms.length > MAX_LLMS_CHARS) {
    throw new Error(
      `Generated llms.txt is ${llms.length} characters, exceeding ${MAX_LLMS_CHARS}.`,
    );
  }
  if (llms.length >= LLMS_WARNING_CHARS) {
    console.warn(
      `Generated llms.txt is ${llms.length} characters, above the ${LLMS_WARNING_CHARS} character warning threshold.`,
    );
  }

  return llms;
}

function getTitleFromMarkdown(markdown) {
  const title = markdown.match(/^#\s+(.+)$/m);
  return title ? title[1].trim() : "Linea documentation";
}

function generateAgentDocs({
  siteDir = process.cwd(),
  buildDir = path.join(siteDir, "build"),
  baseUrl = DEFAULT_BASE_URL,
} = {}) {
  const routes = readSitemapRoutes({ buildDir, baseUrl });
  const metadata = readDocsMetadata(siteDir);
  const pages = [];
  const skipped = [];

  for (const route of routes) {
    const htmlPath = findHtmlPath(buildDir, route);
    if (!htmlPath) {
      skipped.push(route);
      continue;
    }

    const docMetadata = metadata.get(route) || {};
    const html = fs.readFileSync(htmlPath, "utf8");
    const htmlWithMarkdownIgnores = addMarkdownIgnoreAttributes(html);
    fs.writeFileSync(htmlPath, htmlWithMarkdownIgnores);
    const markdown = htmlToMarkdown({
      html: htmlWithMarkdownIgnores,
      route,
      metadata: docMetadata,
      baseUrl,
    });
    const outputPath = path.join(buildDir, getMarkdownPathForRoute(route));
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${markdown}\n`);

    pages.push({
      route,
      title: docMetadata.title || getTitleFromMarkdown(markdown),
      description: docMetadata.description,
    });
  }

  const llms = buildLlmsTxt({ siteDir, pages, baseUrl });
  fs.writeFileSync(path.join(buildDir, "llms.txt"), llms);

  return {
    routes: pages.map((page) => page.route),
    skipped,
    llmsChars: llms.length,
  };
}

function readLlmsLinks(llms, baseUrl = DEFAULT_BASE_URL) {
  const base = new URL(baseUrl);
  return [...llms.matchAll(/\[[^\]]+\]\(([^)#\s]+)(?:\s+"[^"]*")?\)/g)]
    .map((match) => {
      try {
        return new URL(match[1], base);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((url) => url.origin === base.origin)
    .map((url) => url.toString());
}

function readMarkdownAlternateHrefs(html) {
  const $ = cheerio.load(html);

  return $("link[rel='alternate'][type='text/markdown']")
    .map((index, element) => {
      void index;
      return $(element).attr("href");
    })
    .get()
    .filter(Boolean);
}

function getPathForSameOriginUrl(href, baseUrl = DEFAULT_BASE_URL) {
  const base = new URL(baseUrl);
  const url = new URL(href, base);
  if (url.origin !== base.origin) return null;
  return url.pathname;
}

function checkAgentDocs({
  siteDir = process.cwd(),
  buildDir = path.join(siteDir, "build"),
  baseUrl = DEFAULT_BASE_URL,
} = {}) {
  const failures = [];
  const resolvedBuildDir = path.resolve(buildDir);
  const allHtmlRoutes = readSitemapRoutes({
    buildDir,
    baseUrl,
    includeSkipped: true,
  }).filter((route) => Boolean(findHtmlPath(buildDir, route)));
  const routes = allHtmlRoutes.filter((route) => !SKIPPED_ROUTES.has(route));
  const llmsPath = path.join(buildDir, "llms.txt");

  for (const route of allHtmlRoutes) {
    const htmlPath = findHtmlPath(buildDir, route);
    const html = fs.readFileSync(htmlPath, "utf8");
    for (const href of readMarkdownAlternateHrefs(html)) {
      let pathname;
      try {
        pathname = getPathForSameOriginUrl(href, baseUrl);
      } catch {
        failures.push(`${route} has invalid Markdown alternate href: ${href}`);
        continue;
      }

      if (!pathname) {
        failures.push(
          `${route} has non-same-origin Markdown alternate href: ${href}`,
        );
        continue;
      }

      const localMarkdownPath = path.resolve(
        buildDir,
        decodeURIComponent(pathname.replace(/^\//, "")),
      );
      if (
        localMarkdownPath !== resolvedBuildDir &&
        !localMarkdownPath.startsWith(`${resolvedBuildDir}${path.sep}`)
      ) {
        failures.push(
          `${route} has Markdown alternate outside build output: ${href}`,
        );
        continue;
      }

      if (!pathname.endsWith(".md") || !fs.existsSync(localMarkdownPath)) {
        failures.push(
          `${route} has Markdown alternate without generated file: ${href}`,
        );
      }
    }
  }

  const routesWithHtml = routes.filter((route) =>
    Boolean(findHtmlPath(buildDir, route)),
  );

  if (!fs.existsSync(llmsPath)) {
    failures.push("build/llms.txt is missing");
    return {
      ok: false,
      failures,
      totalRoutes: routesWithHtml.length,
      coveredRoutes: 0,
    };
  }

  const llms = fs.readFileSync(llmsPath, "utf8");
  if (llms.length > MAX_LLMS_CHARS) {
    failures.push(`build/llms.txt exceeds ${MAX_LLMS_CHARS} characters`);
  } else if (llms.length >= LLMS_WARNING_CHARS) {
    console.warn(
      `build/llms.txt is ${llms.length} characters, above the ${LLMS_WARNING_CHARS} character warning threshold.`,
    );
  }

  const sameOriginLinks = readLlmsLinks(llms, baseUrl);
  const nonMarkdownLinks = sameOriginLinks.filter(
    (url) => !url.endsWith(".md"),
  );
  if (nonMarkdownLinks.length) {
    failures.push(
      `llms.txt contains same-origin non-Markdown links: ${nonMarkdownLinks.join(", ")}`,
    );
  }

  const linkSet = new Set(sameOriginLinks);
  const expectedLinks = routesWithHtml.map((route) =>
    getMarkdownUrlForRoute(route, baseUrl),
  );
  const missingLinks = expectedLinks.filter((url) => !linkSet.has(url));
  if (missingLinks.length) {
    failures.push(
      `llms.txt missing Markdown links: ${missingLinks.join(", ")}`,
    );
  }

  for (const route of routesWithHtml) {
    const markdownPath = path.join(buildDir, getMarkdownPathForRoute(route));
    if (!fs.existsSync(markdownPath)) {
      failures.push(`${getMarkdownPathForRoute(route)} is missing`);
      continue;
    }

    const markdown = fs.readFileSync(markdownPath, "utf8");
    if (!/For the complete Linea documentation index/.test(markdown)) {
      failures.push(
        `${getMarkdownPathForRoute(route)} is missing llms.txt directive`,
      );
    }
  }

  return {
    ok: failures.length === 0,
    failures,
    totalRoutes: routesWithHtml.length,
    coveredRoutes: expectedLinks.length - missingLinks.length,
  };
}

module.exports = {
  checkAgentDocs,
  generateAgentDocs,
  getMarkdownPathForRoute,
  getMarkdownUrlForRoute,
};
