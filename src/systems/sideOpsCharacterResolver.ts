import type { EraId } from '../types/codec.types';
import type { BuilderEnvironment } from '../types/missionBuilder.types';
import { MG1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES } from '../game/core/mg1SideOpsAssetRegistry';

export interface SideOpsOperativeAsset {
  id: string;
  textureKey: string;
  path: string;
  eras: readonly EraId[];
  aliases: readonly string[];
  fallbackBodyColor: number;
  fallbackAccentColor: number;
}

export interface SideOpsCharacterTextureSet {
  playerTexture: string;
  guardTexture: string;
  reinforcementTexture: string;
  bossTexture: string;
}

export interface SideOpsCharacterResolutionInput {
  era: EraId;
  mainCharacter?: string | null;
  environment: BuilderEnvironment;
}

/**
 * Playable Operatives Pack 02. Texture keys are intentionally stable and are
 * shared by PreloadScene, the Mission Builder resolver and its tests.
 */
export const SIDEOPS_PLAYABLE_OPERATIVE_ASSETS = [
  {
    id: 'solid_snake_mg1',
    textureKey: 'playerSolidSnakeMg1',
    path: '/sideops/characters/solid-snake-mg1.png',
    eras: ['msx'],
    aliases: ['solid_snake_msx', 'solid_snake_mg1', 'solid_snake_outer_heaven', 'solid snake mg1'],
    fallbackBodyColor: 0x7b9a65,
    fallbackAccentColor: 0xd7dfbc
  },
  {
    id: 'solid_snake_mg2',
    textureKey: 'playerSolidSnakeMg2',
    path: '/sideops/characters/solid-snake-mg2.png',
    eras: ['msx'],
    aliases: ['solid_snake_mg2', 'solid_snake_zanzibar', 'solid snake mg2'],
    fallbackBodyColor: 0x6f8761,
    fallbackAccentColor: 0xd2c59c
  },
  {
    id: 'raiden_mgs2',
    textureKey: 'playerRaidenMgs2',
    path: '/sideops/characters/raiden-mgs2.png',
    eras: ['mgs2', 'patriots_ai'],
    aliases: ['raiden_mgs2', 'raiden_corrupted', 'raiden'],
    fallbackBodyColor: 0xb8c7d8,
    fallbackAccentColor: 0xe7edf4
  },
  {
    id: 'naked_snake_mgs3',
    textureKey: 'playerNakedSnakeMgs3',
    path: '/sideops/characters/naked-snake-mgs3.png',
    eras: ['mgs3'],
    aliases: ['naked_snake', 'naked_snake_mgs3', 'naked snake', 'big_boss_mgs3'],
    fallbackBodyColor: 0x6f7d4f,
    fallbackAccentColor: 0xc7b47c
  },
  {
    id: 'old_snake_mgs4',
    textureKey: 'playerOldSnakeMgs4',
    path: '/sideops/characters/old-snake-mgs4.png',
    eras: ['mgs4'],
    aliases: ['old_snake', 'old_snake_mgs4', 'old snake', 'solid_snake_mgs4'],
    fallbackBodyColor: 0x72777c,
    fallbackAccentColor: 0xc5c7c8
  },
  {
    id: 'big_boss_pw',
    textureKey: 'playerBigBossPeaceWalker',
    path: '/sideops/characters/big-boss-peace-walker.png',
    eras: ['peace_walker'],
    aliases: ['big_boss_pw', 'big_boss_peace_walker', 'big boss', 'snake_pw'],
    fallbackBodyColor: 0x718356,
    fallbackAccentColor: 0xd2c397
  },
  {
    id: 'big_boss_gz',
    textureKey: 'playerBigBossGroundZeroes',
    path: '/sideops/characters/big-boss-ground-zeroes.png',
    eras: ['mgsv'],
    aliases: ['big_boss_gz', 'big_boss_ground_zeroes', 'big boss', 'snake_ground_zeroes'],
    fallbackBodyColor: 0x3f4f46,
    fallbackAccentColor: 0xa6b39d
  },
  {
    id: 'venom_snake_mgsv',
    textureKey: 'playerVenomSnakeMgsv',
    path: '/sideops/characters/venom-snake-mgsv.png',
    eras: ['mgsv'],
    aliases: ['venom_snake', 'venom_snake_mgsv', 'venom snake', 'punished_snake'],
    fallbackBodyColor: 0x4f5c54,
    fallbackAccentColor: 0xb6a77e
  }
] as const satisfies readonly SideOpsOperativeAsset[];

const LEGACY_PLAYER_ALIASES: Partial<Record<EraId, Record<string, string>>> = {
  mgs1: {
    solid_snake: 'player',
    solid_snake_mgs1: 'player',
    snake: 'player'
  },
  mgs2: {
    solid_snake: 'playerTanker',
    solid_snake_mgs2: 'playerTanker',
    iroquois_pliskin: 'playerTanker',
    pliskin: 'playerTanker'
  },
  vr_simulation: {
    vr_operative: 'vrPlayer',
    vr_operator: 'vrPlayer'
  }
};

const DEFAULT_PLAYER_BY_ERA: Record<EraId, string> = {
  msx: 'playerSolidSnakeMg1',
  mgs1: 'player',
  mgs2: 'playerRaidenMgs2',
  mgs3: 'playerNakedSnakeMgs3',
  mgs4: 'playerOldSnakeMgs4',
  peace_walker: 'playerBigBossPeaceWalker',
  mgsv: 'playerVenomSnakeMgsv',
  vr_simulation: 'vrPlayer',
  patriots_ai: 'playerRaidenMgs2'
};

export function normalizeSideOpsCharacterAlias(value: string | null | undefined): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function resolvePlayerTexture(input: SideOpsCharacterResolutionInput): string {
  if (input.environment === 'vr' || input.era === 'vr_simulation') return 'vrPlayer';

  const alias = normalizeSideOpsCharacterAlias(input.mainCharacter);
  const legacyTexture = LEGACY_PLAYER_ALIASES[input.era]?.[alias];
  if (legacyTexture) return legacyTexture;

  const operative = SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.find(
    (entry) => entry.eras.some((era) => era === input.era) && entry.aliases.some((candidate) => normalizeSideOpsCharacterAlias(candidate) === alias)
  );
  if (operative) return operative.textureKey;

  if (input.era === 'mgs2' && input.environment === 'tanker') return 'playerTanker';
  return DEFAULT_PLAYER_BY_ERA[input.era] ?? 'player';
}

/**
 * Resolves the four character roles used by SideOpsScene. Player identity is
 * era-aware. Outer Heaven Builder missions use the MG1 hostile registry while
 * Tanker and VR environments keep their dedicated packs. VR deliberately uses
 * vrGuard for both hostile roles because Side Ops has no target-drone role.
 */
export function resolveSideOpsCharacterTextures(input: SideOpsCharacterResolutionInput): SideOpsCharacterTextureSet {
  if (input.environment === 'vr') {
    return {
      playerTexture: 'vrPlayer',
      guardTexture: 'vrGuard',
      reinforcementTexture: 'vrGuard',
      bossTexture: 'vrBoss'
    };
  }

  const tanker = input.environment === 'tanker';
  if (input.era === 'msx' && !tanker) {
    return {
      playerTexture: resolvePlayerTexture(input),
      ...MG1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES
    };
  }

  return {
    playerTexture: resolvePlayerTexture(input),
    guardTexture: tanker ? 'deckGuard' : 'guard',
    reinforcementTexture: tanker ? 'deckReinforcement' : 'reinforcementGuard',
    bossTexture: tanker ? 'bossDeckCommander' : 'bossCaptain'
  };
}
