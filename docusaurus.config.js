const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

// const isDev = process.env.NODE_ENV === "development";
// const baseUrl = isDev ? "/" : "/";

// const organizationName = "Consensys";
// const projectName = "doc.zk-evm";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Linea",
  tagline:
    "An EVM-equivalent network, scaling the Ethereum experience. Secured with a zero-knowledge rollup to Ethereum, built on quantum-resistant, lattice-based cryptography, powered by Consensys.",
  url: "https://docs.linea.build",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Consensys", // Usually your GitHub org/user name.
  projectName: "doc.zk-evm", // Usually your repo name.
  deploymentBranch: "gh-pages", // Github Pages deploying branch

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Set a base path separate from default /docs
          editUrl: "https://github.com/Consensys/doc.zk-evm/tree/main/",
          path: "docs",
          routeBasePath: "/",
          // @ts-ignore
          // eslint-disable-next-line global-require
          remarkPlugins: [require("remark-docusaurus-tabs")],
          remarkPlugins: [math],
          rehypePlugins: [katex],
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
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "NSRFPEJ4NC",

        // Public API key: it is safe to commit it
        apiKey: "cea41b975ad6c9a01408dfda6e0061d3",

        indexName: "linea",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        // ... other Algolia params
      },
      announcementBar: {
        id: "announcement_bar",
        content:
          '📣Linea Mainnet Alpha is here! 🚀 Follow our User Guides <a href="https://docs.linea.build/use-mainnet">here</a> to get started 😎',
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: false,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        logo: {
          alt: "Linea",
          src: "img/logo.svg",
          srcDark: "img/logo_dark.svg",
          width: 55,
          height: 55,
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            type: "dropdown",
            label: "Tutorials",
            position: "left",
            items: [
              {
                label: "Community Guides",
                to: "blog",
              },
              {
                label: "ZK Glossary",
                to: "/zero-knowledge-glossary",
              },
            ],
          },
          {
            to: "https://support.linea.build/hc/",
            position: "left",
            label: "Support",
          },
          {
            to: "https://linea.build/",
            position: "left",
            label: "Linea home",
          },
          {
            href: "https://discord.gg/linea",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://twitter.com/consensys",
            className: "header-twitter-link",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Learn",
            items: [
              {
                label: "Use Linea",
                to: "/use-mainnet",
              },
              {
                label: "Build on Linea",
                to: "/build-on-linea",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Join our Discord",
                href: "https://discord.gg/linea",
              },
              {
                label: "Get Help",
                to: "https://support.linea.build/",
              },
              {
                label: "Give Feedback",
                to: "https://community.linea.build/c/feedback",
              },
            ],
          },
          {
            title: "Contribute",
            items: [
              {
                label: "Contribute to our documentation",
                href: "https://github.com/Consensys/doc.zk-evm",
              },
              {
                label: "Contribute to our gnark repo",
                href: "https://github.com/Consensys/gnark",
              },
              {
                label: "Contribute to our gnark-crypto repo",
                href: "https://github.com/Consensys/gnark-crypto",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Consensys, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity", "toml"],
      },
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
    }),
  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-PY7JFNPXNH",
        anonymizeIP: true,
      },
    ],
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-TB58STH",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/architecture/canonical-msg-service/message-service",
            from: [
              "/developers/bridge-architecture/message-service",
              "/developers/use-message-bridge",
            ],
            from: [
              "/developers/bridge-architecture/message-service",
              "/developers/use-message-bridge",
            ],
          },
          {
            to: "/build-on-linea/quickstart",
            from: [
              "/developers/quickstart",
              "/developers/deploy-smart-contracts",
            ],
          },
          {
            to: "/zero-knowledge-glossary",
            from: "/reference/glossary",
          },
          {
            to: "/build-on-linea",
            from: [
              "/get-started",
              "/get-started/fund",
              "/get-started/configure-metamask",
              "/get-started/quickstart",
              "/use-zkevm",
              "/use-linea/index.md",
            ],
          },
          {
            to: "/use-mainnet/set-up-your-wallet",
            from: "/build-on-linea/use-linea-testnet/set-up-your-wallet",
          },
          {
            to: "/use-mainnet/fund",
            from: "/build-on-linea/use-linea-testnet/fund",
          },
          {
            to: "/use-mainnet/info-contracts",
            from: "/build-on-linea/use-linea-testnet/info-contracts",
          },
          {
            to: "/build-on-linea/bridge-funds",
            from: "/build-on-linea/use-linea-testnet/bridge-funds",
          },
          {
            to: "/use-mainnet/bridges-of-linea",
            from: "/build-on-linea/use-linea-testnet/bridge-funds/usdc-bridge",
          },
          {
            to: "/use-mainnet/bridges-of-linea",
            from: "/build-on-linea/use-linea-testnet/bridge-funds/use-etherscan",
          },
        ],
      },
    ],
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
  themes: [],
};

module.exports = config;
