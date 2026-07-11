import { describe, expect, it } from 'vitest';
import { getMgs1Items, getMgs1ItemsForContact, getMgs1PortraitSets, getMgs1Timeline, getMgs1TimelineState, getMgs1Zones } from './mgs1Encyclopedia';
describe('MGS1 encyclopedia', () => {
  it('contains a broad zone and item catalogue', () => { expect(getMgs1Zones().length).toBeGreaterThanOrEqual(15); expect(getMgs1Items().length).toBeGreaterThanOrEqual(24); });
  it('links every item to at least one expert', () => { expect(getMgs1Items().every((entry) => entry.expertContactIds.length > 0)).toBe(true); });
  it('contains portrait variants for all principal contacts', () => { expect(getMgs1PortraitSets()).toHaveLength(8); expect(getMgs1PortraitSets().every((entry) => entry.expressions.length >= 6)).toBe(true); });
  it('tracks timeline completion from narrative flags', () => { const state = getMgs1TimelineState('mgs1_rex_hangar', ['miller_identity_revealed']); expect(state.find((entry) => entry.id === 'miller_reveal')?.complete).toBe(true); });
  it('assigns Nastasha a substantial equipment catalogue', () => { expect(getMgs1ItemsForContact('nastasha_mgs1').length).toBeGreaterThanOrEqual(8); });
  it('contains a full narrative spine', () => { expect(getMgs1Timeline().length).toBeGreaterThanOrEqual(10); });
});
