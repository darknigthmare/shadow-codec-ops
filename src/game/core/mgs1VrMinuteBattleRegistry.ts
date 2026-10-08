import type {
  Mgs1VrMinuteBattleLoadout,
  Mgs1VrMinuteBattleMissionProfile,
  Mgs1VrMinuteBattleVariant,
  Mgs1VrTargetFamily
} from '../../types/vr.types';

interface MinuteBattleSeed {
  loadout: Mgs1VrMinuteBattleLoadout;
  targetFamily: Mgs1VrTargetFamily;
  targetQuota: number;
  enemyQuota: number;
  targetBehavior: string;
  enemyBehavior: string;
}

/** Canon menu order shared by VS TARGET and VS ENEMY. */
export const MGS1_VR_MINUTE_BATTLE_LOADOUT_ORDER = [
  'unarmed',
  'socom',
  'c4',
  'famas',
  'grenade',
  'claymore',
  'nikita',
  'psg1',
  'stinger'
] as const satisfies readonly Mgs1VrMinuteBattleLoadout[];

const MINUTE_BATTLE_SEEDS = [
  {
    loadout: 'unarmed',
    targetFamily: 'KOKESHI-G',
    targetQuota: 10,
    enemyQuota: 4,
    targetBehavior: 'Break the close-range targets with controlled punches before their next positions activate.',
    enemyBehavior: 'Use throws and the punch-kick combination to eliminate as many Genome Soldiers as possible.'
  },
  {
    loadout: 'socom',
    targetFamily: 'CUBE-B',
    targetQuota: 15,
    enemyQuota: 15,
    targetBehavior: 'Use accurate running shots and quick reloads against the repeating fixed-target sequence.',
    enemyBehavior: 'Control the central firing lanes and eliminate reinforcements with the SOCOM.'
  },
  {
    loadout: 'c4',
    targetFamily: 'CUBE-R',
    targetQuota: 25,
    enemyQuota: 10,
    targetBehavior: 'Plant and detonate C4 from safe positions to trigger groups of explosive targets.',
    enemyBehavior: 'Anticipate reinforcement routes, plant C4 in their path, and detonate from cover.'
  },
  {
    loadout: 'famas',
    targetFamily: 'MOVE-B',
    targetQuota: 25,
    enemyQuota: 18,
    targetBehavior: 'Track the moving target sequence with short FAMAS bursts and disciplined reloads.',
    enemyBehavior: 'Use controlled automatic fire to clear successive Genome Soldier waves.'
  },
  {
    loadout: 'grenade',
    targetFamily: 'CUBE-R',
    targetQuota: 60,
    enemyQuota: 5,
    targetBehavior: 'Time grenade fuses at the center of target groups to create chain reactions.',
    enemyBehavior: 'Gather patrols around the arena geometry and eliminate clustered guards with timed grenades.'
  },
  {
    loadout: 'claymore',
    targetFamily: 'KOKESHI-B',
    targetQuota: 18,
    enemyQuota: 7,
    targetBehavior: 'Plant Claymores where the moving KOKESHI-B targets converge.',
    enemyBehavior: 'Lay Claymores across the reinforcement lanes and lure guards through the mines.'
  },
  {
    loadout: 'nikita',
    targetFamily: 'MOVE-R',
    targetQuota: 35,
    enemyQuota: 12,
    targetBehavior: 'Guide Nikita missiles through the four lanes and detonate beside clustered MOVE-R targets.',
    enemyBehavior: 'Steer missiles around cover and detonate them inside incoming Genome Soldier groups.'
  },
  {
    loadout: 'psg1',
    targetFamily: 'MOVE-B',
    targetQuota: 10,
    enemyQuota: 7,
    targetBehavior: 'Use the elevated firing position and precise PSG1 shots against moving targets.',
    enemyBehavior: 'Use the elevated firing lane and deliberate PSG1 shots to eliminate exposed guards.'
  },
  {
    loadout: 'stinger',
    targetFamily: 'UFO',
    targetQuota: 17,
    enemyQuota: 10,
    targetBehavior: 'Lock on to distant explosive targets and use each Stinger blast to catch nearby targets.',
    enemyBehavior: 'Fire Stinger missiles into reinforcement groups while avoiding damage from close explosions.'
  }
] as const satisfies readonly MinuteBattleSeed[];

const missionNumber = (variant: Mgs1VrMinuteBattleVariant, level: number): number =>
  (variant === 'target' ? 27 : 36) + level;

const createProfile = (
  variant: Mgs1VrMinuteBattleVariant,
  seed: MinuteBattleSeed,
  index: number
): Mgs1VrMinuteBattleMissionProfile => {
  const level = index + 1;
  const suffix = String(missionNumber(variant, level)).padStart(3, '0');
  return {
    id: `mgs1_vr_special_minute_${variant}_${seed.loadout}`,
    missionId: `vr_minute_${variant}_${seed.loadout}_${suffix}`,
    mode: 'minute_battle',
    variant,
    level,
    loadout: seed.loadout,
    durationSeconds: 60,
    quota: variant === 'target' ? seed.targetQuota : seed.enemyQuota,
    targetFamily: variant === 'target' ? seed.targetFamily : null,
    manualBehavior: variant === 'target' ? seed.targetBehavior : seed.enemyBehavior
  };
};

export const MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES = MINUTE_BATTLE_SEEDS.map((seed, index) =>
  createProfile('target', seed, index)
) satisfies readonly Mgs1VrMinuteBattleMissionProfile[];

export const MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES = MINUTE_BATTLE_SEEDS.map((seed, index) =>
  createProfile('enemy', seed, index)
) satisfies readonly Mgs1VrMinuteBattleMissionProfile[];

export const MGS1_VR_MINUTE_BATTLE_PROFILES = [
  ...MGS1_VR_MINUTE_BATTLE_TARGET_PROFILES,
  ...MGS1_VR_MINUTE_BATTLE_ENEMY_PROFILES
] satisfies readonly Mgs1VrMinuteBattleMissionProfile[];

const minuteBattleProfileById = new Map(MGS1_VR_MINUTE_BATTLE_PROFILES.map((profile) => [profile.id, profile] as const));
const minuteBattleProfileByMissionId = new Map(
  MGS1_VR_MINUTE_BATTLE_PROFILES.map((profile) => [profile.missionId, profile] as const)
);

export const getMgs1VrMinuteBattleProfileById = (
  profileId: string | null | undefined
): Mgs1VrMinuteBattleMissionProfile | undefined => profileId ? minuteBattleProfileById.get(profileId) : undefined;

export const getMgs1VrMinuteBattleProfileForMission = (
  missionId: string | null | undefined
): Mgs1VrMinuteBattleMissionProfile | undefined => missionId ? minuteBattleProfileByMissionId.get(missionId) : undefined;
