export const STORAGE_PREFIX = 'shadow-codec-ops:';
let mirrorTimer: number | undefined;

function scheduleDesktopMirror(): void {
  if (typeof window === 'undefined' || !('__TAURI_INTERNALS__' in window)) return;
  if (mirrorTimer !== undefined) window.clearTimeout(mirrorTimer);
  mirrorTimer = window.setTimeout(() => {
    mirrorTimer = undefined;
    void import('./desktopBridge')
      .then(({ mirrorDesktopSaveNamespace }) => mirrorDesktopSaveNamespace())
      .catch((error) => console.warn('[saveEngine] Failed to stream desktop save bridge.', error));
  }, 120);
}

export function getStorageKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const storageKey = getStorageKey(key);
    let raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      const legacyRaw = window.localStorage.getItem(key);
      if (legacyRaw !== null) {
        window.localStorage.setItem(storageKey, legacyRaw);
        window.localStorage.removeItem(key);
        raw = legacyRaw;
        scheduleDesktopMirror();
      }
    }
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[saveEngine] Failed to load ${key}`, error);
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(getStorageKey(key), JSON.stringify(value));
    scheduleDesktopMirror();
  } catch (error) {
    console.warn(`[saveEngine] Failed to save ${key}`, error);
  }
}

export function clearSaveKey(key: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(getStorageKey(key));
  scheduleDesktopMirror();
}
