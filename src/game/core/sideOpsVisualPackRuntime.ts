import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';
import { MG1_SIDEOPS_RUNTIME_TEXTURES } from './mg1SideOpsAssetRegistry';
import { MG2_SIDEOPS_RUNTIME_TEXTURES } from './mg2SideOpsAssetRegistry';
import { MGS1_SIDEOPS_RUNTIME_TEXTURES } from './mgs1SideOpsAssetRegistry';
import { MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES } from './mgs2PlantSideOpsAssetRegistry';
import { MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES } from './mgs2TankerSideOpsAssetRegistry';
import { MGS3_SIDEOPS_RUNTIME_TEXTURES } from './mgs3SideOpsAssetRegistry';
import { MGS4_SIDEOPS_RUNTIME_TEXTURES } from './mgs4SideOpsAssetRegistry';
import { MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES } from './mgsvGroundZeroesSideOpsAssetRegistry';
import { MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES } from './mgsvPhantomPainSideOpsAssetRegistry';
import { PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES } from './patriotsAiSideOpsAssetRegistry';
import { PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES } from './peaceWalkerSideOpsAssetRegistry';
import { VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES } from './vrSimulationSideOpsRuntime';

export interface SideOpsVisualPackRuntimeTextures {
  readonly playerTexture: string;
  readonly guardTexture: string;
  readonly reinforcementTexture: string;
  readonly bossTexture: string;
  readonly enemyProjectileTexture: string;
  readonly impactVfxTexture: string;
  readonly battlefieldPropTexture: string;
}

export interface SideOpsSupplementalRuntimeTextures {
  readonly playerProjectileTexture: string;
  readonly playerImpactVfxTexture: string;
  readonly enemyProjectileTexture: string;
  readonly impactVfxTexture: string;
  readonly battlefieldPropTexture: string;
}

export const SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES = {
  mg1: MG1_SIDEOPS_RUNTIME_TEXTURES,
  mg2: MG2_SIDEOPS_RUNTIME_TEXTURES,
  mgs1: MGS1_SIDEOPS_RUNTIME_TEXTURES,
  mgs2_tanker: MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES,
  mgs2_plant: MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES,
  mgs3: MGS3_SIDEOPS_RUNTIME_TEXTURES,
  mgs4: MGS4_SIDEOPS_RUNTIME_TEXTURES,
  peace_walker: PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES,
  mgsv_ground_zeroes: MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES,
  mgsv_phantom_pain: MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES,
  vr_simulation: VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES,
  patriots_ai: PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES
} as const satisfies Record<SideOpsVisualPackId, SideOpsVisualPackRuntimeTextures>;

function createSupplementalTextures(
  textures: SideOpsVisualPackRuntimeTextures,
  playerProjectileTexture = textures.enemyProjectileTexture,
  playerImpactVfxTexture = textures.impactVfxTexture
): SideOpsSupplementalRuntimeTextures {
  return {
    playerProjectileTexture,
    playerImpactVfxTexture,
    enemyProjectileTexture: textures.enemyProjectileTexture,
    impactVfxTexture: textures.impactVfxTexture,
    battlefieldPropTexture: textures.battlefieldPropTexture
  };
}

/**
 * Exhaustive SideOpsScene contract. Player ballistics default to the pack's
 * shared projectile/VFX, while MG1 and MGS1 use their dedicated handgun rounds.
 */
export const SIDEOPS_SUPPLEMENTAL_RUNTIME_TEXTURES = {
  mg1: createSupplementalTextures(MG1_SIDEOPS_RUNTIME_TEXTURES, 'mg1HandgunBullet'),
  mg2: createSupplementalTextures(MG2_SIDEOPS_RUNTIME_TEXTURES),
  mgs1: createSupplementalTextures(MGS1_SIDEOPS_RUNTIME_TEXTURES, 'mgs1SocomBullet'),
  mgs2_tanker: createSupplementalTextures(MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES),
  mgs2_plant: createSupplementalTextures(MGS2_PLANT_SIDEOPS_RUNTIME_TEXTURES),
  mgs3: createSupplementalTextures(MGS3_SIDEOPS_RUNTIME_TEXTURES),
  mgs4: createSupplementalTextures(MGS4_SIDEOPS_RUNTIME_TEXTURES),
  peace_walker: createSupplementalTextures(PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES),
  mgsv_ground_zeroes: createSupplementalTextures(MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES),
  mgsv_phantom_pain: createSupplementalTextures(MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES),
  vr_simulation: createSupplementalTextures(VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES),
  patriots_ai: createSupplementalTextures(PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES)
} as const satisfies Record<SideOpsVisualPackId, SideOpsSupplementalRuntimeTextures>;
