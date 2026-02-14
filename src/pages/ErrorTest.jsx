import React, { useState } from 'react';

const ErrorTest = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error to demonstrate the Error Boundary!');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Boundary Test</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to trigger an error and see the Error Boundary in action.
        </p>
        <button
          onClick={() => setShouldError(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Trigger Error
        </button>
      </div>
    </div>
  );
};

export default ErrorTest;