import React, { useMemo } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import {
  useFilteredAndTreeifiedTOC,
  useTOCHighlight,
} from "@docusaurus/theme-common/internal";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import TOC from "@theme/TOC";
import styles from "./styles.module.css";

const LINK_CLASS_NAME = "table-of-contents__link toc-highlight";
const LINK_ACTIVE_CLASS_NAME = "table-of-contents__link--active";

const GENERIC_CHILD_LABELS = new Set([
  "summary",
  "features",
  "breaking changes",
]);

function toPlainText(value) {
  let text = value;
  while (/<[^>]+>/.test(text)) {
    text = text.replace(/<[^>]+>/g, "");
  }
  return text.replace(/\s+/g, " ").trim();
}

function getDisplayLabel(item, parentLabel) {
  const plainLabel = toPlainText(item.value);
  if (parentLabel && GENERIC_CHILD_LABELS.has(plainLabel.toLowerCase())) {
    return `${parentLabel}: ${plainLabel}`;
  }
  return plainLabel;
}

function getMetaText(meta) {
  if (!meta) return null;
  const date = meta.date || meta.mainnet;
  const parts = [meta.label, date].filter(Boolean);
  if (parts.length) return parts.join(" · ");
  return meta.phase || null;
}

function ReleaseNotesTOCItems({ items, parentLabel, releaseMeta }) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={clsx(styles.list, parentLabel && styles.childList)}>
      {items.map((item) => {
        const displayLabel = getDisplayLabel(item, parentLabel);
        const plainLabel = toPlainText(item.value);
        const metaText = !parentLabel
          ? getMetaText(releaseMeta?.[item.id])
          : null;

        return (
          <li
            key={item.id}
            className={clsx(styles.item, !parentLabel && styles.releaseItem)}>
            <Link
              to={`#${item.id}`}
              className={clsx(
                LINK_CLASS_NAME,
                styles.link,
                !parentLabel ? styles.releaseLink : styles.childLink,
              )}>
              <span className={styles.label}>{displayLabel}</span>
              {metaText && <span className={styles.meta}>{metaText}</span>}
            </Link>
            <ReleaseNotesTOCItems
              items={item.children}
              parentLabel={plainLabel}
              releaseMeta={releaseMeta}
            />
          </li>
        );
      })}
    </ul>
  );
}

function ReleaseNotesTOC({
  toc,
  releaseMeta,
  className,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
}) {
  const themeConfig = useThemeConfig();
  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });

  const tocHighlightConfig = useMemo(
    () => ({
      linkClassName: LINK_CLASS_NAME,
      linkActiveClassName: LINK_ACTIVE_CLASS_NAME,
      minHeadingLevel,
      maxHeadingLevel,
    }),
    [minHeadingLevel, maxHeadingLevel],
  );

  useTOCHighlight(tocHighlightConfig);

  return (
    <div className={clsx(styles.root, "release-notes-toc", className)}>
      <div className={styles.heading}>Release history</div>
      <div className={clsx(styles.scrollArea, "thin-scrollbar")}>
        <ReleaseNotesTOCItems items={tocTree} releaseMeta={releaseMeta} />
      </div>
    </div>
  );
}

export default function DocItemTOCDesktop() {
  const { toc, frontMatter, metadata } = useDoc();
  const isReleaseNotesPage = metadata.permalink === "/changelog/release-notes";

  if (!isReleaseNotesPage) {
    return (
      <TOC
        toc={toc}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={ThemeClassNames.docs.docTocDesktop}
      />
    );
  }

  return (
    <ReleaseNotesTOC
      toc={toc}
      releaseMeta={frontMatter.release_toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
    />
  );
}
