import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AlertProvider } from './context/alertContext';
import App from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>,
)
