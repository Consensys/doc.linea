import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageCards from "@site/src/components/HomepageCards";
import StopwatchIcon from "../../static/img/icon_stopwatch.svg";
import LineaLogo from "../../static/img/Linea_logo.svg";
import LineaFooter from "../../static/img/Linea_footer.svg";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.introductionBlock)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.forceColor, styles.title)}>
          <LineaLogo className={styles.logo} />
          Docs
        </h1>
        <p
          className={clsx(
            "hero__subtitle",
            styles.forceColor,
            styles.subtitle,
          )}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.bannerButton,
            )}
            to="developers/quickstart">
            START BUILDING
            <StopwatchIcon className={styles.icon} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <>
      <Layout
        title={`Welcome`}
        description="An EVM-equivalent network, scaling the Ethereum experience. Secured with a zero-knowledge rollup to Ethereum, built on lattice-based cryptography, and powered by Consensys.">
        <HomepageHeader />
        <main style={{ backgroundColor: "var(--banner-background)" }}>
          <HomepageCards />
        </main>
      </Layout>
      <div className={styles.footerImageContainer}>
        <LineaFooter className={styles.footerImage} style={{ color: "var(--banner-text)" }} />
      </div>
    </>
  );
}
