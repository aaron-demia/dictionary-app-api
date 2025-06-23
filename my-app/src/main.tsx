import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import MyWords from './MyWords.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/my-words" element={<MyWords />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
