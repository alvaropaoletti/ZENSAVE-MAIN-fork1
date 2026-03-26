import React from 'react';

function VaultScreen({ onNavigate }) {
  // Datos simulados (Mock) para mostrar en el prototipo.
  // En la versión final, STICH reemplazará esto con una llamada a RSK Testnet.
  const activeVaults = [
    {
      id: 1,
      title: "Reto Zapatillas",
      lockedAmount: "10.00 DoC",
      assetPurchased: "RBTC",
      progressPercent: 25,
      statusText: "Semana 1 de 4",
      isActive: true
    },
    {
      id: 2,
      title: "Fondo de Emergencia",
      lockedAmount: "50.00 DoC",
      assetPurchased: "RBTC",
      progressPercent: 100,
      statusText: "Completado",
      isActive: false
    }
  ];

  return (
    <section className="app-screen active vault-screen">
      <header className="app-header">
        <div className="header-left">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" />
        </div>
        <div className="header-center">
          <span className="balance-label">TOTAL PROTEGIDO</span>
          <span className="balance-value">$60.00</span>
        </div>
        <div className="header-right">
          <button className="wallet-icon">💳</button>
        </div>
      </header>

      <div className="chat-title-area">
        <h2>Tus Bóvedas</h2>
        <p>Ahorros automatizados en Rootstock</p>
      </div>

      <main className="vault-container">
        {activeVaults.map((vault) => (
          <div key={vault.id} className={`vault-card ${!vault.isActive ? 'completed' : ''}`}>
            <div className="vault-card-header">
              <h3>{vault.title}</h3>
              <span className={`status-badge ${vault.isActive ? 'active' : 'done'}`}>
                {vault.isActive ? 'Activo' : 'Finalizado'}
              </span>
            </div>
            
            <div className="vault-details">
              <div className="detail-item">
                <span className="label">Bloqueado</span>
                <span className="value">{vault.lockedAmount}</span>
              </div>
              <div className="detail-item text-right">
                <span className="label">Convirtiendo a</span>
                <span className="value text-primary">{vault.assetPurchased}</span>
              </div>
            </div>

            <div className="vault-progress-area">
              <div className="progress-labels">
                <span>Progreso DCA</span>
                <span>{vault.statusText}</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${vault.progressPercent}%`, backgroundColor: vault.isActive ? '#00E676' : '#888' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Navegación Inferior - Fíjate cómo usamos onNavigate */}
      <nav className="app-bottom-nav">
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}>
            <div className="dashed-circle">🏛️</div>
            <span>Bóvedas</span>
        </a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('chat'); }}>
            <div className="dashed-circle chat-icon">💬</div>
            <span>Chat</span>
        </a>
        <a href="#" className="nav-item">
            <div className="dashed-circle">📊</div>
            <span>Estadísticas</span>
        </a>
        <a href="#" className="nav-item">
            <div className="dashed-circle">⚙️</div>
            <span>Ajustes</span>
        </a>
      </nav>
    </section>
  );
}

export default VaultScreen;