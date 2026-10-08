export type PeaceWalkerSideOpsAssetCategory = 'enemy' | 'boss' | 'projectile' | 'vfx' | 'prop';

export type PeaceWalkerSideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface PeaceWalkerSideOpsAssetBase {
  id: string;
  category: PeaceWalkerSideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: PeaceWalkerSideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface PeaceWalkerSideOpsImageAsset extends PeaceWalkerSideOpsAssetBase {
  loader: 'image';
}

export interface PeaceWalkerSideOpsSpriteSheetAsset extends PeaceWalkerSideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type PeaceWalkerSideOpsAsset =
  | PeaceWalkerSideOpsImageAsset
  | PeaceWalkerSideOpsSpriteSheetAsset;

/**
 * Both Peace Sentinels silhouettes keep the muted 1974 field uniform while
 * the heavy's enclosed helmet, armored bib and machine gun remain readable.
 */
export const PEACE_WALKER_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'peace_walker_peace_sentinel_soldier',
    category: 'enemy',
    textureKey: 'peaceWalkerPeaceSentinelSoldier',
    path: '/sideops/peace_walker/enemies/peace-sentinel-soldier.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x4f5738,
    fallbackAccentColor: 0x202420
  },
  {
    id: 'peace_walker_peace_sentinel_heavy_reinforcement',
    category: 'enemy',
    textureKey: 'peaceWalkerPeaceSentinelHeavyReinforcement',
    path: '/sideops/peace_walker/enemies/peace-sentinel-heavy-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x5b604e,
    fallbackAccentColor: 0x1b1c1a
  }
] as const satisfies readonly PeaceWalkerSideOpsImageAsset[];

/** Distinct 1974 machines; Pupa remains the default supply-network encounter. */
export const PEACE_WALKER_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'peace_walker_pupa',
    category: 'boss',
    textureKey: 'peaceWalkerPupa',
    path: '/sideops/peace_walker/bosses/pupa.png',
    width: 128,
    height: 80,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x666c70,
    fallbackAccentColor: 0xd34a33
  },
  {
    id: 'peace_walker_chrysalis', category: 'boss', textureKey: 'peaceWalkerChrysalis',
    path: '/sideops/peace_walker/bosses/chrysalis.png', width: 176, height: 112,
    loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x788176, fallbackAccentColor: 0xd7b455
  },
  {
    id: 'peace_walker_cocoon', category: 'boss', textureKey: 'peaceWalkerCocoon',
    path: '/sideops/peace_walker/bosses/cocoon.png', width: 208, height: 144,
    loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x6b7568, fallbackAccentColor: 0xc5aa58
  },
  {
    id: 'peace_walker_basilisk', category: 'boss', textureKey: 'peaceWalkerBasilisk',
    path: '/sideops/peace_walker/bosses/peace-walker.png', width: 176, height: 128,
    loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x6e776b, fallbackAccentColor: 0xde8732
  },
  {
    id: 'peace_walker_zeke', category: 'boss', textureKey: 'peaceWalkerZeke',
    path: '/sideops/peace_walker/bosses/metal-gear-zeke.png', width: 128, height: 144,
    loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x959b91, fallbackAccentColor: 0xd8be41
  }
] as const satisfies readonly PeaceWalkerSideOpsImageAsset[];

export const PEACE_WALKER_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'peace_walker_peace_sentinel_tracer',
    category: 'projectile',
    textureKey: 'peaceWalkerPeaceSentinelTracer',
    path: '/sideops/peace_walker/projectiles/peace-sentinel-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xf5a11e,
    fallbackAccentColor: 0xfff1b0
  }
] as const satisfies readonly PeaceWalkerSideOpsImageAsset[];

export const PEACE_WALKER_SIDEOPS_VFX_ASSETS = [
  {
    id: 'peace_walker_metal_impact_vfx',
    category: 'vfx',
    textureKey: 'peaceWalkerMetalImpactVfx',
    path: '/sideops/peace_walker/vfx/metal-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xf2a327,
    fallbackAccentColor: 0x7bd7e7
  }
] as const satisfies readonly PeaceWalkerSideOpsSpriteSheetAsset[];

/** A period offshore life-ring station anchors the 1974 Mother Base setting. */
export const PEACE_WALKER_SIDEOPS_PROP_ASSETS = [
  {
    id: 'peace_walker_mother_base_life_ring',
    category: 'prop',
    textureKey: 'peaceWalkerMotherBaseLifeRing',
    path: '/sideops/peace_walker/props/mother-base-life-ring.png',
    width: 48,
    height: 48,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x778991,
    fallbackAccentColor: 0xd95029
  }
] as const satisfies readonly PeaceWalkerSideOpsImageAsset[];

export const PEACE_WALKER_SIDEOPS_ALL_ASSETS = [
  ...PEACE_WALKER_SIDEOPS_ENEMY_ASSETS,
  ...PEACE_WALKER_SIDEOPS_BOSS_ASSETS,
  ...PEACE_WALKER_SIDEOPS_PROJECTILE_ASSETS,
  ...PEACE_WALKER_SIDEOPS_VFX_ASSETS,
  ...PEACE_WALKER_SIDEOPS_PROP_ASSETS
] as const satisfies readonly PeaceWalkerSideOpsAsset[];

/**
 * Stable visualPackId=peace_walker contract for later shared preload/scene
 * wiring. Big Boss already belongs to the common playable-operative registry.
 */
export const PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerBigBossPeaceWalker',
  guardTexture: 'peaceWalkerPeaceSentinelSoldier',
  reinforcementTexture: 'peaceWalkerPeaceSentinelHeavyReinforcement',
  bossTexture: 'peaceWalkerPupa',
  enemyProjectileTexture: 'peaceWalkerPeaceSentinelTracer',
  impactVfxTexture: 'peaceWalkerMetalImpactVfx',
  battlefieldPropTexture: 'peaceWalkerMotherBaseLifeRing'
} as const;

export const PEACE_WALKER_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
