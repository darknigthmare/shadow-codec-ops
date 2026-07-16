import { describe, expect, it } from 'vitest';
import vrMissionsJson from '../data/vrMissions.json';
import type { VrMissionDefinition, VrRunStats } from '../types/vr.types';
import { evaluateVrRun } from './vrStorage';

const missions = vrMissionsJson as VrMissionDefinition[];
const ninjaGuardSweep = missions.find((mission) => mission.id === 'vr_ninja_guard_sweep_016') as VrMissionDefinition;

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
});
