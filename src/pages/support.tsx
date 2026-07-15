import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { DiscordIcon } from "@site/src/components/icons";

import styles from "./support.module.css";

const INTERCOM_APP_ID = "txttgas6";
const INTERCOM_SCRIPT_SRC = `https://widget.intercom.io/widget/${INTERCOM_APP_ID}`;
const INTERCOM_LAUNCHER_SELECTOR = "#intercom-button";

type IntercomStatus = "idle" | "loading" | "ready" | "delayed" | "error";

type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

type IntercomSettings = {
  api_base: string;
  app_id: string;
  custom_launcher_selector: string;
};

type IntercomFunction = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    Intercom?: IntercomFunction;
    intercomSettings?: IntercomSettings;
  }
}

const intercomSettings: IntercomSettings = {
  api_base: "https://api-iam.intercom.io",
  app_id: INTERCOM_APP_ID,
  custom_launcher_selector: INTERCOM_LAUNCHER_SELECTOR,
};

const Layout: React.FC<LayoutProps> = require("@theme/Layout").default;

function installIntercomQueue() {
  if (typeof window.Intercom === "function") {
    return;
  }

  const queuedIntercom: IntercomFunction = (...args: unknown[]) => {
    queuedIntercom.q?.push(args);
  };

  queuedIntercom.q = [];

  window.Intercom = queuedIntercom;
}

export default function Support(): React.ReactNode {
  const [intercomStatus, setIntercomStatus] = useState<IntercomStatus>("idle");
  const delayedTimerRef = useRef<number | undefined>(undefined);
  const hasBootedIntercomRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (delayedTimerRef.current !== undefined) {
        window.clearTimeout(delayedTimerRef.current);
      }

      if (hasBootedIntercomRef.current) {
        window.Intercom?.("shutdown");
      }
    };
  }, []);

  const showMessenger = () => {
    if (!isMountedRef.current) {
      return;
    }

    window.Intercom?.("show");
  };

  const markScriptReady = (script: HTMLScriptElement) => {
    script.dataset.loaded = "true";
    delete script.dataset.failed;

    if (!isMountedRef.current) {
      return;
    }

    setIntercomStatus("ready");
    showMessenger();
  };

  const markScriptError = (script: HTMLScriptElement) => {
    script.dataset.failed = "true";

    if (isMountedRef.current) {
      setIntercomStatus("error");
    }
  };

  const bootIntercom = () => {
    window.intercomSettings = intercomSettings;
    installIntercomQueue();

    if (!hasBootedIntercomRef.current) {
      window.Intercom?.("boot", intercomSettings);
      hasBootedIntercomRef.current = true;
    }
  };

  const showIntercom = () => {
    setIntercomStatus("loading");
    bootIntercom();
    showMessenger();

    if (delayedTimerRef.current !== undefined) {
      window.clearTimeout(delayedTimerRef.current);
    }

    delayedTimerRef.current = window.setTimeout(() => {
      setIntercomStatus((status) =>
        status === "loading" ? "delayed" : status,
      );
    }, 2500);

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${INTERCOM_SCRIPT_SRC}"]`,
    );

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        setIntercomStatus("ready");
        showMessenger();
        return;
      }

      if (existingScript.dataset.failed === "true") {
        existingScript.remove();
      } else {
        existingScript.addEventListener(
          "load",
          () => markScriptReady(existingScript),
          { once: true },
        );
        existingScript.addEventListener(
          "error",
          () => markScriptError(existingScript),
          { once: true },
        );
        return;
      }
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = INTERCOM_SCRIPT_SRC;
    script.onload = () => markScriptReady(script);
    script.onerror = () => markScriptError(script);
    document.head.appendChild(script);
  };

  return (
    <Layout
      title="Linea and Lineth support resources"
      description="Find support and community resources for Linea Mainnet users, developers building on Linea, and Lineth stack operators and evaluators.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Linea Support</h1>
            <p className={styles.intro}>
              Pick the situation that best describes you to find the right
              support, documentation, or community resource.
            </p>
            <button
              id="intercom-button"
              type="button"
              className={clsx("button", styles.primaryButton)}
              onClick={showIntercom}>
              Contact support
            </button>
            {intercomStatus === "delayed" && (
              <p className={styles.status}>
                Support messenger is still loading. You can also use the
                resources below.
              </p>
            )}
            {intercomStatus === "error" && (
              <p className={styles.status}>
                Support messenger did not load. Use the resources below, then
                try again.
              </p>
            )}
          </div>
        </section>

        <section
          className={styles.resources}
          aria-labelledby="support-resources">
          <div className={styles.resourcesInner}>
            <div className={styles.audienceSection}>
              <h2 id="support-resources">Linea Mainnet users</h2>
              <div className={styles.resourceGrid}>
                <button
                  type="button"
                  className={clsx(styles.resourceCard, styles.resourceButton)}
                  onClick={showIntercom}>
                  <span>Contact support</span>
                  <p>Open the support messenger for help with Linea Mainnet.</p>
                </button>
                <Link
                  className={styles.resourceCard}
                  to="https://linea.statuspage.io/">
                  <span>Status</span>
                  <p>Check Linea network and service status.</p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://support.metamask.io/manage-crypto/transactions/how-to-speed-up-or-cancel-a-pending-transaction/#canceling-a-transaction">
                  <span>Stuck transaction</span>
                  <p>Use MetaMask guidance to cancel a stuck transaction.</p>
                </Link>
                <Link className={styles.resourceCard} to="/search">
                  <span>Search docs</span>
                  <p>Find public Linea docs, guides, and references.</p>
                </Link>
              </div>
            </div>

            <div className={styles.audienceSection}>
              <h2>Building on Linea</h2>
              <div className={styles.resourceGrid}>
                <Link className={styles.resourceCard} to="/search">
                  <span>Search developer docs</span>
                  <p>
                    Find guides, tools, and API references for building on
                    Linea.
                  </p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://community.linea.build/">
                  <span>Linea community</span>
                  <p>Join discussions with the Linea community.</p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://linea.build/hub">
                  <span>Linea Hub</span>
                  <p>Explore apps and tokens, or list your app on Linea.</p>
                </Link>
              </div>
            </div>

            <div className={styles.audienceSection}>
              <h2>Running or evaluating the Lineth stack</h2>
              <div className={styles.resourceGrid}>
                <Link
                  className={styles.resourceCard}
                  to="https://github.com/LFDT-Lineth/lineth-monorepo">
                  <span>Lineth on GitHub</span>
                  <p>
                    Explore the source code for the Lineth open-source stack.
                  </p>
                </Link>
                <Link
                  className={styles.resourceCard}
                  to="https://discord.gg/hyperledger">
                  <div className={styles.resourceTitle}>
                    <DiscordIcon
                      className={styles.resourceIcon}
                      aria-hidden="true"
                    />
                    <span>LF Decentralized Trust Discord</span>
                  </div>
                  <p>
                    Join the open-source community for LF Decentralized Trust
                    projects on Discord.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
