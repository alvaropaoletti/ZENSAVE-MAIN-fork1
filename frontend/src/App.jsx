import React, { useState, useCallback } from 'react';
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

  const handleAutoConnect = useCallback((data) => {
    console.log("handleAutoConnect recibido:", data);
    setUserData(data); 
  }, []);

  return (
    <div className="mobile-frame">
      <XOAutoConnect onConnect={handleAutoConnect} />
      <div className="app-container">
        {currentView === 'chat' && (
          <ChatDashboard 
            onNavigate={setCurrentView} 
            userAddress={userData.address} 
            userData={userData} 
          />
        )}
        {currentView === 'vaults' && (
          <VaultScreen onNavigate={setCurrentView} userAddress={userData.address} />
        )}
        {currentView === 'stats' && <StatsScreen onNavigate={setCurrentView} />}
        {currentView === 'settings' && (
            <SettingsScreen onNavigate={setCurrentView} userData={userData} />
        )}
      </div>
    </div>
  );
}

export default App;