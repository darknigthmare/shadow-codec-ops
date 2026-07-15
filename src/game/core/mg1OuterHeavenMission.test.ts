import { describe, expect, it } from 'vitest';
import bossesJson from '../../data/bosses.json';
import contactsJson from '../../data/contacts.json';
import conversationsJson from '../../data/conversations.json';
import enemiesJson from '../../data/enemies.json';
import itemsJson from '../../data/items.json';
import missionsJson from '../../data/missions.json';
import { parseStoredSideOpsMissionId, resolveSideOpsRuntimeScene } from '../../systems/sideOpsRuntimeResolver';
import {
  MG1_SIDEOPS_ALL_ASSETS,
  MG1_SIDEOPS_MACHINE_ASSETS,
  MG1_SIDEOPS_PROJECTILE_ASSETS,
  MG1_SIDEOPS_VFX_ASSETS
} from './mg1SideOpsAssetRegistry';
import {
  activateNextMg1Encounter,
  completeActiveMg1Encounter,
  createMg1EncounterFlowState,
  getMg1HostageStealthPenalty,
  isMg1EncounterDefeated,
  isMg1ExtractionUnlocked,
  MG1_ENCOUNTER_SEQUENCE,
  MG1_HAZARD_SEQUENCE,
  MG1_HOSTAGE_HARM_STEALTH_PENALTY,
  MG1_MAX_ONSCREEN_LANDMINES,
  MG1_MAX_ONSCREEN_PLASTIC_EXPLOSIVES,
  MG1_MAX_SIMULTANEOUS_PLAYER_BULLETS,
  MG1_NPC_CHECKPOINTS,
  MG1_OUTER_HEAVEN_MISSION_ID,
  MG1_OUTER_HEAVEN_WORLD,
  MG1_RUNTIME_PROJECTILE_KEYS,
  MG1_RUNTIME_VFX_KEYS,
  MG1_TX55_LEG_SEQUENCE,
  registerMg1Tx55Charge,
  shouldCreditMg1EncounterObjective,
  type Mg1EncounterFlowState
} from './mg1OuterHeavenMission';

interface IdRecord { id: string }
interface MissionRecord extends IdRecord {
  era: string;
  mode: string;
  mainCharacter: string;
  briefingConversation: string;
  debriefingConversation: string;
  availableItems: string[];
  enemies: string[];
  boss?: string;
  codecTriggers: Array<{ contactId: string; conversationId: string }>;
  objectives: Array<{ id: string; completedByDefault: boolean }>;
}

function completeEncountersBefore(targetIndex: number): Mg1EncounterFlowState {
  let state = createMg1EncounterFlowState();
  for (let index = 0; index < targetIndex; index += 1) {
    state = activateNextMg1Encounter(state, MG1_ENCOUNTER_SEQUENCE[index].activationX);
    expect(state.activeEncounterIndex).toBe(index);
    state = completeActiveMg1Encounter(state);
  }
  return state;
}

describe('Operation Intrude N313 mission selection and data', () => {
  it('publishes Mission 003 as a selectable MSX Side Ops mission with valid content references', () => {
    const mission = (missionsJson as MissionRecord[]).find((entry) => entry.id === MG1_OUTER_HEAVEN_MISSION_ID);
    expect(mission).toBeDefined();
    expect(mission).toMatchObject({ era: 'msx', mode: 'side_scroller', mainCharacter: 'solid_snake_msx', boss: 'big_boss_mg1' });
    expect(mission?.objectives).toHaveLength(MG1_OUTER_HEAVEN_WORLD.totalObjectives);
    expect(mission?.objectives.filter((objective) => objective.completedByDefault).map((objective) => objective.id)).toEqual(['infiltrate_outer_heaven']);

    const itemIds = new Set((itemsJson as IdRecord[]).map((entry) => entry.id));
    const combatIds = new Set([...(enemiesJson as IdRecord[]), ...(bossesJson as IdRecord[])].map((entry) => entry.id));
    const contactIds = new Set((contactsJson as IdRecord[]).map((entry) => entry.id));
    const conversationIds = new Set((conversationsJson as IdRecord[]).map((entry) => entry.id));
    mission?.availableItems.forEach((id) => expect(itemIds.has(id), `missing item ${id}`).toBe(true));
    expect(mission?.availableItems).not.toContain('chaff_grenade');
    mission?.enemies.forEach((id) => expect(combatIds.has(id), `missing combat record ${id}`).toBe(true));
    mission?.codecTriggers.forEach((trigger) => {
      expect(contactIds.has(trigger.contactId), `missing contact ${trigger.contactId}`).toBe(true);
      expect(conversationIds.has(trigger.conversationId), `missing conversation ${trigger.conversationId}`).toBe(true);
    });
    expect(conversationIds.has(mission?.briefingConversation ?? '')).toBe(true);
    expect(conversationIds.has(mission?.debriefingConversation ?? '')).toBe(true);
  });

  it('routes only Mission 003 to the dedicated MG1 runtime and parses stored ids safely', () => {
    expect(parseStoredSideOpsMissionId(JSON.stringify(MG1_OUTER_HEAVEN_MISSION_ID))).toBe(MG1_OUTER_HEAVEN_MISSION_ID);
    expect(parseStoredSideOpsMissionId(MG1_OUTER_HEAVEN_MISSION_ID)).toBe(MG1_OUTER_HEAVEN_MISSION_ID);
    expect(parseStoredSideOpsMissionId(JSON.stringify({ id: MG1_OUTER_HEAVEN_MISSION_ID }))).toBe('shadow_dock_001');
    expect(resolveSideOpsRuntimeScene(MG1_OUTER_HEAVEN_MISSION_ID)).toBe('Mg1OuterHeavenScene');
    expect(resolveSideOpsRuntimeScene('shadow_dock_001')).toBe('SideOpsScene');
    expect(resolveSideOpsRuntimeScene('tanker_hold_002')).toBe('SideOpsScene');
  });
});

describe('Operation Intrude N313 encounter fidelity', () => {
  it('keeps the canonical ten-stage order and eleven total boss units', () => {
    expect(MG1_ENCOUNTER_SEQUENCE.map((encounter) => encounter.id)).toEqual([
      'shotmaker',
      'machinegun_kid',
      'hind_d',
      'outer_heaven_tank',
      'bulldozer',
      'fire_trooper',
      'bloody_brad_pair',
      'dirty_duck',
      'tx55_metal_gear',
      'big_boss'
    ]);
    expect(MG1_ENCOUNTER_SEQUENCE.reduce((total, encounter) => total + encounter.unitCount, 0)).toBe(11);
    expect(MG1_ENCOUNTER_SEQUENCE.map((encounter) => encounter.activationX)).toEqual(
      [...MG1_ENCOUNTER_SEQUENCE].map((encounter) => encounter.activationX).sort((a, b) => a - b)
    );
    MG1_ENCOUNTER_SEQUENCE.forEach((encounter) => {
      expect(encounter.activationX).toBeLessThan(encounter.arenaX);
      expect(encounter.arenaX).toBeLessThan(encounter.gateX);
      expect(encounter.gateX).toBeLessThan(MG1_OUTER_HEAVEN_WORLD.worldWidth);
    });
  });

  it('resolves every encounter, hazard and NPC texture through the MG1 registry', () => {
    const textureKeys = new Set(MG1_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    const bossIds = new Set((bossesJson as IdRecord[]).map((entry) => entry.id));
    MG1_ENCOUNTER_SEQUENCE.forEach((encounter) => {
      expect(textureKeys.has(encounter.textureKey), `missing texture ${encounter.textureKey}`).toBe(true);
      expect(textureKeys.has(encounter.playerWeaponTextureKey), `missing weapon ${encounter.playerWeaponTextureKey}`).toBe(true);
      if ('enemyProjectileTextureKey' in encounter && encounter.enemyProjectileTextureKey) expect(textureKeys.has(encounter.enemyProjectileTextureKey)).toBe(true);
      expect(bossIds.has(encounter.bossDataId), `missing boss ${encounter.bossDataId}`).toBe(true);
    });
    MG1_HAZARD_SEQUENCE.forEach((hazard) => expect(textureKeys.has(hazard.textureKey), `missing hazard ${hazard.textureKey}`).toBe(true));
    MG1_NPC_CHECKPOINTS.forEach((npc) => expect(textureKeys.has(npc.textureKey), `missing NPC ${npc.textureKey}`).toBe(true));
    expect(MG1_SIDEOPS_MACHINE_ASSETS).toContainEqual(expect.objectContaining({ id: 'mg1_transport_truck', textureKey: 'mg1TransportTruck', path: '/sideops/mg1/vehicles/transport-truck.png' }));
  });

  it('consumes all twelve projectile textures and all nine VFX sheets', () => {
    const usedProjectiles = new Set<string>(['mg1HandgunBullet', 'mg1PlasticExplosive']);
    MG1_ENCOUNTER_SEQUENCE.forEach((encounter) => {
      usedProjectiles.add(encounter.playerWeaponTextureKey);
      if ('enemyProjectileTextureKey' in encounter && encounter.enemyProjectileTextureKey) usedProjectiles.add(encounter.enemyProjectileTextureKey);
    });
    MG1_HAZARD_SEQUENCE.forEach((hazard) => {
      if ('projectileTextureKey' in hazard && hazard.projectileTextureKey) usedProjectiles.add(hazard.projectileTextureKey);
    });
    const registeredProjectiles = MG1_SIDEOPS_PROJECTILE_ASSETS.map((asset) => asset.textureKey).sort();
    expect([...usedProjectiles].sort()).toEqual(registeredProjectiles);
    expect([...MG1_RUNTIME_PROJECTILE_KEYS].sort()).toEqual(registeredProjectiles);
    expect([...MG1_RUNTIME_VFX_KEYS].sort()).toEqual(MG1_SIDEOPS_VFX_ASSETS.map((asset) => asset.textureKey).sort());
  });

  it('locks the special boss rules instead of inheriting generic humanoid behavior', () => {
    const brad = MG1_ENCOUNTER_SEQUENCE.find((encounter) => encounter.id === 'bloody_brad_pair')!;
    const duck = MG1_ENCOUNTER_SEQUENCE.find((encounter) => encounter.id === 'dirty_duck')!;
    const bulldozer = MG1_ENCOUNTER_SEQUENCE.find((encounter) => encounter.id === 'bulldozer')!;
    const tx55 = MG1_ENCOUNTER_SEQUENCE.find((encounter) => encounter.id === 'tx55_metal_gear')!;
    const hind = MG1_ENCOUNTER_SEQUENCE.find((encounter) => encounter.id === 'hind_d')!;

    expect(brad.unitCount).toBe(2);
    expect(isMg1EncounterDefeated(brad, 1)).toBe(false);
    expect(isMg1EncounterDefeated(brad, 2)).toBe(true);
    expect(duck.rules).toMatchObject({ protectedHostages: 3, enemyFireTargetsHostages: false, firesProjectiles: true });
    expect(duck.enemyProjectileTextureKey).toBe('mg1Boomerang');
    expect(bulldozer).toMatchObject({ textureKey: 'mg1Bulldozer', behavior: 'bulldozer', requiredPlayerAttack: 'grenade_launcher' });
    expect(bulldozer.rules).toMatchObject({ crushesPlayer: true, firesProjectiles: false });
    expect(hind.rules.airborne).toBe(true);
    expect(hind.enemyProjectileTextureKey).toBe('mg1EnemyTracer');
    expect(tx55.rules).toMatchObject({ stationary: true, firesProjectiles: false });
    expect('enemyProjectileTextureKey' in tx55 ? tx55.enemyProjectileTextureKey : undefined).toBeUndefined();
    expect(tx55.requiredPlayerAttack).toBe('plastic_explosive');
    expect(tx55.rules.orderedLegSequence).toEqual(MG1_TX55_LEG_SEQUENCE);
    expect(MG1_TX55_LEG_SEQUENCE).toEqual([
      'right', 'right', 'left', 'right', 'left', 'left', 'right', 'left',
      'left', 'right', 'right', 'left', 'right', 'left', 'right', 'right'
    ]);
  });

  it('enforces the MG1 display limits for bullets, mines and plastic explosives', () => {
    expect(MG1_MAX_SIMULTANEOUS_PLAYER_BULLETS).toBe(4);
    expect(MG1_MAX_ONSCREEN_LANDMINES).toBe(3);
    expect(MG1_MAX_ONSCREEN_PLASTIC_EXPLOSIVES).toBe(1);
    expect(MG1_OUTER_HEAVEN_WORLD.startChaff).toBe(0);
  });

  it('keeps gun cameras mobile and gives each one the dedicated laser projectile', () => {
    const cameras = MG1_HAZARD_SEQUENCE.filter((hazard) => hazard.behavior === 'gun_camera');
    expect(cameras).toHaveLength(3);
    cameras.forEach((camera) => {
      expect(camera.patrolMin).toBeLessThan(camera.patrolMax);
      expect(camera.projectileTextureKey).toBe('mg1GunCameraLaser');
    });
  });

  it('penalizes each harmed Dirty Duck hostage and withholds only the clean-rescue objective', () => {
    expect(MG1_HOSTAGE_HARM_STEALTH_PENALTY).toBe(300);
    expect(getMg1HostageStealthPenalty(0)).toBe(0);
    expect(getMg1HostageStealthPenalty(2)).toBe(600);
    expect(shouldCreditMg1EncounterObjective('dirty_duck', 0)).toBe(true);
    expect(shouldCreditMg1EncounterObjective('dirty_duck', 1)).toBe(false);
    expect(shouldCreditMg1EncounterObjective('big_boss', 3)).toBe(true);
  });
});

describe('Operation Intrude N313 encounter flow', () => {
  it('does not activate an arena before its threshold and advances only after completion', () => {
    let state = createMg1EncounterFlowState();
    state = activateNextMg1Encounter(state, MG1_ENCOUNTER_SEQUENCE[0].activationX - 1);
    expect(state.activeEncounterIndex).toBeNull();
    state = activateNextMg1Encounter(state, MG1_ENCOUNTER_SEQUENCE[0].activationX);
    expect(state.activeEncounterIndex).toBe(0);
    expect(activateNextMg1Encounter(state, MG1_OUTER_HEAVEN_WORLD.worldWidth).activeEncounterIndex).toBe(0);
    state = completeActiveMg1Encounter(state);
    expect(state.defeatedEncounterIds).toEqual(['shotmaker']);
    expect(state.activeEncounterIndex).toBeNull();
  });

  it('resets an incorrect TX-55 leg input and accepts all sixteen correct charges', () => {
    let state = completeEncountersBefore(8);
    state = activateNextMg1Encounter(state, MG1_ENCOUNTER_SEQUENCE[8].activationX);
    expect(state.activeEncounterIndex).toBe(8);

    let result = registerMg1Tx55Charge(state, 'right');
    state = result.state;
    result = registerMg1Tx55Charge(state, 'right');
    state = result.state;
    result = registerMg1Tx55Charge(state, 'right');
    expect(result.accepted).toBe(false);
    expect(result.expectedLeg).toBe('left');
    expect(result.state.tx55ChargeIndex).toBe(0);

    state = result.state;
    MG1_TX55_LEG_SEQUENCE.forEach((leg, index) => {
      const charge = registerMg1Tx55Charge(state, leg);
      expect(charge.accepted).toBe(true);
      expect(charge.sequenceComplete).toBe(index === MG1_TX55_LEG_SEQUENCE.length - 1);
      state = charge.state;
    });
    expect(state.tx55ChargeIndex).toBe(16);
  });

  it('requires Big Boss after TX-55 and unlocks extraction only after the final duel', () => {
    let state = completeEncountersBefore(8);
    state = activateNextMg1Encounter(state, MG1_ENCOUNTER_SEQUENCE[8].activationX);
    for (const leg of MG1_TX55_LEG_SEQUENCE) state = registerMg1Tx55Charge(state, leg).state;
    state = completeActiveMg1Encounter(state);
    expect(state.defeatedEncounterIds[state.defeatedEncounterIds.length - 1]).toBe('tx55_metal_gear');
    expect(isMg1ExtractionUnlocked(state)).toBe(false);

    state = activateNextMg1Encounter(state, MG1_ENCOUNTER_SEQUENCE[9].activationX);
    expect(state.activeEncounterIndex).toBe(9);
    state = completeActiveMg1Encounter(state);
    expect(state.defeatedEncounterIds[state.defeatedEncounterIds.length - 1]).toBe('big_boss');
    expect(isMg1ExtractionUnlocked(state)).toBe(true);
  });

  it('creates a clean restart state', () => {
    const progressed = completeEncountersBefore(3);
    expect(progressed.defeatedEncounterIds).toHaveLength(3);
    expect(createMg1EncounterFlowState()).toEqual({ activeEncounterIndex: null, defeatedEncounterIds: [], tx55ChargeIndex: 0 });
  });
});
