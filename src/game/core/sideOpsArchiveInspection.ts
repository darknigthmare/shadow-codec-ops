import { getArchiveAnimationClips, getEraCharacterArchiveEntry, type EraCharacterArchiveEntry } from '../../systems/eraCharacterArchive';
import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';

export const SIDEOPS_ARCHIVE_INSPECTION_KEY = 'sideops-archive-inspection-id';

/** A visual dummy never becomes a mission contact, target or objective. */
export function resolveArchiveInspectionSelection(raw: string | null, pack: SideOpsVisualPackId): EraCharacterArchiveEntry | undefined {
  if (!raw) return undefined;
  try {
    const value: unknown = JSON.parse(raw);
    const entry = typeof value === 'string' ? getEraCharacterArchiveEntry(value) : undefined;
    return entry?.visualPackId === pack && getArchiveAnimationClips(entry).length ? entry : undefined;
  } catch { return undefined; }
}

export function getArchiveInspectionScale(entry: EraCharacterArchiveEntry, width: number, height: number): number {
  if (!(width > 0 && height > 0 && Number.isFinite(width) && Number.isFinite(height))) return 1;
  const targetHeight = /chico|eli_|tretij/.test(entry.id) ? 42
    : /d_dog|d-dog/.test(entry.id) ? 40
    : /d_horse|d-horse/.test(entry.id) ? 80
    : entry.category === 'machine' ? 130 : 60;
  return Math.min(targetHeight / height, 210 / width);
}

export function getArchiveInspectionState(entry: EraCharacterArchiveEntry, requested: string): string {
  const clips = getArchiveAnimationClips(entry);
  return clips.some(clip => clip.state === requested) ? requested : clips[0]?.state ?? 'idle';
}
