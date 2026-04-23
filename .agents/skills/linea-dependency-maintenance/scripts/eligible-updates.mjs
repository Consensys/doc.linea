#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DAY_MS = 24 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

function parseArgs(argv) {
  const args = { manager: "auto", days: 3, minutes: null };
  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--manager" && next) {
      args.manager = next;
      index += 1;
    } else if (arg === "--days" && next) {
      args.days = Number(next);
      index += 1;
    } else if (arg === "--minutes" && next) {
      args.minutes = Number(next);
      index += 1;
    } else if (arg === "--help") {
      console.error("Usage: eligible-updates.mjs [--manager auto|npm|pnpm] [--days N | --minutes N]");
      process.exit(0);
    }
  }
  return args;
}

function detectManager() {
  if (existsSync("pnpm-lock.yaml")) return "pnpm";
  if (existsSync("package-lock.json")) return "npm";
  if (existsSync("package.json")) {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    if (String(pkg.packageManager ?? "").startsWith("pnpm@")) return "pnpm";
    if (String(pkg.packageManager ?? "").startsWith("npm@")) return "npm";
  }
  return "npm";
}

function runOutdated(manager) {
  const command = manager === "pnpm"
    ? ["pnpm", ["outdated", "-r", "--format", "json"]]
    : ["npm", ["outdated", "--json"]];

  try {
    return execFileSync(command[0], command[1], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    if (error.stdout) return String(error.stdout);
    return "{}";
  }
}

function parseVersion(version) {
  const match = String(version ?? "").trim().replace(/^v/, "").match(/(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?/);
  if (!match) return null;
  return {
    raw: `${match[1]}.${match[2]}.${match[3]}${match[4] ? `-${match[4]}` : ""}`,
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? "",
  };
}

function compareVersions(a, b) {
  const parsedA = parseVersion(a);
  const parsedB = parseVersion(b);
  if (!parsedA || !parsedB) return 0;
  for (const key of ["major", "minor", "patch"]) {
    if (parsedA[key] !== parsedB[key]) return parsedA[key] - parsedB[key];
  }
  if (parsedA.prerelease && !parsedB.prerelease) return -1;
  if (!parsedA.prerelease && parsedB.prerelease) return 1;
  return parsedA.prerelease.localeCompare(parsedB.prerelease);
}

function normalizeOutdated(raw) {
  if (!raw.trim()) return [];
  const parsed = JSON.parse(raw);
  const rows = [];

  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      rows.push(item);
    }
  } else {
    for (const [name, details] of Object.entries(parsed)) {
      rows.push({ name, ...details });
    }
  }

  return rows
    .map((row) => ({
      name: row.name ?? row.packageName ?? row.package,
      current: row.current,
      wanted: row.wanted,
      latest: row.latest,
      type: row.dependencyType ?? row.type,
      dependent: row.dependent ?? row.workspace ?? row.location,
    }))
    .filter((row) => row.name && parseVersion(row.current));
}

async function fetchMetadata(name) {
  const encoded = encodeURIComponent(name).replace("%2F", "%2F");
  const response = await fetch(`https://registry.npmjs.org/${encoded}`);
  if (!response.ok) {
    throw new Error(`Could not fetch npm metadata for ${name}: ${response.status}`);
  }
  return response.json();
}

function classify(current, target) {
  const currentParsed = parseVersion(current);
  const targetParsed = parseVersion(target);
  if (!currentParsed || !targetParsed) return "unknown";
  if (targetParsed.major !== currentParsed.major) return "major";
  if (targetParsed.minor !== currentParsed.minor) return "minor";
  if (targetParsed.patch !== currentParsed.patch) return "patch";
  return "same";
}

const args = parseArgs(process.argv);
const manager = args.manager === "auto" ? detectManager() : args.manager;
if (!["npm", "pnpm"].includes(manager)) throw new Error("--manager must be auto, npm, or pnpm");

const windowMs = args.minutes != null ? args.minutes * MINUTE_MS : args.days * DAY_MS;
if (!Number.isFinite(windowMs) || windowMs < 0) throw new Error("Release-age window must be a positive number");

const now = new Date();
const cutoff = new Date(now.getTime() - windowMs);
const outdatedRows = normalizeOutdated(runOutdated(manager));
const rows = [];

for (const item of outdatedRows) {
  const metadata = await fetchMetadata(item.name);
  const times = metadata.time ?? {};
  const current = parseVersion(item.current)?.raw;
  const versions = Object.keys(metadata.versions ?? {})
    .filter((version) => parseVersion(version))
    .filter((version) => !parseVersion(version)?.prerelease)
    .sort(compareVersions);

  const newerEligible = versions
    .filter((version) => compareVersions(version, current) > 0)
    .filter((version) => times[version] && new Date(times[version]) <= cutoff);

  const sameMajor = newerEligible.filter((version) => parseVersion(version).major === parseVersion(current).major);
  const eligibleSameMajor = sameMajor.at(-1) ?? "";
  const eligibleAny = newerEligible.at(-1) ?? "";

  rows.push({
    name: item.name,
    dependent: item.dependent ?? "",
    type: item.type ?? "",
    current: item.current,
    wanted: item.wanted ?? "",
    latest: item.latest ?? metadata["dist-tags"]?.latest ?? "",
    latestPublished: times[item.latest] ?? "",
    eligibleSameMajor,
    eligibleSameMajorPublished: eligibleSameMajor ? times[eligibleSameMajor] : "",
    eligibleSameMajorType: eligibleSameMajor ? classify(current, eligibleSameMajor) : "",
    eligibleAny,
    eligibleAnyPublished: eligibleAny ? times[eligibleAny] : "",
    eligibleAnyType: eligibleAny ? classify(current, eligibleAny) : "",
    latestIsMajor: item.latest ? classify(current, item.latest) === "major" : false,
  });
}

console.log(JSON.stringify({
  manager,
  cwd: join(process.cwd()),
  now: now.toISOString(),
  cutoff: cutoff.toISOString(),
  rows,
}, null, 2));
