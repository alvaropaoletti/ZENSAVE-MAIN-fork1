import React, { useEffect } from 'react';
import { XOConnect } from 'xo-connect';

export default function XOAutoConnect({ onConnect }) {
  useEffect(() => {
    const autoConnect = async () => {
      try {
        // Usamos XOConnect.connect() directamente — método principal del singleton
        const result = await XOConnect.connect();
        
        console.log("XOConnect.connect() resultado:", JSON.stringify(result));

        if (result?.client) {
          onConnect({
            address: result.client.currencies?.[0]?.address || null,
            alias: result.client.alias || null,
            image: result.client.image || null,
          });
        } else {
          // Intentamos getClient por si ya estaba conectado
          const client = await XOConnect.getClient();
          console.log("XOConnect.getClient() resultado:", JSON.stringify(client));
          
          if (client) {
            onConnect({
              address: client.currencies?.[0]?.address || null,
              alias: client.alias || null,
              image: client.image || null,
            });
          }
        }
      } catch (e) {
        console.error('[XOAutoConnect] Error:', e);
        onConnect({ address: null, alias: 'error: ' + String(e?.message || e), image: null });
      }
    };

    autoConnect();
  }, [onConnect]);

  return null;
}