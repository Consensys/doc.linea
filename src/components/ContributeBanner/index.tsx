import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { GitHubIcon } from "@site/src/components/icons";
import styles from "./styles.module.css";

export default function ContributeBanner(): React.ReactNode {
  return (
    <section
      className={clsx("margin-top--lg", "margin-bottom--lg", styles.section)}>
      <div className={styles.bannerContainer}>
        <div className={styles.banner}>
          <div className={styles.content}>
            <h2 className={styles.title}>Contribute to Linea</h2>
            <p className={styles.description}>
              Join the Linea developer community and learn how to contribute.
            </p>
            <Link
              className={styles.button}
              to="https://github.com/Consensys/doc.linea">
              <GitHubIcon width="14" height="14" className={styles.icon} />
              Contribute
            </Link>
          </div>
          <div className={styles.illustration}>
            <div className={styles.decorativeDot1}></div>
            <div className={styles.decorativeDot2}></div>
            <div className={styles.decorativeDot3}></div>
            <img src="/img/contribute_illustration.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
