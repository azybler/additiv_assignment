// const DATA_API_URI = `http://api.additivasia.io/api/v1/assignment/employees`;
const DATA_API_URI = `http://localhost:8012/employees`;

const fetchEmployees = async (employeeName) => {
  const cache = {};
  const employees = {};
  try {
    await fetchEmployeesHelper(employeeName, cache, employees);
    return Object.keys(employees);
  } catch (ex) {
    throw ex;
  }
};

const fetchEmployeesHelper = async (employeeName, cache, employees) => {
  const cacheData = cache[employeeName];
  if (cacheData !== undefined) {
    return;
  }
  const requestURI = `${DATA_API_URI}/${encodeURIComponent(employeeName)}`;
  try {
    const results = await fetch(requestURI);
    if (results.status === 200) {
      let data = await results.json();
      cache[employeeName] = data;
      if (data.length === 2) {
        const directSubordinates = data[1]['direct-subordinates'];
        const promises = [];
        for (let i = 0; i < directSubordinates.length; i++) {
          const employeeName = directSubordinates[i];
          employees[employeeName] = 1;
          promises.push(fetchEmployeesHelper(employeeName, cache, employees));
        }
        return Promise.all(promises);
      }
    } else {
      cache[employeeName] = [];
    }
  } catch (ex) {
    throw ex;
  }
};

export default fetchEmployees;
