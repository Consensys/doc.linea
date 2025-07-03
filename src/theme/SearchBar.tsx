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
        "- Linea is a next-generation zkEVM rollup network designed to scale Ethereum while preserving its security and decentralization.\n" +
        "- Built by Consensys, Linea leverages zero-knowledge proofs to enable fast, low-cost transactions with full EVM equivalence, allowing seamless deployment of existing Ethereum smart contracts and tooling.\n" +
        "- Linea's robust ecosystem supports developers with familiar tools like Hardhat, Foundry, and Truffle, and offers comprehensive APIs for easy integration.\n" +
        "- The network features a secure, trust-minimized bridge for asset transfers between Ethereum and Linea, and is home to a rapidly growing community of dApps, DeFi protocols, and infrastructure partners.\n" +
        "- Linea is committed to open innovation, scalability, and user experience, making it an ideal platform for building the next wave of decentralized applications.",
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
    features: {
      // Conversational memory for context-aware follow-up questions
      conversationalMemory: {
        enabled: true,
        sessionDuration: 3600, // Session duration in seconds (default: 1 hour)
      },

      // Multi-source search (GitHub, blog, changelog integration)
      multiSource: {
        enabled: true,
        // GitHub integration for issues and discussions
        github: {
          repo: "Consensys/doc.linea", // Your GitHub repository
          // Note: GitHub Personal Access Token should be configured in the backend environment
          // as GITHUB_TOKEN for security reasons
          searchTypes: ["issues"], // What to search
          maxResults: 5, // Max results from GitHub (default: 5)
        },
        // Blog search integration
        blog: {
          url: "https://linea.build/blog",
          platform: "generic", // 'wordpress', 'ghost', 'medium', or 'generic'
          maxResults: 3, // Max blog posts to include (default: 3)
        },
        // Source weighting for result aggregation
        aggregationWeights: {
          documentation: 0.9, // Primary weight for docs
          github: 0.05, // Secondary weight for GitHub
          blog: 0.05, // Tertiary weight for blog
        },
      },

      // Other advanced features
      queryUnderstanding: true, // Enhanced query analysis (default: true)
      intelligentRanking: true, // Smart result ranking (default: true)
      followUpSuggestions: false, // Generate follow-up questions (default: true)
      qualityScoring: true, // Answer quality assessment (default: true)
    },
  };
  // @ts-ignore
  return <DocusaurusAISearch themeConfig={themeConfig} aiConfig={aiConfig} />;
}
