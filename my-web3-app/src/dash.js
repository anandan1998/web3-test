import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
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
    axios.get('http://localhost:5001/api/bigquery/query')
      .then(response => {
        const usage = response.rows;
        processUsage(data);
        setLoading(false);
        const metrixs = response.rows;
        processMetrics(data);
        setLoading(false);
        const throughput = response.rows;
        processThroughput(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  // 处理API返回的数据
  const processUsage = (usage) => {
    // 处理CPU数据
    const cpuProcessed = usage.map(row => ({
      month: new Date(row.timestamp).getMonth() + 1,
      value: row.cpu_usage
    }));
    setCpuData(cpuProcessed);

    // 处理内存数据
    const memoryProcessed = data.map(row => ({
      month: new Date(row.timestamp).getMonth() + 1,
      value: row.memory_usage
    }));
    setMemoryData(memoryProcessed);
  };
  
  const processMetrics = () => {
    // 处理指标数据
    setMetrics({
      subscribers: data[data.length - 1]?.subscribers || 0,
      successRatio: data[data.length - 1]?.success_ratio || 0,
      dropPacket: data[data.length - 1]?.drop_packet || 0,
      received: data[data.length - 1]?.received || 0,
      sent: data[data.length - 1]?.sent || 0
    });
  };

  const processThroughput = () => { // 处理吞吐量数据
    const throughputProcessed = data.map((row, index) => ({
      time: index,
      value: row.throughput
    }));
      setThroughputData(throughputProcessed);
  };
  

  const styles = {
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
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    chartContainer: {
      height: '200px'
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
                <LineChart data={cpuData}>
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
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
            <h3 style={styles.title}>Subscribers</h3>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>{metrics.subscribers}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.title}>Success ratio</h3>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>{metrics.successRatio}%</p>
          </div>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <p style={styles.title}>drop packet</p>
          <p style={{fontSize: '20px'}}>{metrics.dropPacket}</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>received</p>
          <p style={{fontSize: '20px'}}>{metrics.received}</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>received</p>
          <p style={{fontSize: '20px'}}>{metrics.received}</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>sent</p>
          <p style={{fontSize: '20px'}}>{metrics.sent}</p>
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