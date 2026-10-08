import { registerSW } from 'virtual:pwa-register';

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export interface PwaRuntimeState {
  available: boolean;
  serviceWorkerReady: boolean;
  offlineReady: boolean;
  updateAvailable: boolean;
  installAvailable: boolean;
  installed: boolean;
  online: boolean;
  standalone: boolean;
  isTauri: boolean;
  message: string;
}

type Listener = (state: PwaRuntimeState) => void;

const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
let installPrompt: InstallPromptEvent | null = null;
let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | null = null;
let initialized = false;
let state: PwaRuntimeState = {
  available: !isTauri && 'serviceWorker' in navigator,
  serviceWorkerReady: false,
  offlineReady: false,
  updateAvailable: false,
  installAvailable: false,
  installed: false,
  online: navigator.onLine,
  standalone: window.matchMedia('(display-mode: standalone)').matches,
  isTauri,
  message: isTauri ? 'Terminal local prêt.' : 'Terminal en veille.'
};
const listeners = new Set<Listener>();

function emit(patch: Partial<PwaRuntimeState>): void {
  state = { ...state, ...patch };
  for (const listener of listeners) listener({ ...state });
}

export function getPwaRuntimeState(): PwaRuntimeState {
  return { ...state };
}

export function subscribePwaRuntime(listener: Listener): () => void {
  listeners.add(listener);
  listener(getPwaRuntimeState());
  return () => listeners.delete(listener);
}

export function initializePwaRuntime(): void {
  if (initialized) return;
  initialized = true;

  const updateOnlineState = () => emit({
    online: navigator.onLine,
    message: navigator.onLine ? 'Liaison rétablie.' : 'Liaison coupée. Les données déjà téléchargées restent accessibles.'
  });
  window.addEventListener('online', updateOnlineState);
  window.addEventListener('offline', updateOnlineState);

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event as InstallPromptEvent;
    emit({ installAvailable: true, message: 'Le terminal peut être installé sur cet appareil.' });
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    emit({ installAvailable: false, installed: true, standalone: true, message: 'Terminal installé.' });
  });

  if (isTauri || !('serviceWorker' in navigator)) return;

  updateServiceWorker = registerSW({
    immediate: true,
    onRegisteredSW: () => emit({ serviceWorkerReady: true, message: 'Liaison du terminal établie.' }),
    onOfflineReady: () => emit({ offlineReady: true, serviceWorkerReady: true, message: 'Les données du terminal sont disponibles hors ligne.' }),
    onNeedRefresh: () => emit({ updateAvailable: true, message: 'Mise à jour du terminal disponible.' }),
    onRegisterError: (error) => {
      console.warn('PWA registration failed', error);
      emit({ message: 'Accès hors ligne indisponible. Recharge le terminal pour réessayer.' });
    }
  });
}

export async function requestPwaInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!installPrompt) return 'unavailable';
  await installPrompt.prompt();
  const choice = await installPrompt.userChoice;
  if (choice.outcome === 'accepted') installPrompt = null;
  emit({
    installAvailable: choice.outcome !== 'accepted',
    message: choice.outcome === 'accepted' ? 'Installation confirmée.' : 'Installation reportée.'
  });
  return choice.outcome;
}

export async function applyPwaUpdate(): Promise<void> {
  if (!updateServiceWorker) return;
  await updateServiceWorker(true);
}
