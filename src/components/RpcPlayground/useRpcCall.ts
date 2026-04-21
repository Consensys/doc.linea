import { useCallback, useEffect, useRef, useState } from "react";

export type CallStatus = "idle" | "loading" | "success" | "error";

export interface UseRpcCallResult {
  status: CallStatus;
  response: unknown | null;
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
  const [response, setResponse] = useState<unknown | null>(null);
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

    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

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
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
      setStatus("success");
    } catch (e) {
      if (
        controller.signal.aborted &&
        !(e instanceof Error && e.name === "AbortError")
      ) {
        // Swallow abort errors from unmount or re-run.
        return;
      }
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("Request timed out or was cancelled.");
      } else {
        setError(e instanceof Error ? e.message : "Request failed.");
      }
      setResponse(null);
      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
    }
  }, [endpoint, method, params]);

  return { status, response, error, run };
}
