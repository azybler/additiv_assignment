const employeesStructure = require('../../data');

const getEmployeesByEmployeeName = (req, res) => {
  const { employeeName } = req.params;
  const payload = employeesStructure[employeeName];
  if (payload !== undefined) {
    return res.send(payload);
  }
  return res.status(404).send({});
};

module.exports = getEmployeesByEmployeeName;
