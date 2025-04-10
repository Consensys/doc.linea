import React, { useState, useEffect, useContext } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { ethers } from "ethers";
import { MetamaskProviderContext } from '@site/src/theme/Root';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import styles from "./styles.module.css";

// Only hardcode the portal and schema addresses, not wallet keys
const PORTAL_ADDRESS = "0xF494B93E9661333d0e7Ca1B880B9Aaf79Cb84697";
const SCHEMA_ID = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";
const LINEA_SEPOLIA_RPC = "https://rpc.sepolia.linea.build";
const LINEA_SEPOLIA_CHAIN_ID = 59141;

// Portal contract ABI (just the attest function we need)
const PORTAL_ABI = [
  "function attest(tuple(bytes32 schemaId, uint64 expirationDate, bytes subject, bytes attestationData) attestationPayload, bytes[] validationPayload) public payable"
];

// Function to extract URL and feedback data from transaction input
const extractFeedbackData = (inputData) => {
  try {
    if (!inputData) {
      console.log("No input data provided");
      return null;
    }
    
    console.log("Processing transaction data...");
    
    // Create an interface for decoding
    const abiCoder = new ethers.AbiCoder();
    
    // Remove the function selector (first 4 bytes / 8 hex chars + '0x')
    const data = '0x' + inputData.slice(10);
    
    try {
      // Decode attestation payload
      const [attestationPayload, _] = abiCoder.decode(
        ['tuple(bytes32 schemaId, uint64 expirationDate, bytes subject, bytes attestationData)', 'bytes[]'],
        data
      );
      
      // Decode attestation data to get feedback details
      const [isPositive, url, userAddress] = abiCoder.decode(
        ['bool', 'string', 'address'],
        attestationPayload.attestationData
      );
      
      console.log("Successfully decoded feedback data:", { isPositive, url });
      
      // Normalize URL path
      let normalizedUrl = url;
      
      // Handle full URLs or just paths
      if (normalizedUrl && typeof normalizedUrl === 'string') {
        // Try to parse as URL if it has protocol
        if (normalizedUrl.includes('://')) {
          try {
            const urlObj = new URL(normalizedUrl);
            normalizedUrl = urlObj.pathname;
          } catch (e) {
            // If URL parsing fails, proceed with the string as is
            console.log("URL parsing failed:", e.message);
          }
        }
        
        // Ensure consistent format
        normalizedUrl = normalizedUrl.startsWith('/') ? normalizedUrl : '/' + normalizedUrl;
        normalizedUrl = normalizedUrl.replace(/\/+$/, ''); // Remove trailing slashes
      } else {
        console.log("Invalid URL format in payload:", url);
        return null;
      }
      
      return {
        url: normalizedUrl,
        isPositive,
        userAddress
      };
    } catch (error) {
      console.error("Error decoding transaction data:", error);
      return null;
    }
  } catch (error) {
    console.error("Error extracting feedback data:", error);
    return null;
  }
};

const Web3Feedback = () => {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  
  // Access API key from environment directly if customFields doesn't have it
  // This is for debugging only - in production, use the config setup
  const envApiKey = typeof process !== 'undefined' && process.env && process.env.LINEA_SCAN_API_KEY;
  const configApiKey = siteConfig?.customFields?.lineaScanApiKey;
  const LINEA_SCAN_API_KEY = configApiKey || envApiKey || '4HGIEUCE29MIAW7U23RGEB1N72BN7PNJTJ'; // Fallback to the key from your .env
  
  console.log("API Keys - Config:", configApiKey, "Env:", envApiKey, "Using:", LINEA_SCAN_API_KEY);
  
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCounts, setIsFetchingCounts] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  
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

  // Get current URL when component mounts or location changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = location.pathname.replace(/\/+$/, ''); // Remove trailing slashes
      setCurrentUrl(pathname.startsWith('/') ? pathname : '/' + pathname);
    }
  }, [location]);
  
  // Helper function to check if paths match for feedback purposes
  const pathsMatch = (path1, path2) => {
    if (!path1 || !path2) return false;
    
    // Normalize paths: remove trailing slashes and ensure leading slash
    const normalize = (p) => {
      p = p.replace(/\/+$/, '');
      p = p.startsWith('/') ? p : '/' + p;
      // Remove any domain part if present
      if (p.includes('://')) {
        try {
          const url = new URL(p);
          p = url.pathname;
        } catch (e) {
          // If parsing fails, just use the path as is
        }
      }
      return p;
    };
    
    const normalizedPath1 = normalize(path1);
    const normalizedPath2 = normalize(path2);
    
    // Special case for the root page with web3-feedback prefix
    if (normalizedPath1 === '/web3-feedback' && normalizedPath2 === '/') {
      console.log("✅ Match for root page with prefix");
      return true;
    }
    
    if (normalizedPath2 === '/web3-feedback' && normalizedPath1 === '/') {
      console.log("✅ Match for root page with prefix");
      return true;
    }
    
    // Log the path comparison for debugging
    console.log(`Comparing paths: "${normalizedPath1}" vs "${normalizedPath2}"`);
    
    // For exact match
    if (normalizedPath1 === normalizedPath2) {
      console.log("✅ Exact match");
      return true;
    }
    
    // Remove index.html if present
    const cleanPath1 = normalizedPath1.replace(/\/index\.html$/, '');
    const cleanPath2 = normalizedPath2.replace(/\/index\.html$/, '');
    
    if (cleanPath1 === cleanPath2) {
      console.log("✅ Match after cleaning index.html");
      return true;
    }
    
    // Check for paths that are the same when trailing slash is normalized
    if (cleanPath1 + '/' === cleanPath2 || cleanPath1 === cleanPath2 + '/') {
      console.log("✅ Match with trailing slash difference");
      return true;
    }
    
    // Handle baseUrl in development - check if one path has /web3-feedback prefix
    if (cleanPath1 === '/web3-feedback' + cleanPath2 || cleanPath2 === '/web3-feedback' + cleanPath1) {
      console.log("✅ Match with baseUrl difference");
      return true;
    }
    
    // Check for hash/query parameters
    const basePath1 = cleanPath1.split(/[#?]/)[0];
    const basePath2 = cleanPath2.split(/[#?]/)[0];
    
    if (basePath1 === basePath2) {
      console.log("✅ Match ignoring hash/query");
      return true;
    }
    
    console.log("❌ No match");
    return false;
  };
  
  // Fetch feedback counts when component mounts or URL changes
  useEffect(() => {
    if (currentUrl) {
      fetchFeedbackCounts();
      
      // Set up interval to refresh counts every 30 seconds
      const interval = setInterval(() => {
        fetchFeedbackCounts();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [currentUrl, LINEA_SCAN_API_KEY]);

  // Function to fetch feedback counts from Lineascan API 
  const fetchFeedbackCounts = async () => {
    if (!currentUrl) {
      console.log("No current URL available");
      return;
    }
    
    console.log("Fetching feedback counts for:", currentUrl);
    console.log("Using API key:", LINEA_SCAN_API_KEY ? "Available" : "Missing");
    setIsFetchingCounts(true);
    
    try {
      // Use Lineascan API to get transactions for the portal contract
      const apiUrl = `https://api-sepolia.lineascan.build/api?module=account&action=txlist&address=${PORTAL_ADDRESS}&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&apikey=${LINEA_SCAN_API_KEY}`;
      
      console.log("Fetching from API URL:", apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log("API response status:", data.status, "message:", data.message);
      
      if (!data.result || data.status === "0") {
        console.error("API error:", data);
        throw new Error(data.message || "Failed to fetch transaction data");
      }
      
      // Filter transactions that include our schema ID
      const relevantTxs = data.result.filter(tx => 
        tx.input && tx.input.includes(SCHEMA_ID.slice(2))
      );
      
      console.log(`Found ${relevantTxs.length} transactions with schema ID`);
      
      // Process transactions to count feedback for the current URL
      let positiveCount = 0;
      let negativeCount = 0;
      let matchedTransactions = 0;
      
      for (const tx of relevantTxs) {
        const feedbackData = extractFeedbackData(tx.input);
        
        if (feedbackData) {
          console.log("Transaction URL:", feedbackData.url);
          
          if (pathsMatch(feedbackData.url, currentUrl)) {
            matchedTransactions++;
            console.log(`Match found for transaction: ${tx.hash}`);
            if (feedbackData.isPositive) {
              positiveCount++;
            } else {
              negativeCount++;
            }
          }
        }
      }
      
      console.log(`Matched ${matchedTransactions} transactions for current URL. Positive: ${positiveCount}, Negative: ${negativeCount}`);
      
      setPositiveCount(positiveCount);
      setNegativeCount(negativeCount);
      setError(null);
    } catch (error) {
      console.error("Error fetching feedback counts:", error);
      // Now show API errors to help with debugging
      setError(`Error fetching counts: ${error.message}`);
    } finally {
      setIsFetchingCounts(false);
    }
  };

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
      if (currentChainId !== LINEA_SEPOLIA_CHAIN_ID) {
        console.log("Switching to Linea Sepolia...");
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xe707' }], // Linea Sepolia in hex
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xe707',
                chainName: 'Linea Sepolia',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: [LINEA_SEPOLIA_RPC],
                blockExplorerUrls: ['https://sepolia.lineascan.build/']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }
      
      // Create an ethers interface for encoding the function call
      const portalInterface = new ethers.Interface(PORTAL_ABI);
      
      // When encoding the attestation data, make sure we're using just the pathname
      const pathname = currentUrl;
      console.log("Submitting feedback for pathname:", pathname);
      
      // Encode the attestation data properly
      const abiCoder = new ethers.AbiCoder();
      const encodedAttestationData = abiCoder.encode(
        ["bool", "string", "address"],
        [isPositive, pathname, metaMaskAccount]
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
        chainId: '0xe707', // Linea Sepolia chainId in hex
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
      
      // Wait for the transaction to be mined
      const ethersProvider = new ethers.BrowserProvider(provider);
      await ethersProvider.waitForTransaction(txHash);
      
      // Refresh the feedback counts after a short delay to allow indexing
      setTimeout(() => {
        fetchFeedbackCounts();
      }, 5000);
      
      // Reset feedback submitted state after a delay
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
              <div className={styles.feedbackButtonContainer}>
                <button
                  className={`${styles.feedbackButton} ${styles.thumbsUp}`}
                  onClick={() => submitFeedback(true)}
                  disabled={isSubmitting}
                  aria-label="Thumbs up"
                >
                  👍
                </button>
                <span className={styles.feedbackCount}>
                  {isFetchingCounts ? "..." : positiveCount}
                </span>
              </div>
              <div className={styles.feedbackButtonContainer}>
                <button
                  className={`${styles.feedbackButton} ${styles.thumbsDown}`}
                  onClick={() => submitFeedback(false)}
                  disabled={isSubmitting}
                  aria-label="Thumbs down"
                >
                  👎
                </button>
                <span className={styles.feedbackCount}>
                  {isFetchingCounts ? "..." : negativeCount}
                </span>
              </div>
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
            >
              Connect MetaMask
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Web3Feedback;