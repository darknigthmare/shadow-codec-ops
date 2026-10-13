export type MgsvPhantomPainSideOpsAssetCategory =
  | 'enemy'
  | 'boss'
  | 'projectile'
  | 'vfx'
  | 'prop';

export type MgsvPhantomPainSideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface MgsvPhantomPainSideOpsAssetBase {
  id: string;
  category: MgsvPhantomPainSideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: MgsvPhantomPainSideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface MgsvPhantomPainSideOpsImageAsset
  extends MgsvPhantomPainSideOpsAssetBase {
  loader: 'image';
}

export interface MgsvPhantomPainSideOpsSpriteSheetAsset
  extends MgsvPhantomPainSideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type MgsvPhantomPainSideOpsAsset =
  | MgsvPhantomPainSideOpsImageAsset
  | MgsvPhantomPainSideOpsSpriteSheetAsset;

/**
 * The regular Soviet conscript keeps the dusty Afghanka silhouette, while
 * the heavy Parasite Unit reinforcement is identified by its mineral armor.
 */
export const MGSV_PHANTOM_PAIN_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mgsv_tpp_soviet_afghanistan_soldier',
    category: 'enemy',
    textureKey: 'mgsvTppSovietAfghanistanSoldier',
    path: '/sideops/mgsv_phantom_pain/enemies/soviet-afghanistan-soldier.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x766a4a,
    fallbackAccentColor: 0xb19a6a
  },
  {
    id: 'mgsv_tpp_skull_heavy_reinforcement',
    category: 'enemy',
    textureKey: 'mgsvTppSkullHeavyReinforcement',
    path: '/sideops/mgsv_phantom_pain/enemies/skull-heavy-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x242628,
    fallbackAccentColor: 0x9e3431
  }
] as const satisfies readonly MgsvPhantomPainSideOpsImageAsset[];

/** The complete ST-84 silhouette is reserved for the pack's boss encounter. */
export const MGSV_PHANTOM_PAIN_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mgsv_tpp_sahelanthropus',
    category: 'boss',
    textureKey: 'mgsvTppSahelanthropus',
    path: '/sideops/mgsv_phantom_pain/bosses/sahelanthropus.png',
    width: 144,
    height: 144,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x2e3031,
    fallbackAccentColor: 0x8f302e
  }
] as const satisfies readonly MgsvPhantomPainSideOpsImageAsset[];

export const MGSV_PHANTOM_PAIN_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mgsv_tpp_soviet_tracer',
    category: 'projectile',
    textureKey: 'mgsvTppSovietTracer',
    path: '/sideops/mgsv_phantom_pain/projectiles/soviet-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xe99936,
    fallbackAccentColor: 0xffeb9c
  }
] as const satisfies readonly MgsvPhantomPainSideOpsImageAsset[];

export const MGSV_PHANTOM_PAIN_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mgsv_tpp_dust_impact_vfx',
    category: 'vfx',
    textureKey: 'mgsvTppDustImpactVfx',
    path: '/sideops/mgsv_phantom_pain/vfx/dust-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xc68a4f,
    fallbackAccentColor: 0xffd17c
  }
] as const satisfies readonly MgsvPhantomPainSideOpsSpriteSheetAsset[];

/** Fulton cargo links Afghanistan recoveries to Mother Base progression. */
export const MGSV_PHANTOM_PAIN_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mgsv_tpp_fulton_cargo',
    category: 'prop',
    textureKey: 'mgsvTppFultonCargo',
    path: '/sideops/mgsv_phantom_pain/props/fulton-cargo.png',
    width: 48,
    height: 64,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x5d5b42,
    fallbackAccentColor: 0xd7d0bb
  }
] as const satisfies readonly MgsvPhantomPainSideOpsImageAsset[];

export const MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS = [
  ...MGSV_PHANTOM_PAIN_SIDEOPS_ENEMY_ASSETS,
  ...MGSV_PHANTOM_PAIN_SIDEOPS_BOSS_ASSETS,
  ...MGSV_PHANTOM_PAIN_SIDEOPS_PROJECTILE_ASSETS,
  ...MGSV_PHANTOM_PAIN_SIDEOPS_VFX_ASSETS,
  ...MGSV_PHANTOM_PAIN_SIDEOPS_PROP_ASSETS
] as const satisfies readonly MgsvPhantomPainSideOpsAsset[];

/**
 * Stable physical contract for future visualPackId=mgsv_phantom_pain wiring.
 * Venom Snake already belongs to the common playable-operative registry.
 */
export const MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerVenomSnakeMgsv',
  guardTexture: 'mgsvTppSovietAfghanistanSoldier',
  reinforcementTexture: 'mgsvTppSkullHeavyReinforcement',
  bossTexture: 'mgsvTppSahelanthropus',
  enemyProjectileTexture: 'mgsvTppSovietTracer',
  impactVfxTexture: 'mgsvTppDustImpactVfx',
  battlefieldPropTexture: 'mgsvTppFultonCargo'
} as const;

export const MGSV_PHANTOM_PAIN_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
