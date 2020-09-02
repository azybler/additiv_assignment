import React from 'react';

const EmployeeSearchForm = ({ loading, onSearchClick }) => {
  return (
    <form onSubmit={onSearchClick}>
      <input
        type="text"
        name="employee_name"
        className="appearance-none h-10 px-3 py-2"
        placeholder="Employee name"
        disabled={loading}
      />
      <input
        type="submit"
        value="Search"
        className="bg-gray-600 text-white h-10 px-4 py-1 rounded rounded-l-none font-bold"
        disabled={loading}
      />
    </form>
  );
};

export default EmployeeSearchForm;
