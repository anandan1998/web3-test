import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this app!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Web3 App</h1>
        {!isConnected ? (
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div>
            <p>Connected Wallet: {walletAddress}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
