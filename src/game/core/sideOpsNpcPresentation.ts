import type { SideOpsSpecialActorState } from './sideOpsSpecialActorAnimationRegistry';

export interface NpcGroundSupport { left: number; right: number; top: number }

/** Decorative NPCs stand on collision geometry, never on a painted background. */
export function getGroundedNpcY(x: number, referenceY: number, bodyHeight: number, supports: readonly NpcGroundSupport[], fallbackTop: number): number {
  const reachable = supports.filter((support) => x >= support.left && x <= support.right && support.top >= referenceY);
  const groundTop = reachable.length ? Math.min(...reachable.map((support) => support.top)) : fallbackTop;
  return groundTop - bodyHeight / 2;
}

/** Ambient reactions are fan-made staging; they do not add canon dialogue. */
export function getSpecialNpcReaction(sourceTextureKey: string, distance: number, nearbyThreat: boolean, cycle: number): SideOpsSpecialActorState | undefined {
  if (sourceTextureKey !== 'mgs1Otacon' || distance > 260) return undefined;
  if (nearbyThreat) return 'fear';
  return cycle % 2 === 0 ? 'interact' : 'radio';
}
