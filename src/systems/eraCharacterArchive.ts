import rosterJson from '../data/peaceWalkerPhantomPainRoster.json';
import archivePortraitSetsJson from '../data/archivePortraitSets.json';
import { getCharacterPortrait } from './codecAssetEngine';
import { getSideOpsSpecialActorDefinition, getSideOpsSpecialActorAnimation } from '../game/core/sideOpsSpecialActorAnimationRegistry';
import { SIDEOPS_ACTOR_ANIMATION_SHEETS, getSideOpsActorAnimation, type SideOpsActorRole, type SideOpsActorAnimationState } from '../game/core/sideOpsActorAnimationRegistry';
import type { SideOpsVisualPackId } from '../types/missionBuilder.types';

export type ArchiveVisualPack = 'peace_walker' | 'mgsv_phantom_pain';
export interface EraCharacterArchiveEntry {
  readonly id: string;
  readonly name: string;
  readonly era: 'peace_walker' | 'mgsv';
  readonly visualPackId: ArchiveVisualPack;
  readonly category: 'human' | 'machine' | 'companion' | 'enemy';
  readonly portrait: { readonly kind: 'character'; readonly characterId: string } | { readonly kind: 'sprite'; readonly path?: string };
  readonly sourceTextureKey: string;
  readonly sourcePath: string;
  readonly animation:
    | { readonly kind: 'roster'; readonly path: string; readonly frameSize: 128; readonly sourceFacing: 'left' | 'right'; readonly states: readonly string[] }
    | { readonly kind: 'special'; readonly sourceTextureKey: string }
    | { readonly kind: 'standard'; readonly packId: SideOpsVisualPackId; readonly role: SideOpsActorRole };
  readonly placement: 'operative' | 'npc' | 'encounter' | 'enemy' | 'archive_only';
  readonly simulationMissionId?: string;
  readonly note: string;
}
export interface ArchiveAnimationClip {
  readonly state: string;
  readonly path: string;
  readonly frameSize: number;
  readonly columns: 4;
  readonly rows: 4;
  readonly start: number;
  readonly end: number;
  readonly frameRate: number;
}
export interface ArchiveImageAsset {
  readonly path: string;
  readonly width?: number;
  readonly height?: number;
  readonly frame?: { readonly size: number; readonly index: number; readonly columns: 4 };
}
export type ArchiveAssetState = { status: 'loading' | 'ready' | 'missing' | 'invalid'; width?: number; height?: number };
export const ERA_CHARACTER_ARCHIVE = rosterJson as readonly EraCharacterArchiveEntry[];
const archiveById = new Map(ERA_CHARACTER_ARCHIVE.map(entry => [entry.id, entry]));

/** IDs only: a filename, alias or era role can never silently select another person. */
export function getEraCharacterArchiveEntry(id: string | null | undefined): EraCharacterArchiveEntry | undefined {
  return typeof id === 'string' ? archiveById.get(id) : undefined;
}
export function getArchiveAnimationClips(entry: EraCharacterArchiveEntry): readonly ArchiveAnimationClip[] {
  const animation = entry.animation;
  if (animation.kind === 'roster') return animation.states.map((state, row) => ({
    state, path: animation.path, frameSize: animation.frameSize, columns: 4, rows: 4,
    start: row * 4, end: row * 4 + 3, frameRate: state === 'idle' ? 4 : 6
  }));
  if (animation.kind === 'special') {
    const actor = getSideOpsSpecialActorDefinition(animation.sourceTextureKey);
    if (!actor) return [];
    return (['core', 'special'] as const).flatMap(board => actor.states[board].flatMap(state => {
      const clip = getSideOpsSpecialActorAnimation(actor.sourceTextureKey, state);
      return clip ? [{ state, path: `/sideops/special-animations/${actor.id}/${board}.png`, frameSize: actor.frameSize, columns: 4 as const, rows: 4 as const, start: clip.start, end: clip.end, frameRate: clip.frameRate }] : [];
    }));
  }
  const states: Record<string, readonly SideOpsActorAnimationState[]> = {
    mobility: ['idle', 'move', 'crouch', 'jump'], combat: ['attack', 'melee', 'hit', 'death']
  };
  return SIDEOPS_ACTOR_ANIMATION_SHEETS.filter(sheet => sheet.packId === animation.packId && sheet.role === animation.role)
    .flatMap(sheet => states[sheet.board].map(state => {
      const clip = getSideOpsActorAnimation(animation.packId, animation.role, state);
      return { state, path: sheet.path, frameSize: sheet.frameWidth, columns: 4 as const, rows: 4 as const, start: clip.start, end: clip.end, frameRate: clip.frameRate };
    }));
}
export function getArchivePortraitExpressions(entry: EraCharacterArchiveEntry): readonly string[] {
  if (entry.portrait.kind !== 'character') return ['source'];
  const characterId = entry.portrait.characterId;
  return archivePortraitSetsJson.find(set => set.characterId === characterId)?.expressions
    ?? ['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch'];
}
export function getArchivePortraitAsset(entry: EraCharacterArchiveEntry, expression = 'neutral'): ArchiveImageAsset | undefined {
  if (entry.portrait.kind === 'character') {
    const path = getCharacterPortrait(entry.portrait.characterId, expression);
    return path ? { path } : undefined;
  }
  if (entry.portrait.path) return { path: entry.portrait.path };
  const idle = getArchiveAnimationClips(entry).find(clip => clip.state === 'idle');
  return idle ? { path: idle.path, width: idle.frameSize * 4, height: idle.frameSize * 4, frame: { size: idle.frameSize, index: idle.start, columns: 4 } } : undefined;
}
export function getArchiveRequiredAssets(entry: EraCharacterArchiveEntry): readonly ArchiveImageAsset[] {
  const portrait = getArchivePortraitAsset(entry);
  const result = new Map<string, ArchiveImageAsset>();
  if (portrait) result.set(portrait.path, portrait);
  for (const clip of getArchiveAnimationClips(entry)) result.set(clip.path, { path: clip.path, width: clip.frameSize * 4, height: clip.frameSize * 4 });
  return [...result.values()];
}
/** Presence is established by decoded images, never by a manifest row alone. */
export function getArchiveCoverage(entry: EraCharacterArchiveEntry, states: Readonly<Record<string, ArchiveAssetState>>) {
  const portrait = getArchivePortraitAsset(entry);
  const clips = getArchiveAnimationClips(entry);
  const paths = [...new Set(clips.map(clip => clip.path))];
  const readyPaths = paths.filter(path => states[path]?.status === 'ready');
  return {
    portraitReady: Boolean(portrait && states[portrait.path]?.status === 'ready'),
    animationReady: paths.length > 0 && readyPaths.length === paths.length,
    loadedBoards: readyPaths.length,
    expectedBoards: paths.length,
    loadedPoses: readyPaths.length * 16,
    expectedPoses: paths.length * 16,
    missingPaths: getArchiveRequiredAssets(entry).filter(asset => ['missing', 'invalid'].includes(states[asset.path]?.status ?? '')).map(asset => asset.path)
  };
}
export function getArchiveFrameRect(clip: ArchiveAnimationClip, phase: number) {
  const safePhase = Number.isFinite(phase) ? Math.max(0, Math.min(clip.end - clip.start, Math.floor(phase))) : 0;
  const index = clip.start + safePhase;
  return { index, x: index % clip.columns * clip.frameSize, y: Math.floor(index / clip.columns) * clip.frameSize, width: clip.frameSize, height: clip.frameSize };
}
/** Reject HTML SPA fallbacks and wrong-sized sheets even if HTTP returned 200. */
export function validateArchiveImageDimensions(asset: ArchiveImageAsset, width: number, height: number): ArchiveAssetState {
  return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
    && (!asset.width || width === asset.width) && (!asset.height || height === asset.height)
    ? { status: 'ready', width, height } : { status: 'invalid', width, height };
}
