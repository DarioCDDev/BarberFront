// src/components/Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ isLoading, goingToTake }) => {
  return (
    isLoading && (
      <div className="loader-container">
        <div className="loader-spinner">
          {goingToTake && 
          <h2> Esto puede tardar unos minutos. Por favor, espere.</h2>}
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
