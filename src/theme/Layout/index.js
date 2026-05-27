import React from "react";
import OriginalLayout from "@theme-original/Layout";
import { useLocation } from "@docusaurus/router";
import Head from "@docusaurus/Head";

const MARKDOWN_ALTERNATE_SKIPPED_PATHS = new Set(["/search"]);

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/$/, "");
}

function getMarkdownPath(pathname) {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") {
    return "/index.md";
  }

  return `${normalized}.md`;
}

function hasMarkdownAlternate(pathname) {
  return !MARKDOWN_ALTERNATE_SKIPPED_PATHS.has(normalizePathname(pathname));
}

function AgentLinks() {
  const { pathname } = useLocation();
  const markdownPath = getMarkdownPath(pathname);

  return (
    <Head>
      <link
        rel="alternate"
        type="text/plain"
        href="/llms.txt"
        title="Linea documentation index"
      />
      {hasMarkdownAlternate(pathname) && (
        <link
          rel="alternate"
          type="text/markdown"
          href={markdownPath}
          title="Markdown version of this page"
        />
      )}
    </Head>
  );
}

export default function Layout(props) {
  return (
    <OriginalLayout {...props}>
      <AgentLinks />
      {props.children}
    </OriginalLayout>
  );
}
