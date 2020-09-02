const { search } = require('../search');

const autocompleteEmployeeName = (req, res) => {
  const { keywords } = req.params;
  const results = search(keywords);
  return res.send(results);
};

module.exports = autocompleteEmployeeName;
