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

// ---------- Rate limiting (in-memory, per instance) ----------

const hits = new Map<string, number[]>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// ---------- Sanitize ----------

function sanitize(text: string): string {
  return text
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .slice(0, 1000)
    .trim();
}

// ---------- Google Sheets ----------

async function appendToSheet(row: string[]) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SHEETS_CREDENTIALS!, "base64").toString(),
  );

  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheetsClient = sheets({ version: "v4", auth });

  await sheetsClient.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ---------- GitHub Issue ----------

async function createGitHubIssue(pageUrl: string, reason: string) {
  const repo = process.env.GITHUB_REPO!; // "Consensys/doc.linea"
  const res = await fetch(
    `https://api.github.com/repos/${repo}/issues`,
    {
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
    },
  );

  if (!res.ok) {
    console.error("GitHub issue creation failed:", res.status, await res.text());
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

  // Rate limit
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
    req.socket.remoteAddress ??
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  // Validate
  const { page_url, rating, reason, timestamp } = req.body as FeedbackBody;

  if (!page_url || !rating || !["yes", "no"].includes(rating)) {
    return res.status(400).json({ error: "page_url and rating (yes/no) are required" });
  }

  if (rating === "no" && (!reason || !reason.trim())) {
    return res.status(400).json({ error: "reason is required for negative feedback" });
  }

  const cleanReason = reason ? sanitize(reason) : "";
  const ts = timestamp ?? new Date().toISOString();

  // Google Sheet — every submission
  try {
    await appendToSheet([ts, page_url, rating, cleanReason, ip, req.headers["user-agent"] ?? ""]);
  } catch (err) {
    console.error("Google Sheets append failed:", err);
    // Don't block the response
  }

  // Negative + reason → GitHub issue + Slack
  if (rating === "no" && cleanReason) {
    await Promise.allSettled([
      createGitHubIssue(page_url, cleanReason),
      notifySlack(page_url, cleanReason),
    ]);
  }

  return res.status(200).json({ ok: true });
}
