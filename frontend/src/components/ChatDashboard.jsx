import React, { useState } from 'react';
import InterventionCard from './InterventionCard';

// 🚀 AÑADIDO: Recibimos userAddress y userData como props
function ChatDashboard({ onNavigate, userAddress, userData }) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { type: 'ai', text: "¡Hola! Soy Zen. ¿En qué gastaste hoy?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setIsTyping(true);
    setCurrentChallenge(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const data = await response.json();
      setCurrentChallenge(data);

    } catch (error) {
      console.error("Error conectando con Flask:", error);
      setMessages(prev => [...prev, { type: 'ai', text: "Lo siento, tuve un problema de conexión. ¿Puedes intentar de nuevo?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  // 🛠️ Función auxiliar para acortar la dirección si no hay Alias
  const formatAddress = (addr) => {
    if (!addr) return "Desconectado";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <section className="app-screen active chat-screen">
      <header className="app-header">
        
        {/* 🚀 MODIFICADO: Avatar dinámico con el Alias o la Dirección */}
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="https://api.dicebear.com/7.x/identicon/svg?seed=Alejandro" alt="Avatar" className="user-avatar" style={{ borderRadius: '50%', width: '40px' }} />
        </div>
        
        <div className="header-center">
          {/* 🚀 MODIFICADO: Mostramos el Alias (si existe) o la dirección de la billetera conectada */}
          <span className="balance-label">USUARIO CONECTADO</span>
          <span className="balance-value" style={{ fontSize: '14px' }}>
            {userData?.alias || formatAddress(userAddress)}
          </span>
        </div>
        
        <div className="header-right">
          <button className="wallet-icon">
            <span title={userAddress}>🟢</span> {/* Indicador visual de conexión */}
          </button>
        </div>
      </header>

      <div className="chat-title-area">
        <h2>Oráculo AI</h2>
        <p>Tu guía de bienestar financiero</p>
      </div>

      <main className="chat-container">
        <div className="chat-messages">
          
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type === 'ai' ? 'ai-message' : 'user-message'}`}>
              <div className="message-content">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message ai-message">
              <div className="message-content">
                <p>...</p>
              </div>
            </div>
          )}

          {currentChallenge && (
            <InterventionCard 
              emotionText={currentChallenge.emotionText}
              proposalText={currentChallenge.proposalText}
              onAcceptReto={async () => {
                // AQUÍ VA LA CONEXIÓN AL SMART CONTRACT
                console.log(`Ejecutando contrato para: ${userAddress}`);
                console.log(`Bloquear ${currentChallenge.monto_dca} ${currentChallenge.token}`);
                return new Promise(resolve => setTimeout(resolve, 3000));
              }}
            />
          )}

        </div>
      </main>

      <footer className="app-input-area">
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Describe tu gasto..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>➤</button>
        </div>
      </footer>

      <nav className="app-bottom-nav">
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('vaults'); }}><div className="dashed-circle">🏛️</div><span>Bóvedas</span></a>
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}><div className="dashed-circle chat-icon">💬</div><span>Chat</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('stats'); }}><div className="dashed-circle">📊</div><span>Estadísticas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}><div className="dashed-circle">⚙️</div><span>Ajustes</span></a>
      </nav>
    </section>
  );
}

export default ChatDashboard;