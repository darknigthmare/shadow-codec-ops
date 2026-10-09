import { describe, expect, it } from 'vitest';
import {
  getBestMgs1VrPhotoshootRank,
  getMgs1VrPhotoshootTier,
  labelMgs1VrPhotoScore,
  scoreMgs1VrPhotoFrame
} from './mgs1VrPhotoshootRules';
import type { VrMissionRecord } from '../../types/vr.types';

const record = (rank: VrMissionRecord['rank'], success = true): VrMissionRecord => ({
  missionId: `mission-${rank}`,
  completedAt: '2026-07-16T10:00:00.000Z',
  success,
  score: 900,
  rank,
  accuracy: 100,
  unlockedTapeIds: [],
  timeSeconds: 50,
  alerts: 0,
  shotsFired: 1,
  hits: 1,
  kills: 0,
  neutralizations: 0,
  damageTaken: 0,
  rationsUsed: 0,
  camerasDisabled: 0,
  objectivesCompleted: 1,
  secretsFound: 0,
  bossDefeated: false
});

describe('MGS1 VR Photoshoot rules', () => {
  it('grants more distance and time to higher ranks', () => {
    expect(getMgs1VrPhotoshootTier('BIG BOSS').maxZoom).toBeGreaterThan(getMgs1VrPhotoshootTier('ROOKIE').maxZoom);
    expect(getMgs1VrPhotoshootTier('BIG BOSS').sessionSeconds).toBe(180);
  });

  it('uses the highest successful local VR rank', () => {
    expect(getBestMgs1VrPhotoshootRank([record('HOUND'), record('BIG BOSS', false), record('FOXHOUND')])).toBe('FOXHOUND');
  });

  it('rewards centered framing near the permitted zoom limit', () => {
    const centered = scoreMgs1VrPhotoFrame({ reticleX: 480, reticleY: 270, modelX: 480, modelY: 270, zoom: 2.8, maxZoom: 3.2, poseBonus: 50 });
    const missed = scoreMgs1VrPhotoFrame({ reticleX: 100, reticleY: 100, modelX: 480, modelY: 270, zoom: 1, maxZoom: 3.2 });
    expect(centered).toBeGreaterThan(930);
    expect(missed).toBeLessThan(200);
    expect(labelMgs1VrPhotoScore(centered)).toBe('PERFECT');
  });
});
