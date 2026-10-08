import type { SideOpsBossDecision } from './sideOpsEnemyBossTactics';
import type { SideOpsSpecialActorDefinition } from './sideOpsSpecialActorAnimationRegistry';

export const SIDEOPS_MECHA_COMBAT_ACTIONS = ['idle', 'move', 'charge', 'attack', 'recover', 'hit', 'death', 'scan'] as const;
export type SideOpsMechaCombatAction = typeof SIDEOPS_MECHA_COMBAT_ACTIONS[number];

export interface SideOpsAuthoredBossCombatContract {
  readonly recovery: 'recover' | 'reload';
  readonly dormant: 'scan' | 'crouch' | 'idle';
}

/** Weapon windup bosses may have machine recovery or a genuinely authored reload. */
export function getSideOpsAuthoredBossCombatContract(actor: SideOpsSpecialActorDefinition | undefined): SideOpsAuthoredBossCombatContract | undefined {
  if (!actor || (actor.kind !== 'machine' && actor.kind !== 'boss')) return undefined;
  const states = new Set([...actor.states.core, ...actor.states.special]);
  if (!(['idle', 'move', 'charge', 'attack', 'hit', 'death'] as const).every((state) => states.has(state))) return undefined;
  const recovery = states.has('recover') ? 'recover' : states.has('reload') ? 'reload' : undefined;
  if (!recovery) return undefined;
  return { recovery, dormant: states.has('scan') ? 'scan' : states.has('crouch') ? 'crouch' : 'idle' };
}

/** Opt in by a complete authored contract, never by a texture-name guess. */
export function hasSideOpsMechaCombatAnimations(actor: SideOpsSpecialActorDefinition | undefined): boolean {
  if (actor?.kind !== 'machine') return false;
  const states = new Set([...actor.states.core, ...actor.states.special]);
  return SIDEOPS_MECHA_COMBAT_ACTIONS.every((state) => states.has(state));
}

export interface SideOpsMechaCombatPresentation {
  readonly loop: 'idle' | 'move' | 'scan' | 'crouch';
  readonly action?: 'charge' | 'attack' | 'recover' | 'reload' | 'death';
  /** Keep a completed windup visible until the AI leaves its telegraph window. */
  readonly holdFinalFrame?: true;
  /** Deduplicates one event across several rendered frames/projectiles. */
  readonly eventKey?: string;
}

/**
 * Authored `charge` means weapon windup, NOT the AI's physical rush.
 * Rush movement uses the real movement poses; no unseen weapon is aliased.
 * Hit/death locks remain scene-owned and outrank these normal combat requests.
 */
export function resolveSideOpsMechaCombatAnimation(
  decision: SideOpsBossDecision,
  contract: SideOpsAuthoredBossCombatContract = { recovery: 'recover', dormant: 'scan' }
): SideOpsMechaCombatPresentation {
  const { state } = decision;
  if (state.mode === 'defeated') return { loop: 'idle', action: 'death', eventKey: 'defeated' };
  // The final salvo already changes mode to recover. Its actual shots must win.
  if (decision.projectiles.length > 0) {
    return { loop: 'idle', action: 'attack', eventKey: `shot:${state.attackIndex}:${state.volleysFired}:${state.nextShotAt}` };
  }
  if (state.mode === 'telegraph') {
    return { loop: 'idle', action: 'charge', holdFinalFrame: true, eventKey: `windup:${state.attackIndex}:${state.stateUntil}` };
  }
  if (decision.contactDamage > 0 || decision.velocityX !== 0) return { loop: 'move' };
  if (state.mode === 'recover') {
    return { loop: 'idle', action: contract.recovery, eventKey: `recover:${state.attackIndex}:${state.stateUntil}` };
  }
  return { loop: state.mode === 'dormant' ? contract.dormant : 'idle' };
}

export interface SideOpsMechaCombatPlaybackState {
  readonly priority: number;
  readonly lastEventKey: unknown;
  /** Also true for a stopped animation still displaying its terminal frame. */
  readonly currentActionMatches: boolean;
}

/**
 * Separate event deduplication from pose persistence. A hit keeps its full lock;
 * after it ends, an already-started windup resumes at its final aiming pose.
 * No new timer/lock is created by holding, so a salvo can replace it immediately.
 */
export function resolveSideOpsMechaCombatPlayback(
  presentation: SideOpsMechaCombatPresentation,
  playback: SideOpsMechaCombatPlaybackState
): 'loop' | 'play-action' | 'hold-final' | 'wait' {
  if (presentation.holdFinalFrame) {
    if (playback.priority > 0) return 'wait';
    if (presentation.eventKey === playback.lastEventKey) {
      return playback.currentActionMatches ? 'wait' : 'hold-final';
    }
    return 'play-action';
  }
  if (presentation.action && presentation.eventKey !== playback.lastEventKey
    && (playback.priority === 0 || (presentation.action === 'attack' && playback.priority <= 2))) return 'play-action';
  return 'loop';
}
