import React from 'react';
import styles from './styles.module.css';

const SubmissionButton = ({
  href = "https://developer.linea.build/configure/app",
  text = "Visit the Developer Hub",
}) => {
  return (
    <div className={styles.wrapper}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`submission-button ${styles.button}`}
      >
        {text}
      </a>
    </div>
  );
};

export default SubmissionButton;
