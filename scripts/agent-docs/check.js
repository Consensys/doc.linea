const { checkAgentDocs } = require("./lib");

const report = checkAgentDocs();

if (!report.ok) {
  console.error("Agent docs check failed:");
  for (const failure of report.failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Agent docs check passed (${report.coveredRoutes}/${report.totalRoutes} sitemap routes covered).`,
);
