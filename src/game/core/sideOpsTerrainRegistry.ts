import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';

export type SideOpsTerrainKind = 'ground' | 'structure';

export interface SideOpsTerrainAsset {
  packId: SideOpsVisualPackId;
  kind: SideOpsTerrainKind;
  textureKey: string;
  path: string;
  width: 128;
  height: 64 | 32;
}

const PACKS = [
  'mg1', 'mg2', 'mgs1', 'mgs2_tanker', 'mgs2_plant', 'mgs3',
  'mgs4', 'peace_walker', 'mgsv_ground_zeroes', 'mgsv_phantom_pain',
  'vr_simulation', 'patriots_ai'
] as const satisfies readonly SideOpsVisualPackId[];

export const SIDEOPS_TERRAIN_ASSETS: readonly SideOpsTerrainAsset[] = PACKS.flatMap((packId) =>
  (['ground', 'structure'] as const).map((kind) => ({
    packId, kind, textureKey: `sideops-terrain:${packId}:${kind}`,
    path: `/sideops/terrain/${packId}-${kind}.png`, width: 128 as const,
    height: kind === 'ground' ? 64 as const : 32 as const
  }))
);

export function getSideOpsTerrainAsset(packId: SideOpsVisualPackId, kind: SideOpsTerrainKind): SideOpsTerrainAsset {
  return SIDEOPS_TERRAIN_ASSETS.find((asset) => asset.packId === packId && asset.kind === kind)!;
}

/** Existing original supplies/cover; era-specific special props remain in their authored slots. */
export const SIDEOPS_TERRAIN_COVER_TEXTURES = {
  mg1: 'mg1OuterHeavenSupplyCrate',
  mg2: 'mg1OuterHeavenSupplyCrate',
  mgs1: 'mgs1ShadowMosesSupplyContainer',
  mgs2_tanker: 'mgs1ShadowMosesSupplyContainer',
  mgs2_plant: 'mgs1ShadowMosesSupplyContainer',
  mgs3: 'mg1OuterHeavenSupplyCrate',
  mgs4: 'mgs4DrumCan',
  peace_walker: 'mg1OuterHeavenSupplyCrate',
  mgsv_ground_zeroes: 'mgs1ShadowMosesSupplyContainer',
  mgsv_phantom_pain: 'mg1OuterHeavenSupplyCrate',
  vr_simulation: 'mgs1VrEnvPropDataCrate',
  patriots_ai: 'patriotsAiGwTerminal'
} as const satisfies Record<SideOpsVisualPackId, string>;
