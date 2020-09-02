import React, { useState } from 'react';
import { navigate } from '@reach/router';

const Home = () => {
  const props = {};

  const onSearchClick = async (ev) => {
    ev.preventDefault();

    const { setErrMsg, setLoading } = props;

    // Clear error message.
    setErrMsg('');

    // Disable the form while form is being submited and processing by server
    setLoading(true);

    const formData = new FormData(ev.target);
    const employeeName = formData.get('employee_name');
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
      <div className="text-center max-w-md text-gray-600">
        <h1 className="text-4xl font-bold text-blue-600">Employee Explorer</h1>

        <div className="mt-6 inline-flex">

          {/* Employee search form */}
          <form onSubmit={onSearchClick}>
            <input
              type="text"
              name="employee_name"
              className="appearance-none px-3 py-2"
              placeholder="Employee name"
              disabled={loading}
            />
            <input
              type="submit"
              value="Search"
              className="bg-gray-600 text-white px-4 py-1 rounded rounded-l-none font-bold"
              disabled={loading}
            />
          </form>
        </div>

        {/* Error message */}
        <div
          className={` ${
            errMsg === '' ? 'hidden' : ''
          } bg-gray-200 p-4`}
        >
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errMsg}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
