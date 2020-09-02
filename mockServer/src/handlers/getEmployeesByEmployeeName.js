const data = require('../../data');

const getEmployeesByEmployeeName = (req, res) => {
  const { employeeName } = req.params;
  const payload = data[employeeName];
  if (payload !== undefined) {
    return res.send(payload);
  }
  return res.status(404).send({});
};

module.exports = getEmployeesByEmployeeName;
