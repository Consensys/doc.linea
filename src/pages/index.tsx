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
        <p className={clsx(styles.subtitle)}>
          Linea is the public zkEVM network.{" "}
          <Link className={styles.subtitleLink} to="/protocol/linea-vs-lineth">
            Lineth
          </Link>{" "}
          is the open-source stack that powers it.
        </p>
      </div>
    </header>
  );
}

export default function Home(): React.ReactNode {
  const startBuildingCards = [
    {
      title: (
        <>
          Build on <strong>Linea</strong>
        </>
      ),
      link: "/network",
      description: (
        <>Build, launch, and grow your application on Linea Mainnet.</>
      ),
      iconSrc: "/img/card_icon_build.png",
    },
    {
      title: (
        <>
          Design your own <strong>Lineth</strong> chain
        </>
      ),
      link: "/stack",
      description: (
        <>Design and deploy a custom Ethereum-compatible network using Lineth.</>
      ),
      iconSrc: "/img/card_icon_launch.png",
    },
    {
      title: (
        <>
          Learn about the <strong>protocol</strong>
        </>
      ),
      link: "/protocol",
      description: (
        <>
          Explore how Lineth processes transactions, generates proofs, and
          finalizes state.
        </>
      ),
      iconSrc: "/img/card_icon_understand.png",
    },
  ];

  const communityCards = [
    {
      title: "Get support",
      link: "/support",
      description: (
        <>Find help through Linea support resources and builder guidance.</>
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
        description="Documentation for Linea Mainnet, the public zkEVM network, and Lineth, the open-source rollup stack that powers it.">
        <HomepageHeader />
        <main>
          <CardGrid cards={startBuildingCards} />
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
