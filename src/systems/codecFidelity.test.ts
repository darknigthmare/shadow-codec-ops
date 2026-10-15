import { describe, expect, it } from 'vitest';
import profiles from '../data/codecFidelityProfiles.json';
import { getAllCodecVisualIdentities } from './codecVisualIdentity';

describe('codec fidelity profiles', () => {
  it('documents every visual identity exactly once', () => {
    const eras = profiles.map((profile) => profile.era);
    expect(new Set(eras).size).toBe(eras.length);
    expect(new Set(eras)).toEqual(new Set(getAllCodecVisualIdentities().map((identity) => identity.era)));
  });

  it('keeps classic tuning only on frequency-based generations', () => {
    const identities = Object.fromEntries(getAllCodecVisualIdentities().map((identity) => [identity.era, identity]));
    expect(identities.msx.supportsClassicTuning).toBe(true);
    expect(identities.mgs1.supportsClassicTuning).toBe(true);
    expect(identities.mgs2.supportsClassicTuning).toBe(true);
    expect(identities.mgs3.supportsClassicTuning).toBe(true);
    expect(identities.mgs4.supportsClassicTuning).toBe(false);
    expect(identities.peace_walker.supportsClassicTuning).toBe(false);
    expect(identities.mgsv.supportsClassicTuning).toBe(false);
  });
});
