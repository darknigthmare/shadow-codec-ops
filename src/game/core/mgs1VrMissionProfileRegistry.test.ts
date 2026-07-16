import { describe, expect, it } from 'vitest';
import vrMissionsJson from '../../data/vrMissions.json';
import type { Mgs1VrTargetFamily, VrMissionDefinition } from '../../types/vr.types';
import {
  getMgs1VrMissionProfileById,
  getMgs1VrMissionProfileForMission,
  MGS1_VR_CANON_TARGET_BEHAVIORS,
  MGS1_VR_CANON_TARGET_FAMILIES,
  MGS1_VR_CANON_WEAPONS,
  MGS1_VR_MISSION_PROFILES
} from './mgs1VrMissionProfileRegistry';

const missions = vrMissionsJson as VrMissionDefinition[];
const originalMissionIds = [
  'vr_dock_sprint_001',
  'vr_ghost_dock_002',
  'vr_socom_range_003',
  'vr_cqc_quiet_004',
  'vr_chaff_breaker_005',
  'vr_armored_duel_006'
] as const;

const behaviorFlags = (family: Mgs1VrTargetFamily) => {
  const { manualBehavior: _manualBehavior, ...flags } = MGS1_VR_CANON_TARGET_BEHAVIORS[family];
  return flags;
};

describe('MGS1 VR canonical mission profile registry', () => {
  it('preserves the six existing missions and adds eight focused drills', () => {
    expect(missions.slice(0, originalMissionIds.length).map((mission) => mission.id)).toEqual(originalMissionIds);
    expect(missions).toHaveLength(14);
    expect(new Set(missions.map((mission) => mission.id)).size).toBe(missions.length);
  });

  it('locks the eight official target names and their manual-derived behavior flags', () => {
    expect(MGS1_VR_CANON_TARGET_FAMILIES).toEqual([
      'CUBE-B',
      'CUBE-R',
      'KOKESHI-B',
      'KOKESHI-G',
      'MOVE-B',
      'MOVE-R',
      'WALL',
      'UFO'
    ]);
    expect(Object.keys(MGS1_VR_CANON_TARGET_BEHAVIORS)).toEqual(MGS1_VR_CANON_TARGET_FAMILIES);
    expect(behaviorFlags('CUBE-B')).toEqual({ moving: false, explosive: false, flying: false, destructible: false });
    expect(behaviorFlags('CUBE-R')).toEqual({ moving: false, explosive: true, flying: false, destructible: false });
    expect(behaviorFlags('KOKESHI-B')).toEqual({ moving: true, explosive: false, flying: false, destructible: false });
    expect(behaviorFlags('KOKESHI-G')).toEqual({ moving: true, explosive: false, flying: false, destructible: false });
    expect(behaviorFlags('MOVE-B')).toEqual({ moving: true, explosive: false, flying: false, destructible: false });
    expect(behaviorFlags('MOVE-R')).toEqual({ moving: true, explosive: true, flying: false, destructible: false });
    expect(behaviorFlags('WALL')).toEqual({ moving: false, explosive: false, flying: false, destructible: true });
    expect(behaviorFlags('UFO')).toEqual({ moving: true, explosive: true, flying: true, destructible: false });
  });

  it('covers the eight requested weapons and all eight official target families', () => {
    const weapons = MGS1_VR_MISSION_PROFILES.flatMap((entry) => entry.weapon ? [entry.weapon] : []);
    expect(weapons).toHaveLength(8);
    expect(new Set(weapons)).toEqual(new Set(MGS1_VR_CANON_WEAPONS));
    expect(new Set(MGS1_VR_MISSION_PROFILES.map((entry) => entry.targetFamily))).toEqual(
      new Set(MGS1_VR_CANON_TARGET_FAMILIES)
    );
  });

  it('keeps every profile linked to mission data and its canonical target behavior', () => {
    expect(MGS1_VR_MISSION_PROFILES).toHaveLength(9);
    expect(new Set(MGS1_VR_MISSION_PROFILES.map((entry) => entry.id)).size).toBe(9);
    expect(new Set(MGS1_VR_MISSION_PROFILES.map((entry) => entry.missionId)).size).toBe(9);

    for (const profile of MGS1_VR_MISSION_PROFILES) {
      const mission = missions.find((entry) => entry.id === profile.missionId);
      expect(mission, profile.missionId).toBeDefined();
      expect(mission?.missionProfileId).toBe(profile.id);
      expect(mission?.requirements.minObjectivesCompleted).toBe(profile.targetCount);
      expect(Number.isInteger(profile.targetCount)).toBe(true);
      expect(profile.targetCount).toBeGreaterThan(0);
      expect(getMgs1VrMissionProfileById(profile.id)).toBe(profile);
      expect(getMgs1VrMissionProfileForMission(profile.missionId)).toBe(profile);

      const canonical = MGS1_VR_CANON_TARGET_BEHAVIORS[profile.targetFamily];
      expect(profile.moving).toBe(canonical.moving);
      expect(profile.explosive).toBe(canonical.explosive);
      expect(profile.flying).toBe(canonical.flying);
      expect(profile.destructible).toBe(canonical.destructible);
      expect(profile.manualBehavior).toBe(canonical.manualBehavior);
      expect(mission?.requirements.requiredTool).toBe(profile.weapon ?? 'cqc');
    }
  });

  it('keeps KOKESHI-G faithful to bare-handed training instead of assigning a firearm', () => {
    const profile = getMgs1VrMissionProfileById('mgs1_vr_profile_unarmed_kokeshi_g');
    expect(profile).toMatchObject({
      mode: 'special',
      weapon: null,
      targetFamily: 'KOKESHI-G',
      moving: true,
      explosive: false,
      flying: false,
      destructible: false
    });
    expect(getMgs1VrMissionProfileById(undefined)).toBeUndefined();
    expect(getMgs1VrMissionProfileForMission('unknown')).toBeUndefined();
  });
});
