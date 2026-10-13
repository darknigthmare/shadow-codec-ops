import { isTauri } from '@tauri-apps/api/core';
import { LogicalSize } from '@tauri-apps/api/dpi';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { load } from '@tauri-apps/plugin-store';

const STORE_PATH = 'shadow-codec-ops.dat';
const SNAPSHOT_KEY = 'local-storage-snapshot';
const STORAGE_PREFIX = 'shadow-codec-ops:';

export interface DesktopStatus {
  isDesktop: boolean;
  backend: 'tauri-store' | 'browser-localstorage';
  fullscreen: boolean;
  maximized: boolean;
}

function readLocalSnapshot(): Record<string, string> {
  const snapshot: Record<string, string> = {};
  if (typeof window === 'undefined') return snapshot;
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
    const value = window.localStorage.getItem(key);
    if (value !== null) snapshot[key] = value;
  }
  return snapshot;
}

export async function initializeDesktopStorage(): Promise<void> {
  if (!isTauri() || typeof window === 'undefined') return;
  try {
    const store = await load(STORE_PATH, { autoSave: 150, defaults: {} });
    const diskSnapshot = await store.get<Record<string, string>>(SNAPSHOT_KEY);
    if (diskSnapshot && Object.keys(diskSnapshot).length > 0) {
      for (const [key, value] of Object.entries(diskSnapshot)) {
        if (key.startsWith(STORAGE_PREFIX)) window.localStorage.setItem(key, value);
      }
    } else {
      await store.set(SNAPSHOT_KEY, readLocalSnapshot());
      await store.save();
    }
  } catch (error) {
    console.warn('[desktopEngine] Failed to initialize the Tauri store.', error);
  }
}

export async function mirrorStorageToDesktop(): Promise<void> {
  if (!isTauri()) return;
  try {
    const store = await load(STORE_PATH, { autoSave: 150, defaults: {} });
    await store.set(SNAPSHOT_KEY, readLocalSnapshot());
  } catch (error) {
    console.warn('[desktopEngine] Failed to mirror local storage.', error);
  }
}

export function exportApplicationData(): string {
  return JSON.stringify({
    schema: 1,
    application: 'shadow-codec-ops',
    exportedAt: new Date().toISOString(),
    storage: readLocalSnapshot()
  }, null, 2);
}

export async function importApplicationData(raw: string): Promise<number> {
  const parsed = JSON.parse(raw) as { storage?: Record<string, string> };
  if (!parsed.storage || typeof parsed.storage !== 'object') {
    throw new Error('Invalid Shadow Codec Ops backup file.');
  }

  let imported = 0;
  for (const [key, value] of Object.entries(parsed.storage)) {
    if (!key.startsWith(STORAGE_PREFIX) || typeof value !== 'string') continue;
    window.localStorage.setItem(key, value);
    imported += 1;
  }
  await mirrorStorageToDesktop();
  return imported;
}

export function downloadApplicationBackup(): void {
  const blob = new Blob([exportApplicationData()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `shadow-codec-ops-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function getDesktopStatus(): Promise<DesktopStatus> {
  if (!isTauri()) {
    return { isDesktop: false, backend: 'browser-localstorage', fullscreen: Boolean(document.fullscreenElement), maximized: false };
  }
  const appWindow = getCurrentWindow();
  const [fullscreen, maximized] = await Promise.all([appWindow.isFullscreen(), appWindow.isMaximized()]);
  return { isDesktop: true, backend: 'tauri-store', fullscreen, maximized };
}

export async function toggleFullscreen(): Promise<boolean> {
  if (!isTauri()) {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
    return Boolean(document.fullscreenElement);
  }
  const appWindow = getCurrentWindow();
  const next = !(await appWindow.isFullscreen());
  await appWindow.setFullscreen(next);
  return next;
}

export async function toggleMaximized(): Promise<boolean> {
  if (!isTauri()) return false;
  const appWindow = getCurrentWindow();
  const maximized = await appWindow.isMaximized();
  if (maximized) await appWindow.unmaximize();
  else await appWindow.maximize();
  return !maximized;
}

export async function resetDesktopWindow(): Promise<void> {
  if (!isTauri()) return;
  const appWindow = getCurrentWindow();
  if (await appWindow.isFullscreen()) await appWindow.setFullscreen(false);
  if (await appWindow.isMaximized()) await appWindow.unmaximize();
  await appWindow.setSize(new LogicalSize(1280, 720));
  await appWindow.center();
}
