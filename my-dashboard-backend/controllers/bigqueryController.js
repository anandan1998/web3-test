// controllers/bigqueryController.js
const { google } = require('googleapis');
const oauth2Client = require('../config/auth');

const projectId = process.env.GOOGLE_CLOUD_PROJECT;

exports.runQuery = async (req, res) => {
  try {
    // Use the query passed as a query parameter, or a default query.
    const query = req.query.query ||  `
    SELECT kpi_name, COUNT(*) AS record_count 
    FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
    GROUP BY kpi_name 
    ORDER BY record_count DESC;
  `;
    // Initialize BigQuery API client
    const bigquery = google.bigquery('v2');

    // Execute the query
    const response = await bigquery.jobs.query({
      auth: oauth2Client,
      projectId: projectId,
      requestBody: {
        query: query,
        useLegacySql: false
      }
    });

    // Return the result rows and metadata as JSON
    res.json(response.data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};