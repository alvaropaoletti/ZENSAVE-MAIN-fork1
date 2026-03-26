import React, { useState } from 'react';

// Recibimos las "props" (datos) que nos enviará el backend de Flask
function InterventionCard({ emotionText, proposalText, onAcceptReto }) {
  // Estados para manejar la UX durante la transacción en Rootstock
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleExecute = async () => {
    setStatus('loading');
    
    try {
      // Aquí llamaremos a la función que interactúa con el Smart Contract (pasada por props)
      // Simulamos el tiempo que tarda la red RSK en confirmar (ej. 3 segundos)
      await onAcceptReto(); 
      
      setStatus('success');
    } catch (error) {
      console.error("Transacción rechazada o fallida:", error);
      setStatus('error');
    }
  };

  return (
    <div className="intervention-card">
      <div className="intervention-header">
        <span className="icon-alert">💡</span>
        <h4>Momento de Reflexión</h4>
      </div>
      
      <div className="intervention-body">
        <p className="emotion-text">{emotionText}</p>
        <div className="proposal-box">
          <p>{proposalText}</p>
        </div>
      </div>

      <div className="intervention-footer">
        {status === 'idle' && (
          <button className="btn-execute" onClick={handleExecute}>
            Aceptar Reto (Ejecutar DCA)
          </button>
        )}

        {status === 'loading' && (
          <button className="btn-execute loading" disabled>
            <span className="spinner"></span> Firmando en Rootstock...
          </button>
        )}

        {status === 'success' && (
          <div className="success-message">
            <span>✅</span> ¡Reto activo! Fondos asegurados en Rootstock.
          </div>
        )}

        {status === 'error' && (
          <div className="error-message">
            <span>❌</span> Transacción cancelada. Intenta de nuevo.
          </div>
        )}
      </div>
    </div>
  );
}

export default InterventionCard;