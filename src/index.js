import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './customTheme.less'; 

/**
 * Entry point for the React application.
 * Initializes the root element and renders the App component.
 */

// Create a root element for the React application.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element with strict mode enabled.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
