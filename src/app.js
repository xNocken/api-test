const express = require('express');
const testRoutes = require('./routes');
const auth = require('./middleware/auth');
const app = express();

app.use(auth);
app.use(express.json());
app.use('/api/v1/', testRoutes)

module.exports = app;
