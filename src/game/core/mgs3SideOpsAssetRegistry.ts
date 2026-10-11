export type Mgs3SideOpsAssetCategory = 'enemy' | 'boss' | 'projectile' | 'vfx' | 'prop';

export type Mgs3SideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mgs3SideOpsAssetBase {
  id: string;
  category: Mgs3SideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mgs3SideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mgs3SideOpsImageAsset extends Mgs3SideOpsAssetBase {
  loader: 'image';
}

export interface Mgs3SideOpsSpriteSheetAsset extends Mgs3SideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mgs3SideOpsAsset = Mgs3SideOpsImageAsset | Mgs3SideOpsSpriteSheetAsset;

/**
 * The red-beret Ocelot Unit silhouette and the quilted, gas-masked GRU
 * machine gunner remain distinct while sharing MGS3's 1964 Soviet palette.
 */
export const MGS3_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mgs3_ocelot_unit_soldier',
    category: 'enemy',
    textureKey: 'mgs3OcelotUnitSoldier',
    path: '/sideops/mgs3/enemies/ocelot-unit-soldier.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x4d513e,
    fallbackAccentColor: 0x9f3026
  },
  {
    id: 'mgs3_gru_heavy_reinforcement',
    category: 'enemy',
    textureKey: 'mgs3GruHeavyReinforcement',
    path: '/sideops/mgs3/enemies/gru-heavy-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x7d6c45,
    fallbackAccentColor: 0x24241f
  }
] as const satisfies readonly Mgs3SideOpsImageAsset[];

/** Sokolov's screw-propelled nuclear launch tank is MGS3's heavy encounter. */
export const MGS3_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mgs3_shagohod',
    category: 'boss',
    textureKey: 'mgs3Shagohod',
    path: '/sideops/mgs3/bosses/shagohod.png',
    width: 160,
    height: 96,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x555237,
    fallbackAccentColor: 0xa74a2b
  }
] as const satisfies readonly Mgs3SideOpsImageAsset[];

export const MGS3_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mgs3_gru_tracer',
    category: 'projectile',
    textureKey: 'mgs3GruTracer',
    path: '/sideops/mgs3/projectiles/gru-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xed8a2c,
    fallbackAccentColor: 0xffe8a0
  }
] as const satisfies readonly Mgs3SideOpsImageAsset[];

export const MGS3_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mgs3_fortress_impact_vfx',
    category: 'vfx',
    textureKey: 'mgs3FortressImpactVfx',
    path: '/sideops/mgs3/vfx/fortress-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xe49a35,
    fallbackAccentColor: 0xd8d0a5
  }
] as const satisfies readonly Mgs3SideOpsSpriteSheetAsset[];

/** The analog tripod searchlight anchors a Groznyj Grad perimeter scene. */
export const MGS3_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mgs3_groznyj_searchlight',
    category: 'prop',
    textureKey: 'mgs3GroznyjSearchlight',
    path: '/sideops/mgs3/props/groznyj-searchlight.png',
    width: 48,
    height: 56,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x6c704c,
    fallbackAccentColor: 0xe2b75e
  }
] as const satisfies readonly Mgs3SideOpsImageAsset[];

export const MGS3_SIDEOPS_ALL_ASSETS = [
  ...MGS3_SIDEOPS_ENEMY_ASSETS,
  ...MGS3_SIDEOPS_BOSS_ASSETS,
  ...MGS3_SIDEOPS_PROJECTILE_ASSETS,
  ...MGS3_SIDEOPS_VFX_ASSETS,
  ...MGS3_SIDEOPS_PROP_ASSETS
] as const satisfies readonly Mgs3SideOpsAsset[];

/**
 * Stable contract for wiring visualPackId=mgs3 after the shared preload and
 * resolver are updated. Naked Snake already belongs to the common playable
 * operative registry; every other texture key is owned here.
 */
export const MGS3_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerNakedSnakeMgs3',
  guardTexture: 'mgs3OcelotUnitSoldier',
  reinforcementTexture: 'mgs3GruHeavyReinforcement',
  bossTexture: 'mgs3Shagohod',
  enemyProjectileTexture: 'mgs3GruTracer',
  impactVfxTexture: 'mgs3FortressImpactVfx',
  battlefieldPropTexture: 'mgs3GroznyjSearchlight'
} as const;

export const MGS3_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MGS3_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MGS3_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MGS3_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
