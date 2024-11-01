require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to calculate the daily increase using "Range", matching the "Reduce" transformation in Grafana
const calculateDailyIncrease = (values) => {
  // Sort values by timestamp to ensure they're in order
  values.sort((a, b) => a[0] - b[0]);

  // Calculate the total time range in days
  const timeRangeDays = (values[values.length - 1][0] - values[0][0]) / (24 * 60 * 60);

  // Find the minimum and maximum values
  const minValue = Math.min(...values.map(v => parseFloat(v[1])));
  const maxValue = Math.max(...values.map(v => parseFloat(v[1])));

  // Calculate the range (difference between max and min)
  const rangeIncrease = maxValue - minValue;

  // Convert to daily increase
  const dailyIncrease = rangeIncrease / timeRangeDays;

  return dailyIncrease;
};

const fetchData = async () => {
  console.log('Starting data fetch...');

  const user = process.env.LINEA_OBSERVABILITY_USER;
  const password = process.env.LINEA_OBSERVABILITY_PASS;
  const baseUrl = 'https://mimir.o11y.web3factory.consensys.net/prometheus/api/v1/query_range';

  const configFilePath = path.join(__dirname, '../linea-node-size/config.json');
  console.log(`Reading configuration from ${configFilePath}`);
  const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

  const results = [];

  for (const { network, cluster, pvc } of config) {
    console.log(`Fetching data for network: ${network}, cluster: ${cluster}, pvc: ${pvc}`);

    // Subtracts available bytes from capacity bytes to get the used bytes
    const query = `
      sum without(instance, node) (topk(1, (kubelet_volume_stats_capacity_bytes{linea_network="${network}", cluster="${cluster}", persistentvolumeclaim="${pvc}", job="kubelet", metrics_path="/metrics"})))
      -
      sum without(instance, node) (topk(1, (kubelet_volume_stats_available_bytes{linea_network="${network}", cluster="${cluster}", persistentvolumeclaim="${pvc}", job="kubelet", metrics_path="/metrics"})))
    `;

    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - 24 * 60 * 60; // 24 hours ago
    const step = 120; // 2 minutes, matching Grafana's step size

    const url = `${baseUrl}?query=${encodeURIComponent(query)}&start=${startTime}&end=${endTime}&step=${step}`;
    console.log(`Constructed URL: ${url}`);

    try {
      const response = await axios.get(url, {
        auth: {
          username: user,
          password: password,
        },
      });

      console.log(`Response received for network: ${network}, cluster: ${cluster}, pvc: ${pvc}`);
      const result = response.data.data.result[0];
      let values = result.values;

      console.log(`Number of data points received: ${values.length}`);
      
      if (values.length >= 2) {
        const startTime = new Date(values[0][0] * 1000);
        const endTime = new Date(values[values.length - 1][0] * 1000);
        const timeDiffHours = (endTime - startTime) / (1000 * 60 * 60);
        console.log(`Time range: ${startTime.toISOString()} to ${endTime.toISOString()}`);
        console.log(`Time difference: ${timeDiffHours.toFixed(2)} hours`);
      }

      // Filter out invalid data points
      values = values.filter(value => !isNaN(parseFloat(value[1])));
      if (values.length !== result.values.length) {
        console.warn(`Filtered out ${result.values.length - values.length} invalid data points for ${pvc}`);
      }

      // Total size = last value in the series
      const totalSize = parseFloat(values[values.length - 1][1]);
      // Daily increase calculated using the "Range" method
      const dailyIncrease = calculateDailyIncrease(values);

      console.log(`${pvc} - Total size: ${totalSize} bytes (${(totalSize / (1024 * 1024 * 1024)).toFixed(2)} GiB)`);
      console.log(`${pvc} - Daily increase: ${dailyIncrease} bytes (${(dailyIncrease / (1024 * 1024 * 1024)).toFixed(2)} GiB)`);

      results.push({
        network,
        cluster,
        pvc,
        totalSize,
        dailyIncrease,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`Error fetching data for ${network}, ${cluster}, ${pvc}:`, err);
    }
  }

  // Write data to /linea-node-size/data.json
  const dataFilePath = path.join(__dirname, '../linea-node-size/data.json');
  console.log(`Writing results to ${dataFilePath}`);
  fs.writeFileSync(dataFilePath, JSON.stringify(results, null, 2));
  console.log('Node size data fetched and saved.');
};

fetchData();