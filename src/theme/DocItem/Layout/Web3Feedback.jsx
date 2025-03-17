import React, { useState, useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { ethers } from "ethers";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import styles from "./Web3Feedback.module.css";

const Web3Feedback = () => {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

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
    
    try {
      // Initialize the Verax SDK with environment variables
      // In production, these would come from a secure source or wallet connection
      const veraxSdk = new VeraxSdk(
        VeraxSdk.DEFAULT_LINEA_SEPOLIA,
        process.env.WALLET_PUBLIC_KEY,
        process.env.WALLET_KEY
      );
      console.log("Verax SDK initialized");
      
      // Portal and schema IDs from your deployment
      const portalAddress = "0xF494B93E9661333d0e7Ca1B880B9Aaf79Cb84697";
      const schemaId = "0xb3cb018b837f70fa9cbb59bcfc59049fb529151399345845bae3d380b81c4120";
      
      console.log(`Preparing attestation with schema: ${schemaId}`);
      
      // Create attestation data
      const attestationData = {
        schemaId,
        expirationDate: 0, // No expiration
        subject: process.env.WALLET_PUBLIC_KEY, // The subject is the user's address
        attestationData: ethers.utils.defaultAbiCoder.encode(
          ["bool", "string", "address"],
          [isPositive, currentUrl, process.env.WALLET_PUBLIC_KEY]
        ),
      };
      
      console.log("Attestation data prepared, submitting...");
      
      // Submit the attestation
      const { transactionHash } = await veraxSdk.portal.attest(
        portalAddress,
        [attestationData],
        true // Wait for transaction validation
      );
      
      console.log(`Attestation submitted successfully! TX: ${transactionHash}`);
      setFeedbackSubmitted(true);
      
      // Reset after 5 seconds to allow for more feedback
      setTimeout(() => {
        setFeedbackSubmitted(false);
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
        </div>
      )}
    </div>
  );
};

export default Web3Feedback;
