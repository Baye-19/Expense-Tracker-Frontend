// src/main.jsx
// ============================================
// ENTRY POINT: This is where our React app begins!
// It takes the <App /> component and mounts it
// into the real HTML DOM (the div with id="root")
// ============================================

// React is needed whenever we write JSX (HTML-like syntax in JavaScript)
import React from 'react';
// ReactDOM is the library that connects React to the browser's DOM
import ReactDOM from 'react-dom/client';
// Global CSS reset and base styles
import './index.css';
// Our main App component (we'll create this next)
import App from './App';

// Find the root div in index.html where we want to render our app
const rootElement = document.getElementById('root');

// Create a React root - this is the modern React 18 way
const root = ReactDOM.createRoot(rootElement);

// Render our App component inside the root
// StrictMode is a development wrapper that helps catch bugs early
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);