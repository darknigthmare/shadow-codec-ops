import type {
  Mgs1VrVs12InventoryEntry,
  Mgs1VrVs12WeaponId
} from '../../types/vr.types';
import { MGS1_VR_VS12_WEAPON_ORDER } from './mgs1VrVs12BattleRegistry';

export type Mgs1VrVs12SelectedWeapon = 'unarmed' | Mgs1VrVs12WeaponId;
export type Mgs1VrVs12AmmoState = Record<Mgs1VrVs12WeaponId, number>;

const EMPTY_AMMO_STATE: Mgs1VrVs12AmmoState = {
  socom: 0,
  psg1: 0,
  grenade: 0,
  c4: 0,
  claymore: 0,
  stinger: 0,
  nikita: 0
};

export function createVs12AmmoState(
  entries: readonly Mgs1VrVs12InventoryEntry[] = []
): Mgs1VrVs12AmmoState {
  const state = { ...EMPTY_AMMO_STATE };
  entries.forEach(({ weapon, ammo }) => {
    state[weapon] = Math.max(0, Math.floor(ammo));
  });
  return state;
}

export function collectVs12Inventory(
  state: Mgs1VrVs12AmmoState,
  entries: readonly Mgs1VrVs12InventoryEntry[]
): Mgs1VrVs12AmmoState {
  const next = { ...state };
  entries.forEach(({ weapon, ammo }) => {
    next[weapon] += Math.max(0, Math.floor(ammo));
  });
  return next;
}

export function consumeVs12Ammo(
  state: Mgs1VrVs12AmmoState,
  weapon: Mgs1VrVs12WeaponId,
  amount = 1
): { state: Mgs1VrVs12AmmoState; consumed: boolean } {
  const requested = Math.max(1, Math.floor(amount));
  if (state[weapon] < requested) return { state, consumed: false };
  return {
    state: { ...state, [weapon]: state[weapon] - requested },
    consumed: true
  };
}

export function getVs12WeaponCycle(
  state: Mgs1VrVs12AmmoState,
  retainedWeapons: readonly Mgs1VrVs12WeaponId[] = []
): Mgs1VrVs12SelectedWeapon[] {
  const retained = new Set(retainedWeapons);
  return [
    'unarmed',
    ...MGS1_VR_VS12_WEAPON_ORDER.filter((weapon) => state[weapon] > 0 || retained.has(weapon))
  ];
}

export function selectInitialVs12Weapon(state: Mgs1VrVs12AmmoState): Mgs1VrVs12SelectedWeapon {
  return MGS1_VR_VS12_WEAPON_ORDER.find((weapon) => state[weapon] > 0) ?? 'unarmed';
}

export function cycleVs12Weapon(
  state: Mgs1VrVs12AmmoState,
  current: Mgs1VrVs12SelectedWeapon,
  direction: -1 | 1,
  retainedWeapons: readonly Mgs1VrVs12WeaponId[] = []
): Mgs1VrVs12SelectedWeapon {
  const cycle = getVs12WeaponCycle(state, retainedWeapons);
  const currentIndex = Math.max(0, cycle.indexOf(current));
  return cycle[(currentIndex + direction + cycle.length) % cycle.length];
}
