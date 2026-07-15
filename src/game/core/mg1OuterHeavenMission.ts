export const MG1_OUTER_HEAVEN_MISSION_ID = 'outer_heaven_intrude_n313' as const;

export type Mg1Leg = 'left' | 'right';

export type Mg1PlayerAttack =
  | 'handgun'
  | 'remote_missile'
  | 'grenade_launcher'
  | 'landmine'
  | 'rocket_launcher'
  | 'plastic_explosive';

export type Mg1EncounterBehavior =
  | 'shotgun'
  | 'machinegun'
  | 'aircraft'
  | 'tank'
  | 'bulldozer'
  | 'flamethrower'
  | 'dual_cyborg'
  | 'hostage_boomerang'
  | 'tx55_sabotage'
  | 'final_duel';

export interface Mg1EncounterDefinition {
  id: string;
  bossDataId: string;
  name: string;
  arenaX: number;
  activationX: number;
  gateX: number;
  textureKey: string;
  unitCount: number;
  hpPerUnit: number;
  behavior: Mg1EncounterBehavior;
  requiredPlayerAttack: Mg1PlayerAttack;
  playerWeaponTextureKey: string;
  enemyProjectileTextureKey?: string;
  contactDamage: number;
  fireIntervalMs?: number;
  rules: {
    airborne?: true;
    stationary?: true;
    firesProjectiles: boolean;
    crushesPlayer?: true;
    protectedHostages?: number;
    enemyFireTargetsHostages?: false;
    orderedLegSequence?: readonly Mg1Leg[];
  };
}

/**
 * Dr Pettrovich's sixteen-charge pattern, read from Snake's point of view.
 * TX-55 is an inert sabotage target in MG1: it never walks or shoots.
 */
export const MG1_TX55_LEG_SEQUENCE = [
  'right', 'right', 'left', 'right', 'left', 'left', 'right', 'left',
  'left', 'right', 'right', 'left', 'right', 'left', 'right', 'right'
] as const satisfies readonly Mg1Leg[];

/** Canonical MSX boss order. Bloody Brad is one encounter with two TX-11 units. */
export const MG1_ENCOUNTER_SEQUENCE = [
  {
    id: 'shotmaker', bossDataId: 'shotmaker_mg1', name: 'Shotmaker', arenaX: 1850, activationX: 1500, gateX: 2240,
    textureKey: 'mg1Shotmaker', unitCount: 1, hpPerUnit: 4, behavior: 'shotgun', requiredPlayerAttack: 'remote_missile',
    playerWeaponTextureKey: 'mg1RemoteMissile', enemyProjectileTextureKey: 'mg1ShotgunPellet', contactDamage: 12, fireIntervalMs: 1250,
    rules: { firesProjectiles: true }
  },
  {
    id: 'machinegun_kid', bossDataId: 'machinegun_kid_mg1', name: 'Machinegun Kid', arenaX: 2850, activationX: 2500, gateX: 3240,
    textureKey: 'mg1MachinegunKid', unitCount: 1, hpPerUnit: 8, behavior: 'machinegun', requiredPlayerAttack: 'handgun',
    playerWeaponTextureKey: 'mg1HandgunBullet', enemyProjectileTextureKey: 'mg1EnemyTracer', contactDamage: 12, fireIntervalMs: 980,
    rules: { firesProjectiles: true }
  },
  {
    id: 'hind_d', bossDataId: 'hind_d_mg1', name: 'Hind D', arenaX: 3850, activationX: 3500, gateX: 4240,
    textureKey: 'mg1HindD', unitCount: 1, hpPerUnit: 6, behavior: 'aircraft', requiredPlayerAttack: 'grenade_launcher',
    playerWeaponTextureKey: 'mg1Grenade', enemyProjectileTextureKey: 'mg1EnemyTracer', contactDamage: 18, fireIntervalMs: 1450,
    rules: { airborne: true, firesProjectiles: true }
  },
  {
    id: 'outer_heaven_tank', bossDataId: 'outer_heaven_tank_mg1', name: 'Outer Heaven Tank', arenaX: 4850, activationX: 4500, gateX: 5240,
    textureKey: 'mg1Tank', unitCount: 1, hpPerUnit: 6, behavior: 'tank', requiredPlayerAttack: 'landmine',
    playerWeaponTextureKey: 'mg1Mine', enemyProjectileTextureKey: 'mg1TankShell', contactDamage: 100, fireIntervalMs: 1600,
    rules: { firesProjectiles: true, crushesPlayer: true }
  },
  {
    id: 'bulldozer', bossDataId: 'bulldozer_mg1', name: 'Bulldozer', arenaX: 5850, activationX: 5500, gateX: 6240,
    textureKey: 'mg1Bulldozer', unitCount: 1, hpPerUnit: 8, behavior: 'bulldozer', requiredPlayerAttack: 'grenade_launcher',
    playerWeaponTextureKey: 'mg1Grenade', contactDamage: 100,
    rules: { firesProjectiles: false, crushesPlayer: true }
  },
  {
    id: 'fire_trooper', bossDataId: 'fire_trooper_mg1', name: 'Fire Trooper', arenaX: 6850, activationX: 6500, gateX: 7240,
    textureKey: 'mg1FireTrooper', unitCount: 1, hpPerUnit: 8, behavior: 'flamethrower', requiredPlayerAttack: 'handgun',
    playerWeaponTextureKey: 'mg1HandgunBullet', enemyProjectileTextureKey: 'mg1Flame', contactDamage: 14, fireIntervalMs: 1350,
    rules: { firesProjectiles: true }
  },
  {
    id: 'bloody_brad_pair', bossDataId: 'bloody_brad_mg1', name: 'Bloody Brad (TX-11 pair)', arenaX: 7850, activationX: 7500, gateX: 8240,
    textureKey: 'mg1BloodyBrad', unitCount: 2, hpPerUnit: 4, behavior: 'dual_cyborg', requiredPlayerAttack: 'rocket_launcher',
    playerWeaponTextureKey: 'mg1Rocket', contactDamage: 18,
    rules: { firesProjectiles: false }
  },
  {
    id: 'dirty_duck', bossDataId: 'dirty_duck_mg1', name: 'Dirty Duck', arenaX: 8850, activationX: 8500, gateX: 9240,
    textureKey: 'mg1DirtyDuck', unitCount: 1, hpPerUnit: 8, behavior: 'hostage_boomerang', requiredPlayerAttack: 'handgun',
    playerWeaponTextureKey: 'mg1HandgunBullet', enemyProjectileTextureKey: 'mg1Boomerang', contactDamage: 12, fireIntervalMs: 1300,
    rules: { firesProjectiles: true, protectedHostages: 3, enemyFireTargetsHostages: false }
  },
  {
    id: 'tx55_metal_gear', bossDataId: 'tx55_metal_gear_mg1', name: 'Metal Gear TX-55', arenaX: 10000, activationX: 9600, gateX: 10440,
    textureKey: 'mg1Tx55', unitCount: 1, hpPerUnit: MG1_TX55_LEG_SEQUENCE.length, behavior: 'tx55_sabotage', requiredPlayerAttack: 'plastic_explosive',
    playerWeaponTextureKey: 'mg1PlasticExplosive', contactDamage: 0,
    rules: { stationary: true, firesProjectiles: false, orderedLegSequence: MG1_TX55_LEG_SEQUENCE }
  },
  {
    id: 'big_boss', bossDataId: 'big_boss_mg1', name: 'Big Boss', arenaX: 11200, activationX: 10800, gateX: 11620,
    textureKey: 'mg1BigBoss', unitCount: 1, hpPerUnit: 8, behavior: 'final_duel', requiredPlayerAttack: 'rocket_launcher',
    playerWeaponTextureKey: 'mg1Rocket', enemyProjectileTextureKey: 'mg1EnemyTracer', contactDamage: 18, fireIntervalMs: 820,
    rules: { firesProjectiles: true }
  }
] as const satisfies readonly Mg1EncounterDefinition[];

export type Mg1HazardBehavior = 'guard' | 'air_trooper' | 'attack_dog' | 'scorpion' | 'gun_camera';

export interface Mg1HazardDefinition {
  id: string;
  behavior: Mg1HazardBehavior;
  textureKey: string;
  x: number;
  y: number;
  patrolMin: number;
  patrolMax: number;
  hp: number;
  contactDamage: number;
  projectileTextureKey?: string;
}

export const MG1_HAZARD_SEQUENCE = [
  { id: 'outer_heaven_guard_entry', behavior: 'guard', textureKey: 'mg1Guard', x: 520, y: 454, patrolMin: 400, patrolMax: 700, hp: 1, contactDamage: 8, projectileTextureKey: 'mg1EnemyTracer' },
  { id: 'gun_camera_entry', behavior: 'gun_camera', textureKey: 'mg1GunCamera', x: 1320, y: 245, patrolMin: 1230, patrolMax: 1410, hp: 2, contactDamage: 0, projectileTextureKey: 'mg1GunCameraLaser' },
  { id: 'air_trooper_roof', behavior: 'air_trooper', textureKey: 'mg1AirTrooper', x: 2420, y: 250, patrolMin: 2310, patrolMax: 2570, hp: 2, contactDamage: 10, projectileTextureKey: 'mg1EnemyTracer' },
  { id: 'attack_dog_yard', behavior: 'attack_dog', textureKey: 'mg1AttackDog', x: 4380, y: 472, patrolMin: 4270, patrolMax: 4480, hp: 2, contactDamage: 14 },
  { id: 'scorpion_desert', behavior: 'scorpion', textureKey: 'mg1Scorpion', x: 6320, y: 486, patrolMin: 6240, patrolMax: 6420, hp: 1, contactDamage: 7 },
  { id: 'gun_camera_tx55_left', behavior: 'gun_camera', textureKey: 'mg1GunCamera', x: 9700, y: 235, patrolMin: 9620, patrolMax: 9780, hp: 2, contactDamage: 0, projectileTextureKey: 'mg1GunCameraLaser' },
  { id: 'gun_camera_tx55_right', behavior: 'gun_camera', textureKey: 'mg1GunCamera', x: 10300, y: 235, patrolMin: 10220, patrolMax: 10380, hp: 2, contactDamage: 0, projectileTextureKey: 'mg1GunCameraLaser' }
] as const satisfies readonly Mg1HazardDefinition[];

export const MG1_NPC_CHECKPOINTS = [
  { id: 'resistance_schneider', textureKey: 'mg1Schneider', x: 760, y: 454, label: 'SCHNEIDER' },
  { id: 'rescue_gray_fox', textureKey: 'mg1GreyFox', x: 1050, y: 454, label: 'GRAY FOX' },
  { id: 'resistance_diane', textureKey: 'mg1Diane', x: 5400, y: 454, label: 'DIANE' },
  { id: 'rescue_pettrovich', textureKey: 'mg1Pettrovich', x: 7320, y: 454, label: 'DR PETTROVICH' },
  { id: 'rescue_elen', textureKey: 'mg1Elen', x: 7380, y: 454, label: 'ELEN' },
  { id: 'inside_agent_jennifer', textureKey: 'mg1Jennifer', x: 9400, y: 454, label: 'JENNIFER' }
] as const;

export const MG1_RUNTIME_PROJECTILE_KEYS = [
  'mg1HandgunBullet', 'mg1EnemyTracer', 'mg1ShotgunPellet', 'mg1Grenade', 'mg1RemoteMissile', 'mg1Rocket',
  'mg1Boomerang', 'mg1Flame', 'mg1Mine', 'mg1PlasticExplosive', 'mg1TankShell', 'mg1GunCameraLaser'
] as const;

export const MG1_RUNTIME_VFX_KEYS = [
  'mg1MuzzleFlashVfx', 'mg1BulletImpactVfx', 'mg1MetalSparksVfx', 'mg1FlameImpactVfx',
  'mg1ExplosionSmallVfx', 'mg1ExplosionLargeVfx', 'mg1SmokePlumeVfx', 'mg1DustPuffVfx', 'mg1LaserImpactVfx'
] as const;

export const MG1_MAX_SIMULTANEOUS_PLAYER_BULLETS = 4 as const;
export const MG1_MAX_ONSCREEN_LANDMINES = 3 as const;
export const MG1_MAX_ONSCREEN_PLASTIC_EXPLOSIVES = 1 as const;
export const MG1_HOSTAGE_HARM_STEALTH_PENALTY = 300 as const;

export function getMg1HostageStealthPenalty(hostagesHarmed: number): number {
  return Math.max(0, Math.floor(hostagesHarmed)) * MG1_HOSTAGE_HARM_STEALTH_PENALTY;
}

export function shouldCreditMg1EncounterObjective(encounterId: string, hostagesHarmed: number): boolean {
  return encounterId !== 'dirty_duck' || hostagesHarmed === 0;
}

export const MG1_OUTER_HEAVEN_WORLD = {
  worldWidth: 12350,
  groundY: 500,
  start: { x: 90, y: 454 },
  keycard: { x: 930, y: 430 },
  door: { x: 1220, y: 462 },
  extraction: { x: 12150, y: 470 },
  startAmmo: 24,
  maxAmmo: 40,
  startRations: 2,
  // Chaff was introduced later in the series and is not part of MG1's loadout.
  startChaff: 0,
  totalObjectives: MG1_ENCOUNTER_SEQUENCE.length + 3
} as const;

export interface Mg1EncounterFlowState {
  activeEncounterIndex: number | null;
  defeatedEncounterIds: readonly string[];
  tx55ChargeIndex: number;
}

export function createMg1EncounterFlowState(): Mg1EncounterFlowState {
  return { activeEncounterIndex: null, defeatedEncounterIds: [], tx55ChargeIndex: 0 };
}

export function activateNextMg1Encounter(state: Mg1EncounterFlowState, playerX: number): Mg1EncounterFlowState {
  if (state.activeEncounterIndex !== null) return state;
  const nextIndex = state.defeatedEncounterIds.length;
  const next = MG1_ENCOUNTER_SEQUENCE[nextIndex];
  if (!next || playerX < next.activationX) return state;
  return { ...state, activeEncounterIndex: nextIndex, tx55ChargeIndex: next.id === 'tx55_metal_gear' ? 0 : state.tx55ChargeIndex };
}

export function completeActiveMg1Encounter(state: Mg1EncounterFlowState): Mg1EncounterFlowState {
  if (state.activeEncounterIndex === null) return state;
  const encounter = MG1_ENCOUNTER_SEQUENCE[state.activeEncounterIndex];
  if (!encounter || state.defeatedEncounterIds.includes(encounter.id)) return state;
  return {
    activeEncounterIndex: null,
    defeatedEncounterIds: [...state.defeatedEncounterIds, encounter.id],
    tx55ChargeIndex: state.tx55ChargeIndex
  };
}

export function isMg1EncounterDefeated(encounter: Mg1EncounterDefinition, defeatedUnitCount: number): boolean {
  return defeatedUnitCount >= encounter.unitCount;
}

export function registerMg1Tx55Charge(
  state: Mg1EncounterFlowState,
  leg: Mg1Leg
): { state: Mg1EncounterFlowState; accepted: boolean; sequenceComplete: boolean; expectedLeg: Mg1Leg } {
  const expectedLeg = MG1_TX55_LEG_SEQUENCE[state.tx55ChargeIndex] ?? MG1_TX55_LEG_SEQUENCE[0];
  if (state.activeEncounterIndex === null || MG1_ENCOUNTER_SEQUENCE[state.activeEncounterIndex]?.id !== 'tx55_metal_gear') {
    return { state, accepted: false, sequenceComplete: false, expectedLeg };
  }
  if (leg !== expectedLeg) {
    return { state: { ...state, tx55ChargeIndex: 0 }, accepted: false, sequenceComplete: false, expectedLeg };
  }
  const tx55ChargeIndex = state.tx55ChargeIndex + 1;
  return {
    state: { ...state, tx55ChargeIndex },
    accepted: true,
    sequenceComplete: tx55ChargeIndex === MG1_TX55_LEG_SEQUENCE.length,
    expectedLeg
  };
}

export function isMg1ExtractionUnlocked(state: Mg1EncounterFlowState): boolean {
  return state.defeatedEncounterIds.length === MG1_ENCOUNTER_SEQUENCE.length;
}

export function getActiveMg1Encounter(state: Mg1EncounterFlowState): Mg1EncounterDefinition | null {
  return state.activeEncounterIndex === null ? null : MG1_ENCOUNTER_SEQUENCE[state.activeEncounterIndex] ?? null;
}

export function getMg1ObjectiveLabel(state: Mg1EncounterFlowState, hasAccessCard: boolean): string {
  if (!hasAccessCard) return 'Establish resistance contact and recover the access card';
  const active = getActiveMg1Encounter(state);
  if (active?.id === 'tx55_metal_gear') {
    const nextLeg = MG1_TX55_LEG_SEQUENCE[state.tx55ChargeIndex] ?? 'right';
    return `Sabotage TX-55 legs: ${state.tx55ChargeIndex}/16 - next ${nextLeg.toUpperCase()}`;
  }
  if (active) return `Defeat ${active.name}`;
  const next = MG1_ENCOUNTER_SEQUENCE[state.defeatedEncounterIds.length];
  return next ? `Advance to ${next.name}` : 'Escape Outer Heaven';
}
