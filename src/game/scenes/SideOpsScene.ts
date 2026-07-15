import Phaser from 'phaser';
import { getStorageKey } from '../../systems/saveEngine';
import {
  emitGameEvent,
  onGameEvent,
  GAME_EVENT,
  type AlertEventPayload,
  type CodecRequestPayload,
  type DirectorDirectivePayload,
  type MissionCompletePayload,
  type MissionHudPayload
} from '../core/GameEvents';
import { calculateSideOpsRank } from '../systems/rankSystem';
import { RuntimeInputController } from '../core/RuntimeInput';
import { resolveBuilderSideOpsProfile } from '../../systems/missionBuilderStorage';
import { getCampaignLoadoutBonuses } from '../../systems/campaignStorage';

type AlertState = 'NORMAL' | 'SUSPICION' | 'ALERT' | 'EVASION' | 'CAUTION' | 'MISSION FAILED';
type GuardRole = 'patrol' | 'reinforcement';
type ObjectiveStage = 'recover_keycard' | 'open_security_door' | 'cross_security_yard' | 'defeat_captain' | 'extract';

interface GuardUnit {
  id: string;
  sprite: Phaser.Physics.Arcade.Sprite;
  patrolMin: number;
  patrolMax: number;
  direction: number;
  disabled: boolean;
  hp: number;
  role: GuardRole;
  lastShotAt: number;
}

interface BossUnit {
  sprite: Phaser.Physics.Arcade.Sprite;
  baseFacingRight: boolean;
  hp: number;
  maxHp: number;
  active: boolean;
  defeated: boolean;
  phase: 1 | 2;
  direction: number;
  lastShotAt: number;
  lastChargeAt: number;
}

type PickupKind = 'ration' | 'chaff' | 'ammo';

interface CodecProfileCall {
  trigger: CodecRequestPayload['trigger'];
  contactId: string;
  conversationId: string;
  message: string;
  pauseGame: boolean;
}

interface MissionProfile {
  id: string;
  environment: 'dock' | 'tanker' | 'jungle' | 'facility' | 'vr';
  title: string;
  location: string;
  header: string;
  worldWidth: number;
  groundColor: number;
  backdropColor: number;
  structureColor: number;
  start: { x: number; y: number };
  playerTexture: string;
  startAmmo: number;
  startRations: number;
  startChaff: number;
  initialObjectives: string[];
  totalObjectives: number;
  door: { x: number; y: number; label: string };
  camera: { x: number; y: number };
  searchlight: { x: number; y: number; sweep: number };
  elevator: { x: number; y: number; label: string };
  keycard: { x: number; y: number; label: string };
  boss: { name: string; x: number; y: number; hp: number; texture: string; baseFacingRight: boolean; tintPhaseOne: number; tintPhaseTwo: number };
  guardTexture: string;
  reinforcementTexture: string;
  platforms: Array<{ x: number; y: number; scaleX: number }>;
  crates: Array<{ x: number; y: number }>;
  guards: Array<{ x: number; y: number; patrolMin: number; patrolMax: number; role: GuardRole; hp?: number }>;
  pickups: Array<{ x: number; y: number; kind: PickupKind }>;
  secrets: Array<{ x: number; y: number; id: string; label: string }>;
  stageLabels: Record<ObjectiveStage, string>;
  completionX: { openDoor: number; crossYard: number; bossArena: number };
  codec: {
    missionStart: CodecProfileCall;
    keycardFound: CodecProfileCall;
    lowHealth: CodecProfileCall;
    missionFailed: CodecProfileCall;
    missionComplete: CodecProfileCall;
    manual: CodecProfileCall;
    chaff: CodecProfileCall;
    cameraDown: CodecProfileCall;
    cqc: CodecProfileCall;
    firstAlert: CodecProfileCall;
    suspicion: CodecProfileCall;
    evasion: CodecProfileCall;
    caution: CodecProfileCall;
    reinforcement: CodecProfileCall;
    cameraDetected: CodecProfileCall;
    searchlight: CodecProfileCall;
    bossIntro: CodecProfileCall;
    bossMidfight: CodecProfileCall;
    bossDefeated: CodecProfileCall;
    secret: CodecProfileCall;
  };
}

const MISSION_STORAGE_KEY = 'sideops-active-mission-id';

const SHADOW_DOCK_PROFILE: MissionProfile = {
  id: 'shadow_dock_001',
  environment: 'dock',
  title: 'Dock Infiltration',
  location: 'Snowfield Docks',
  header: 'MISSION 001 // DOCK INFILTRATION // SHADOW MOSES SIMULATION',
  worldWidth: 3800,
  groundColor: 0x06120a,
  backdropColor: 0x041007,
  structureColor: 0x0d2a14,
  start: { x: 90, y: 454 },
  playerTexture: 'player',
  startAmmo: 26,
  startRations: 1,
  startChaff: 1,
  initialObjectives: ['enter_dock'],
  totalObjectives: 6,
  door: { x: 1510, y: 462, label: 'Lv.1 security door' },
  camera: { x: 1210, y: 235 },
  searchlight: { x: 1990, y: 118, sweep: 360 },
  elevator: { x: 3630, y: 470, label: 'cargo elevator' },
  keycard: { x: 1000, y: 290, label: 'Keycard Lv.1' },
  boss: { name: 'Armored Guard Captain', x: 2990, y: 456, hp: 10, texture: 'bossCaptain', baseFacingRight: true, tintPhaseOne: 0xffdf85, tintPhaseTwo: 0xff6b6b },
  guardTexture: 'guard',
  reinforcementTexture: 'reinforcementGuard',
  platforms: [
    { x: 480, y: 520, scaleX: 16 }, { x: 1120, y: 520, scaleX: 16 }, { x: 1760, y: 520, scaleX: 16 },
    { x: 2410, y: 520, scaleX: 16 }, { x: 3150, y: 520, scaleX: 22 }, { x: 520, y: 410, scaleX: 3 },
    { x: 960, y: 330, scaleX: 4 }, { x: 1320, y: 430, scaleX: 3 }, { x: 1940, y: 360, scaleX: 4 },
    { x: 2320, y: 315, scaleX: 3 }, { x: 3050, y: 385, scaleX: 4 }, { x: 3390, y: 305, scaleX: 3 }
  ],
  crates: [
    { x: 360, y: 480 }, { x: 1380, y: 390 }, { x: 1810, y: 480 }, { x: 2055, y: 320 },
    { x: 2550, y: 480 }, { x: 2750, y: 480 }, { x: 3220, y: 480 }
  ],
  guards: [
    { x: 700, y: 454, patrolMin: 540, patrolMax: 805, role: 'patrol' },
    { x: 1690, y: 454, patrolMin: 1580, patrolMax: 1880, role: 'patrol' },
    { x: 2200, y: 454, patrolMin: 2080, patrolMax: 2400, role: 'patrol' }
  ],
  pickups: [
    { x: 430, y: 380, kind: 'ration' }, { x: 1320, y: 390, kind: 'chaff' }, { x: 2050, y: 320, kind: 'ammo' }
  ],
  secrets: [
    { x: 560, y: 374, id: 'dog_tag_secret', label: 'DOG TAG CACHE' },
    { x: 2320, y: 275, id: 'mo_disc_secret', label: 'OPTICAL DISC' },
    { x: 3405, y: 265, id: 'cassette_secret', label: 'CODEC TAPE' }
  ],
  stageLabels: {
    recover_keycard: 'Recover Keycard Lv.1',
    open_security_door: 'Open Lv.1 security door',
    cross_security_yard: 'Cross searchlight yard',
    defeat_captain: 'Defeat Armored Guard Captain',
    extract: 'Reach cargo elevator'
  },
  completionX: { openDoor: 1545, crossYard: 2140, bossArena: 2580 },
  codec: {
    missionStart: { trigger: 'mission_start', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_mission_start', message: 'Mission briefing ready.', pauseGame: true },
    keycardFound: { trigger: 'keycard_found', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_keycard_found', message: 'Keycard Lv.1 recovered. Codec hint available.', pauseGame: false },
    lowHealth: { trigger: 'low_health', contactId: 'naomi_mgs1', conversationId: 'mgs1_naomi_medical', message: 'Health critical. Medical support available.', pauseGame: true },
    missionFailed: { trigger: 'low_health', contactId: 'naomi_mgs1', conversationId: 'mgs1_naomi_mission_failed', message: 'Snake is down. Mission failed.', pauseGame: false },
    missionComplete: { trigger: 'mission_complete', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_mission_complete', message: 'Mission complete.', pauseGame: true },
    manual: { trigger: 'manual_call', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_default', message: 'Manual Codec request from Side Ops.', pauseGame: false },
    chaff: { trigger: 'manual_call', contactId: 'otacon_mgs1', conversationId: 'mgs1_otacon_chaff_hint', message: 'Chaff deployed. Camera and searchlight signals disrupted.', pauseGame: false },
    cameraDown: { trigger: 'camera_detected', contactId: 'otacon_mgs1', conversationId: 'mgs1_otacon_camera_down', message: 'Security camera disabled.', pauseGame: false },
    cqc: { trigger: 'manual_call', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_cqc_hint', message: 'Guard neutralized quietly.', pauseGame: false },
    firstAlert: { trigger: 'first_alert', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_first_alert', message: 'ALERT triggered. Codec support available.', pauseGame: true },
    suspicion: { trigger: 'suspicion', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_suspicion', message: 'Suspicion detected. Codec support available.', pauseGame: false },
    evasion: { trigger: 'evasion', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_evasion', message: 'Evasion phase active.', pauseGame: false },
    caution: { trigger: 'caution', contactId: 'miller_mgs1', conversationId: 'mgs1_miller_caution', message: 'Caution phase active.', pauseGame: false },
    reinforcement: { trigger: 'reinforcement', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_reinforcement', message: 'Reinforcements deployed.', pauseGame: false },
    cameraDetected: { trigger: 'camera_detected', contactId: 'otacon_mgs1', conversationId: 'mgs1_otacon_tech', message: 'Camera sightline detected. Technical support available.', pauseGame: false },
    searchlight: { trigger: 'searchlight_detected', contactId: 'otacon_mgs1', conversationId: 'mgs1_otacon_searchlight_hint', message: 'Searchlight sweep detected. Technical support available.', pauseGame: false },
    bossIntro: { trigger: 'boss_intro', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_boss_intro', message: 'Armored Guard Captain encountered.', pauseGame: true },
    bossMidfight: { trigger: 'boss_midfight', contactId: 'naomi_mgs1', conversationId: 'mgs1_naomi_boss_midfight', message: 'Boss armor pattern changed.', pauseGame: false },
    bossDefeated: { trigger: 'boss_defeated', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_boss_defeated', message: 'Boss defeated. Extraction route open.', pauseGame: true },
    secret: { trigger: 'secret_frequency', contactId: 'otacon_mgs1', conversationId: 'mgs1_otacon_secret_found', message: 'Hidden signal archive recovered.', pauseGame: false }
  }
};

const TANKER_HOLD_PROFILE: MissionProfile = {
  id: 'tanker_hold_002',
  environment: 'tanker',
  title: 'Tanker Hold Sabotage',
  location: 'Rain Deck / Cargo Hold',
  header: 'MISSION 002 // TANKER HOLD SABOTAGE // MGS2 SIMULATION',
  worldWidth: 4300,
  groundColor: 0x08131c,
  backdropColor: 0x030a12,
  structureColor: 0x10283a,
  start: { x: 90, y: 454 },
  playerTexture: 'playerTanker',
  startAmmo: 32,
  startRations: 1,
  startChaff: 2,
  initialObjectives: ['enter_deck'],
  totalObjectives: 6,
  door: { x: 1720, y: 462, label: 'bulkhead access lock' },
  camera: { x: 1450, y: 228 },
  searchlight: { x: 2360, y: 105, sweep: 430 },
  elevator: { x: 4110, y: 470, label: 'cargo hold exit' },
  keycard: { x: 1195, y: 285, label: 'Bulkhead Keycard' },
  boss: { name: 'Shielded Deck Commander', x: 3470, y: 456, hp: 12, texture: 'bossDeckCommander', baseFacingRight: false, tintPhaseOne: 0x9fd4ff, tintPhaseTwo: 0xffdf85 },
  guardTexture: 'deckGuard',
  reinforcementTexture: 'deckReinforcement',
  platforms: [
    { x: 490, y: 520, scaleX: 16 }, { x: 1150, y: 520, scaleX: 17 }, { x: 1820, y: 520, scaleX: 17 },
    { x: 2500, y: 520, scaleX: 18 }, { x: 3200, y: 520, scaleX: 18 }, { x: 3900, y: 520, scaleX: 16 },
    { x: 520, y: 395, scaleX: 4 }, { x: 1120, y: 325, scaleX: 4 }, { x: 1500, y: 418, scaleX: 3 },
    { x: 2150, y: 340, scaleX: 5 }, { x: 2620, y: 395, scaleX: 3 }, { x: 3030, y: 315, scaleX: 4 },
    { x: 3650, y: 370, scaleX: 5 }, { x: 3970, y: 295, scaleX: 3 }
  ],
  crates: [
    { x: 340, y: 480 }, { x: 760, y: 480 }, { x: 1510, y: 378 }, { x: 1980, y: 480 },
    { x: 2420, y: 480 }, { x: 2760, y: 480 }, { x: 3230, y: 480 }, { x: 3820, y: 480 }
  ],
  guards: [
    { x: 640, y: 454, patrolMin: 500, patrolMax: 835, role: 'patrol' },
    { x: 1880, y: 454, patrolMin: 1760, patrolMax: 2060, role: 'patrol' },
    { x: 2520, y: 454, patrolMin: 2370, patrolMax: 2740, role: 'patrol' },
    { x: 3080, y: 454, patrolMin: 2960, patrolMax: 3265, role: 'patrol' }
  ],
  pickups: [
    { x: 515, y: 365, kind: 'ration' }, { x: 1540, y: 380, kind: 'ammo' }, { x: 2170, y: 305, kind: 'chaff' }, { x: 3680, y: 335, kind: 'ammo' }
  ],
  secrets: [
    { x: 1120, y: 288, id: 'rain_deck_photo', label: 'RAIN DECK PHOTO' },
    { x: 3030, y: 278, id: 'hold_projector_reel', label: 'HOLD PROJECTOR REEL' },
    { x: 3985, y: 258, id: 'tanker_tape_secret', label: 'TANKER AUDIO LOG' }
  ],
  stageLabels: {
    recover_keycard: 'Recover Bulkhead Keycard',
    open_security_door: 'Open bulkhead access lock',
    cross_security_yard: 'Cross rain deck search zone',
    defeat_captain: 'Defeat Shielded Deck Commander',
    extract: 'Reach cargo hold exit'
  },
  completionX: { openDoor: 1760, crossYard: 2820, bossArena: 3180 },
  codec: {
    missionStart: { trigger: 'mission_start', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_mission_start', message: 'Tanker sabotage briefing ready.', pauseGame: true },
    keycardFound: { trigger: 'keycard_found', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_keycard_found', message: 'Bulkhead keycard recovered.', pauseGame: false },
    lowHealth: { trigger: 'low_health', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_low_health', message: 'Health critical. Support channel open.', pauseGame: true },
    missionFailed: { trigger: 'low_health', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_mission_failed', message: 'Tanker op failed.', pauseGame: false },
    missionComplete: { trigger: 'mission_complete', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_mission_complete', message: 'Tanker route clear.', pauseGame: true },
    manual: { trigger: 'manual_call', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_support', message: 'Manual Codec request from Side Ops.', pauseGame: false },
    chaff: { trigger: 'manual_call', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_chaff_hint', message: 'Chaff deployed on tanker deck.', pauseGame: false },
    cameraDown: { trigger: 'camera_detected', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_camera_down', message: 'Tanker camera disabled.', pauseGame: false },
    cqc: { trigger: 'manual_call', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_cqc_hint', message: 'Deck guard neutralized.', pauseGame: false },
    firstAlert: { trigger: 'first_alert', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_first_alert', message: 'Deck alert triggered. Codec support available.', pauseGame: true },
    suspicion: { trigger: 'suspicion', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_suspicion', message: 'Tanker guard suspicion rising.', pauseGame: false },
    evasion: { trigger: 'evasion', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_evasion', message: 'Evasion phase active.', pauseGame: false },
    caution: { trigger: 'caution', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_caution', message: 'Caution phase active.', pauseGame: false },
    reinforcement: { trigger: 'reinforcement', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_reinforcement', message: 'Deck reinforcements deployed.', pauseGame: false },
    cameraDetected: { trigger: 'camera_detected', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_camera_detected', message: 'Tanker camera sightline detected.', pauseGame: false },
    searchlight: { trigger: 'searchlight_detected', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_searchlight_hint', message: 'Searchlight sweep detected on deck.', pauseGame: false },
    bossIntro: { trigger: 'boss_intro', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_boss_intro', message: 'Shielded Deck Commander encountered.', pauseGame: true },
    bossMidfight: { trigger: 'boss_midfight', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_boss_midfight', message: 'Commander pattern changed.', pauseGame: false },
    bossDefeated: { trigger: 'boss_defeated', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_boss_defeated', message: 'Deck commander down.', pauseGame: true },
    secret: { trigger: 'secret_frequency', contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_tanker_secret_found', message: 'Tanker hidden archive recovered.', pauseGame: false }
  }
};

const MISSION_PROFILES: Record<string, MissionProfile> = {
  [SHADOW_DOCK_PROFILE.id]: SHADOW_DOCK_PROFILE,
  [TANKER_HOLD_PROFILE.id]: TANKER_HOLD_PROFILE
};

function getActiveMissionProfile(): MissionProfile {
  if (typeof window === 'undefined') return SHADOW_DOCK_PROFILE;
  const rawMissionId = window.localStorage.getItem(getStorageKey(MISSION_STORAGE_KEY));
  let requestedMissionId = SHADOW_DOCK_PROFILE.id;

  if (rawMissionId) {
    try {
      const parsed = JSON.parse(rawMissionId) as unknown;
      requestedMissionId = typeof parsed === 'string' ? parsed : rawMissionId;
    } catch {
      requestedMissionId = rawMissionId;
    }
  }

  const builderProfile = resolveBuilderSideOpsProfile(requestedMissionId);
  if (builderProfile) {
    return {
      ...builderProfile,
      playerTexture: 'player',
      boss: { ...builderProfile.boss, baseFacingRight: true }
    };
  }
  return MISSION_PROFILES[requestedMissionId] ?? SHADOW_DOCK_PROFILE;
}

export class SideOpsScene extends Phaser.Scene {
  private profile: MissionProfile = SHADOW_DOCK_PROFILE;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cameraNode!: Phaser.Physics.Arcade.Sprite;
  private lockedDoor!: Phaser.Physics.Arcade.Sprite;
  private elevator!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private bullets!: Phaser.Physics.Arcade.Group;
  private enemyBullets!: Phaser.Physics.Arcade.Group;
  private inputController!: RuntimeInputController;
  private statusText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private hudText!: Phaser.GameObjects.Text;
  private alertText!: Phaser.GameObjects.Text;
  private bossText!: Phaser.GameObjects.Text;
  private cameraScanGraphics!: Phaser.GameObjects.Graphics;
  private searchlightGraphics!: Phaser.GameObjects.Graphics;
  private bossBarrierGraphics!: Phaser.GameObjects.Graphics;
  private offCodecResume?: () => void;
  private offMissionRestart?: () => void;
  private offDirectorDirective?: () => void;

  private guards: GuardUnit[] = [];
  private guardSequence = 0;
  private boss: BossUnit | null = null;

  private maxHealth = 100;
  private health = 100;
  private maxAmmo = 30;
  private ammo = 26;
  private rations = 1;
  private chaff = 1;
  private chaffActiveUntil = 0;
  private hasKeycard = false;
  private cameraDisabled = false;
  private missionCompleted = false;

  private objectiveStage: ObjectiveStage = 'recover_keycard';
  private completedObjectives = new Set<string>();
  private secretsFound = new Set<string>();
  private totalSecrets = 3;

  private alertState: AlertState = 'NORMAL';
  private suspicionMeter = 0;
  private suspicionPeak = 0;
  private alertCount = 0;
  private nextAlertAllowedAt = 0;
  private alertPhaseEndsAt = 0;
  private suspicionDecayBlockedUntil = 0;
  private lastAlertSource = 'none';
  private firstAlertEmitted = false;
  private firstSuspicionEmitted = false;
  private firstEvasionEmitted = false;
  private firstCautionEmitted = false;
  private lowHealthEmitted = false;
  private firstCameraDetectionEmitted = false;
  private firstSearchlightDetectionEmitted = false;
  private bossIntroEmitted = false;
  private bossMidfightEmitted = false;
  private bossDefeatedEmitted = false;
  private secretCodecEmitted = false;

  private missionStartTime = 0;
  private nextPlayerShotAt = 0;
  private lastDamageTime = 0;
  private nextReinforcementAt = 0;
  private reinforcementCount = 0;
  private reinforcementCodecEmitted = false;

  private shotsFired = 0;
  private kills = 0;
  private neutralizations = 0;
  private rationsUsed = 0;
  private damageTaken = 0;
  private camerasDisabled = 0;

  constructor() {
    super('SideOpsScene');
  }

  create(): void {
    this.profile = getActiveMissionProfile();
    this.resetMissionState();
    this.missionStartTime = this.time.now;
    this.physics.world.setBounds(0, 0, this.profile.worldWidth, 540);
    this.cameras.main.setBounds(0, 0, this.profile.worldWidth, 540);

    this.addSkyAndBackdrops();

    this.platforms = this.physics.add.staticGroup();
    this.profile.platforms.forEach((platform) => this.createPlatform(this.platforms, platform.x, platform.y, platform.scaleX));
    this.profile.crates.forEach((crate) => this.addCrate(crate.x, crate.y, this.platforms));

    this.player = this.physics.add.sprite(this.profile.start.x, this.profile.start.y, this.profile.playerTexture);
    this.player.setCollideWorldBounds(true);
    this.player.setDragX(1250);
    this.player.setMaxVelocity(270, 540);
    this.physics.add.collider(this.player, this.platforms);

    this.lockedDoor = this.physics.add.staticSprite(this.profile.door.x, this.profile.door.y, 'door');
    this.physics.add.collider(
      this.player,
      this.lockedDoor,
      undefined,
      () => !this.hasKeycard,
      this
    );

    this.cameraNode = this.physics.add.staticSprite(this.profile.camera.x, this.profile.camera.y, 'cameraNode');

    this.bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 34 });
    this.enemyBullets = this.physics.add.group({ defaultKey: 'enemyBullet', maxSize: 42 });
    this.physics.add.collider(this.bullets, this.platforms, (bullet) => this.destroyPhysicsObject(bullet));
    this.physics.add.collider(this.enemyBullets, this.platforms, (bullet) => this.destroyPhysicsObject(bullet));
    this.physics.add.overlap(this.bullets, this.cameraNode, (bullet) => {
      this.destroyPhysicsObject(bullet);
      this.hitCamera();
    }, undefined, this);
    this.physics.add.overlap(this.enemyBullets, this.player, (bullet) => {
      this.destroyPhysicsObject(bullet);
      this.damagePlayer(14, 'rifle');
    });

    this.profile.guards.forEach((guard) => this.spawnGuard(guard));

    this.createPickups(this.platforms);
    this.createBoss();

    this.elevator = this.physics.add.staticSprite(this.profile.elevator.x, this.profile.elevator.y, 'elevator');
    this.physics.add.overlap(this.player, this.elevator, () => this.completeMission());

    this.inputController = new RuntimeInputController(this);
    const cameraLerp = this.inputController.profile.reducedMotion ? 1 : 0.08;
    this.cameras.main.startFollow(this.player, true, cameraLerp, cameraLerp);

    this.cameraScanGraphics = this.add.graphics();
    this.searchlightGraphics = this.add.graphics();
    this.bossBarrierGraphics = this.add.graphics();

    this.addFixedHud();
    this.offCodecResume = onGameEvent(GAME_EVENT.CODEC_RESUME, () => this.scene.resume());
    this.offMissionRestart = onGameEvent(GAME_EVENT.MISSION_RESTART, () => this.scene.restart());
    this.offDirectorDirective = onGameEvent<DirectorDirectivePayload>(GAME_EVENT.DIRECTOR_DIRECTIVE, (directive) => {
      if (directive.support === 'silent') {
        this.chaff += 1;
        this.rations += 1;
      } else if (directive.support === 'aggressive') {
        this.maxAmmo += 8;
        this.ammo = Math.min(this.maxAmmo, this.ammo + 8);
      }
      this.emitHudUpdate();
    });
    this.events.once('shutdown', () => {
      this.offCodecResume?.();
      this.offMissionRestart?.();
      this.offDirectorDirective?.();
    });

    this.emitProfileCodec(this.profile.codec.missionStart);
    this.emitHudUpdate();
  }

  update(): void {
    if (this.missionCompleted) return;
    this.inputController.update();
    this.handlePlayerInput();
    this.handleGuardPatrol();
    this.handleBoss();
    this.handleCameraSweep();
    this.handleSearchlightSweep();
    this.handleDetection();
    this.handleGuardCombat();
    this.handleReinforcements();
    this.updateAlertState();
    this.updateDoorState();
    this.updateObjectiveState();
    this.updateHudText();
    this.emitHudUpdate();
  }

  private resetMissionState(): void {
    this.guards = [];
    this.guardSequence = 0;
    this.boss = null;
    this.maxHealth = 100;
    this.health = 100;
    const campaignBonuses = getCampaignLoadoutBonuses();
    this.maxAmmo = Math.max(30, this.profile.startAmmo + campaignBonuses.ammo);
    this.ammo = this.profile.startAmmo + campaignBonuses.ammo;
    this.rations = this.profile.startRations + campaignBonuses.rations;
    this.chaff = this.profile.startChaff + campaignBonuses.chaff;
    this.chaffActiveUntil = 0;
    this.hasKeycard = false;
    this.cameraDisabled = false;
    this.missionCompleted = false;
    this.objectiveStage = 'recover_keycard';
    this.completedObjectives = new Set(this.profile.initialObjectives);
    this.secretsFound = new Set();
    this.totalSecrets = this.profile.secrets.length;
    this.alertState = 'NORMAL';
    this.suspicionMeter = 0;
    this.suspicionPeak = 0;
    this.alertCount = 0;
    this.nextAlertAllowedAt = 0;
    this.alertPhaseEndsAt = 0;
    this.suspicionDecayBlockedUntil = 0;
    this.lastAlertSource = 'none';
    this.firstAlertEmitted = false;
    this.firstSuspicionEmitted = false;
    this.firstEvasionEmitted = false;
    this.firstCautionEmitted = false;
    this.lowHealthEmitted = false;
    this.firstCameraDetectionEmitted = false;
    this.firstSearchlightDetectionEmitted = false;
    this.bossIntroEmitted = false;
    this.bossMidfightEmitted = false;
    this.bossDefeatedEmitted = false;
    this.secretCodecEmitted = false;
    this.nextPlayerShotAt = 0;
    this.lastDamageTime = 0;
    this.nextReinforcementAt = 0;
    this.reinforcementCount = 0;
    this.reinforcementCodecEmitted = false;
    this.shotsFired = 0;
    this.kills = 0;
    this.neutralizations = 0;
    this.rationsUsed = 0;
    this.damageTaken = 0;
    this.camerasDisabled = 0;
  }

  private addSkyAndBackdrops(): void {
    const width = this.profile.worldWidth;
    this.add.rectangle(width / 2, 270, width, 540, this.profile.backdropColor).setDepth(-20);
    this.add.rectangle(width / 2, 515, width, 52, this.profile.groundColor).setDepth(-12);

    for (let x = 120; x < width; x += this.profile.environment === 'tanker' ? 155 : 190) {
      this.add.rectangle(x, 486, this.profile.environment === 'tanker' ? 120 : 80, 44, this.profile.structureColor).setDepth(-5);
    }

    for (let x = 250; x < width - 60; x += this.profile.environment === 'tanker' ? 360 : 420) {
      this.add.rectangle(x, 300, this.profile.environment === 'tanker' ? 46 : 34, 380, this.profile.structureColor).setDepth(-10);
      this.add.rectangle(x, 110, this.profile.environment === 'tanker' ? 160 : 120, 14, 0x1c526f).setDepth(-9);
    }

    if (this.profile.environment === 'tanker') {
      for (let x = 90; x < width; x += 130) {
        this.add.line(x, 0, 0, 0, -60, 540, 0x72b7ff, 0.14).setDepth(-2);
      }
      for (let x = 1680; x < width - 200; x += 300) {
        this.add.rectangle(x, 455, 160, 68, 0x0d2433).setDepth(-4);
        this.add.rectangle(x, 416, 174, 10, 0x2b6c91).setDepth(-3);
      }
    } else {
      for (let x = 1680; x < width - 300; x += 320) {
        this.add.rectangle(x, 455, 120, 68, 0x0b2011).setDepth(-4);
        this.add.rectangle(x, 418, 132, 10, 0x174820).setDepth(-3);
      }
    }

    this.add.text(28, 24, this.profile.header, {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#7cff6b'
    }).setScrollFactor(0).setDepth(50);
  }

  private addFixedHud(): void {
    this.statusText = this.add.text(28, 56, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#caffbd'
    }).setScrollFactor(0).setDepth(50);

    this.objectiveText = this.add.text(28, 80, `OBJECTIVE: ${this.getObjectiveLabel()}`,  {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#f8f49a'
    }).setScrollFactor(0).setDepth(50);

    this.alertText = this.add.text(28, 104, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ffdf85'
    }).setScrollFactor(0).setDepth(50);

    this.hudText = this.add.text(28, 128, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#8ac985'
    }).setScrollFactor(0).setDepth(50);

    this.bossText = this.add.text(28, 152, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ff9f6b'
    }).setScrollFactor(0).setDepth(50);
  }

  private createPlatform(group: Phaser.Physics.Arcade.StaticGroup, x: number, y: number, scaleX: number): void {
    const platform = group.create(x, y, 'platform') as Phaser.Physics.Arcade.Sprite;
    platform.setScale(scaleX, 1).setTint(this.profile.environment === 'tanker' ? 0x5fb8d6 : 0x7cff6b).refreshBody();
  }

  private addCrate(x: number, y: number, platforms: Phaser.Physics.Arcade.StaticGroup): void {
    const crate = platforms.create(x, y, 'crate') as Phaser.Physics.Arcade.Sprite;
    crate.refreshBody();
  }

  private spawnGuard(config: { x: number; y: number; patrolMin: number; patrolMax: number; role: GuardRole; hp?: number }): GuardUnit {
    const key = config.role === 'reinforcement' ? this.profile.reinforcementTexture : this.profile.guardTexture;
    const sprite = this.physics.add.sprite(config.x, config.y, key);
    sprite.setCollideWorldBounds(true);
    sprite.setDragX(900);
    this.physics.add.collider(sprite, this.platforms);
    this.physics.add.overlap(this.player, sprite, () => this.damagePlayer(8, 'contact'), undefined, this);

    const guard: GuardUnit = {
      id: `${config.role}_${++this.guardSequence}`,
      sprite,
      patrolMin: config.patrolMin,
      patrolMax: config.patrolMax,
      direction: -1,
      disabled: false,
      hp: config.hp ?? (config.role === 'reinforcement' ? 2 : 1),
      role: config.role,
      lastShotAt: 0
    };

    this.physics.add.overlap(this.bullets, sprite, (bullet) => {
      this.destroyPhysicsObject(bullet);
      this.hitGuard(guard);
    }, undefined, this);

    this.guards.push(guard);
    return guard;
  }

  private createBoss(): void {
    const sprite = this.physics.add.sprite(this.profile.boss.x, this.profile.boss.y, this.profile.boss.texture);
    sprite.setDragX(850);
    sprite.setMaxVelocity(170, 500);
    sprite.setTint(0x7a8f62);
    this.physics.add.collider(sprite, this.platforms);
    this.physics.add.overlap(this.player, sprite, () => this.damagePlayer(this.boss?.phase === 2 ? 16 : 11, this.profile.boss.name), undefined, this);
    this.physics.add.overlap(this.bullets, sprite, (bullet) => {
      this.destroyPhysicsObject(bullet);
      this.hitBoss('SOCOM');
    }, undefined, this);

    this.boss = {
      sprite,
      baseFacingRight: this.profile.boss.baseFacingRight,
      hp: this.profile.boss.hp,
      maxHp: this.profile.boss.hp,
      active: false,
      defeated: false,
      phase: 1,
      direction: -1,
      lastShotAt: 0,
      lastChargeAt: 0
    };
  }

  private createPickups(platforms: Phaser.Physics.Arcade.StaticGroup): void {
    const keycard = this.physics.add.sprite(this.profile.keycard.x, this.profile.keycard.y, 'keycard');
    keycard.setImmovable(true);
    this.physics.add.collider(keycard, platforms);
    this.physics.add.overlap(this.player, keycard, () => {
      if (this.hasKeycard) return;
      this.hasKeycard = true;
      this.completedObjectives.add('recover_keycard');
      keycard.destroy();
      this.objectiveText.setText(`OBJECTIVE: ${this.profile.stageLabels.open_security_door}`);
      this.emitProfileCodec(this.profile.codec.keycardFound);
    });

    this.profile.pickups.forEach((pickup) => {
      if (pickup.kind === 'ration') {
        this.createPickup(pickup.x, pickup.y, 'ration', () => {
          this.rations += 1;
          this.flashStatus('RATION ACQUIRED');
        }, platforms);
      }
      if (pickup.kind === 'chaff') {
        this.createPickup(pickup.x, pickup.y, 'chaffPickup', () => {
          this.chaff += 1;
          this.flashStatus('CHAFF GRENADE ACQUIRED');
        }, platforms);
      }
      if (pickup.kind === 'ammo') {
        this.createPickup(pickup.x, pickup.y, 'ammoBox', () => {
          this.ammo = Math.min(this.maxAmmo, this.ammo + 10);
          this.flashStatus('SOCOM AMMO ACQUIRED');
        }, platforms);
      }
    });

    this.profile.secrets.forEach((secret) => this.createSecret(secret.x, secret.y, secret.id, secret.label));
  }

  private createPickup(
    x: number,
    y: number,
    texture: string,
    onCollect: () => void,
    platforms: Phaser.Physics.Arcade.StaticGroup
  ): void {
    const pickup = this.physics.add.sprite(x, y, texture);
    this.physics.add.collider(pickup, platforms);
    this.physics.add.overlap(this.player, pickup, () => {
      if (!pickup.active) return;
      pickup.destroy();
      onCollect();
    });
  }

  private createSecret(x: number, y: number, id: string, label: string): void {
    const secret = this.physics.add.sprite(x, y, 'secretItem');
    secret.setData('secretId', id);
    secret.setData('label', label);
    this.physics.add.collider(secret, this.platforms);
    this.physics.add.overlap(this.player, secret, () => {
      if (!secret.active || this.secretsFound.has(id)) return;
      this.secretsFound.add(id);
      secret.destroy();
      this.flashStatus(`SECRET FOUND: ${label}`);
      if (!this.secretCodecEmitted) {
        this.secretCodecEmitted = true;
        this.emitProfileCodec(this.profile.codec.secret);
      }
    });
  }

  private handlePlayerInput(): void {
    if (this.health <= 0) {
      this.player.setVelocityX(0);
      return;
    }

    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const down = this.inputController.isDown('crouch');
    const slowWalk = this.inputController.isDown('sprint');
    const jump = this.inputController.justDown('jump');
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = down ? 80 : slowWalk ? 120 : 210;

    if (left) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (right) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (jump && body.blocked.down && !down) {
      this.player.setVelocityY(-430);
      this.registerNoise(14, 'jump landing prep');
    }

    if (down) this.player.setTint(0x86cc80);
    else if (this.health > 0) this.player.clearTint();

    if (this.inputController.justDown('fire')) this.shootSocom();
    if (this.inputController.justDown('cqc')) this.tryCqc();
    if (this.inputController.justDown('chaff')) this.useChaff();
    if (this.inputController.justDown('ration')) this.useRation();
    if (this.inputController.justDown('codec')) {
      this.emitProfileCodec(this.objectiveStage === 'defeat_captain' ? this.profile.codec.bossIntro : this.profile.codec.manual);
    }
  }

  private shootSocom(): void {
    if (this.time.now < this.nextPlayerShotAt) return;
    if (this.ammo <= 0) {
      this.flashStatus('SOCOM EMPTY');
      return;
    }

    this.nextPlayerShotAt = this.time.now + 220;
    this.ammo -= 1;
    this.shotsFired += 1;
    this.inputController.vibrate(35, 0.12, 0.18);
    this.registerNoise(10, 'suppressed SOCOM shot');

    const direction = this.player.flipX ? -1 : 1;
    const bullet = this.bullets.get(this.player.x + direction * 22, this.player.y - 6, 'bullet') as Phaser.Physics.Arcade.Sprite | null;
    if (!bullet) return;

    bullet.setActive(true).setVisible(true);
    bullet.body?.reset(this.player.x + direction * 22, this.player.y - 6);
    bullet.setVelocityX(direction * 680);
    bullet.setVelocityY(0);
    bullet.setFlipX(direction < 0);
    this.time.delayedCall(900, () => bullet.active && bullet.destroy());
  }

  private useChaff(): void {
    if (this.chaff <= 0) {
      this.flashStatus('NO CHAFF GRENADE');
      return;
    }
    this.chaff -= 1;
    this.chaffActiveUntil = this.time.now + 6500;
    this.inputController.vibrate(80, 0.18, 0.28);
    this.flashStatus('CHAFF ACTIVE: ELECTRONICS DISRUPTED');
    this.emitProfileCodec(this.profile.codec.chaff);
  }

  private useRation(): void {
    if (this.rations <= 0) {
      this.flashStatus('NO RATION');
      return;
    }
    if (this.health >= this.maxHealth) {
      this.flashStatus('HEALTH FULL');
      return;
    }
    this.rations -= 1;
    this.rationsUsed += 1;
    this.health = Math.min(this.maxHealth, this.health + 55);
    this.inputController.vibrate(70, 0.1, 0.2);
    this.flashStatus('RATION USED');
  }

  private handleGuardPatrol(): void {
    this.guards.forEach((guard) => {
      if (guard.disabled) {
        guard.sprite.setVelocityX(0);
        return;
      }

      const sameLevel = Math.abs(this.player.y - guard.sprite.y) < 95;
      const chase = this.alertState === 'ALERT' && sameLevel && Math.abs(this.player.x - guard.sprite.x) < 620;

      if (chase) {
        guard.direction = this.player.x < guard.sprite.x ? -1 : 1;
        guard.sprite.setVelocityX((guard.role === 'reinforcement' ? 132 : 112) * guard.direction);
      } else {
        if (guard.sprite.x < guard.patrolMin) guard.direction = 1;
        if (guard.sprite.x > guard.patrolMax) guard.direction = -1;
        guard.sprite.setVelocityX((guard.role === 'reinforcement' ? 88 : 72) * guard.direction);
      }

      guard.sprite.setFlipX(guard.direction < 0);
    });
  }

  private handleBoss(): void {
    if (!this.boss || this.boss.defeated || this.health <= 0) return;

    if (!this.boss.active && this.player.x > this.profile.completionX.bossArena) {
      this.activateBoss();
    }

    if (!this.boss.active) return;

    const boss = this.boss;
    const distanceX = Math.abs(this.player.x - boss.sprite.x);
    boss.direction = this.player.x < boss.sprite.x ? -1 : 1;
    boss.sprite.setFlipX(boss.baseFacingRight ? boss.direction < 0 : boss.direction > 0);
    boss.sprite.setVelocityX((boss.phase === 2 ? 95 : 66) * boss.direction);

    if (distanceX < 105 && this.time.now > boss.lastChargeAt) {
      boss.lastChargeAt = this.time.now + 1550;
      boss.sprite.setVelocityX(250 * boss.direction);
      this.damagePlayer(boss.phase === 2 ? 15 : 10, 'shield bash');
    }

    if (this.time.now > boss.lastShotAt && distanceX < 640) {
      boss.lastShotAt = this.time.now + (boss.phase === 2 ? 650 : 950);
      this.fireBossShot(boss);
      if (boss.phase === 2) this.time.delayedCall(160, () => boss.active && !boss.defeated && this.fireBossShot(boss));
    }
  }

  private activateBoss(): void {
    if (!this.boss || this.boss.active) return;
    this.boss.active = true;
    this.boss.sprite.clearTint();
    this.boss.sprite.setTint(this.profile.boss.tintPhaseOne);
    this.objectiveStage = 'defeat_captain';
    this.triggerAlert(`${this.profile.boss.name.toLowerCase()} encounter`);
    if (!this.bossIntroEmitted) {
      this.bossIntroEmitted = true;
      this.emitProfileCodec(this.profile.codec.bossIntro);
    }
  }

  private fireBossShot(boss: BossUnit): void {
    const direction = boss.direction;
    const bullet = this.enemyBullets.get(boss.sprite.x + direction * 28, boss.sprite.y - 12, 'enemyBullet') as Phaser.Physics.Arcade.Sprite | null;
    if (!bullet) return;
    bullet.setActive(true).setVisible(true);
    bullet.body?.reset(boss.sprite.x + direction * 28, boss.sprite.y - 12);
    bullet.setVelocityX(direction * (boss.phase === 2 ? 590 : 520));
    bullet.setVelocityY(Phaser.Math.Between(-35, 35));
    this.time.delayedCall(1300, () => bullet.active && bullet.destroy());
  }

  private hitBoss(source: 'SOCOM' | 'CQC'): void {
    const boss = this.boss;
    if (!boss || boss.defeated) return;
    if (!boss.active) this.activateBoss();

    boss.hp = Math.max(0, boss.hp - (source === 'CQC' ? 1 : 1));
    boss.sprite.setTint(0xff9f6b);
    this.time.delayedCall(120, () => boss.sprite.active && !boss.defeated && boss.sprite.setTint(boss.phase === 2 ? this.profile.boss.tintPhaseTwo : this.profile.boss.tintPhaseOne));
    this.flashStatus(`${this.profile.boss.name.toUpperCase()} ARMOR HIT: ${boss.hp}/${boss.maxHp}`);

    if (boss.hp <= Math.floor(boss.maxHp / 2) && boss.phase === 1) {
      boss.phase = 2;
      boss.sprite.setTint(0xff6b6b);
      this.flashStatus(`${this.profile.boss.name.toUpperCase()} PHASE 2: AGGRESSIVE PATTERN`);
      if (!this.bossMidfightEmitted) {
        this.bossMidfightEmitted = true;
        this.emitProfileCodec(this.profile.codec.bossMidfight);
      }
    }

    if (boss.hp <= 0) this.defeatBoss();
  }

  private defeatBoss(): void {
    const boss = this.boss;
    if (!boss || boss.defeated) return;
    boss.defeated = true;
    boss.active = false;
    boss.sprite.setVelocity(0, 0);
    boss.sprite.setTint(0x456b49);
    this.completedObjectives.add('defeat_captain');
    this.objectiveStage = 'extract';
    this.suspicionMeter = Math.min(this.suspicionMeter, 45);
    this.flashStatus(`${this.profile.boss.name.toUpperCase()} DEFEATED`);
    if (!this.bossDefeatedEmitted) {
      this.bossDefeatedEmitted = true;
      this.emitProfileCodec(this.profile.codec.bossDefeated);
    }
  }

  private handleCameraSweep(): void {
    this.cameraScanGraphics.clear();
    if (this.cameraDisabled) return;

    const chaffActive = this.isChaffActive();
    const direction = Math.sin(this.time.now / 760) >= 0 ? 1 : -1;
    const coneColor = chaffActive ? 0x88a8ff : 0xff6b6b;
    const alpha = chaffActive ? 0.08 : 0.18;
    const x = this.cameraNode.x;
    const y = this.cameraNode.y + 10;

    this.cameraScanGraphics.fillStyle(coneColor, alpha);
    this.cameraScanGraphics.beginPath();
    this.cameraScanGraphics.moveTo(x, y);
    this.cameraScanGraphics.lineTo(x + direction * 285, y + 220);
    this.cameraScanGraphics.lineTo(x + direction * 45, y + 220);
    this.cameraScanGraphics.closePath();
    this.cameraScanGraphics.fillPath();

    if (chaffActive) this.cameraNode.setTint(0x88a8ff);
    else this.cameraNode.clearTint();
  }

  private handleSearchlightSweep(): void {
    this.searchlightGraphics.clear();
    const chaffActive = this.isChaffActive();
    const originX = this.profile.searchlight.x;
    const originY = this.profile.searchlight.y;
    const sweep = Math.sin(this.time.now / 980);
    const targetX = originX + sweep * this.profile.searchlight.sweep;
    const targetY = 505;

    this.searchlightGraphics.fillStyle(chaffActive ? 0x88a8ff : 0xf8f49a, chaffActive ? 0.05 : 0.13);
    this.searchlightGraphics.beginPath();
    this.searchlightGraphics.moveTo(originX, originY);
    this.searchlightGraphics.lineTo(targetX - 90, targetY);
    this.searchlightGraphics.lineTo(targetX + 90, targetY);
    this.searchlightGraphics.closePath();
    this.searchlightGraphics.fillPath();
    this.searchlightGraphics.fillStyle(chaffActive ? 0x88a8ff : 0xf8f49a, 0.85);
    this.searchlightGraphics.fillCircle(originX, originY, 8);

    this.bossBarrierGraphics.clear();
    if (this.boss?.active && !this.boss.defeated) {
      this.bossBarrierGraphics.fillStyle(0xff6b6b, 0.1);
      this.bossBarrierGraphics.fillRect(this.profile.completionX.bossArena, 110, 580, 410);
      this.bossBarrierGraphics.lineStyle(2, 0xff6b6b, 0.45);
      this.bossBarrierGraphics.strokeRect(this.profile.completionX.bossArena, 110, 580, 410);
    }
  }

  private handleDetection(): void {
    if (this.health <= 0) return;

    let detectionAmount = 0;
    let source = '';

    this.guards.forEach((guard) => {
      const result = this.getGuardDetection(guard);
      if (result.amount > detectionAmount) {
        detectionAmount = result.amount;
        source = result.source;
      }
    });

    if (!this.cameraDisabled && !this.isChaffActive() && this.isPlayerInCameraCone()) {
      const amount = this.isPlayerCrouched() ? 1.05 : 2.35;
      if (amount > detectionAmount) {
        detectionAmount = amount;
        source = 'security camera';
      }
    }

    if (!this.isChaffActive() && this.isPlayerInSearchlightCone()) {
      const amount = this.isPlayerCrouched() ? 0.7 : 1.45;
      if (amount > detectionAmount) {
        detectionAmount = amount;
        source = 'searchlight sweep';
      }
    }

    if (this.boss?.active && !this.boss.defeated && Math.abs(this.player.x - this.boss.sprite.x) < 620) {
      detectionAmount = Math.max(detectionAmount, 2.2);
      source = `${this.profile.boss.name.toLowerCase()} line of fire`;
    }

    if (detectionAmount > 0) {
      this.increaseSuspicion(detectionAmount * this.getFrameFactor(), source);
      if (this.alertState === 'ALERT') this.alertPhaseEndsAt = Math.max(this.alertPhaseEndsAt, this.time.now + 2600);
      return;
    }

    this.decaySuspicion();
  }

  private getGuardDetection(guard: GuardUnit): { amount: number; source: string } {
    if (guard.disabled) return { amount: 0, source: '' };

    const distanceX = Math.abs(this.player.x - guard.sprite.x);
    const distanceY = Math.abs(this.player.y - guard.sprite.y);
    const sameLevel = distanceY < 78;
    if (!sameLevel) return { amount: 0, source: '' };

    const guardFacingPlayer = guard.direction < 0 ? this.player.x < guard.sprite.x : this.player.x > guard.sprite.x;
    const alertVision = this.alertState === 'ALERT' && distanceX < 420;
    const normalVision = guardFacingPlayer && distanceX < 245;
    if (!alertVision && !normalVision) return { amount: 0, source: '' };

    if (this.isPlayerCrouched() && this.alertState !== 'ALERT') {
      return { amount: distanceX < 105 ? 0.85 : 0.32, source: `${guard.role} guard sightline` };
    }

    if (this.isPlayerSlowWalking() && this.alertState !== 'ALERT') {
      return { amount: 0.72, source: `${guard.role} guard sightline` };
    }

    return { amount: this.alertState === 'ALERT' ? 1.65 : 1.35, source: `${guard.role} guard sightline` };
  }

  private isPlayerInCameraCone(): boolean {
    const direction = Math.sin(this.time.now / 760) >= 0 ? 1 : -1;
    const dx = this.player.x - this.cameraNode.x;
    const dy = this.player.y - this.cameraNode.y;
    const playerInFront = direction > 0 ? dx > 0 : dx < 0;
    return playerInFront && Math.abs(dx) < 300 && dy > 20 && dy < 235 && Math.abs(dx) < 65 + dy * 1.35;
  }

  private isPlayerInSearchlightCone(): boolean {
    const originX = this.profile.searchlight.x;
    const sweep = Math.sin(this.time.now / 980);
    const targetX = originX + sweep * this.profile.searchlight.sweep;
    const dx = Math.abs(this.player.x - targetX);
    return this.player.y > 330 && dx < 108;
  }

  private increaseSuspicion(amount: number, source: string): void {
    this.lastAlertSource = source;
    if (source === 'security camera' && !this.firstCameraDetectionEmitted) {
      this.firstCameraDetectionEmitted = true;
      this.emitProfileCodec(this.profile.codec.cameraDetected);
    }
    if (source === 'searchlight sweep' && !this.firstSearchlightDetectionEmitted) {
      this.firstSearchlightDetectionEmitted = true;
      this.emitProfileCodec(this.profile.codec.searchlight);
    }
    this.suspicionDecayBlockedUntil = this.time.now + 450;

    if (this.alertState === 'ALERT') {
      this.suspicionMeter = 100;
      this.suspicionPeak = 100;
      return;
    }

    const cautionMultiplier = this.alertState === 'CAUTION' || this.alertState === 'EVASION' ? 1.35 : 1;
    this.suspicionMeter = Phaser.Math.Clamp(this.suspicionMeter + amount * cautionMultiplier, 0, 100);
    this.suspicionPeak = Math.max(this.suspicionPeak, this.suspicionMeter);

    if (this.suspicionMeter >= 12 && this.alertState === 'NORMAL') {
      this.setAlertState('SUSPICION', source, 'Suspicion rising');
      if (!this.firstSuspicionEmitted) {
        this.firstSuspicionEmitted = true;
        this.emitProfileCodec(this.profile.codec.suspicion);
      }
    }

    if (this.suspicionMeter >= 100) this.triggerAlert(source);
  }

  private decaySuspicion(): void {
    if (this.time.now < this.suspicionDecayBlockedUntil) return;
    if (this.alertState === 'ALERT') return;

    const decayBase = this.alertState === 'CAUTION' ? 0.42 : this.alertState === 'EVASION' ? 0.26 : 1.05;
    this.suspicionMeter = Phaser.Math.Clamp(this.suspicionMeter - decayBase * this.getFrameFactor(), 0, 100);

    if (this.suspicionMeter <= 0 && this.alertState === 'SUSPICION') {
      this.setAlertState('NORMAL', 'line of sight lost', 'Suspicion cleared');
    }
  }

  private triggerAlert(source: string): void {
    const wasAlert = this.alertState === 'ALERT';
    this.alertState = 'ALERT';
    this.lastAlertSource = source;
    this.suspicionMeter = 100;
    this.suspicionPeak = 100;
    this.alertPhaseEndsAt = this.time.now + (this.boss?.active ? 5000 : 4300);

    if (!wasAlert || this.time.now >= this.nextAlertAllowedAt) {
      this.alertCount += 1;
      this.nextAlertAllowedAt = this.time.now + 5200;
      this.emitAlertEvent('ALERT', source, 'Combat alert triggered');
      this.scheduleReinforcement();
    }

    if (!this.firstAlertEmitted) {
      this.firstAlertEmitted = true;
      this.emitProfileCodec(this.profile.codec.firstAlert);
    }
  }

  private updateAlertState(): void {
    if (this.health <= 0) {
      this.alertState = 'MISSION FAILED';
      return;
    }

    if (this.boss?.active && !this.boss.defeated) {
      this.alertState = 'ALERT';
      this.suspicionMeter = 100;
      return;
    }

    if (this.alertState === 'ALERT' && this.time.now > this.alertPhaseEndsAt) {
      this.suspicionMeter = 70;
      this.setAlertState('EVASION', this.lastAlertSource, 'Enemy lost direct contact');
      this.alertPhaseEndsAt = this.time.now + 2600;
      if (!this.firstEvasionEmitted) {
        this.firstEvasionEmitted = true;
        this.emitProfileCodec(this.profile.codec.evasion);
      }
    } else if (this.alertState === 'EVASION' && this.time.now > this.alertPhaseEndsAt) {
      this.suspicionMeter = 45;
      this.setAlertState('CAUTION', this.lastAlertSource, 'Caution phase started');
      this.alertPhaseEndsAt = this.time.now + 3600;
      if (!this.firstCautionEmitted) {
        this.firstCautionEmitted = true;
        this.emitProfileCodec(this.profile.codec.caution);
      }
    } else if (this.alertState === 'CAUTION' && (this.time.now > this.alertPhaseEndsAt || this.suspicionMeter <= 3)) {
      this.suspicionMeter = 0;
      this.setAlertState('NORMAL', 'area quiet', 'Security status normalized');
    }
  }

  private setAlertState(state: AlertState, source: string, message: string): void {
    if (this.alertState === state) return;
    this.alertState = state;
    this.lastAlertSource = source;
    this.emitAlertEvent(state, source, message);
  }

  private emitAlertEvent(level: string, source: string, message: string): void {
    const payload: AlertEventPayload = {
      missionId: this.profile.id,
      missionTitle: this.profile.title,
      level,
      alerts: this.alertCount,
      source,
      message,
      timeSeconds: Math.round((this.time.now - this.missionStartTime) / 1000),
      suspicion: Math.round(this.suspicionMeter),
      stealthScore: this.getStealthScore()
    };
    emitGameEvent<AlertEventPayload>(GAME_EVENT.ALERT, payload);
  }

  private scheduleReinforcement(): void {
    if (this.reinforcementCount >= 3) return;
    if (this.nextReinforcementAt > this.time.now) return;
    this.nextReinforcementAt = this.time.now + (this.reinforcementCount === 0 ? 1500 : 5200);
  }

  private handleReinforcements(): void {
    if (this.alertState !== 'ALERT') return;
    if (this.reinforcementCount >= 3) return;
    if (this.nextReinforcementAt === 0 || this.time.now < this.nextReinforcementAt) return;

    const spawnX = this.player.x < this.profile.worldWidth / 2 ? this.profile.worldWidth - 340 : 260;
    const patrolMin = Phaser.Math.Clamp(spawnX - 260, 80, this.profile.worldWidth - 140);
    const patrolMax = Phaser.Math.Clamp(spawnX + 260, 160, this.profile.worldWidth - 80);
    const guard = this.spawnGuard({ x: spawnX, y: 454, patrolMin, patrolMax, role: 'reinforcement' });
    guard.direction = spawnX > this.player.x ? -1 : 1;
    guard.sprite.setTint(0xffdf85);
    this.reinforcementCount += 1;
    this.nextReinforcementAt = 0;
    this.emitAlertEvent('REINFORCEMENT', 'base security response', 'Reinforcement unit deployed');

    if (!this.reinforcementCodecEmitted) {
      this.reinforcementCodecEmitted = true;
      this.emitProfileCodec(this.profile.codec.reinforcement);
    }

    if (this.reinforcementCount < 3 && !this.boss?.active) this.scheduleReinforcement();
  }

  private handleGuardCombat(): void {
    if (this.health <= 0 || this.alertState !== 'ALERT') return;

    this.guards.forEach((guard) => {
      if (guard.disabled || this.time.now < guard.lastShotAt) return;

      const distanceX = Math.abs(this.player.x - guard.sprite.x);
      const sameLevel = Math.abs(this.player.y - guard.sprite.y) < 95;
      if (distanceX > 520 || !sameLevel) return;

      guard.lastShotAt = this.time.now + (guard.role === 'reinforcement' ? 720 : 900);
      const direction = this.player.x < guard.sprite.x ? -1 : 1;
      const bullet = this.enemyBullets.get(guard.sprite.x + direction * 18, guard.sprite.y - 6, 'enemyBullet') as Phaser.Physics.Arcade.Sprite | null;
      if (!bullet) return;

      bullet.setActive(true).setVisible(true);
      bullet.body?.reset(guard.sprite.x + direction * 18, guard.sprite.y - 6);
      bullet.setVelocityX(direction * (guard.role === 'reinforcement' ? 520 : 460));
      bullet.setVelocityY(0);
      this.time.delayedCall(1200, () => bullet.active && bullet.destroy());
    });
  }

  private registerNoise(amount: number, source: string): void {
    const nearestAwakeGuard = this.guards.some(
      (guard) => !guard.disabled && Math.abs(guard.sprite.x - this.player.x) < 370 && Math.abs(guard.sprite.y - this.player.y) < 130
    );
    if (!nearestAwakeGuard || this.alertState === 'ALERT') return;
    this.increaseSuspicion(amount, source);
  }

  private destroyPhysicsObject(object: unknown): void {
    const candidate = object as Phaser.GameObjects.GameObject | undefined;
    candidate?.destroy?.();
  }

  private tryCqc(): void {
    if (this.health <= 0) return;

    if (this.boss?.active && !this.boss.defeated) {
      const distanceToBoss = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.boss.sprite.x, this.boss.sprite.y);
      if (distanceToBoss < 92) {
        this.hitBoss('CQC');
        this.damagePlayer(this.boss.phase === 2 ? 10 : 6, 'counter impact');
        return;
      }
    }

    const candidates = this.guards
      .filter((guard) => !guard.disabled)
      .map((guard) => ({ guard, distance: Phaser.Math.Distance.Between(this.player.x, this.player.y, guard.sprite.x, guard.sprite.y) }))
      .filter((entry) => entry.distance < 100)
      .sort((a, b) => a.distance - b.distance);

    const target = candidates[0]?.guard;
    if (!target) {
      this.flashStatus('NO TARGET IN CQC RANGE');
      return;
    }

    const behindGuard = target.direction < 0 ? this.player.x > target.sprite.x : this.player.x < target.sprite.x;
    target.disabled = true;
    target.sprite.setVelocity(0, 0);
    target.sprite.setTint(0x456b49);
    this.neutralizations += 1;
    this.flashStatus(behindGuard ? 'CQC NON-LETHAL TAKEDOWN' : 'CQC TAKEDOWN');
    this.emitProfileCodec(this.profile.codec.cqc);

    if (!behindGuard && this.alertState !== 'ALERT') this.increaseSuspicion(22, 'visible CQC takedown');
  }

  private hitGuard(guard: GuardUnit): void {
    if (guard.disabled) return;
    guard.hp -= 1;
    guard.sprite.setTint(0xff9f6b);

    if (guard.hp > 0) {
      this.flashStatus('ARMORED TARGET HIT');
      this.triggerAlert('weapon impact');
      return;
    }

    guard.disabled = true;
    this.kills += 1;
    guard.sprite.setTint(0xff6b6b);
    guard.sprite.setVelocity(0, 0);
    this.triggerAlert('lethal shot');
    this.flashStatus(guard.role === 'reinforcement' ? 'REINFORCEMENT DOWN' : 'GUARD DOWN - LETHAL SHOT');
  }

  private hitCamera(): void {
    if (this.cameraDisabled) return;
    this.cameraDisabled = true;
    this.camerasDisabled += 1;
    this.cameraNode.setTint(0x456b49);
    this.flashStatus('CAMERA DESTROYED');
    this.emitProfileCodec(this.profile.codec.cameraDown);
    this.registerNoise(20, 'camera destroyed');
  }

  private damagePlayer(amount: number, source: string): void {
    if (this.health <= 0 || this.time.now < this.lastDamageTime + 650) return;
    this.lastDamageTime = this.time.now;
    this.health = Math.max(0, this.health - amount);
    this.inputController.vibrate(130, 0.62, 0.45);
    this.damageTaken += amount;
    this.player.setTint(0xff6b6b);
    this.time.delayedCall(160, () => this.player.active && !this.isPlayerCrouched() && this.player.clearTint());
    this.flashStatus(`DAMAGE: ${source.toUpperCase()}`);

    if (this.health <= 35 && !this.lowHealthEmitted) {
      this.lowHealthEmitted = true;
      this.emitProfileCodec(this.profile.codec.lowHealth);
    }

    if (this.health <= 0) this.failMission(source);
  }

  private failMission(source = 'unknown'): void {
    if (this.missionCompleted) return;
    this.missionCompleted = true;
    this.alertState = 'MISSION FAILED';
    this.player.setTint(0x333333);
    this.player.setVelocity(0, 0);
    this.objectiveText.setText('MISSION FAILED: press ENTER in result screen to retry');
    this.emitProfileCodec(this.profile.codec.missionFailed);
    this.emitHudUpdate();

    const result = this.buildMissionResult(false, `Mission failed: ${source}`);
    emitGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, result);
    this.time.delayedCall(350, () => this.scene.start('MissionCompleteScene', result));
  }

  private updateDoorState(): void {
    if (this.hasKeycard) this.lockedDoor.setTint(0x7cff6b);
    else this.lockedDoor.clearTint();
  }

  private updateObjectiveState(): void {
    if (!this.hasKeycard) {
      this.objectiveStage = 'recover_keycard';
      return;
    }

    if (this.player.x > this.profile.completionX.openDoor) this.completedObjectives.add('open_security_door');
    if (this.player.x > this.profile.completionX.crossYard) this.completedObjectives.add('cross_security_yard');

    if (this.boss?.active && !this.boss.defeated) this.objectiveStage = 'defeat_captain';
    else if (this.boss?.defeated) this.objectiveStage = 'extract';
    else if (this.player.x < 1545) this.objectiveStage = 'open_security_door';
    else this.objectiveStage = 'cross_security_yard';
  }

  private getObjectiveLabel(): string {
    return this.profile.stageLabels[this.objectiveStage] ?? 'Advance mission';
  }

  private updateHudText(): void {
    const chaffLabel = this.isChaffActive() ? 'ACTIVE' : 'READY';
    this.statusText.setText(
      `STATUS: ${this.alertState} | CARD: ${this.hasKeycard ? 'LV.1' : 'NONE'} | OBJ ${this.completedObjectives.size}/${this.profile.totalObjectives} | SECRETS ${this.secretsFound.size}/${this.totalSecrets} | STEALTH ${this.getStealthScore()}`
    );
    this.objectiveText.setText(`OBJECTIVE: ${this.getObjectiveLabel()}`);
    this.alertText.setText(
      `SUSPICION: ${Math.round(this.suspicionMeter).toString().padStart(3, '0')}% | SOURCE: ${this.lastAlertSource.toUpperCase()} | REINF: ${this.reinforcementCount}/3`
    );
    this.hudText.setText(
      `HP ${this.health}/${this.maxHealth} | SOCOM ${this.ammo}/${this.maxAmmo} | RATION ${this.rations} | CHAFF ${this.chaff} ${chaffLabel} | J SHOOT | SPACE CQC | F CHAFF | R RATION | C CODEC`
    );
    if (this.boss?.active && !this.boss.defeated) {
      this.bossText.setText(`BOSS: ${this.profile.boss.name.toUpperCase()} | PHASE ${this.boss.phase} | ARMOR ${this.boss.hp}/${this.boss.maxHp}`);
    } else if (this.boss?.defeated) {
      this.bossText.setText('BOSS: NEUTRALIZED | EXTRACTION ROUTE OPEN');
    } else {
      this.bossText.setText('');
    }
  }

  private emitHudUpdate(): void {
    const bossActive = Boolean(this.boss?.active && !this.boss?.defeated);
    const bossDefeated = Boolean(this.boss?.defeated);
    const payload: MissionHudPayload = {
      missionId: this.profile.id,
      missionTitle: this.profile.title,
      bossName: this.profile.boss.name,
      health: this.health,
      maxHealth: this.maxHealth,
      ammo: this.ammo,
      maxAmmo: this.maxAmmo,
      rations: this.rations,
      chaff: this.chaff,
      hasKeycard: this.hasKeycard,
      alertState: this.alertState,
      suspicion: Math.round(this.suspicionMeter),
      stealthScore: this.getStealthScore(),
      reinforcementCount: this.reinforcementCount,
      activeEnemies: this.guards.filter((guard) => !guard.disabled).length + (bossActive ? 1 : 0),
      lastAlertSource: this.lastAlertSource,
      alerts: this.alertCount,
      shotsFired: this.shotsFired,
      kills: this.kills,
      neutralizations: this.neutralizations,
      camerasDisabled: this.camerasDisabled,
      objective: this.getObjectiveLabel(),
      objectiveStage: this.objectiveStage,
      objectivesCompleted: this.completedObjectives.size,
      totalObjectives: this.profile.totalObjectives,
      secretsFound: this.secretsFound.size,
      totalSecrets: this.totalSecrets,
      bossActive,
      bossDefeated,
      bossHealth: this.boss?.hp ?? 0,
      bossMaxHealth: this.boss?.maxHp ?? 0,
      chaffActive: this.isChaffActive()
    };
    emitGameEvent<MissionHudPayload>(GAME_EVENT.HUD_UPDATE, payload);
  }

  private flashStatus(message: string): void {
    this.objectiveText.setText(`INFO: ${message}`);
    this.time.delayedCall(1450, () => {
      if (!this.objectiveText.active || this.missionCompleted) return;
      this.objectiveText.setText(`OBJECTIVE: ${this.getObjectiveLabel()}`);
    });
  }

  private isPlayerCrouched(): boolean {
    return this.inputController.isDown('crouch');
  }

  private isPlayerSlowWalking(): boolean {
    return this.inputController.isDown('sprint');
  }

  private isChaffActive(): boolean {
    return this.time.now < this.chaffActiveUntil;
  }

  private getFrameFactor(): number {
    return Math.max(0.5, Math.min(2.2, this.game.loop.delta / 16.67));
  }

  private getStealthScore(): number {
    let score = 1000;
    score -= this.alertCount * 170;
    score -= this.kills * 95;
    score -= this.damageTaken * 2;
    score -= this.rationsUsed * 75;
    score -= Math.max(0, this.shotsFired - 14) * 8;
    score -= this.camerasDisabled * 20;
    score -= this.reinforcementCount * 65;
    score -= Math.floor(this.suspicionPeak * 1.2);
    score += this.secretsFound.size * 45;
    score += this.boss?.defeated ? 80 : 0;
    return Math.max(0, Math.round(score));
  }

  private emitCodec(
    trigger: CodecRequestPayload['trigger'],
    contactId: string,
    conversationId: string,
    message: string,
    pauseGame: boolean
  ): void {
    emitGameEvent<CodecRequestPayload>(GAME_EVENT.REQUEST_CODEC_CALL, {
      trigger,
      contactId,
      conversationId,
      message,
      pauseGame
    });

    if (pauseGame && !this.missionCompleted) {
      this.scene.pause();
    }
  }

  private emitProfileCodec(call: CodecProfileCall): void {
    this.emitCodec(call.trigger, call.contactId, call.conversationId, call.message, call.pauseGame);
  }

  private completeMission(): void {
    if (this.missionCompleted) return;
    if (!this.hasKeycard) {
      this.objectiveText.setText(`OBJECTIVE: Need ${this.profile.keycard.label} before extraction`);
      return;
    }
    if (!this.boss?.defeated) {
      this.objectiveText.setText(`OBJECTIVE: ${this.profile.boss.name} still controls extraction route`);
      if (!this.boss?.active) this.activateBoss();
      return;
    }

    this.missionCompleted = true;
    this.completedObjectives.add('extract');
    const result = this.buildMissionResult(true, `Mission clear: ${this.profile.elevator.label} reached`);
    emitGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, result);
    this.emitProfileCodec({ ...this.profile.codec.missionComplete, message: `Mission complete. Rank preview: ${result.rankPreview}` });
    this.scene.start('MissionCompleteScene', result);
  }

  private buildMissionResult(success: boolean, outcome: string): MissionCompletePayload {
    const timeSeconds = Math.round((this.time.now - this.missionStartTime) / 1000);
    const rankPreview = success
      ? calculateSideOpsRank({
        alerts: this.alertCount,
        kills: this.kills,
        damageTaken: this.damageTaken,
        rationsUsed: this.rationsUsed,
        timeSeconds,
        shotsFired: this.shotsFired,
        stealthScore: this.getStealthScore(),
        reinforcementCount: this.reinforcementCount
      })
      : 'MISSION FAILED';

    return {
      missionId: this.profile.id,
      missionTitle: this.profile.title,
      bossName: this.profile.boss.name,
      success,
      outcome,
      rankPreview,
      alerts: this.alertCount,
      timeSeconds,
      shotsFired: this.shotsFired,
      kills: this.kills,
      neutralizations: this.neutralizations,
      rationsUsed: this.rationsUsed,
      damageTaken: this.damageTaken,
      camerasDisabled: this.camerasDisabled,
      objectivesCompleted: this.completedObjectives.size,
      totalObjectives: this.profile.totalObjectives,
      secretsFound: this.secretsFound.size,
      totalSecrets: this.totalSecrets,
      bossDefeated: Boolean(this.boss?.defeated),
      noAlert: this.alertCount === 0,
      noKill: this.kills === 0,
      stealthScore: this.getStealthScore(),
      reinforcementCount: this.reinforcementCount
    };
  }
}
