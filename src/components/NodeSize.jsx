import React from 'react';
import nodeSizeData from '../../linea-node-size/data.json';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024; // Use 1024 for GiB/TiB
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const NodeSize = ({ network, cluster, pvc }) => {
  const data = nodeSizeData.find(item => item.network === network && item.cluster === cluster && item.pvc === pvc);

  if (!data) {
    return <span>No data available</span>;
  }

  return (
    <span>Total size {formatBytes(data.totalSize)}; increasing by {formatBytes(data.dailyIncrease)} daily</span>
  );
};

export default NodeSize;