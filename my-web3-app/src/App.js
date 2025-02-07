import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Welcome from './Welcome'; // 导入 Welcome 组件
import Dashboard from './dash'; // 你之前的 Dashboard 组件

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Router> {/* 确保 Router 包裹了所有路由 */}
      <div className="App">
        <header className="App-header">
          <h1>SRE Web3.0 Dashboard</h1>
          {!isConnected ? (
            <ConnectWallet setWalletAddress={setWalletAddress} setIsConnected={setIsConnected} />
          ) : (
            <Routes>
              <Route path="/Welcome" element={<Welcome walletAddress={walletAddress} />} />
              <Route path="/dash" element={<Dashboard />} />
            </Routes>
          )}
        </header>
      </div>
    </Router>
  );
}

function ConnectWallet({ setWalletAddress, setIsConnected }) {
  const navigate = useNavigate(); // useNavigate 在这个函数内部才有效

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        // 成功连接后跳转到 Welcome 页面
        navigate('/Welcome'); 
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this app!');
    }
  };

  return (
    <button 
      onClick={connectWallet}
      style={styles.button} // 这里应用样式
    >
      Connect Wallet
    </button>
  );
}
const styles = {
  button: {
    padding: '15px 30px',        // 增大按钮的内边距
    fontSize: '18px',            // 增大字体
    fontWeight: 'bold',          // 加粗字体
    backgroundColor: '#3498db', // 设置按钮背景颜色
    color: '#fff',              // 设置文字颜色
    border: 'none',             // 去掉按钮边框
    borderRadius: '8px',        // 圆角
    cursor: 'pointer',          // 鼠标变为手型
    transition: 'background-color 0.3s', // 添加背景色过渡效果
  },
};

export default App;
