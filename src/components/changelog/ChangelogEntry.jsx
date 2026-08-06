import React from 'react';
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import styles from './styles.module.css';

const TAG_STYLE_MAP = {
  feature: styles.tagFeature,
  upgrade: styles.tagUpgrade,
  performance: styles.tagPerformance,
  announcement: styles.tagAnnouncement,
  'action-required': styles.tagActionRequired,
  deprecation: styles.tagDeprecation,
};

const TAG_LABEL = {
  feature: 'Feature',
  upgrade: 'Upgrade',
  performance: 'Performance',
  announcement: 'Announcement',
  'action-required': 'Action required',
  deprecation: 'Deprecation',
};

const PRODUCT_STYLE_MAP = {
  mainnet: styles.productMainnet,
  lineth: styles.productLineth,
};

const PRODUCT_LABEL = {
  mainnet: 'Linea Mainnet',
  lineth: 'Lineth Stack',
};

export function ChangelogEntry({ tag, title, product, children }) {
  const tagClass = TAG_STYLE_MAP[tag] || styles.tag;
  const label = TAG_LABEL[tag] || tag;
  const products = String(product || '')
    .split(',')
    .map((p) => p.trim())
    .filter((p) => PRODUCT_LABEL[p]);
  return (
    <div className={styles.entry}>
      <div className={styles.tagCol}>
        <span className={tagClass}>{label}</span>
        {products.map((p) => (
          <span key={p} className={`${styles.productTag} ${PRODUCT_STYLE_MAP[p]}`}>
            {PRODUCT_LABEL[p]}
          </span>
        ))}
      </div>
      <div className={styles.contentCol}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export function ChangelogDate({ sectionId, mainnet, sepolia, lineth, children }) {
  const { frontMatter } = useDoc();
  const meta = sectionId ? frontMatter?.release_toc?.[sectionId] : null;

  if (children) {
    return <div className={styles.dates}>{children}</div>;
  }

  const effectiveMainnet = mainnet || meta?.mainnet;
  const effectiveSepolia = sepolia || meta?.sepolia;
  const effectiveLineth = lineth || meta?.lineth;

  if (!effectiveMainnet && !effectiveSepolia && !effectiveLineth && meta?.date) {
    return <div className={styles.dates}>{meta.date}</div>;
  }

  return (
    <div className={styles.dates}>
      {effectiveMainnet && (
        <div className={styles.date}>
          <span className={styles.dateArrow}>→</span>
          <span>Linea Mainnet: {effectiveMainnet}</span>
        </div>
      )}
      {effectiveSepolia && (
        <div className={styles.date}>
          <span className={styles.dateArrow}>→</span>
          <span>Linea Sepolia: {effectiveSepolia}</span>
        </div>
      )}
      {effectiveLineth && (
        <div className={styles.date}>
          <span className={styles.dateArrow}>→</span>
          <span>Lineth Stack: {effectiveLineth}</span>
        </div>
      )}
    </div>
  );
}

export function ChangelogSubtitle({ children }) {
  return <p className={styles.subtitle}>{children}</p>;
}
