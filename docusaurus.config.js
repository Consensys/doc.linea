const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

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
          '📣 Partners are currently onboarding to Linea Mainnet Alpha. 🚀 The network and bridge to Ethereum will be available soon for general use. See <a href="https://linea.mirror.xyz/7l9gKzYzKVOxEOnReavov467Ss_fsrkGzABvbRISPMY">here</a> for more details on what to expect. 😎',
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
            label: "Learn",
            position: "left",
            items: [
              {
                label: "Community tutorials",
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
            href: "https://discord.com/invite/consensys",
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
                href: "https://discord.com/invite/consensys",
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
            to: "/architecture/bridges/message-service",
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
            to: "/build-on-linea/use-linea-testnet",
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
            to: "/build-on-linea/use-linea-testnet/bridge-funds",
            from: "/use-linea/bridge-funds",
          },
          {
            to: "/build-on-linea/use-linea-testnet/fund",
            from: "/use-linea/fund",
          },
          {
            to: "/build-on-linea/tooling",
            from: ["/developers/tooling", "/developers/partners"],
          },
          {
            from: "/use-linea/explore",
            to: "/build-on-linea/use-linea-testnet/explore",
          },
          {
            from: "/use-linea/explore/use-airswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-airswap",
          },
          {
            from: "/use-linea/explore/use-apetimism-launchpad",
            to: "/build-on-linea/use-linea-testnet/explore/use-apetimism-launchpad",
          },
          {
            from: "/use-linea/explore/use-asmatch",
            to: "/build-on-linea/use-linea-testnet/explore/use-asmatch",
          },
          {
            from: "/use-linea/explore/use-atticc",
            to: "/build-on-linea/use-linea-testnet/explore/use-atticc",
          },
          {
            from: "/use-linea/explore/use-battlemon",
            to: "/build-on-linea/use-linea-testnet/explore/use-battlemon",
          },
          {
            from: "/use-linea/explore/use-bilinear",
            to: "/build-on-linea/use-linea-testnet/explore/use-bilinear",
          },
          {
            from: "/use-linea/explore/use-cashmere",
            to: "/build-on-linea/use-linea-testnet/explore/use-cashmere",
          },
          {
            from: "/use-linea/explore/use-cataclysm",
            to: "/build-on-linea/use-linea-testnet/explore/use-cataclysm",
          },
          {
            from: "/use-linea/explore/use-celer",
            to: "/build-on-linea/use-linea-testnet/explore/use-celer",
          },
          {
            from: "/use-linea/explore/use-compound",
            to: "/build-on-linea/use-linea-testnet/explore/use-compound",
          },
          {
            from: "/use-linea/explore/use-connext",
            to: "/build-on-linea/use-linea-testnet/explore/use-connext",
          },
          {
            from: "/use-linea/explore/use-degenreborn",
            to: "/build-on-linea/use-linea-testnet/explore/use-degenreborn",
          },
          {
            from: "/use-linea/explore/use-fluvi_wallet",
            to: "/build-on-linea/use-linea-testnet/explore/use-fluvi_wallet",
          },
          {
            from: "/use-linea/explore/use-fwdx",
            to: "/build-on-linea/use-linea-testnet/explore/use-fwdx",
          },
          {
            from: "/use-linea/explore/use-ghost",
            to: "/build-on-linea/use-linea-testnet/explore/use-ghost",
          },
          {
            from: "/use-linea/explore/use-goplus-security-api",
            to: "/build-on-linea/use-linea-testnet/explore/use-goplus-security-api",
          },
          {
            from: "/use-linea/explore/use-gridex",
            to: "/build-on-linea/use-linea-testnet/explore/use-gridex",
          },
          {
            from: "/use-linea/explore/use-hapi",
            to: "/build-on-linea/use-linea-testnet/explore/use-hapi",
          },
          {
            from: "/use-linea/explore/use-hop",
            to: "/build-on-linea/use-linea-testnet/explore/use-hop",
          },
          {
            from: "/use-linea/explore/use-idriss",
            to: "/build-on-linea/use-linea-testnet/explore/use-idriss",
          },
          {
            from: "/use-linea/explore/use-izumi",
            to: "/build-on-linea/use-linea-testnet/explore/use-izumi",
          },
          {
            from: "/use-linea/explore/use-kyberswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-kyberswap",
          },
          {
            from: "/use-linea/explore/use-linea-ens",
            to: "/build-on-linea/use-linea-testnet/explore/use-linea-ens",
          },
          {
            from: "/use-linea/explore/use-linea-l2-domains",
            to: "/build-on-linea/use-linea-testnet/explore/use-linea-l2-domains",
          },
          {
            from: "/use-linea/explore/use-lineaster",
            to: "/build-on-linea/use-linea-testnet/explore/use-lineaster",
          },
          {
            from: "/use-linea/explore/use-match3-game",
            to: "/build-on-linea/use-linea-testnet/explore/use-match3-game",
          },
          {
            from: "/use-linea/explore/use-meeet",
            to: "/build-on-linea/use-linea-testnet/explore/use-meeet",
          },
          {
            from: "/use-linea/explore/use-mendi",
            to: "/build-on-linea/use-linea-testnet/explore/use-mendi",
          },
          {
            from: "/use-linea/explore/use-mesprotocol",
            to: "/build-on-linea/use-linea-testnet/explore/use-mesprotocol",
          },
          {
            from: "/use-linea/explore/use-metalswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-metalswap",
          },
          {
            from: "/use-linea/explore/use-moonlight",
            to: "/build-on-linea/use-linea-testnet/explore/use-moonlight",
          },
          {
            from: "/use-linea/explore/use-multichain",
            to: "/build-on-linea/use-linea-testnet/explore/use-multichain",
          },
          {
            from: "/use-linea/explore/use-nfts2me",
            to: "/build-on-linea/use-linea-testnet/explore/use-nfts2me",
          },
          {
            from: "/use-linea/explore/use-noobysswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-noobysswap",
          },
          {
            from: "/use-linea/explore/use-openocean",
            to: "/build-on-linea/use-linea-testnet/explore/use-openocean",
          },
          {
            from: "/use-linea/explore/use-pancakeswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-pancakeswap",
          },
          {
            from: "/use-linea/explore/use-particle",
            to: "/build-on-linea/use-linea-testnet/explore/use-particle",
          },
          {
            from: "/use-linea/explore/use-patch",
            to: "/build-on-linea/use-linea-testnet/explore/use-patch",
          },
          {
            from: "/use-linea/explore/use-readon",
            to: "/build-on-linea/use-linea-testnet/explore/use-readon",
          },
          {
            from: "/use-linea/explore/use-snapshotx",
            to: "/build-on-linea/use-linea-testnet/explore/use-snapshotx",
          },
          {
            from: "/use-linea/explore/use-squid",
            to: "/build-on-linea/use-linea-testnet/explore/use-squid",
          },
          {
            from: "/use-linea/explore/use-stationx",
            to: "/build-on-linea/use-linea-testnet/explore/use-stationx",
          },
          {
            from: "/use-linea/explore/use-sushiswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-sushiswap",
          },
          {
            from: "/use-linea/explore/use-tatarot",
            to: "/build-on-linea/use-linea-testnet/explore/use-tatarot",
          },
          {
            from: "/use-linea/explore/use-thirdweb",
            to: "/build-on-linea/use-linea-testnet/explore/use-thirdweb",
          },
          {
            from: "/use-linea/explore/use-uniswap",
            to: "/build-on-linea/use-linea-testnet/explore/use-uniswap",
          },
          {
            from: "/use-linea/explore/use-velocore",
            to: "/build-on-linea/use-linea-testnet/explore/use-velocore",
          },
          {
            from: "/use-linea/explore/use-vitidiary",
            to: "/build-on-linea/use-linea-testnet/explore/use-vitidiary",
          },
          {
            from: "/use-linea/explore/use-zkex",
            to: "/build-on-linea/use-linea-testnet/explore/use-zkex",
          },
          {
            from: "/use-linea/explore/use-zkholdem",
            to: "/build-on-linea/use-linea-testnet/explore/use-zkholdem",
          },
          {
            from: "/use-linea/explore/use-zkusd",
            to: "/build-on-linea/use-linea-testnet/explore/use-zkusd",
          },
          {
            from: "/use-linea/explore/use-zonic",
            to: "/build-on-linea/use-linea-testnet/explore/use-zonic",
          },
        ],
      },
    ],
  ],
  themes: [],
};

module.exports = config;
