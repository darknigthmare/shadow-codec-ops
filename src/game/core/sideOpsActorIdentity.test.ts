import { describe, expect, it } from 'vitest';
import { resolveSideOpsAuthoredIdentityPack } from './sideOpsActorIdentity';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from './sideOpsVisualPackRuntime';
import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';

describe('authored Side Ops identity routing', () => {
  it('preserves all twelve standard pack identities and three roles', () => {
    for (const pack of Object.keys(SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES) as SideOpsVisualPackId[]) {
      const textures = SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[pack];
      expect(resolveSideOpsAuthoredIdentityPack(pack, 'player', textures.playerTexture)).toBe(pack);
      expect(resolveSideOpsAuthoredIdentityPack(pack, 'guard', textures.guardTexture)).toBe(pack);
      expect(resolveSideOpsAuthoredIdentityPack(pack, 'reinforcement', textures.reinforcementTexture)).toBe(pack);
    }
  });
  it('keeps Solid Snake in a Plant level instead of replacing him with Raiden', () => {
    expect(resolveSideOpsAuthoredIdentityPack('mgs2_plant', 'player', 'playerTanker')).toBe('mgs2_tanker');
    expect(resolveSideOpsAuthoredIdentityPack('mgs2_tanker', 'player', 'playerRaidenMgs2')).toBe('mgs2_plant');
  });
  it('distinguishes Ground Zeroes Big Boss from Venom Snake', () => {
    expect(resolveSideOpsAuthoredIdentityPack('mgsv_phantom_pain', 'player', 'playerBigBossGroundZeroes')).toBe('mgsv_ground_zeroes');
    expect(resolveSideOpsAuthoredIdentityPack('mgsv_ground_zeroes', 'player', 'playerVenomSnakeMgsv')).toBe('mgsv_phantom_pain');
  });
  it('never replaces unknown or non-default enemy identities', () => {
    expect(resolveSideOpsAuthoredIdentityPack('mgs1', 'guard', 'mgs1GenomeNbcTrooper')).toBeUndefined();
    expect(resolveSideOpsAuthoredIdentityPack('mgs1', 'guard', 'mgs1CyborgNinja')).toBeUndefined();
    expect(resolveSideOpsAuthoredIdentityPack('mg1', 'player', 'unregisteredHero')).toBeUndefined();
    expect(resolveSideOpsAuthoredIdentityPack('mgs2_plant', 'reinforcement', 'mgs2TankerGurlukovichGuard')).toBeUndefined();
  });
});
