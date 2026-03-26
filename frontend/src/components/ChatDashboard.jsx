import React, { useState } from 'react';
import InterventionCard from './InterventionCard'; // Importamos la tarjeta

function ChatDashboard({ onNavigate }) {
  const [inputValue, setInputValue] = useState('');
  // Estado para guardar los mensajes del chat
  const [messages, setMessages] = useState([
    { type: 'ai', text: "¡Hola! Soy Zen. ¿En qué gastaste hoy?" }
  ]);
  // Estado para saber si la IA está "escribiendo"
  const [isTyping, setIsTyping] = useState(false);
  // Estado para guardar el reto propuesto por la IA
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue(''); // Limpiamos el input
    
    // 1. Agregamos el mensaje del usuario al chat
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setIsTyping(true);
    setCurrentChallenge(null); // Limpiamos retos anteriores

    try {
      // 2. Hacemos la petición a tu servidor Flask
      const response = await fetch('http://127.0.0.1:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) throw new Error("Error en el servidor");

      // 3. Recibimos el JSON de la IA (Gemini)
      const data = await response.json();

      // 4. Guardamos el reto para mostrar la InterventionCard
      setCurrentChallenge(data);

    } catch (error) {
      console.error("Error conectando con Flask:", error);
      setMessages(prev => [...prev, { type: 'ai', text: "Lo siento, tuve un problema de conexión. ¿Puedes intentar de nuevo?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="app-screen active chat-screen">
      <header className="app-header">
        {/* ... (Todo tu header queda igual) ... */}
        <div className="header-left"><img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" /></div>
        <div className="header-center"><span className="balance-label">SALDO DISPONIBLE</span><span className="balance-value">$12,450.00</span></div>
        <div className="header-right"><button className="wallet-icon">💳</button></div>
      </header>

      <div className="chat-title-area">
        <h2>Oráculo AI</h2>
        <p>Tu guía de bienestar financiero</p>
      </div>

      <main className="chat-container">
        <div className="chat-messages">
          
          {/* Mapeamos el historial de mensajes */}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type === 'ai' ? 'ai-message' : 'user-message'}`}>
              <div className="message-content">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Indicador de que la IA está pensando */}
          {isTyping && (
            <div className="message ai-message">
              <div className="message-content">
                <p>...</p>
              </div>
            </div>
          )}

          {/* Si hay un reto de la IA, mostramos la Tarjeta de Intervención */}
          {currentChallenge && (
            <InterventionCard 
              emotionText={currentChallenge.emotionText}
              proposalText={currentChallenge.proposalText}
              onAcceptReto={async () => {
                // STICH: Aquí ejecutaremos el Smart Contract en Rootstock
                console.log(`Ejecutando contrato: Bloquear ${currentChallenge.monto_dca} ${currentChallenge.token}`);
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

      {/* ... (barra de navegación footer) ... */}
      <nav className="app-bottom-nav">
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('vaults'); }}><div className="dashed-circle">🏛️</div><span>Bóvedas</span></a>
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}><div className="dashed-circle chat-icon">💬</div><span>Chat</span></a>
        <a href="#" className="nav-item"><div className="dashed-circle">📊</div><span>Estadísticas</span></a>
        <a href="#" className="nav-item"><div className="dashed-circle">⚙️</div><span>Ajustes</span></a>
      </nav>
    </section>
  );
}

export default ChatDashboard;