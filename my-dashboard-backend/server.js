// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount BigQuery routes
const bigqueryRoutes = require('./routes/bigquery');
app.use('/api/bigquery', bigqueryRoutes);

// New metamask route
const metamaskAuthRoutes = require('./routes/metamaskAuth');
app.use('/api/metamask', metamaskAuthRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});