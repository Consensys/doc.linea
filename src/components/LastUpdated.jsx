// components/LastUpdated.js
import React from 'react';
import nodeSizeData from '../../linea-node-size/data.json';

const LastUpdated = () => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <p>
      <em>Last updated: {formatDate(nodeSizeData[0].timestamp)} UTC</em>
    </p>
  );
};

export default LastUpdated;