import React from "react";
import OriginalLayout from "@theme-original/Layout";
import { useLocation } from "@docusaurus/router";
import Head from "@docusaurus/Head";

function getMarkdownPath(pathname) {
  if (!pathname || pathname === "/") {
    return "/index.md";
  }

  return `${pathname.replace(/\/$/, "")}.md`;
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
      <link
        rel="alternate"
        type="text/markdown"
        href={markdownPath}
        title="Markdown version of this page"
      />
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
