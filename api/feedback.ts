import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sheets } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";
import { sanitizeFeedbackText } from "./feedback-sanitize";

// ---------- Types ----------

interface FeedbackBody {
  page_url: string;
  rating: "yes" | "no";
  reason?: string;
  timestamp?: string;
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

// ---------- Device type ----------

function getDeviceType(ua: string): "mobile" | "desktop" {
  return /Mobile|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop";
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
    range: "Sheet1!A:E",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

// ---------- GitHub Issue ----------

async function createGitHubIssue(
  pageUrl: string,
  reason: string,
): Promise<string | null> {
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
    return null;
  }

  const data = await res.json();
  return data.html_url;
}

// ---------- Slack Webhook ----------

async function notifySlack(
  pageUrl: string,
  reason: string,
  issueUrl: string | null,
) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  let text = `:warning: Negative docs feedback on *${pageUrl}*\n>${reason.replace(/\n/g, "\n>")}`;
  if (issueUrl) {
    text += `\n<${issueUrl}|View GitHub issue>`;
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
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

  const cleanReason = reason ? sanitizeFeedbackText(reason) : "";

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
      getDeviceType((req.headers["user-agent"] as string) ?? ""),
    ]);
  } catch (err) {
    console.error("Google Sheets append failed:", err);
    // Don't block the response
  }

  // Negative + reason → GitHub issue, then Slack with issue link
  if (rating === "no" && cleanReason) {
    let issueUrl: string | null = null;
    try {
      issueUrl = await createGitHubIssue(pageUrl, cleanReason);
    } catch (err) {
      console.error("GitHub issue failed:", err);
    }

    try {
      await notifySlack(pageUrl, cleanReason, issueUrl);
    } catch (err) {
      console.error("Slack notification failed:", err);
    }
  }

  return res.status(200).json({ ok: true });
}
