import type { EraId } from './codec.types';

export type VrMissionCategory = 'time_attack' | 'no_alert' | 'weapon_training' | 'cqc' | 'surveillance' | 'boss_challenge';
export type VrRank = 'BIG BOSS' | 'FOXHOUND' | 'FOX' | 'HOUND' | 'RAT' | 'ROOKIE';

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
  requiredTool?: 'socom' | 'cqc' | 'chaff' | 'stealth' | 'mixed';
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
