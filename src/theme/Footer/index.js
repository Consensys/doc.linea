import React, { useEffect } from "react";
import Footer from "@theme-original/Footer";
import LineaFooter from "@site/static/img/linea_footer.svg";
import styles from "./styles.module.css";

export default function FooterWrapper(props) {
  useEffect(() => {
    const handleManageCookie = () => {
      // Check if Osano API is available before accessing it
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
    <>
      <Footer {...props} />
      <div className={styles.lineaFooterContainer}>
        <LineaFooter className={styles.lineaFooter} />
      </div>
    </>
  );
}
