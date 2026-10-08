import { useEffect, useState } from 'react';
import {
  applyPwaUpdate,
  getPwaRuntimeState,
  requestPwaInstall,
  subscribePwaRuntime
} from '../../systems/pwaEngine';

export function PwaRuntimeBanner() {
  const [state, setState] = useState(getPwaRuntimeState);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => subscribePwaRuntime(setState), []);

  const important = !state.online || state.updateAvailable || state.installAvailable || state.offlineReady;
  if (state.isTauri || !important || dismissed) return null;

  return (
    <aside className={`pwa-runtime-banner ${state.online ? '' : 'offline'}`} role="status" aria-live="polite">
      <div>
        <strong>{state.online ? 'MOBILE LINK' : 'OFFLINE MODE'}</strong>
        <span>{state.message}</span>
      </div>
      <div className="pwa-runtime-actions">
        {state.installAvailable && <button type="button" onClick={() => void requestPwaInstall()}>Install App</button>}
        {state.updateAvailable && <button type="button" onClick={() => void applyPwaUpdate()}>Apply Update</button>}
        <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss PWA status">×</button>
      </div>
    </aside>
  );
}
