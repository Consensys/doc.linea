// components/LastUpdated.js
import React from "react";
import nodeSizeData from "../../linea-node-size/data.json";

const LastUpdated = () => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLatestTimestamp = (data) => {
    let latestTimestamp = null;

    const years = Object.keys(data).sort((a, b) => b - a); // Sort years descending

    for (const year of years) {
      const weeks = Object.keys(data[year]).sort((a, b) => b - a); // Sort weeks descending

      for (const week of weeks) {
        if (data[year][week].length > 0) {
          // Assuming the timestamp is the same for all entries in a week
          latestTimestamp = data[year][week][0].timestamp;
          return latestTimestamp;
        }
      }
    }

    return latestTimestamp;
  };

  const latestTimestamp = getLatestTimestamp(nodeSizeData);

  if (!latestTimestamp) {
    return (
      <p>
        <em>No update data available</em>
      </p>
    );
  }

  return (
    <p>
      <em>Last updated: {formatDate(latestTimestamp)}</em>
    </p>
  );
};

export default LastUpdated;
