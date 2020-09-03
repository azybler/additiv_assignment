import React from 'react';

const ErrorDisplay = ({ errMsg }) => {
  return (
    <div
      className={` ${
        errMsg === '' ? 'hidden' : ''
      } bg-gray-200 p-4`}
    >
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">
          {errMsg}
        </span>
      </div>
    </div>
  );
};

export default ErrorDisplay;
