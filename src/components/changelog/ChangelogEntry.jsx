import React from 'react';

const TAG_CONFIG = {
  feature: { label: 'Feature' },
  upgrade: { label: 'Upgrade' },
  performance: { label: 'Performance' },
  announcement: { label: 'Announcement' },
  'action-required': { label: 'Action required' },
  deprecation: { label: 'Deprecation' },
};

export function ChangelogEntry({ tag, title, children }) {
  const config = TAG_CONFIG[tag] || { label: tag };
  return (
    <div className="changelog-entry">
      <div className="changelog-entry__header">
        <span className={`changelog-tag changelog-tag--${tag}`}>{config.label}</span>
        {title && <span className="changelog-entry__title">{title}</span>}
      </div>
      <div className="changelog-entry__body">{children}</div>
    </div>
  );
}

export function ChangelogDate({ mainnet, sepolia, children }) {
  if (children) {
    return <div className="changelog-dates">{children}</div>;
  }
  return (
    <div className="changelog-dates">
      {mainnet && (
        <div className="changelog-date">
          <span className="changelog-date__arrow">→</span>
          <span>Linea Mainnet: {mainnet}</span>
        </div>
      )}
      {sepolia && (
        <div className="changelog-date">
          <span className="changelog-date__arrow">→</span>
          <span>Linea Sepolia: {sepolia}</span>
        </div>
      )}
    </div>
  );
}
