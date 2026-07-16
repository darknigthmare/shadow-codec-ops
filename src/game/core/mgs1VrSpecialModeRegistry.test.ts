import { describe, expect, it } from 'vitest';
import vrExtrasJson from '../../data/vrExtras.json';
import vrMissionsJson from '../../data/vrMissions.json';
import type {
  Mgs1VrMysteryEvidenceId,
  Mgs1VrPhotoshootExtra,
  VrMissionDefinition
} from '../../types/vr.types';
import {
  getMgs1VrSpecialProfileById,
  getMgs1VrSpecialProfileForMission,
  MGS1_VR_MYSTERY_PROFILES,
  MGS1_VR_NINJA_PROFILES,
  MGS1_VR_SPECIAL_MISSION_PROFILES
} from './mgs1VrSpecialModeRegistry';

const missions = vrMissionsJson as VrMissionDefinition[];
const extras = vrExtrasJson as Mgs1VrPhotoshootExtra[];

describe('MGS1 VR Special Mode registry', () => {
  it('adds exactly three Ninja and ten Mystery stages after the 14 existing stages', () => {
    expect(missions).toHaveLength(27);
    expect(MGS1_VR_NINJA_PROFILES).toHaveLength(3);
    expect(MGS1_VR_MYSTERY_PROFILES).toHaveLength(10);
    expect(MGS1_VR_SPECIAL_MISSION_PROFILES).toHaveLength(13);
    expect(missions.slice(14).map((mission) => mission.id)).toEqual(
      MGS1_VR_SPECIAL_MISSION_PROFILES.map((profile) => profile.missionId)
    );
  });

  it('keeps every special profile linked one-to-one with a Special mission', () => {
    expect(new Set(MGS1_VR_SPECIAL_MISSION_PROFILES.map((profile) => profile.id)).size).toBe(13);
    expect(new Set(MGS1_VR_SPECIAL_MISSION_PROFILES.map((profile) => profile.missionId)).size).toBe(13);

    for (const profile of MGS1_VR_SPECIAL_MISSION_PROFILES) {
      const mission = missions.find((entry) => entry.id === profile.missionId);
      expect(mission, profile.missionId).toBeDefined();
      expect(mission?.category).toBe(profile.mode === 'ninja' ? 'special_ninja' : 'special_mystery');
      expect(mission?.missionProfileId).toBe(profile.id);
      expect(getMgs1VrSpecialProfileById(profile.id)).toBe(profile);
      expect(getMgs1VrSpecialProfileForMission(profile.missionId)).toBe(profile);
    }

    expect(getMgs1VrSpecialProfileById(undefined)).toBeUndefined();
    expect(getMgs1VrSpecialProfileForMission('unknown')).toBeUndefined();
  });

  it('preserves the three documented Ninja objectives and fail conditions', () => {
    expect(MGS1_VR_NINJA_PROFILES.map((profile) => ({
      level: profile.level,
      objectiveKind: profile.objectiveKind,
      targetCount: profile.targetCount,
      guardCount: profile.guardCount
    }))).toEqual([
      { level: 1, objectiveKind: 'slice_poles', targetCount: 15, guardCount: 4 },
      { level: 2, objectiveKind: 'eliminate_guards', targetCount: 30, guardCount: 30 },
      { level: 3, objectiveKind: 'assassinate_disguised_snake', targetCount: 1, guardCount: 11 }
    ]);
    expect(MGS1_VR_NINJA_PROFILES[2]).toMatchObject({
      playerActor: 'cyborg_ninja',
      stealthAvailable: true,
      instantFailOnAlert: true,
      instantFailOnWrongTarget: true
    });
  });

  it('keeps the ten Mystery cases, tells and escort rules in canonical order', () => {
    expect(MGS1_VR_MYSTERY_PROFILES.map((profile) => profile.caseTitle)).toEqual([
      'Broken Camera',
      'Socks',
      'Popsicle',
      'Nearsighted',
      'The Gateway',
      'The Dying Message',
      'Footprints',
      'A Feeble Man',
      'Disguise',
      'Sealed Room'
    ]);
    expect(MGS1_VR_MYSTERY_PROFILES.map((profile) => profile.culpritTell)).toEqual([
      'head_bruise',
      'sock_on_head',
      'no_cold_breath',
      'walks_into_wall',
      'fleeing_route',
      'different_fall_pattern',
      'matching_footprints',
      'rapid_heartbeat',
      'salutes_liquid',
      'ketchup_fake_death'
    ]);
    expect(MGS1_VR_MYSTERY_PROFILES.slice(0, 9).every((profile) => profile.requiresEscort)).toBe(true);
    expect(MGS1_VR_MYSTERY_PROFILES[8]).toMatchObject({ playerDisguise: 'liquid_snake' });
    expect(MGS1_VR_MYSTERY_PROFILES[9]).toMatchObject({
      suspectCount: 0,
      culpritIndex: null,
      requiresEscort: false,
      revealDelaySeconds: 180
    });
  });

  it('covers all 16 generated Mystery evidence cells through the case data', () => {
    const evidence = new Set<Mgs1VrMysteryEvidenceId>(
      MGS1_VR_MYSTERY_PROFILES.flatMap((profile) => [...profile.evidenceIds])
    );
    expect(evidence).toEqual(new Set<Mgs1VrMysteryEvidenceId>([
      'broken_camera',
      'black_mask',
      'pink_sock',
      'blue_popsicle',
      'round_spectacles',
      'blond_wig',
      'dying_message_panel',
      'footprint_trail',
      'broken_vase',
      'broken_chair',
      'rifle',
      'grandfather_clock',
      'smashed_monitor',
      'ketchup_bottle',
      'room_key',
      'framed_photo_and_mask'
    ]));
  });

  it('keeps Naomi and Mei Ling Photoshoot entries outside the numbered stage list', () => {
    expect(extras).toHaveLength(2);
    expect(extras.map((entry) => entry.modelId)).toEqual(['naomi_hunter', 'mei_ling']);
    expect(extras.every((entry) => entry.mode === 'photoshoot')).toBe(true);
    expect(extras.every((entry) => entry.distanceRule === 'rank_based')).toBe(true);
    expect(extras.every((entry) => entry.sessionTimeRule === 'rank_based')).toBe(true);
    expect(extras.every((extra) => missions.every((mission) => mission.id !== extra.id))).toBe(true);
  });
});
