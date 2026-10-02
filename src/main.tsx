import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './storage/firebase/firebaseConfig.ts'
import MyApp from './MyApp.tsx'
import {KonstaProvider} from "konsta/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <KonstaProvider theme="ios">
          <MyApp />
      </KonstaProvider>
  </StrictMode>,
)
