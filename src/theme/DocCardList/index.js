import React from "react";
import clsx from "clsx";
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from "@docusaurus/plugin-content-docs/client";
import DocCard from "@theme/DocCard";
import styles from "./styles.module.css";
import featuredArticles from "../FeaturedArticles.json";

function sortItems(items) {
  return items.sort((a, b) => {
    // Sort featured items first, then alphabetically by label
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.label.localeCompare(b.label);
  });
}

function DocCardList(props) {
  const { items, className } = props;
  if (!items) {
    const currentItems = useCurrentSidebarSiblings();
    return <DocCardList items={currentItems} className={className} />;
  }

  // Enrich items with featured status
  const enrichedItems = items.map((item) => {
    if (item.type === "link" && item.docId) {
      item.featured = featuredArticles[item.docId] || false;
    }
    return item;
  });

  const sortedItems = sortItems(filterDocCardListItems(enrichedItems));

  const featuredItems = sortedItems.filter((item) => item.featured);
  const regularItems = sortedItems.filter((item) => !item.featured);

  return (
    <div>
      {featuredItems.length > 0 && (
        <>
          <h2 className={clsx(styles.sectionTitle, styles.featuredTitle)}>
            Featured
          </h2>
          <section
            className={clsx(styles.docCardListContainer, "row", className)}>
            {featuredItems.map((item, index) => (
              <article
                key={index}
                className={clsx(
                  styles.docCardArticle,
                  "col col--6 margin-bottom--lg",
                  styles.featuredCardArticle,
                )}>
                <DocCard item={item} />
              </article>
            ))}
          </section>
        </>
      )}

      {regularItems.length > 0 && (
        <>
          {featuredItems.length > 0 && (
            <h2 className={styles.sectionTitle}>More</h2>
          )}
          <section
            className={clsx(styles.docCardListContainer, "row", className)}>
            {regularItems.map((item, index) => (
              <article
                key={index}
                className={clsx(
                  styles.docCardArticle,
                  "col col--6 margin-bottom--lg",
                )}>
                <DocCard item={item} />
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default DocCardList;
