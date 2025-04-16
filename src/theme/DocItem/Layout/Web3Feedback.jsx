import React, { useState, useEffect, useContext } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { ethers } from "ethers";
import { MetamaskProviderContext } from '@site/src/theme/Root';
import styles from "./styles.module.css";

// Only hardcode the portal and schema addresses, not wallet keys
const PORTAL_ADDRESS = "0xF494B93E9661333d0e7Ca1B880B9Aaf79Cb84697";
const SCHEMA_ID = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";
const LINEA_MAINNET_RPC = "https://rpc.linea.build";
const LINEA_MAINNET_CHAIN_ID = 59144;

// Portal contract ABI (just the attest function we need)
const PORTAL_ABI = [
  "function attest(tuple(bytes32 schemaId, uint64 expirationDate, bytes subject, bytes attestationData) attestationPayload, bytes[] validationPayload) public payable"
];

const Web3Feedback = () => {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);
  
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
      setFeedbackSubmitted(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setDebugInfo(null);
      }, 5000);
      
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