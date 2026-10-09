import { describe, expect, it } from 'vitest';
import { calculateSideOpsRank } from './rankSystem';

describe('Side Ops rank system', () => {
  it('awards BIG BOSS for a fast perfect run', () => {
    expect(calculateSideOpsRank({
      alerts: 0,
      kills: 0,
      damageTaken: 0,
      rationsUsed: 0,
      timeSeconds: 150,
      shotsFired: 8
    })).toBe('BIG BOSS');
  });

  it('uses the supplied stealth score for normal ranks', () => {
    expect(calculateSideOpsRank({
      alerts: 1,
      kills: 0,
      damageTaken: 10,
      rationsUsed: 0,
      timeSeconds: 210,
      shotsFired: 14,
      stealthScore: 835
    })).toBe('FOX');
  });

  it('returns ROOKIE for a heavily penalized run', () => {
    expect(calculateSideOpsRank({
      alerts: 8,
      kills: 12,
      damageTaken: 90,
      rationsUsed: 3,
      timeSeconds: 900,
      shotsFired: 120
    })).toBe('ROOKIE');
  });
});
