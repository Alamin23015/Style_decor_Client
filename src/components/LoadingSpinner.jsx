import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
     
      <span className="loading loading-spinner loading-lg text-primary scale-150"></span>
      
       
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;