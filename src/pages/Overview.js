import React, { useState } from 'react';

const Overview = (props) => {
  const { employeeName } = props;
  const { employees } = props.location.state;
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center max-w-md text-gray-600">
        <a className="text-blue-500 hover:text-blue-800" href="/">Back to Home</a>
        <h1 className="text-4xl font-bold text-blue-600">{employeeName}</h1>
        <div className="bg-gray-200 p-4">
          {employees.map((employee) =>
            <span class="block text-gray-700 text-center bg-gray-400 px-4 py-2 mt-2">{employee}</span>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Overview;
