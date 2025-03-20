import React, { createContext, useState, useEffect, useCallback } from "react";
import { MetaMaskSDK } from "@metamask/sdk";

// Create context for MetaMask provider
export const MetamaskProviderContext = createContext({
  metaMaskAccount: undefined,
  metaMaskAccountEns: undefined,
  setMetaMaskAccount: () => {},
  metaMaskDisconnect: () => new Promise(() => {}),
  metaMaskWalletIdConnectHandler: () => new Promise(() => {}),
  metaMaskProvider: undefined,
  setMetaMaskProvider: () => {},
  sdk: undefined,
});

// Initialize SDK
const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: "Linea Docs",
    url: "https://docs.linea.build/",
  },
  preferDesktop: true,
  extensionOnly: true,
  checkInstallationImmediately: false,
  logging: {
    sdk: false,
  },
});

const MetaMaskProvider = ({ children }) => {
  const [metaMaskProvider, setMetaMaskProvider] = useState(undefined);
  const [metaMaskAccount, setMetaMaskAccount] = useState(undefined);
  const [metaMaskAccountEns, setMetaMaskAccountEns] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  if (sdk.isInitialized() && !isInitialized) {
    setIsInitialized(true);
  }

  const metaMaskWalletIdConnectHandler = useCallback(async () => {
    try {
      console.log("Connecting to MetaMask...");
      const accounts = await sdk.connect();
      console.log("Connected accounts:", accounts);

      if (accounts && accounts.length > 0) {
        setMetaMaskAccount(accounts[0]);
        const provider = sdk.getProvider();
        setMetaMaskProvider(provider);
        console.log("MetaMask connected successfully");
      }
    } catch (err) {
      console.error("Failed to connect to MetaMask:", err);
    }
  }, []);

  const metaMaskDisconnect = useCallback(async () => {
    try {
      await sdk?.terminate();
      setMetaMaskAccount(undefined);
      setMetaMaskAccountEns(undefined);
      setMetaMaskProvider(undefined);
      console.log("MetaMask disconnected successfully");
    } catch (err) {
      console.error("Failed to disconnect from MetaMask:", err);
    }
  }, [sdk]);

  // Initialize provider on component mount
  useEffect(() => {
    const provider = sdk?.getProvider();
    setMetaMaskProvider(provider);

    // Check if already connected
    if (provider && provider.selectedAddress) {
      setMetaMaskAccount(provider.selectedAddress);
    }

    // Listen for account changes
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        console.log("Accounts changed:", accounts);
        if (accounts && accounts.length > 0) {
          setMetaMaskAccount(accounts[0]);
        } else {
          setMetaMaskAccount(undefined);
        }
      });
    }

    return () => {
      // Clean up listeners
      if (provider) {
        provider.removeAllListeners();
      }
    };
  }, []);

  // Resume SDK when initialized
  useEffect(() => {
    if (isInitialized && sdk.isExtensionActive()) {
      const provider = sdk.getProvider();
      sdk.resume();
      setMetaMaskProvider(provider);
    }
  }, [isInitialized]);

  return (
    <MetamaskProviderContext.Provider
      value={{
        metaMaskAccount,
        metaMaskAccountEns,
        setMetaMaskAccount,
        metaMaskDisconnect,
        metaMaskWalletIdConnectHandler,
        metaMaskProvider,
        setMetaMaskProvider,
        sdk,
      }}>
      {children}
    </MetamaskProviderContext.Provider>
  );
};

export default function Root({ children }) {
  return <MetaMaskProvider>{children}</MetaMaskProvider>;
}
