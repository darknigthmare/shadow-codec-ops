export type PatriotsAiSideOpsAssetCategory =
  | 'enemy'
  | 'boss'
  | 'projectile'
  | 'vfx'
  | 'prop';

export type PatriotsAiSideOpsFallbackShape =
  | 'humanoid'
  | 'machine'
  | 'projectile'
  | 'effect';

interface PatriotsAiSideOpsAssetBase {
  id: string;
  category: PatriotsAiSideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: PatriotsAiSideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface PatriotsAiSideOpsImageAsset extends PatriotsAiSideOpsAssetBase {
  loader: 'image';
}

export interface PatriotsAiSideOpsSpriteSheetAsset extends PatriotsAiSideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type PatriotsAiSideOpsAsset =
  | PatriotsAiSideOpsImageAsset
  | PatriotsAiSideOpsSpriteSheetAsset;

/**
 * Both hostiles retain Arsenal Gear's 2009 Tengu equipment. Signal tearing
 * marks the failed GW simulation without turning them into later-era cyborgs.
 */
export const PATRIOTS_AI_SIDEOPS_ENEMY_ASSETS = [
  {
    id: 'patriots_ai_corrupted_arsenal_guard',
    category: 'enemy',
    textureKey: 'patriotsAiCorruptedArsenalGuard',
    path: '/sideops/patriots_ai/enemies/corrupted-arsenal-guard.png',
    width: 32,
    height: 48,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x253248,
    fallbackAccentColor: 0xb38a42
  },
  {
    id: 'patriots_ai_corrupted_tengu_reinforcement',
    category: 'enemy',
    textureKey: 'patriotsAiCorruptedTenguReinforcement',
    path: '/sideops/patriots_ai/enemies/corrupted-tengu-reinforcement.png',
    width: 40,
    height: 56,
    loader: 'image',
    fallbackShape: 'humanoid',
    fallbackPrimaryColor: 0x1d222c,
    fallbackAccentColor: 0x74d99b
  }
] as const satisfies readonly PatriotsAiSideOpsImageAsset[];

/**
 * GW's false Colonel portrait is bound to a physical Arsenal server core so
 * the information-control antagonist has a stable, readable boss silhouette.
 */
export const PATRIOTS_AI_SIDEOPS_BOSS_ASSETS = [
  {
    id: 'patriots_ai_gw_colonel_ai_core',
    category: 'boss',
    textureKey: 'patriotsAiGwColonelAiCore',
    path: '/sideops/patriots_ai/bosses/gw-colonel-ai-core.png',
    width: 128,
    height: 96,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x718a8d,
    fallbackAccentColor: 0x80b35d
  }
] as const satisfies readonly PatriotsAiSideOpsImageAsset[];

export const PATRIOTS_AI_SIDEOPS_PROJECTILE_ASSETS = [
  {
    id: 'patriots_ai_digital_pulse',
    category: 'projectile',
    textureKey: 'patriotsAiDigitalPulse',
    path: '/sideops/patriots_ai/projectiles/digital-pulse.png',
    width: 24,
    height: 8,
    loader: 'image',
    fallbackShape: 'projectile',
    fallbackPrimaryColor: 0x93efad,
    fallbackAccentColor: 0xf1f8dc
  }
] as const satisfies readonly PatriotsAiSideOpsImageAsset[];

export const PATRIOTS_AI_SIDEOPS_VFX_ASSETS = [
  {
    id: 'patriots_ai_glitch_impact_vfx',
    category: 'vfx',
    textureKey: 'patriotsAiGlitchImpactVfx',
    path: '/sideops/patriots_ai/vfx/glitch-impact.png',
    width: 96,
    height: 24,
    loader: 'spritesheet',
    frameWidth: 24,
    frameHeight: 24,
    frameCount: 4,
    fallbackShape: 'effect',
    fallbackPrimaryColor: 0x81e2a0,
    fallbackAccentColor: 0xcfd7ce
  }
] as const satisfies readonly PatriotsAiSideOpsSpriteSheetAsset[];

/** A corrupted GW terminal anchors the Arsenal Gear simulation space. */
export const PATRIOTS_AI_SIDEOPS_PROP_ASSETS = [
  {
    id: 'patriots_ai_gw_terminal',
    category: 'prop',
    textureKey: 'patriotsAiGwTerminal',
    path: '/sideops/patriots_ai/props/gw-terminal.png',
    width: 56,
    height: 56,
    loader: 'image',
    fallbackShape: 'machine',
    fallbackPrimaryColor: 0x667e80,
    fallbackAccentColor: 0x65d883
  }
] as const satisfies readonly PatriotsAiSideOpsImageAsset[];

export const PATRIOTS_AI_SIDEOPS_ALL_ASSETS = [
  ...PATRIOTS_AI_SIDEOPS_ENEMY_ASSETS,
  ...PATRIOTS_AI_SIDEOPS_BOSS_ASSETS,
  ...PATRIOTS_AI_SIDEOPS_PROJECTILE_ASSETS,
  ...PATRIOTS_AI_SIDEOPS_VFX_ASSETS,
  ...PATRIOTS_AI_SIDEOPS_PROP_ASSETS
] as const satisfies readonly PatriotsAiSideOpsAsset[];

/**
 * Stable physical contract for later shared preload/resolver wiring. The
 * simulation deliberately reuses MGS2 Raiden as its playable operative.
 */
export const PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'playerRaidenMgs2',
  guardTexture: 'patriotsAiCorruptedArsenalGuard',
  reinforcementTexture: 'patriotsAiCorruptedTenguReinforcement',
  bossTexture: 'patriotsAiGwColonelAiCore',
  enemyProjectileTexture: 'patriotsAiDigitalPulse',
  impactVfxTexture: 'patriotsAiGlitchImpactVfx',
  battlefieldPropTexture: 'patriotsAiGwTerminal'
} as const;

export const PATRIOTS_AI_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
