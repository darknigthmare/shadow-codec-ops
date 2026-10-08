import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';
import type { SideOpsActorRole } from './sideOpsActorAnimationRegistry';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from './sideOpsVisualPackRuntime';

/** The level's theme must never replace an explicitly selected character.
 * Keep the preferred pack when its identity matches (including simulations);
 * otherwise reuse an authored player sheet only for an exact texture identity.
 * Non-default enemy variants keep their legacy/special art instead of becoming
 * a different guard merely because they share a role.
 */
export function resolveSideOpsAuthoredIdentityPack(
  preferredPack: SideOpsVisualPackId, role: SideOpsActorRole, sourceTextureKey: string
): SideOpsVisualPackId | undefined {
  const field = role === 'player' ? 'playerTexture' : role === 'guard' ? 'guardTexture' : 'reinforcementTexture';
  if (SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[preferredPack][field] === sourceTextureKey) return preferredPack;
  if (role !== 'player') return undefined;
  return (Object.keys(SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES) as SideOpsVisualPackId[])
    .find((pack) => SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[pack].playerTexture === sourceTextureKey);
}
