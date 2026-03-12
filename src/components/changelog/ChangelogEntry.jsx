import React from 'react';
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

export function ChangelogEntry({ tag, title, children }) {
  const tagClass = TAG_STYLE_MAP[tag] || styles.tag;
  const label = TAG_LABEL[tag] || tag;
  return (
    <div className={styles.entry}>
      <div className={styles.tagCol}>
        <span className={tagClass}>{label}</span>
      </div>
      <div className={styles.contentCol}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export function ChangelogDate({ mainnet, sepolia, children }) {
  if (children) {
    return <div className={styles.dates}>{children}</div>;
  }
  return (
    <div className={styles.dates}>
      {mainnet && (
        <div className={styles.date}>
          <span className={styles.dateArrow}>→</span>
          <span>Linea Mainnet: {mainnet}</span>
        </div>
      )}
      {sepolia && (
        <div className={styles.date}>
          <span className={styles.dateArrow}>→</span>
          <span>Linea Sepolia: {sepolia}</span>
        </div>
      )}
    </div>
  );
}

export function ChangelogSubtitle({ children }) {
  return <p className={styles.subtitle}>{children}</p>;
}
