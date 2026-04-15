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

const RELEASE_TOC_META = {
  "beta-v60": { phase: "Phased release" },
  "forced-transactions": { date: "13 Apr 2026 target" },
  "small-fields": { date: "1 Apr 2026" },
  "eip-7702": { date: "23 Mar 2026" },
  "beta-v50": { date: "30 Mar 2026" },
  assertions: { date: "28 Jan 2026" },
  "beta-v44": { date: "3 Dec 2025" },
  "beta-v43": { date: "17 Nov 2025" },
  "beta-v42": { date: "5 Nov 2025" },
  fusaka: { phase: "Announcement" },
  "beta-v41": { date: "30 Oct 2025" },
  "beta-v40": { date: "22-28 Oct 2025" },
  "beta-v311": { date: "6 Oct 2025" },
  "beta-v31": { date: "Aug 2025 target" },
  "beta-v30": { date: "Early Aug 2025 target" },
  "beta-v20": { date: "9 Jun 2025" },
  "beta-v10": { phase: "Phased release" },
  "beta-v14": { date: "28 Apr 2025" },
  "beta-v13": { date: "3 Mar 2025" },
  "beta-v12": { date: "With Beta v2" },
  "beta-v11": { date: "With Beta v2" },
  "alpha-v42": { date: "26 Mar 2025" },
  "alpha-v41": { date: "4 Feb 2025" },
  "alpha-v40": { date: "16 Dec 2024" },
  "alpha-v350": { date: "9 Oct 2024" },
  "alpha-v341": { date: "30 Sep 2024" },
  "alpha-v36": { date: "25 Sep 2024" },
  "alpha-v352": { date: "23 Sep 2024" },
  "alpha-v351": { phase: "Date not listed" },
  "alpha-v34": { date: "30 Jul 2024" },
  "alpha-v33": { date: "11 Jun 2024" },
  "alpha-v32": { date: "4 Jun 2024" },
  "alpha-v31": { date: "14 May 2024" },
  "alpha-v30": { date: "26 Mar 2024" },
  "february-2024": { phase: "Monthly release notes" },
  "alpha-v2": { phase: "Grouped release notes" },
  "december-2023": { phase: "Monthly release notes" },
  "november-2023": { phase: "Monthly release notes" },
  "october-2023": { phase: "Monthly release notes" },
  "summary-release-notes-june---october": { phase: "Historical summary" },
};

const GENERIC_CHILD_LABELS = new Set([
  "summary",
  "features",
  "breaking changes",
]);

function toPlainText(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getDisplayLabel(item, parentLabel) {
  const plainLabel = toPlainText(item.value);
  if (parentLabel && GENERIC_CHILD_LABELS.has(plainLabel.toLowerCase())) {
    return `${parentLabel}: ${plainLabel}`;
  }
  return plainLabel;
}

function ReleaseNotesTOCItems({ items, parentLabel }) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={clsx(styles.list, parentLabel && styles.childList)}>
      {items.map((item) => {
        const meta = RELEASE_TOC_META[item.id];
        const displayLabel = getDisplayLabel(item, parentLabel);
        const plainLabel = toPlainText(item.value);

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
              {meta?.date && <span className={styles.meta}>{meta.date}</span>}
              {!meta?.date && meta?.phase && (
                <span className={styles.meta}>{meta.phase}</span>
              )}
            </Link>
            <ReleaseNotesTOCItems
              items={item.children}
              parentLabel={plainLabel}
            />
          </li>
        );
      })}
    </ul>
  );
}

function ReleaseNotesTOC({
  toc,
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
      <div className={styles.heading}>Release chronology</div>
      <div className={clsx(styles.scrollArea, "thin-scrollbar")}>
        <ReleaseNotesTOCItems items={tocTree} />
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
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
    />
  );
}
