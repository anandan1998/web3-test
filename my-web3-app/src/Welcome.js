import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ walletAddress }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 设置 1 秒后跳转到主页
    const timer = setTimeout(() => {
      navigate('/dash'); // 假设你要跳转到/dashboard
    }, 1000); // 1 秒

    // 清理定时器
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        <p>Connected Wallet: {walletAddress}</p>
        <p>Loading...</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // 让容器充满整个屏幕
    backgroundColor: '#2c3e50',
    color: '#fff'
  },
  card: {
    padding: '20px',
    backgroundColor: '#34495e',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  }
};

export default Welcome;
