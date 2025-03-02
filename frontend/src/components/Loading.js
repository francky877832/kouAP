import React from 'react';
import { BounceLoader } from 'react-spinners';

import '../styles/loadingStyles.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner-container">
        <BounceLoader color="#3498db" size={40} />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
