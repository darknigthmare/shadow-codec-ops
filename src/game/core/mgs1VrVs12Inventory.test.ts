import { describe, expect, it } from 'vitest';
import {
  collectVs12Inventory,
  consumeVs12Ammo,
  createVs12AmmoState,
  cycleVs12Weapon,
  getVs12WeaponCycle,
  selectInitialVs12Weapon
} from './mgs1VrVs12Inventory';

describe('MGS1 VR VS. 12 BATTLE inventory', () => {
  it('builds the exact finite arsenal without inventing FAMAS ammunition', () => {
    const state = createVs12AmmoState([
      { weapon: 'socom', ammo: 30 },
      { weapon: 'c4', ammo: 1 }
    ]);

    expect(state.socom).toBe(30);
    expect(state.c4).toBe(1);
    expect('famas' in state).toBe(false);
    expect(selectInitialVs12Weapon(state)).toBe('socom');
  });

  it('cycles through unarmed and only weapons that still have ammunition', () => {
    const state = createVs12AmmoState([
      { weapon: 'socom', ammo: 12 },
      { weapon: 'grenade', ammo: 2 }
    ]);

    expect(getVs12WeaponCycle(state)).toEqual(['unarmed', 'socom', 'grenade']);
    expect(cycleVs12Weapon(state, 'socom', 1)).toBe('grenade');
    expect(cycleVs12Weapon(state, 'grenade', 1)).toBe('unarmed');
    expect(cycleVs12Weapon(state, 'unarmed', -1)).toBe('grenade');
  });

  it('retains an empty C4 slot while a planted charge still needs its detonator', () => {
    const state = createVs12AmmoState([{ weapon: 'c4', ammo: 0 }]);

    expect(getVs12WeaponCycle(state)).toEqual(['unarmed']);
    expect(getVs12WeaponCycle(state, ['c4'])).toEqual(['unarmed', 'c4']);
    expect(cycleVs12Weapon(state, 'unarmed', 1, ['c4'])).toBe('c4');
  });

  it('consumes ammunition atomically and refuses an empty shot', () => {
    const initial = createVs12AmmoState([{ weapon: 'psg1', ammo: 1 }]);
    const first = consumeVs12Ammo(initial, 'psg1');
    const empty = consumeVs12Ammo(first.state, 'psg1');

    expect(first.consumed).toBe(true);
    expect(first.state.psg1).toBe(0);
    expect(empty.consumed).toBe(false);
    expect(empty.state).toBe(first.state);
  });

  it('collects the level 6 north cache without replacing existing ammo', () => {
    const collected = collectVs12Inventory(
      createVs12AmmoState(),
      [
        { weapon: 'socom', ammo: 12 },
        { weapon: 'psg1', ammo: 4 },
        { weapon: 'stinger', ammo: 2 }
      ]
    );

    expect(collected.socom).toBe(12);
    expect(collected.psg1).toBe(4);
    expect(collected.stinger).toBe(2);
  });
});
