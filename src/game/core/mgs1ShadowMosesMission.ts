import type { Mgs1ActorAnimationState } from './mgs1ActorAnimationRegistry';

export const MGS1_SHADOW_MOSES_MISSION_ID = 'shadow_dock_001' as const;

export type Mgs1BossBehavior =
  | 'ricochet'
  | 'tank'
  | 'ninja'
  | 'psychic'
  | 'sniper'
  | 'aircraft'
  | 'vulcan'
  | 'rex'
  | 'final_duel';

export interface Mgs1BossAttackPattern {
  readonly id: string;
  readonly projectileTextureKey: string;
  readonly vfxTextureKey: string;
  readonly actionClip: Mgs1ActorAnimationState;
  readonly intervalMs: number;
  readonly speed: number;
  readonly damage: number;
}

export interface Mgs1BossEncounterDefinition {
  readonly id: string;
  readonly name: string;
  readonly behavior: Mgs1BossBehavior;
  readonly textureKey: string;
  readonly activationX: number;
  readonly arenaX: number;
  readonly gateX: number;
  readonly y: number;
  readonly hp: number;
  readonly contactDamage: number;
  readonly airborne?: true;
  readonly stationary?: true;
  /** Signature clip is played on entry even before the first attack window. */
  readonly signatureClip: Mgs1ActorAnimationState;
  readonly attacks: readonly Mgs1BossAttackPattern[];
}

/**
 * Condensed Shadow Moses boss route. Decoy Octopus is deliberately excluded:
 * Snake never fights him in MGS1, and his DARPA Chief disguise is handled as a
 * narrative checkpoint below.
 */
export const MGS1_BOSS_SEQUENCE = [
  {
    id: 'revolver_ocelot', name: 'Revolver Ocelot', behavior: 'ricochet', textureKey: 'mgs1RevolverOcelot',
    activationX: 1150, arenaX: 1450, gateX: 1810, y: 452, hp: 5, contactDamage: 10, signatureClip: 'reload',
    attacks: [
      { id: 'single_action_ricochet', projectileTextureKey: 'mgs1OcelotRound', vfxTextureKey: 'mgs1MuzzleFlashVfx', actionClip: 'attack', intervalMs: 1050, speed: 410, damage: 10 }
    ]
  },
  {
    id: 'm1_tank', name: 'M1 Tank', behavior: 'tank', textureKey: 'mgs1M1Tank',
    activationX: 2250, arenaX: 2550, gateX: 2940, y: 458, hp: 7, contactDamage: 35, stationary: true, signatureClip: 'attack',
    attacks: [
      { id: 'main_cannon', projectileTextureKey: 'mgs1TankShell', vfxTextureKey: 'mgs1GrenadeExplosionVfx', actionClip: 'attack', intervalMs: 1450, speed: 290, damage: 22 }
    ]
  },
  {
    id: 'cyborg_ninja', name: 'Cyborg Ninja', behavior: 'ninja', textureKey: 'mgs1CyborgNinja',
    activationX: 3750, arenaX: 4050, gateX: 4410, y: 448, hp: 7, contactDamage: 18, signatureClip: 'vanish',
    attacks: [
      { id: 'high_frequency_slash', projectileTextureKey: 'mgs1NinjaSlash', vfxTextureKey: 'mgs1NinjaElectricVfx', actionClip: 'slash', intervalMs: 820, speed: 470, damage: 15 }
    ]
  },
  {
    id: 'psycho_mantis', name: 'Psycho Mantis', behavior: 'psychic', textureKey: 'mgs1PsychoMantis',
    activationX: 4850, arenaX: 5150, gateX: 5510, y: 385, hp: 8, contactDamage: 12, airborne: true, signatureClip: 'psychic',
    attacks: [
      { id: 'telekinetic_orb', projectileTextureKey: 'mgs1MantisPsychicOrb', vfxTextureKey: 'mgs1MantisPsychicWaveVfx', actionClip: 'psychic', intervalMs: 1180, speed: 260, damage: 14 }
    ]
  },
  {
    id: 'sniper_wolf', name: 'Sniper Wolf', behavior: 'sniper', textureKey: 'mgs1SniperWolf',
    activationX: 6050, arenaX: 6350, gateX: 6710, y: 452, hp: 7, contactDamage: 12, stationary: true, signatureClip: 'snipe',
    attacks: [
      { id: 'psg1_shot', projectileTextureKey: 'mgs1WolfRound', vfxTextureKey: 'mgs1SnowPuffVfx', actionClip: 'snipe', intervalMs: 1350, speed: 650, damage: 24 }
    ]
  },
  {
    id: 'hind_d', name: 'Hind D', behavior: 'aircraft', textureKey: 'mgs1HindD',
    activationX: 7250, arenaX: 7550, gateX: 7940, y: 260, hp: 9, contactDamage: 30, airborne: true, signatureClip: 'attack',
    attacks: [
      { id: 'hind_rocket_salvo', projectileTextureKey: 'mgs1HindRocket', vfxTextureKey: 'mgs1RotorWashVfx', actionClip: 'attack', intervalMs: 1250, speed: 330, damage: 20 }
    ]
  },
  {
    id: 'vulcan_raven', name: 'Vulcan Raven', behavior: 'vulcan', textureKey: 'mgs1VulcanRaven',
    activationX: 8550, arenaX: 8850, gateX: 9210, y: 444, hp: 10, contactDamage: 22, signatureClip: 'attack',
    attacks: [
      { id: 'm61_vulcan_burst', projectileTextureKey: 'mgs1VulcanTracer', vfxTextureKey: 'mgs1FirePlumeVfx', actionClip: 'attack', intervalMs: 760, speed: 520, damage: 12 }
    ]
  },
  {
    id: 'metal_gear_rex', name: 'Metal Gear REX', behavior: 'rex', textureKey: 'mgs1MetalGearRex',
    activationX: 9850, arenaX: 10200, gateX: 10620, y: 414, hp: 15, contactDamage: 45, stationary: true, signatureClip: 'missile',
    attacks: [
      { id: 'rex_missile', projectileTextureKey: 'mgs1RexMissile', vfxTextureKey: 'mgs1MissileTrailVfx', actionClip: 'missile', intervalMs: 1250, speed: 300, damage: 18 },
      { id: 'rex_laser', projectileTextureKey: 'mgs1RexLaser', vfxTextureKey: 'mgs1RexLaserImpactVfx', actionClip: 'laser', intervalMs: 900, speed: 620, damage: 16 },
      { id: 'rex_railgun', projectileTextureKey: 'mgs1RexRailgunSlug', vfxTextureKey: 'mgs1RexExplosionVfx', actionClip: 'railgun', intervalMs: 1550, speed: 470, damage: 28 }
    ]
  },
  {
    id: 'liquid_snake', name: 'Liquid Snake', behavior: 'final_duel', textureKey: 'mgs1LiquidSnake',
    activationX: 11250, arenaX: 11550, gateX: 11910, y: 448, hp: 10, contactDamage: 20, signatureClip: 'melee',
    attacks: [
      { id: 'jeep_famas_burst', projectileTextureKey: 'mgs1FamasTracer', vfxTextureKey: 'mgs1MuzzleFlashVfx', actionClip: 'melee', intervalMs: 850, speed: 490, damage: 14 }
    ]
  }
] as const satisfies readonly Mgs1BossEncounterDefinition[];

export type Mgs1HazardBehavior = 'genome' | 'heavy' | 'wolfdog' | 'gun_camera';

export interface Mgs1HazardDefinition {
  readonly id: string;
  readonly behavior: Mgs1HazardBehavior;
  readonly textureKey: string;
  readonly x: number;
  readonly y: number;
  readonly patrolMin: number;
  readonly patrolMax: number;
  readonly hp: number;
  readonly contactDamage: number;
  readonly projectileTextureKey?: string;
}

/** All four Genome variants plus the requested animal and security camera. */
export const MGS1_HAZARD_SEQUENCE = [
  { id: 'genome_light_dock', behavior: 'genome', textureKey: 'mgs1GenomeLightInfantry', x: 590, y: 452, patrolMin: 420, patrolMax: 760, hp: 2, contactDamage: 8, projectileTextureKey: 'mgs1FamasTracer' },
  { id: 'gun_camera_heliport', behavior: 'gun_camera', textureKey: 'mgs1GunCamera', x: 2050, y: 250, patrolMin: 1980, patrolMax: 2120, hp: 2, contactDamage: 0, projectileTextureKey: 'mgs1FamasTracer' },
  { id: 'genome_arctic_canyon', behavior: 'genome', textureKey: 'mgs1GenomeArcticTrooper', x: 3180, y: 452, patrolMin: 3050, patrolMax: 3370, hp: 2, contactDamage: 9, projectileTextureKey: 'mgs1FamasTracer' },
  { id: 'genome_nbc_storage', behavior: 'genome', textureKey: 'mgs1GenomeNbcTrooper', x: 4650, y: 452, patrolMin: 4500, patrolMax: 4760, hp: 3, contactDamage: 10, projectileTextureKey: 'mgs1FamasTracer' },
  { id: 'wolfdog_cave', behavior: 'wolfdog', textureKey: 'mgs1WolfDog', x: 5700, y: 472, patrolMin: 5590, patrolMax: 5880, hp: 2, contactDamage: 15 },
  { id: 'genome_heavy_tower', behavior: 'heavy', textureKey: 'mgs1GenomeHeavyTrooper', x: 8150, y: 444, patrolMin: 8030, patrolMax: 8330, hp: 4, contactDamage: 14, projectileTextureKey: 'mgs1VulcanTracer' },
  { id: 'gun_camera_rex_hangar', behavior: 'gun_camera', textureKey: 'mgs1GunCamera', x: 9520, y: 235, patrolMin: 9440, patrolMax: 9600, hp: 2, contactDamage: 0, projectileTextureKey: 'mgs1FamasTracer' }
] as const satisfies readonly Mgs1HazardDefinition[];

export const MGS1_NPC_CHECKPOINTS = [
  { id: 'meryl', name: 'MERYL', textureKey: 'mgs1MerylSilverburgh', x: 1980, y: 452 },
  { id: 'donald_anderson', name: 'DARPA CHIEF', textureKey: 'mgs1DonaldAnderson', x: 3230, y: 452 },
  { id: 'kenneth_baker', name: 'BAKER', textureKey: 'mgs1KennethBaker', x: 3450, y: 452 },
  { id: 'otacon', name: 'OTACON', textureKey: 'mgs1Otacon', x: 4480, y: 452 },
  { id: 'johnny_sasaki', name: 'JOHNNY', textureKey: 'mgs1JohnnySasaki', x: 6920, y: 452 }
] as const;

export const MGS1_DECOY_OCTOPUS_REVEAL = {
  id: 'decoy_octopus_reveal',
  name: 'DECOY OCTOPUS // DARPA CHIEF DISGUISE',
  textureKey: 'mgs1DecoyOctopus',
  x: 3480,
  y: 448
} as const;

export const MGS1_ESCAPE_VEHICLES = [
  { id: 'escape_jeep', name: 'ESCAPE JEEP', textureKey: 'mgs1EscapeJeep', x: 12440, y: 458 },
  { id: 'snowmobile', name: 'SNOWMOBILE', textureKey: 'mgs1Snowmobile', x: 12820, y: 466 }
] as const;

export const MGS1_SHADOW_MOSES_WORLD = {
  worldWidth: 13200,
  groundY: 500,
  start: { x: 90, y: 452 },
  decoyTriggerX: 3340,
  escapeTriggerX: 12300,
  startAmmo: 42,
  maxAmmo: 60,
  startRations: 3,
  startChaff: 3,
  totalObjectives: MGS1_BOSS_SEQUENCE.length + 4
} as const;

export interface Mgs1MissionFlowState {
  readonly activeEncounterIndex: number | null;
  readonly defeatedEncounterIds: readonly string[];
  readonly decoyRevealed: boolean;
  readonly escapeVehiclesDeployed: boolean;
}

export function createMgs1MissionFlowState(): Mgs1MissionFlowState {
  return { activeEncounterIndex: null, defeatedEncounterIds: [], decoyRevealed: false, escapeVehiclesDeployed: false };
}

export function activateNextMgs1Encounter(state: Mgs1MissionFlowState, playerX: number): Mgs1MissionFlowState {
  if (state.activeEncounterIndex !== null) return state;
  const nextIndex = state.defeatedEncounterIds.length;
  const next = MGS1_BOSS_SEQUENCE[nextIndex];
  if (!next || playerX < next.activationX) return state;
  return { ...state, activeEncounterIndex: nextIndex };
}

export function completeActiveMgs1Encounter(state: Mgs1MissionFlowState): Mgs1MissionFlowState {
  if (state.activeEncounterIndex === null) return state;
  const encounter = MGS1_BOSS_SEQUENCE[state.activeEncounterIndex];
  if (!encounter || state.defeatedEncounterIds.includes(encounter.id)) return state;
  return {
    ...state,
    activeEncounterIndex: null,
    defeatedEncounterIds: [...state.defeatedEncounterIds, encounter.id]
  };
}

export function revealMgs1DecoyOctopus(state: Mgs1MissionFlowState, playerX: number): Mgs1MissionFlowState {
  return state.decoyRevealed || playerX < MGS1_SHADOW_MOSES_WORLD.decoyTriggerX
    ? state
    : { ...state, decoyRevealed: true };
}

export function deployMgs1EscapeVehicles(state: Mgs1MissionFlowState): Mgs1MissionFlowState {
  return !isMgs1BossRouteComplete(state) || state.escapeVehiclesDeployed
    ? state
    : { ...state, escapeVehiclesDeployed: true };
}

export function getActiveMgs1Encounter(state: Mgs1MissionFlowState): Mgs1BossEncounterDefinition | null {
  return state.activeEncounterIndex === null ? null : MGS1_BOSS_SEQUENCE[state.activeEncounterIndex] ?? null;
}

export function isMgs1BossRouteComplete(state: Mgs1MissionFlowState): boolean {
  return state.defeatedEncounterIds.length === MGS1_BOSS_SEQUENCE.length;
}

export function isMgs1ExtractionUnlocked(state: Mgs1MissionFlowState): boolean {
  return isMgs1BossRouteComplete(state) && state.decoyRevealed && state.escapeVehiclesDeployed;
}

export function getMgs1ObjectiveLabel(state: Mgs1MissionFlowState): string {
  const active = getActiveMgs1Encounter(state);
  if (active) return `Defeat ${active.name}`;
  const next = MGS1_BOSS_SEQUENCE[state.defeatedEncounterIds.length];
  if (next) return `Advance to ${next.name}`;
  if (!state.escapeVehiclesDeployed) return 'Secure the Shadow Moses escape route';
  return 'Board the escape jeep and reach the snowmobile rendezvous';
}
