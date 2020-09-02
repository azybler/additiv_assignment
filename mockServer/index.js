const app = require('./src/app');

const port = 8012;

app().listen(port, () => console.log(`App started and listening on port ${port}`));