import React from "react";
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from "@docusaurus/plugin-content-docs/client";
import DocCard from "@theme/DocCard";
import styles from "./styles.module.css";
import featuredArticles from "../FeaturedArticles.json";

function sortItems(items) {
  return items.sort((a, b) => {
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

  const enrichedItems = items.map((item) => {
    if (item.type === "link" && item.docId) {
      item.featured = featuredArticles[item.docId] || false;
    }
    return item;
  });

  const sortedItems = sortItems(filterDocCardListItems(enrichedItems));

  return (
    <div className={styles.grid}>
      {sortedItems.map((item, index) => (
        <DocCard key={index} item={item} />
      ))}
    </div>
  );
}

export default DocCardList;
