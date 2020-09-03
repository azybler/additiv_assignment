const app = require('./app');

const port = 8012;

const { index } = require('./search');

const employeesStructure = require('./data');

index(Object.keys(employeesStructure));

app().listen(port, () => console.log(`App started and listening on port ${port}`));
