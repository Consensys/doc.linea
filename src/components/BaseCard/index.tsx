import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

function ArrowButton() {
  return (
    <div className={styles.arrowButton}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8H13M13 8L9 4M13 8L9 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DefaultDecorativeSVG() {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.decorativeImage}
      aria-hidden="true">
      <path
        d="M24.1465 37.8543L37.9795 37.8543L37.9795 24.0838L24.1465 24.0838L24.1465 37.8543Z"
        stroke="#8E5DFF"
        strokeWidth="6.87404"
      />
      <path
        d="M41.4165 -9.02403e-07L41.4165 20.6446L20.709 20.6446L20.709 0L41.4165 -9.02403e-07Z"
        fill="#FCD6FF"
      />
      <path
        d="M20.7076 20.6463L20.7076 41.2909L9.05156e-07 41.2909L0 20.6463L20.7076 20.6463Z"
        fill="#61DFFF"
      />
      <path
        d="M2.60938 10.3247C2.60938 14.5897 6.07756 18.0467 10.355 18.0467C14.633 18.0467 18.1012 14.5897 18.1012 10.3247C18.1012 6.05967 14.633 2.60266 10.355 2.60266C6.07755 2.60266 2.60938 6.05968 2.60938 10.3247Z"
        stroke="#8E5DFF"
        strokeWidth="5.20017"
      />
    </svg>
  );
}

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
      <ArrowButton />
      {image ? (
        <img
          src={image}
          alt=""
          className={styles.decorativeImage}
          aria-hidden="true"
        />
      ) : (
        <DefaultDecorativeSVG />
      )}
    </Link>
  );
}
