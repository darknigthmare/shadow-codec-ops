import type { CodecReplayLibraryState, CodecReplayRecord } from '../types/codecReplay.types';
import { loadJson, saveJson } from './saveEngine';

const STORAGE_KEY = 'codec-replay-library';
const MAX_RECORDS = 100;

export function normalizeCodecReplayLibrary(value: unknown): CodecReplayLibraryState {
  const candidate = value && typeof value === 'object' ? value as Partial<CodecReplayLibraryState> : {};
  return {
    schemaVersion: 1,
    records: Array.isArray(candidate.records)
      ? candidate.records.filter((record): record is CodecReplayRecord => Boolean(record && typeof record === 'object' && typeof (record as CodecReplayRecord).id === 'string')).slice(0, MAX_RECORDS)
      : [],
    autoArchive: candidate.autoArchive !== false
  };
}

export function loadCodecReplayLibrary(): CodecReplayLibraryState {
  return normalizeCodecReplayLibrary(loadJson(STORAGE_KEY, null));
}

export function saveCodecReplayLibrary(state: CodecReplayLibraryState): CodecReplayLibraryState {
  const normalized = normalizeCodecReplayLibrary(state);
  saveJson(STORAGE_KEY, normalized);
  return normalized;
}

export function appendCodecReplay(record: CodecReplayRecord): CodecReplayLibraryState {
  const current = loadCodecReplayLibrary();
  return saveCodecReplayLibrary({ ...current, records: [record, ...current.records.filter((entry) => entry.id !== record.id)].slice(0, MAX_RECORDS) });
}

export function deleteCodecReplay(id: string): CodecReplayLibraryState {
  const current = loadCodecReplayLibrary();
  return saveCodecReplayLibrary({ ...current, records: current.records.filter((record) => record.id !== id) });
}

export function clearCodecReplays(): CodecReplayLibraryState {
  const current = loadCodecReplayLibrary();
  return saveCodecReplayLibrary({ ...current, records: [] });
}

export function setReplayAutoArchive(enabled: boolean): CodecReplayLibraryState {
  const current = loadCodecReplayLibrary();
  return saveCodecReplayLibrary({ ...current, autoArchive: enabled });
}
