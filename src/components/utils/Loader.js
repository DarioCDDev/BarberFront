// src/components/Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loader-container">
        <div className="loader-spinner">
          <ClipLoader
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    )
  );
};

export default Loader;
