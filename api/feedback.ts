import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sheets } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";

// ---------- Types ----------

interface FeedbackBody {
  page_url: string;
  rating: "yes" | "no";
  reason?: string;
  timestamp?: string;
}

// ---------- Sanitize ----------

function stripHtml(text: string): string {
  let prev = text;
  // Loop to handle nested tags like <<script>script>
  while (true) {
    const next = prev.replace(/<[^>]*>/g, "");
    if (next === prev) return next;
    prev = next;
  }
}

function sanitize(text: string): string {
  return stripHtml(text)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // strip markdown images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // strip markdown links
    .replace(/@/g, "@\u200B") // break GitHub @mentions
    .replace(/#(\d)/g, "#\u200B$1") // break GitHub #issue references
    .slice(0, 1000)
    .trim();
}

function isValidPageUrl(url: string): boolean {
  // Accept relative paths (e.g. /developers/guides/bridge)
  if (url.startsWith("/")) return /^\/[\w\-./]*$/.test(url);
  // Accept full URLs from the docs site
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://docs.linea.build";
  } catch {
    return false;
  }
}

// ---------- Google Sheets (module-scoped for reuse across warm invocations) ----------

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SHEETS_CREDENTIALS!, "base64").toString(),
);

const auth = new GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheetsClient = sheets({ version: "v4", auth });

async function appendToSheet(row: string[]) {
  await sheetsClient.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Sheet1!A:F",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

// ---------- GitHub Issue ----------

async function createGitHubIssue(pageUrl: string, reason: string) {
  const repo = process.env.GITHUB_REPO!; // "Consensys/doc.linea"
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `Docs feedback: ${pageUrl}`,
      body: `**Page:** ${pageUrl}\n\n**Feedback:**\n${reason}`,
      labels: ["user-feedback"],
    }),
  });

  if (!res.ok) {
    console.error(
      "GitHub issue creation failed:",
      res.status,
      await res.text(),
    );
  }
}

// ---------- Slack Webhook ----------

async function notifySlack(pageUrl: string, reason: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `:warning: Negative docs feedback on *${pageUrl}*\n>${reason}`,
    }),
  });

  if (!res.ok) {
    console.error("Slack notification failed:", res.status, await res.text());
  }
}

// ---------- Handler ----------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting is handled by Vercel Firewall (project dashboard)

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
    req.socket.remoteAddress ??
    "unknown";

  // Validate
  const {
    page_url: pageUrl,
    rating,
    reason,
    timestamp,
  } = req.body as FeedbackBody;

  if (!pageUrl || !rating || !["yes", "no"].includes(rating)) {
    return res
      .status(400)
      .json({ error: "page_url and rating (yes/no) are required" });
  }

  if (!isValidPageUrl(pageUrl)) {
    return res.status(400).json({ error: "invalid page_url" });
  }

  const cleanReason = reason ? sanitize(reason) : "";

  if (rating === "no" && !cleanReason) {
    return res
      .status(400)
      .json({ error: "reason is required for negative feedback" });
  }
  const ts = timestamp ?? new Date().toISOString();

  // Google Sheet — every submission
  try {
    await appendToSheet([
      ts,
      pageUrl,
      rating,
      cleanReason,
      ip,
      req.headers["user-agent"] ?? "",
    ]);
  } catch (err) {
    console.error("Google Sheets append failed:", err);
    // Don't block the response
  }

  // Negative + reason → GitHub issue + Slack
  if (rating === "no" && cleanReason) {
    const results = await Promise.allSettled([
      createGitHubIssue(pageUrl, cleanReason),
      notifySlack(pageUrl, cleanReason),
    ]);
    const labels = ["GitHub issue", "Slack notification"];
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`${labels[i]} failed:`, r.reason);
      }
    });
  }

  return res.status(200).json({ ok: true });
}
