import type { BuilderEnvironment, SideOpsVisualPackId } from '../../types/missionBuilder.types';

export interface SideOpsBackdropAsset {
  readonly visualPackId: Exclude<SideOpsVisualPackId, 'vr_simulation'>;
  readonly textureKey: string;
  readonly path: string;
  readonly width: 960;
  readonly height: 540;
  readonly environment?: BuilderEnvironment;
}

/**
 * Original fan-made environment paintings used behind the shared Side Ops
 * runtime. They add era identity without changing collision geometry.
 */
export const SIDEOPS_GENERATED_BACKDROP_ASSETS = [
  { visualPackId: 'mg1', textureKey: 'sideOpsBackdropMg1OuterHeaven', path: '/sideops/backdrops/mg1-outer-heaven.webp', width: 960, height: 540 },
  { visualPackId: 'mg2', textureKey: 'sideOpsBackdropMg2ZanzibarLand', path: '/sideops/backdrops/mg2-zanzibar-land.webp', width: 960, height: 540 },
  { visualPackId: 'mgs1', textureKey: 'sideOpsBackdropMgs1ShadowMoses', path: '/sideops/backdrops/mgs1-shadow-moses.webp', width: 960, height: 540 },
  { visualPackId: 'mgs2_tanker', textureKey: 'sideOpsBackdropMgs2Tanker', path: '/sideops/backdrops/mgs2-tanker.webp', width: 960, height: 540 },
  { visualPackId: 'mgs2_plant', textureKey: 'sideOpsBackdropMgs2Plant', path: '/sideops/backdrops/mgs2-plant.webp', width: 960, height: 540 },
  { visualPackId: 'mgs3', textureKey: 'sideOpsBackdropMgs3GroznyjGrad', path: '/sideops/backdrops/mgs3-groznyj-grad.webp', width: 960, height: 540 },
  { visualPackId: 'mgs4', textureKey: 'sideOpsBackdropMgs4MiddleEast', path: '/sideops/backdrops/mgs4-middle-east.webp', width: 960, height: 540 },
  { visualPackId: 'peace_walker', textureKey: 'sideOpsBackdropPeaceWalkerMotherBase', path: '/sideops/backdrops/peace-walker-mother-base.webp', width: 960, height: 540 },
  { visualPackId: 'peace_walker', environment: 'jungle', textureKey: 'sideOpsBackdropPeaceWalkerCostaRicaJungle', path: '/sideops/backdrops/peace-walker-costa-rica-jungle.webp', width: 960, height: 540 },
  { visualPackId: 'mgsv_ground_zeroes', textureKey: 'sideOpsBackdropMgsvGroundZeroes', path: '/sideops/backdrops/mgsv-ground-zeroes-camp-omega.webp', width: 960, height: 540 },
  { visualPackId: 'mgsv_phantom_pain', textureKey: 'sideOpsBackdropMgsvPhantomPain', path: '/sideops/backdrops/mgsv-phantom-pain-afghanistan.webp', width: 960, height: 540 },
  { visualPackId: 'patriots_ai', textureKey: 'sideOpsBackdropPatriotsAiGw', path: '/sideops/backdrops/patriots-ai-gw.webp', width: 960, height: 540 }
] as const satisfies readonly SideOpsBackdropAsset[];

export const SIDEOPS_BACKDROP_TEXTURE_BY_PACK = {
  mg1: 'sideOpsBackdropMg1OuterHeaven',
  mg2: 'sideOpsBackdropMg2ZanzibarLand',
  mgs1: 'sideOpsBackdropMgs1ShadowMoses',
  mgs2_tanker: 'sideOpsBackdropMgs2Tanker',
  mgs2_plant: 'sideOpsBackdropMgs2Plant',
  mgs3: 'sideOpsBackdropMgs3GroznyjGrad',
  mgs4: 'sideOpsBackdropMgs4MiddleEast',
  peace_walker: 'sideOpsBackdropPeaceWalkerMotherBase',
  mgsv_ground_zeroes: 'sideOpsBackdropMgsvGroundZeroes',
  mgsv_phantom_pain: 'sideOpsBackdropMgsvPhantomPain',
  vr_simulation: 'mgs1VrEnvTileMatrixVoid',
  patriots_ai: 'sideOpsBackdropPatriotsAiGw'
} as const satisfies Readonly<Record<SideOpsVisualPackId, string>>;

export function resolveSideOpsBackdropTexture(visualPackId: SideOpsVisualPackId, environment?: BuilderEnvironment): string {
  // Costa Rica operations take place inland; retain Mother Base for dock,
  // facility and unspecified legacy contexts instead of changing the pack default.
  if (visualPackId === 'peace_walker' && environment === 'jungle') {
    return 'sideOpsBackdropPeaceWalkerCostaRicaJungle';
  }
  return SIDEOPS_BACKDROP_TEXTURE_BY_PACK[visualPackId];
}
