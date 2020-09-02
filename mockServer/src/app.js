const express = require('express');
const cors = require('cors')

const {
  getEmployees,
  getEmployeesByEmployeeName,
  autocompleteEmployeeName,
} = require('./handlers');

module.exports = () => {
  const app = express();
  app.use(cors());
  app.get('/employees', getEmployees);
  app.get('/employees/:employeeName', getEmployeesByEmployeeName);
  app.get('/employees/autocomplete/:keywords', autocompleteEmployeeName);
  return app;
};
