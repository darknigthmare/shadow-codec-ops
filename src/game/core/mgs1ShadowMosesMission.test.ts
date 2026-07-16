import { describe, expect, it } from 'vitest';
import { getMgs1ActorAnimationAssetBySourceTexture } from './mgs1ActorAnimationRegistry';
import { MGS1_SIDEOPS_ALL_ASSETS } from './mgs1SideOpsAssetRegistry';
import {
  activateNextMgs1Encounter,
  completeActiveMgs1Encounter,
  createMgs1MissionFlowState,
  deployMgs1EscapeVehicles,
  getMgs1ObjectiveLabel,
  isMgs1ExtractionUnlocked,
  MGS1_BOSS_SEQUENCE,
  MGS1_DECOY_OCTOPUS_REVEAL,
  MGS1_ESCAPE_VEHICLES,
  MGS1_HAZARD_SEQUENCE,
  MGS1_NPC_CHECKPOINTS,
  MGS1_SHADOW_MOSES_MISSION_ID,
  MGS1_SHADOW_MOSES_WORLD,
  revealMgs1DecoyOctopus,
  type Mgs1MissionFlowState
} from './mgs1ShadowMosesMission';

function finishEncounter(state: Mgs1MissionFlowState, index: number): Mgs1MissionFlowState {
  const encounter = MGS1_BOSS_SEQUENCE[index];
  const activated = activateNextMgs1Encounter(state, encounter.activationX);
  expect(activated.activeEncounterIndex).toBe(index);
  return completeActiveMgs1Encounter(activated);
}

describe('MGS1 Shadow Moses condensed mission', () => {
  it('keeps the existing Side Ops id and canonical combat order', () => {
    expect(MGS1_SHADOW_MOSES_MISSION_ID).toBe('shadow_dock_001');
    expect(MGS1_BOSS_SEQUENCE.map((encounter) => encounter.id)).toEqual([
      'revolver_ocelot',
      'm1_tank',
      'cyborg_ninja',
      'psycho_mantis',
      'sniper_wolf',
      'hind_d',
      'vulcan_raven',
      'metal_gear_rex',
      'liquid_snake'
    ]);
    expect(MGS1_BOSS_SEQUENCE.map((encounter) => encounter.activationX)).toEqual(
      [...MGS1_BOSS_SEQUENCE].map((encounter) => encounter.activationX).sort((left, right) => left - right)
    );
    MGS1_BOSS_SEQUENCE.forEach((encounter) => {
      expect(encounter.activationX).toBeLessThan(encounter.arenaX);
      expect(encounter.arenaX).toBeLessThan(encounter.gateX);
      expect(encounter.gateX).toBeLessThan(MGS1_SHADOW_MOSES_WORLD.worldWidth);
    });
  });

  it('keeps Decoy Octopus narrative-only and deploys both ending vehicles', () => {
    expect(MGS1_BOSS_SEQUENCE.some((encounter) => encounter.id.includes('decoy'))).toBe(false);
    expect(MGS1_DECOY_OCTOPUS_REVEAL.textureKey).toBe('mgs1DecoyOctopus');
    expect(MGS1_ESCAPE_VEHICLES.map((vehicle) => vehicle.textureKey)).toEqual([
      'mgs1EscapeJeep',
      'mgs1Snowmobile'
    ]);
  });

  it('gives every boss a real projectile, VFX and playable specialist animation', () => {
    const assetKeys = new Set(MGS1_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    MGS1_BOSS_SEQUENCE.forEach((encounter) => {
      expect(assetKeys.has(encounter.textureKey), `${encounter.id}:actor`).toBe(true);
      const animation = getMgs1ActorAnimationAssetBySourceTexture(encounter.textureKey);
      expect(animation, `${encounter.id}:animation sheet`).toBeDefined();
      expect(animation?.clips[encounter.signatureClip], `${encounter.id}:${encounter.signatureClip}`).toBeDefined();
      expect(encounter.attacks.length).toBeGreaterThan(0);
      encounter.attacks.forEach((attack) => {
        expect(assetKeys.has(attack.projectileTextureKey), `${encounter.id}:${attack.projectileTextureKey}`).toBe(true);
        expect(assetKeys.has(attack.vfxTextureKey), `${encounter.id}:${attack.vfxTextureKey}`).toBe(true);
        expect(animation?.clips[attack.actionClip], `${encounter.id}:${attack.actionClip}`).toBeDefined();
        expect(attack.intervalMs).toBeGreaterThan(0);
        expect(attack.damage).toBeGreaterThan(0);
      });
    });

    const rex = MGS1_BOSS_SEQUENCE.find((encounter) => encounter.id === 'metal_gear_rex');
    expect(rex?.attacks.map((attack) => attack.actionClip)).toEqual(['missile', 'laser', 'railgun']);
  });

  it('covers every Genome variant, the wolfdog, gun camera and requested NPCs', () => {
    expect(MGS1_HAZARD_SEQUENCE.map((hazard) => hazard.textureKey)).toEqual(expect.arrayContaining([
      'mgs1GenomeLightInfantry',
      'mgs1GenomeArcticTrooper',
      'mgs1GenomeNbcTrooper',
      'mgs1GenomeHeavyTrooper',
      'mgs1WolfDog',
      'mgs1GunCamera'
    ]));
    expect(MGS1_NPC_CHECKPOINTS.map((npc) => npc.textureKey)).toEqual([
      'mgs1MerylSilverburgh',
      'mgs1DonaldAnderson',
      'mgs1KennethBaker',
      'mgs1Otacon',
      'mgs1JohnnySasaki'
    ]);
  });

  it('advances one arena at a time and only unlocks extraction after story and escape setup', () => {
    let state = createMgs1MissionFlowState();
    expect(activateNextMgs1Encounter(state, MGS1_BOSS_SEQUENCE[0].activationX - 1)).toBe(state);
    for (let index = 0; index < MGS1_BOSS_SEQUENCE.length; index += 1) state = finishEncounter(state, index);

    expect(state.defeatedEncounterIds).toHaveLength(MGS1_BOSS_SEQUENCE.length);
    expect(isMgs1ExtractionUnlocked(state)).toBe(false);
    state = revealMgs1DecoyOctopus(state, MGS1_SHADOW_MOSES_WORLD.decoyTriggerX);
    expect(state.decoyRevealed).toBe(true);
    state = deployMgs1EscapeVehicles(state);
    expect(state.escapeVehiclesDeployed).toBe(true);
    expect(isMgs1ExtractionUnlocked(state)).toBe(true);
    expect(getMgs1ObjectiveLabel(state)).toContain('escape jeep');
  });
});
