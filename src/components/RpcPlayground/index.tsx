import React, { useMemo, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";

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

  const showLive = status === "success" || status === "error";
  const responseTitle =
    status === "error"
      ? "Error"
      : showLive
        ? "Live response"
        : "Example response";

  const responseBody: string = (() => {
    if (status === "error") {
      return error ?? "Request failed.";
    }
    const value = showLive ? response : exampleResponse;
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
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.panelLabel}>Request</span>
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
              <span className={styles.iconBtnLabel}>
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
            <button
              type="button"
              className={styles.runBtn}
              onClick={run}
              disabled={status === "loading"}
              aria-label={
                status === "loading" ? "Running request" : "Run request"
              }>
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
        </div>
        <div className={styles.codeWrap}>
          <CodeBlock language={prismLang}>{code}</CodeBlock>
        </div>
      </div>

      <div
        className={clsx(
          styles.panel,
          styles.responsePanel,
          status === "success" && styles.responseLive,
          status === "error" && styles.responseError,
        )}>
        <div className={styles.header}>
          <span className={styles.panelLabel}>{responseTitle}</span>
          {showLive && (
            <span
              className={clsx(
                styles.badge,
                status === "error" && styles.badgeError,
                status === "success" && styles.badgeLive,
              )}>
              {status === "error" ? "Error" : "Live"}
            </span>
          )}
        </div>
        <div className={styles.codeWrap}>
          <CodeBlock language={status === "error" ? "text" : "json"}>
            {responseBody}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
