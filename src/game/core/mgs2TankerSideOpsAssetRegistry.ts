export type Mgs2TankerSideOpsAssetCategory =
  | 'enemy'
  | 'boss'
  | 'projectile'
  | 'vfx'
  | 'prop';

export type Mgs2TankerSideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mgs2TankerSideOpsAssetBase {
  id: string;
  category: Mgs2TankerSideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mgs2TankerSideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mgs2TankerSideOpsImageAsset extends Mgs2TankerSideOpsAssetBase {
  loader: 'image';
}

export interface Mgs2TankerSideOpsSpriteSheetAsset
  extends Mgs2TankerSideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mgs2TankerSideOpsAsset =
  | Mgs2TankerSideOpsImageAsset
  | Mgs2TankerSideOpsSpriteSheetAsset;

/**
 * Both masked Gurlukovich mercenaries retain the Tanker's olive equipment
 * language. The shield and reinforced pads distinguish the alert backup.
 */
export const MGS2_TANKER_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mgs2_tanker_gurlukovich_guard',
    category: 'enemy',
    textureKey: 'mgs2TankerGurlukovichGuard',
    path: '/sideops/mgs2_tanker/enemies/gurlukovich-guard.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x4b5039,
    fallbackAccentColor: 0x171a18
  },
  {
    id: 'mgs2_tanker_gurlukovich_heavy_reinforcement',
    category: 'enemy',
    textureKey: 'mgs2TankerGurlukovichHeavyReinforcement',
    path: '/sideops/mgs2_tanker/enemies/gurlukovich-heavy-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x3d4230,
    fallbackAccentColor: 0x756447
  }
] as const satisfies readonly Mgs2TankerSideOpsImageAsset[];

/** Olga's rainy deck duel supplies the Tanker pack's humanoid boss. */
export const MGS2_TANKER_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mgs2_tanker_olga_gurlukovich',
    category: 'boss',
    textureKey: 'mgs2TankerOlgaGurlukovich',
    path: '/sideops/mgs2_tanker/bosses/olga-gurlukovich.png',
    width: 48,
    height: 64,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x56513a,
    fallbackAccentColor: 0xd3c2a4
  }
] as const satisfies readonly Mgs2TankerSideOpsImageAsset[];

export const MGS2_TANKER_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mgs2_tanker_aks74u_tracer',
    category: 'projectile',
    textureKey: 'mgs2TankerAks74uTracer',
    path: '/sideops/mgs2_tanker/projectiles/aks74u-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xe4a24b,
    fallbackAccentColor: 0xfff0ba
  }
] as const satisfies readonly Mgs2TankerSideOpsImageAsset[];

export const MGS2_TANKER_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mgs2_tanker_rain_metal_impact_vfx',
    category: 'vfx',
    textureKey: 'mgs2TankerRainMetalImpactVfx',
    path: '/sideops/mgs2_tanker/vfx/rain-metal-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xf0a04b,
    fallbackAccentColor: 0xb8cbd2
  }
] as const satisfies readonly Mgs2TankerSideOpsSpriteSheetAsset[];

/** Snake's digital camera is the key prop in the Tanker RAY photo objective. */
export const MGS2_TANKER_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mgs2_tanker_ray_camera',
    category: 'prop',
    textureKey: 'mgs2TankerRayCamera',
    path: '/sideops/mgs2_tanker/props/ray-camera.png',
    width: 48,
    height: 40,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x46494b,
    fallbackAccentColor: 0xb2b4af
  }
] as const satisfies readonly Mgs2TankerSideOpsImageAsset[];

export const MGS2_TANKER_SIDEOPS_ALL_ASSETS = [
  ...MGS2_TANKER_SIDEOPS_ENEMY_ASSETS,
  ...MGS2_TANKER_SIDEOPS_BOSS_ASSETS,
  ...MGS2_TANKER_SIDEOPS_PROJECTILE_ASSETS,
  ...MGS2_TANKER_SIDEOPS_VFX_ASSETS,
  ...MGS2_TANKER_SIDEOPS_PROP_ASSETS
] as const satisfies readonly Mgs2TankerSideOpsAsset[];

/**
 * Stable physical contract for future visualPackId=mgs2_tanker wiring.
 * Tanker Snake is already loaded under the established playerTanker key.
 */
export const MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerTanker',
  guardTexture: 'mgs2TankerGurlukovichGuard',
  reinforcementTexture: 'mgs2TankerGurlukovichHeavyReinforcement',
  bossTexture: 'mgs2TankerOlgaGurlukovich',
  enemyProjectileTexture: 'mgs2TankerAks74uTracer',
  impactVfxTexture: 'mgs2TankerRainMetalImpactVfx',
  battlefieldPropTexture: 'mgs2TankerRayCamera'
} as const;

export const MGS2_TANKER_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
