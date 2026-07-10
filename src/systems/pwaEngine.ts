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
  message: isTauri ? 'PWA runtime disabled inside Tauri.' : 'PWA runtime standby.'
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
    message: navigator.onLine ? 'Network link restored.' : 'Offline mode active. Cached modules remain available.'
  });
  window.addEventListener('online', updateOnlineState);
  window.addEventListener('offline', updateOnlineState);

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event as InstallPromptEvent;
    emit({ installAvailable: true, message: 'Install package ready.' });
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    emit({ installAvailable: false, installed: true, standalone: true, message: 'Shadow Codec Ops installed.' });
  });

  if (isTauri || !('serviceWorker' in navigator)) return;

  updateServiceWorker = registerSW({
    immediate: true,
    onRegisteredSW: () => emit({ serviceWorkerReady: true, message: 'Offline service worker linked.' }),
    onOfflineReady: () => emit({ offlineReady: true, serviceWorkerReady: true, message: 'Offline cache ready.' }),
    onNeedRefresh: () => emit({ updateAvailable: true, message: 'A new tactical build is ready.' }),
    onRegisterError: (error) => emit({ message: `Service worker registration failed: ${String(error)}` })
  });
}

export async function requestPwaInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!installPrompt) return 'unavailable';
  await installPrompt.prompt();
  const choice = await installPrompt.userChoice;
  if (choice.outcome === 'accepted') installPrompt = null;
  emit({
    installAvailable: choice.outcome !== 'accepted',
    message: choice.outcome === 'accepted' ? 'Installation accepted.' : 'Installation dismissed.'
  });
  return choice.outcome;
}

export async function applyPwaUpdate(): Promise<void> {
  if (!updateServiceWorker) return;
  await updateServiceWorker(true);
}
