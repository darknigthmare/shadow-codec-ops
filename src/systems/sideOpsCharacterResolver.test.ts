import { describe, expect, it } from 'vitest';
import {
  SIDEOPS_PLAYABLE_OPERATIVE_ASSETS,
  normalizeSideOpsCharacterAlias,
  resolveSideOpsCharacterTextures
} from './sideOpsCharacterResolver';

describe('Side Ops playable operative resolver', () => {
  it('registers the eight explicit Pack 02 assets with unique keys and paths', () => {
    expect(SIDEOPS_PLAYABLE_OPERATIVE_ASSETS).toHaveLength(8);
    expect(new Set(SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.map((asset) => asset.textureKey)).size).toBe(8);
    expect(new Set(SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.map((asset) => asset.path)).size).toBe(8);
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
