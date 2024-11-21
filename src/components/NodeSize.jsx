import React from "react";
import nodeSizeData from "../../linea-node-size/data.json";

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1000; // Use 1000 for KB/MB/GB
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const getLatestData = (nodeSizeData, network, cluster, pvc) => {
  const years = Object.keys(nodeSizeData).sort((a, b) => b - a); // Sort years descending

  for (const year of years) {
    const weeks = Object.keys(nodeSizeData[year]).sort((a, b) => b - a); // Sort weeks descending

    for (const week of weeks) {
      const data = nodeSizeData[year][week].find(
        (item) =>
          item.network === network &&
          item.cluster === cluster &&
          item.pvc === pvc,
      );

      if (data) {
        return data;
      }
    }
  }

  return null;
};

const NodeSize = ({ network, cluster, pvc }) => {
  const data = getLatestData(nodeSizeData, network, cluster, pvc);

  if (!data) {
    return <span>No data available</span>;
  }

  return (
    <span>
      Total size {formatBytes(data.totalSize)}; increasing by{" "}
      {formatBytes(data.dailyIncrease)} daily
    </span>
  );
};

export default NodeSize;
