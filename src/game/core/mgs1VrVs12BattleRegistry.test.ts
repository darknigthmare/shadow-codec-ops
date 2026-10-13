import { describe, expect, it } from 'vitest';
import vrMissionsJson from '../../data/vrMissions.json';
import type { Mgs1VrVs12InventoryEntry, VrMissionDefinition } from '../../types/vr.types';
import {
  getMgs1VrVs12BattleProfileById,
  getMgs1VrVs12BattleProfileForMission,
  MGS1_VR_VS12_BATTLE_PROFILES,
  MGS1_VR_VS12_WEAPON_ORDER
} from './mgs1VrVs12BattleRegistry';

const missions = vrMissionsJson as VrMissionDefinition[];
const asPairs = (entries: readonly Mgs1VrVs12InventoryEntry[]) =>
  entries.map(({ weapon, ammo }) => [weapon, ammo] as const);

describe('MGS1 VR VS. 12 BATTLE registry', () => {
  it('defines all eight stages and their runtime combat contract', () => {
    expect(MGS1_VR_VS12_BATTLE_PROFILES).toHaveLength(8);
    expect(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => profile.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(MGS1_VR_VS12_BATTLE_PROFILES.every((profile) => profile.durationSeconds === 300)).toBe(true);
    expect(MGS1_VR_VS12_BATTLE_PROFILES.every((profile) => profile.quota === 12)).toBe(true);
    expect(MGS1_VR_VS12_BATTLE_PROFILES.every((profile) => profile.maxActiveEnemies === 4)).toBe(true);
    expect(MGS1_VR_VS12_WEAPON_ORDER).toEqual([
      'socom',
      'c4',
      'grenade',
      'claymore',
      'nikita',
      'psg1',
      'stinger'
    ]);
  });

  it('preserves the exact canonical ammunition inventories', () => {
    expect(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => asPairs(profile.initialInventory))).toEqual([
      [['psg1', 10], ['stinger', 3], ['nikita', 3], ['grenade', 3]],
      [['socom', 30], ['grenade', 1], ['nikita', 1], ['claymore', 1], ['c4', 1]],
      [['socom', 12], ['grenade', 1], ['nikita', 2], ['claymore', 2], ['c4', 1]],
      [['socom', 12], ['grenade', 3], ['stinger', 2], ['c4', 2]],
      [['grenade', 8], ['stinger', 1], ['claymore', 1], ['c4', 1], ['psg1', 2]],
      [],
      [['socom', 12], ['grenade', 6], ['claymore', 2], ['c4', 2]],
      [['socom', 12], ['grenade', 2], ['claymore', 2], ['c4', 1], ['psg1', 2]]
    ]);
    expect(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => asPairs(profile.pickupInventory))).toEqual([
      [],
      [],
      [],
      [],
      [],
      [['socom', 12], ['grenade', 4], ['stinger', 2], ['c4', 2], ['psg1', 4]],
      [],
      []
    ]);
  });

  it('keeps level 6 unarmed until the north cache and preserves every checkpoint location', () => {
    expect(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => profile.startsUnarmed)).toEqual([
      false, false, false, false, false, true, false, false
    ]);
    expect(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => profile.checkpointPosition)).toEqual([
      'center',
      'south_west',
      'north_east',
      'north',
      'south',
      'north_ammo_cache',
      'north_center',
      'near_start'
    ]);
  });

  it('links IDs 046-053 one-to-one with the contiguous catalogue block', () => {
    expect(missions).toHaveLength(53);
    expect(missions.slice(45).map((mission) => mission.id)).toEqual(
      MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => profile.missionId)
    );
    expect(new Set(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => profile.id)).size).toBe(8);
    expect(new Set(MGS1_VR_VS12_BATTLE_PROFILES.map((profile) => profile.missionId)).size).toBe(8);

    for (const profile of MGS1_VR_VS12_BATTLE_PROFILES) {
      const mission = missions.find((entry) => entry.id === profile.missionId);
      expect(mission, profile.missionId).toBeDefined();
      expect(mission?.category).toBe('special_vs12_battle');
      expect(mission?.missionProfileId).toBe(profile.id);
      expect(mission?.requirements).toMatchObject({
        targetTimeSeconds: 300,
        minKills: 12,
        minObjectivesCompleted: 12,
        requiredTool: 'mixed'
      });
      expect(getMgs1VrVs12BattleProfileById(profile.id)).toBe(profile);
      expect(getMgs1VrVs12BattleProfileForMission(profile.missionId)).toBe(profile);
    }
  });

  it('returns undefined for empty or unknown lookup keys', () => {
    expect(getMgs1VrVs12BattleProfileById(undefined)).toBeUndefined();
    expect(getMgs1VrVs12BattleProfileById('unknown')).toBeUndefined();
    expect(getMgs1VrVs12BattleProfileForMission(null)).toBeUndefined();
    expect(getMgs1VrVs12BattleProfileForMission('unknown')).toBeUndefined();
  });
});
