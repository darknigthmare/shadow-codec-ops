import { loadJson, saveJson } from './saveEngine';
import type {
  VrMissionDefinition,
  VrMissionProgress,
  VrMissionRecord,
  VrRank,
  VrRunEvaluation,
  VrRunStats
} from '../types/vr.types';

const DEFAULT_VR_PROGRESS: VrMissionProgress = {
  records: [],
  unlockedTapeIds: [],
  unlockedBadges: []
};

const rankOrder: Record<VrRank, number> = {
  ROOKIE: 0,
  RAT: 1,
  HOUND: 2,
  FOX: 3,
  FOXHOUND: 4,
  'BIG BOSS': 5
};

export function loadVrProgress(): VrMissionProgress {
  const state = loadJson<VrMissionProgress>('vr-mission-progress', DEFAULT_VR_PROGRESS);
  return {
    records: Array.isArray(state.records) ? state.records : [],
    unlockedTapeIds: Array.isArray(state.unlockedTapeIds) ? state.unlockedTapeIds : [],
    unlockedBadges: Array.isArray(state.unlockedBadges) ? state.unlockedBadges : [],
    activeMissionId: typeof state.activeMissionId === 'string' ? state.activeMissionId : undefined
  };
}

export function saveVrProgress(progress: VrMissionProgress): void {
  saveJson('vr-mission-progress', progress);
  saveJson('vr-unlocked-tapes', progress.unlockedTapeIds);
}

export function loadVrTapeUnlocks(): string[] {
  const progress = loadVrProgress();
  const legacy = loadJson<string[]>('vr-unlocked-tapes', []);
  return Array.from(new Set([...progress.unlockedTapeIds, ...(Array.isArray(legacy) ? legacy : [])]));
}

export function createEmptyVrStats(): VrRunStats {
  return {
    timeSeconds: 0,
    alerts: 0,
    shotsFired: 0,
    hits: 0,
    kills: 0,
    neutralizations: 0,
    damageTaken: 0,
    rationsUsed: 0,
    camerasDisabled: 0,
    objectivesCompleted: 0,
    secretsFound: 0,
    bossDefeated: false
  };
}

export function isRankAtLeast(rank: VrRank, target: VrRank): boolean {
  return rankOrder[rank] >= rankOrder[target];
}

export function getBestVrRecord(progress: VrMissionProgress, missionId: string): VrMissionRecord | undefined {
  return progress.records
    .filter((record) => record.missionId === missionId && record.success)
    .sort((a, b) => b.score - a.score || a.timeSeconds - b.timeSeconds)[0];
}

export function getVrCompletionStats(progress: VrMissionProgress, missions: VrMissionDefinition[]): {
  completed: number;
  total: number;
  bigBossCount: number;
  foxOrBetter: number;
  unlockedTapes: number;
  badges: number;
} {
  const completed = missions.filter((mission) => getBestVrRecord(progress, mission.id)).length;
  const bestRecords = missions
    .map((mission) => getBestVrRecord(progress, mission.id))
    .filter((record): record is VrMissionRecord => Boolean(record));
  return {
    completed,
    total: missions.length,
    bigBossCount: bestRecords.filter((record) => record.rank === 'BIG BOSS').length,
    foxOrBetter: bestRecords.filter((record) => isRankAtLeast(record.rank, 'FOX')).length,
    unlockedTapes: progress.unlockedTapeIds.length,
    badges: progress.unlockedBadges.length
  };
}

export function evaluateVrRun(
  mission: VrMissionDefinition,
  stats: VrRunStats,
  alreadyUnlockedTapeIds: string[] = [],
  alreadyUnlockedBadges: string[] = []
): VrRunEvaluation {
  const failures = getVrFailures(mission, stats);
  const success = failures.length === 0;
  const accuracy = stats.shotsFired > 0 ? Math.round((stats.hits / stats.shotsFired) * 100) : 100;
  const score = calculateVrScore(mission, stats, success, accuracy);
  const rank = calculateVrRank(score, stats, mission, success);
  const unlockedTapeIds = success
    ? mission.rewards
      .filter((reward) => reward.tapeId && isRankAtLeast(rank, reward.unlockRank) && !alreadyUnlockedTapeIds.includes(reward.tapeId))
      .map((reward) => reward.tapeId as string)
    : [];
  const unlockedBadges = success
    ? mission.rewards
      .filter((reward) => isRankAtLeast(rank, reward.unlockRank) && !alreadyUnlockedBadges.includes(reward.badge))
      .map((reward) => reward.badge)
    : [];

  return { success, score, rank, accuracy, failures, unlockedTapeIds, unlockedBadges };
}

export function createVrRecord(
  mission: VrMissionDefinition,
  stats: VrRunStats,
  evaluation: VrRunEvaluation
): VrMissionRecord {
  return {
    ...stats,
    missionId: mission.id,
    completedAt: new Date().toISOString(),
    success: evaluation.success,
    score: evaluation.score,
    rank: evaluation.rank,
    accuracy: evaluation.accuracy,
    unlockedTapeIds: evaluation.unlockedTapeIds
  };
}

export function recordVrRun(
  progress: VrMissionProgress,
  mission: VrMissionDefinition,
  record: VrMissionRecord,
  evaluation: VrRunEvaluation
): VrMissionProgress {
  const records = [record, ...progress.records].slice(0, 120);
  const unlockedTapeIds = Array.from(new Set([...progress.unlockedTapeIds, ...evaluation.unlockedTapeIds]));
  const unlockedBadges = Array.from(new Set([...progress.unlockedBadges, ...evaluation.unlockedBadges]));
  return {
    ...progress,
    activeMissionId: mission.id,
    records,
    unlockedTapeIds,
    unlockedBadges
  };
}

function getVrFailures(mission: VrMissionDefinition, stats: VrRunStats): string[] {
  const req = mission.requirements;
  const failures: string[] = [];
  if (req.targetTimeSeconds !== undefined && stats.timeSeconds > req.targetTimeSeconds) failures.push(`Time exceeded: ${stats.timeSeconds}s / ${req.targetTimeSeconds}s`);
  if (req.maxAlerts !== undefined && stats.alerts > req.maxAlerts) failures.push(`Too many alerts: ${stats.alerts} / ${req.maxAlerts}`);
  if (req.minKills !== undefined && stats.kills < req.minKills) failures.push(`Required eliminations missing: ${stats.kills} / ${req.minKills}`);
  if (req.maxKills !== undefined && stats.kills > req.maxKills) failures.push(`Kill limit exceeded: ${stats.kills} / ${req.maxKills}`);
  if (req.maxDamage !== undefined && stats.damageTaken > req.maxDamage) failures.push(`Damage limit exceeded: ${stats.damageTaken} / ${req.maxDamage}`);
  if (req.maxRations !== undefined && stats.rationsUsed > req.maxRations) failures.push(`Ration limit exceeded: ${stats.rationsUsed} / ${req.maxRations}`);
  if (req.minNeutralizations !== undefined && stats.neutralizations < req.minNeutralizations) failures.push(`Neutralizations missing: ${stats.neutralizations} / ${req.minNeutralizations}`);
  if (req.minShotsFired !== undefined && stats.shotsFired < req.minShotsFired) failures.push(`Not enough confirmed weapon actions: ${stats.shotsFired} / ${req.minShotsFired}`);
  if (req.maxShotsFired !== undefined && stats.shotsFired > req.maxShotsFired) failures.push(`Shot limit exceeded: ${stats.shotsFired} / ${req.maxShotsFired}`);
  if (req.minCamerasDisabled !== undefined && stats.camerasDisabled < req.minCamerasDisabled) failures.push(`Surveillance disables missing: ${stats.camerasDisabled} / ${req.minCamerasDisabled}`);
  if (req.minObjectivesCompleted !== undefined && stats.objectivesCompleted < req.minObjectivesCompleted) failures.push(`Objectives missing: ${stats.objectivesCompleted} / ${req.minObjectivesCompleted}`);
  if (req.bossDefeated && !stats.bossDefeated) failures.push('Boss defeat required');
  return failures;
}

function calculateVrScore(mission: VrMissionDefinition, stats: VrRunStats, success: boolean, accuracy: number): number {
  const req = mission.requirements;
  let score = success ? 1000 : 650;
  const targetTime = req.targetTimeSeconds ?? 180;
  if (stats.timeSeconds > targetTime) score -= (stats.timeSeconds - targetTime) * 3;
  else score += Math.min(90, (targetTime - stats.timeSeconds) * 0.8);
  score -= stats.alerts * 160;
  score -= Math.max(0, stats.kills - (req.minKills ?? 0)) * 120;
  score -= stats.damageTaken * 2;
  score -= stats.rationsUsed * 65;
  score -= Math.max(0, stats.shotsFired - (req.maxShotsFired ?? 18)) * 10;
  score -= Math.max(0, (req.minShotsFired ?? 0) - stats.shotsFired) * 20;
  score += stats.neutralizations * 18;
  score += stats.camerasDisabled * 24;
  score += stats.objectivesCompleted * 32;
  score += stats.secretsFound * 45;
  score += stats.bossDefeated ? 85 : 0;
  score += Math.max(-80, Math.min(80, accuracy - 65));
  score -= Math.max(0, mission.difficulty - 1) * 8;
  return Math.max(0, Math.min(1100, Math.round(score)));
}

function calculateVrRank(score: number, stats: VrRunStats, mission: VrMissionDefinition, success: boolean): VrRank {
  if (!success) return score >= 620 ? 'RAT' : 'ROOKIE';
  const target = mission.requirements.targetTimeSeconds ?? 180;
  if (score >= 1000 && stats.alerts === 0 && stats.kills === 0 && stats.damageTaken === 0 && stats.timeSeconds <= target) return 'BIG BOSS';
  if (score >= 930 && stats.alerts === 0) return 'FOXHOUND';
  if (score >= 820) return 'FOX';
  if (score >= 650) return 'HOUND';
  if (score >= 450) return 'RAT';
  return 'ROOKIE';
}
