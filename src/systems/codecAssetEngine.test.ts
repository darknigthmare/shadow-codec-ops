import { describe, expect, it } from 'vitest';
import mgs2PortraitSetsJson from '../data/mgs2PortraitSets.json';
import mgs3PortraitSetsJson from '../data/mgs3PortraitSets.json';
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
  it('resolves MGS2 players, contacts and their exact portrait expressions', () => {
    const contactDirectories: Record<string, string> = {
      otacon_mgs2: 'otacon',
      colonel_mgs2: 'colonel',
      rose_mgs2: 'rose',
      pliskin_mgs2: 'pliskin',
      stillman_mgs2: 'stillman',
      mr_x_mgs2: 'mr_x',
      emma_mgs2: 'emma'
    };

    for (const { contactId, expressions } of mgs2PortraitSetsJson) {
      for (const expression of expressions) {
        expect(getCharacterPortrait(contactId, expression)).toBe(`/portraits/mgs2/${contactDirectories[contactId]}/${expression}.webp`);
      }
    }
    for (const [characterId, directory] of [['solid_snake_mgs2', 'solid_snake'], ['raiden_mgs2', 'raiden']] as const) {
      for (const expression of getCodecAssetPack('mgs2').expressionSupport) {
        expect(getCharacterPortrait(characterId, expression)).toBe(`/portraits/mgs2/${directory}/${expression}.webp`);
      }
    }
    expect(getCharacterPortrait('mr_x_mgs2', 'urgent')).toBe('/portraits/mgs2/mr_x/urgent.webp');
  });
  it('resolves MGS3 aliases and character-specific portrait expressions', () => {
    const contactDirectories: Record<string, string> = {
      major_mgs3: 'major_zero',
      para_medic_save_mgs3: 'para_medic',
      para_medic_mgs3: 'para_medic',
      the_boss_mgs3: 'the_boss',
      sigint_mgs3: 'sigint',
      eva_mgs3: 'eva'
    };

    for (const { contactId, expressions } of mgs3PortraitSetsJson) {
      for (const expression of expressions) {
        expect(getCharacterPortrait(contactId, expression)).toBe(`/portraits/mgs3/${contactDirectories[contactId]}/${expression}.webp`);
      }
    }
    for (const characterId of ['naked_snake', 'naked_snake_mgs3']) {
      for (const expression of getCodecAssetPack('mgs3').expressionSupport) {
        expect(getCharacterPortrait(characterId, expression)).toBe(`/portraits/mgs3/naked_snake/${expression}.webp`);
      }
    }
    expect(getCharacterPortrait('para_medic_mgs3', 'medical')).toBe('/portraits/mgs3/para_medic/medical.webp');
    expect(getCharacterPortrait('sigint_mgs3', 'urgent')).toBe('/portraits/mgs3/sigint/urgent.webp');
    expect(getCharacterPortrait('eva_mgs3', 'urgent')).toBe('/portraits/mgs3/eva/urgent.webp');
  });
  it('uses a neutral fallback for unsupported expressions and no fallback for unknown characters', () => {
    expect(getCharacterPortrait('solid_snake_mgs1', 'unsupported')).toBe('/portraits/mgs1/solid_snake/neutral.webp');
    expect(getCharacterPortrait('mei_ling_mgs1', 'unsupported')).toBe('/portraits/mgs1/mei_ling/neutral.webp');
    expect(getCharacterPortrait('otacon_mgs2', 'glitch')).toBe('/portraits/mgs2/otacon/neutral.webp');
    expect(getCharacterPortrait('para_medic_save_mgs3', 'medical')).toBe('/portraits/mgs3/para_medic/neutral.webp');
    expect(getCharacterPortrait('major_mgs3', 'unsupported')).toBe('/portraits/mgs3/major_zero/neutral.webp');
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
