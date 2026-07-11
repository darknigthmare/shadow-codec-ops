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
  it('resolves character-specific emotional portrait sets with a neutral fallback', () => {
    expect(getCharacterPortrait('solid_snake_mgs1', 'warning')).toBe('/portraits/mgs1/solid_snake/warning.webp');
    expect(getCharacterPortrait('campbell_mgs1', 'calm')).toBe('/portraits/mgs1/campbell/calm.webp');
    expect(getCharacterPortrait('solid_snake_mgs1', 'unsupported')).toBe('/portraits/mgs1/solid_snake/neutral.webp');
    expect(getCharacterPortrait('unknown_character', 'neutral')).toBeUndefined();
  });
  it('keeps distinct procedural UI signatures for each hardware generation', () => {
    expect(getCodecUiCueSignature('msx', 'incoming')).toMatchObject({ profile: '8bit', tones: 3, waveform: 'square' });
    expect(getCodecUiCueSignature('mgs3', 'connect').profile).toBe('analog');
    expect(getCodecUiCueSignature('mgs4', 'connect').profile).toBe('secure');
    expect(getCodecUiCueSignature('mgsv', 'connect').profile).toBe('idroid');
  });
});
