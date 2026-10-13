import { describe, expect, it } from 'vitest';
import erasJson from '../data/eras.json';
import themesJson from '../data/themes.json';
import type { EraDefinition, EraId } from '../types/codec.types';
import type { ThemePackDefinition } from '../types/theme.types';
import { getAllCodecVisualIdentities, getCodecVisualIdentity } from './codecVisualIdentity';

const eras = erasJson as EraDefinition[];
const themes = themesJson as ThemePackDefinition[];

describe('codec visual identity', () => {
  it('defines a dedicated layout for every era', () => {
    const identities = getAllCodecVisualIdentities();
    expect(identities).toHaveLength(eras.length);
    for (const era of eras) {
      const identity = getCodecVisualIdentity(era.id as EraId);
      expect(identity.era).toBe(era.id);
      expect(identity.layoutId).toBeTruthy();
      expect(identity.callLabel).toBeTruthy();
    }
  });

  it('does not reuse the MGSV visual pack for Peace Walker', () => {
    const peaceWalker = eras.find((era) => era.id === 'peace_walker');
    expect(peaceWalker?.visualStyle).toBe('peace_walker_msf');
    expect(getCodecVisualIdentity('peace_walker').layoutId).toBe('peace_walker_briefing');
  });

  it('keeps every era default theme resolvable', () => {
    for (const era of eras) {
      expect(themes.some((theme) => theme.id === era.visualStyle)).toBe(true);
    }
  });

  it('uses visually distinct core layouts for the seven franchise presentations', () => {
    const coreEras: EraId[] = ['msx', 'mgs1', 'mgs2', 'mgs3', 'mgs4', 'peace_walker', 'mgsv'];
    const layouts = coreEras.map((era) => getCodecVisualIdentity(era).layoutId);
    expect(new Set(layouts).size).toBe(coreEras.length);
  });
});
