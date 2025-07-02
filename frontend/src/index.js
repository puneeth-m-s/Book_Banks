import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 🔑 NEW: Import the AuthProvider
import { AuthProvider } from './contexts/AuthContext';

// 🔁 Create root (React 18 style)
const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Wrap <App /> in <AuthProvider>
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Optional performance logging
reportWebVitals();
