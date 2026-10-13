import { describe, expect, it } from 'vitest';
import {
  SIDEOPS_PLAYABLE_OPERATIVE_ASSETS,
  SIDEOPS_VISUAL_PACK_IDS,
  isSideOpsVisualPackId,
  normalizeSideOpsCharacterAlias,
  resolveSideOpsCharacterTextures,
  resolveSideOpsVisualPackId
} from './sideOpsCharacterResolver';

describe('Side Ops playable operative resolver', () => {
  it('registers the eight explicit Pack 02 assets with unique keys and paths', () => {
    expect(SIDEOPS_PLAYABLE_OPERATIVE_ASSETS).toHaveLength(8);
    expect(new Set(SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.map((asset) => asset.textureKey)).size).toBe(8);
    expect(new Set(SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.map((asset) => asset.path)).size).toBe(8);
  });

  it('registers every supported visual pack exactly once', () => {
    expect(SIDEOPS_VISUAL_PACK_IDS).toHaveLength(12);
    expect(new Set(SIDEOPS_VISUAL_PACK_IDS).size).toBe(SIDEOPS_VISUAL_PACK_IDS.length);
    SIDEOPS_VISUAL_PACK_IDS.forEach((packId) => expect(isSideOpsVisualPackId(packId)).toBe(true));
    expect(isSideOpsVisualPackId('unknown_pack')).toBe(false);
  });

  it.each([
    [{ era: 'msx', mainCharacter: 'solid_snake_mg1', environment: 'facility' }, 'mg1'],
    [{ era: 'msx', mainCharacter: 'solid_snake_mg2', environment: 'facility' }, 'mg2'],
    [{ era: 'msx', mainCharacter: 'Solid Snake', environment: 'facility', location: 'Zanzibar Land' }, 'mg2'],
    [{ era: 'mgs2', mainCharacter: 'Solid Snake', environment: 'facility' }, 'mgs2_tanker'],
    [{ era: 'mgs2', mainCharacter: 'Raiden', environment: 'facility', location: 'Big Shell' }, 'mgs2_plant'],
    [{ era: 'mgsv', mainCharacter: 'big_boss_gz', environment: 'facility', location: 'Camp Omega' }, 'mgsv_ground_zeroes'],
    [{ era: 'mgsv', mainCharacter: 'venom_snake', environment: 'facility' }, 'mgsv_phantom_pain']
  ] as const)('derives legacy document visual identity as %s', (input, expected) => {
    expect(resolveSideOpsVisualPackId(input)).toBe(expected);
  });

  it('honors compatible explicit packs and safely derives over incompatible values', () => {
    expect(resolveSideOpsVisualPackId({
      era: 'msx',
      mainCharacter: 'solid_snake_mg2',
      environment: 'facility',
      visualPackId: 'mg1'
    })).toBe('mg1');
    expect(resolveSideOpsVisualPackId({
      era: 'mgsv',
      mainCharacter: 'venom_snake',
      environment: 'facility',
      visualPackId: 'mg1'
    })).toBe('mgsv_phantom_pain');
  });

  it.each([
    [{ era: 'msx', mainCharacter: 'unknown', environment: 'facility', visualPackId: 'mg2' }, 'playerSolidSnakeMg2'],
    [{ era: 'mgs2', mainCharacter: 'unknown', environment: 'facility', visualPackId: 'mgs2_tanker' }, 'playerTanker'],
    [{ era: 'mgsv', mainCharacter: 'unknown', environment: 'facility', visualPackId: 'mgsv_ground_zeroes' }, 'playerBigBossGroundZeroes'],
    [{ era: 'mgsv', mainCharacter: 'unknown', environment: 'facility', visualPackId: 'mgsv_phantom_pain' }, 'playerVenomSnakeMgsv']
  ] as const)('uses the visual pack default player for %s', (input, expected) => {
    expect(resolveSideOpsCharacterTextures(input).playerTexture).toBe(expected);
  });

  it('normalizes display names and Codec context identifiers consistently', () => {
    expect(normalizeSideOpsCharacterAlias('Naked Snake')).toBe('naked_snake');
    expect(normalizeSideOpsCharacterAlias('  big-boss_gz ')).toBe('big_boss_gz');
  });

  it.each([
    ['msx', 'solid_snake_msx', 'playerSolidSnakeMg1'],
    ['msx', 'solid_snake_mg2', 'playerSolidSnakeMg2'],
    ['mgs2', 'raiden_mgs2', 'playerRaidenMgs2'],
    ['mgs3', 'naked_snake', 'playerNakedSnakeMgs3'],
    ['mgs3', 'naked_snake_mgs3', 'playerNakedSnakeMgs3'],
    ['mgs4', 'old_snake', 'playerOldSnakeMgs4'],
    ['mgs4', 'old_snake_mgs4', 'playerOldSnakeMgs4'],
    ['peace_walker', 'big_boss_pw', 'playerBigBossPeaceWalker'],
    ['mgsv', 'big_boss_gz', 'playerBigBossGroundZeroes'],
    ['mgsv', 'venom_snake', 'playerVenomSnakeMgsv'],
    ['mgsv', 'venom_snake_mgsv', 'playerVenomSnakeMgsv'],
    ['patriots_ai', 'raiden_corrupted', 'playerRaidenMgs2']
  ] as const)('maps %s Codec alias %s to %s', (era, mainCharacter, expected) => {
    expect(resolveSideOpsCharacterTextures({ era, mainCharacter, environment: 'facility' }).playerTexture).toBe(expected);
  });

  it('keeps the existing MGS1 and Tanker Snake textures', () => {
    expect(resolveSideOpsCharacterTextures({ era: 'mgs1', mainCharacter: 'solid_snake_mgs1', environment: 'dock' }).playerTexture).toBe('player');
    expect(resolveSideOpsCharacterTextures({ era: 'mgs2', mainCharacter: 'solid_snake_mgs2', environment: 'tanker' }).playerTexture).toBe('playerTanker');
  });

  it.each(['dock', 'jungle', 'facility'] as const)('routes MSX Builder hostiles to the Outer Heaven pack in %s', (environment) => {
    expect(resolveSideOpsCharacterTextures({ era: 'msx', mainCharacter: 'solid_snake_msx', environment })).toEqual({
      playerTexture: 'playerSolidSnakeMg1',
      guardTexture: 'mg1Guard',
      reinforcementTexture: 'mg1Guard',
      bossTexture: 'mg1Shotmaker'
    });
  });

  it('routes MG2 Builder roles to Zanzibar Land soldiers and Metal Gear D', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'msx',
      mainCharacter: 'solid_snake_mg2',
      environment: 'facility',
      location: 'Zanzibar Land',
      visualPackId: 'mg2'
    })).toEqual({
      playerTexture: 'playerSolidSnakeMg2',
      guardTexture: 'mg2ZanzibarSoldier',
      reinforcementTexture: 'mg2ZanzibarEliteReinforcement',
      bossTexture: 'mg2MetalGearD'
    });
  });

  it.each(['dock', 'facility'] as const)('routes MGS1 Builder hostiles to the Shadow Moses pack in %s', (environment) => {
    expect(resolveSideOpsCharacterTextures({ era: 'mgs1', mainCharacter: 'solid_snake_mgs1', environment })).toEqual({
      playerTexture: 'player',
      guardTexture: 'mgs1GenomeLightInfantry',
      reinforcementTexture: 'mgs1GenomeArcticTrooper',
      bossTexture: 'mgs1RevolverOcelot'
    });
  });

  it('routes MGS4 Builder roles to the dedicated PMC and Gekko pack', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'mgs4',
      mainCharacter: 'old_snake',
      environment: 'facility',
      visualPackId: 'mgs4'
    })).toEqual({
      playerTexture: 'playerOldSnakeMgs4',
      guardTexture: 'mgs4PmcSoldier',
      reinforcementTexture: 'mgs4PmcHeavyReinforcement',
      bossTexture: 'mgs4Gekko'
    });
  });

  it('routes MGS2 Plant Builder roles to Gurlukovich, Tengu and RAY assets', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'mgs2',
      mainCharacter: 'raiden_mgs2',
      environment: 'facility',
      location: 'Big Shell',
      visualPackId: 'mgs2_plant'
    })).toEqual({
      playerTexture: 'playerRaidenMgs2',
      guardTexture: 'mgs2PlantGurlukovichGuard',
      reinforcementTexture: 'mgs2PlantTenguReinforcement',
      bossTexture: 'mgs2PlantMetalGearRay'
    });
  });

  it('routes MGS3 Builder roles to the 1964 GRU, Ocelot Unit and Shagohod pack', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'mgs3',
      mainCharacter: 'naked_snake_mgs3',
      environment: 'jungle',
      location: 'Groznyj Grad',
      visualPackId: 'mgs3'
    })).toEqual({
      playerTexture: 'playerNakedSnakeMgs3',
      guardTexture: 'mgs3OcelotUnitSoldier',
      reinforcementTexture: 'mgs3GruHeavyReinforcement',
      bossTexture: 'mgs3Shagohod'
    });
  });

  it('routes The Phantom Pain roles to Soviet forces, a Skull and Sahelanthropus', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'mgsv',
      mainCharacter: 'venom_snake',
      environment: 'jungle',
      location: 'Afghanistan',
      visualPackId: 'mgsv_phantom_pain'
    })).toEqual({
      playerTexture: 'playerVenomSnakeMgsv',
      guardTexture: 'mgsvTppSovietAfghanistanSoldier',
      reinforcementTexture: 'mgsvTppSkullHeavyReinforcement',
      bossTexture: 'mgsvTppSahelanthropus'
    });
  });

  it('routes Ground Zeroes roles to XOF forces and the Camp Omega STOUT', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'mgsv',
      mainCharacter: 'big_boss_gz',
      environment: 'facility',
      location: 'Camp Omega',
      visualPackId: 'mgsv_ground_zeroes'
    })).toEqual({
      playerTexture: 'playerBigBossGroundZeroes',
      guardTexture: 'mgsvGzXofGuard',
      reinforcementTexture: 'mgsvGzXofHeavyReinforcement',
      bossTexture: 'mgsvGzStoutIfvSc'
    });
  });

  it('routes Peace Walker roles to Peace Sentinels and PUPA', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'peace_walker',
      mainCharacter: 'big_boss_pw',
      environment: 'jungle',
      location: 'Costa Rica',
      visualPackId: 'peace_walker'
    })).toEqual({
      playerTexture: 'playerBigBossPeaceWalker',
      guardTexture: 'peaceWalkerPeaceSentinelSoldier',
      reinforcementTexture: 'peaceWalkerPeaceSentinelHeavyReinforcement',
      bossTexture: 'peaceWalkerPupa'
    });
  });

  it('routes the Patriots AI simulation to corrupted Arsenal and GW assets', () => {
    expect(resolveSideOpsCharacterTextures({
      era: 'patriots_ai',
      mainCharacter: 'raiden_corrupted',
      environment: 'facility',
      location: 'Arsenal Gear',
      visualPackId: 'patriots_ai'
    })).toEqual({
      playerTexture: 'playerRaidenMgs2',
      guardTexture: 'patriotsAiCorruptedArsenalGuard',
      reinforcementTexture: 'patriotsAiCorruptedTenguReinforcement',
      bossTexture: 'patriotsAiGwColonelAiCore'
    });
  });

  it('keeps the Tanker pack ahead of the generic MSX route', () => {
    expect(resolveSideOpsCharacterTextures({ era: 'msx', mainCharacter: 'solid_snake_msx', environment: 'tanker' })).toEqual({
      playerTexture: 'playerSolidSnakeMg1',
      guardTexture: 'mgs2TankerGurlukovichGuard',
      reinforcementTexture: 'mgs2TankerGurlukovichHeavyReinforcement',
      bossTexture: 'mgs2TankerOlgaGurlukovich'
    });
  });

  it('uses era and environment defaults when the character alias is unknown', () => {
    expect(resolveSideOpsCharacterTextures({ era: 'mgs2', mainCharacter: 'unknown', environment: 'tanker' }).playerTexture).toBe('playerTanker');
    expect(resolveSideOpsCharacterTextures({ era: 'mgs2', mainCharacter: 'unknown', environment: 'facility' }).playerTexture).toBe('playerRaidenMgs2');
    expect(resolveSideOpsCharacterTextures({ era: 'mgs1', mainCharacter: 'unknown', environment: 'jungle' }).playerTexture).toBe('player');
  });

  it('routes every VR Builder role to the playable VR textures, never the target drone', () => {
    expect(resolveSideOpsCharacterTextures({ era: 'mgs3', mainCharacter: 'naked_snake', environment: 'vr' })).toEqual({
      playerTexture: 'vrPlayer',
      guardTexture: 'vrGuard',
      reinforcementTexture: 'vrGuard',
      bossTexture: 'vrBoss'
    });
  });
});
