import { describe, expect, it } from 'vitest';
import vrMissionsJson from '../data/vrMissions.json';
import type { VrMissionDefinition, VrMissionProgress, VrRunEvaluation, VrRunStats } from '../types/vr.types';
import { applyVrRuntimeOutcome, evaluateVrRun, MAX_VR_RECORDS, recordVrRun } from './vrStorage';

const missions = vrMissionsJson as VrMissionDefinition[];
const ninjaGuardSweep = missions.find((mission) => mission.id === 'vr_ninja_guard_sweep_016') as VrMissionDefinition;
const minuteEnemySocom = missions.find((mission) => mission.id === 'vr_minute_enemy_socom_038') as VrMissionDefinition;
const vs12BattleLevel1 = missions.find((mission) => mission.id === 'vr_vs12_battle_01_046') as VrMissionDefinition;

function guardSweepStats(kills: number): VrRunStats {
  return {
    timeSeconds: 120,
    alerts: 0,
    shotsFired: 30,
    hits: 30,
    kills,
    neutralizations: 0,
    damageTaken: 0,
    rationsUsed: 0,
    camerasDisabled: 0,
    objectivesCompleted: kills,
    secretsFound: 0,
    bossDefeated: false
  };
}

describe('VR mission scoring', () => {
  it('keeps required Ninja eliminations score-neutral and makes the FOX reward attainable', () => {
    const evaluation = evaluateVrRun(ninjaGuardSweep, guardSweepStats(30));

    expect(evaluation.success).toBe(true);
    expect(evaluation.score).toBeGreaterThanOrEqual(820);
    expect(evaluation.unlockedBadges).toContain('NINJA_GUARD_SWEEP');
  });

  it('fails Ninja Level 02 when fewer than 30 soldiers are eliminated', () => {
    const evaluation = evaluateVrRun(ninjaGuardSweep, guardSweepStats(29));

    expect(evaluation.success).toBe(false);
    expect(evaluation.failures).toContain('Required eliminations missing: 29 / 30');
  });

  it('retains enough history for all 300 canonical VR stages', () => {
    const evaluation: VrRunEvaluation = {
      success: true,
      score: 900,
      rank: 'FOX',
      accuracy: 100,
      failures: [],
      unlockedTapeIds: [],
      unlockedBadges: []
    };
    const baseRecord = {
      ...guardSweepStats(30),
      missionId: '',
      completedAt: '2026-07-16T00:00:00.000Z',
      success: true,
      score: 900,
      rank: 'FOX' as const,
      accuracy: 100,
      unlockedTapeIds: []
    };
    let progress: VrMissionProgress = { records: [], unlockedTapeIds: [], unlockedBadges: [] };

    for (let index = 1; index <= 300; index += 1) {
      const mission = { ...ninjaGuardSweep, id: `canonical-vr-${index}` };
      progress = recordVrRun(progress, mission, { ...baseRecord, missionId: mission.id }, evaluation);
    }

    expect(MAX_VR_RECORDS).toBeGreaterThanOrEqual(300);
    expect(new Set(progress.records.map((record) => record.missionId))).toHaveLength(300);
  });

  it('rewards eliminations above the VS ENEMY quota instead of treating them as excess kills', () => {
    const atQuota = guardSweepStats(15);
    atQuota.timeSeconds = 60;
    atQuota.shotsFired = 15;
    atQuota.hits = 15;
    atQuota.objectivesCompleted = 15;
    const aboveQuota = { ...atQuota, shotsFired: 17, hits: 17, kills: 17, objectivesCompleted: 17 };

    const quotaEvaluation = evaluateVrRun(minuteEnemySocom, atQuota);
    const highCountEvaluation = evaluateVrRun(minuteEnemySocom, aboveQuota);

    expect(quotaEvaluation.success).toBe(true);
    expect(highCountEvaluation.success).toBe(true);
    expect(highCountEvaluation.score).toBeGreaterThanOrEqual(quotaEvaluation.score);
  });

  it('does not penalize the forced combat state in 1 MIN. BATTLE', () => {
    const baseline = guardSweepStats(15);
    baseline.timeSeconds = 60;
    baseline.shotsFired = 15;
    baseline.hits = 15;
    baseline.objectivesCompleted = 15;

    expect(evaluateVrRun(minuteEnemySocom, { ...baseline, alerts: 12 }).score)
      .toBe(evaluateVrRun(minuteEnemySocom, baseline).score);
  });

  it('allows a canonical alerted 12-kill VS 12 clear to earn BIG BOSS', () => {
    const stats: VrRunStats = {
      ...guardSweepStats(12),
      timeSeconds: 300,
      alerts: 12,
      shotsFired: 24,
      hits: 24,
      objectivesCompleted: 12
    };

    const evaluation = evaluateVrRun(vs12BattleLevel1, stats);

    expect(evaluation.success).toBe(true);
    expect(evaluation.score).toBeGreaterThanOrEqual(1000);
    expect(evaluation.rank).toBe('BIG BOSS');
  });

  it('does not penalize canonical alerts, quota kills, or mixed-arsenal action counts in VS 12', () => {
    const baseline: VrRunStats = {
      ...guardSweepStats(12),
      timeSeconds: 300,
      shotsFired: 12,
      hits: 12,
      objectivesCompleted: 12
    };
    const canonicalBattle = {
      ...baseline,
      alerts: 12,
      shotsFired: 24,
      hits: 24,
      kills: 14
    };

    expect(evaluateVrRun(vs12BattleLevel1, canonicalBattle).score)
      .toBe(evaluateVrRun(vs12BattleLevel1, baseline).score);
  });

  it('keeps time, damage, and accuracy discriminating VS 12 performance', () => {
    const baseline: VrRunStats = {
      ...guardSweepStats(12),
      timeSeconds: 300,
      alerts: 12,
      shotsFired: 24,
      hits: 24,
      objectivesCompleted: 12
    };
    const pristine = evaluateVrRun(vs12BattleLevel1, baseline);
    const faster = evaluateVrRun(vs12BattleLevel1, { ...baseline, timeSeconds: 240 });
    const damaged = evaluateVrRun(vs12BattleLevel1, { ...baseline, damageTaken: 6 });
    const inaccurate = evaluateVrRun(vs12BattleLevel1, { ...baseline, hits: 12 });

    expect(faster.score).toBeGreaterThan(pristine.score);
    expect(damaged.score).toBeLessThan(pristine.score);
    expect(inaccurate.score).toBeLessThan(pristine.score);
    expect(damaged.rank).not.toBe('BIG BOSS');
  });

  it('caps blast multi-hit accuracy at 100 percent', () => {
    const blastStats: VrRunStats = {
      ...guardSweepStats(12),
      timeSeconds: 240,
      shotsFired: 6,
      hits: 12,
      objectivesCompleted: 12
    };

    expect(evaluateVrRun(vs12BattleLevel1, blastStats).accuracy).toBe(100);
  });

  it('never converts a live-scene death or abort into a clear after the quota was reached', () => {
    const completedStats = guardSweepStats(15);
    completedStats.timeSeconds = 60;
    completedStats.shotsFired = 15;
    completedStats.hits = 15;
    completedStats.objectivesCompleted = 15;
    const numericEvaluation = evaluateVrRun(minuteEnemySocom, completedStats);

    const runtimeEvaluation = applyVrRuntimeOutcome(numericEvaluation, 'failed', 'Operator down');

    expect(numericEvaluation.success).toBe(true);
    expect(runtimeEvaluation.success).toBe(false);
    expect(runtimeEvaluation.failures[0]).toBe('Operator down');
    expect(runtimeEvaluation.unlockedBadges).toEqual([]);
    expect(runtimeEvaluation.unlockedTapeIds).toEqual([]);
  });
});
