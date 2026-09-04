import { describe, expect, it } from 'vitest';
import codecContextsJson from '../data/codecContexts.json';
import contactsJson from '../data/contacts.json';
import mg1PortraitSetsJson from '../data/mg1PortraitSets.json';
import mg2PortraitSetsJson from '../data/mg2PortraitSets.json';
import mgs2PortraitSetsJson from '../data/mgs2PortraitSets.json';
import mgs3PortraitSetsJson from '../data/mgs3PortraitSets.json';
import mgs4PortraitSetsJson from '../data/mgs4PortraitSets.json';
import mgsvPortraitSetsJson from '../data/mgsvPortraitSets.json';
import patriotsAiPortraitSetsJson from '../data/patriotsAiPortraitSets.json';
import peaceWalkerPortraitSetsJson from '../data/peaceWalkerPortraitSets.json';
import vrSimulationPortraitSetsJson from '../data/vrSimulationPortraitSets.json';
import { codecAssetPacks, getBuiltInPortrait, getCharacterPortrait, getCodecAssetPack, getCodecUiCueSignature } from './codecAssetEngine';

describe('codec asset packs', () => {
  it('routes every catalog contact and declares only local portraits', () => {
    for (const contact of contactsJson) {
      expect(contact.portrait, contact.id).toMatch(/^\/portraits\//);
      expect(getCharacterPortrait(contact.id, 'neutral'), contact.id).toMatch(/^\/portraits\//);
    }
  });

  it('routes every playable Codec identity declared by the context catalog', () => {
    const playerIds = new Set(codecContextsJson.flatMap(({ players }) => players.map(({ id }) => id)));
    expect(playerIds.size).toBeGreaterThan(0);
    for (const playerId of playerIds) {
      expect(getCharacterPortrait(playerId, 'neutral'), playerId).toMatch(/^\/portraits\//);
    }
  });

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
  it('declares the delivered MGS2 and MGS3 character portrait packs', () => {
    for (const era of ['mgs2', 'mgs3'] as const) {
      const pack = getCodecAssetPack(era);
      expect(pack.includedAssets).toContain(`${era.toUpperCase()} character-specific portrait pack`);
      expect(pack.missingRecommendedAssets).not.toContain('character-specific portrait pack');
    }
  });
  it('resolves every MG1 MSX portrait expression and player alias', () => {
    const expectedExpressions = ['neutral', 'serious', 'warning', 'calm', 'glitch', 'humor'];
    const portraitDirectories: Record<string, string> = {
      solid_snake_msx: 'solid_snake',
      big_boss_mg1: 'big_boss',
      schneider_mg1: 'schneider',
      diane_mg1: 'diane',
      jennifer_mg1: 'jennifer'
    };

    expect(mg1PortraitSetsJson.map(({ characterId }) => characterId)).toEqual(Object.keys(portraitDirectories));
    for (const { characterId, directory, aliases, expressions } of mg1PortraitSetsJson) {
      expect(directory).toBe(portraitDirectories[characterId]);
      expect(expressions).toEqual(expectedExpressions);
      for (const expression of expressions) {
        const expectedPath = `/portraits/msx/mg1/${directory}/${expression}.webp`;
        expect(getCharacterPortrait(characterId, expression)).toBe(expectedPath);
        for (const alias of aliases) expect(getCharacterPortrait(alias, expression)).toBe(expectedPath);
      }
    }

    const msxPack = getCodecAssetPack('msx');
    expect(msxPack.includedAssets).toContain('MG1 character-specific portrait pack');
    expect(msxPack.missingRecommendedAssets).not.toContain('character-specific portrait pack');
    expect(msxPack.includedAssets).toContain('MG2 character-specific portrait pack');
    expect(msxPack.missingRecommendedAssets).not.toContain('MG2 character-specific portrait pack');
  });
  it('resolves every MG2 Zanzibar Land portrait expression and alias', () => {
    expect(mg2PortraitSetsJson.map(({ characterId }) => characterId)).toEqual([
      'solid_snake_mg2',
      'campbell_msx',
      'miller_msx',
      'kasler_msx',
      'holly_msx',
      'jacobsen_msx'
    ]);
    for (const { characterId, directory, aliases, expressions } of mg2PortraitSetsJson) {
      expect(expressions).toEqual(['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch']);
      for (const expression of expressions) {
        const expectedPath = `/portraits/msx/mg2/${directory}/${expression}.webp`;
        expect(getCharacterPortrait(characterId, expression)).toBe(expectedPath);
        for (const alias of aliases) expect(getCharacterPortrait(alias, expression)).toBe(expectedPath);
      }
    }
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
      deepthroat_mgs1: 'deepthroat',
      houseman_mgs1: 'houseman',
      sniper_wolf_mgs1: 'sniper_wolf'
    };

    for (const [characterId, directory] of Object.entries(portraitDirectories)) {
      expect(getCharacterPortrait(characterId, 'warning')).toBe(`/portraits/mgs1/${directory}/warning.webp`);
    }
  });
  it('resolves the active MGS1 story variant into its dedicated portrait directory', () => {
    expect(getCharacterPortrait('naomi_mgs1', 'neutral', {
      contextId: 'mgs1_insertion',
      flags: []
    })).toBe('/portraits/mgs1/naomi/neutral.webp');
    expect(getCharacterPortrait('miller_mgs1', 'neutral', {
      contextId: 'mgs1_insertion',
      flags: []
    })).toBe('/portraits/mgs1/miller/neutral.webp');
    expect(getCharacterPortrait('meryl_mgs1', 'neutral', {
      contextId: 'mgs1_cellblock',
      flags: ['met_meryl']
    })).toBe('/portraits/mgs1/meryl/neutral.webp');
    expect(getCharacterPortrait('naomi_mgs1', 'serious', {
      contextId: 'mgs1_underground_base',
      flags: ['late_operation']
    })).toBe('/portraits/mgs1/variants/naomi/restricted/serious.webp');
    expect(getCharacterPortrait('miller_mgs1', 'warning', {
      contextId: 'mgs1_rex_hangar',
      flags: ['miller_identity_revealed']
    })).toBe('/portraits/mgs1/variants/miller/liquid_revealed/warning.webp');
    expect(getCharacterPortrait('meryl_mgs1', 'calm', {
      contextId: 'mgs1_escape',
      flags: ['escape_sequence']
    })).toBe('/portraits/mgs1/variants/meryl/escape/calm.webp');
    expect(getCharacterPortrait('deepthroat_mgs1', 'neutral', {
      contextId: 'mgs1_nuclear_storage',
      flags: ['deepthroat_signal_detected']
    })).toBe('/portraits/mgs1/variants/deepthroat/unknown_signal/neutral.webp');
    expect(getCharacterPortrait('deepthroat_mgs1', 'neutral', {
      contextId: 'mgs1_rex_hangar',
      flags: ['deepthroat_signal_detected', 'gray_fox_identity_revealed']
    })).toBe('/portraits/mgs1/variants/deepthroat/gray_fox/neutral.webp');
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
    expect(mgs2PortraitSetsJson.find(({ contactId }) => contactId === 'mr_x_mgs2')?.expressions).toContain('urgent');
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
    expect(mgs3PortraitSetsJson.find(({ contactId }) => contactId === 'sigint_mgs3')?.expressions).toContain('urgent');
    expect(mgs3PortraitSetsJson.find(({ contactId }) => contactId === 'eva_mgs3')?.expressions).toContain('urgent');
  });
  it('resolves every MGS4 player and contact portrait expression', () => {
    for (const { contactId, directory, aliases, expressions } of mgs4PortraitSetsJson) {
      for (const expression of expressions) {
        const expectedPath = `/portraits/mgs4/${directory}/${expression}.webp`;
        expect(getCharacterPortrait(contactId, expression)).toBe(expectedPath);
        for (const alias of aliases) expect(getCharacterPortrait(alias, expression)).toBe(expectedPath);
      }
    }

    const pack = getCodecAssetPack('mgs4');
    expect(pack.includedAssets).toContain('MGS4 character-specific portrait pack');
    expect(pack.missingRecommendedAssets).not.toContain('character-specific portrait pack');
  });
  it('resolves every Peace Walker portrait expression and alias', () => {
    expect(peaceWalkerPortraitSetsJson).toHaveLength(10);
    for (const { characterId, directory, aliases, expressions } of peaceWalkerPortraitSetsJson) {
      for (const expression of expressions) {
        const expectedPath = `/portraits/peace_walker/${directory}/${expression}.webp`;
        expect(getCharacterPortrait(characterId, expression)).toBe(expectedPath);
        for (const alias of aliases) expect(getCharacterPortrait(alias, expression)).toBe(expectedPath);
      }
    }
    const pack = getCodecAssetPack('peace_walker');
    expect(pack.includedAssets).toContain('Peace Walker character-specific portrait pack');
    expect(pack.missingRecommendedAssets).not.toContain('character-specific portrait pack');
  });
  it('resolves every Ground Zeroes and The Phantom Pain portrait expression and alias', () => {
    expect(mgsvPortraitSetsJson).toHaveLength(9);
    for (const { characterId, directory, aliases, expressions } of mgsvPortraitSetsJson) {
      for (const expression of expressions) {
        const expectedPath = `/portraits/mgsv/${directory}/${expression}.webp`;
        expect(getCharacterPortrait(characterId, expression)).toBe(expectedPath);
        for (const alias of aliases) expect(getCharacterPortrait(alias, expression)).toBe(expectedPath);
      }
    }
    const pack = getCodecAssetPack('mgsv');
    expect(pack.includedAssets).toContain('MGSV character-specific portrait pack');
    expect(pack.missingRecommendedAssets).not.toContain('character-specific portrait pack');
  });
  it.each([
    ['vr_simulation', vrSimulationPortraitSetsJson, '/portraits/vr_simulation/', 'VR Simulation character-specific portrait pack'],
    ['patriots_ai', patriotsAiPortraitSetsJson, '/portraits/patriots_ai/', 'Patriots AI character-specific portrait pack']
  ] as const)('resolves every %s portrait expression and alias', (era, portraitSets, basePath, includedAsset) => {
    expect(portraitSets).toHaveLength(2);
    for (const { characterId, directory, aliases, expressions } of portraitSets) {
      for (const expression of expressions) {
        const expectedPath = `${basePath}${directory}/${expression}.webp`;
        expect(getCharacterPortrait(characterId, expression)).toBe(expectedPath);
        for (const alias of aliases) expect(getCharacterPortrait(alias, expression)).toBe(expectedPath);
      }
    }
    const pack = getCodecAssetPack(era);
    expect(pack.includedAssets).toContain(includedAsset);
    expect(pack.missingRecommendedAssets).not.toContain('character-specific portrait pack');
  });
  it('uses a neutral fallback for unsupported expressions and no fallback for unknown characters', () => {
    expect(getCharacterPortrait('solid_snake_msx', 'unsupported')).toBe('/portraits/msx/mg1/solid_snake/neutral.webp');
    expect(getCharacterPortrait('solid_snake_mg1', 'unsupported')).toBe('/portraits/msx/mg1/solid_snake/neutral.webp');
    expect(getCharacterPortrait('big_boss_mg1', 'unsupported')).toBe('/portraits/msx/mg1/big_boss/neutral.webp');
    expect(getCharacterPortrait('solid_snake_mgs1', 'unsupported')).toBe('/portraits/mgs1/solid_snake/neutral.webp');
    expect(getCharacterPortrait('mei_ling_mgs1', 'unsupported')).toBe('/portraits/mgs1/mei_ling/neutral.webp');
    expect(getCharacterPortrait('otacon_mgs2', 'glitch')).toBe('/portraits/mgs2/otacon/neutral.webp');
    expect(getCharacterPortrait('para_medic_save_mgs3', 'medical')).toBe('/portraits/mgs3/para_medic/neutral.webp');
    expect(getCharacterPortrait('major_mgs3', 'unsupported')).toBe('/portraits/mgs3/major_zero/neutral.webp');
    expect(getCharacterPortrait('old_snake', 'unsupported')).toBe('/portraits/mgs4/old_snake/neutral.webp');
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
