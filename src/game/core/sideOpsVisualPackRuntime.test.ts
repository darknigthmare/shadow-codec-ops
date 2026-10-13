/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { EraId } from '../../types/codec.types';
import type { BuilderEnvironment, SideOpsVisualPackId } from '../../types/missionBuilder.types';
import { convertBuilderDocumentToSideOpsProfile, createBlankMissionBuilderDocument } from '../../systems/missionBuilderStorage';
import {
  getCompatibleSideOpsVisualPackIds,
  resolveSideOpsCharacterTextures,
  SIDEOPS_PLAYABLE_OPERATIVE_ASSETS,
  SIDEOPS_VISUAL_PACK_IDS
} from '../../systems/sideOpsCharacterResolver';
import { MG1_SIDEOPS_ALL_ASSETS } from './mg1SideOpsAssetRegistry';
import { MG2_SIDEOPS_ALL_ASSETS } from './mg2SideOpsAssetRegistry';
import { MGS1_SIDEOPS_ALL_ASSETS } from './mgs1SideOpsAssetRegistry';
import { MGS1_VR_ALL_ASSETS } from './mgs1VrEnvironmentRegistry';
import { MGS1_VR_GAMEPLAY_ALL_ASSETS } from './mgs1VrGameplayAssetRegistry';
import { MGS2_PLANT_SIDEOPS_ALL_ASSETS } from './mgs2PlantSideOpsAssetRegistry';
import { MGS2_TANKER_SIDEOPS_ALL_ASSETS } from './mgs2TankerSideOpsAssetRegistry';
import { MGS3_SIDEOPS_ALL_ASSETS } from './mgs3SideOpsAssetRegistry';
import { MGS4_SIDEOPS_ALL_ASSETS } from './mgs4SideOpsAssetRegistry';
import { MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS } from './mgsvGroundZeroesSideOpsAssetRegistry';
import { MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS } from './mgsvPhantomPainSideOpsAssetRegistry';
import { PATRIOTS_AI_SIDEOPS_ALL_ASSETS } from './patriotsAiSideOpsAssetRegistry';
import { PEACE_WALKER_SIDEOPS_ALL_ASSETS } from './peaceWalkerSideOpsAssetRegistry';
import {
  SIDEOPS_SUPPLEMENTAL_RUNTIME_TEXTURES,
  SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES
} from './sideOpsVisualPackRuntime';

interface PackFixture {
  era: EraId;
  environment: BuilderEnvironment;
  mainCharacter: string;
}

const PACK_FIXTURES: Record<SideOpsVisualPackId, PackFixture> = {
  mg1: { era: 'msx', environment: 'facility', mainCharacter: 'Solid Snake MG1' },
  mg2: { era: 'msx', environment: 'facility', mainCharacter: 'Solid Snake MG2' },
  mgs1: { era: 'mgs1', environment: 'facility', mainCharacter: 'Solid Snake' },
  mgs2_tanker: { era: 'mgs2', environment: 'tanker', mainCharacter: 'Solid Snake' },
  mgs2_plant: { era: 'mgs2', environment: 'facility', mainCharacter: 'Raiden' },
  mgs3: { era: 'mgs3', environment: 'jungle', mainCharacter: 'Naked Snake' },
  mgs4: { era: 'mgs4', environment: 'facility', mainCharacter: 'Old Snake' },
  peace_walker: { era: 'peace_walker', environment: 'jungle', mainCharacter: 'Big Boss PW' },
  mgsv_ground_zeroes: { era: 'mgsv', environment: 'facility', mainCharacter: 'Big Boss GZ' },
  mgsv_phantom_pain: { era: 'mgsv', environment: 'facility', mainCharacter: 'Venom Snake' },
  vr_simulation: { era: 'vr_simulation', environment: 'vr', mainCharacter: 'VR Operative' },
  patriots_ai: { era: 'patriots_ai', environment: 'facility', mainCharacter: 'Raiden' }
};

const REGISTRY_ASSETS = [
  ...MG1_SIDEOPS_ALL_ASSETS,
  ...MG2_SIDEOPS_ALL_ASSETS,
  ...MGS1_SIDEOPS_ALL_ASSETS,
  ...MGS2_TANKER_SIDEOPS_ALL_ASSETS,
  ...MGS2_PLANT_SIDEOPS_ALL_ASSETS,
  ...MGS3_SIDEOPS_ALL_ASSETS,
  ...MGS4_SIDEOPS_ALL_ASSETS,
  ...PEACE_WALKER_SIDEOPS_ALL_ASSETS,
  ...MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS,
  ...MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS,
  ...PATRIOTS_AI_SIDEOPS_ALL_ASSETS,
  ...MGS1_VR_ALL_ASSETS,
  ...MGS1_VR_GAMEPLAY_ALL_ASSETS
] as const;

const PRELOADED_TEXTURE_KEYS = new Set<string>([
  'player',
  'playerTanker',
  'vrPlayer',
  'vrGuard',
  'vrBoss',
  ...SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.map((asset) => asset.textureKey),
  ...REGISTRY_ASSETS.map((asset) => asset.textureKey)
]);

describe('Side Ops visual pack runtime matrix', () => {
  it('is exhaustive for all 12 visualPackId values', () => {
    expect(Object.keys(SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES)).toEqual(SIDEOPS_VISUAL_PACK_IDS);
    expect(Object.keys(SIDEOPS_SUPPLEMENTAL_RUNTIME_TEXTURES)).toEqual(SIDEOPS_VISUAL_PACK_IDS);
    expect(Object.keys(PACK_FIXTURES)).toEqual(SIDEOPS_VISUAL_PACK_IDS);
  });

  it('offers only era-compatible Builder choices and covers every pack once', () => {
    expect(getCompatibleSideOpsVisualPackIds('msx')).toEqual(['mg1', 'mg2']);
    expect(getCompatibleSideOpsVisualPackIds('mgs1')).toEqual(['mgs1']);
    expect(getCompatibleSideOpsVisualPackIds('mgs2')).toEqual(['mgs2_tanker', 'mgs2_plant']);
    expect(getCompatibleSideOpsVisualPackIds('mgs3')).toEqual(['mgs3']);
    expect(getCompatibleSideOpsVisualPackIds('mgs4')).toEqual(['mgs4']);
    expect(getCompatibleSideOpsVisualPackIds('peace_walker')).toEqual(['peace_walker']);
    expect(getCompatibleSideOpsVisualPackIds('mgsv')).toEqual(['mgsv_ground_zeroes', 'mgsv_phantom_pain']);
    expect(getCompatibleSideOpsVisualPackIds('vr_simulation')).toEqual(['vr_simulation']);
    expect(getCompatibleSideOpsVisualPackIds('patriots_ai')).toEqual(['patriots_ai']);

    const covered = new Set<SideOpsVisualPackId>();
    ([
      'msx',
      'mgs1',
      'mgs2',
      'mgs3',
      'mgs4',
      'peace_walker',
      'mgsv',
      'vr_simulation',
      'patriots_ai'
    ] satisfies EraId[]).forEach((era) => {
      getCompatibleSideOpsVisualPackIds(era).forEach((packId) => covered.add(packId));
    });
    expect([...covered]).toEqual(SIDEOPS_VISUAL_PACK_IDS);
  });

  it('routes every Builder pack to its own character and supplemental textures', () => {
    for (const packId of SIDEOPS_VISUAL_PACK_IDS) {
      const fixture = PACK_FIXTURES[packId];
      const runtime = SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[packId];
      const supplemental = SIDEOPS_SUPPLEMENTAL_RUNTIME_TEXTURES[packId];
      const resolved = resolveSideOpsCharacterTextures({
        ...fixture,
        location: `${packId} test range`,
        visualPackId: packId
      });
      expect(resolved, packId).toEqual({
        playerTexture: runtime.playerTexture,
        guardTexture: runtime.guardTexture,
        reinforcementTexture: runtime.reinforcementTexture,
        bossTexture: runtime.bossTexture
      });
      expect(supplemental.enemyProjectileTexture, packId).toBe(runtime.enemyProjectileTexture);
      expect(supplemental.impactVfxTexture, packId).toBe(runtime.impactVfxTexture);
      expect(supplemental.playerImpactVfxTexture, packId).toBe(runtime.impactVfxTexture);
      expect(supplemental.battlefieldPropTexture, packId).toBe(runtime.battlefieldPropTexture);
      expect(supplemental.playerProjectileTexture, packId).toBe(
        packId === 'mg1' ? 'mg1HandgunBullet' : packId === 'mgs1' ? 'mgs1SocomBullet' : runtime.enemyProjectileTexture
      );

      const profile = convertBuilderDocumentToSideOpsProfile({
        ...createBlankMissionBuilderDocument(),
        ...fixture,
        location: `${packId} test range`,
        visualPackId: packId
      });
      expect(profile.visualPackId, packId).toBe(packId);
      expect(profile.era, packId).toBe(fixture.era);
      expect(profile.playerTexture, packId).toBe(runtime.playerTexture);
      expect(profile.guardTexture, packId).toBe(runtime.guardTexture);
      expect(profile.reinforcementTexture, packId).toBe(runtime.reinforcementTexture);
      expect(profile.boss.texture, packId).toBe(runtime.bossTexture);
    }
  });

  it('references only textures covered by the shared preload registries', () => {
    for (const packId of SIDEOPS_VISUAL_PACK_IDS) {
      const runtime = SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[packId];
      const supplemental = SIDEOPS_SUPPLEMENTAL_RUNTIME_TEXTURES[packId];
      for (const textureKey of [...Object.values(runtime), ...Object.values(supplemental)]) {
        expect(PRELOADED_TEXTURE_KEYS.has(textureKey), `${packId}: ${textureKey}`).toBe(true);
      }
    }
  });

  it('does not preload the retired procedural Tanker actor aliases', () => {
    const preloadSource = readFileSync(resolve(process.cwd(), 'src/game/scenes/PreloadScene.ts'), 'utf8');
    expect(preloadSource).not.toContain('deckGuard');
    expect(preloadSource).not.toContain('deckReinforcement');
    expect(preloadSource).not.toContain('bossDeckCommander');
  });

  it('keeps the Shadow Dock SideOps fallback on the authored MGS1 pack', () => {
    const sideOpsSource = readFileSync(resolve(process.cwd(), 'src/game/scenes/SideOpsScene.ts'), 'utf8');
    expect(sideOpsSource).not.toContain("guardTexture: 'guard'");
    expect(sideOpsSource).not.toContain("reinforcementTexture: 'reinforcementGuard'");
    expect(sideOpsSource).not.toContain("texture: 'bossCaptain'");
    expect(sideOpsSource).toContain("boss: { name: 'Revolver Ocelot'");
  });
});
