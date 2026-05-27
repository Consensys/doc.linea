const { generateAgentDocs } = require("./lib");

const result = generateAgentDocs();

console.log(
  `Generated ${result.routes.length} Markdown docs and llms.txt (${result.llmsChars} chars).`,
);

if (result.skipped.length) {
  console.warn(
    `Skipped ${result.skipped.length} sitemap routes with no HTML output.`,
  );
}
