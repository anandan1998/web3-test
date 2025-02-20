import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 用于存储处理后的数据
  const [cpuData, setCpuData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [throughputData, setThroughputData] = useState([]);
  const [metrics, setMetrics] = useState({
    subscribers: 0,
    successRatio: 0,
    dropPacket: 0,
    received: 0,
    sent: 0
  });

  useEffect(() => {
    axios.get("http://localhost:5001/api/bigquery/usage")
      .then(response => {
        const usage = response.data.data; // 确保提取的是正确的数据数组
        console.log("API Data:", usage);
        processUsage(usage);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    console.log(cpuData); // This will log whenever cpuData is updated
  }, [cpuData]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/bigquery/max-query")
      .then((response) => {
        const data = response.data.data; // API 返回的数据数组
        console.log("API Data:", data);
  
        // 映射 API 数据到 metrics 状态，并进行取整
        const parsedMetrics = {
          subscribers: Math.round(data.find((item) => item.kpi_name === "ggsn_nbr_of_subscribers")?.max_value || 0),
          successRatio: Math.round((data.find((item) => item.kpi_name === "initial_registration_succ_ratio")?.max_value || 0) * 100), // 转换为整数百分比
          dropPacket: Math.round(data.find((item) => item.kpi_name === "pcupdp_dnn_payload_drop_packets_total")?.max_value || 0),
          received: Math.round(data.find((item) => item.kpi_name === "pcupdp_payload_received_bytes_total")?.max_value || 0),
          sent: Math.round(data.find((item) => item.kpi_name === "pcupdp_payload_sent_bytes_total")?.max_value || 0),
        };
  
        setMetrics(parsedMetrics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5001/api/bigquery/througput")
      .then(response => {
        const throughput = response.data.data; // 确保提取的是正确的数据数组
        console.log("API Data:", throughput);
        processThroughput(throughput);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    console.log(cpuData); // This will log whenever cpuData is updated
  }, [cpuData]);
 

  // 处理API返回的数据
  const processUsage = (usage) => {
    if (!Array.isArray(usage)) {
      console.error("Invalid data format", usage);
      return;
    }

    const cpuProcessed = usage
      .filter(item => item.kpi_name === "cpu_usage")
      .map(item => ({
        month: item.month, // 保留完整的月份信息
        value: item.avg_value
      }));

    console.log("Processed CPU Data:", cpuProcessed);
    setCpuData(cpuProcessed);

    const memoryProcessed = usage
      .filter(item => item.kpi_name === "memory_usage")
      .map(item => ({
        month: item.month,
        value: item.avg_value
      }));

    console.log("Processed Memory Data:", memoryProcessed);
    setMemoryData(memoryProcessed);
  };

  const processThroughput = (throughput) => {
    if (!Array.isArray(throughput)) {
      console.error("Invalid data format", throughput);
      return;
    }

    const throughputProcessed = throughput
      .filter(item => item.kpi_name === "upf_throughput")
      .map(item => ({
        week: item.week, // 保留完整的月份信息
        value: item.avg_value
      }));
    
    console.log("Processed Memory Data:", throughputProcessed);
    setThroughputData(throughputProcessed);
  };


  const styles = {
    metricsSection: { display: "flex", flexDirection: "column", gap: "20px" },
    card: { padding: "20px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" },
    title: { fontSize: "18px", fontWeight: "bold" },
    metricsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" },
    metricCard: { padding: "15px", border: "1px solid #ddd", borderRadius: "8px", textAlign: "center" },

    // ... (保持原有的styles对象不变)
    dashboardContainer: {
      padding: '20px',
      color: 'white',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '20px'
    },
    chartSection: {
      gridColumn: 'span 3',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    },
    metricsSection: {
      gridColumn: 'span 1'
    },
    card: {
      backgroundColor: '#353a44',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#f8af27' // 设置颜色为番茄红
    },    
    chartContainer: {
      height: '300px'
    },
    metricsGrid: {  
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '15px',
      marginBottom: '20px'
    },
    metricCard: {
      backgroundColor: '#353a44',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center'
    },
    throughputCard: {
      gridColumn: '1 / -1'
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.gridContainer}>
        <div style={styles.chartSection}>
          <div style={styles.card}>
            <h3 style={styles.title}>CPU Usage</h3>
            <div style={styles.chartContainer}>
              <ResponsiveContainer>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" data={cpuData} stroke="#8884d8" name="CPU Usage" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.title}>Memory Usage</h3>
            <div style={styles.chartContainer}>
              <ResponsiveContainer>
                <LineChart data={memoryData}>
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={styles.metricsSection}>
          <div style={{...styles.card, marginBottom: '20px'}}>
            <h3 style={styles.title}>Number of Subscribers</h3>
            <p style={{fontSize: '50px', fontWeight: 'bold'}}>{metrics.subscribers}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.title}>Initial Registration Success ratio</h3>
            <p style={{fontSize: '50px', fontWeight: 'bold'}}>{metrics.successRatio}  %</p>
          </div>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <p style={styles.title}>Payload_Drop packets</p>
          <p style={{fontSize: '35px'}}>{metrics.dropPacket}</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>Received_Drop packets</p>
          <p style={{fontSize: '35px'}}>{metrics.received}</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>Received Bytes</p>
          <p style={{fontSize: '35px'}}>{metrics.received}</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>Sent Bytes</p>
          <p style={{fontSize: '35px'}}>{metrics.sent}</p>
        </div>
      </div>

      <div style={{...styles.card, ...styles.throughputCard}}>
        <h3 style={styles.title}>Throughput changing</h3>
        <div style={{height: '300px'}}>
          <ResponsiveContainer>
            <LineChart data={throughputData}>
              <XAxis dataKey="time" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

