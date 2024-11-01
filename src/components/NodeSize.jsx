import React from 'react';
import nodeSizeData from '../../linea-node-size/data.json';

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

const NodeSize = ({ network, cluster, pvc }) => {
  const data = nodeSizeData.find(item => item.network === network && item.cluster === cluster && item.pvc === pvc);

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <p>Total size: {formatBytes(data.totalSize)}</p>
      <p>Daily increase: {formatBytes(data.dailyIncrease)}</p>
      <p>Last updated: {new Date(data.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default NodeSize;