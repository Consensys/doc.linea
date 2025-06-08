import React from "react";
import { DocusaurusAISearch } from "docusaurus-openai-search";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function SearchBar() {
  const {
    siteConfig: { themeConfig },
  } = useDocusaurusContext();

  // AI search configuration
  const aiConfig = {
    backend: {
      url: "https://linea-docusaurus-openai-search-back.vercel.app",
    },
    context: {
      siteName: "Linea Documentation",
      systemContext:
        "ABOUT LINEA:\n" +
        "- Linea is a ZK-rollup scaling solution for Ethereum that provides fast, low-cost transactions with Ethereum-level security\n" +
        "- Linea offers a developer-friendly environment with EVM equivalence, making it easy to deploy existing Ethereum applications\n" +
        "- The ecosystem includes tools for bridging assets between Ethereum and Linea, as well as a growing network of dApps and integrations\n" +
        "- Linea is built by Consensys and designed to maintain Ethereum's security guarantees while improving scalability\n" +
        "- Compatible with popular Ethereum development tools like Hardhat, Foundry, and Truffle, with full support for standard Ethereum APIs",
    },
    ui: {
      aiButtonText: "Ask Linea AI",
      modalTitle: "Linea AI Assistant",
      footerText: "Powered by Linea AI",
      searchButtonText: "Search with AI",
      searchButtonAriaLabel: "Search with Linea AI",
      showSearchButtonShortcut: false,
      useCustomSearchButton: true,
    },
    enableLogging: true,
    enableCaching: true,
    recaptcha: {
      siteKey: "6Ldov1krAAAAAEusVTpPxNhXpONbPJbOU77rA_ck",
    },
  };
  // @ts-ignore
  return <DocusaurusAISearch themeConfig={themeConfig} aiConfig={aiConfig} />;
}
