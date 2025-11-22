import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './styles.css';

const root = createRoot(document.getElementById('react-dashboard')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
