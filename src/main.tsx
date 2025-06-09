import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./assets/global.css"
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { esMX } from "@clerk/localizations"

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} localization={esMX}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
)
