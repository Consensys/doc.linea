import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageCards from "@site/src/components/HomepageCards";
import SecondaryCards from "@site/src/components/SecondaryCards";
import StopwatchIcon from "../../static/img/icon_stopwatch.svg";
import LineaLogo from "../../static/img/Linea_logo.svg";
import LineaFooter from "../../static/img/linea_footer.svg";
// @ts-ignore: suppressing type declarations error for the SearchBar.
import SearchBar from "@theme/SearchBar";

import styles from "./index.module.css";

// Explicitly define the props for Layout to include `title` and `description`
type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = require("@theme/Layout").default;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.introductionBlock)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title)}>
          <LineaLogo className={styles.logo} />
          <span className={styles.visuallyHidden}>Developer Center</span>
        </h1>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.bannerButton,
            )}
            to="/get-started/build/quickstart/deploy">
            START BUILDING
            <StopwatchIcon className={styles.icon} />
          </Link>
        </div>
        <div className={clsx(styles.searchBarContainer, "banner-searchbar")}>
          <SearchBar />
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
          <SecondaryCards />
        </main>
      </Layout>
      <div className={styles.footerImageContainer}>
        <LineaFooter
          className={styles.footerImage}
          style={{ color: "var(--banner-text)" }}
        />
      </div>
    </>
  );
}
