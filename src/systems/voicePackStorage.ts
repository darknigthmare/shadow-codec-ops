import type { EraId } from '../types/codec.types';
import { loadJson, saveJson } from './saveEngine';

export interface VoicePackAsset {
  id: string;
  conversationId: string;
  lineIndex: number;
  source: string;
  speaker?: string;
  durationMs?: number;
}

export interface PortraitPackAsset {
  characterId: string;
  expression: string;
  image: string;
}

export interface VoicePackManifest {
  schemaVersion: 1;
  id: string;
  name: string;
  version: string;
  author?: string;
  locale?: string;
  era?: EraId | 'all';
  description?: string;
  assets: VoicePackAsset[];
  portraits?: PortraitPackAsset[];
}

export interface VoicePackState {
  packs: VoicePackManifest[];
  enabledPackIds: string[];
}

const STORAGE_KEY = 'voice-pack-state';
const emptyState: VoicePackState = { packs: [], enabledPackIds: [] };

function isSafeSource(value: string): boolean {
  return value.startsWith('/audio/') || value.startsWith('/portraits/') || value.startsWith('blob:') || value.startsWith('data:audio/');
}

export function sanitizeVoicePack(input: unknown): VoicePackManifest | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Partial<VoicePackManifest>;
  if (!value.id || !value.name || !Array.isArray(value.assets)) return null;
  const assets = value.assets
    .filter((asset): asset is VoicePackAsset => Boolean(asset && typeof asset === 'object'))
    .map((asset) => ({
      id: String(asset.id ?? `${asset.conversationId}:${asset.lineIndex}`),
      conversationId: String(asset.conversationId ?? ''),
      lineIndex: Math.max(0, Number(asset.lineIndex ?? 0) || 0),
      source: String(asset.source ?? ''),
      speaker: asset.speaker ? String(asset.speaker) : undefined,
      durationMs: asset.durationMs ? Math.max(0, Number(asset.durationMs)) : undefined
    }))
    .filter((asset) => asset.conversationId && isSafeSource(asset.source));
  const portraits = Array.isArray(value.portraits)
    ? value.portraits
        .map((portrait) => ({ characterId: String(portrait.characterId ?? ''), expression: String(portrait.expression ?? 'neutral'), image: String(portrait.image ?? '') }))
        .filter((portrait) => portrait.characterId && portrait.image.startsWith('/portraits/'))
    : [];
  return {
    schemaVersion: 1,
    id: String(value.id).replace(/[^a-zA-Z0-9_-]/g, '_'),
    name: String(value.name),
    version: String(value.version ?? '1.0.0'),
    author: value.author ? String(value.author) : undefined,
    locale: value.locale ? String(value.locale) : undefined,
    era: value.era ?? 'all',
    description: value.description ? String(value.description) : undefined,
    assets,
    portraits
  };
}

export function loadVoicePackState(): VoicePackState {
  const stored = loadJson<VoicePackState>(STORAGE_KEY, emptyState);
  return {
    packs: Array.isArray(stored.packs) ? stored.packs.map(sanitizeVoicePack).filter((pack): pack is VoicePackManifest => Boolean(pack)) : [],
    enabledPackIds: Array.isArray(stored.enabledPackIds) ? stored.enabledPackIds.map(String) : []
  };
}

export function saveVoicePackState(state: VoicePackState): void {
  saveJson(STORAGE_KEY, state);
  window.dispatchEvent(new CustomEvent('shadow-codec:voice-packs-changed'));
}

export function resolveVoiceAsset(conversationId: string, lineIndex: number, era: EraId, state = loadVoicePackState()): VoicePackAsset | undefined {
  for (const pack of state.packs) {
    if (!state.enabledPackIds.includes(pack.id)) continue;
    if (pack.era && pack.era !== 'all' && pack.era !== era) continue;
    const asset = pack.assets.find((entry) => entry.conversationId === conversationId && entry.lineIndex === lineIndex);
    if (asset) return asset;
  }
  return undefined;
}

export function resolvePortraitAsset(characterId: string, expression: string, era: EraId, state = loadVoicePackState()): string | undefined {
  for (const pack of state.packs) {
    if (!state.enabledPackIds.includes(pack.id)) continue;
    if (pack.era && pack.era !== 'all' && pack.era !== era) continue;
    const portrait = pack.portraits?.find((entry) => entry.characterId === characterId && entry.expression === expression)
      ?? pack.portraits?.find((entry) => entry.characterId === characterId && entry.expression === 'neutral');
    if (portrait) return portrait.image;
  }
  return undefined;
}
