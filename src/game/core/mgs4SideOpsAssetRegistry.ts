export type Mgs4SideOpsAssetCategory = 'enemy' | 'boss' | 'projectile' | 'vfx' | 'prop';

export type Mgs4SideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mgs4SideOpsAssetBase {
  id: string;
  category: Mgs4SideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mgs4SideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mgs4SideOpsImageAsset extends Mgs4SideOpsAssetBase {
  loader: 'image';
}

export interface Mgs4SideOpsSpriteSheetAsset extends Mgs4SideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mgs4SideOpsAsset = Mgs4SideOpsImageAsset | Mgs4SideOpsSpriteSheetAsset;

/**
 * The two PMC silhouettes deliberately share the olive/tan MGS4 equipment
 * language while keeping different weapons and masses readable at runtime.
 */
export const MGS4_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'mgs4_pmc_soldier',
    category: 'enemy',
    textureKey: 'mgs4PmcSoldier',
    path: '/sideops/mgs4/enemies/pmc-soldier.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x5f6749,
    fallbackAccentColor: 0xc0a267
  },
  {
    id: 'mgs4_pmc_heavy_reinforcement',
    category: 'enemy',
    textureKey: 'mgs4PmcHeavyReinforcement',
    path: '/sideops/mgs4/enemies/pmc-heavy-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x4e5842,
    fallbackAccentColor: 0xc7a56d
  }
] as const satisfies readonly Mgs4SideOpsImageAsset[];

/** MGS4's biomechanical unmanned biped is the visual pack's heavy encounter. */
export const MGS4_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'mgs4_gekko',
    category: 'boss',
    textureKey: 'mgs4Gekko',
    path: '/sideops/mgs4/bosses/gekko.png',
    width: 112,
    height: 96,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x414641,
    fallbackAccentColor: 0xb5a17c
  }
] as const satisfies readonly Mgs4SideOpsImageAsset[];

export const MGS4_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'mgs4_pmc_tracer',
    category: 'projectile',
    textureKey: 'mgs4PmcTracer',
    path: '/sideops/mgs4/projectiles/pmc-tracer.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0xe9b64a,
    fallbackAccentColor: 0xfff0a0
  }
] as const satisfies readonly Mgs4SideOpsImageAsset[];

export const MGS4_SIDEOPS_VFX_ASSETS = [
  {
    id: 'mgs4_metal_impact_vfx',
    category: 'vfx',
    textureKey: 'mgs4MetalImpactVfx',
    path: '/sideops/mgs4/vfx/metal-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0xf4b34e,
    fallbackAccentColor: 0xffffff
  }
] as const satisfies readonly Mgs4SideOpsSpriteSheetAsset[];

/** The Drum Can is an MGS4-specific battlefield camouflage prop. */
export const MGS4_SIDEOPS_PROP_ASSETS = [
  {
    id: 'mgs4_drum_can',
    category: 'prop',
    textureKey: 'mgs4DrumCan',
    path: '/sideops/mgs4/props/drum-can.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x353a35,
    fallbackAccentColor: 0x77745c
  }
] as const satisfies readonly Mgs4SideOpsImageAsset[];

export const MGS4_SIDEOPS_ALL_ASSETS = [
  ...MGS4_SIDEOPS_ENEMY_ASSETS,
  ...MGS4_SIDEOPS_BOSS_ASSETS,
  ...MGS4_SIDEOPS_PROJECTILE_ASSETS,
  ...MGS4_SIDEOPS_VFX_ASSETS,
  ...MGS4_SIDEOPS_PROP_ASSETS
] as const satisfies readonly Mgs4SideOpsAsset[];

/**
 * Stable resolver contract for a generic MGS4 Side Ops profile. Old Snake is
 * provided by SIDEOPS_PLAYABLE_OPERATIVE_ASSETS and the remaining keys live
 * in this registry.
 */
export const MGS4_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerOldSnakeMgs4',
  guardTexture: 'mgs4PmcSoldier',
  reinforcementTexture: 'mgs4PmcHeavyReinforcement',
  bossTexture: 'mgs4Gekko',
  enemyProjectileTexture: 'mgs4PmcTracer',
  impactVfxTexture: 'mgs4MetalImpactVfx',
  battlefieldPropTexture: 'mgs4DrumCan'
} as const;

export const MGS4_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: MGS4_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: MGS4_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: MGS4_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
