import type { EraId } from './codec.types';

export type VrMissionCategory = 'time_attack' | 'no_alert' | 'weapon_training' | 'cqc' | 'surveillance' | 'boss_challenge';
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

export type VrRequiredTool = Mgs1VrWeaponId | 'cqc' | 'chaff' | 'stealth' | 'mixed';

export interface VrMissionRequirement {
  targetTimeSeconds?: number;
  maxAlerts?: number;
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
