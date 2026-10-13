import { loadJson, saveJson } from './saveEngine';
import type { TapeArchiveState, TapeDefinition, TapeProgressRecord } from '../types/tape.types';

const DEFAULT_TAPE_STATE: TapeArchiveState = {
  favorites: [],
  progress: [],
  history: []
};

export function loadTapeArchiveState(): TapeArchiveState {
  const state = loadJson<TapeArchiveState>('tape-archive-state', DEFAULT_TAPE_STATE);
  return {
    favorites: Array.isArray(state.favorites) ? state.favorites : [],
    progress: Array.isArray(state.progress) ? state.progress : [],
    history: Array.isArray(state.history) ? state.history : []
  };
}

export function saveTapeArchiveState(state: TapeArchiveState): void {
  saveJson('tape-archive-state', state);
}

export function getTapeProgress(state: TapeArchiveState, tapeId: string): TapeProgressRecord {
  return state.progress.find((record) => record.tapeId === tapeId) ?? {
    tapeId,
    currentTime: 0,
    listened: false,
    listenCount: 0
  };
}

export function updateTapeProgress(
  state: TapeArchiveState,
  tape: TapeDefinition,
  patch: Partial<TapeProgressRecord>
): TapeArchiveState {
  const current = getTapeProgress(state, tape.id);
  const nextRecord: TapeProgressRecord = {
    ...current,
    ...patch,
    tapeId: tape.id,
    currentTime: Math.max(0, Math.min(patch.currentTime ?? current.currentTime, tape.duration)),
    listened: patch.listened ?? current.listened ?? false
  };

  const hasRecord = state.progress.some((record) => record.tapeId === tape.id);
  const progress = hasRecord
    ? state.progress.map((record) => (record.tapeId === tape.id ? nextRecord : record))
    : [nextRecord, ...state.progress];

  return { ...state, progress };
}

export function toggleTapeFavorite(state: TapeArchiveState, tapeId: string): TapeArchiveState {
  const isFavorite = state.favorites.includes(tapeId);
  return {
    ...state,
    favorites: isFavorite
      ? state.favorites.filter((id) => id !== tapeId)
      : [tapeId, ...state.favorites]
  };
}

export function pushTapeHistory(state: TapeArchiveState, tapeId: string): TapeArchiveState {
  return {
    ...state,
    history: [tapeId, ...state.history.filter((id) => id !== tapeId)].slice(0, 24)
  };
}

export function formatTapeTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, '0');
  const seconds = (safeSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function getTapeWaveform(tapeId: string, bars = 72): number[] {
  let seed = tapeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const values: number[] = [];
  for (let index = 0; index < bars; index += 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const random = seed / 4294967296;
    const wave = Math.sin(index * 0.33 + tapeId.length) * 0.28 + Math.cos(index * 0.13) * 0.18;
    values.push(Math.max(0.12, Math.min(1, 0.38 + random * 0.46 + wave)));
  }
  return values;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function loadCustomTapes(): TapeDefinition[] {
  return loadJson<TapeDefinition[]>('tape-custom-tapes', []);
}

export function saveCustomTapes(tapes: TapeDefinition[]): void {
  saveJson('tape-custom-tapes', tapes);
}

export function sanitizeImportedTape(value: unknown): TapeDefinition | null {
  if (!isObject(value)) return null;
  const id = String(value.id ?? '').trim();
  const title = String(value.title ?? '').trim();
  if (!id || !title) return null;

  const transcriptSource = Array.isArray(value.transcript) ? value.transcript : [];
  const transcript = transcriptSource
    .filter(isObject)
    .map((line, index) => ({
      time: Number(line.time ?? index * 20),
      speaker: String(line.speaker ?? 'System'),
      text: String(line.text ?? '...'),
      tag: typeof line.tag === 'string' ? line.tag as TapeDefinition['transcript'][number]['tag'] : 'memory'
    }));

  return {
    id: id.startsWith('custom_') ? id : `custom_${id}`,
    title,
    subtitle: String(value.subtitle ?? 'Imported tape'),
    era: String(value.era ?? 'mgsv') as TapeDefinition['era'],
    visualPack: String(value.visualPack ?? 'mgsv_idroid'),
    category: String(value.category ?? 'intel') as TapeDefinition['category'],
    duration: Math.max(30, Number(value.duration ?? 120)),
    speakers: Array.isArray(value.speakers) ? value.speakers.map(String) : ['System'],
    location: String(value.location ?? 'Imported archive'),
    relatedMission: typeof value.relatedMission === 'string' ? value.relatedMission : undefined,
    relatedConversation: typeof value.relatedConversation === 'string' ? value.relatedConversation : undefined,
    unlockState: 'unlocked',
    importance: String(value.importance ?? 'medium') as TapeDefinition['importance'],
    summary: String(value.summary ?? 'Imported custom tape.'),
    tags: Array.isArray(value.tags) ? value.tags.map(String) : ['custom'],
    transcript: transcript.length > 0 ? transcript : [{ time: 0, speaker: 'System', text: 'Imported tape has no transcript.', tag: 'memory' }]
  };
}
