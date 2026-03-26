import React from 'react';

function Onboarding({ onLogin }) {
  return (
    <section className="app-screen active onboarding-screen">
      <div className="logo-area">
        <div className="icon-circle">
            {/* SVG del logo Zen */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2C12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#00E676"/>
                <path d="M16 11.12C16 11.12 14.5 9.62 12.5 9.62C10.5 9.62 9 11.12 9 11.12C9 11.12 10.5 12.62 12.5 12.62C14.5 12.62 16 11.12 16 11.12Z" fill="#00E676"/>
                <path d="M11 16.5V14.5C10.3 14.5 9.68 14.28 9.17 13.91C8.61 14.73 8.31 15.65 8.31 16.5C8.31 18.54 9.96 20.19 12 20.19C14.04 20.19 15.69 18.54 15.69 16.5C15.69 15.65 15.39 14.73 14.83 13.91C14.32 14.28 13.7 14.5 13 14.5V16.5C13 17.05 12.55 17.5 12 17.5C11.45 17.5 11 17.05 11 16.5Z" fill="#00E676"/>
            </svg>
        </div>
      </div>

      <main className="onboarding-content">
        <h1 className="main-title">Zen-Save</h1>
        <p className="subtitle">Tu santuario financiero privado en Rootstock. Calma. Seguridad. Soberanía.</p>
        
        <button onClick={onLogin} className="btn-beexo">
          Ingresar con Beexo
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="white"/>
          </svg>
        </button>
        
        <p className="hint">Acceso seguro en un clic. Sin frases semilla.</p>
      </main>

      <footer className="onboarding-footer">
        <div className="status-indicators">
          <span className="status-item"><span className="icon-secured">✓</span> BEEXO SECURED</span>
          <span className="status-item"><span className="icon-rsk">🏛️</span> ROOTSTOCK NETWORK</span>
        </div>
        <div className="footer-links">
          <a href="#">PRIVACIDAD</a><span className="link-separator">•</span>
          <a href="#">SEGURIDAD</a><span className="link-separator">•</span>
          <a href="#">SOPORTE</a>
        </div>
      </footer>

      
    </section>
  );
}

export default Onboarding;