import React, { useContext, useState, useEffect } from "react";
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

  const isExtensionActive = sdk.isExtensionActive();
  const showInstallButton =
    !isExtensionActive && !sdk.platformManager?.isMobile;

  const toggleDropdown = () => {
    setDropdownOpen((value) => !value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(metaMaskAccount);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage("Copy to clipboard"), 2000);
  };

  const handleClickOutside = (event) => {
    if (dropdownOpen && !event.target.closest(`.${styles.walletContainer}`)) {
      setDropdownOpen(false);
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

  if (!metaMaskAccount) {
    return (
      <button className={styles.connectButton} onClick={handleConnectWallet}>
        {showInstallButton ? "Install MetaMask" : "Connect MetaMask"}
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
              title={copyMessage}>
              📋
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
