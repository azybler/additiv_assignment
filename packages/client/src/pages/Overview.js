/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { navigate } from '@reach/router';
import ErrorBadge from '../components/ErrorBadge';
import { fetchEmployees } from '../models/employees';

const Overview = (props) => {
  const { employeeName } = props;
  const { employees } = props.location.state;

  // errMsg determines the error message to show
  const [errMsg, setErrMsg] = useState('');

  const showSubordinates = async (employeeName) => {
    setErrMsg('');
    try {
      const employees = await fetchEmployees(employeeName);
      if (employees.length === 0) {
        setErrMsg('No subordinates for this employee is found.');
      } else {
        navigate(`/overview/${employeeName}`, { state: { employees } });
      }
    } catch (ex) {
      setErrMsg('Unknown server error.');
    }
  };

  return (
    <div>
      <ErrorBadge errMsg={errMsg} setErrMsg={setErrMsg} />
      <div className="h-screen flex justify-center items-center">
        <div className="text-center max-w-md text-gray-600">
          <a
            className="pointer-hand text-blue-500 hover:text-blue-800"
            onClick={() => window.history.back()}  
          >
            &larr; Go back
          </a>
          <h1 className="text-4xl font-bold text-blue-600">
            {employeeName}
          </h1>
          <div className="bg-gray-200 p-4">
            {employees.map((employee) =>
              <a
                onClick={() => showSubordinates(employee)}
                key={employee}
                className="pointer-hand block text-gray-700 text-center bg-gray-400 px-4 py-2 mt-2"
              >
                {employee}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
