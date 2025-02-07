import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const cpuData = [
  { month: 9, value: 30 },
  { month: 10, value: 45 },
  { month: 11, value: 55 },
  { month: 12, value: 48 }
];

const memoryData = [
  { month: 9, value: 40 },
  { month: 10, value: 35 },
  { month: 11, value: 42 },
  { month: 12, value: 45 }
];

const throughputData = Array(50).fill(0).map((_, i) => ({
  time: i,
  value: 50 + Math.sin(i / 5) * 30 + Math.random() * 10
}));

const styles = {
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

const Dashboard = () => {
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
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>1,234</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.title}>Success ratio</h3>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>98.5%</p>
          </div>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <p style={styles.title}>drop packet</p>
          <p style={{fontSize: '20px'}}>2</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>received</p>
          <p style={{fontSize: '20px'}}>4</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>received</p>
          <p style={{fontSize: '20px'}}>8</p>
        </div>
        <div style={styles.metricCard}>
          <p style={styles.title}>sent</p>
          <p style={{fontSize: '20px'}}>10</p>
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