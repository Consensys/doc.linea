import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import CardGrid from "@site/src/components/CardGrid";
import ContributeBanner from "@site/src/components/ContributeBanner";

import styles from "./index.module.css";

// Explicitly define the props for Layout to include `title` and `description`
type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = require("@theme/Layout").default;

function HomepageHeader() {
  return (
    <header className={clsx(styles.introductionBlock)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title)}>Linea Docs</h1>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          Everything you need to build onchain.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.bannerButton,
              styles.bannerButtonPrimary,
            )}
            to="/stack/quickstart">
            Launch your chain
          </Link>
          <Link
            className={clsx(
              "button button--secondary button--lg",
              styles.bannerButton,
              styles.bannerButtonSecondary,
            )}
            to="/network/quickstart">
            Launch your app
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactNode {
  const startBuildingCards = [
    {
      title: "Understand how Linea works",
      link: "/stack/how-it-works",
      description: (
        <>
          Learn how the Linea Protocol executes, proves, and finalizes
          transactions.
        </>
      ),
      iconSrc: "/img/card_icon_understand.png",
    },
    {
      title: "Launch your own Linea chain",
      link: "/stack",
      description: (
        <>
          Deploy and operate your own Ethereum-compatible network using the
          Linea Stack.
        </>
      ),
      iconSrc: "/img/card_icon_launch.png",
    },
    {
      title: "Build and launch on Linea",
      link: "/network/quickstart",
      description: (
        <>
          Build, launch, and grow your application on the Linea Public Network.
        </>
      ),
      iconSrc: "/img/card_icon_build.png",
    },
  ];

  const communityCards = [
    {
      title: "Connect with builders",
      link: "https://discord.com/invite/linea",
      description: (
        <>Connect with fellow builders and community members on Discord.</>
      ),
    },
    {
      title: "Join the Linea ecosystem",
      link: "https://linea.build/apps",
      description: (
        <>Explore and join the growing Linea ecosystem of dapps and services.</>
      ),
    },
    {
      title: "Give feedback",
      link: "https://community.linea.build/c/feedback",
      description: (
        <>Share your feedback and help us improve the Linea platform.</>
      ),
    },
  ];

  return (
    <>
      <Layout
        title={`Welcome`}
        description="An EVM-equivalent network, scaling the Ethereum experience. Secured with a zero-knowledge rollup to Ethereum, built on lattice-based cryptography, and powered by Consensys.">
        <HomepageHeader />
        <main>
          <CardGrid heading="Start building" cards={startBuildingCards} />
          <CardGrid
            heading="Join the community"
            cards={communityCards}
            equalizeHeights={false}
          />
          <ContributeBanner />
        </main>
      </Layout>
    </>
  );
}
