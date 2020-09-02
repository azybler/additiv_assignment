import React, { useState } from 'react';
import { navigate } from '@reach/router';
import EmployeeSearchForm from '../components/EmployeeSearchForm';
import ErrorDisplay from '../components/ErrorDisplay';
import fetchEmployees from '../models/employees';

const Home = () => {
  const props = {};

  const onSearchClick = async (ev) => {
    // Prevent the default behavior of HTMl5 form submitting
    ev.preventDefault();

    const { setLoading, setErrMsg } = props;

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
        navigate(`overview/${employeeName}`, { state: { employees } });
      }
    } catch (ex) {
      setLoading(false);
      setErrMsg('Unknown server error.');
    }
  };

  // loading is used to disable the form while form is being submited and processing by server
  const [loading, setLoading] = useState(false);
  props.setLoading = setLoading;

  // errKind determines the kind of error to show
  const [errMsg, setErrMsg] = useState('');
  props.setErrMsg = setErrMsg;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center h-64 max-w-md text-gray-600">
        <h1 className="text-4xl font-bold text-blue-600">
          Employee Explorer
        </h1>
        <div className="mt-6 inline-flex">
          <EmployeeSearchForm
            loading={loading}
            onSearchClick={onSearchClick} />
        </div>
        <ErrorDisplay errMsg={errMsg} />
      </div>
    </div>
  );
};

export default Home;
