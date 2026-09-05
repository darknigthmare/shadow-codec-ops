import { describe, expect, it } from 'vitest';
import {
  createSideOpsBossState,
  SIDEOPS_BOSS_TACTICS,
  updateSideOpsBoss,
  type SideOpsBossInput,
  type SideOpsBossState
} from './sideOpsEnemyBossTactics';

const base: SideOpsBossInput = {
  now: 0, packId: 'mgs1', active: true, hp: 20, maxHp: 20,
  x: 1000, y: 454, playerX: 700, playerY: 454,
  hasLineOfSight: true, arenaMin: 600, arenaMax: 1400
};

function tick(state: SideOpsBossState, overrides: Partial<SideOpsBossInput> = {}) {
  return updateSideOpsBoss(state, { ...base, ...overrides });
}

function startWindup(overrides: Partial<SideOpsBossInput> = {}) {
  const started = tick(createSideOpsBossState(), overrides);
  return tick(started.state, { ...overrides, now: 650 });
}

describe('Side Ops boss encounters', () => {
  it('gives every existing pack a concrete boss pattern and a fair windup/recovery', () => {
    expect(Object.keys(SIDEOPS_BOSS_TACTICS)).toHaveLength(12);
    for (const profile of Object.values(SIDEOPS_BOSS_TACTICS)) {
      expect(profile.pattern.length).toBeGreaterThan(0);
      expect(profile.aimMs * 0.78).toBeGreaterThanOrEqual(600);
      expect(profile.recoveryMs * 0.78).toBeGreaterThanOrEqual(1000);
      expect(profile.volleyCount).toBeGreaterThan(0);
    }
  });

  it('cannot attack before activation or acquire a target through cover', () => {
    const inactive = tick(createSideOpsBossState(), { active: false, now: 5000 });
    expect(inactive.state.mode).toBe('dormant');
    expect(inactive.projectiles).toEqual([]);
    const covered = startWindup({ hasLineOfSight: false });
    expect(covered.state.mode).toBe('reposition');
    expect(covered.telegraph).toBeNull();
    expect(covered.projectiles).toEqual([]);
  });

  it('locks the target during a readable windup so the player can dodge', () => {
    const windup = startWindup();
    expect(windup.state.mode).toBe('telegraph');
    expect(windup.telegraph?.x).toBe(700);
    expect(windup.telegraph?.progress).toBe(0);
    expect(windup.projectiles).toEqual([]);
    const moved = tick(windup.state, { now: 1200, playerX: 1250, playerY: 330 });
    expect(moved.telegraph?.x).toBe(700);
    expect(moved.state.targetY).toBe(444);
    expect(moved.projectiles).toEqual([]);
    const shot = tick(moved.state, { now: 1450, playerX: 1250, playerY: 330 });
    expect(shot.projectiles).toHaveLength(1);
    expect(shot.projectiles[0].velocityX).toBeLessThan(0);
    expect(Math.abs(shot.projectiles[0].velocityY)).toBeLessThan(10);
    expect(shot.telegraph).toBeNull();
  });

  it('lets cover interrupt an aimed burst without consuming player health', () => {
    const windup = startWindup();
    const cover = tick(windup.state, { now: 1450, hasLineOfSight: false });
    expect(cover.projectiles).toEqual([]);
    expect(cover.contactDamage).toBe(0);
    expect(cover.state.mode).toBe('recover');
    expect(cover.vulnerable).toBe(true);
  });

  it('uses a six-shot Ocelot cycle followed by a substantial reload opening', () => {
    let result = startWindup();
    for (let i = 0; i < 6; i += 1) {
      result = tick(result.state, { now: 1450 + i * 240 });
      expect(result.projectiles).toHaveLength(1);
    }
    expect(result.state.mode).toBe('recover');
    expect(result.vulnerable).toBe(true);
    const recovery = tick(result.state, { now: 4400 });
    expect(recovery.projectiles).toEqual([]);
    expect(recovery.vulnerable).toBe(true);
  });

  it('distinguishes a shotgun spread from a precision round', () => {
    const windup = startWindup({ packId: 'mg1' });
    const shot = tick(windup.state, { packId: 'mg1', now: 1550 });
    expect(shot.projectiles).toHaveLength(3);
    expect(shot.projectiles[0].velocityY).not.toBe(shot.projectiles[2].velocityY);
    expect(shot.state.mode).toBe('recover');
  });

  it('telegraphs charges and permits contact damage only inside the charge window', () => {
    const state = { ...createSideOpsBossState(), attackIndex: 1 };
    const ready = tick(state, { packId: 'mgs3' });
    const windup = tick(ready.state, { packId: 'mgs3', now: 650 });
    expect(windup.telegraph?.kind).toBe('charge');
    expect(windup.contactDamage).toBe(0);
    const charge = tick(windup.state, { packId: 'mgs3', now: 1900 });
    expect(charge.contactDamage).toBe(16);
    expect(charge.velocityX).toBeLessThan(0);
    expect(charge.projectiles).toEqual([]);
    const stopped = tick(charge.state, { packId: 'mgs3', now: 2000, blockedLeft: true });
    expect(stopped.contactDamage).toBe(0);
    expect(stopped.velocityX).toBe(0);
    expect(stopped.state.mode).toBe('recover');
    expect(stopped.vulnerable).toBe(true);
  });

  it('advances through three health phases and does not rewind after healing', () => {
    const second = tick(createSideOpsBossState(), { hp: 13 });
    expect(second.state.phase).toBe(2);
    const third = tick(second.state, { hp: 6 });
    expect(third.state.phase).toBe(3);
    expect(tick(third.state, { hp: 20 }).state.phase).toBe(3);
  });

  it('bounds repositioning to the arena and keeps the AI simulation core stationary', () => {
    expect(tick(createSideOpsBossState(), { x: 600, playerX: 590 }).velocityX).toBeGreaterThan(0);
    expect(tick(createSideOpsBossState(), { x: 1400, playerX: 1390, arenaMax: 1400 }).velocityX).toBe(0);
    expect(tick(createSideOpsBossState(), { packId: 'patriots_ai', playerX: 300 }).velocityX).toBe(0);
  });

  it('does not burst accumulated volleys after a slow frame or fire after defeat', () => {
    const windup = startWindup();
    const late = tick(windup.state, { now: 100000 });
    expect(late.projectiles).toHaveLength(1);
    expect(late.state.volleysFired).toBe(1);
    const defeated = tick(late.state, { hp: 0, now: 100001 });
    expect(defeated.state.mode).toBe('defeated');
    expect(defeated.projectiles).toEqual([]);
    expect(defeated.velocityX).toBe(0);
    expect(defeated.contactDamage).toBe(0);
  });
});
