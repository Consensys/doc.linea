import React from 'react';

const SubmissionButton = ({ 
  href = "https://2urwb.share.hsforms.com/2M7Q9cFIWQxyZgLdocN3Smg?submissionGuid=07ed5477-53c1-498a-a5e7-41b12999d66c",
  text = "Submit your dapp"
}) => {
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#fff068';
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 6px 20px rgba(255, 240, 104, 0.3)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '#61dfff';
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0 4px 12px rgba(97, 223, 255, 0.2)';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0'
    }}>
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#61dfff',
          color: '#121212',
          border: 'none',
          padding: '16px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'AtypText, sans-serif',
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '1',
          cursor: 'pointer',
          borderRadius: '50px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(97, 223, 255, 0.2)',
          minHeight: '52px'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
    </div>
  );
};

export default SubmissionButton; 