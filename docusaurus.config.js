const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");
const redirectsData = require("./redirects.json");

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
    "Everything you need to build onchain.",
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
    { src: "/js/getfeedback.js", defer: true, async: true },
    { src: "/js/navbarHighlight.js", defer: true },
  ],

  markdown: {
    mermaid: true,
  },

  // Enable experimental infrastructure for Docusaurus Faster project
  future: {
    experimental_faster: true,
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
          remarkPlugins: [
            require("remark-docusaurus-tabs"),
            math
          ],
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
          '📣 <strong>Linea ENS</strong> is now available! Visit the <a href="https://names.linea.build/" target="blank">app</a>, <a href="https://support.linea.build/general/ens" target="blank">user guide</a>, or our <a href="https://docs.linea.build/get-started/tooling/cross-chain/ccip-read-gateway" target="blank">developer guidance</a> on reusing its architecture.',
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
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: "Docs",
        logo: {
          alt: "Linea",
          src: "img/Linea_docs_logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "get-started/index",
            position: "left",
            label: "Get started",
          },
          {
            type: "doc",
            docId: "learn/index",
            position: "left",
            label: "Learn",
          },
          {
            type: "doc",
            docId: "api/index",
            position: "left",
            label: "API & SDK",
          },
          {
            type: "doc",
            docId: "release-notes",
            position: "right",
            label: "Release notes",
          },
          {
            href: "https://discord.gg/linea",
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
                label: "Status",
                href: "https://linea.statuspage.io/",
              },
              {
                label: "Mainnet block explorer",
                href: "https://lineascan.build",
              },
              {
                label: "Risk disclosures",
                href: "/risk-disclosures",
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
