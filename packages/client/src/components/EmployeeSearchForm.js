import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { fetchAutocompleteEmployeeName } from '../models/employees';

const EmployeeSearchForm = ({ loading, onSearchClick }) => {
  const props = {};

  const debouncedFetchAutocompleteEmployeeName = debounce(async (keywords) => {
    const { setAutocompleteEmployees } = props;
    try {
      const res = await fetchAutocompleteEmployeeName(keywords);
      setAutocompleteEmployees(res);
    } catch (ex) {
      setAutocompleteEmployees([]);
    }
  }, 100);

  const autocompleteEmployeeName = async (ev) => {
    if (ev.target.value.length === 0) {
      const { setAutocompleteEmployees } = props;
      setAutocompleteEmployees([]);
      return;
    }
    debouncedFetchAutocompleteEmployeeName(ev.target.value);
  };

  const navigateAutocomplete = (ev) => {
    const { selectedIndex, selectPrev, selectNext } = props;
    if (ev.keyCode === 38) {
      // up key
      selectPrev();
      ev.preventDefault();
    } else if (ev.keyCode === 40) {
      // down key
      selectNext();
      ev.preventDefault();
    } else if (ev.keyCode === 13) {
      // enter
      ev.target.value = autocompleteEmployees[selectedIndex];
      const { setAutocompleteEmployees } = props;
      setAutocompleteEmployees([]);
    }
  };

  const [autocompleteEmployees, setAutocompleteEmployees] = useState([]);
  props.autocompleteEmployees = autocompleteEmployees;
  props.setAutocompleteEmployees = setAutocompleteEmployees;

  const [selectedIndex, setSelectedIndex] = useState(0);
  props.selectPrev = () => {
    if (selectedIndex !== 0) {
      setSelectedIndex(selectedIndex-1);
    }
  };
  props.selectNext = () => {
    setSelectedIndex(selectedIndex+1);
  };
  props.selectedIndex = selectedIndex;
  props.setSelectedIndex = setSelectedIndex;

  return (
    <form onSubmit={onSearchClick}>
      <input
        type="text"
        name="employee_name"
        className="appearance-none h-10 px-3 py-2"
        placeholder="Employee name"
        disabled={loading}
        onKeyUp={autocompleteEmployeeName}
        onKeyDown={navigateAutocomplete}
      />

      <div className="autocomplete-menu">
        {autocompleteEmployees.map((employee, index) =>
          <span
            key={employee}
            className={` ${
              index === selectedIndex ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-700'
            } block text-center px-4 py-2 mt-1`}
          >
            {employee}
          </span>
        )}
      </div>

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
