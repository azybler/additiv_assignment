const data = require('../../data');

const getEmployees = (req, res) => {
  return res.send(Object.keys(data));
};

module.exports = getEmployees;
