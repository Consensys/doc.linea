import React, { useState } from "react";
import styles from "./styles.module.css";

type Rating = "yes" | "no" | null;
type Phase = "initial" | "comment" | "submitted";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function FeedbackWidget(): React.ReactNode {
  const [rating, setRating] = useState<Rating>(null);
  const [phase, setPhase] = useState<Phase>("initial");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fireAnalyticsEvent = (selectedRating: Rating, reasonText: string) => {
    window.dataLayer?.push({
      event: "docs_feedback",
      page_url: window.location.pathname,
      rating: selectedRating,
      reason: reasonText,
    });
  };

  const handleRating = (selected: Rating) => {
    setRating(selected);
    setPhase("comment");
  };

  const handleSubmit = async () => {
    if (rating === "no" && !reason.trim()) return;

    setSubmitting(true);
    fireAnalyticsEvent(rating, reason.trim());

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_url: window.location.pathname,
          rating,
          reason: reason.trim(),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Don't block UX on backend errors
    }

    setPhase("submitted");
    setSubmitting(false);
  };

  const handleSkip = () => {
    fireAnalyticsEvent(rating, "");
    setPhase("submitted");
  };

  if (phase === "submitted") {
    return (
      <div className={styles.widget}>
        <p className={styles.thanks}>Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className={styles.widget}>
      <p className={styles.prompt}>Was this page helpful?</p>

      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.ratingBtn} ${rating === "yes" ? styles.selected : ""}`}
          onClick={() => handleRating("yes")}
          disabled={phase === "comment"}
          aria-pressed={rating === "yes"}>
          Yes
        </button>
        <button
          type="button"
          className={`${styles.ratingBtn} ${rating === "no" ? styles.selected : ""}`}
          onClick={() => handleRating("no")}
          disabled={phase === "comment"}
          aria-pressed={rating === "no"}>
          No
        </button>
      </div>

      {phase === "comment" && (
        <div className={styles.commentSection}>
          <label htmlFor="feedback-reason" className={styles.label}>
            {rating === "yes"
              ? "What worked well? (optional)"
              : "How can we improve this page?"}
          </label>
          <textarea
            id="feedback-reason"
            className={styles.textarea}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              rating === "yes"
                ? "Tell us what you liked..."
                : "Tell us what we can improve..."
            }
            maxLength={1000}
            rows={3}
            required={rating === "no"}
          />
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={submitting || (rating === "no" && !reason.trim())}>
              {submitting ? "Sending..." : "Submit"}
            </button>
            {rating === "yes" && (
              <button
                type="button"
                className={styles.skipBtn}
                onClick={handleSkip}>
                Skip
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
