import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GastoProvider } from './context/GastoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GastoProvider>
      <App />
    </GastoProvider>
  </StrictMode>,
)
