import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['meaty-unreferenced-dimple.ngrok-free.dev']
  },
  plugins: [react()],
})
