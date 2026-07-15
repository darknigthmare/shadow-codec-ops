import { describe, expect, it } from 'vitest';
import { codecAssetPacks, getBuiltInPortrait, getCharacterPortrait, getCodecAssetPack, getCodecUiCueSignature } from './codecAssetEngine';

describe('codec asset packs', () => {
  it('covers every codec era exactly once', () => {
    expect(codecAssetPacks).toHaveLength(9);
    expect(new Set(codecAssetPacks.map((pack) => pack.era)).size).toBe(9);
  });
  it('provides safe local portrait paths and expression support', () => {
    for (const pack of codecAssetPacks) {
      expect(pack.builtInPortraits.player).toMatch(/^\/portraits\/system\//);
      expect(pack.builtInPortraits.contact).toMatch(/^\/portraits\/system\//);
      expect(pack.expressionSupport).toContain('warning');
    }
    expect(getBuiltInPortrait('mgs3', 'contact')).toContain('mgs3-contact.svg');
    expect(getCodecAssetPack('peace_walker').uiProfile).toBe('briefing');
  });
  it('resolves every built-in MGS1 character portrait set', () => {
    const portraitDirectories = {
      solid_snake_mgs1: 'solid_snake',
      campbell_mgs1: 'campbell',
      mei_ling_mgs1: 'mei_ling',
      naomi_mgs1: 'naomi',
      otacon_mgs1: 'otacon',
      nastasha_mgs1: 'nastasha',
      miller_mgs1: 'miller',
      meryl_mgs1: 'meryl',
      deepthroat_mgs1: 'deepthroat'
    };

    for (const [characterId, directory] of Object.entries(portraitDirectories)) {
      expect(getCharacterPortrait(characterId, 'warning')).toBe(`/portraits/mgs1/${directory}/warning.webp`);
    }
  });
  it('uses a neutral fallback for unsupported expressions and no fallback for unknown characters', () => {
    expect(getCharacterPortrait('solid_snake_mgs1', 'unsupported')).toBe('/portraits/mgs1/solid_snake/neutral.webp');
    expect(getCharacterPortrait('mei_ling_mgs1', 'unsupported')).toBe('/portraits/mgs1/mei_ling/neutral.webp');
    expect(getCharacterPortrait('unknown_character', 'neutral')).toBeUndefined();
    expect(getCharacterPortrait(undefined, 'neutral')).toBeUndefined();
  });
  it('keeps distinct procedural UI signatures for each hardware generation', () => {
    expect(getCodecUiCueSignature('msx', 'incoming')).toMatchObject({ profile: '8bit', tones: 3, waveform: 'square' });
    expect(getCodecUiCueSignature('mgs3', 'connect').profile).toBe('analog');
    expect(getCodecUiCueSignature('mgs4', 'connect').profile).toBe('secure');
    expect(getCodecUiCueSignature('mgsv', 'connect').profile).toBe('idroid');
  });
});
