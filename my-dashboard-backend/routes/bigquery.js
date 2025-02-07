// routes/bigquery.js
const express = require('express');
const router = express.Router();
const bigqueryController = require('../controllers/bigqueryController');

// Endpoint to run a generic or custom query
// GET /api/bigquery/query?query=<your_query_here>
router.get('/query', bigqueryController.runQuery);

// Endpoint for CPU usage query
// GET /api/bigquery/cpu-usage
router.get('/usage', bigqueryController.runUsageQuery);

// Endpoint for Memory usage query
// GET /api/bigquery/memory-usage
router.get('/max-query', bigqueryController.runMaxQuery);

router.get('/througput', bigqueryController.getWeeklyUpfThroughput);
module.exports = router;