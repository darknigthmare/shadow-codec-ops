import type { EraId } from './codec.types';

export type LoreCategory =
  | 'character'
  | 'organization'
  | 'location'
  | 'event'
  | 'item'
  | 'boss'
  | 'enemy'
  | 'mission'
  | 'frequency'
  | 'tape'
  | 'vr'
  | 'system';

export type LoreCanonStatus = 'canon' | 'simulation' | 'gameplay' | 'custom';
export type LoreImportance = 'low' | 'medium' | 'high' | 'critical';

export type LoreLinkType =
  | 'contact'
  | 'conversation'
  | 'mission'
  | 'item'
  | 'enemy'
  | 'boss'
  | 'tape'
  | 'vr'
  | 'organization'
  | 'location'
  | 'system'
  | 'frequency';

export interface LoreLink {
  type: LoreLinkType;
  id: string;
  label?: string;
}

export interface LoreEntry {
  id: string;
  title: string;
  subtitle: string;
  category: LoreCategory;
  era: EraId | 'multi';
  canonStatus: LoreCanonStatus;
  importance: LoreImportance;
  summary: string;
  details: string[];
  tags: string[];
  aliases?: string[];
  affiliations?: string[];
  frequency?: number;
  timeline?: string;
  related?: LoreLink[];
}

export interface LoreNoteRecord {
  entryId: string;
  note: string;
  updatedAt: string;
}

export interface LoreDatabaseState {
  favorites: string[];
  history: string[];
  notes: LoreNoteRecord[];
}
