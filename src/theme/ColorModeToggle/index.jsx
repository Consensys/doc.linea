import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

function MoonIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
         viewBox="0 0 20 20" fill="none">
      <path
            d="M11 1.25C11.3711 1.25 11.7383 1.27344 12.0938 1.31641C9.74609 2.8125 8.1875 5.44141 8.1875 8.4375C8.1875 13.0156 11.9531 16.75 16.418 16.8711C14.9258 18.0469 13.0469 18.75 11 18.75C6.16797 18.75 2.25 14.832 2.25 10C2.25 5.16797 6.16797 1.25 11 1.25ZM11 0C5.47656 0 1 4.47656 1 10C1 15.5234 5.47656 20 11 20C13.6875 20 16.1289 18.9375 17.9258 17.2109C18.2109 16.9375 18.293 16.5117 18.1328 16.1523C17.9727 15.793 17.5977 15.5703 17.2031 15.6016C13.0859 15.9297 9.4375 12.582 9.4375 8.4375C9.4375 5.62109 11.0586 3.17969 13.4258 2C13.7813 1.82422 13.9844 1.44141 13.9375 1.04688C13.8906 0.652344 13.6016 0.332031 13.2148 0.246094C12.5 0.0859376 11.7578 0 11 0Z"
            fill="currentColor" />
    </svg>
  );
}

function SunIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ColorModeToggle() {
  const { colorMode, setColorMode } = useColorMode();

  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}
    >
      {colorMode === "dark" ? (
        <SunIcon className={styles.icon} />
      ) : (
        <MoonIcon className={styles.icon} />
      )}
    </button>
  );
}
