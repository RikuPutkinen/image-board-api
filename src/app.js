require('dotenv').config();
const express = require('express');
const v1Router = require('./v1/v1Routes');
const setupDb = require('./setupDb');

setupDb();
const app = express();
const PORT = process.env.SERVER_PORT || 9000;

app.use('/uploads', express.static('../public/data/uploads'));
app.use('/api/v1', v1Router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})