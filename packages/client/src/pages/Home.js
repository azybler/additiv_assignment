import React, { useState } from 'react';
import { navigate } from '@reach/router';
import EmployeeSearchForm from '../components/EmployeeSearchForm';
import ErrorBadge from '../components/ErrorBadge';
import { fetchEmployees } from '../models/employees';

const Home = () => {
  // loading is used to disable the form while form is being submited and processing by server
  const [loading, setLoading] = useState(false);

  // errMsg determines the error message to show
  const [errMsg, setErrMsg] = useState('');

  const onSearchClick = async (ev) => {
    // Prevent the default behavior of HTMl5 form submitting
    ev.preventDefault();

    // Disable the form while form is being submited and processing by server
    setLoading(true);

    // Clear error message
    setErrMsg('');

    const formData = new FormData(ev.target);
    const employeeName = formData.get('employee_name');

    // Validate employee name
    if (employeeName.trim() === '') {
      setLoading(false);
      setErrMsg('Please enter an employee name.')
      return;
    }

    try {
      const employees = await fetchEmployees(employeeName);
      setLoading(false);
      if (employees.length === 0) {
        setErrMsg('No subordinates for this employee is found.');
      } else {
        navigate(`/overview/${employeeName}`, { state: { employees } });
      }
    } catch (ex) {
      setLoading(false);
      setErrMsg('Unknown server error.');
    }
  };

  return (
    <div>
      <ErrorBadge errMsg={errMsg} setErrMsg={setErrMsg} />
      <div className="h-screen flex justify-center items-center">
        <div className="text-center h-64 max-w-md text-gray-600">
          <h1 className="text-4xl font-bold text-blue-600">
            Employee Explorer
          </h1>
          <div className="mt-6 inline-flex">
            <EmployeeSearchForm
              loading={loading}
              onSearchClick={onSearchClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
