import type {
  Mgs1VrVs12BattleMissionProfile,
  Mgs1VrVs12CheckpointPosition,
  Mgs1VrVs12InventoryEntry,
  Mgs1VrVs12Level,
  Mgs1VrVs12WeaponId
} from '../../types/vr.types';

interface Vs12BattleSeed {
  checkpointPosition: Mgs1VrVs12CheckpointPosition;
  startsUnarmed?: boolean;
  initialInventory?: readonly Mgs1VrVs12InventoryEntry[];
  pickupInventory?: readonly Mgs1VrVs12InventoryEntry[];
  manualBehavior: string;
}

/** Canonical menu order used when cycling through the seven weapons available in VS. 12 BATTLE. */
export const MGS1_VR_VS12_WEAPON_ORDER = [
  'socom',
  'c4',
  'grenade',
  'claymore',
  'nikita',
  'psg1',
  'stinger'
] as const satisfies readonly Mgs1VrVs12WeaponId[];

const inventory = (
  ...entries: ReadonlyArray<readonly [weapon: Mgs1VrVs12WeaponId, ammo: number]>
): readonly Mgs1VrVs12InventoryEntry[] => entries.map(([weapon, ammo]) => ({ weapon, ammo }));

/**
 * Ammunition and checkpoint locations follow the Integral VR Disc inventory
 * tables. Level 6 is deliberately represented as a north-side pickup cache.
 */
const VS12_BATTLE_SEEDS: readonly Vs12BattleSeed[] = [
  {
    checkpointPosition: 'center',
    initialInventory: inventory(['psg1', 10], ['stinger', 3], ['nikita', 3], ['grenade', 3]),
    manualBehavior: 'Use the PSG1 on the east and west lanes, then Stinger, Nikita, and grenades against the northern and southern reinforcements.'
  },
  {
    checkpointPosition: 'south_west',
    initialInventory: inventory(['socom', 30], ['grenade', 1], ['nikita', 1], ['claymore', 1], ['c4', 1]),
    manualBehavior: 'Lead with the SOCOM, then lure alerted reinforcements into the single Claymore and C4 charges before using the remaining explosives.'
  },
  {
    checkpointPosition: 'north_east',
    initialInventory: inventory(['socom', 12], ['grenade', 1], ['nikita', 2], ['claymore', 2], ['c4', 1]),
    manualBehavior: 'Spend the limited SOCOM ammunition first, then combine Nikita missiles, Claymores, C4, and the single grenade after the alert.'
  },
  {
    checkpointPosition: 'north',
    initialInventory: inventory(['socom', 12], ['grenade', 3], ['stinger', 2], ['c4', 2]),
    manualBehavior: 'Fire down from the upper section with the SOCOM, then use grenades, Stinger missiles, and C4 on guards climbing toward the north platform.'
  },
  {
    checkpointPosition: 'south',
    initialInventory: inventory(['grenade', 8], ['stinger', 1], ['claymore', 1], ['c4', 1], ['psg1', 2]),
    manualBehavior: 'From the southern start, use grenades to break the first waves and finish survivors with the PSG1, Stinger, Claymore, and C4.'
  },
  {
    checkpointPosition: 'north_ammo_cache',
    startsUnarmed: true,
    pickupInventory: inventory(['socom', 12], ['grenade', 4], ['stinger', 2], ['c4', 2], ['psg1', 4]),
    manualBehavior: 'Begin unarmed, avoid the patrols, and reach the northern ammunition cache before fighting the twelve guards with its mixed arsenal.'
  },
  {
    checkpointPosition: 'north_center',
    initialInventory: inventory(['socom', 12], ['grenade', 6], ['claymore', 2], ['c4', 2]),
    manualBehavior: 'Use grenades to lure and thin the patrols, then clear the alerted reinforcements with the SOCOM, Claymores, and C4.'
  },
  {
    checkpointPosition: 'near_start',
    initialInventory: inventory(['socom', 12], ['grenade', 2], ['claymore', 2], ['c4', 1], ['psg1', 2]),
    manualBehavior: 'Open with the two grenades, use the PSG1 across the firing lane, then finish at close range with the SOCOM, Claymores, and C4.'
  }
];

export const MGS1_VR_VS12_BATTLE_PROFILES = VS12_BATTLE_SEEDS.map((seed, index) => {
  const level = (index + 1) as Mgs1VrVs12Level;
  const suffix = String(45 + level).padStart(3, '0');
  return {
    id: `mgs1_vr_special_vs12_${String(level).padStart(2, '0')}`,
    missionId: `vr_vs12_battle_${String(level).padStart(2, '0')}_${suffix}`,
    mode: 'vs12_battle',
    level,
    durationSeconds: 300,
    quota: 12,
    maxActiveEnemies: 4,
    checkpointPosition: seed.checkpointPosition,
    startsUnarmed: seed.startsUnarmed ?? false,
    initialInventory: seed.initialInventory ?? [],
    pickupInventory: seed.pickupInventory ?? [],
    manualBehavior: seed.manualBehavior
  };
}) satisfies readonly Mgs1VrVs12BattleMissionProfile[];

const vs12BattleProfileById = new Map(
  MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => [profile.id, profile] as const)
);
const vs12BattleProfileByMissionId = new Map(
  MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => [profile.missionId, profile] as const)
);

export const getMgs1VrVs12BattleProfileById = (
  profileId: string | null | undefined
): Mgs1VrVs12BattleMissionProfile | undefined => profileId ? vs12BattleProfileById.get(profileId) : undefined;

export const getMgs1VrVs12BattleProfileForMission = (
  missionId: string | null | undefined
): Mgs1VrVs12BattleMissionProfile | undefined => missionId ? vs12BattleProfileByMissionId.get(missionId) : undefined;
