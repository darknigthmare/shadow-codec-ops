import { APP_VERSION } from '../app/version';
import { getConnectedGamepads } from './inputSettings';
import { loadJson } from './saveEngine';
import { loadRuntimeSettings } from './userSettings';

export interface RuntimeDiagnosticSnapshot {
  generatedAt: string;
  appVersion: string;
  platform: string;
  userAgent: string;
  viewport: string;
  language: string;
  online: boolean;
  tauri: boolean;
  localStorageEntries: number;
  storageApproximation: string;
  gamepads: string[];
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
    reduceFlashes: boolean;
    screenReaderAnnouncements: boolean;
  };
  saveMigration: unknown;
  recentCrashReports: unknown[];
}

export async function collectRuntimeDiagnostics(): Promise<RuntimeDiagnosticSnapshot> {
  const settings = loadRuntimeSettings();
  const estimate = typeof navigator.storage?.estimate === 'function' ? await navigator.storage.estimate() : undefined;
  const used = estimate?.usage ?? 0;
  const quota = estimate?.quota ?? 0;

  return {
    generatedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
    platform: navigator.platform || 'unknown',
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}×${window.innerHeight} @${window.devicePixelRatio || 1}x`,
    language: navigator.language,
    online: navigator.onLine,
    tauri: '__TAURI_INTERNALS__' in window,
    localStorageEntries: Object.keys(window.localStorage).filter((key) => key.startsWith('shadow-codec-ops:')).length,
    storageApproximation: quota ? `${formatBytes(used)} / ${formatBytes(quota)}` : 'unavailable',
    gamepads: getConnectedGamepads().map((gamepad) => `${gamepad.id} (${gamepad.mapping || 'raw'})`),
    accessibility: {
      reducedMotion: settings.reducedMotion,
      highContrast: settings.highContrast,
      largeText: settings.largeText,
      reduceFlashes: settings.reduceFlashes,
      screenReaderAnnouncements: settings.screenReaderAnnouncements
    },
    saveMigration: loadJson('runtime-diagnostics', null),
    recentCrashReports: loadJson<unknown[]>('crash-reports', [])
  };
}

export function downloadDiagnostics(snapshot: RuntimeDiagnosticSnapshot): void {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `shadow-codec-ops-diagnostics-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function formatBytes(value: number): string {
  if (!value) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** exponent).toFixed(exponent ? 1 : 0)} ${units[exponent]}`;
}
