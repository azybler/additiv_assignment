import React from 'react';

const Overview = (props) => {
  const { employeeName } = props;
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center max-w-md text-gray-600">
        <h1 className="text-4xl font-bold text-blue-600">{employeeName}</h1>
        <div className="mt-6 inline-flex">
        </div>
      </div>
    </div>
  );
}

export default Overview;
