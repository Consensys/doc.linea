import React from "react";
import Link from "@docusaurus/Link";
import { ArrowIcon, DecorativeGeometric } from "@site/src/components/icons";
import styles from "./styles.module.css";

type BaseCardProps = {
  href: string;
  text: string;
  description?: string;
  image?: string;
};

export default function BaseCard({
  href,
  text,
  description,
  image,
}: BaseCardProps): React.ReactNode {
  return (
    <Link to={href} className={styles.card}>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
      </div>
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
