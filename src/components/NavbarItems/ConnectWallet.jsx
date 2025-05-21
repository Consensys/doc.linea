import React, { useContext, useState, useEffect, useRef } from "react";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import styles from "./ConnectWallet.module.css";

const reformatMetamaskAccount = (account) =>
  account ? `${account.slice(0, 7)}...${account.slice(-5)}` : null;

const ConnectWallet = () => {
  const {
    metaMaskAccount,
    metaMaskAccountEns,
    metaMaskWalletIdConnectHandler,
    metaMaskDisconnect,
    sdk,
  } = useContext(MetamaskProviderContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("Copy to clipboard");
  const copyTimeoutRef = useRef(null);

  const isExtensionActive = sdk.isExtensionActive();
  const showInstallButton =
    !isExtensionActive && !sdk.platformManager?.isMobile;

  const toggleDropdown = () => {
    setDropdownOpen((value) => !value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(metaMaskAccount);
    setCopyMessage("Copied!");

    clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setCopyMessage("Copy to clipboard");
    }, 2000);
  };

  const handleClickOutside = (event) => {
    if (dropdownOpen && !event.target.closest(`.${styles.walletContainer}`)) {
      setDropdownOpen(false);
      setCopyMessage("Copy to clipboard");
      clearTimeout(copyTimeoutRef.current);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDisconnect = () => {
    metaMaskDisconnect();
    setDropdownOpen(false);
  };

  const handleConnectWallet = () => {
    metaMaskWalletIdConnectHandler();
  };

  const MetaMaskLogo = () => (
    <span className={styles.metaMaskLogo} title="MetaMask">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 142 137">
        <path fill="#FF5C16" d="m132.24 131.751-30.481-9.076-22.986 13.741-16.038-.007-23-13.734-30.467 9.076L0 100.465l9.268-34.723L0 36.385 9.268 0l47.607 28.443h27.757L132.24 0l9.268 36.385-9.268 29.357 9.268 34.723-9.268 31.286Z" />
        <path fill="#FF5C16" d="m9.274 0 47.608 28.463-1.893 19.534L9.274 0Zm30.468 100.478 20.947 15.957-20.947 6.24v-22.197Zm19.273-26.381L54.989 48.01l-25.77 17.74-.014-.007v.013l.08 18.26 10.45-9.918h19.28ZM132.24 0 84.632 28.463l1.887 19.534L132.24 0Zm-30.467 100.478-20.948 15.957 20.948 6.24v-22.197Zm10.529-34.723h.007-.007v-.013l-.006.007-25.77-17.739L82.5 74.097h19.272l10.457 9.917.073-18.259Z" />
        <path fill="#E34807" d="m39.735 122.675-30.467 9.076L0 100.478h39.735v22.197ZM59.008 74.09l5.82 37.714-8.066-20.97-27.49-6.82 10.456-9.923h19.28Zm42.764 48.585 30.468 9.076 9.268-31.273h-39.736v22.197ZM82.5 74.09l-5.82 37.714 8.065-20.97 27.491-6.82-10.463-9.923H82.5Z" />
        <path fill="#FF8D5D" d="m0 100.465 9.268-34.723h19.93l.073 18.266 27.492 6.82 8.065 20.969-4.146 4.618-20.947-15.957H0v.007Zm141.508 0-9.268-34.723h-19.931l-.073 18.266-27.49 6.82-8.066 20.969 4.145 4.618 20.948-15.957h39.735v.007ZM84.632 28.443H56.875L54.99 47.977l9.839 63.8H76.68l9.845-63.8-1.893-19.534Z" />
        <path fill="#661800" d="M9.268 0 0 36.385l9.268 29.357h19.93l25.784-17.745L9.268 0Zm43.98 81.665h-9.029l-4.916 4.819 17.466 4.33-3.521-9.155v.006ZM132.24 0l9.268 36.385-9.268 29.357h-19.931L86.526 47.997 132.24 0ZM88.273 81.665h9.042l4.916 4.825-17.486 4.338 3.528-9.17v.007Zm-9.507 42.305 2.06-7.542-4.146-4.618H64.82l-4.145 4.618 2.059 7.542" />
        <path fill="#C0C4CD" d="M78.766 123.969v12.453H62.735v-12.453h16.03Z" />
        <path fill="#E7EBF6" d="m39.742 122.662 23.006 13.754v-12.453l-2.06-7.541-20.946 6.24Zm62.031 0-23.007 13.754v-12.453l2.06-7.541 20.947 6.24Z" />
      </svg>
    </span>
  );

  if (!metaMaskAccount) {
    return (
      <button className={styles.connectButton} onClick={handleConnectWallet}>
        <span className={styles.connectLabel}>
          {showInstallButton ? "Install" : "Connect"}
        </span>
        <MetaMaskLogo />
      </button>
    );
  }

  return (
    <div className={styles.walletContainer}>
      <button className={styles.walletButton} onClick={toggleDropdown}>
        <span className={styles.walletAddress}>
          {metaMaskAccountEns || reformatMetamaskAccount(metaMaskAccount)}
        </span>
      </button>

      {dropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem}>
            <span className={styles.accountLabel}>
              {metaMaskAccountEns || reformatMetamaskAccount(metaMaskAccount)}
            </span>
            <button
              className={styles.copyButton}
              onClick={handleCopy}
              title={copyMessage}
              aria-label="Copy to clipboard">
              <span className={styles.copyIcon}>
                {copyMessage === "Copied!" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m356 51l-86 0c-63 0-93 23-99 77-1 11 8 20 20 20l42 0c86 0 126 40 126 126l0 43c0 11 9 21 21 19 54-6 76-35 76-98l0-86c0-72-28-101-100-101z m-123 123l-86 0c-72 0-100 29-100 100l0 86c0 72 28 101 100 101l86 0c72 0 100-29 100-101l0-86c0-71-28-100-100-100z m24 116l-76 76c-2 3-6 4-10 4-4 0-8-1-10-4l-39-38c-5-6-5-15 0-21 6-6 15-6 21 0l28 28 66-66c5-6 15-6 20 0 6 6 6 15 0 21z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m333 274l0 86c0 72-28 101-100 101l-86 0c-72 0-100-29-100-101l0-86c0-71 28-100 100-100l86 0c72 0 100 29 100 100z m23-223l-86 0c-63 0-93 23-99 77-1 11 8 20 20 20l42 0c86 0 126 40 126 126l0 43c0 11 9 21 21 19 54-6 76-35 76-98l0-86c0-72-28-101-100-101z" />
                  </svg>
                )}
              </span>
            </button>
          </div>
          <button
            className={styles.disconnectButton}
            onClick={handleDisconnect}>
            Disconnect MetaMask
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;