const employeesStructure = require('../../data');

const getEmployees = (req, res) => {
  return res.send(Object.keys(employeesStructure));
};

module.exports = getEmployees;
