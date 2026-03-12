import React from "react";
import Link from "@docusaurus/Link";
import { ArrowIcon, DecorativeGeometric } from "@site/src/components/icons";
import styles from "./styles.module.css";

type BaseCardProps = {
  href: string;
  text: string;
  image?: string;
};

export default function BaseCard({
  href,
  text,
  image,
}: BaseCardProps): React.ReactNode {
  return (
    <Link to={href} className={styles.card}>
      <p className={styles.text}>{text}</p>
      <div className={styles.arrowButton}>
        <ArrowIcon />
      </div>
      {image ? (
        <img
          src={image}
          alt=""
          className={styles.decorativeImage}
          aria-hidden="true"
        />
      ) : (
        <DecorativeGeometric className={styles.decorativeImage} />
      )}
    </Link>
  );
}
