/** Side Ops guard decisions, kept independent from Phaser for deterministic simulation. */
export type SideOpsEnemyRole = 'patrol' | 'reinforcement';
export type SideOpsEnemyDifficulty = 'story' | 'standard' | 'hard';
export type SideOpsEnemyMode = 'patrol' | 'investigate' | 'search' | 'aim' | 'fire' | 'reload' | 'disabled';
export type SideOpsEnemyAlert = 'NORMAL' | 'SUSPICION' | 'ALERT' | 'EVASION' | 'CAUTION' | 'MISSION FAILED';

export interface SideOpsEnemyObstacle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface SideOpsEnemyStimulus {
  id: string;
  x: number;
  y: number;
  /** Hearing distance in world pixels. */
  radius: number;
  occurredAt: number;
}

export interface SideOpsEnemyState {
  mode: SideOpsEnemyMode;
  direction: -1 | 1;
  stateUntil: number;
  lastKnownX: number | null;
  lastKnownY: number | null;
  lastContactAt: number;
  lastNoiseId: string | null;
  roundsRemaining: number;
  nextShotAt: number;
}

export interface SideOpsEnemyInput {
  now: number;
  x: number;
  y: number;
  role: SideOpsEnemyRole;
  difficulty?: SideOpsEnemyDifficulty;
  player: { x: number; y: number; crouched: boolean; slowWalking: boolean };
  patrolMin: number;
  patrolMax: number;
  worldMin?: number;
  worldMax?: number;
  alert: SideOpsEnemyAlert;
  obstacles?: readonly SideOpsEnemyObstacle[];
  noise?: SideOpsEnemyStimulus | null;
  disabled?: boolean;
  blockedLeft?: boolean;
  blockedRight?: boolean;
  /** Set by the scene's ground probe; prevents the AI stepping off platforms. */
  ledgeAhead?: boolean;
}

export interface SideOpsEnemyDecision {
  state: SideOpsEnemyState;
  velocityX: number;
  direction: -1 | 1;
  animation: 'idle' | 'move' | 'attack';
  /** Feed into the existing shared suspicion meter using elapsed seconds. */
  detectionPerSecond: number;
  seesPlayer: boolean;
  fire: boolean;
  projectileSpeed: number;
  indicator: '' | '?' | '!' | '...';
}

const DIFFICULTY = {
  story: { vision: 0.85, detection: 0.7, reaction: 1.4, speed: 0.9, reload: 1.2 },
  standard: { vision: 1, detection: 1, reaction: 1, speed: 1, reload: 1 },
  hard: { vision: 1.15, detection: 1.25, reaction: 0.8, speed: 1.08, reload: 0.85 }
} as const;

const ROLES = {
  patrol: { patrolSpeed: 72, investigateSpeed: 104, vision: 285, combatVision: 500, magazine: 3, shotInterval: 340, reloadMs: 2100, reactionMs: 700, projectileSpeed: 460 },
  reinforcement: { patrolSpeed: 88, investigateSpeed: 126, vision: 320, combatVision: 550, magazine: 4, shotInterval: 260, reloadMs: 2400, reactionMs: 580, projectileSpeed: 520 }
} as const;

export function createSideOpsEnemyState(role: SideOpsEnemyRole, direction: number = 1): SideOpsEnemyState {
  return {
    mode: 'patrol', direction: direction < 0 ? -1 : 1, stateUntil: 0,
    lastKnownX: null, lastKnownY: null, lastContactAt: -Infinity,
    lastNoiseId: null, roundsRemaining: ROLES[role].magazine, nextShotAt: 0
  };
}

/** Segment/AABB clipping handles low cover and vertical doors without Phaser geometry. */
export function sideOpsEnemyHasLineOfSight(
  from: { x: number; y: number },
  to: { x: number; y: number },
  obstacles: readonly SideOpsEnemyObstacle[] = []
): boolean {
  return sideOpsEnemySightHit(from, to, obstacles) === null;
}

/** First obstacle hit as a segment fraction; null means an unobstructed ray. */
export function sideOpsEnemySightHit(
  from: { x: number; y: number },
  to: { x: number; y: number },
  obstacles: readonly SideOpsEnemyObstacle[] = []
): number | null {
  let nearest: number | null = null;
  for (const obstacle of obstacles) {
    if (obstacle.right <= obstacle.left || obstacle.bottom <= obstacle.top) continue;
    let enter = 0;
    let exit = 1;
    let missed = false;
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;
    const edges = [
      [-deltaX, from.x - obstacle.left], [deltaX, obstacle.right - from.x],
      [-deltaY, from.y - obstacle.top], [deltaY, obstacle.bottom - from.y]
    ];
    for (const [direction, distance] of edges) {
      if (Math.abs(direction) < 0.00001) {
        if (distance < 0) { missed = true; break; }
      } else {
        const ratio = distance / direction;
        if (direction < 0) enter = Math.max(enter, ratio);
        else exit = Math.min(exit, ratio);
        if (enter > exit) { missed = true; break; }
      }
    }
    if (!missed && enter <= exit && (nearest === null || enter < nearest)) nearest = enter;
  }
  return nearest;
}

function directionTo(from: number, to: number, fallback: -1 | 1): -1 | 1 {
  return Math.abs(to - from) < 1 ? fallback : to < from ? -1 : 1;
}

/**
 * One decision per simulation tick. Global ALERT makes guards vigilant but never
 * reveals the player's position: a guard must see/hear them before pursuit.
 */
export function updateSideOpsEnemy(previous: SideOpsEnemyState, input: SideOpsEnemyInput): SideOpsEnemyDecision {
  const state = { ...previous };
  const tuning = ROLES[input.role];
  const difficulty = DIFFICULTY[input.difficulty ?? 'standard'];
  const decision: SideOpsEnemyDecision = {
    state, velocityX: 0, direction: state.direction, animation: 'idle',
    detectionPerSecond: 0, seesPlayer: false, fire: false,
    projectileSpeed: tuning.projectileSpeed, indicator: ''
  };
  if (input.disabled || input.alert === 'MISSION FAILED') {
    state.mode = 'disabled';
    return decision;
  }

  const inCombat = input.alert === 'ALERT';
  const vigilance = input.alert === 'CAUTION' || input.alert === 'EVASION' ? 1.15 : 1;
  const dx = input.player.x - input.x;
  const dy = input.player.y - input.y;
  const distanceX = Math.abs(dx);
  const sightRange = (inCombat ? tuning.combatVision : tuning.vision) * difficulty.vision * vigilance;
  const inFront = dx * state.direction >= 0;
  const clearSight = sideOpsEnemyHasLineOfSight(
    { x: input.x, y: input.y - 18 },
    { x: input.player.x, y: input.player.y + (input.player.crouched ? 5 : -12) },
    input.obstacles
  );
  const withinCone = Math.abs(dy) <= Math.min(94, 20 + distanceX * 0.35);
  const seesPlayer = clearSight && distanceX < sightRange && withinCone && (inFront || distanceX < 38);
  decision.seesPlayer = seesPlayer;
  if (seesPlayer) {
    state.lastKnownX = input.player.x;
    state.lastKnownY = input.player.y;
    state.lastContactAt = input.now;
    state.direction = directionTo(input.x, input.player.x, state.direction);
    const postureRate = input.player.crouched ? (distanceX < 105 ? 45 : 18) : input.player.slowWalking ? 43 : 81;
    decision.detectionPerSecond = (inCombat ? 99 : postureRate) * difficulty.detection;
  }

  // Noise is a location to investigate, not permission to shoot through cover.
  const noise = input.noise;
  if (!seesPlayer && noise && noise.id !== state.lastNoiseId && input.now >= noise.occurredAt && input.now - noise.occurredAt <= 1200) {
    const distance = Math.hypot(noise.x - input.x, noise.y - input.y);
    if (distance <= noise.radius && Math.abs(noise.y - input.y) <= 180) {
      state.lastNoiseId = noise.id;
      state.lastKnownX = noise.x;
      state.lastKnownY = noise.y;
      state.lastContactAt = noise.occurredAt;
      if (state.mode !== 'reload') state.mode = 'investigate';
    }
  }

  // A reload always completes, including when the target breaks line of sight.
  if (state.mode === 'reload' && input.now >= state.stateUntil) {
    state.roundsRemaining = tuning.magazine;
    state.mode = 'investigate';
  }
  if (state.mode === 'reload') {
    decision.indicator = '...';
  } else if (seesPlayer && inCombat) {
    decision.indicator = '!';
    if (state.mode !== 'aim' && state.mode !== 'fire') {
      state.mode = 'aim';
      state.stateUntil = input.now + tuning.reactionMs * difficulty.reaction;
    }
    if (state.mode === 'aim' && input.now >= state.stateUntil) state.mode = 'fire';
    if (state.mode === 'fire' && input.now >= state.nextShotAt) {
      // Never emit accumulated shots on a slow frame; each shot remains readable.
      decision.fire = true;
      decision.animation = 'attack';
      state.roundsRemaining -= 1;
      state.nextShotAt = input.now + tuning.shotInterval;
      if (state.roundsRemaining <= 0) {
        state.mode = 'reload';
        state.stateUntil = input.now + tuning.reloadMs * difficulty.reload;
      }
    }
    // Hold a firing lane instead of running into the player for contact damage.
    if (distanceX < 100) decision.velocityX = -state.direction * tuning.patrolSpeed * 0.75;
  } else if (seesPlayer) {
    state.mode = 'investigate';
    decision.indicator = '?';
    if (distanceX > 125) decision.velocityX = state.direction * tuning.patrolSpeed * difficulty.speed;
  } else if (state.lastKnownX !== null && input.now - state.lastContactAt <= 7000) {
    decision.indicator = '?';
    if (state.mode === 'search') {
      if (input.now >= state.stateUntil) {
        state.lastKnownX = null;
        state.lastKnownY = null;
        state.mode = 'patrol';
        state.stateUntil = input.now + 400;
      } else {
        state.direction = Math.floor((state.stateUntil - input.now) / 700) % 2 === 0 ? 1 : -1;
      }
    } else if (Math.abs(state.lastKnownX - input.x) <= 22 || input.ledgeAhead || input.blockedLeft || input.blockedRight) {
      state.mode = 'search';
      state.stateUntil = input.now + (inCombat ? 3200 : 2300);
    } else {
      state.mode = 'investigate';
      state.direction = directionTo(input.x, state.lastKnownX, state.direction);
      decision.velocityX = state.direction * tuning.investigateSpeed * difficulty.speed;
    }
  } else {
    state.lastKnownX = null;
    state.lastKnownY = null;
    state.mode = 'patrol';
    if (input.now >= state.stateUntil) {
      const hitLeft = input.x <= input.patrolMin && state.direction < 0;
      const hitRight = input.x >= input.patrolMax && state.direction > 0;
      if (hitLeft || hitRight || input.ledgeAhead || (state.direction < 0 ? input.blockedLeft : input.blockedRight)) {
        state.direction = state.direction === 1 ? -1 : 1;
        state.stateUntil = input.now + 650;
      } else {
        decision.velocityX = state.direction * tuning.patrolSpeed * difficulty.speed * vigilance;
      }
    }
  }

  if (decision.velocityX < 0 && (input.blockedLeft || input.x <= (input.worldMin ?? 0))) decision.velocityX = 0;
  if (decision.velocityX > 0 && (input.blockedRight || input.x >= (input.worldMax ?? Infinity))) decision.velocityX = 0;
  if (input.ledgeAhead) decision.velocityX = 0;
  decision.direction = state.direction;
  if (!decision.fire && decision.velocityX !== 0) decision.animation = 'move';
  return decision;
}
