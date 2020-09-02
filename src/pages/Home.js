import React, { useState } from 'react';
import { navigate } from '@reach/router';
import EmployeeSearchForm from '../components/EmployeeSearchForm';
import ErrorDisplay from '../components/ErrorDisplay';

const Home = () => {
  const props = {};

  const onSearchClick = async (ev) => {
    // Prevent the default behavior of HTMl5 form submitting
    ev.preventDefault();

    const { setErrMsg, setLoading } = props;

    // Clear error message
    setErrMsg('');

    // Disable the form while form is being submited and processing by server
    setLoading(true);

    const formData = new FormData(ev.target);

    const employeeName = formData.get('employee_name');

    // Validate employee name
    if (employeeName.trim() === '') {
      setErrMsg('Please enter an employee name.')
      setLoading(false);
      return;
    }

    const requestURI = `http://api.additivasia.io/api/v1/assignment/employees/${encodeURIComponent(employeeName)}`;

    try {
      const results = await fetch(requestURI);
      setLoading(false);
      if (results.status === 200) {
        // let data = await results.json();
        navigate(`overview/${employeeName}`);
      } else if (results.status === 404) {
        setErrMsg('No such employee found.');
      } else {
        setErrMsg('Unknown server error.');
      }
    } catch (ex) {
      setErrMsg('Unknown server error.');
    }
  };

  // errKind determines the kind of error to show
  const [errMsg, setErrMsg] = useState('');
  props.setErrMsg = setErrMsg;

  // loading is used to disable the form while form is being submited and processing by server
  const [loading, setLoading] = useState(false);
  props.setLoading = setLoading;

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
}

export default Home;
