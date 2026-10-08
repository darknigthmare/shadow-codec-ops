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
    <Panel title="Terminal mobile">
      <div className="desktop-status-grid">
        <StatusBadge
          label={state.isTauri ? 'TERMINAL LOCAL' : state.standalone ? 'TERMINAL INSTALLÉ' : 'ACCÈS WEB'}
          tone={state.standalone || state.isTauri ? 'success' : 'neutral'}
        />
        <span>Liaison : <strong>{state.online ? 'ÉTABLIE' : 'COUPÉE'}</strong></span>
        <span>Accès aux archives locales : <strong>{state.serviceWorkerReady ? 'PRÊT' : state.isTauri ? 'DIRECT' : 'EN VEILLE'}</strong></span>
        <span>Données hors ligne : <strong>{state.offlineReady ? 'PRÊTES' : 'EN COURS DE PRÉPARATION'}</strong></span>
        <span>Installation : <strong>{state.installAvailable ? 'DISPONIBLE' : state.installed || state.standalone ? 'INSTALLÉ' : 'DEPUIS LE NAVIGATEUR'}</strong></span>
      </div>
      <div className="desktop-actions">
        <button type="button" onClick={() => void requestPwaInstall()} disabled={!state.installAvailable}>Installer le terminal</button>
        <button type="button" onClick={() => void applyPwaUpdate()} disabled={!state.updateAvailable}>Mettre à jour le terminal</button>
      </div>
      <p className="desktop-note">Installe le terminal pour y accéder directement. Hors ligne, seules les données déjà téléchargées sur cet appareil restent disponibles.</p>
      <div className="desktop-message" role="status">{state.message}</div>
    </Panel>
  );
}
