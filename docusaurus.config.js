import remarkEmdash from "./scripts/remark/remark-emdash.js";

const { themes: prismThemes } = require("prism-react-renderer");
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

const redirectsData = require("./redirects.json");

/** It's a public API key, so it's safe to expose it here. */
const COOKBOOK_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxOGU4YTA1MjA1MDZmZmEwMDhjNDYiLCJpYXQiOjE3MDcxODM3NTQsImV4cCI6MjAyMjc1OTc1NH0.tHX7blsbehxRJIjCQMMBxWpdjDCHiRW5sr8vkyefHVs";

// const isDev = process.env.NODE_ENV === "development";
// const baseUrl = isDev ? "/" : "/";

// const organizationName = "Consensys";
// const projectName = "doc.linea";

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "Linea",
  tagline: "Everything you need to build onchain.",
  url: "https://docs.linea.build",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "img/favicons/favicon-96x96.png",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Consensys", // Usually your GitHub org/user name.
  projectName: "doc.linea", // Usually your repo name.
  deploymentBranch: "gh-pages", // Github Pages deploying branch

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  scripts: [{ src: "/js/clearSearchOnCollapse.js", async: true }],

  clientModules: [
    require.resolve("./src/clientModules/codeBlockClassifier.js"),
    require.resolve("./src/clientModules/sidebarOffset.js"),
  ],

  markdown: {
    mermaid: true,
  },

  // Enable experimental infrastructure for Docusaurus Faster project
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: false,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Set a base path separate from default /docs
          editUrl: "https://github.com/Consensys/doc.linea/tree/main/",
          path: "docs",
          routeBasePath: "/",
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          includeCurrentVersion: true,
          remarkPlugins: [remarkEmdash],
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
    [
      "redocusaurus",
      {
        specs: [
          {
            spec: "https://token-api.linea.build/docs-yaml",
            route: "api/token-api/reference",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /* @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      announcementBar: {
        id: "announcement_bar_2026_03_ens_resolver_updated",
        content:
          '🔔 <strong>ENS resolver contracts updated</strong>: New contract addresses are live as part of the Small Fields upgrade. <a href="/network/how-to/deploy-subdomain#use-ens-contracts">See new addresses →</a>',
        backgroundColor: "#6119ef",
        textColor: "#ffffff",
        isCloseable: true,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      mermaid: {
        options: {
          useMaxWidth: false,
          flowchart: {
            useMaxWidth: false,
            wrappingWidth: 280,
          },
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        logo: {
          alt: "Linea",
          src: "img/Linea_docs_logo.svg",
          srcDark: "img/Linea_docs_logo_dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "network/quickstart/index",
            position: "left",
            label: "Public network",
            activeBaseRegex: "^/network/",
          },
          {
            type: "doc",
            docId: "protocol/quickstart",
            position: "left",
            label: "Protocol",
          },
          {
            type: "doc",
            docId: "stack/quickstart",
            position: "left",
            label: "Stack",
          },
          {
            type: "doc",
            docId: "api/quickstart",
            position: "left",
            label: "APIs & SDK",
          },
          {
            type: "doc",
            docId: "changelog/release-notes",
            position: "right",
            label: "Changelog",
          },
          {
            href: "https://support.linea.build/",
            label: "Support",
            position: "right",
            class: "support-link",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Links",
            items: [
              {
                label: "Home",
                href: "https://linea.build/",
              },
              {
                label: "Blog",
                href: "https://linea.build/blog",
              },
              {
                label: "Status",
                href: "https://linea.statuspage.io/",
              },
              {
                label: "Mainnet block explorer",
                href: "https://lineascan.build",
              },
              {
                label: "Risk disclosures",
                href: "/network/risk-disclosures",
              },
              {
                label: "Terms of service",
                href: "https://linea.build/terms-of-service",
              },
              {
                label: "Privacy policy",
                href: "https://linea.build/privacy-policy",
              },
              {
                html: "<button id='manage-cookie-btn'>Manage cookie</button>",
              },
            ],
          },
          {
            title: "Get involved",
            items: [
              {
                label: "Developer Hub",
                href: "https://developer.linea.build/",
              },
              {
                label: "Linea Hub",
                href: "https://linea.build/apps",
              },
              {
                label: "User support",
                to: "https://support.linea.build/",
              },
              {
                label: "Give feedback",
                to: "https://community.linea.build/c/feedback",
              },
            ],
          },
          {
            title: "Contribute",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Consensys/doc.linea",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          "solidity",
          "toml",
          "bash",
          "json",
          "typescript",
          "javascript",
          "python",
        ],
      },
      metadata: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "/img/Linea_social_card_docs.png" },
        { property: "og:image", content: "/img/Linea_social_card_docs.png" },
      ],
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
      ],
    },
  plugins: [
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-TB58STH",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: redirectsData,
      },
    ],
    function excludeApiPlugin() {
      return {
        name: "exclude-api-directory",
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  test: /api\/.*\.ts$/,
                  use: "null-loader",
                },
              ],
            },
          };
        },
      };
    },
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        docsRouteBasePath: "/",
        hashed: true,
      },
    ],
    "@docusaurus/theme-mermaid",
  ],
  headTags: [
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
        (function() {
          var nativeFetch = window.fetch;
          var nativeWorker = window.Worker;
          var origin = location.origin;
          var recoveredScripts = Object.create(null);

          window.Osano = window.Osano || function() {
            (window.Osano.data = window.Osano.data || []).push(arguments);
          };

          function getInputUrl(input) {
            if (typeof input === 'string') return input;
            if (typeof URL !== 'undefined' && input instanceof URL) return input.href;
            if (input && typeof input.url === 'string') return input.url;
            return null;
          }

          function normalizeUrl(input) {
            var inputUrl = getInputUrl(input);
            if (!inputUrl) return null;

            try {
              return new URL(inputUrl, origin).href;
            } catch (e) {
              return null;
            }
          }

          function isFirstPartyRuntimeScriptUrl(input) {
            var normalizedUrl = normalizeUrl(input);
            if (!normalizedUrl) return false;

            try {
              var url = new URL(normalizedUrl);
              if (url.origin !== origin) return false;
              return url.pathname.indexOf('/assets/js/') === 0 || url.pathname.indexOf('/js/') === 0;
            } catch (e) {
              return false;
            }
          }

          function isSameOriginRequest(input) {
            var inputUrl = getInputUrl(input);
            if (!inputUrl) return false;

            try {
              return new URL(inputUrl, origin).origin === origin;
            } catch (e) {
              return false;
            }
          }

          function evaluateScriptSource(code, src) {
            // Evaluate in global scope so Rspack chunk payload can register itself.
            (0, eval)(code + '\\n//# sourceURL=' + src);
          }

          function recoverBlockedScript(src) {
            var scriptUrl = normalizeUrl(src);
            if (!scriptUrl || !isFirstPartyRuntimeScriptUrl(scriptUrl)) return;
            if (recoveredScripts[scriptUrl] === 'loading' || recoveredScripts[scriptUrl] === 'loaded') return;

            var fetchFn = nativeFetch || window.fetch;
            if (typeof fetchFn !== 'function') return;

            recoveredScripts[scriptUrl] = 'loading';
            fetchFn
              .call(window, scriptUrl, { credentials: 'same-origin' })
              .then(function(response) {
                if (!response || !response.ok) throw new Error('Unable to recover blocked script');
                return response.text();
              })
              .then(function(source) {
                evaluateScriptSource(source, scriptUrl);
                recoveredScripts[scriptUrl] = 'loaded';
              })
              .catch(function() {
                recoveredScripts[scriptUrl] = 'failed';
              });
          }

          window.Osano('onScriptBlocked', function(src) {
            recoverBlockedScript(src);
          });

          function restoreEssentialRuntimeApis() {
            if (window.fetch !== nativeFetch) {
              var blockedFetch = window.fetch;
              window.fetch = function(input, init) {
                if (isSameOriginRequest(input)) {
                  return nativeFetch.call(window, input, init);
                }
                return blockedFetch.call(window, input, init);
              };
            }
            if (window.Worker !== nativeWorker) {
              window.Worker = nativeWorker;
            }
          }
          window.Osano('onInitialized', restoreEssentialRuntimeApis);
        })();
      `,
    },
    {
      tagName: "script",
      attributes: {
        src: "https://cmp.osano.com/AzZMxHTbQDOQD8c1J/c6086d9d-3cdb-4b84-b5ee-0acab1ebdd42/osano.js",
      },
    },
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
      (function() {
        var hasScheduled = false;

        function mountCookbook() {
          var element = document.getElementById('__cookbook');
          if (!element) {
            element = document.createElement('div');
            element.id = '__cookbook';
            element.dataset.apiKey = '${COOKBOOK_PUBLIC_API_KEY}';
            document.body.appendChild(element);
          }

          var script = document.getElementById('__cookbook-script');
          if (!script) {
            script = document.createElement('script');
            script.crossOrigin = 'anonymous';
            script.integrity = 'sha384-2IAGy0MWIbMc3D8cuK6NbOkLIz4yy3pYmImC4f6TRKhfFMNEo1nFCQ2re8bysHkX';
            script.src = 'https://cdn.jsdelivr.net/npm/@cookbookdev/docsbot@4.21.17/dist/standalone/index.cjs.js';

            script.id = '__cookbook-script';
            script.async = true;
            document.body.appendChild(script);
          }
        }

        function scheduleCookbook() {
          if (hasScheduled) return;
          hasScheduled = true;

          if (window.requestIdleCallback) {
            window.requestIdleCallback(mountCookbook, { timeout: 4000 });
          } else {
            setTimeout(mountCookbook, 2000);
          }
        }

        function scheduleOnInteraction() {
          scheduleCookbook();
        }

        window.addEventListener('pointerdown', scheduleOnInteraction, { once: true, capture: true });
        window.addEventListener('keydown', scheduleOnInteraction, { once: true, capture: true });
        window.addEventListener('load', function() {
          setTimeout(scheduleCookbook, 500);
        }, { once: true });
      })();
    `,
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/img/favicons/favicon-96x96.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/img/favicons/web-app-manifest-192x192.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/img/favicons/web-app-manifest-512x512.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/favicons/apple-touch-icon.png",
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: `
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://docs.linea.build",
        "logo": "https://docs.linea.build/img/favicons/favicon-96x96.png"
      }
    `,
    },
  ],
};

module.exports = config;
