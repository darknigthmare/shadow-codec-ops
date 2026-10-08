import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { AppErrorBoundary } from './components/common/AppErrorBoundary';
import { BootScreen } from './components/common/BootScreen';
import { runSaveMigrations } from './systems/saveMigrations';
import { initializePwaRuntime } from './systems/pwaEngine';
import './styles/variables.css';
import './styles/globals.css';
import './styles/themes.css';
import './styles/mobile.css';

type BootstrapState = 'loading' | 'ready' | 'error';

function RootBootstrap() {
  const [state, setState] = useState<BootstrapState>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let disposed = false;

    async function initialize() {
      try {
        const minimumDisplay = new Promise((resolve) => window.setTimeout(resolve, 180));
        if ('__TAURI_INTERNALS__' in window) {
          const { initializeDesktopEnvironment } = await import('./systems/desktopBridge');
          await Promise.all([initializeDesktopEnvironment(), minimumDisplay]);
        } else {
          await minimumDisplay;
        }
        runSaveMigrations();
        initializePwaRuntime();
        if (!disposed) setState('ready');
      } catch (error) {
        if (disposed) return;
        setErrorMessage(error instanceof Error ? error.message : 'Unknown desktop storage initialization error.');
        setState('error');
      }
    }

    void initialize();
    return () => {
      disposed = true;
    };
  }, []);

  if (state === 'loading') {
    return (
      <BootScreen
        title="SHADOW CODEC OPS"
        detail="VERIFYING LOCAL SAVE LINK AND PREPARING LAZY TACTICAL MODULES…"
      />
    );
  }

  if (state === 'error') {
    return (
      <BootScreen
        mode="error"
        title="STORAGE LINK DEGRADED"
        detail={`${errorMessage} Browser cache mode remains available.`}
        actionLabel="Continue With Local Cache"
        onAction={() => setState('ready')}
      />
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary resetKey="application-root">
      <RootBootstrap />
    </AppErrorBoundary>
  </React.StrictMode>
);
