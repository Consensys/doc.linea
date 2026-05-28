const test = require("node:test");
const assert = require("node:assert/strict");

test("removes complete HTML tags", async () => {
  const { sanitizeFeedbackText } = await import("./feedback-sanitize.ts");

  const result = sanitizeFeedbackText("Hello <strong>docs</strong> team");

  assert.equal(result, "Hello docs team");
});

test("caps pathological angle bracket input without regex backtracking", async () => {
  const { sanitizeFeedbackText } = await import("./feedback-sanitize.ts");
  const input = "<".repeat(5000);

  const result = sanitizeFeedbackText(input);

  assert.equal(result, "<".repeat(1000));
});

test("keeps existing markdown and mention sanitization", async () => {
  const { sanitizeFeedbackText } = await import("./feedback-sanitize.ts");
  const result = sanitizeFeedbackText(
    "See [docs](https://docs.linea.build) ![alt](https://example.com/a.png) @team #123",
  );

  assert.equal(result, "See docs alt @\u200Bteam #\u200B123");
});

test("preserves feedback after an unclosed angle bracket", async () => {
  const { sanitizeFeedbackText } = await import("./feedback-sanitize.ts");

  const result = sanitizeFeedbackText("<Sidebar breaks on mobile");

  assert.equal(result, "<Sidebar breaks on mobile");
});
