import React from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import styles from './styles.module.css';
import featuredArticles from '../FeaturedArticles.json';

const StarIcon = () => (
  <svg className={styles.featuredIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 842.319 810.161">
    <path
      d="M508.066,63.21l51.462,158.383c3.437,10.576,13.292,17.737,24.413,17.737h166.533c88.618,0,125.463,113.399,53.77,165.487l-134.728,97.886c-8.997,6.537-12.762,18.123-9.325,28.699l51.462,158.383c27.384,84.28-69.078,154.365-140.772,102.277l-134.728-97.886c-8.997-6.537-21.18-6.537-30.176,0l-134.728,97.886c-71.693,52.088-168.156-17.996-140.772-102.277l51.462-158.383c3.437-10.576-.328-22.163-9.325-28.699l-134.728-97.886C-33.809,352.729,3.037,239.33,91.654,239.33h166.533c11.121,0,20.977-7.161,24.413-17.737l51.462-158.383c27.384-84.28,146.619-84.28,174.003,0Z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
)

function sortItems(items) {
  return items.sort((a, b) => {
    // Sort featured items first, then alphabetically by label
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.label.localeCompare(b.label);
  });
}

function DocCardListForCurrentSidebarCategory({className}) {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} />;
}

function DocCardListItem({item}) {
  return (
    <article className={clsx(styles.docCardListItem, 'col col--6')}>
      <DocCard item={item} />
    </article>
  );
}

export default function DocCardList(props) {
  const { items, className } = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }

  // Enrich items with featured status
  const enrichedItems = items.map(item => {
    if (item.type === 'link' && item.docId) {
      item.featured = featuredArticles[item.docId] || false;
    }
    return item;
  });

  const sortedItems = sortItems(filterDocCardListItems(enrichedItems));

  const featuredItems = sortedItems.filter(item => item.featured);
  const regularItems = sortedItems.filter(item => !item.featured);

  return (
    <div>
      {featuredItems.length > 0 && (
        <>
          <h2 className={clsx(styles.sectionTitle, styles.featuredTitle)}>
            Featured Articles <StarIcon />
          </h2>
          <section className={clsx(styles.docCardListContainer, 'row', className)}>
            {featuredItems.map((item, index) => (
              <article
                key={index}
                className={clsx(styles.docCardArticle, 'col col--6 margin-bottom--lg', styles.featuredCardArticle)}>
                <DocCard item={item} />
              </article>
            ))}
          </section>
        </>
      )}

      {regularItems.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>
            Categories
          </h2>
          <section className={clsx(styles.docCardListContainer, 'row', className)}>
            {regularItems.map((item, index) => (
              <article key={index} className={clsx(styles.docCardArticle, 'col col--6 margin-bottom--lg')}>
                <DocCard item={item} />
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
