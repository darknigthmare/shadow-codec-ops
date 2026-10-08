import { describe, expect, it } from 'vitest';
import {
  createSideOpsBossState,
  SIDEOPS_BOSS_TACTICS,
  SIDEOPS_BOSS_IDENTITY_TACTICS,
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

describe('boss identity overrides within an existing visual pack', () => {
  it('adds four distinct readable encounters without replacing or mutating Pupa', () => {
    expect(SIDEOPS_BOSS_IDENTITY_TACTICS.size).toBe(4);
    expect(SIDEOPS_BOSS_TACTICS.peace_walker).toEqual({
      label: 'Pupa', pattern: ['burst', 'charge', 'spread'], aimMs: 1200,
      recoveryMs: 1850, volleyCount: 4, intervalMs: 220, projectileSpeed: 420, moveSpeed: 64
    });
    for (const tuning of SIDEOPS_BOSS_IDENTITY_TACTICS.values()) {
      expect(tuning.label).not.toBe('Pupa');
      expect(tuning.pattern).toHaveLength(3);
      expect(tuning.aimMs * .78).toBeGreaterThanOrEqual(800);
      expect(tuning.recoveryMs * .78).toBeGreaterThanOrEqual(1000);
      expect(tuning).not.toBe(SIDEOPS_BOSS_TACTICS.peace_walker);
    }
  });

  it.each([
    { key: 'peaceWalkerChrysalis', kind: 'precision', aimMs: 1500, speed: 460, count: 1 },
    { key: 'peaceWalkerCocoon', kind: 'burst', aimMs: 1800, speed: 390, count: 1 },
    { key: 'peaceWalkerZeke', kind: 'precision', aimMs: 1600, speed: 540, count: 1 },
    { key: 'peaceWalkerBasilisk', kind: 'spread', aimMs: 1450, speed: 370, count: 3 }
  ])('selects $key by stable identity with its own windup and projectile cadence', ({ key, kind, aimMs, speed, count }) => {
    const input = { packId: 'peace_walker' as const, bossTextureKey: key };
    const windup = startWindup(input);
    expect(windup.telegraph?.kind).toBe(kind);
    expect(windup.state.stateUntil).toBe(650 + aimMs);
    expect(tick(windup.state, { ...input, now: 649 + aimMs }).projectiles).toEqual([]);
    const shot = tick(windup.state, { ...input, now: 650 + aimMs });
    expect(shot.projectiles).toHaveLength(count);
    for (const projectile of shot.projectiles) expect(Math.hypot(projectile.velocityX, projectile.velocityY)).toBeCloseTo(speed, 8);
    expect(shot.state.nextShotAt).toBe(650 + aimMs + SIDEOPS_BOSS_IDENTITY_TACTICS.get(key)!.intervalMs);
  });

  it('lets a known boss identity win over the environment pack without renaming either', () => {
    const input = { bossTextureKey: 'peaceWalkerZeke' };
    expect(startWindup({ ...input, packId: 'mgs1' })).toEqual(startWindup({ ...input, packId: 'peace_walker' }));
    expect(SIDEOPS_BOSS_TACTICS.mgs1.label).toBe('Revolver Ocelot');
  });

  it.each([undefined, '', 'peaceWalkerPupa', 'missing-boss', 'constructor', '__proto__', 'toString'])(
    'keeps the full Pupa simulation identical for fallback key %s', bossTextureKey => {
      let expected = createSideOpsBossState(), actual = createSideOpsBossState();
      for (let now = 0; now <= 30000; now += 100) {
        const input = { packId: 'peace_walker' as const, now, hp: now < 10000 ? 20 : now < 20000 ? 12 : 5, hasLineOfSight: now < 8000 || now >= 9000 };
        const legacy = tick(expected, input), fallback = tick(actual, { ...input, bossTextureKey });
        expect(fallback).toEqual(legacy);
        expected = legacy.state; actual = fallback.state;
      }
    }
  );

  it('keeps every other pack unchanged when the identity is unknown', () => {
    for (const packId of Object.keys(SIDEOPS_BOSS_TACTICS) as SideOpsBossInput['packId'][]) {
      expect(startWindup({ packId, bossTextureKey: 'unregistered-texture' })).toEqual(startWindup({ packId }));
    }
  });

  it.each(['peaceWalkerZeke', 'peaceWalkerBasilisk'])(
    '%s preserves real salvos, recovery openings and the telegraphed charge contract', bossTextureKey => {
      const tuning = SIDEOPS_BOSS_IDENTITY_TACTICS.get(bossTextureKey)!;
      const input = { packId: 'peace_walker' as const, bossTextureKey };
      let result = startWindup(input);
      const firstShotAt = result.state.stateUntil;
      for (let index = 0; index < tuning.volleyCount; index++) {
        result = tick(result.state, { ...input, now: firstShotAt + index * tuning.intervalMs });
        expect(result.state.volleysFired).toBe(index + 1);
        expect(result.projectiles.length).toBeGreaterThan(0);
      }
      expect(result.state.mode).toBe('recover');
      expect(result.vulnerable).toBe(true);
      expect(result.state.stateUntil).toBe(firstShotAt + (tuning.volleyCount - 1) * tuning.intervalMs + tuning.recoveryMs);
      const ready = tick({ ...createSideOpsBossState(), attackIndex: 2 }, input);
      const windup = tick(ready.state, { ...input, now: 650 });
      expect(windup.telegraph?.kind).toBe('charge'); expect(windup.contactDamage).toBe(0);
      const charge = tick(windup.state, { ...input, now: windup.state.stateUntil });
      expect(charge.contactDamage).toBe(16); expect(charge.projectiles).toEqual([]);
      const blocked = tick(charge.state, { ...input, now: windup.state.stateUntil + 50, blockedLeft: true });
      expect(blocked.state.mode).toBe('recover'); expect(blocked.contactDamage).toBe(0);
      const dead = tick(charge.state, { ...input, now: windup.state.stateUntil + 50, hp: 0 });
      expect(dead.state.mode).toBe('defeated'); expect(dead.projectiles).toEqual([]); expect(dead.contactDamage).toBe(0);
    }
  );
});

describe('Chrysalis and Cocoon movement boundaries', () => {
  it.each([
    { key: 'peaceWalkerChrysalis', moveSpeed: 48 },
    { key: 'peaceWalkerCocoon', moveSpeed: 24 }
  ])('$key preserves limited horizontal motion and never performs a ground charge', ({ key, moveSpeed }) => {
    const tuning = SIDEOPS_BOSS_IDENTITY_TACTICS.get(key)!;
    expect(tuning.pattern).not.toContain('charge');
    expect(tuning.moveSpeed).toBe(moveSpeed);
    const input = { packId: 'peace_walker' as const, bossTextureKey: key, playerX: 500 };
    expect(tick(createSideOpsBossState(), input).velocityX).toBe(-moveSpeed);
    expect(tick(createSideOpsBossState(), { ...input, blockedLeft: true }).velocityX).toBe(0);
    for (let attackIndex = 0; attackIndex < tuning.pattern.length; attackIndex++) {
      const ready = tick({ ...createSideOpsBossState(), attackIndex }, input);
      let decision = tick(ready.state, { ...input, now: 650 });
      expect(decision.telegraph?.kind).toBe(tuning.pattern[attackIndex]);
      const firstShotAt = decision.state.stateUntil;
      for (let salvo = 0; salvo < tuning.volleyCount; salvo++) {
        decision = tick(decision.state, { ...input, now: firstShotAt + salvo * tuning.intervalMs });
        expect(decision.projectiles).toHaveLength(tuning.pattern[attackIndex] === 'spread' ? 3 : 1);
        expect(decision.contactDamage).toBe(0);
        expect(decision.velocityX).toBe(0);
      }
      expect(decision.state.mode).toBe('recover');
      expect(decision.vulnerable).toBe(true);
      expect(decision.state.stateUntil).toBe(firstShotAt + (tuning.volleyCount - 1) * tuning.intervalMs + tuning.recoveryMs);
      const dead = tick(decision.state, { ...input, hp: 0 });
      expect(dead.state.mode).toBe('defeated');
      expect(dead.projectiles).toEqual([]);
      expect(dead.velocityX).toBe(0);
    }
  });
});
