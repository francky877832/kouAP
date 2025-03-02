import React from 'react';
import '../styles/inlineLoadingStyles.css'

const InlineLoading = () => {
  return (
    <div className="inline-loading">
      <div className="inline-spinner"></div>
      <p className="inline-loading-text">Loading...</p>
    </div>
  );
};

export default InlineLoading;
