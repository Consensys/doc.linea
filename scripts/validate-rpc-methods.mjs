#!/usr/bin/env node
// scripts/validate-rpc-methods.mjs
//
// Validates the ciRunnable RPC methods declared in static/data/rpc-methods.json
// against https://rpc.linea.build. Intended for CI after hard forks to catch
// methods that the node no longer recognizes. Methods with ciRunnable: false
// are skipped (signed-payload methods, Infura-only methods).
//
// Pass criteria (lenient):
//   - Valid JSON-RPC envelope (jsonrpc: "2.0" + matching id)
//   - Node recognized the method (no -32601 "method not found")
//   - A response with error.code === -32000 (or any non--32601 error) is PASS:
//     the method exists and the node processed it, just couldn't fulfill the
//     request with the example params. That's fine for a hard-fork smoke test.
//
// Fail criteria:
//   - error.code === -32601 (method not found / no longer supported)
//   - Network error / timeout
//   - Malformed response (non-JSON, missing envelope fields, id mismatch)
//
// Usage:
//   node scripts/validate-rpc-methods.mjs
//   node scripts/validate-rpc-methods.mjs --endpoint=https://rpc.linea.build
//   node scripts/validate-rpc-methods.mjs --concurrency=1
//   node scripts/validate-rpc-methods.mjs --timeout=30000
//   node scripts/validate-rpc-methods.mjs --only=eth_blockNumber,eth_chainId

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../static/data/rpc-methods.json");

const METHOD_NOT_FOUND = -32601;

function parseArgs(argv) {
  const out = {
    endpoint: "https://rpc.linea.build",
    timeout: 30_000,
    concurrency: 4,
    only: null,
  };
  for (const arg of argv.slice(2)) {
    const [k, v] = arg.replace(/^--/, "").split("=");
    if (k === "endpoint" && v) out.endpoint = v;
    else if (k === "timeout" && v) out.timeout = Number(v);
    else if (k === "concurrency" && v) out.concurrency = Math.max(1, Number(v));
    else if (k === "only" && v) out.only = new Set(v.split(","));
  }
  return out;
}

async function loadMethods() {
  const raw = await readFile(DATA_PATH, "utf8");
  return Object.values(JSON.parse(raw));
}

async function callRpc({ endpoint, method, params, timeout, id }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method, params, id }),
      signal: controller.signal,
    });
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return {
        ok: false,
        reason: `HTTP ${res.status}: non-JSON response (${text.slice(0, 120)})`,
      };
    }
    if (!res.ok) {
      return {
        ok: false,
        reason: `HTTP ${res.status}: ${JSON.stringify(body)}`,
      };
    }
    if (body.jsonrpc !== "2.0") {
      return {
        ok: false,
        reason: `missing/invalid jsonrpc field: ${body.jsonrpc}`,
      };
    }
    if (body.id !== id) {
      return { ok: false, reason: `id mismatch: sent ${id}, got ${body.id}` };
    }
    const hasResult = Object.prototype.hasOwnProperty.call(body, "result");
    const hasError = Object.prototype.hasOwnProperty.call(body, "error");
    if (!hasResult && !hasError) {
      return { ok: false, reason: "response has neither result nor error" };
    }
    if (hasError && body.error?.code === METHOD_NOT_FOUND) {
      return {
        ok: false,
        reason: `method not found (-32601): ${body.error?.message ?? ""}`,
      };
    }
    if (hasError) {
      return {
        ok: true,
        note: `ok with rpc error ${body.error?.code}: ${body.error?.message ?? ""}`,
      };
    }
    return { ok: true };
  } catch (e) {
    if (e.name === "AbortError") {
      return { ok: false, reason: `timed out after ${timeout}ms` };
    }
    return { ok: false, reason: `fetch failed: ${e.message}` };
  } finally {
    clearTimeout(timer);
  }
}

async function runBatches(items, size, worker) {
  const results = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    const settled = await Promise.all(batch.map(worker));
    results.push(...settled);
  }
  return results;
}

async function main() {
  const opts = parseArgs(process.argv);
  const all = await loadMethods();

  let runnable = all.filter((m) => m.ciRunnable === true);
  if (opts.only) runnable = runnable.filter((m) => opts.only.has(m.method));
  const skipped = all.length - runnable.length;

  console.log(
    `validate-rpc-methods: ${runnable.length} runnable, ${skipped} skipped`,
  );
  console.log(
    `endpoint: ${opts.endpoint}  timeout: ${opts.timeout}ms  concurrency: ${opts.concurrency}`,
  );
  console.log("");

  let id = 1;
  const results = await runBatches(runnable, opts.concurrency, async (m) => {
    const res = await callRpc({
      endpoint: opts.endpoint,
      method: m.method,
      params: m.params,
      timeout: opts.timeout,
      id: id++,
    });
    const tag = res.ok ? "PASS" : "FAIL";
    const suffix = res.ok
      ? res.note
        ? `  (${res.note})`
        : ""
      : `  — ${res.reason}`;
    console.log(`  ${tag}  ${m.method}${suffix}`);
    return { method: m.method, ...res };
  });

  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;

  console.log("");
  console.log(
    `summary: ${passed} passed, ${failed} failed, ${skipped} skipped (ciRunnable: false)`,
  );
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(
    `validate-rpc-methods: unexpected error: ${e.stack || e.message}`,
  );
  process.exit(2);
});
