import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GastoProvider } from './context/GastoContext.tsx'

// Punto de entrada de la aplicación
// Envuelve la app con el provider de contexto para gestión de estado global
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GastoProvider>
      <App />
    </GastoProvider>
  </StrictMode>,
)
