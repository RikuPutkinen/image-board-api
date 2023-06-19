require('dotenv').config();
const express = require('express');
const v1Router = require('./v1/v1Routes');
const setupDb = require('./setupDb');

setupDb();
const app = express();
const PORT = process.env.SERVER_PORT || 9000;

app.use('/api/v1', v1Router);
app.get('/', (req, res) => res.json({message: 'GET index'}))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})