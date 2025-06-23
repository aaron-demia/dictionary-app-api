import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyWords from './MyWords';
import App from './App.tsx'; // use .jsx if that's your file extension
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/my-words" element={<MyWords />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);