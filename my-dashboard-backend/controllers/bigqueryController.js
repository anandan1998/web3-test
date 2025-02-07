const { google } = require('googleapis');
const oauth2Client = require('../config/auth');

const projectId = process.env.GOOGLE_CLOUD_PROJECT;

// Function to format BigQuery response and fix scientific notation
const formatResponse = (rows, fieldNames) => {
  return rows.map(row => {
    let formattedRow = {};
    fieldNames.forEach((field, index) => {
      if (row.f[index].v !== null) {
        formattedRow[field] = isNaN(row.f[index].v) ? row.f[index].v : parseFloat(row.f[index].v);
      } else {
        formattedRow[field] = null;
      }
    });
    return formattedRow;
  });
};

// ✅ Default Query Endpoint
exports.runQuery = async (req, res) => {
  try {
    const query = req.query.query || `
      SELECT FORMAT_TIMESTAMP('%Y-%m', timestamp) AS month, 
             kpi_name,
             AVG(kpi_value) AS avg_value
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name IN ('cpu_usage', 'memory_usage')
      GROUP BY month, kpi_name
      ORDER BY month ASC;
    `;

    const bigquery = google.bigquery('v2');
    const response = await bigquery.jobs.query({
      auth: oauth2Client,
      projectId: projectId,
      requestBody: { query, useLegacySql: false }
    });

    const formattedData = formatResponse(response.data.rows, ['month', 'kpi_name', 'avg_value']);

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ CPU & Memory Usage Query
exports.runUsageQuery = async (req, res) => {
  try {
    const query = `
      SELECT FORMAT_TIMESTAMP('%Y-%m', timestamp) AS month, 
             kpi_name,
             AVG(kpi_value) AS avg_value
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name IN ('cpu_usage', 'memory_usage')
      GROUP BY month, kpi_name
      ORDER BY month ASC;
    `;

    const bigquery = google.bigquery('v2');
    const response = await bigquery.jobs.query({
      auth: oauth2Client,
      projectId: projectId,
      requestBody: { query, useLegacySql: false }
    });

    const formattedData = formatResponse(response.data.rows, ['month', 'kpi_name', 'avg_value']);

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error executing CPU usage query:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Max KPI Values Query
exports.runMaxQuery = async (req, res) => {
  try {
    const query = `
      SELECT 'ggsn_nbr_of_subscribers' AS kpi_name, MAX(kpi_value) AS max_value
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'ggsn_nbr_of_subscribers'

      UNION ALL

      SELECT 'initial_registration_succ_ratio', MAX(kpi_value)
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'initial_registration_succ_ratio'

      UNION ALL

      SELECT 'pcupdp_dnn_payload_drop_packets_total', MAX(kpi_value)
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'pcupdp_dnn_payload_drop_packets_total'

      UNION ALL

      SELECT 'pcupdp_ip_interface_received_drop_packets_total', MAX(kpi_value)
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'pcupdp_ip_interface_received_drop_packets_total'

      UNION ALL

      SELECT 'pcupdp_payload_received_bytes_total', MAX(kpi_value)
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'pcupdp_payload_received_bytes_total'

      UNION ALL

      SELECT 'pcupdp_payload_sent_bytes_total', MAX(kpi_value)
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'pcupdp_payload_sent_bytes_total';
    `;

    const bigquery = google.bigquery('v2');
    const response = await bigquery.jobs.query({
      auth: oauth2Client,
      projectId: projectId,
      requestBody: { query, useLegacySql: false }
    });

    const formattedData = formatResponse(response.data.rows, ['kpi_name', 'max_value']);

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error executing max KPI query:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Weekly UPF Throughput Query
exports.getWeeklyUpfThroughput = async (req, res) => {
  try {
    const query = `
      SELECT 
          FORMAT_TIMESTAMP('%Y-%W', timestamp) AS week,
          'upf_throughput' AS kpi_name,
          CAST(AVG(kpi_value) AS FLOAT64) AS avg_value
      FROM \`gcpsapperdev04-880e.monitoring_tenant21.5gc_kpis\`
      WHERE kpi_name = 'upf_throughput'
      GROUP BY week, kpi_name
      ORDER BY week ASC;
    `;

    const bigquery = google.bigquery('v2');
    const response = await bigquery.jobs.query({
      auth: oauth2Client,
      projectId: projectId,
      requestBody: { query, useLegacySql: false }
    });

    const formattedData = formatResponse(response.data.rows, ['week', 'kpi_name', 'avg_value']);

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error executing weekly UPF throughput query:", error);
    res.status(500).json({ error: error.message });
  }
};