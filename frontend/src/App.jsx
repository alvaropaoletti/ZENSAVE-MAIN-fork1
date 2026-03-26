import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import ChatDashboard from './components/ChatDashboard';
import VaultScreen from './components/VaultScreen'; 
import './App.css';

function App() {
  // Manejamos las vistas: 'onboarding', 'chat', 'vaults'
  const [currentView, setCurrentView] = useState('onboarding');

  return (
    <div className="mobile-frame">
      <div className="app-container">
        {currentView === 'onboarding' && (
          <Onboarding onLogin={() => setCurrentView('chat')} />
        )}
        
        {currentView === 'chat' && (
          <ChatDashboard onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'vaults' && (
          <VaultScreen onNavigate={(view) => setCurrentView(view)} />
        )}
      </div>
    </div>
  );
}

export default App;