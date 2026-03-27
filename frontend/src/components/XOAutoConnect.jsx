import React, { useEffect } from 'react';
import { XOConnectProvider } from 'xo-connect';

// Configuramos los datos de Rootstock Testnet (RSK)
const RSK_TESTNET_HEX = '0x1f'; // Chain ID 31 en Hexadecimal
const RSK_RPC_URL = 'https://public-node.testnet.rsk.co';

export default function XOAutoConnect({ onConnect }) {
  useEffect(() => {
    const autoConnect = async () => {
      try {
        // 1. Inicializamos con los parámetros pro que nos pasaste
        const provider = new XOConnectProvider({
          debug: true,
          defaultChainId: RSK_TESTNET_HEX,
          rpcs: { [RSK_TESTNET_HEX]: RSK_RPC_URL },
        });

        // 2. Pedimos conexión
        const accounts = await provider.request({
          method: 'eth_requestAccounts'
        });

        if (accounts && accounts.length > 0) {
          // 3. EXTRA: Obtenemos el Alias (nombre de usuario)
          const client = await provider.getClient();
          const alias = client?.alias || null;
          
          console.log("¡Conectado a XO!", { address: accounts[0], alias });
          
          // Enviamos ambos datos a la App
          onConnect({
            address: accounts[0],
            alias: alias
          });
        }
      } catch (e) {
        console.debug('[XOAutoConnect] Esperando contexto de billetera...');
      }
    };

    autoConnect();
  }, [onConnect]);

  return null;
}