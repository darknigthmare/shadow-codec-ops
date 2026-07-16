import type { EraId } from './codec.types';

export type VrMissionCategory =
  | 'time_attack'
  | 'no_alert'
  | 'weapon_training'
  | 'cqc'
  | 'surveillance'
  | 'boss_challenge'
  | 'special_ninja'
  | 'special_mystery';
export type VrRank = 'BIG BOSS' | 'FOXHOUND' | 'FOX' | 'HOUND' | 'RAT' | 'ROOKIE';

/** The eight main weapons represented by the MGS1 VR weapon drills. */
export type Mgs1VrWeaponId =
  | 'socom'
  | 'famas'
  | 'psg1'
  | 'grenade'
  | 'c4'
  | 'claymore'
  | 'stinger'
  | 'nikita';

/** Target names are kept exactly as listed in Konami's VR Training manual. */
export type Mgs1VrTargetFamily =
  | 'CUBE-B'
  | 'CUBE-R'
  | 'KOKESHI-B'
  | 'KOKESHI-G'
  | 'MOVE-B'
  | 'MOVE-R'
  | 'WALL'
  | 'UFO';

export interface Mgs1VrTargetBehaviorFlags {
  moving: boolean;
  explosive: boolean;
  flying: boolean;
  /** Marks WALL-style destructible obstructions, not ordinary target clearance. */
  destructible: boolean;
}

export interface Mgs1VrMissionProfile extends Mgs1VrTargetBehaviorFlags {
  id: string;
  missionId: string;
  mode: 'weapon' | 'special';
  weapon: Mgs1VrWeaponId | null;
  targetFamily: Mgs1VrTargetFamily;
  targetCount: number;
  manualBehavior: string;
}

export type Mgs1VrSpecialModeId = 'ninja' | 'mystery';

export type Mgs1VrNinjaObjectiveKind =
  | 'slice_poles'
  | 'eliminate_guards'
  | 'assassinate_disguised_snake';

export type Mgs1VrMysteryResolutionKind =
  | 'match_visible_evidence'
  | 'inspect_cold_breath'
  | 'test_nearsightedness'
  | 'track_fleeing_suspect'
  | 'compare_fall_reaction'
  | 'follow_footprints'
  | 'inspect_heartbeat'
  | 'use_liquid_disguise'
  | 'wait_for_ketchup_reveal';

/** Evidence vocabulary represented by the dedicated Mystery prop atlas. */
export type Mgs1VrMysteryEvidenceId =
  | 'broken_camera'
  | 'black_mask'
  | 'pink_sock'
  | 'blue_popsicle'
  | 'round_spectacles'
  | 'blond_wig'
  | 'dying_message_panel'
  | 'footprint_trail'
  | 'broken_vase'
  | 'broken_chair'
  | 'rifle'
  | 'grandfather_clock'
  | 'smashed_monitor'
  | 'ketchup_bottle'
  | 'room_key'
  | 'framed_photo_and_mask';

export type Mgs1VrMysteryTellId =
  | 'head_bruise'
  | 'sock_on_head'
  | 'no_cold_breath'
  | 'walks_into_wall'
  | 'fleeing_route'
  | 'different_fall_pattern'
  | 'matching_footprints'
  | 'rapid_heartbeat'
  | 'salutes_liquid'
  | 'ketchup_fake_death';

export interface Mgs1VrSpecialProfileBase {
  id: string;
  missionId: string;
  mode: Mgs1VrSpecialModeId;
  level: number;
  playerActor: 'cyborg_ninja' | 'solid_snake';
  manualBehavior: string;
}

export interface Mgs1VrNinjaMissionProfile extends Mgs1VrSpecialProfileBase {
  mode: 'ninja';
  objectiveKind: Mgs1VrNinjaObjectiveKind;
  targetCount: number;
  guardCount: number;
  stealthAvailable: boolean;
  instantFailOnAlert: boolean;
  instantFailOnWrongTarget: boolean;
}

export interface Mgs1VrMysteryMissionProfile extends Mgs1VrSpecialProfileBase {
  mode: 'mystery';
  caseTitle: string;
  resolutionKind: Mgs1VrMysteryResolutionKind;
  evidenceIds: readonly Mgs1VrMysteryEvidenceId[];
  suspectCount: number;
  /** Zero-based deterministic slot used by the local 2D adaptation; null means no arrest. */
  culpritIndex: number | null;
  culpritTell: Mgs1VrMysteryTellId;
  clue: string;
  solution: string;
  requiresEscort: boolean;
  playerDisguise?: 'liquid_snake';
  /** The original sealed-room punchline occurs after roughly three minutes. */
  revealDelaySeconds?: number;
}

export type Mgs1VrSpecialMissionProfile = Mgs1VrNinjaMissionProfile | Mgs1VrMysteryMissionProfile;

export type Mgs1VrPhotoshootModelId = 'naomi_hunter' | 'mei_ling';

/** EXTRA content is deliberately separate from the numbered VR stage list. */
export interface Mgs1VrPhotoshootExtra {
  id: string;
  mode: 'photoshoot';
  modelId: Mgs1VrPhotoshootModelId;
  modelName: string;
  textureKey: string;
  title: string;
  objective: string;
  unlockCondition: string;
  distanceRule: 'rank_based';
  sessionTimeRule: 'rank_based';
  albumStorageKey: string;
}

export type VrRequiredTool =
  | Mgs1VrWeaponId
  | 'cqc'
  | 'chaff'
  | 'stealth'
  | 'mixed'
  | 'hf_blade'
  | 'investigation';

export interface VrMissionRequirement {
  targetTimeSeconds?: number;
  maxAlerts?: number;
  minKills?: number;
  maxKills?: number;
  maxDamage?: number;
  maxRations?: number;
  minNeutralizations?: number;
  minShotsFired?: number;
  maxShotsFired?: number;
  minCamerasDisabled?: number;
  minObjectivesCompleted?: number;
  bossDefeated?: boolean;
  requiredTool?: VrRequiredTool;
}

export interface VrMissionReward {
  tapeId?: string;
  unlockRank: VrRank;
  badge: string;
  description: string;
}

export interface VrMissionDefinition {
  id: string;
  title: string;
  subtitle: string;
  era: EraId;
  visualPack: string;
  category: VrMissionCategory;
  difficulty: number;
  mapVariant: string;
  /** Optional structured runtime profile for canonical MGS1 VR target drills. */
  missionProfileId?: string;
  objective: string;
  briefing: string;
  restrictions: string[];
  recommendedGear: string[];
  requirements: VrMissionRequirement;
  rewards: VrMissionReward[];
}

export interface VrRunStats {
  timeSeconds: number;
  alerts: number;
  shotsFired: number;
  hits: number;
  kills: number;
  neutralizations: number;
  damageTaken: number;
  rationsUsed: number;
  camerasDisabled: number;
  objectivesCompleted: number;
  secretsFound: number;
  bossDefeated: boolean;
}

export interface VrMissionRecord extends VrRunStats {
  missionId: string;
  completedAt: string;
  success: boolean;
  score: number;
  rank: VrRank;
  accuracy: number;
  unlockedTapeIds: string[];
}

export interface VrMissionProgress {
  records: VrMissionRecord[];
  unlockedTapeIds: string[];
  unlockedBadges: string[];
  activeMissionId?: string;
}

export interface VrRunEvaluation {
  success: boolean;
  score: number;
  rank: VrRank;
  accuracy: number;
  failures: string[];
  unlockedTapeIds: string[];
  unlockedBadges: string[];
}
