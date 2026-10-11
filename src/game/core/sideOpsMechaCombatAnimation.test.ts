import { describe, expect, it } from 'vitest';
import { createSideOpsBossState, updateSideOpsBoss, type SideOpsBossDecision, type SideOpsBossInput } from './sideOpsEnemyBossTactics';
import { getSideOpsAuthoredBossCombatContract, hasSideOpsMechaCombatAnimations, resolveSideOpsMechaCombatAnimation, resolveSideOpsMechaCombatPlayback } from './sideOpsMechaCombatAnimation';
import type { SideOpsSpecialActorDefinition } from './sideOpsSpecialActorAnimationRegistry';

const actor: SideOpsSpecialActorDefinition = {
  id: 'test-mecha', name: 'Test mecha', era: 'mgsv', kind: 'machine',
  sourceTextureKey: 'testMecha', sourcePath: '/test.png', sourceFacing: 'left',
  frameSize: 256, padding: 16, bodyWidth: 144, bodyHeight: 144,
  states: { core: ['idle', 'move', 'charge', 'attack'], special: ['recover', 'hit', 'death', 'scan'] }
};
const base: SideOpsBossInput = {
  now: 0, packId: 'mgsv_phantom_pain', active: true, hp: 20, maxHp: 20,
  x: 1000, y: 454, playerX: 700, playerY: 454, hasLineOfSight: true, arenaMin: 600, arenaMax: 1400
};
function decision(overrides: Partial<SideOpsBossDecision> = {}): SideOpsBossDecision {
  return { state: createSideOpsBossState(), velocityX: 0, direction: -1, animation: 'idle',
    projectiles: [], contactDamage: 0, vulnerable: false, telegraph: null, status: '', ...overrides };
}

describe('authored mecha combat presentation', () => {
  it('opts in complete machine contracts without a hard-coded era/texture list', () => {
    expect(hasSideOpsMechaCombatAnimations(actor)).toBe(true);
    expect(hasSideOpsMechaCombatAnimations({ ...actor, id: 'future-machine', sourceTextureKey: 'futureTexture' })).toBe(true);
    expect(hasSideOpsMechaCombatAnimations(undefined)).toBe(false);
    expect(hasSideOpsMechaCombatAnimations({ ...actor, kind: 'npc' })).toBe(false);
    expect(hasSideOpsMechaCombatAnimations({ ...actor, states: { ...actor.states, special: ['railgun', 'hit', 'death', 'scan'] } })).toBe(false);
  });

  it('uses scan while dormant and real movement poses for repositioning', () => {
    expect(resolveSideOpsMechaCombatAnimation(decision())).toEqual({ loop: 'scan' });
    expect(resolveSideOpsMechaCombatAnimation(decision({ velocityX: -52 }))).toEqual({ loop: 'move' });
  });

  it('uses Olga-style authored reload and crouch without treating Ocelot or an NPC as a mecha', () => {
    const olga = { ...actor, kind: 'boss' as const, states: { core: actor.states.core, special: ['reload', 'hit', 'death', 'crouch'] as const } };
    const contract = getSideOpsAuthoredBossCombatContract(olga)!;
    expect(contract).toEqual({ recovery: 'reload', dormant: 'crouch' });
    expect(resolveSideOpsMechaCombatAnimation(decision(), contract).loop).toBe('crouch');
    expect(resolveSideOpsMechaCombatAnimation(decision({ state: { ...createSideOpsBossState(), mode: 'recover' } }), contract).action).toBe('reload');
    expect(getSideOpsAuthoredBossCombatContract({ ...olga, states: { ...olga.states, core: ['idle', 'move', 'attack', 'reload'] } })).toBeUndefined();
    expect(getSideOpsAuthoredBossCombatContract({ ...olga, kind: 'npc' })).toBeUndefined();
  });

  it('gives each windup and recovery window a stable, distinct event key', () => {
    const state = { ...createSideOpsBossState(), mode: 'telegraph' as const, stateUntil: 2100 };
    const windup = resolveSideOpsMechaCombatAnimation(decision({ state }));
    expect(windup.action).toBe('charge');
    expect(windup.holdFinalFrame).toBe(true);
    expect(resolveSideOpsMechaCombatAnimation(decision({ state }))).toEqual(windup);
    const recovery = resolveSideOpsMechaCombatAnimation(decision({ state: { ...state, mode: 'recover', stateUntil: 4700 } }));
    expect(recovery.action).toBe('recover');
    expect(recovery.eventKey).not.toBe(windup.eventKey);
  });

  it('presents the last real salvo before recovery, one event for its whole spread', () => {
    let result = updateSideOpsBoss(createSideOpsBossState(), { ...base, packId: 'mg2' });
    result = updateSideOpsBoss(result.state, { ...base, packId: 'mg2', now: 650 });
    for (const now of [1800, 2100, 2400]) result = updateSideOpsBoss(result.state, { ...base, packId: 'mg2', now });
    expect(result.state.mode).toBe('recover');
    expect(result.projectiles).toHaveLength(1);
    const attack = resolveSideOpsMechaCombatAnimation(result);
    expect(attack.action).toBe('attack');
    expect(resolveSideOpsMechaCombatAnimation({ ...result, projectiles: [...result.projectiles, ...result.projectiles] })).toEqual(attack);
    const next = updateSideOpsBoss(result.state, { ...base, packId: 'mg2', now: 2401 });
    expect(resolveSideOpsMechaCombatAnimation(next).action).toBe('recover');
  });

  it('does not mislabel a physical rush as the weapon windup or weapon fire', () => {
    const rush = decision({ state: { ...createSideOpsBossState(), mode: 'attack' }, velocityX: 255, contactDamage: 16, animation: 'attack' });
    expect(resolveSideOpsMechaCombatAnimation(rush)).toEqual({ loop: 'move' });
  });

  it('requests no recoil while waiting between actual shots, and defeat overrides stale shots', () => {
    expect(resolveSideOpsMechaCombatAnimation(decision({ state: { ...createSideOpsBossState(), mode: 'attack' } }))).toEqual({ loop: 'idle' });
    const dead = decision({ state: { ...createSideOpsBossState(), mode: 'defeated' }, projectiles: [{ velocityX: 1, velocityY: 0, damage: 1 }] });
    expect(resolveSideOpsMechaCombatAnimation(dead)).toEqual({ loop: 'idle', action: 'death', eventKey: 'defeated' });
  });
});

describe('authored boss windup playback', () => {
  const windup = resolveSideOpsMechaCombatAnimation(decision({
    state: { ...createSideOpsBossState(), mode: 'telegraph', stateUntil: 1450 }
  }));
  const settled = { priority: 0, lastEventKey: windup.eventKey, currentActionMatches: true };

  it('plays a new windup once, then retains its final pose after its shorter clip ends', () => {
    expect(resolveSideOpsMechaCombatPlayback(windup, { ...settled, lastEventKey: undefined })).toBe('play-action');
    expect(resolveSideOpsMechaCombatPlayback(windup, { ...settled, priority: 2 })).toBe('wait');
    // Charge is 800 ms + 34 ms lock; the Sahel AI still aims until 1,450 ms.
    for (const now of [834, 1000, 1449]) {
      const stillAiming = updateSideOpsBoss({ ...createSideOpsBossState(), mode: 'telegraph', stateUntil: 1450 }, { ...base, now });
      expect(stillAiming.state.mode).toBe('telegraph');
      expect(resolveSideOpsMechaCombatPlayback(resolveSideOpsMechaCombatAnimation(stillAiming), settled)).toBe('wait');
    }
  });

  it('lets a hit finish completely and restores the final aiming pose without replaying windup', () => {
    expect(resolveSideOpsMechaCombatPlayback(windup, { ...settled, priority: 3, currentActionMatches: false })).toBe('wait');
    expect(resolveSideOpsMechaCombatPlayback(windup, { ...settled, currentActionMatches: false })).toBe('hold-final');
    // Holding adds no priority lock; subsequent updates keep the frame unchanged.
    expect(resolveSideOpsMechaCombatPlayback(windup, settled)).toBe('wait');
  });

  it('does not skip a windup that was blocked by an earlier hit, or overwrite death', () => {
    const notStarted = { priority: 3, lastEventKey: 'old-salvo', currentActionMatches: false };
    expect(resolveSideOpsMechaCombatPlayback(windup, notStarted)).toBe('wait');
    expect(resolveSideOpsMechaCombatPlayback(windup, { ...notStarted, priority: 0 })).toBe('play-action');
    expect(resolveSideOpsMechaCombatPlayback(windup, { ...settled, priority: 4 })).toBe('wait');
  });

  it('starts each new aiming window even when the previous charge frame remains visible', () => {
    const next = { ...windup, eventKey: 'windup:1:4200' };
    expect(resolveSideOpsMechaCombatPlayback(next, settled)).toBe('play-action');
  });

  it('releases the hold immediately for movement or a real salvo, never overriding hit locks', () => {
    expect(resolveSideOpsMechaCombatPlayback({ loop: 'move' }, settled)).toBe('loop');
    const shot = resolveSideOpsMechaCombatAnimation(decision({
      state: { ...createSideOpsBossState(), mode: 'attack' }, projectiles: [{ velocityX: -490, velocityY: 0, damage: 12 }]
    }));
    for (const priority of [0, 2]) expect(resolveSideOpsMechaCombatPlayback(shot, { ...settled, priority })).toBe('play-action');
    for (const priority of [3, 4]) expect(resolveSideOpsMechaCombatPlayback(shot, { ...settled, priority })).toBe('loop');
    expect(resolveSideOpsMechaCombatPlayback(shot, { ...settled, lastEventKey: shot.eventKey })).toBe('loop');
  });

  it('waits for final recoil before acknowledging recovery, preserving salvo event deduplication', () => {
    const recovery = resolveSideOpsMechaCombatAnimation(decision({ state: { ...createSideOpsBossState(), mode: 'recover', stateUntil: 4200 } }));
    const recoil = { priority: 2, lastEventKey: 'shot:0:3:2300', currentActionMatches: false };
    expect(resolveSideOpsMechaCombatPlayback(recovery, recoil)).toBe('loop');
    expect(resolveSideOpsMechaCombatPlayback(recovery, { ...recoil, priority: 0 })).toBe('play-action');
  });
});
