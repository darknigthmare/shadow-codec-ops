export type Mgs2PlantSideOpsAssetCategory = 'enemy' | 'boss' | 'projectile' | 'vfx' | 'prop';

export type Mgs2PlantSideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mgs2PlantSideOpsAssetBase {
  id: string;
  category: Mgs2PlantSideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mgs2PlantSideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mgs2PlantSideOpsImageAsset extends Mgs2PlantSideOpsAssetBase {
  loader: 'image';
}

export interface Mgs2PlantSideOpsSpriteSheetAsset extends Mgs2PlantSideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mgs2PlantSideOpsAsset =
  | Mgs2PlantSideOpsImageAsset
  | Mgs2PlantSideOpsSpriteSheetAsset;

/**
 * The brown-gray Gurlukovich guard retains the Plant chapter's grounded PS2
 * military language while the black Tengu remains an unmistakable late-game
 * Arsenal Gear reinforcement.
 */
export const MGS2_PLANT_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mgs2_plant_gurlukovich_guard',
    category: 'enemy',
    textureKey: 'mgs2PlantGurlukovichGuard',
    path: '/sideops/mgs2_plant/enemies/gurlukovich-guard.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x716b60,
    fallbackAccentColor: 0x252724
  },
  {
    id: 'mgs2_plant_tengu_reinforcement',
    category: 'enemy',
    textureKey: 'mgs2PlantTenguReinforcement',
    path: '/sideops/mgs2_plant/enemies/tengu-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x273141,
    fallbackAccentColor: 0xe34820
  }
] as const satisfies readonly Mgs2PlantSideOpsImageAsset[];

/** The amphibious MGS2 mass-production RAY is the Plant pack's boss. */
export const MGS2_PLANT_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mgs2_plant_metal_gear_ray',
    category: 'boss',
    textureKey: 'mgs2PlantMetalGearRay',
    path: '/sideops/mgs2_plant/bosses/metal-gear-ray.png',
    width: 128,
    height: 112,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x789197,
    fallbackAccentColor: 0xd84b2e
  }
] as const satisfies readonly Mgs2PlantSideOpsImageAsset[];

export const MGS2_PLANT_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mgs2_plant_aks_tracer',
    category: 'projectile',
    textureKey: 'mgs2PlantAksTracer',
    path: '/sideops/mgs2_plant/projectiles/aks-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xf2a742,
    fallbackAccentColor: 0xfff1b0
  }
] as const satisfies readonly Mgs2PlantSideOpsImageAsset[];

export const MGS2_PLANT_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mgs2_plant_metal_impact_vfx',
    category: 'vfx',
    textureKey: 'mgs2PlantMetalImpactVfx',
    path: '/sideops/mgs2_plant/vfx/metal-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xee9e35,
    fallbackAccentColor: 0xc7e5e8
  }
] as const satisfies readonly Mgs2PlantSideOpsSpriteSheetAsset[];

/** Nodes unlock each Big Shell area's map in the official MGS2 Plant rules. */
export const MGS2_PLANT_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mgs2_plant_node_terminal',
    category: 'prop',
    textureKey: 'mgs2PlantNodeTerminal',
    path: '/sideops/mgs2_plant/props/node-terminal.png',
    width: 48,
    height: 48,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x96a29a,
    fallbackAccentColor: 0xe87620
  }
] as const satisfies readonly Mgs2PlantSideOpsImageAsset[];

export const MGS2_PLANT_SIDEOPS_ALL_ASSETS = [
  ...MGS2_PLANT_SIDEOPS_ENEMY_ASSETS,
  ...MGS2_PLANT_SIDEOPS_BOSS_ASSETS,
  ...MGS2_PLANT_SIDEOPS_PROJECTILE_ASSETS,
  ...MGS2_PLANT_SIDEOPS_VFX_ASSETS,
  ...MGS2_PLANT_SIDEOPS_PROP_ASSETS
] as const satisfies readonly Mgs2PlantSideOpsAsset[];

/**
 * Stable contract for wiring visualPackId=mgs2_plant once the shared preload
 * and resolver are updated. Raiden already belongs to the common operative
 * registry; this module owns every other texture key.
 */
export const MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerRaidenMgs2',
  guardTexture: 'mgs2PlantGurlukovichGuard',
  reinforcementTexture: 'mgs2PlantTenguReinforcement',
  bossTexture: 'mgs2PlantMetalGearRay',
  enemyProjectileTexture: 'mgs2PlantAksTracer',
  impactVfxTexture: 'mgs2PlantMetalImpactVfx',
  battlefieldPropTexture: 'mgs2PlantNodeTerminal'
} as const;

export const MGS2_PLANT_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
