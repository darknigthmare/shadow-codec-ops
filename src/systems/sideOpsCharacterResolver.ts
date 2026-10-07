import type { EraId } from '../types/codec.types';
import type { BuilderEnvironment, SideOpsVisualPackId } from '../types/missionBuilder.types';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from '../game/core/sideOpsVisualPackRuntime';

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
  location?: string | null;
  visualPackId?: SideOpsVisualPackId | string | null;
}

export const SIDEOPS_VISUAL_PACK_IDS = [
  'mg1',
  'mg2',
  'mgs1',
  'mgs2_tanker',
  'mgs2_plant',
  'mgs3',
  'mgs4',
  'peace_walker',
  'mgsv_ground_zeroes',
  'mgsv_phantom_pain',
  'vr_simulation',
  'patriots_ai'
] as const satisfies readonly SideOpsVisualPackId[];

const VISUAL_PACK_ERAS: Record<SideOpsVisualPackId, readonly EraId[]> = {
  mg1: ['msx'],
  mg2: ['msx'],
  mgs1: ['mgs1'],
  mgs2_tanker: ['mgs2'],
  mgs2_plant: ['mgs2'],
  mgs3: ['mgs3'],
  mgs4: ['mgs4'],
  peace_walker: ['peace_walker'],
  mgsv_ground_zeroes: ['mgsv'],
  mgsv_phantom_pain: ['mgsv'],
  vr_simulation: ['vr_simulation'],
  patriots_ai: ['patriots_ai']
};

export function isSideOpsVisualPackId(value: unknown): value is SideOpsVisualPackId {
  return typeof value === 'string' && SIDEOPS_VISUAL_PACK_IDS.some((packId) => packId === value);
}

/** Visual packs that can be authored explicitly for a Mission Builder era. */
export function getCompatibleSideOpsVisualPackIds(era: EraId): readonly SideOpsVisualPackId[] {
  return SIDEOPS_VISUAL_PACK_IDS.filter((packId) => VISUAL_PACK_ERAS[packId].some((candidate) => candidate === era));
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

const DEFAULT_PLAYER_BY_VISUAL_PACK: Record<SideOpsVisualPackId, string> = {
  mg1: 'playerSolidSnakeMg1',
  mg2: 'playerSolidSnakeMg2',
  mgs1: 'player',
  mgs2_tanker: 'playerTanker',
  mgs2_plant: 'playerRaidenMgs2',
  mgs3: 'playerNakedSnakeMgs3',
  mgs4: 'playerOldSnakeMgs4',
  peace_walker: 'playerBigBossPeaceWalker',
  mgsv_ground_zeroes: 'playerBigBossGroundZeroes',
  mgsv_phantom_pain: 'playerVenomSnakeMgsv',
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

export function resolveSideOpsVisualPackId(input: SideOpsCharacterResolutionInput): SideOpsVisualPackId {
  if (
    isSideOpsVisualPackId(input.visualPackId)
    && (
      VISUAL_PACK_ERAS[input.visualPackId].some((era) => era === input.era)
      || (input.visualPackId === 'vr_simulation' && input.environment === 'vr')
      || (input.visualPackId === 'mgs2_tanker' && input.environment === 'tanker')
    )
  ) {
    return input.visualPackId;
  }

  if (input.environment === 'vr' || input.era === 'vr_simulation') return 'vr_simulation';
  if (input.environment === 'tanker') return 'mgs2_tanker';

  const character = normalizeSideOpsCharacterAlias(input.mainCharacter);
  const location = normalizeSideOpsCharacterAlias(input.location);

  switch (input.era) {
    case 'msx':
      return character.includes('mg2') || character.includes('zanzibar') || location.includes('zanzibar')
        ? 'mg2'
        : 'mg1';
    case 'mgs1':
      return 'mgs1';
    case 'mgs2':
      return location.includes('tanker')
        || character.includes('solid_snake')
        || character.includes('pliskin')
        ? 'mgs2_tanker'
        : 'mgs2_plant';
    case 'mgs3':
      return 'mgs3';
    case 'mgs4':
      return 'mgs4';
    case 'peace_walker':
      return 'peace_walker';
    case 'mgsv':
      return character.includes('big_boss_gz')
        || character.includes('ground_zeroes')
        || location.includes('ground_zeroes')
        || location.includes('camp_omega')
        ? 'mgsv_ground_zeroes'
        : 'mgsv_phantom_pain';
    case 'patriots_ai':
      return 'patriots_ai';
    default:
      return 'vr_simulation';
  }
}

function resolvePlayerTexture(input: SideOpsCharacterResolutionInput, visualPackId: SideOpsVisualPackId): string {
  if (visualPackId === 'vr_simulation') return 'vrPlayer';

  const alias = normalizeSideOpsCharacterAlias(input.mainCharacter);
  const legacyTexture = LEGACY_PLAYER_ALIASES[input.era]?.[alias];
  if (legacyTexture) return legacyTexture;

  const operative = SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.find(
    (entry) => entry.eras.some((era) => era === input.era) && entry.aliases.some((candidate) => normalizeSideOpsCharacterAlias(candidate) === alias)
  );
  if (operative) return operative.textureKey;

  return DEFAULT_PLAYER_BY_VISUAL_PACK[visualPackId];
}

/**
 * Resolves the four character roles used by SideOpsScene. Player identity is
 * era-aware. Every hostile role comes from the exhaustive visual-pack runtime
 * matrix, so SideOps never falls back to the retired generic actor aliases.
 */
export function resolveSideOpsCharacterTextures(input: SideOpsCharacterResolutionInput): SideOpsCharacterTextureSet {
  const visualPackId = resolveSideOpsVisualPackId(input);
  const runtimeTextures = SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[visualPackId];

  return {
    playerTexture: resolvePlayerTexture(input, visualPackId),
    guardTexture: runtimeTextures.guardTexture,
    reinforcementTexture: runtimeTextures.reinforcementTexture,
    bossTexture: runtimeTextures.bossTexture
  };
}
