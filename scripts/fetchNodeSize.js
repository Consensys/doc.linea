require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

    const query = `
      sum without(instance, node) (topk(1, (kubelet_volume_stats_capacity_bytes{linea_network="${network}", cluster="${cluster}", persistentvolumeclaim="${pvc}", job="kubelet", metrics_path="/metrics"})))
      -
      sum without(instance, node) (topk(1, (kubelet_volume_stats_available_bytes{linea_network="${network}", cluster="${cluster}", persistentvolumeclaim="${pvc}", job="kubelet", metrics_path="/metrics"})))
    `;

    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - 24 * 60 * 60; // 24 hours ago

    const url = `${baseUrl}?query=${encodeURIComponent(query)}&start=${startTime}&end=${endTime}&step=1h`;
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
      const values = result.values;

      const startValue = parseFloat(values[0][1]);
      const endValue = parseFloat(values[values.length - 1][1]);
      const dailyIncrease = endValue - startValue;

      console.log(`Start value: ${startValue}, End value: ${endValue}, Daily increase: ${dailyIncrease}`);

      results.push({
        network,
        cluster,
        pvc,
        totalSize: endValue,
        dailyIncrease,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`Error fetching data for ${network}, ${cluster}, ${pvc}:`, err);
    }
  }

  const dataFilePath = path.join(__dirname, '../linea-node-size/data.json');
  console.log(`Writing results to ${dataFilePath}`);
  fs.writeFileSync(dataFilePath, JSON.stringify(results, null, 2));
  console.log('Node size data fetched and saved.');
};

fetchData();