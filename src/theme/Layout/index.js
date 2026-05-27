import React from "react";
import OriginalLayout from "@theme-original/Layout";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

function getMarkdownPath(pathname) {
  if (!pathname || pathname === "/") {
    return "/index.md";
  }

  return `${pathname.replace(/\/$/, "")}.md`;
}

function AgentDirective() {
  const { pathname } = useLocation();
  const markdownPath = getMarkdownPath(pathname);

  return (
    <div className={styles.agentDirective}>
      For AI agents: see <a href="/llms.txt">llms.txt</a> for the complete Linea
      documentation index. This page is available as Markdown at{" "}
      <a href={markdownPath}>{markdownPath}</a>.
    </div>
  );
}

export default function Layout(props) {
  return (
    <OriginalLayout {...props}>
      <AgentDirective />
      {props.children}
    </OriginalLayout>
  );
}
