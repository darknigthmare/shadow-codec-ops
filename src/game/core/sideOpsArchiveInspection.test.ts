import { describe, expect, it } from 'vitest';
import { ERA_CHARACTER_ARCHIVE } from '../../systems/eraCharacterArchive';
import { getArchiveInspectionScale, getArchiveInspectionState, resolveArchiveInspectionSelection } from './sideOpsArchiveInspection';

describe('archive inspection identity and scene isolation', () => {
  it('accepts exact IDs only in their own period', () => {
    for (const entry of ERA_CHARACTER_ARCHIVE) {
      expect(resolveArchiveInspectionSelection(JSON.stringify(entry.id), entry.visualPackId)?.id).toBe(entry.id);
      expect(resolveArchiveInspectionSelection(JSON.stringify(entry.id), entry.visualPackId === 'peace_walker' ? 'mgsv_phantom_pain' : 'peace_walker')).toBeUndefined();
    }
  });
  it('ignores corrupt, non-string and unknown selections', () => {
    for (const raw of [null, '', 'broken', '{}', '123', 'null', '"not-a-character"']) expect(resolveArchiveInspectionSelection(raw, 'peace_walker')).toBeUndefined();
  });
  it('never aliases civilians to weapon attacks', () => {
    const paz = ERA_CHARACTER_ARCHIVE.find(entry => entry.id === 'paz_pw')!;
    expect(getArchiveInspectionState(paz, 'attack')).toBe('idle');
    expect(getArchiveInspectionState(paz, 'interact')).toBe('interact');
  });
  it('keeps actual silhouettes bounded and handles invalid dimensions', () => {
    for (const entry of ERA_CHARACTER_ARCHIVE) {
      const scale = getArchiveInspectionScale(entry, 300, 100);
      expect(scale).toBeGreaterThan(0);
      expect(scale * 300).toBeLessThanOrEqual(210);
      expect(getArchiveInspectionScale(entry, 0, Number.NaN)).toBe(1);
    }
  });
});
