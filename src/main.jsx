import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // <-- YE LINE DESIGN KE LIYE SABSE ZAROORI HAI
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)