import React, { useState, useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createWalletClient, custom, http } from "viem";
import { lineaSepolia } from "viem/chains";
import styles from "./styles.module.css";

// Only hardcode the portal and schema addresses, not wallet keys
const PORTAL_ADDRESS = "0xF494B93E9661333d0e7Ca1B880B9Aaf79Cb84697";
const SCHEMA_ID = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";
const LINEA_SEPOLIA_RPC = "https://rpc.sepolia.linea.build";

const Web3Feedback = () => {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);
  
  // Get Dynamic wallet context
  const { user, primaryWallet, handleLogOut, showAuthFlow } = useDynamicContext();
  
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
    if (!user || !primaryWallet) {
      console.log("No wallet connected. Opening auth flow...");
      showAuthFlow();
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get the user's address
      const userAddress = primaryWallet.address;
      console.log("Connected wallet address:", userAddress);
      
      // Log available methods on the connector for debugging
      console.log("Connector:", primaryWallet.connector);
      console.log("Connector methods:", Object.keys(primaryWallet.connector));
      
      // Prepare the attestation data
      const attestationData = {
        isPositive: isPositive,
        articlePage: currentUrl,
        submitter: userAddress
      };
      
      try {
        // Get the provider from the wallet
        const provider = await primaryWallet.connector.getProvider();
        console.log("Provider:", provider);
        console.log("Provider methods:", Object.keys(provider));
        
        // Check if provider has request method (EIP-1193 compliant)
        if (provider && typeof provider.request === 'function') {
          console.log("Using provider.request method");
          
          // Create transaction parameters
          const transactionParameters = {
            to: PORTAL_ADDRESS,
            from: userAddress,
            data: `0x${Buffer.from(JSON.stringify({
              schemaId: SCHEMA_ID,
              attestationData: [attestationData]
            })).toString('hex')}`,
            chainId: '0xe707' // Linea Sepolia chainId in hex
          };
          
          // Send transaction using provider.request
          const txHash = await provider.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
          
          console.log("Transaction sent! Hash:", txHash);
          setFeedbackSubmitted(true);
          
          // Reset after 5 seconds
          setTimeout(() => {
            setFeedbackSubmitted(false);
          }, 5000);
        } else {
          throw new Error("Provider does not support the request method");
        }
      } catch (txError) {
        console.error("Transaction error:", txError);
        throw new Error(`Failed to submit transaction: ${txError.message}`);
      }
      
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
          <div className={styles.thankYouMessage}>
            Thank you for your feedback!
          </div>
        ) : (
          <>
            <span>Was this page helpful?</span>
            <div className={styles.feedbackButtons}>
              <button
                className={`${styles.feedbackButton} ${styles.thumbsUp}`}
                onClick={() => submitFeedback(true)}
                disabled={isSubmitting}
                aria-label="Thumbs up"
              >
                👍
              </button>
              <button
                className={`${styles.feedbackButton} ${styles.thumbsDown}`}
                onClick={() => submitFeedback(false)}
                disabled={isSubmitting}
                aria-label="Thumbs down"
              >
                👎
              </button>
            </div>
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
          {!user && (
            <button 
              onClick={showAuthFlow}
              className={styles.connectButton}
              style={{marginLeft: '10px', padding: '4px 8px', fontSize: '0.8rem'}}
            >
              Connect Wallet
            </button>
          )}
        </div>
      )}
      {user && (
        <div className={styles.walletInfo} style={{fontSize: '0.7rem', marginTop: '0.5rem', color: 'var(--ifm-color-emphasis-600)'}}>
          Connected: {primaryWallet?.address?.substring(0, 6)}...{primaryWallet?.address?.substring(38)}
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