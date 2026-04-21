import React, { useMemo, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";

import { PlayIcon } from "../icons";
import { LANGUAGES, Language, renderCode } from "./languages";
import { useRpcCall } from "./useRpcCall";
import styles from "./styles.module.css";

const DEFAULT_ENDPOINT = "https://rpc.linea.build";

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

  return (
    <div className={styles.root}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.panelLabel}>Request</span>
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
        </div>
        <div className={styles.codeWrap}>
          <CodeBlock language={prismLang}>{code}</CodeBlock>
        </div>
        <div className={styles.actions}>
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
                Running…
              </>
            ) : (
              <>
                <PlayIcon className={styles.runIcon} aria-hidden="true" />
                Run
              </>
            )}
          </button>
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
