import React from "react";
import clsx from "clsx";
import { ThemeClassNames, useWindowSize } from "@docusaurus/theme-common";
import {
  useDoc,
  useSidebarBreadcrumbs,
} from "@docusaurus/plugin-content-docs/client";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import TOCCollapsible from "@theme/TOCCollapsible";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import ContentVisibility from "@theme/ContentVisibility";
import styles from "./styles.module.css";
import ToolingCTA from "../../../components/ToolingCTA";
import ContractsWarning from "../../../components/ContractsWarning";
import CopyPageButton from "../../../components/CopyPageButton";
import FeedbackWidget from "../../../components/FeedbackWidget";

const RELEASE_NOTES_PERMALINK = "/changelog/release-notes";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getReleaseDateText(meta) {
  if (!meta) {
    return null;
  }

  if (meta.date) {
    return meta.date;
  }

  if (meta.mainnet) {
    return meta.mainnet;
  }

  if (meta.sepolia) {
    return meta.sepolia;
  }

  return meta.phase || null;
}

function getReleaseNotesMobileValue(item, meta) {
  if (!meta) {
    return item.value;
  }

  const label = meta.label;
  const date = getReleaseDateText(meta);

  if (!label && !date) {
    return item.value;
  }

  return [
    `<span class="release-notes-mobile-toc__version">${item.value}</span>`,
    label
      ? `<span class="release-notes-mobile-toc__feature">${escapeHtml(label)}</span>`
      : null,
    date
      ? `<span class="release-notes-mobile-toc__date">${escapeHtml(date)}</span>`
      : null,
  ]
    .filter(Boolean)
    .join("");
}

function enrichReleaseNotesMobileTOC(toc, releaseMeta) {
  if (!releaseMeta) {
    return toc;
  }

  return toc.map((item) => ({
    ...item,
    value: getReleaseNotesMobileValue(item, releaseMeta[item.id]),
  }));
}

function ReleaseNotesMobileTOC({ toc, frontMatter }) {
  const enrichedToc = React.useMemo(
    () => enrichReleaseNotesMobileTOC(toc, frontMatter.release_toc),
    [frontMatter.release_toc, toc],
  );

  return (
    <TOCCollapsible
      toc={enrichedToc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={clsx(
        ThemeClassNames.docs.docTocMobile,
        "release-notes-mobile-toc",
      )}
    />
  );
}

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, metadata, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const isReleaseNotesPage = metadata.permalink === RELEASE_NOTES_PERMALINK;
  const mobile = canRender ? (
    isReleaseNotesPage ? (
      <ReleaseNotesMobileTOC toc={toc} frontMatter={frontMatter} />
    ) : (
      <DocItemTOCMobile />
    )
  ) : undefined;
  const desktop =
    canRender && (windowSize === "desktop" || windowSize === "ssr") ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  const breadcrumbs = useSidebarBreadcrumbs();

  // Get parent category label from breadcrumbs
  // Find the last category-type breadcrumb (parent category)
  const categoryLabel = breadcrumbs
    ?.slice()
    .reverse()
    .find((item) => item.type === "category")?.label;

  const hideCopyButton = metadata.frontMatter?.hide_copy_button;

  return (
    <div className="row">
      <div className={clsx("col", !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <div className={styles.titleRow}>
              {categoryLabel && (
                <span className={styles.categoryLabel}>{categoryLabel}</span>
              )}
              <div className={styles.titleRowRight}>
                <DocVersionBadge />
                {!hideCopyButton && <CopyPageButton />}
              </div>
            </div>
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <ToolingCTA />
            <ContractsWarning />
            <FeedbackWidget key={metadata.permalink} />
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
