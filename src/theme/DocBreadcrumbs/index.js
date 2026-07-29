import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useDocsSidebar,
  useSidebarBreadcrumbs,
} from "@docusaurus/plugin-content-docs/client";
import { useHomePageRoute } from "@docusaurus/theme-common/internal";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import HomeBreadcrumbItem from "@theme/DocBreadcrumbs/Items/Home";
import DocBreadcrumbsStructuredData from "@theme/DocBreadcrumbs/StructuredData";
import styles from "./styles.module.css";

/** Map each docs sidebar to its top-level navbar section. */
const SIDEBAR_SECTIONS = {
  networkSidebar: {
    label: "Linea Mainnet",
    href: "/network/quickstart",
  },
  stackSidebar: {
    label: "Lineth Stack",
    href: "/stack",
  },
  protocolSidebar: {
    label: "Protocol",
    href: "/protocol/quickstart",
  },
  referenceSidebar: {
    label: "Reference",
    href: "/reference",
  },
  changelogSidebar: {
    label: "Changelog",
    href: "/changelog/release-notes",
  },
};

function getSectionItem(sidebarName) {
  if (!sidebarName) {
    return null;
  }
  return SIDEBAR_SECTIONS[sidebarName] ?? null;
}

function normalizeHref(href) {
  if (!href || href === "/") {
    return href;
  }
  return href.replace(/\/+$/, "");
}

function BreadcrumbsItemLink({ children, href, isLast }) {
  const className = "breadcrumbs__link";
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({ children, active }) {
  return (
    <li
      className={clsx("breadcrumbs__item", {
        "breadcrumbs__item--active": active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const sidebar = useDocsSidebar();

  if (!breadcrumbs) {
    return null;
  }

  const sectionItem = getSectionItem(sidebar?.name);

  // Always include the top-level section. On section landing pages the first
  // crumb is the same route (e.g. Overview → /stack); replace it
  // with the section label so we show "Lineth Stack" instead of omitting it.
  let allItems = breadcrumbs;
  if (sectionItem) {
    const sectionHref = normalizeHref(sectionItem.href);
    const rest = breadcrumbs.filter(
      (item, idx) => !(idx === 0 && normalizeHref(item.href) === sectionHref),
    );
    allItems = [
      { label: sectionItem.label, href: sectionItem.href, _isSection: true },
      ...rest,
    ];
  }

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={allItems} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: "theme.docs.breadcrumbs.navAriaLabel",
          message: "Breadcrumbs",
          description: "The ARIA label for the breadcrumbs",
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            const href = item._isSection
              ? item.href
              : item.type === "category" && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
