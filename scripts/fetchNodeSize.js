require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const calculateDailyIncrease = (values) => {
  if (values.length < 2) return 0;
  values.sort((a, b) => a[0] - b[0]);
  
  const timeRangeDays = (values[values.length - 1][0] - values[0][0]) / (24 * 60 * 60);
  const minValue = Math.min(...values.map((v) => parseFloat(v[1])));
  const maxValue = Math.max(...values.map((v) => parseFloat(v[1])));
  return (maxValue - minValue) / timeRangeDays;
};

function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const startOfYear = new Date(Date.UTC(d.getFullYear(), 0, 1));
  return Math.ceil(((date - startOfYear) / 86400000 + 1) / 7);
}

const fetchData = async () => {
  console.log("Starting data fetch...");
  const baseUrl = "https://mimir.o11y.web3factory.consensys.net/prometheus/api/v1/query_range";
  const configFilePath = path.join(__dirname, "../linea-node-size/config.json");

  try {
    console.log(`Reading configuration from ${configFilePath}`);
    const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    const results = [];

    for (const { network, cluster, pvc } of config) {
      console.log(`Fetching data for ${network}, ${cluster}, ${pvc}`);
      const query = `
        sum without(instance, node) (topk(1, (kubelet_volume_stats_capacity_bytes{linea_network="${network}", cluster="${cluster}", persistentvolumeclaim="${pvc}", job="kubelet", metrics_path="/metrics"})))
        -
        sum without(instance, node) (topk(1, (kubelet_volume_stats_available_bytes{linea_network="${network}", cluster="${cluster}", persistentvolumeclaim="${pvc}", job="kubelet", metrics_path="/metrics"})))
      `;
      const endTime = Math.floor(Date.now() / 1000);
      const startTime = endTime - 24 * 60 * 60;
      const step = 120;
      const url = `${baseUrl}?query=${encodeURIComponent(query)}&start=${startTime}&end=${endTime}&step=${step}`;
      console.log(`Constructed URL: ${url}`);

      try {
        const response = await axios.get(url, {
          auth: {
            username: process.env.LINEA_OBSERVABILITY_USER || "",
            password: process.env.LINEA_OBSERVABILITY_PASS || "",
          },
        });

        if (!response.data?.data?.result?.[0]?.values) {
          throw new Error("Invalid API response format");
        }
        
        let values = response.data.data.result[0].values;
        values = values.filter((value) => !isNaN(parseFloat(value[1])));
        if (values.length < 2) {
          console.warn(`Not enough valid data points for ${pvc}`);
          continue;
        }

        const totalSize = parseFloat(values[values.length - 1][1]) || 0;
        const dailyIncrease = calculateDailyIncrease(values);

        console.log(`${pvc} - Total size: ${(totalSize / (1024 ** 3)).toFixed(2)} GiB`);
        console.log(`${pvc} - Daily increase: ${(dailyIncrease / (1024 ** 3)).toFixed(2)} GiB`);

        results.push({ network, cluster, pvc, totalSize, dailyIncrease, timestamp: new Date().toISOString() });
      } catch (err) {
        console.error(`Error fetching data for ${network}, ${cluster}, ${pvc}:`, err.message);
      }
    }

    const dataFilePath = path.join(__dirname, "../linea-node-size/data.json");
    let existingData = {};
    try {
      if (fs.existsSync(dataFilePath)) {
        existingData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
      }
    } catch (error) {
      console.error(`Error reading data file: ${dataFilePath}`, error.message);
      existingData = {};
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentWeek = getWeekNumber(currentDate);

    if (!existingData[currentYear]) {
      existingData[currentYear] = {};
    }
    existingData[currentYear][currentWeek] = results;

    if (results.length > 0) {
      console.log(`Writing results to ${dataFilePath}`);
      fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
      console.log("Node size data fetched and saved.");
    } else {
      console.warn("No valid data to write.");
    }
  } catch (error) {
    console.error("Error in fetchData:", error.message);
  }
};

fetchData();
