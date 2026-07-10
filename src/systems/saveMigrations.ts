import { APP_VERSION } from '../app/version';
import { getStorageKey, loadJson, saveJson } from './saveEngine';
import { normalizeUserSettings } from './userSettings';
import type { UserSettings } from '../types/theme.types';

export const CURRENT_SAVE_SCHEMA = 10;

const LEGACY_UNPREFIXED_KEYS = [
  'lore-database-state',
  'lore-custom-entries',
  'sideops-active-mission-id',
  'studio-custom-conversations',
  'studio-trigger-overrides',
  'tape-archive-state',
  'tape-custom-tapes',
  'vr-mission-progress',
  'vr-unlocked-tapes',
  'campaign-progress',
  'campaign-progress-slot_1',
  'campaign-progress-slot_2',
  'campaign-progress-slot_3',
  'campaign-active-slot',
  'campaign-launch-directive',
  'campaign-builder-library',
  'campaign-builder-preview-id',
  'director-custom-sequences',
  'director-event-log',
  'director-outcomes'
];

export interface SaveMigrationReport {
  fromVersion: number;
  toVersion: number;
  migratedKeys: string[];
  bootedAt: string;
  appVersion: string;
}

export function runSaveMigrations(): SaveMigrationReport {
  const fromVersion = loadJson<number>('save-schema-version', 0);
  const migratedKeys: string[] = [];

  for (const legacyKey of LEGACY_UNPREFIXED_KEYS) {
    const legacyValue = window.localStorage.getItem(legacyKey);
    const targetKey = getStorageKey(legacyKey);
    if (legacyValue !== null && window.localStorage.getItem(targetKey) === null) {
      window.localStorage.setItem(targetKey, legacyValue);
      migratedKeys.push(legacyKey);
    }
    if (legacyValue !== null) window.localStorage.removeItem(legacyKey);
  }

  if (fromVersion < 4) {
    const normalizedSettings = normalizeUserSettings(loadJson<Partial<UserSettings>>('settings', {}));
    saveJson('settings', normalizedSettings);
    migratedKeys.push('settings-accessibility-controls-touch-v4');
  }

  if (fromVersion < 5) {
    const legacyCampaign = loadJson<unknown>('campaign-progress', null);
    const slotOne = loadJson<unknown>('campaign-progress-slot_1', null);
    if (legacyCampaign && !slotOne) {
      saveJson('campaign-progress-slot_1', legacyCampaign);
      migratedKeys.push('campaign-progress-to-slot_1-v5');
    }
    migratedKeys.push('campaign-slots-progression-v5');
  }

  if (fromVersion < 6) {
    for (const key of ['campaign-progress', 'campaign-progress-slot_1', 'campaign-progress-slot_2', 'campaign-progress-slot_3']) {
      const stored = loadJson<Record<string, unknown> | null>(key, null);
      if (!stored) continue;
      saveJson(key, {
        ...stored,
        schemaVersion: 2,
        branchChoices: stored.branchChoices && typeof stored.branchChoices === 'object' ? stored.branchChoices : {},
        achievedEndingIds: Array.isArray(stored.achievedEndingIds) ? stored.achievedEndingIds : [],
        newGamePlusCycle: Math.max(0, Number(stored.newGamePlusCycle ?? 0) || 0)
      });
      migratedKeys.push(`${key}-branching-v6`);
    }
    migratedKeys.push('campaign-builder-branching-endings-v6');
  }


  if (fromVersion < 7) {
    for (const key of ['campaign-progress', 'campaign-progress-slot_1', 'campaign-progress-slot_2', 'campaign-progress-slot_3']) {
      const stored = loadJson<Record<string, unknown> | null>(key, null);
      if (!stored) continue;
      saveJson(key, {
        ...stored,
        schemaVersion: 3,
        variables: stored.variables && typeof stored.variables === 'object' && !Array.isArray(stored.variables) ? stored.variables : {},
        seenPresentationIds: Array.isArray(stored.seenPresentationIds) ? stored.seenPresentationIds : [],
        presentationHistory: Array.isArray(stored.presentationHistory) ? stored.presentationHistory : []
      });
      migratedKeys.push(`${key}-narrative-presentation-v7`);
    }
    migratedKeys.push('campaign-builder-narrative-schema-v7');
  }

  if (fromVersion < 8) {
    const normalizedSettings = normalizeUserSettings(loadJson<Partial<UserSettings>>('settings', {}));
    saveJson('settings', normalizedSettings);
    migratedKeys.push('narrative-audio-localization-subtitles-v8');
  }

  if (fromVersion < 9) {
    const normalizedSettings = normalizeUserSettings(loadJson<Partial<UserSettings>>('settings', {}));
    saveJson('settings', normalizedSettings);
    migratedKeys.push('voice-packs-animated-portraits-v9');
  }


  if (fromVersion < 10) {
    migratedKeys.push('codec-director-runtime-sequences-v10');
  }

  const report: SaveMigrationReport = {
    fromVersion,
    toVersion: CURRENT_SAVE_SCHEMA,
    migratedKeys,
    bootedAt: new Date().toISOString(),
    appVersion: APP_VERSION
  };

  saveJson('save-schema-version', CURRENT_SAVE_SCHEMA);
  saveJson('runtime-diagnostics', report);
  return report;
}
