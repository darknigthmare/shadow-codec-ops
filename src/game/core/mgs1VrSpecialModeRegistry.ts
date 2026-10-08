import type {
  Mgs1VrMysteryMissionProfile,
  Mgs1VrNinjaMissionProfile,
  Mgs1VrSpecialMissionProfile
} from '../../types/vr.types';

/** The three playable Gray Fox stages documented for Special Mode / Ninja. */
export const MGS1_VR_NINJA_PROFILES = [
  {
    id: 'mgs1_vr_special_ninja_01',
    missionId: 'vr_ninja_pole_cut_015',
    mode: 'ninja',
    level: 1,
    playerActor: 'cyborg_ninja',
    objectiveKind: 'slice_poles',
    targetCount: 15,
    guardCount: 4,
    stealthAvailable: true,
    instantFailOnAlert: false,
    instantFailOnWrongTarget: false,
    manualBehavior: 'Slice all 15 poles, including the poles placed on crates, while guards patrol the arena.'
  },
  {
    id: 'mgs1_vr_special_ninja_02',
    missionId: 'vr_ninja_guard_sweep_016',
    mode: 'ninja',
    level: 2,
    playerActor: 'cyborg_ninja',
    objectiveKind: 'eliminate_guards',
    targetCount: 30,
    guardCount: 30,
    stealthAvailable: true,
    instantFailOnAlert: false,
    instantFailOnWrongTarget: false,
    manualBehavior: 'Eliminate all 30 Genome Soldiers; raising an alert can draw the remaining patrols into view.'
  },
  {
    id: 'mgs1_vr_special_ninja_03',
    missionId: 'vr_ninja_snake_hunt_017',
    mode: 'ninja',
    level: 3,
    playerActor: 'cyborg_ninja',
    objectiveKind: 'assassinate_disguised_snake',
    targetCount: 1,
    guardCount: 11,
    stealthAvailable: true,
    instantFailOnAlert: true,
    instantFailOnWrongTarget: true,
    manualBehavior: 'Find Solid Snake disguised as a Genome Soldier and strike only him without being detected.'
  }
] as const satisfies readonly Mgs1VrNinjaMissionProfile[];

/**
 * Ten Mystery cases. Each profile keeps the evidence, observable tell and
 * arrest/escort rule separate so the scene can reproduce the investigation
 * without embedding solutions in Phaser code.
 */
export const MGS1_VR_MYSTERY_PROFILES = [
  {
    id: 'mgs1_vr_special_mystery_01',
    missionId: 'vr_mystery_broken_camera_018',
    mode: 'mystery',
    level: 1,
    playerActor: 'solid_snake',
    caseTitle: 'Broken Camera',
    resolutionKind: 'match_visible_evidence',
    evidenceIds: ['broken_camera'],
    suspectCount: 3,
    culpritIndex: 2,
    culpritTell: 'head_bruise',
    clue: 'The camera was mounted high enough that the collision would leave a mark on a tall suspect.',
    solution: 'Inspect the suspects, arrest the large soldier with the head bruise, then escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Inspect a broken surveillance camera and identify the soldier who struck it.'
  },
  {
    id: 'mgs1_vr_special_mystery_02',
    missionId: 'vr_mystery_socks_019',
    mode: 'mystery',
    level: 2,
    playerActor: 'solid_snake',
    caseTitle: 'Socks',
    resolutionKind: 'match_visible_evidence',
    evidenceIds: ['black_mask', 'pink_sock'],
    suspectCount: 3,
    culpritIndex: 1,
    culpritTell: 'sock_on_head',
    clue: 'One pink sock is on the floor; its mate is being worn as an improvised mask.',
    solution: 'Arrest the suspect with the matching pink sock on his head and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Match the abandoned sock to the conspicuous item worn by one suspect.'
  },
  {
    id: 'mgs1_vr_special_mystery_03',
    missionId: 'vr_mystery_popsicle_020',
    mode: 'mystery',
    level: 3,
    playerActor: 'solid_snake',
    caseTitle: 'Popsicle',
    resolutionKind: 'inspect_cold_breath',
    evidenceIds: ['blue_popsicle'],
    suspectCount: 3,
    culpritIndex: 0,
    culpritTell: 'no_cold_breath',
    clue: 'Eating something frozen changes which suspect produces visible breath in the cold room.',
    solution: 'Inspect each suspect, arrest the one without the normal breath cloud, and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Use the discarded blue popsicle and the suspects breathing tells to identify the culprit.'
  },
  {
    id: 'mgs1_vr_special_mystery_04',
    missionId: 'vr_mystery_nearsighted_021',
    mode: 'mystery',
    level: 4,
    playerActor: 'solid_snake',
    caseTitle: 'Nearsighted',
    resolutionKind: 'test_nearsightedness',
    evidenceIds: ['round_spectacles'],
    suspectCount: 3,
    culpritIndex: 2,
    culpritTell: 'walks_into_wall',
    clue: 'The owner of the lost spectacles cannot judge the wall after being repositioned.',
    solution: 'Test the suspects near the wall, arrest the man who collides with it, and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Use the spectacles as a clue and expose the suspect whose poor eyesight makes him hit the wall.'
  },
  {
    id: 'mgs1_vr_special_mystery_05',
    missionId: 'vr_mystery_gateway_022',
    mode: 'mystery',
    level: 5,
    playerActor: 'solid_snake',
    caseTitle: 'The Gateway',
    resolutionKind: 'track_fleeing_suspect',
    evidenceIds: [],
    suspectCount: 3,
    culpritIndex: 1,
    culpritTell: 'fleeing_route',
    clue: 'The fleeing man changes places with another suspect after passing through the gateway route.',
    solution: 'Keep visual contact through the position swap, arrest the original runner, and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Pursue the fleeing culprit and remember his identity when he crosses another suspect.'
  },
  {
    id: 'mgs1_vr_special_mystery_06',
    missionId: 'vr_mystery_dying_message_023',
    mode: 'mystery',
    level: 6,
    playerActor: 'solid_snake',
    caseTitle: 'The Dying Message',
    resolutionKind: 'compare_fall_reaction',
    evidenceIds: ['dying_message_panel'],
    suspectCount: 3,
    culpritIndex: 0,
    culpritTell: 'different_fall_pattern',
    clue: 'The dying message points to Johnny, whose reaction to a punch-punch-kick combination differs from the others.',
    solution: 'Test each suspect with the same combo, arrest the one with the different fall, and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Interpret the Johnny clue by comparing each suspects reaction to the same close-combat combination.'
  },
  {
    id: 'mgs1_vr_special_mystery_07',
    missionId: 'vr_mystery_footprints_024',
    mode: 'mystery',
    level: 7,
    playerActor: 'solid_snake',
    caseTitle: 'Footprints',
    resolutionKind: 'follow_footprints',
    evidenceIds: ['footprint_trail'],
    suspectCount: 3,
    culpritIndex: 2,
    culpritTell: 'matching_footprints',
    clue: 'Only one of the three trails leads from the starting evidence to the culprit; crawling avoids adding confusing prints.',
    solution: 'Follow the correct trail while crawling, arrest the suspect at its end, and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Track one of three footprint trails without obscuring it with Snakes own tracks.'
  },
  {
    id: 'mgs1_vr_special_mystery_08',
    missionId: 'vr_mystery_feeble_man_025',
    mode: 'mystery',
    level: 8,
    playerActor: 'solid_snake',
    caseTitle: 'A Feeble Man',
    resolutionKind: 'inspect_heartbeat',
    evidenceIds: [],
    suspectCount: 3,
    culpritIndex: 1,
    culpritTell: 'rapid_heartbeat',
    clue: 'The guilty suspect is visibly nervous and has a much faster heartbeat during inspection.',
    solution: 'Inspect all three heartbeats, arrest the rapidly beating suspect, and escort him to the goal.',
    requiresEscort: true,
    manualBehavior: 'Identify the nervous culprit by comparing the suspects heartbeat inspection cues.'
  },
  {
    id: 'mgs1_vr_special_mystery_09',
    missionId: 'vr_mystery_disguise_026',
    mode: 'mystery',
    level: 9,
    playerActor: 'solid_snake',
    caseTitle: 'Disguise',
    resolutionKind: 'use_liquid_disguise',
    evidenceIds: ['round_spectacles', 'blond_wig'],
    suspectCount: 3,
    culpritIndex: 0,
    culpritTell: 'salutes_liquid',
    clue: 'The nearsighted culprit will mistake Snake for Liquid after Snake equips the blond hairpiece.',
    solution: 'Collect the wig, face each suspect as fake Liquid, arrest the one who salutes, and escort him to the goal.',
    requiresEscort: true,
    playerDisguise: 'liquid_snake',
    manualBehavior: 'Use the blond wig to imitate Liquid Snake and expose the suspect who salutes the disguise.'
  },
  {
    id: 'mgs1_vr_special_mystery_10',
    missionId: 'vr_mystery_sealed_room_027',
    mode: 'mystery',
    level: 10,
    playerActor: 'solid_snake',
    caseTitle: 'Sealed Room',
    resolutionKind: 'wait_for_ketchup_reveal',
    evidenceIds: [
      'broken_vase',
      'broken_chair',
      'rifle',
      'grandfather_clock',
      'smashed_monitor',
      'room_key',
      'framed_photo_and_mask',
      'ketchup_bottle'
    ],
    suspectCount: 0,
    culpritIndex: null,
    culpritTell: 'ketchup_fake_death',
    clue: 'The cluttered locked room presents a supposed murder, but the body is lying on a ketchup bottle.',
    solution: 'Break into the room, inspect the scene, and let the timer expire to reveal the staged death.',
    requiresEscort: false,
    revealDelaySeconds: 180,
    manualBehavior: 'Investigate the locked-room scene and wait for the timed ketchup reveal instead of making an arrest.'
  }
] as const satisfies readonly Mgs1VrMysteryMissionProfile[];

export const MGS1_VR_SPECIAL_MISSION_PROFILES = [
  ...MGS1_VR_NINJA_PROFILES,
  ...MGS1_VR_MYSTERY_PROFILES
] as const satisfies readonly Mgs1VrSpecialMissionProfile[];

const specialProfileById = new Map<string, Mgs1VrSpecialMissionProfile>(
  MGS1_VR_SPECIAL_MISSION_PROFILES.map((entry) => [entry.id, entry])
);
const specialProfileByMissionId = new Map<string, Mgs1VrSpecialMissionProfile>(
  MGS1_VR_SPECIAL_MISSION_PROFILES.map((entry) => [entry.missionId, entry])
);

export const getMgs1VrSpecialProfileById = (
  profileId: string | null | undefined
): Mgs1VrSpecialMissionProfile | undefined => profileId ? specialProfileById.get(profileId) : undefined;

export const getMgs1VrSpecialProfileForMission = (
  missionId: string | null | undefined
): Mgs1VrSpecialMissionProfile | undefined => missionId ? specialProfileByMissionId.get(missionId) : undefined;
