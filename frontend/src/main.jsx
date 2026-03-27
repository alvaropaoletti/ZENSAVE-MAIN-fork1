import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { XOConnect } from 'xo-connect'
import XOAutoConnect from './components/XOAutoConnect.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <XOAutoConnect />
    <App />
    </StrictMode>,
)
