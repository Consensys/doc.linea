import React from 'react';
import nodeSizeData from '../../linea-node-size/data.json';

const NodeSize = ({ network, cluster, pvc }) => {
  const data = nodeSizeData.find(item => item.network === network && item.cluster === cluster && item.pvc === pvc);

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <p>Total size: {data.totalSize}</p>
      <p>Daily increase: {data.dailyIncrease}</p>
    </div>
  );
};

export default NodeSize;