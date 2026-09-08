import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';

export type SideOpsBossMode = 'dormant' | 'reposition' | 'telegraph' | 'attack' | 'recover' | 'defeated';
export type SideOpsBossAttackKind = 'precision' | 'burst' | 'spread' | 'charge';

interface SideOpsBossTuning {
  /** Gameplay adaptation to the existing pack's boss, not a canon move list. */
  label: string;
  pattern: readonly SideOpsBossAttackKind[];
  aimMs: number;
  recoveryMs: number;
  volleyCount: number;
  intervalMs: number;
  projectileSpeed: number;
  moveSpeed: number;
}

export const SIDEOPS_BOSS_TACTICS: Record<SideOpsVisualPackId, SideOpsBossTuning> = {
  mg1: { label: 'Shotmaker', pattern: ['spread', 'spread', 'precision'], aimMs: 900, recoveryMs: 1500, volleyCount: 1, intervalMs: 260, projectileSpeed: 410, moveSpeed: 58 },
  mg2: { label: 'Metal Gear D', pattern: ['burst', 'spread'], aimMs: 1150, recoveryMs: 1700, volleyCount: 3, intervalMs: 300, projectileSpeed: 390, moveSpeed: 38 },
  mgs1: { label: 'Revolver Ocelot', pattern: ['precision'], aimMs: 800, recoveryMs: 2300, volleyCount: 6, intervalMs: 240, projectileSpeed: 490, moveSpeed: 90 },
  mgs2_tanker: { label: 'Olga Gurlukovich', pattern: ['burst', 'precision'], aimMs: 820, recoveryMs: 1600, volleyCount: 3, intervalMs: 190, projectileSpeed: 480, moveSpeed: 84 },
  mgs2_plant: { label: 'Metal Gear RAY', pattern: ['spread', 'burst'], aimMs: 1100, recoveryMs: 1800, volleyCount: 3, intervalMs: 350, projectileSpeed: 400, moveSpeed: 54 },
  mgs3: { label: 'Shagohod', pattern: ['burst', 'charge'], aimMs: 1250, recoveryMs: 1800, volleyCount: 5, intervalMs: 170, projectileSpeed: 475, moveSpeed: 46 },
  mgs4: { label: 'Gekko', pattern: ['burst', 'charge'], aimMs: 950, recoveryMs: 1500, volleyCount: 4, intervalMs: 180, projectileSpeed: 465, moveSpeed: 76 },
  peace_walker: { label: 'Pupa', pattern: ['burst', 'charge', 'spread'], aimMs: 1200, recoveryMs: 1850, volleyCount: 4, intervalMs: 220, projectileSpeed: 420, moveSpeed: 64 },
  mgsv_ground_zeroes: { label: 'STOUT IFV-SC', pattern: ['burst', 'spread'], aimMs: 1050, recoveryMs: 1700, volleyCount: 5, intervalMs: 170, projectileSpeed: 450, moveSpeed: 40 },
  mgsv_phantom_pain: { label: 'Sahelanthropus', pattern: ['burst', 'charge', 'precision'], aimMs: 1450, recoveryMs: 2100, volleyCount: 3, intervalMs: 340, projectileSpeed: 490, moveSpeed: 52 },
  vr_simulation: { label: 'VR Armored Captain', pattern: ['spread', 'charge'], aimMs: 950, recoveryMs: 1450, volleyCount: 2, intervalMs: 300, projectileSpeed: 420, moveSpeed: 70 },
  patriots_ai: { label: 'GW simulation core', pattern: ['spread', 'precision', 'burst'], aimMs: 1100, recoveryMs: 1750, volleyCount: 3, intervalMs: 280, projectileSpeed: 430, moveSpeed: 0 }
};

/**
 * Distinct roster identities, not replacements for the Peace Walker pack's Pupa.
 * Konami's official PW lineup keeps the AI weapons and ZEKE distinct:
 * https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html
 * Chrysalis fires from a fixed hover altitude; Cocoon moves slowly on the ground.
 * Neither receives the shared high-speed physical-charge attack.
 * These precision/salvo/rush cycles are original SideOps encounter adaptations,
 * not a complete canonical moveset or a nuclear-launch simulation.
 * A Map also guarantees unknown/inherited-looking keys fall back to their pack.
 */
export const SIDEOPS_BOSS_IDENTITY_TACTICS: ReadonlyMap<string, SideOpsBossTuning> = new Map([
  ['peaceWalkerChrysalis', {
    label: 'Chrysalis', pattern: ['precision', 'burst', 'spread'],
    aimMs: 1500, recoveryMs: 2100, volleyCount: 3, intervalMs: 280, projectileSpeed: 460, moveSpeed: 48
  }],
  ['peaceWalkerCocoon', {
    label: 'Cocoon', pattern: ['burst', 'spread', 'precision'],
    aimMs: 1800, recoveryMs: 2500, volleyCount: 5, intervalMs: 260, projectileSpeed: 390, moveSpeed: 24
  }],
  ['peaceWalkerZeke', {
    label: 'Metal Gear ZEKE', pattern: ['precision', 'burst', 'charge'],
    aimMs: 1600, recoveryMs: 2100, volleyCount: 3, intervalMs: 320, projectileSpeed: 540, moveSpeed: 54
  }],
  ['peaceWalkerBasilisk', {
    label: 'Peace Walker (Basilisk)', pattern: ['spread', 'burst', 'charge'],
    aimMs: 1450, recoveryMs: 2300, volleyCount: 3, intervalMs: 300, projectileSpeed: 370, moveSpeed: 40
  }]
]);

export interface SideOpsBossState {
  mode: SideOpsBossMode;
  phase: 1 | 2 | 3;
  direction: -1 | 1;
  stateUntil: number;
  nextShotAt: number;
  attackIndex: number;
  volleysFired: number;
  targetX: number;
  targetY: number;
}

export interface SideOpsBossInput {
  now: number;
  packId: SideOpsVisualPackId;
  /** Stable source texture identity, never the currently playing sheet/frame. */
  bossTextureKey?: string;
  active: boolean;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  playerX: number;
  playerY: number;
  hasLineOfSight: boolean;
  arenaMin: number;
  arenaMax: number;
  blockedLeft?: boolean;
  blockedRight?: boolean;
}

export interface SideOpsBossProjectile {
  velocityX: number;
  velocityY: number;
  damage: number;
}

export interface SideOpsBossDecision {
  state: SideOpsBossState;
  velocityX: number;
  direction: -1 | 1;
  animation: 'idle' | 'move' | 'attack';
  projectiles: SideOpsBossProjectile[];
  /** Only nonzero during a telegraphed physical charge. */
  contactDamage: number;
  vulnerable: boolean;
  telegraph: { x: number; y: number; kind: SideOpsBossAttackKind; progress: number } | null;
  status: string;
}

export function createSideOpsBossState(): SideOpsBossState {
  return {
    mode: 'dormant', phase: 1, direction: -1, stateUntil: 0, nextShotAt: 0,
    attackIndex: 0, volleysFired: 0, targetX: 0, targetY: 0
  };
}

/** Targets lock at the start of each windup so movement and cover can evade attacks. */
export function updateSideOpsBoss(previous: SideOpsBossState, input: SideOpsBossInput): SideOpsBossDecision {
  const state = { ...previous };
  const tuning = (input.bossTextureKey ? SIDEOPS_BOSS_IDENTITY_TACTICS.get(input.bossTextureKey) : undefined)
    ?? SIDEOPS_BOSS_TACTICS[input.packId];
  const healthRatio = input.maxHp > 0 ? Math.max(0, input.hp) / input.maxHp : 0;
  // Phases only advance; healing or temporary armor cannot rewind the encounter.
  state.phase = Math.max(state.phase, healthRatio <= 0.3 ? 3 : healthRatio <= 0.65 ? 2 : 1) as 1 | 2 | 3;
  const cadence = state.phase === 3 ? 0.78 : state.phase === 2 ? 0.9 : 1;
  const aimMs = tuning.aimMs * cadence;
  const decision: SideOpsBossDecision = {
    state, velocityX: 0, direction: state.direction, animation: 'idle', projectiles: [],
    contactDamage: 0, vulnerable: false, telegraph: null, status: ''
  };
  if (input.hp <= 0 || input.maxHp <= 0) {
    state.mode = 'defeated';
    decision.status = 'NEUTRALIZED';
    return decision;
  }
  if (!input.active) {
    state.mode = 'dormant';
    return decision;
  }
  if (state.mode === 'dormant') {
    state.mode = 'reposition';
    state.stateUntil = input.now + 650;
  }

  let attack = tuning.pattern[state.attackIndex % tuning.pattern.length];
  if (state.mode === 'recover') {
    decision.vulnerable = true;
    decision.status = 'RECOVERY — OPENING';
    if (input.now >= state.stateUntil) {
      state.mode = 'reposition';
      state.stateUntil = input.now + 500;
      state.attackIndex += 1;
      attack = tuning.pattern[state.attackIndex % tuning.pattern.length];
    }
  }

  if (state.mode === 'reposition') {
    decision.status = 'REPOSITIONING';
    const distance = Math.abs(input.playerX - input.x);
    state.direction = input.playerX < input.x ? -1 : 1;
    if (tuning.moveSpeed > 0 && distance > 320) decision.velocityX = tuning.moveSpeed * state.direction;
    else if (tuning.moveSpeed > 0 && distance < 170) decision.velocityX = -tuning.moveSpeed * state.direction;
    // Cover breaks targeting. The enemy may reposition, but cannot acquire through it.
    if (input.now >= state.stateUntil && input.hasLineOfSight && distance <= 720) {
      state.mode = 'telegraph';
      state.stateUntil = input.now + aimMs;
      state.targetX = input.playerX;
      state.targetY = input.playerY - 10;
      state.volleysFired = 0;
      decision.velocityX = 0;
    }
  }

  if (state.mode === 'telegraph') {
    decision.status = attack === 'charge' ? 'CHARGE — MOVE CLEAR' : 'TARGET LOCK — TAKE COVER';
    decision.telegraph = {
      x: state.targetX, y: state.targetY, kind: attack,
      progress: Math.max(0, Math.min(1, 1 - (state.stateUntil - input.now) / aimMs))
    };
    if (input.now >= state.stateUntil) {
      state.mode = 'attack';
      state.stateUntil = input.now + 520;
      state.nextShotAt = input.now;
      decision.telegraph = null;
    }
  }

  if (state.mode === 'attack') {
    decision.status = attack === 'charge' ? 'CHARGING' : 'FIRING';
    if (attack === 'charge') {
      const blocked = state.direction < 0 ? input.blockedLeft || input.x <= input.arenaMin : input.blockedRight || input.x >= input.arenaMax;
      if (input.now >= state.stateUntil || blocked) {
        state.mode = 'recover';
        state.stateUntil = input.now + tuning.recoveryMs;
      } else {
        decision.velocityX = state.direction * (230 + state.phase * 25);
        decision.contactDamage = 12 + state.phase * 4;
        decision.animation = 'attack';
      }
    } else if (!input.hasLineOfSight) {
      state.mode = 'recover';
      state.stateUntil = input.now + tuning.recoveryMs * 0.7;
    } else if (input.now >= state.nextShotAt) {
      const aimAngle = Math.atan2(state.targetY - (input.y - 12), state.targetX - input.x);
      const offsets = attack === 'spread' ? [-0.16, 0, 0.16] : [0];
      const speed = tuning.projectileSpeed * (state.phase === 3 ? 1.12 : 1);
      decision.projectiles = offsets.map((offset) => ({
        velocityX: Math.cos(aimAngle + offset) * speed,
        velocityY: Math.sin(aimAngle + offset) * speed,
        damage: 8 + state.phase * 2
      }));
      decision.animation = 'attack';
      state.volleysFired += 1;
      state.nextShotAt = input.now + tuning.intervalMs * cadence;
      if (state.volleysFired >= tuning.volleyCount) {
        state.mode = 'recover';
        state.stateUntil = input.now + tuning.recoveryMs * cadence;
      }
    }
  }

  if (decision.velocityX < 0 && (input.blockedLeft || input.x <= input.arenaMin)) decision.velocityX = 0;
  if (decision.velocityX > 0 && (input.blockedRight || input.x >= input.arenaMax)) decision.velocityX = 0;
  decision.direction = state.direction;
  if (decision.animation === 'idle' && decision.velocityX !== 0) decision.animation = 'move';
  decision.vulnerable = state.mode === 'recover';
  return decision;
}
