import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { MoonIcon, SunIcon } from "@site/src/components/icons";
import styles from "./styles.module.css";

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
