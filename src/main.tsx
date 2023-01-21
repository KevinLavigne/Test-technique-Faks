import React from 'react';
import ReactDOM from 'react-dom/client';

import ExportContext from './contexts/UserContext';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ExportContext.Provider>
      <App />
    </ExportContext.Provider>
  </React.StrictMode>,
);
