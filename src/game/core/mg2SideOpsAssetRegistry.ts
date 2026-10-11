export type Mg2SideOpsAssetCategory = 'enemy' | 'boss' | 'projectile' | 'vfx' | 'prop';

export type Mg2SideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mg2SideOpsAssetBase {
  id: string;
  category: Mg2SideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mg2SideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mg2SideOpsImageAsset extends Mg2SideOpsAssetBase {
  loader: 'image';
}

export interface Mg2SideOpsSpriteSheetAsset extends Mg2SideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mg2SideOpsAsset = Mg2SideOpsImageAsset | Mg2SideOpsSpriteSheetAsset;

/**
 * Zanzibar Land's regular brown-uniform guard and olive elite keep the MSX2
 * palette while remaining immediately distinguishable at Side Ops scale.
 */
export const MG2_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mg2_zanzibar_soldier',
    category: 'enemy',
    textureKey: 'mg2ZanzibarSoldier',
    path: '/sideops/mg2/enemies/zanzibar-soldier.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x786747,
    fallbackAccentColor: 0x9b3f2f
  },
  {
    id: 'mg2_zanzibar_elite_reinforcement',
    category: 'enemy',
    textureKey: 'mg2ZanzibarEliteReinforcement',
    path: '/sideops/mg2/enemies/zanzibar-elite-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x4f5835,
    fallbackAccentColor: 0x202821
  }
] as const satisfies readonly Mg2SideOpsImageAsset[];

/** Metal Gear D is the pack's canonical Zanzibar Land heavy encounter. */
export const MG2_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mg2_metal_gear_d',
    category: 'boss',
    textureKey: 'mg2MetalGearD',
    path: '/sideops/mg2/bosses/metal-gear-d.png',
    width: 112,
    height: 112,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x62643d,
    fallbackAccentColor: 0xc04324
  }
] as const satisfies readonly Mg2SideOpsImageAsset[];

export const MG2_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mg2_enemy_tracer',
    category: 'projectile',
    textureKey: 'mg2EnemyTracer',
    path: '/sideops/mg2/projectiles/enemy-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xf5a623,
    fallbackAccentColor: 0xfff2a3
  }
] as const satisfies readonly Mg2SideOpsImageAsset[];

export const MG2_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mg2_metal_impact_vfx',
    category: 'vfx',
    textureKey: 'mg2MetalImpactVfx',
    path: '/sideops/mg2/vfx/metal-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xf2a52f,
    fallbackAccentColor: 0xffffff
  }
] as const satisfies readonly Mg2SideOpsSpriteSheetAsset[];

/** OILIX is MG2's story-critical biological resource and lab landmark. */
export const MG2_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mg2_oilix_culture_tank',
    category: 'prop',
    textureKey: 'mg2OilixCultureTank',
    path: '/sideops/mg2/props/oilix-culture-tank.png',
    width: 40,
    height: 48,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x3c4432,
    fallbackAccentColor: 0x60b52b
  }
] as const satisfies readonly Mg2SideOpsImageAsset[];

export const MG2_SIDEOPS_ALL_ASSETS = [
  ...MG2_SIDEOPS_ENEMY_ASSETS,
  ...MG2_SIDEOPS_BOSS_ASSETS,
  ...MG2_SIDEOPS_PROJECTILE_ASSETS,
  ...MG2_SIDEOPS_VFX_ASSETS,
  ...MG2_SIDEOPS_PROP_ASSETS
] as const satisfies readonly Mg2SideOpsAsset[];

/**
 * Stable contract for wiring the MG2 visual pack after the shared Side Ops
 * preload and resolver are available. Solid Snake already lives in the common
 * playable-operative registry; every other key is owned by this module.
 */
export const MG2_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerSolidSnakeMg2',
  guardTexture: 'mg2ZanzibarSoldier',
  reinforcementTexture: 'mg2ZanzibarEliteReinforcement',
  bossTexture: 'mg2MetalGearD',
  enemyProjectileTexture: 'mg2EnemyTracer',
  impactVfxTexture: 'mg2MetalImpactVfx',
  battlefieldPropTexture: 'mg2OilixCultureTank'
} as const;

export const MG2_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MG2_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MG2_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MG2_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
