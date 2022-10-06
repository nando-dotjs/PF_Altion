const express = require('express')

const app = express();

require('./database');

app.use(require('./routes/index.routes.js'))
app.listen(5000);
console.log('Server on port', 5000);