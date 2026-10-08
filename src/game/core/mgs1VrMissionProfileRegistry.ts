import type {
  Mgs1VrMissionProfile,
  Mgs1VrTargetBehaviorFlags,
  Mgs1VrTargetFamily,
  Mgs1VrWeaponId
} from '../../types/vr.types';

/** Canon order used by the MGS1 VR Training manual. */
export const MGS1_VR_CANON_TARGET_FAMILIES = [
  'CUBE-B',
  'CUBE-R',
  'KOKESHI-B',
  'KOKESHI-G',
  'MOVE-B',
  'MOVE-R',
  'WALL',
  'UFO'
] as const satisfies readonly Mgs1VrTargetFamily[];

export const MGS1_VR_CANON_WEAPONS = [
  'socom',
  'famas',
  'psg1',
  'grenade',
  'c4',
  'claymore',
  'stinger',
  'nikita'
] as const satisfies readonly Mgs1VrWeaponId[];

/**
 * Target behavior is based on Konami's MGS1 VR Training manual. The
 * destructible flag is reserved for WALL-style level geometry; every target
 * can still be cleared by its compatible training action.
 */
export const MGS1_VR_CANON_TARGET_BEHAVIORS: Readonly<Record<Mgs1VrTargetFamily, Mgs1VrTargetBehaviorFlags & { manualBehavior: string }>> = {
  'CUBE-B': {
    moving: false,
    explosive: false,
    flying: false,
    destructible: false,
    manualBehavior: 'Fixed non-explosive target.'
  },
  'CUBE-R': {
    moving: false,
    explosive: true,
    flying: false,
    destructible: false,
    manualBehavior: 'Fixed red target whose blast can trigger nearby red targets.'
  },
  'KOKESHI-B': {
    moving: true,
    explosive: false,
    flying: false,
    destructible: false,
    manualBehavior: 'Moving Claymore-training target.'
  },
  'KOKESHI-G': {
    moving: true,
    explosive: false,
    flying: false,
    destructible: false,
    manualBehavior: 'Moving target intended for unarmed practice.'
  },
  'MOVE-B': {
    moving: true,
    explosive: false,
    flying: false,
    destructible: false,
    manualBehavior: 'Standard mobile target.'
  },
  'MOVE-R': {
    moving: true,
    explosive: true,
    flying: false,
    destructible: false,
    manualBehavior: 'Mobile red target with a damaging chain-reaction blast.'
  },
  WALL: {
    moving: false,
    explosive: false,
    flying: false,
    destructible: true,
    manualBehavior: 'Weapon-breakable wall obstacle.'
  },
  UFO: {
    moving: true,
    explosive: true,
    flying: true,
    destructible: false,
    manualBehavior: 'Large airborne Stinger target with an explosive chain reaction.'
  }
};

const profile = (
  id: string,
  missionId: string,
  weapon: Mgs1VrWeaponId | null,
  targetFamily: Mgs1VrTargetFamily,
  targetCount: number,
  mode: Mgs1VrMissionProfile['mode'] = 'weapon'
): Mgs1VrMissionProfile => ({
  id,
  missionId,
  mode,
  weapon,
  targetFamily,
  targetCount,
  ...MGS1_VR_CANON_TARGET_BEHAVIORS[targetFamily]
});

/**
 * Existing SOCOM Range anchors the weapon set. Seven additional weapon drills
 * cover the remaining arsenal, while KOKESHI-G receives its canon unarmed
 * drill instead of being incorrectly paired with a firearm.
 */
export const MGS1_VR_MISSION_PROFILES = [
  profile('mgs1_vr_profile_socom_cube_b', 'vr_socom_range_003', 'socom', 'CUBE-B', 5),
  profile('mgs1_vr_profile_famas_move_b', 'vr_famas_move_007', 'famas', 'MOVE-B', 8),
  profile('mgs1_vr_profile_psg1_cube_b', 'vr_psg1_precision_008', 'psg1', 'CUBE-B', 6),
  profile('mgs1_vr_profile_grenade_cube_r', 'vr_grenade_chain_009', 'grenade', 'CUBE-R', 6),
  profile('mgs1_vr_profile_c4_wall', 'vr_c4_wall_010', 'c4', 'WALL', 5),
  profile('mgs1_vr_profile_claymore_kokeshi_b', 'vr_claymore_kokeshi_011', 'claymore', 'KOKESHI-B', 6),
  profile('mgs1_vr_profile_stinger_ufo', 'vr_stinger_ufo_012', 'stinger', 'UFO', 4),
  profile('mgs1_vr_profile_nikita_move_r', 'vr_nikita_move_013', 'nikita', 'MOVE-R', 6),
  profile('mgs1_vr_profile_unarmed_kokeshi_g', 'vr_kokeshi_cqc_014', null, 'KOKESHI-G', 6, 'special')
] as const satisfies readonly Mgs1VrMissionProfile[];

const missionProfileById = new Map(MGS1_VR_MISSION_PROFILES.map((entry) => [entry.id, entry] as const));
const missionProfileByMissionId = new Map(MGS1_VR_MISSION_PROFILES.map((entry) => [entry.missionId, entry] as const));

export const getMgs1VrMissionProfileById = (profileId: string | null | undefined): Mgs1VrMissionProfile | undefined =>
  profileId ? missionProfileById.get(profileId) : undefined;

export const getMgs1VrMissionProfileForMission = (missionId: string | null | undefined): Mgs1VrMissionProfile | undefined =>
  missionId ? missionProfileByMissionId.get(missionId) : undefined;
