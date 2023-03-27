// libs imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// styles
import './index.css';

// components
import App from './pages/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
