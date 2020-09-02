const app = require('./src/app');

const port = 8012;

const { index } = require('./src/search');

const employeesStructure = require('./data');

index(Object.keys(employeesStructure));

app().listen(port, () => console.log(`App started and listening on port ${port}`));