import React, { useState } from 'react';
import { XOConnectProvider } from 'xo-connect';
import ChatDashboard from './components/ChatDashboard';
import VaultScreen from './components/VaultScreen';
import StatsScreen from './components/StatsScreen';
import SettingsScreen from './components/SettingsScreen';
import XOAutoConnect from './components/XOAutoConnect';
import './App.css';

const RSK_TESTNET_HEX = '0x1f'; 
const RSK_RPC_URL = 'https://public-node.testnet.rsk.co';

function App() {
  const [currentView, setCurrentView] = useState('chat');
  const [userData, setUserData] = useState({ address: null, alias: null });

  const handleAutoConnect = (data) => {
    setUserData(data); 
  };

  const conectarManualmente = async (e) => {
    if (e) e.preventDefault();
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setUserData({ address: accounts[0], alias: null });
          return;
        }
      }

      const provider = new XOConnectProvider({
        debug: false,
        defaultChainId: RSK_TESTNET_HEX,
        rpcs: { [RSK_TESTNET_HEX]: RSK_RPC_URL },
      });

      const accounts = await provider.request({ method: 'eth_requestAccounts' });

      if (accounts && accounts.length > 0) {
        const client = await provider.getClient();
        setUserData({
          address: accounts[0],
          alias: client?.alias || null
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="mobile-frame">
      <XOAutoConnect onConnect={handleAutoConnect} />

      {!userData.address && (
        <button 
          onClick={conectarManualmente}
          onTouchEnd={conectarManualmente}
          style={{ 
            position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: '#00E676', color: 'black', padding: '10px 20px', 
            borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', border: 'none', 
            cursor: 'pointer', zIndex: 999999, boxShadow: '0px 4px 10px rgba(0,0,0,0.5)'
          }}
        >
          🔗 Conectar Beexo
        </button>
      )}

      <div className="app-container">
        {currentView === 'chat' && (
          <ChatDashboard onNavigate={setCurrentView} userAddress={userData.address} userData={userData} />
        )}
        {currentView === 'vaults' && (
          <VaultScreen onNavigate={setCurrentView} userAddress={userData.address} />
        )}
        {currentView === 'stats' && <StatsScreen onNavigate={setCurrentView} />}
        {currentView === 'settings' && <SettingsScreen onNavigate={setCurrentView} />}
      </div>

      {userData.address && (
        <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '12px', color: '#4CAF50', fontWeight: 'bold', zIndex: 10000 }}>
          ● {userData.alias || `${userData.address.substring(0, 6)}...`}
        </div>
      )}
    </div>
  );
}

export default App;