import React, { useEffect } from "react";
import ThemedImage from "@theme/ThemedImage";
import {
  XIcon,
  GitHubIcon,
  DiscordIcon,
  LinkedInIcon,
} from "@site/src/components/icons";
import styles from "./styles.module.css";

const NAV_LINKS = [
  { label: "Home", href: "https://linea.build/" },
  { label: "Blog", href: "https://linea.build/blog" },
  { label: "Privacy Policy", href: "https://linea.build/privacy-policy" },
  { label: "Terms of Service", href: "https://linea.build/terms-of-service" },
];

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/lineabuild",
    icon: <XIcon aria-hidden="true" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Consensys/doc.linea",
    icon: <GitHubIcon aria-hidden="true" />,
  },
  {
    label: "Discord",
    href: "https://discord.gg/linea",
    icon: <DiscordIcon aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/lineabuild",
    icon: <LinkedInIcon aria-hidden="true" />,
  },
];

export default function FooterWrapper() {
  useEffect(() => {
    const handleManageCookie = () => {
      if (
        typeof window !== "undefined" &&
        window.Osano &&
        window.Osano.cm &&
        typeof window.Osano.cm.showDrawer === "function"
      ) {
        window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open");
      } else {
        console.warn(
          "Osano cookie management script is not yet loaded. Please try again in a moment.",
        );
      }
    };
    const cookieBtn = document.getElementById("manage-cookie-btn");
    if (!cookieBtn) return;
    cookieBtn.addEventListener("click", handleManageCookie);
    return () => {
      cookieBtn.removeEventListener("click", handleManageCookie);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <a
        href="https://linea.build/"
        className={styles.logoLink}
        aria-label="Linea homepage">
        <ThemedImage
          sources={{
            light: "/img/Linea_docs_logo.svg",
            dark: "/img/Linea_docs_logo_dark.svg",
          }}
          alt="Linea Docs"
          className={styles.logo}
        />
      </a>

      <nav className={styles.navLinks} aria-label="Footer navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className={styles.navLink}>
            {label}
          </a>
        ))}
        <button id="manage-cookie-btn" className={styles.cookieBtn}>
          Manage Cookie
        </button>
      </nav>

      <div className={styles.socialIcons}>
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={label}>
            {icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
