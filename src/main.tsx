import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './styles/globals.css';
import './styles/variables.css';
import './styles/themes.css';
import './styles/codec.css';
import './styles/sideops.css';
import './styles/studio.css';
import './styles/tapes.css';
import './styles/vr.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
