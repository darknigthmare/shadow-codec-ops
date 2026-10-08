export type MgsvGroundZeroesSideOpsAssetCategory =
  | 'enemy'
  | 'boss'
  | 'projectile'
  | 'vfx'
  | 'prop';

export type MgsvGroundZeroesSideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface MgsvGroundZeroesSideOpsAssetBase {
  id: string;
  category: MgsvGroundZeroesSideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: MgsvGroundZeroesSideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface MgsvGroundZeroesSideOpsImageAsset
  extends MgsvGroundZeroesSideOpsAssetBase {
  loader: 'image';
}

export interface MgsvGroundZeroesSideOpsSpriteSheetAsset
  extends MgsvGroundZeroesSideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type MgsvGroundZeroesSideOpsAsset =
  | MgsvGroundZeroesSideOpsImageAsset
  | MgsvGroundZeroesSideOpsSpriteSheetAsset;

/**
 * Both hostiles use XOF's gray 1975 flight-suit language. The heavy keeps a
 * wider silhouette through extra TP-1E-style armor and a belt-fed weapon.
 */
export const MGSV_GROUND_ZEROES_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mgsv_gz_xof_guard',
    category: 'enemy',
    textureKey: 'mgsvGzXofGuard',
    path: '/sideops/mgsv_ground_zeroes/enemies/xof-guard.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x58616a,
    fallbackAccentColor: 0xb5b8ac
  },
  {
    id: 'mgsv_gz_xof_heavy_reinforcement',
    category: 'enemy',
    textureKey: 'mgsvGzXofHeavyReinforcement',
    path: '/sideops/mgsv_ground_zeroes/enemies/xof-heavy-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x41494e,
    fallbackAccentColor: 0x8d7659
  }
] as const satisfies readonly MgsvGroundZeroesSideOpsImageAsset[];

/**
 * The eight-wheel STOUT IFV-SC is a physical Camp Omega boss encounter in
 * Ground Zeroes Side Ops and reads clearly from a lateral gameplay camera.
 */
export const MGSV_GROUND_ZEROES_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mgsv_gz_stout_ifv_sc',
    category: 'boss',
    textureKey: 'mgsvGzStoutIfvSc',
    path: '/sideops/mgsv_ground_zeroes/bosses/stout-ifv-sc.png',
    width: 144,
    height: 72,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x899394,
    fallbackAccentColor: 0x614d3a
  }
] as const satisfies readonly MgsvGroundZeroesSideOpsImageAsset[];

export const MGSV_GROUND_ZEROES_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mgsv_gz_xof_rifle_tracer',
    category: 'projectile',
    textureKey: 'mgsvGzXofRifleTracer',
    path: '/sideops/mgsv_ground_zeroes/projectiles/xof-rifle-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xf0a347,
    fallbackAccentColor: 0xffe3a1
  }
] as const satisfies readonly MgsvGroundZeroesSideOpsImageAsset[];

export const MGSV_GROUND_ZEROES_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mgsv_gz_wet_metal_impact_vfx',
    category: 'vfx',
    textureKey: 'mgsvGzWetMetalImpactVfx',
    path: '/sideops/mgsv_ground_zeroes/vfx/wet-metal-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xe8a14b,
    fallbackAccentColor: 0xa9c8ce
  }
] as const satisfies readonly MgsvGroundZeroesSideOpsSpriteSheetAsset[];

/** A floodlit perimeter watchtower anchors the Camp Omega black-site scene. */
export const MGSV_GROUND_ZEROES_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mgsv_gz_camp_omega_watchtower',
    category: 'prop',
    textureKey: 'mgsvGzCampOmegaWatchtower',
    path: '/sideops/mgsv_ground_zeroes/props/camp-omega-watchtower.png',
    width: 56,
    height: 64,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x4b5555,
    fallbackAccentColor: 0xd9c17c
  }
] as const satisfies readonly MgsvGroundZeroesSideOpsImageAsset[];

export const MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS = [
  ...MGSV_GROUND_ZEROES_SIDEOPS_ENEMY_ASSETS,
  ...MGSV_GROUND_ZEROES_SIDEOPS_BOSS_ASSETS,
  ...MGSV_GROUND_ZEROES_SIDEOPS_PROJECTILE_ASSETS,
  ...MGSV_GROUND_ZEROES_SIDEOPS_VFX_ASSETS,
  ...MGSV_GROUND_ZEROES_SIDEOPS_PROP_ASSETS
] as const satisfies readonly MgsvGroundZeroesSideOpsAsset[];

/**
 * Stable physical contract for future shared preload/resolver wiring. Ground
 * Zeroes Big Boss already belongs to the common playable-operative registry.
 */
export const MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerBigBossGroundZeroes',
  guardTexture: 'mgsvGzXofGuard',
  reinforcementTexture: 'mgsvGzXofHeavyReinforcement',
  bossTexture: 'mgsvGzStoutIfvSc',
  enemyProjectileTexture: 'mgsvGzXofRifleTracer',
  impactVfxTexture: 'mgsvGzWetMetalImpactVfx',
  battlefieldPropTexture: 'mgsvGzCampOmegaWatchtower'
} as const;

export const MGSV_GROUND_ZEROES_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
