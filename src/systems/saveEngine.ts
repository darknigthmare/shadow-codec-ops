const STORAGE_PREFIX = 'shadow-codec-ops:';

export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
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
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn(`[saveEngine] Failed to save ${key}`, error);
  }
}

export function clearSaveKey(key: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}
