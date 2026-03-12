/**
 * Custom external link icon - Figma design (diagonal up-right arrow).
 * Replaces default Docusaurus icon with SVG matching Linea docs spec.
 */
import React from "react";
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

export default function IconExternalLink({ width = 8, height = 8 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={translate({
        id: "theme.IconExternalLink.ariaLabel",
        message: "(opens in new tab)",
        description: "The ARIA label for the external link icon",
      })}
      className={styles.iconExternalLink}>
      <path
        d="M8 1.53613V6.0752H6.82617V2.02246L6.81641 2.0127L0.830078 8L0 7.16992L5.98633 1.18262L5.97754 1.17383H1.89062V0H6.46387L8 1.53613Z"
        fill="currentColor"
      />
    </svg>
  );
}
