import React, { useState, useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import styles from "./styles.module.css";

// For development, we'll hardcode these values
// In production, these would come from a secure backend
const WALLET_PUBLIC_KEY = "";
const WALLET_KEY = "";
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
  console.log(`Submitting ${isPositive ? "positive" : "negative"} feedback for ${currentUrl}`);
  setIsSubmitting(true);
  setError(null);
  setDebugInfo(null);

  try {
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

    // Prepare the attestation data
    const attestationRequest = {
      schemaId: SCHEMA_ID,
      expirationDate: 0,
      subject: WALLET_PUBLIC_KEY,
      attestationData: [{
          isPositive: isPositive,
          articlePage: currentUrl,
          submitter: WALLET_PUBLIC_KEY,
        }
      ]
    };
    console.log("Attestation data prepared:", attestationRequest);

    // Log the attestation data for debugging
    const debugData = {
      network: "Linea Sepolia",
      portalAddress: PORTAL_ADDRESS,
      schemaId: SCHEMA_ID,
      subject: WALLET_PUBLIC_KEY,
      currentUrl: currentUrl,
      isPositive: isPositive,
      schemaStructure: "(bool isPositive, string articlePage, address submitter)",
    };
    console.log("Debug data:", debugData);

    // Submit the attestation
    const result = await veraxSdk.portal.attest(PORTAL_ADDRESS, attestationRequest, []);
    console.log("Attestation submitted successfully! TX:", result.transactionHash);
    setFeedbackSubmitted(true);

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