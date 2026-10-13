import { describe, expect, it } from 'vitest';
import { getGroundedNpcY, getSpecialNpcReaction } from './sideOpsNpcPresentation';

describe('NPC presentation follows playable geometry', () => {
  it('grounds Otacon on the actual Shadow Moses floor instead of floating 32px', () => {
    expect(getGroundedNpcY(4480, 452, 48, [{ left: 0, right: 14000, top: 508 }], 508)).toBe(484);
  });
  it('selects the closest support below the NPC and ignores overhead or distant ledges', () => {
    const supports = [{ left: 0, right: 1000, top: 508 }, { left: 450, right: 550, top: 476 }, { left: 450, right: 550, top: 300 }, { left: 700, right: 800, top: 460 }];
    expect(getGroundedNpcY(500, 452, 48, supports, 508)).toBe(452);
    expect(getGroundedNpcY(1200, 452, 48, supports, 508)).toBe(484);
  });
  it('gives Otacon non-combat reactions without inventing weapon animations', () => {
    expect(getSpecialNpcReaction('mgs1Otacon', 100, true, 0)).toBe('fear');
    expect(getSpecialNpcReaction('mgs1Otacon', 100, false, 0)).toBe('interact');
    expect(getSpecialNpcReaction('mgs1Otacon', 100, false, 1)).toBe('radio');
    expect(getSpecialNpcReaction('mgs1Otacon', 500, true, 0)).toBeUndefined();
    expect(getSpecialNpcReaction('mgs1MerylSilverburgh', 100, false, 0)).toBeUndefined();
  });
});
