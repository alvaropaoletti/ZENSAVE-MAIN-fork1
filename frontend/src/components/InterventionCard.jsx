import React, { useState } from 'react';
import { ethers } from 'ethers';
import { XOConnectProvider } from 'xo-connect';

const CONTRACT_ADDRESS = '0xCC4884c86C6D26F35ac1bA95DbE060b0BBDB7831';
const RSK_TESTNET_HEX = '0x1f';
const RSK_RPC_URL = 'https://public-node.testnet.rsk.co';

const ABI = [
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function getBalance(address user) external view returns (uint256)"
];

function InterventionCard({ emotionText, proposalText, monto_dca }) {
  const [status, setStatus] = useState('idle');
  const [txHash, setTxHash] = useState(null);

  const handleExecute = async () => {
    setStatus('loading');
    try {
      // Conectamos con Beexo via XOConnect
      const provider = new XOConnectProvider({
        defaultChainId: RSK_TESTNET_HEX,
        rpcs: { [RSK_TESTNET_HEX]: RSK_RPC_URL },
      });

      // Pedimos permiso para firmar
      await provider.request({ method: 'eth_requestAccounts' });

      // Creamos el signer con ethers
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Conectamos al contrato
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      // Convertimos el monto DCA de DoC a wei (usamos monto_dca o 0.0001 RBTC por defecto)
      const montoRBTC = '0.0001';
      const value = ethers.parseEther(montoRBTC);

      console.log(`Depositando ${montoRBTC} RBTC en ZenSave...`);

      // Ejecutamos deposit() en el contrato
      const tx = await contract.deposit({ value });
      console.log('TX enviada:', tx.hash);
      setTxHash(tx.hash);

      // Esperamos confirmación
      await tx.wait();
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
            {txHash && (
              <a 
                href={`https://explorer.testnet.rsk.co/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', fontSize: '11px', color: '#00E676', marginTop: '6px' }}
              >
                Ver transacción ↗
              </a>
            )}
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