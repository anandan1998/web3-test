// routes/bigquery.js
const express = require('express');
const router = express.Router();
const bigqueryController = require('../controllers/bigqueryController');

// GET /api/bigquery/query?query=<your_query_here>
router.get('/query', bigqueryController.runQuery);

module.exports = router;