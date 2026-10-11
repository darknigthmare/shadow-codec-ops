import { describe, expect, it } from 'vitest';
import conversationsJson from '../data/conversations.json';
import type { ConversationDefinition } from '../types/codec.types';
import { getMgs2Coverage, getMgs2Items, getMgs2PortraitSets, getMgs2Profile, getMgs2Profiles, getMgs2ScheduledIncomingForContext, getMgs2Timeline, getMgs2Zones, resolveMgs2IdentityLabel } from './mgs2ContentEngine';

describe('complete MGS2 Codec layer', () => {
  it('contains every principal Tanker and Plant Codec contact', () => {
    expect(getMgs2Profiles().map((entry) => entry.id)).toEqual(expect.arrayContaining(['otacon_mgs2','colonel_mgs2','rose_mgs2','pliskin_mgs2','stillman_mgs2','mr_x_mgs2','emma_mgs2']));
  });

  it('resolves the late identity and AI reveals', () => {
    expect(resolveMgs2IdentityLabel(getMgs2Profile('pliskin_mgs2')!, ['pliskin_identity_revealed'])).toBe('Solid Snake');
    expect(resolveMgs2IdentityLabel(getMgs2Profile('colonel_mgs2')!, ['gw_corruption'])).toBe('GW Colonel AI');
    expect(resolveMgs2IdentityLabel(getMgs2Profile('mr_x_mgs2')!, ['mr_x_revealed'])).toBe('Olga Gurlukovich');
  });

  it('provides encyclopedia coverage for both chapters', () => {
    expect(getMgs2Zones().length).toBeGreaterThanOrEqual(8);
    expect(getMgs2Items().length).toBeGreaterThanOrEqual(10);
    expect(getMgs2Timeline().length).toBeGreaterThanOrEqual(9);
    expect(getMgs2PortraitSets()).toHaveLength(7);
  });

  it('schedules contextual incoming calls', () => {
    expect(getMgs2ScheduledIncomingForContext('mgs2_tanker', [])).toHaveLength(1);
    expect(getMgs2ScheduledIncomingForContext('mgs2_arsenal', [])).toHaveLength(1);
  });

  it('reports the live conversation coverage', () => {
    const coverage = getMgs2Coverage(conversationsJson as ConversationDefinition[]);
    expect(coverage.contacts).toBe(7);
    expect(coverage.conversations).toBeGreaterThanOrEqual(25);
    expect(coverage.contexts).toBeGreaterThanOrEqual(5);
  });
});
