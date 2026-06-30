import { useCallback, useEffect, useRef, useState } from "react";

export type CallStatus = "idle" | "loading" | "success" | "error";

export interface UseRpcCallResult {
  status: CallStatus;
  response: unknown;
  error: string | null;
  run: () => Promise<void>;
}

const REQUEST_TIMEOUT_MS = 15_000;

export function useRpcCall(
  endpoint: string,
  method: string,
  params: unknown[],
): UseRpcCallResult {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [response, setResponse] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const run = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const mine = controller;

    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method,
          params,
          id: 1,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        let detail = `HTTP ${res.status} ${res.statusText}`;
        try {
          const body = await res.json();
          if (body?.error?.message) {
            detail = body.error.message;
          }
        } catch {
          // body wasn't JSON, stick with the HTTP status line
        }
        throw new Error(detail);
      }

      const data = await res.json();
      if (abortRef.current !== mine) return;
      if (data?.error) {
        setError(
          data.error.message ?? `JSON-RPC error ${data.error.code ?? ""}`,
        );
        setResponse(null);
        setStatus("error");
        return;
      }
      setResponse(data);
      setStatus("success");
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        if (timedOut && abortRef.current === mine) {
          setError(
            `Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds.`,
          );
          setResponse(null);
          setStatus("error");
        }
        // Superseded, unmounted, or timed out after a newer run started —
        // the active controller owns the state. Silently ignore.
        return;
      }
      if (abortRef.current !== mine) return;
      setError(e instanceof Error ? e.message : "Request failed.");
      setResponse(null);
      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
    }
  }, [endpoint, method, params]);

  return { status, response, error, run };
}
