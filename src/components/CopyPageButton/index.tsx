import React, { useEffect, useRef, useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import styles from "./styles.module.css";
import { getGitHubRawUrl } from "./utils";

export default function CopyPageButton(): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { metadata } = useDoc();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen((v) => !v);
  };

  const handleCopyPage = async () => {
    const rawUrl = getGitHubRawUrl(metadata.editUrl);
    if (!rawUrl) return;

    try {
      const response = await fetch(rawUrl);
      if (!response.ok) throw new Error("Failed to fetch");
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy page:", error);
    }
    setIsOpen(false);
  };

  const handleViewAsMarkdown = () => {
    const rawUrl = getGitHubRawUrl(metadata.editUrl);
    if (rawUrl) {
      window.open(rawUrl, "_blank");
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleTriggerClick}
        aria-label="Copy page options"
        aria-expanded={isOpen}
        aria-haspopup="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true">
          <rect
            x="5"
            y="5"
            width="9"
            height="9"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 11V3C3 2.44772 3.44772 2 4 2H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>{copied ? "Copied" : "Copy page"}</span>
        <svg
          width="9"
          height="13"
          viewBox="0 0 9 13"
          fill="none"
          aria-hidden="true"
          className={isOpen ? styles.chevronOpen : styles.chevron}>
          <path
            d="M1 1L7 6.5L1 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={handleCopyPage}
            role="menuitem">
            <span className={styles.itemTitle}>Copy page</span>
            <span className={styles.itemSubtitle}>
              Copy page as Markdown for LLMs
            </span>
          </button>
          <button
            type="button"
            className={styles.dropdownItem}
            onClick={handleViewAsMarkdown}
            role="menuitem">
            <span className={styles.itemTitle}>View as Markdown</span>
            <span className={styles.itemSubtitle}>
              View this page as plain text
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
