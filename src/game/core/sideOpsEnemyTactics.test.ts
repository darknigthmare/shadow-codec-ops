import { describe, expect, it } from 'vitest';
import {
  createSideOpsEnemyState,
  sideOpsEnemyHasLineOfSight,
  sideOpsEnemySightHit,
  updateSideOpsEnemy,
  type SideOpsEnemyInput,
  type SideOpsEnemyState
} from './sideOpsEnemyTactics';

const baseInput: SideOpsEnemyInput = {
  now: 0, x: 100, y: 454, role: 'patrol', patrolMin: 60, patrolMax: 400,
  player: { x: 300, y: 454, crouched: false, slowWalking: false }, alert: 'NORMAL'
};

function tick(state: SideOpsEnemyState, overrides: Partial<SideOpsEnemyInput> = {}) {
  return updateSideOpsEnemy(state, { ...baseInput, ...overrides });
}

describe('Side Ops tactical enemy perception', () => {
  it('uses real occlusion for a door and permits a clear sightline above low cover', () => {
    const obstacle = { left: 190, top: 400, right: 230, bottom: 510 };
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 435 }, { x: 300, y: 442 }, [obstacle])).toBe(false);
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 380 }, { x: 300, y: 380 }, [obstacle])).toBe(true);
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 435 }, { x: 150, y: 442 }, [obstacle])).toBe(true);
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 510 }, { x: 300, y: 390 }, [obstacle])).toBe(false);
    expect(sideOpsEnemySightHit({ x: 100, y: 435 }, { x: 300, y: 442 }, [
      { ...obstacle, left: 250, right: 270 }, obstacle
    ])).toBeCloseTo(0.45);
  });

  it('treats vertical rays, geometry containing the guard, and empty obstacles consistently', () => {
    const obstacle = { left: 90, top: 100, right: 110, bottom: 200 };
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 0 }, { x: 100, y: 300 }, [obstacle])).toBe(false);
    expect(sideOpsEnemyHasLineOfSight({ x: 120, y: 0 }, { x: 120, y: 300 }, [obstacle])).toBe(true);
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 150 }, { x: 300, y: 150 }, [obstacle])).toBe(false);
    expect(sideOpsEnemyHasLineOfSight({ x: 100, y: 150 }, { x: 300, y: 150 }, [{ ...obstacle, right: 90 }])).toBe(true);
  });

  it('never detects or shoots through solid cover, even during global alert', () => {
    const obstacles = [{ left: 190, top: 400, right: 230, bottom: 510 }];
    const guard = createSideOpsEnemyState('patrol');
    const result = tick(guard, { alert: 'ALERT', obstacles, now: 9000 });
    expect(result.seesPlayer).toBe(false);
    expect(result.fire).toBe(false);
    expect(result.detectionPerSecond).toBe(0);
    expect(result.state.lastKnownX).toBeNull();
  });

  it('does not reveal a hidden player behind the guard when another guard raises alert', () => {
    const result = tick(createSideOpsEnemyState('patrol'), {
      alert: 'ALERT', player: { ...baseInput.player, x: 40 }
    });
    expect(result.seesPlayer).toBe(false);
    expect(result.state.mode).toBe('patrol');
    expect(result.velocityX).toBeGreaterThan(0);
  });

  it('allows close contact discovery but does not see arbitrarily high platforms', () => {
    const guard = createSideOpsEnemyState('patrol');
    expect(tick(guard, { player: { ...baseInput.player, x: 80 } }).seesPlayer).toBe(true);
    expect(tick(guard, { player: { ...baseInput.player, y: 280 } }).seesPlayer).toBe(false);
  });

  it('rewards crouching and slow walking, with tunable difficulty', () => {
    const guard = createSideOpsEnemyState('patrol');
    const standing = tick(guard).detectionPerSecond;
    const crouching = tick(guard, { player: { ...baseInput.player, crouched: true } }).detectionPerSecond;
    const slow = tick(guard, { player: { ...baseInput.player, slowWalking: true } }).detectionPerSecond;
    expect(crouching).toBeLessThan(slow);
    expect(slow).toBeLessThan(standing);
    expect(tick(guard, { difficulty: 'story' }).detectionPerSecond).toBeLessThan(standing);
    expect(tick(guard, { difficulty: 'hard' }).detectionPerSecond).toBeGreaterThan(standing);
  });
});

describe('Side Ops tactical enemy combat', () => {
  it('telegraphs the first shot, fires a finite magazine, then exposes a reload window', () => {
    let decision = tick(createSideOpsEnemyState('patrol'), { alert: 'ALERT' });
    expect(decision.state.mode).toBe('aim');
    expect(decision.indicator).toBe('!');
    expect(decision.fire).toBe(false);
    decision = tick(decision.state, { alert: 'ALERT', now: 699 });
    expect(decision.fire).toBe(false);
    decision = tick(decision.state, { alert: 'ALERT', now: 700 });
    expect(decision.fire).toBe(true);
    expect(decision.state.roundsRemaining).toBe(2);
    decision = tick(decision.state, { alert: 'ALERT', now: 1040 });
    expect(decision.fire).toBe(true);
    decision = tick(decision.state, { alert: 'ALERT', now: 1380 });
    expect(decision.fire).toBe(true);
    expect(decision.state.mode).toBe('reload');
    decision = tick(decision.state, { alert: 'ALERT', now: 3000 });
    expect(decision.fire).toBe(false);
    expect(decision.indicator).toBe('...');
    decision = tick(decision.state, { alert: 'ALERT', now: 3480 });
    expect(decision.state.roundsRemaining).toBe(3);
    expect(decision.state.mode).toBe('aim');
    expect(decision.fire).toBe(false);
  });

  it('cancels a shot when the player reaches cover during the windup', () => {
    const aimed = tick(createSideOpsEnemyState('patrol'), { alert: 'ALERT' });
    const interrupted = tick(aimed.state, {
      alert: 'ALERT', now: 800,
      obstacles: [{ left: 190, top: 400, right: 230, bottom: 510 }]
    });
    expect(interrupted.fire).toBe(false);
    expect(interrupted.state.mode).toBe('investigate');
    expect(interrupted.state.roundsRemaining).toBe(3);
  });

  it('does not release a backlog of bullets after a long rendering frame', () => {
    const aimed = tick(createSideOpsEnemyState('reinforcement'), { role: 'reinforcement', alert: 'ALERT' });
    const delayed = tick(aimed.state, { role: 'reinforcement', alert: 'ALERT', now: 10000 });
    expect(delayed.fire).toBe(true);
    expect(delayed.state.roundsRemaining).toBe(3);
    expect(delayed.state.nextShotAt).toBe(10260);
    const sameFrame = tick(delayed.state, { role: 'reinforcement', alert: 'ALERT', now: 10000 });
    expect(sameFrame.fire).toBe(false);
  });

  it('holds a ranged firing lane and backs away from close combat', () => {
    const guard = createSideOpsEnemyState('patrol');
    expect(tick(guard, { alert: 'ALERT' }).velocityX).toBe(0);
    expect(tick(guard, { alert: 'ALERT', player: { ...baseInput.player, x: 160 } }).velocityX).toBeLessThan(0);
    expect(tick(guard, { alert: 'ALERT', blockedLeft: true, player: { ...baseInput.player, x: 160 } }).velocityX).toBe(0);
  });
});

describe('Side Ops patrol and investigation', () => {
  it('investigates the last seen location without following the hidden current location', () => {
    const seen = tick(createSideOpsEnemyState('patrol'), { alert: 'ALERT' });
    const lost = tick(seen.state, { alert: 'ALERT', now: 1000, player: { ...baseInput.player, x: -500 } });
    expect(lost.state.lastKnownX).toBe(300);
    expect(lost.state.mode).toBe('investigate');
    expect(lost.direction).toBe(1);
    const reached = tick(lost.state, { alert: 'EVASION', now: 1500, x: 290, player: { ...baseInput.player, x: -500 } });
    expect(reached.state.mode).toBe('search');
    expect(reached.velocityX).toBe(0);
    const finished = tick(reached.state, { alert: 'CAUTION', now: 4000, x: 290, player: { ...baseInput.player, x: -500 } });
    expect(finished.state.mode).toBe('patrol');
    expect(finished.state.lastKnownX).toBeNull();
  });

  it('hears a fresh noise behind cover and investigates once without gaining visual contact', () => {
    const hiddenPlayer = { ...baseInput.player, x: -500 };
    const noise = { id: 'shot-1', x: 240, y: 454, radius: 370, occurredAt: 100 };
    const heard = tick(createSideOpsEnemyState('patrol'), { now: 200, noise, player: hiddenPlayer });
    expect(heard.state.mode).toBe('investigate');
    expect(heard.state.lastKnownX).toBe(240);
    expect(heard.seesPlayer).toBe(false);
    expect(heard.fire).toBe(false);
    const repeated = tick(heard.state, { now: 900, noise, player: hiddenPlayer });
    expect(repeated.state.lastContactAt).toBe(100);
    const stale = tick(createSideOpsEnemyState('patrol'), { now: 2000, noise, player: hiddenPlayer });
    expect(stale.state.lastKnownX).toBeNull();
    const tooFar = tick(createSideOpsEnemyState('patrol'), { now: 200, noise: { ...noise, radius: 30 }, player: hiddenPlayer });
    expect(tooFar.state.lastKnownX).toBeNull();
  });

  it('waits and reverses at patrol endpoints without oscillating each frame', () => {
    const hiddenPlayer = { ...baseInput.player, x: -500 };
    const turned = tick(createSideOpsEnemyState('patrol'), { x: 401, player: hiddenPlayer });
    expect(turned.direction).toBe(-1);
    expect(turned.velocityX).toBe(0);
    const waiting = tick(turned.state, { x: 401, now: 300, player: hiddenPlayer });
    expect(waiting.direction).toBe(-1);
    expect(waiting.velocityX).toBe(0);
    const walking = tick(waiting.state, { x: 401, now: 700, player: hiddenPlayer });
    expect(walking.velocityX).toBeLessThan(0);
  });

  it('does not walk off ledges or through obstacles while investigating', () => {
    const seen = tick(createSideOpsEnemyState('patrol'));
    const input = { player: { ...baseInput.player, x: -500 }, now: 1000 };
    const ledge = tick(seen.state, { ...input, ledgeAhead: true });
    expect(ledge.velocityX).toBe(0);
    expect(ledge.state.mode).toBe('search');
    const wall = tick(seen.state, { ...input, blockedRight: true });
    expect(wall.velocityX).toBe(0);
  });

  it('disables all decisions for neutralized units and leaves input state unmodified', () => {
    const guard = createSideOpsEnemyState('patrol');
    const copy = { ...guard };
    const result = tick(guard, { disabled: true, alert: 'ALERT' });
    expect(result.state.mode).toBe('disabled');
    expect(result.fire).toBe(false);
    expect(result.velocityX).toBe(0);
    expect(result.detectionPerSecond).toBe(0);
    expect(guard).toEqual(copy);
  });
});
