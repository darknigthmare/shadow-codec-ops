import type { LoreDatabaseState, LoreEntry, LoreNoteRecord } from '../types/lore.types';
import { loadJson, saveJson } from './saveEngine';

const LORE_STATE_KEY = 'lore-database-state';
const CUSTOM_LORE_KEY = 'lore-custom-entries';

export const defaultLoreState: LoreDatabaseState = {
  favorites: [],
  history: [],
  notes: []
};

export function loadLoreState(): LoreDatabaseState {
  const state = loadJson<LoreDatabaseState>(LORE_STATE_KEY, defaultLoreState);
  return {
    favorites: Array.isArray(state.favorites) ? state.favorites : [],
    history: Array.isArray(state.history) ? state.history : [],
    notes: Array.isArray(state.notes) ? state.notes : []
  };
}

export function saveLoreState(state: LoreDatabaseState): void {
  saveJson(LORE_STATE_KEY, state);
}

export function loadCustomLoreEntries(): LoreEntry[] {
  const entries = loadJson<LoreEntry[]>(CUSTOM_LORE_KEY, []);
  return Array.isArray(entries) ? entries : [];
}

export function saveCustomLoreEntries(entries: LoreEntry[]): void {
  saveJson(CUSTOM_LORE_KEY, entries);
}

export function toggleLoreFavorite(state: LoreDatabaseState, entryId: string): LoreDatabaseState {
  const isFavorite = state.favorites.includes(entryId);
  return {
    ...state,
    favorites: isFavorite ? state.favorites.filter((id) => id !== entryId) : [entryId, ...state.favorites]
  };
}

export function pushLoreHistory(state: LoreDatabaseState, entryId: string): LoreDatabaseState {
  return {
    ...state,
    history: [entryId, ...state.history.filter((id) => id !== entryId)].slice(0, 40)
  };
}

export function getLoreNote(state: LoreDatabaseState, entryId: string): LoreNoteRecord | undefined {
  return state.notes.find((note) => note.entryId === entryId);
}

export function updateLoreNote(state: LoreDatabaseState, entryId: string, note: string): LoreDatabaseState {
  const cleanNote = note.trimEnd();
  const nextNote: LoreNoteRecord = {
    entryId,
    note: cleanNote,
    updatedAt: new Date().toISOString()
  };
  return {
    ...state,
    notes: cleanNote
      ? [nextNote, ...state.notes.filter((item) => item.entryId !== entryId)]
      : state.notes.filter((item) => item.entryId !== entryId)
  };
}

export function sanitizeImportedLoreEntry(value: unknown): LoreEntry | null {
  if (!value || typeof value !== 'object') return null;
  const entry = value as Partial<LoreEntry>;
  if (!entry.id || !entry.title || !entry.category || !entry.summary) return null;
  const id = entry.id.startsWith('custom_') ? entry.id : `custom_${entry.id}`;
  return {
    id,
    title: entry.title,
    subtitle: entry.subtitle ?? 'Custom lore entry',
    category: entry.category,
    era: entry.era ?? 'multi',
    canonStatus: entry.canonStatus ?? 'custom',
    importance: entry.importance ?? 'medium',
    summary: entry.summary,
    details: Array.isArray(entry.details) ? entry.details : [entry.summary],
    tags: Array.isArray(entry.tags) ? entry.tags : ['custom'],
    aliases: Array.isArray(entry.aliases) ? entry.aliases : [],
    affiliations: Array.isArray(entry.affiliations) ? entry.affiliations : [],
    frequency: typeof entry.frequency === 'number' ? entry.frequency : undefined,
    timeline: entry.timeline,
    related: Array.isArray(entry.related) ? entry.related : []
  };
}

export function exportLoreBundle(entries: LoreEntry[], state: LoreDatabaseState): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), entries, state }, null, 2);
}
