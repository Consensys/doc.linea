import React, { useMemo, useState } from "react";
import CodeBlock from "@theme/CodeBlock";

import { CheckIcon, CopyIcon, PlayIcon } from "../icons";
import { LANGUAGES, Language, renderCode } from "./languages";
import { useRpcCall } from "./useRpcCall";
import styles from "./styles.module.css";

const DEFAULT_ENDPOINT = "https://rpc.linea.build";
const COPY_FEEDBACK_MS = 1500;

export interface RpcPlaygroundProps {
  method: string;
  params: unknown[];
  exampleResponse: unknown;
  endpoint?: string;
}

export default function RpcPlayground({
  method,
  params,
  exampleResponse,
  endpoint = DEFAULT_ENDPOINT,
}: RpcPlaygroundProps): React.ReactNode {
  const [language, setLanguage] = useState<Language>("curl");
  const [copied, setCopied] = useState(false);
  const { status, response, error, run } = useRpcCall(endpoint, method, params);

  const code = useMemo(
    () => renderCode(language, method, params, endpoint),
    [language, method, params, endpoint],
  );

  const prismLang = LANGUAGES.find((l) => l.id === language)?.prism ?? "bash";

  const hasRun = status === "success" || status === "error";

  const responseBody: string = (() => {
    if (status === "error") {
      return error ?? "Request failed.";
    }
    const value = hasRun ? response : exampleResponse;
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      // Clipboard API may fail in insecure contexts — silently no-op.
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <label className={styles.langSelect}>
          <span className={styles.srOnly}>Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            aria-label="Language">
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
        <button
          type="button"
          className={styles.runBtn}
          onClick={run}
          disabled={status === "loading"}
          aria-label={status === "loading" ? "Running request" : "Run request"}>
          {status === "loading" ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              <span>Running…</span>
            </>
          ) : (
            <>
              <PlayIcon className={styles.runIcon} aria-hidden="true" />
              <span>Run</span>
            </>
          )}
        </button>
      </div>
      <div className={styles.requestBlock}>
        <CodeBlock language={prismLang}>{code}</CodeBlock>
      </div>
      <CodeBlock language={status === "error" ? "text" : "json"}>
        {responseBody}
      </CodeBlock>
    </div>
  );
}
