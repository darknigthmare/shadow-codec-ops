import { beforeEach, describe, expect, it } from 'vitest';
import { clearCodecReplays, loadCodecReplayLibrary, normalizeCodecReplayLibrary, saveCodecReplayLibrary, setReplayAutoArchive } from './codecReplayStorage';

beforeEach(() => window.localStorage.clear());

describe('codec replay storage', () => {
  it('normalizes invalid state', () => {
    expect(normalizeCodecReplayLibrary(null)).toEqual({ schemaVersion: 1, records: [], autoArchive: true });
  });

  it('persists auto archive preference', () => {
    saveCodecReplayLibrary({ schemaVersion: 1, records: [], autoArchive: true });
    setReplayAutoArchive(false);
    expect(loadCodecReplayLibrary().autoArchive).toBe(false);
  });

  it('clears records without resetting preference', () => {
    saveCodecReplayLibrary({ schemaVersion: 1, records: [], autoArchive: false });
    expect(clearCodecReplays().autoArchive).toBe(false);
  });
});
