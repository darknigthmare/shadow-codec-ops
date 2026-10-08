import { defaultKeyboardBindings } from '../types/accessibility.types';
import { defaultSettings, type UserSettings } from '../types/theme.types';
import { loadJson } from './saveEngine';

export function normalizeUserSettings(input?: Partial<UserSettings> | null): UserSettings {
  return {
    ...defaultSettings,
    ...(input ?? {}),
    keyboardBindings: {
      ...defaultKeyboardBindings,
      ...(input?.keyboardBindings ?? {})
    }
  };
}

export function loadRuntimeSettings(): UserSettings {
  return normalizeUserSettings(loadJson<Partial<UserSettings>>('settings', defaultSettings));
}
