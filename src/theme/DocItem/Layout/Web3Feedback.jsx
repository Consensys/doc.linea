import React, { useState, useEffect, useContext } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { ethers } from "ethers";
import { MetamaskProviderContext } from '@site/src/theme/Root';
import styles from "./styles.module.css";

// Only hardcode the portal and schema addresses, not wallet keys
const PORTAL_ADDRESS = "0x598440d1c9B3302ECaD9Cb3945717Ef2EC632746";
const SCHEMA_ID = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";
const LINEA_MAINNET_RPC = "https://rpc.linea.build";
const LINEA_MAINNET_CHAIN_ID = 59144;

// Portal contract ABI (just the attest function we need)
const PORTAL_ABI = [
  "function attest(tuple(bytes32 schemaId, uint64 expirationDate, bytes subject, bytes attestationData) attestationPayload, bytes[] validationPayload) public payable"
];

// Constants for external links
const VERAX_SCHEMA_URL = "https://explorer.ver.ax/linea/schemas/0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";
const LINEASCAN_TX_URL = "https://lineascan.build/tx/";

// Tooltip component
const Tooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className={styles.tooltipContainer}>
      <div 
        className={styles.tooltipTrigger}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className={styles.infoIcon}>ⓘ</span>
        <span className={styles.whatIsThis}>What is this?</span>
      </div>
      {isVisible && (
        <div className={styles.tooltipContent}>
          {text}
        </div>
      )}
    </div>
  );
};

const Web3Feedback = () => {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  
  // Get MetaMask context
  const { 
    metaMaskAccount, 
    metaMaskWalletIdConnectHandler, 
    metaMaskProvider,
    sdk
  } = useContext(MetamaskProviderContext);
  
  // Update theme when color mode changes
  useEffect(() => {
    setTheme(colorMode);
  }, [colorMode]);

  // Get current URL when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const submitFeedback = async (isPositive) => {
    console.log(`Preparing to submit ${isPositive ? "positive" : "negative"} feedback for ${currentUrl}`);
    
    // First, ensure user is connected to a wallet
    if (!metaMaskAccount) {
      console.log("No wallet connected. Opening MetaMask...");
      metaMaskWalletIdConnectHandler();
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setDebugInfo(null);
    setTransactionHash(null);
    
    try {
      console.log("Connected wallet address:", metaMaskAccount);
      
      // Check if we're on the right network
      const provider = metaMaskProvider;
      if (!provider) {
        throw new Error("MetaMask provider not available");
      }
      
      console.log("Getting chain ID...");
      const chainId = await provider.request({ method: 'eth_chainId' });
      const currentChainId = parseInt(chainId, 16);
      
      console.log("Current chain ID:", currentChainId);
      if (currentChainId !== LINEA_MAINNET_CHAIN_ID) {
        console.log("Switching to Linea Mainnet...");
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xe708' }], // Linea Mainnet in hex
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xe708',
                chainName: 'Linea Mainnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: [LINEA_MAINNET_RPC],
                blockExplorerUrls: ['https://lineascan.build/']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }
      
      // Create an ethers interface for encoding the function call
      const portalInterface = new ethers.Interface(PORTAL_ABI);
      
      // Encode the attestation data properly
      const abiCoder = new ethers.AbiCoder();
      const encodedAttestationData = abiCoder.encode(
        ["bool", "string", "address"],
        [isPositive, currentUrl, metaMaskAccount]
      );
      
      // Encode the subject (user address)
      const encodedSubject = abiCoder.encode(["address"], [metaMaskAccount]);
      
      // Create the attestation payload
      const attestationPayload = {
        schemaId: SCHEMA_ID,
        expirationDate: 0,
        subject: encodedSubject,
        attestationData: encodedAttestationData
      };
      
      // Encode the function call
      const encodedFunction = portalInterface.encodeFunctionData("attest", [
        attestationPayload,
        [] // Empty validation payload
      ]);
      
      // Get the current gas price with a premium to ensure it goes through
      console.log("Getting gas price...");
      const gasPrice = await provider.request({
        method: 'eth_gasPrice',
      });
      
      // Convert gas price to number and add 20% premium
      const gasPriceNum = parseInt(gasPrice, 16);
      const gasPriceWithPremium = Math.floor(gasPriceNum * 1.2).toString(16);
      console.log("Gas price:", gasPrice, "With premium:", "0x" + gasPriceWithPremium);
      
      // Estimate gas for the transaction
      console.log("Estimating gas...");
      const gasEstimate = await provider.request({
        method: 'eth_estimateGas',
        params: [{
          to: PORTAL_ADDRESS,
          from: metaMaskAccount,
          data: encodedFunction,
        }]
      });
      
      // Add 20% to gas estimate as well
      const gasEstimateNum = parseInt(gasEstimate, 16);
      const gasEstimateWithBuffer = Math.floor(gasEstimateNum * 1.2).toString(16);
      console.log("Gas estimate:", gasEstimate, "With buffer:", "0x" + gasEstimateWithBuffer);
      
      // Debug info
      const debugData = {
        chainId: currentChainId,
        address: metaMaskAccount,
        portalAddress: PORTAL_ADDRESS,
        schemaId: SCHEMA_ID,
        gasPrice: parseInt(gasPrice, 16),
        gasPriceWithPremium: parseInt("0x" + gasPriceWithPremium, 16),
        gasEstimate: parseInt(gasEstimate, 16),
        gasEstimateWithBuffer: parseInt("0x" + gasEstimateWithBuffer, 16),
      };
      console.log("Debug data:", debugData);
      setDebugInfo(debugData);
      
      // Create transaction parameters with proper gas settings
      const transactionParameters = {
        to: PORTAL_ADDRESS,
        from: metaMaskAccount,
        data: encodedFunction,
        chainId: '0xe708', // Linea Mainnet chainId in hex
        gasPrice: "0x" + gasPriceWithPremium,
        gas: "0x" + gasEstimateWithBuffer
      };
      
      console.log("Transaction parameters:", transactionParameters);
      
      // Send transaction using provider.request
      console.log("Sending transaction...");
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      console.log("Transaction sent! Hash:", txHash);
      setTransactionHash(txHash);
      setFeedbackSubmitted(true);
      
      // The thank you message will now persist until the page is refreshed
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(`Failed to submit feedback: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackPrompt}>
        {feedbackSubmitted ? (
          <div className={styles.feedbackSuccess}>
            <div className={styles.thankYouMessage}>
              Thank you for your feedback!
            </div>
            <div className={styles.veraxLinks}>
              <a 
                href={VERAX_SCHEMA_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.veraxLink}
              >
                View all feedback on the Verax explorer
              </a>
              {transactionHash && (
                <a 
                  href={`${LINEASCAN_TX_URL}${transactionHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.veraxLink}
                >
                  View your transaction on LineaScan
                </a>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.feedbackHeader}>
              <span>Was this page helpful?</span>
            </div>
            <div className={styles.feedbackButtons}>
                <button
                  className={`${styles.feedbackButton} ${styles.thumbsUp}`}
                  onClick={() => submitFeedback(true)}
                  disabled={isSubmitting}
                  aria-label="Thumbs up"
                >
                  <span className={styles.feedbackIcon}>
                    {/* :) */}
                    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.74 83.74">
                      <path d="M41.87,83.74c23.12,0,41.87-18.746,41.87-41.87S64.99,0,41.87,0,0,18.746,0,41.87s18.75,41.87,41.87,41.87Z" fill="#fff068" />
                      <path d="M41.87,51.875c5.53,0,10-4.477,10-10s-4.47-10-10-10-10,4.477-10,10,4.48,10,10,10Z" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path d="M37.87,43.875s1.5,2,4,2,4-2,4-2" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path d="M38.87,38.875h.01" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path d="M44.87,38.875h.01" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                  </span>
                </button>

                <button
                  className={`${styles.feedbackButton} ${styles.thumbsDown}`}
                  onClick={() => submitFeedback(false)}
                  disabled={isSubmitting}
                  aria-label="Thumbs down"
                >
                  <span className={styles.feedbackIcon}>
                    {/* :( */}
                    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.74 83.74">
                      <path d="M41.87,83.74c23.12,0,41.87-18.746,41.87-41.87S64.99,0,41.87,0,0,18.746,0,41.87s18.75,41.87,41.87,41.87Z" fill="#ff8d4c" />
                      <path d="M41.87,51.875c5.53,0,10-4.477,10-10s-4.47-10-10-10-10,4.477-10,10,4.48,10,10,10Z" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path d="M45.87,45.495s-1.5-2-4-2-4,2-4,2" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path d="M38.87,38.875h.01" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      <path d="M44.87,38.875h.01" fill="none" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                  </span>
                </button>
            </div>
            <Tooltip text="This is a trial feedback system that uses Verax to record your feedback as onchain attestations on Linea Mainnet. When you vote, submit a transaction in your wallet." />
          </>
        )}
      </div>
      {isSubmitting && (
        <div className={styles.loadingIndicator}>
          Submitting feedback...
        </div>
      )}
      {error && (
        <div className={styles.errorMessage}>
          {error}
          {!metaMaskAccount && (
            <button 
              onClick={metaMaskWalletIdConnectHandler}
              className={styles.connectButton}
              style={{marginLeft: '10px', padding: '4px 8px', fontSize: '0.8rem'}}
            >
              Connect MetaMask
            </button>
          )}
        </div>
      )}
      {metaMaskAccount && (
        <div className={styles.walletInfo} style={{fontSize: '0.7rem', marginTop: '0.5rem', color: 'var(--ifm-color-emphasis-600)'}}>
          Connected: {metaMaskAccount.substring(0, 6)}...{metaMaskAccount.substring(38)}
        </div>
      )}
      {debugInfo && (
        <div className={styles.debugInfo} style={{fontSize: '0.8rem', marginTop: '1rem', color: 'var(--ifm-color-emphasis-600)', textAlign: 'left'}}>
          <details>
            <summary>Debug Information</summary>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Web3Feedback;