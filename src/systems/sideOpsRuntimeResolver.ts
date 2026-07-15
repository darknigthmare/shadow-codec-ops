import { MG1_OUTER_HEAVEN_MISSION_ID } from '../game/core/mg1OuterHeavenMission';

export type SideOpsRuntimeSceneKey = 'SideOpsScene' | 'Mg1OuterHeavenScene';

export function parseStoredSideOpsMissionId(rawValue: string | null, fallback = 'shadow_dock_001'): string {
  if (!rawValue) return fallback;
  try {
    const parsed = JSON.parse(rawValue) as unknown;
    return typeof parsed === 'string' ? parsed : fallback;
  } catch {
    return rawValue;
  }
}

export function resolveSideOpsRuntimeScene(missionId: string): SideOpsRuntimeSceneKey {
  return missionId === MG1_OUTER_HEAVEN_MISSION_ID ? 'Mg1OuterHeavenScene' : 'SideOpsScene';
}
