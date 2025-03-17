import React, { useState, useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { ethers } from "ethers";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import styles from "./styles.module.css";

// For development, we'll hardcode these values
// In production, these would come from a secure backend
const WALLET_PUBLIC_KEY = ""; // Replace with your actual public key
const WALLET_KEY = ""; // Replace with your actual private key
const PORTAL_ADDRESS = "0xF494B93E9661333d0e7Ca1B880B9Aaf79Cb84697";
const SCHEMA_ID = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";

const Web3Feedback = () => {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);

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
  console.log(`Submitting ${isPositive ? 'positive' : 'negative'} feedback for ${currentUrl}`);
  setIsSubmitting(true);
  setError(null);
  setDebugInfo(null);
  
  try {
    // Initialize the Verax SDK
    const veraxSdk = new VeraxSdk(
      VeraxSdk.DEFAULT_LINEA_SEPOLIA,
      WALLET_PUBLIC_KEY,
      WALLET_KEY
    );
    console.log("Verax SDK initialized for Linea Sepolia");
    
    // First, verify the schema exists
    try {
      const schemaInfo = await veraxSdk.schema.getSchema(SCHEMA_ID);
      console.log("Schema found:", schemaInfo);
      console.log("Schema structure:", schemaInfo.schema);
    } catch (schemaError) {
      console.error("Error fetching schema:", schemaError);
      throw new Error(`Schema not found. Please verify the schema ID: ${SCHEMA_ID}`);
    }
    
    // Create attestation data with the correct structure
    const abiCoder = new ethers.AbiCoder();
    const encodedData = abiCoder.encode(
      ["bool", "string", "address"],
      [isPositive, currentUrl, WALLET_PUBLIC_KEY]
    );
    
    console.log(`Preparing attestation with schema: ${SCHEMA_ID}`);
    console.log(`Encoded data: ${encodedData}`);
    
    // Create the attestation request
    const attestationRequest = {
      schemaId: SCHEMA_ID,
      expirationDate: 0, // No expiration
      subject: WALLET_PUBLIC_KEY, // The subject is the user's address
      attestationData: encodedData
    };
    
    // Log the attestation data for debugging
    const debugData = {
      network: "Linea Sepolia",
      portalAddress: PORTAL_ADDRESS,
      schemaId: SCHEMA_ID,
      subject: WALLET_PUBLIC_KEY,
      encodedData: encodedData,
      currentUrl: currentUrl,
      isPositive: isPositive,
      schemaStructure: "(bool isPositive, string articlePage, address submitter)"
    };
    console.log("Debug data:", debugData);
    setDebugInfo(debugData);
    
    console.log("Attestation data prepared, submitting...");
    
    // Submit the attestation with explicit error handling
    try {
      const result = await veraxSdk.portal.attest(
        PORTAL_ADDRESS,
        [attestationRequest],
        true // Wait for transaction validation
      );
      
      console.log("Attestation result:", result);
      const transactionHash = result.transactionHash || result.hash || "unknown";
      
      console.log(`Attestation submitted successfully! TX: ${transactionHash}`);
      setFeedbackSubmitted(true);
    } catch (attestError) {
      console.error("Attestation submission error:", attestError);
      
      // Check for specific error messages
      if (attestError.message.includes("No matching Schema")) {
        throw new Error("Error in attestation submission: No matching Schema. The portal may not be configured to use this schema.");
      } else {
        throw new Error(`Error in attestation submission: ${attestError.message}`);
      }
    }
    
    // Reset after 5 seconds to allow for more feedback
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setDebugInfo(null);
    }, 5000);
    
  } catch (error) {
    console.error("Error submitting feedback:", error);
    setError(`Failed to submit feedback: ${error.message}`);
    
    // Still record the feedback locally even if blockchain submission fails
    console.log(`Recording local feedback: ${isPositive ? 'positive' : 'negative'} for ${currentUrl}`);
    setFeedbackSubmitted(true);
    
    // Reset after a longer timeout to allow users to see the error
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setError(null);
      setDebugInfo(null);
    }, 8000);
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