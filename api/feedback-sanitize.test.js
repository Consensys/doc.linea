const test = require("node:test");
const assert = require("node:assert/strict");

test("removes HTML tags without regex backtracking", async () => {
  const { sanitizeFeedbackText } = await import("./feedback-sanitize.ts");
  const input = `${"<".repeat(5000)}>slow</b>`;

  const result = sanitizeFeedbackText(input);

  assert.equal(result.includes("<"), false);
  assert.equal(result.includes(">"), false);
  assert.ok(result.length <= 1000);
});

test("keeps existing markdown and mention sanitization", async () => {
  const { sanitizeFeedbackText } = await import("./feedback-sanitize.ts");
  const result = sanitizeFeedbackText(
    "See [docs](https://docs.linea.build) ![alt](https://example.com/a.png) @team #123",
  );

  assert.equal(result, "See docs alt @\u200Bteam #\u200B123");
});
