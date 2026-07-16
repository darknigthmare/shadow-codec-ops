import { describe, expect, it } from 'vitest';
import vrMissionsJson from '../../data/vrMissions.json';
import type { VrMissionDefinition } from '../../types/vr.types';
import {
  getMgs1VrMinuteBattleProfileById,
  getMgs1VrMinuteBattleProfileForMission,
  MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES,
  MGS1_VR_MINUTE_BATTLE_LOADOUT_ORDER,
  MGS1_VR_MINUTE_BATTLE_PROFILES,
  MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES
} from './mgs1VrMinuteBattleRegistry';

const missions = vrMissionsJson as VrMissionDefinition[];

describe('MGS1 VR 1 MIN. BATTLE registry', () => {
  it('defines nine VS TARGET and nine VS ENEMY profiles in canon loadout order', () => {
    expect(MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES).toHaveLength(9);
    expect(MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES).toHaveLength(9);
    expect(MGS1_VR_MINUTE_BATTLE_PROFILES).toHaveLength(18);
    expect(MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES.map((profile) => profile.loadout)).toEqual(
      MGS1_VR_MINUTE_BATTLE_LOADOUT_ORDER
    );
    expect(MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES.map((profile) => profile.loadout)).toEqual(
      MGS1_VR_MINUTE_BATTLE_LOADOUT_ORDER
    );
  });

  it('keeps every drill at one minute with a positive clear quota', () => {
    expect(MGS1_VR_MINUTE_BATTLE_PROFILES.every((profile) => profile.durationSeconds === 60)).toBe(true);
    expect(MGS1_VR_MINUTE_BATTLE_PROFILES.every((profile) => profile.quota > 0)).toBe(true);
    expect(MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES.map((profile) => profile.quota)).toEqual([
      10, 15, 25, 25, 60, 18, 35, 10, 17
    ]);
    expect(MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES.map((profile) => profile.quota)).toEqual([
      4, 15, 10, 18, 5, 7, 12, 7, 10
    ]);
    expect(MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES.every((profile) => Boolean(profile.targetFamily))).toBe(true);
    expect(MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES.every((profile) => profile.targetFamily === null)).toBe(true);
  });

  it('links the 18 profiles one-to-one with the appended mission definitions', () => {
    expect(missions).toHaveLength(45);
    expect(missions.slice(27).map((mission) => mission.id)).toEqual(
      MGS1_VR_MINUTE_BATTLE_PROFILES.map((profile) => profile.missionId)
    );
    expect(new Set(MGS1_VR_MINUTE_BATTLE_PROFILES.map((profile) => profile.id)).size).toBe(18);
    expect(new Set(MGS1_VR_MINUTE_BATTLE_PROFILES.map((profile) => profile.missionId)).size).toBe(18);

    for (const profile of MGS1_VR_MINUTE_BATTLE_PROFILES) {
      const mission = missions.find((entry) => entry.id === profile.missionId);
      expect(mission, profile.missionId).toBeDefined();
      expect(mission?.category).toBe('special_minute_battle');
      expect(mission?.missionProfileId).toBe(profile.id);
      expect(mission?.requirements.targetTimeSeconds).toBe(60);
      expect(getMgs1VrMinuteBattleProfileById(profile.id)).toBe(profile);
      expect(getMgs1VrMinuteBattleProfileForMission(profile.missionId)).toBe(profile);
    }
  });

  it('returns undefined for empty or unknown lookup keys', () => {
    expect(getMgs1VrMinuteBattleProfileById(undefined)).toBeUndefined();
    expect(getMgs1VrMinuteBattleProfileById('unknown')).toBeUndefined();
    expect(getMgs1VrMinuteBattleProfileForMission(null)).toBeUndefined();
    expect(getMgs1VrMinuteBattleProfileForMission('unknown')).toBeUndefined();
  });
});
