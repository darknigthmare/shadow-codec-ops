import { useEffect, useState } from 'react';
import {
  applyPwaUpdate,
  getPwaRuntimeState,
  requestPwaInstall,
  subscribePwaRuntime
} from '../../systems/pwaEngine';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

export function PwaSettingsPanel() {
  const [state, setState] = useState(getPwaRuntimeState);
  useEffect(() => subscribePwaRuntime(setState), []);

  return (
    <Panel title="Mobile / PWA Deployment">
      <div className="desktop-status-grid">
        <StatusBadge
          label={state.isTauri ? 'TAURI HOST' : state.standalone ? 'PWA STANDALONE' : 'BROWSER MODE'}
          tone={state.standalone || state.isTauri ? 'success' : 'neutral'}
        />
        <span>Network: <strong>{state.online ? 'ONLINE' : 'OFFLINE'}</strong></span>
        <span>Service worker: <strong>{state.serviceWorkerReady ? 'READY' : state.isTauri ? 'NOT REQUIRED' : 'STANDBY'}</strong></span>
        <span>Offline cache: <strong>{state.offlineReady ? 'READY' : 'PENDING FIRST LOAD'}</strong></span>
        <span>Install prompt: <strong>{state.installAvailable ? 'AVAILABLE' : state.installed || state.standalone ? 'INSTALLED' : 'BROWSER CONTROLLED'}</strong></span>
      </div>
      <div className="desktop-actions">
        <button type="button" onClick={() => void requestPwaInstall()} disabled={!state.installAvailable}>Install PWA</button>
        <button type="button" onClick={() => void applyPwaUpdate()} disabled={!state.updateAvailable}>Apply Available Update</button>
      </div>
      <p className="desktop-note">The service worker is disabled inside Tauri. Web installs cache the shell, lazy modules, data and game assets for offline use.</p>
      <div className="desktop-message" role="status">{state.message}</div>
    </Panel>
  );
}
