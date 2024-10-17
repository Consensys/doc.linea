const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** It's a public API key, so it's safe to expose it here. */
const COOKBOOK_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxOGU4YTA1MjA1MDZmZmEwMDhjNDYiLCJpYXQiOjE3MDcxODM3NTQsImV4cCI6MjAyMjc1OTc1NH0.tHX7blsbehxRJIjCQMMBxWpdjDCHiRW5sr8vkyefHVs";

// const isDev = process.env.NODE_ENV === "development";
// const baseUrl = isDev ? "/" : "/";

// const organizationName = "Consensys";
// const projectName = "doc.linea";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Linea",
  tagline:
    "An EVM-equivalent network, scaling the Ethereum experience. Secured with a zero-knowledge rollup to Ethereum, built on lattice-based cryptography, and powered by Consensys.",
  url: "https://docs.linea.build",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
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

  scripts: [
    {src: "/js/getfeedback.js", defer: true, async: true}
  ],

  markdown: {
    mermaid: true,
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
        blog: false, // Disable blog feature
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "announcement_bar",
        content:
          '📣 <strong>Linea ENS</strong> is now available! Visit the <a href="https://names.linea.build/" target="blank">app</a>, <a href="https://support.linea.build/general/ens" target="blank">user guide</a>, or our <a href="https://docs.linea.build/developers/tooling/cross-chain/ccip-read-gateway" target="blank">developer guidance</a> on reusing its architecture.',
        backgroundColor: "#61dfff",
        textColor: "#121212",
        isCloseable: false,
      },
      colorMode: {
        defaultMode: "dark",
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
        title: "Docs",
        logo: {
          alt: "Linea",
          src: "img/Linea_logo_black.svg",
          srcDark: "img/Linea_logo_white.svg",
        },
        items: [
          {
            type: "doc",
            docId: "developers/quickstart/index",
            position: "left",
            label: "Quickstart",
          },
          {
            type: "doc",
            docId: "developers/guides/index",
            position: "left",
            label: "Guides",
          },
          // { can add this section back if we want it
          //   type: "dropdown",
          //   label: "Tutorials",
          //   position: "left",
          //   items: [
          //     {
          //       label: "Community Guides",
          //       to: "blog",
          //     },
          //     {
          //       label: "ZK Glossary",
          //       to: "/zero-knowledge-glossary",
          //     },
          //   ],
          // },
          {
            to: "/developers/guides/run-a-node",
            position: "left",
            label: "Run a node",
          },
          {
            type: "doc",
            docId: "architecture/index",
            position: "left",
            label: "Architecture",
          },
          {
            to: "/developers/linea-version",
            position: "right",
            label: "Release notes",
          },
          {
            href: "https://discord.gg/linea",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://twitter.com/lineabuild",
            className: "header-twitter-link",
            position: "right",
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
                label: "Status",
                href: "https://linea.statuspage.io/",
              },
              {
                label: "Mainnet block explorer",
                href: "https://lineascan.build",
              },
              {
                label: "Risk disclosures",
                href: "risk-disclosures/index",
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
                label: "Get support",
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
                label: "Documentation",
                href: "https://github.com/Consensys/doc.linea",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Consensys, Inc.`,
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
            to: "/architecture/stack/canonical-msg-service/message-service",
            from: [
              "/developers/bridge-architecture/message-service",
              "/developers/use-message-bridge",
            ],
          },
          {
            to: "/developers/quickstart",
            from: "/developers/deploy-smart-contracts",
          },
          {
            to: "/zero-knowledge-glossary",
            from: [
              "/reference/glossary", 
              "/zero-knowledge-glossary",
              "/users/zero-knowledge-glossary"
            ],
          },
          {
            to: "/",
            from: [
              "/get-started",
              "/get-started/fund",
              "/get-started/configure-metamask",
              "/get-started/quickstart",
              "/use-zkevm",
              "/use-linea/index.md",
              "/users",
              "/users/index.mdx",
            ],
          },
          {
            to: "/",
            from: [
              "/build-on-linea/use-linea-testnet/set-up-your-wallet",
              "/users/move-funds/set-up-your-wallet",
            ],
          },
          {
            to: "/",
            from: [
              "/build-on-linea/use-linea-testnet/fund",
              "/users/move-funds/fund",
            ],
          },
          {
            to: "/developers/quickstart/info-contracts",
            from: "/build-on-linea/use-linea-testnet/info-contracts",
          },
          {
            to: "/developers/guides/bridge/how-to-bridge-eth",
            from: "/use-mainnet/bridges-of-linea/how-to-bridge-eth",
          },
          {
            to: "/developers/guides/bridge",
            from: "/build-on-linea/use-linea-testnet/bridge-funds",
          },
          {
            to: "/",
            from: [
              "/build-on-linea/use-linea-testnet/bridge-funds/usdc-bridge",
              "/users/move-funds/bridge",
            ],
          },
          {
            to: "/",
            from: [
              "/build-on-linea/use-linea-testnet/bridge-funds/use-etherscan",
              "/users/move-funds/bridge",
            ],
          },
          {
            to: "/developers/guides/gas/gas-fees",
            from: "/use-mainnet/gas-import",
          },
          {
            to: "/users/linea-voyage/linea-surge/linea-surge-overview",
            from: "/use-mainnet/linea-surge/linea-surge-overview",
          },
          {
            to: "/users/linea-voyage/linea-surge/linea-surge-model",
            from: "/use-mainnet/linea-surge/linea-surge-model",
          },
          {
            to: "/users/linea-voyage/linea-surge/linea-surge-model",
            from: "/use-mainnet/linea-surge-model",
          },
          {
            to: "/users/linea-voyage/linea-surge",
            from: "/use-mainnet/linea-surge",
          },
          {
            to: "/developers/guides/gas/gas-fees",
            from: "/reference/api/linea-estimategas",
          },
          {
            to: "/users/linea-voyage/lxp",
            from: "/use-mainnet/linea-xp",
          },
          {
            to: "/developers/guides/bridge",
            from: "/use-mainnet/bridges-of-linea",
          },
          {
            to: "/",
            from: [
              "/use-mainnet/fund",
              "/users/move-funds/fund",
            ],
          },
          {
            to: "/",
            from: [
              "/use-mainnet/set-up-your-wallet",
              "/users/move-funds/set-up-your-wallet",
            ],
          },
          {
            to: "/developers/quickstart/info-contracts",
            from: "/use-mainnet/info-contracts",
          },
          {
            to: "/developers/guides/linea-api",
            from: "/build-on-linea/quickstart/rpc",
          },
          {
            to: "/developers/quickstart/ethereum-differences",
            from: "/build-on-linea/ethereum-differences",
          },
          {
            to: "/developers/guides/gas/gas-fees",
            from: "/build-on-linea/gas-fees",
          },
          {
            to: "/developers/guides/run-a-node",
            from: [
              "/build-on-linea/run-a-node",
              "/build-on-linea/run-a-node/use-binary",
              "/build-on-linea/run-a-node/use-docker",
            ],
          },
          {
            to: "/developers/community/hackathons",
            from: "/build-on-linea/hackathons",
          },
          {
            to: "/developers/guides/linea-inscriptions",
            from: "/build-on-linea/tooling/linea-inscriptions",
          },
          {
            to: "/developers/guides/linea-safe",
            from: "/build-on-linea/tooling/linea-safe",
          },
          {
            to: "/developers/tooling/permanent-data/irys/irys-querying",
            from: "/developers/tooling/permanent-data/irys/irys-query-package",
          },
          {
            to: "/architecture/overview/decentralization-roadmap",
            from: [
              "/use-mainnet/decentralization-roadmap",
              "/decentralization-roadmap",
            ],
          },
          {
            to: "/architecture/overview/transaction-lifecycle",
            from: "/architecture/transaction-lifecycle",
          },
          {
            to: "/architecture/overview/network-data",
            from: "/architecture/network-data",
          },
          {
            to: "/architecture/stack/bridges",
            from: "/architecture/bridges",
          },
          {
            to: "/architecture/stack/canonical-msg-service",
            from: "/architecture/canonical-msg-service",
          },
          {
            to: "/architecture/stack/coordinator",
            from: "/architecture/coordinator",
          },
          {
            to: "/architecture/stack/evm-state-manager",
            from: "/architecture/evm-state-manager",
          },
          {
            to: "/architecture/stack/sequencer",
            from: "/architecture/sequencer",
          },
          {
            to: "/architecture/stack/trace-expansion-proving",
            from: "/architecture/trace-expansion-proving",
          },
          {
            to: "/developers/guides/gas/gas-on-linea",
            from: "/use-mainnet/gas-on-linea",
          },
          {
            to: "/developers/tooling/cross-chain/shortcuts",
            from: "/build-on-linea/tooling/cross-chain/shortcuts",
          },
          {
            to: "/developers/tooling/node-providers",
            from: "/build-on-linea/tooling/node-providers",
          },
          {
            to: "/developers/linea-version",
            from: "/build-on-linea/linea-version",
          },
          {
            to: "/developers/quickstart",
            from: "/developers/quickstart/goerli-to-sepolia",
          },
          {
            to: "/developers/tooling/data-indexers/dipdup/overview",
            from: "/developers/tooling/data-indexers/dipdup",
          },
          {
            to: "/developers/quickstart",
            from: "/build-on-linea/quickstart",
          },
          {
            to: "/",
            from: "/use-mainnet",
          },
          {
            to: "/developers/tooling",
            from: "/build-on-linea/tooling",
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
      innerHTML: `window.lightningjs||function(n){function e(e,t){var i,r,a,o,d,l;return t&&(t+=(/\\?/.test(t)?"&":"?")+"lv=1"),n[e]||(i=window,r=document,a=e,o=r.location.protocol,d="load",l=0,function(){n[a]=function(){var t=arguments,r=this,o=++l,d=r&&r!=i&&r.id||0;function s(){return s.id=o,n[a].apply(s,arguments)}return(e.s=e.s||[]).push([o,d,t]),s.then=function(n,t,i){var r=e.fh[o]=e.fh[o]||[],a=e.eh[o]=e.eh[o]||[],d=e.ph[o]=e.ph[o]||[];return n&&r.push(n),t&&a.push(t),i&&d.push(i),s},s};var e=n[a]._={};function s(){e.P(d),e.w=1,n[a]("_load")}e.fh={},e.eh={},e.ph={},e.l=t?t.replace(/^\\\/\\\//,("https:"==o?o:"http:")+"//"):t,e.p={0:+new Date},e.P=function(n){e.p[n]=new Date-e.p[0]},e.w&&s(),i.addEventListener?i.addEventListener(d,s,!1):i.attachEvent("onload",s);var c=function(){function n(){return["<!DOCTYPE ",o,"><",o,"><head></head><",t,"><",i,' src="',e.l,'"></',i,"></",t,"></",o,">"].join("")}var t="body",i="script",o="html",d=r[t];if(!d)return setTimeout(c,100);e.P(1);var l,s=r.createElement("div"),h=s.appendChild(r.createElement("div")),u=r.createElement("iframe");s.style.display="none",d.insertBefore(s,d.firstChild).id="lightningjs-"+a,u.frameBorder="0",u.id="lightningjs-frame-"+a,/MSIE[ ]+6/.test(navigator.userAgent)&&(u.src="javascript:false"),u.allowTransparency="true",h.appendChild(u);try{u.contentWindow.document.open()}catch(n){e.domain=r.domain,l="javascript:var d=document.open();d.domain='"+r.domain+"';",u.src=l+"void(0);"}try{var p=u.contentWindow.document;p.write(n()),p.close()}catch(e){u.src=l+'d.write("'+n().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}e.P(2)};e.l&&c()}()),n[e].lv="1",n[e]}var t=window.lightningjs=e("lightningjs");t.require=e,t.modules=n}({}),window.usabilla_live=lightningjs.require("usabilla_live","//w.usabilla.com/28fb46af8693.js");`,
    },
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
        document.addEventListener('DOMContentLoaded', function() {
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
        });
      `,
    },
  ],
};

module.exports = config;
