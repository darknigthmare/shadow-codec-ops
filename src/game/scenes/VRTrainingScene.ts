import Phaser from 'phaser';
import vrMissionsJson from '../../data/vrMissions.json';
import type {
  Mgs1VrMissionProfile,
  Mgs1VrTargetFamily,
  Mgs1VrWeaponId,
  VrMissionDefinition,
  VrRunStats
} from '../../types/vr.types';
import { emitGameEvent, GAME_EVENT, type VrRunGamePayload } from '../core/GameEvents';
import {
  MGS1_VR_ALL_ASSETS,
  resolveMgs1VrEnvironment,
  type Mgs1VrEnvironmentLayout
} from '../core/mgs1VrEnvironmentRegistry';
import {
  MGS1_VR_ACTOR_ASSETS,
  MGS1_VR_VFX_ASSETS,
  getMgs1VrActorAnimationClip,
  getMgs1VrActorAnimationKey,
  getMgs1VrVfxAnimationClip,
  getMgs1VrVfxAnimationKey,
  type Mgs1VrActorAnimationState
} from '../core/mgs1VrGameplayAssetRegistry';
import {
  getMgs1VrMissionProfileById,
  getMgs1VrMissionProfileForMission
} from '../core/mgs1VrMissionProfileRegistry';

import { VR_ACTIVE_MISSION_KEY } from '../core/vrConstants';
import { RuntimeInputController } from '../core/RuntimeInput';
type VrActorType = 'target' | 'guard' | 'cqc_guard' | 'boss';

interface VrActor {
  id: string;
  sprite: Phaser.Physics.Arcade.Sprite;
  type: VrActorType;
  hp: number;
  disabled: boolean;
  direction: number;
  patrolMin: number;
  patrolMax: number;
  lastDamageAt: number;
  targetFamily?: Mgs1VrTargetFamily;
  moving?: boolean;
  explosive?: boolean;
  flying?: boolean;
  destructible?: boolean;
  baseY?: number;
}

interface VrCameraProbe {
  id: string;
  sprite: Phaser.Physics.Arcade.Sprite;
  disabled: boolean;
  sweepOffset: number;
}

const vrMissions = vrMissionsJson as VrMissionDefinition[];
const mgs1VrEnvironmentAssetById = new Map(
  MGS1_VR_ALL_ASSETS.map((asset) => [asset.id, asset] as const)
);

const MGS1_VR_TARGET_TEXTURES: Readonly<Record<Mgs1VrTargetFamily, string>> = {
  'CUBE-B': 'mgs1VrEnvTargetCubeBlue',
  'CUBE-R': 'mgs1VrEnvTargetCubeRed',
  'KOKESHI-B': 'mgs1VrEnvTargetKokeshiBlue',
  'KOKESHI-G': 'mgs1VrEnvTargetKokeshiGreen',
  'MOVE-B': 'mgs1VrEnvTargetMoveBlue',
  'MOVE-R': 'mgs1VrEnvTargetMoveRed',
  WALL: 'mgs1VrEnvTargetWall',
  UFO: 'mgs1VrEnvTargetUfo'
};

const MGS1_VR_WEAPON_LABELS: Readonly<Record<Mgs1VrWeaponId, string>> = {
  socom: 'SOCOM',
  famas: 'FAMAS',
  psg1: 'PSG1',
  grenade: 'GRENADE',
  c4: 'C4',
  claymore: 'CLAYMORE',
  stinger: 'STINGER',
  nikita: 'NIKITA'
};

const MGS1_VR_WEAPON_TEXTURES: Readonly<Record<Mgs1VrWeaponId, string>> = {
  socom: 'mgs1VrWeaponSocom',
  famas: 'mgs1VrWeaponFamas',
  psg1: 'mgs1VrWeaponPsg1',
  grenade: 'mgs1VrWeaponGrenade',
  c4: 'mgs1VrWeaponC4',
  claymore: 'mgs1VrWeaponClaymore',
  stinger: 'mgs1VrWeaponStinger',
  nikita: 'mgs1VrWeaponNikita'
};

type VrProjectileKind = Mgs1VrWeaponId | 'bullet';

interface VrProjectileOptions {
  kind: VrProjectileKind;
  damage: number;
  blastRadius?: number;
  allowGravity?: boolean;
  lifetime?: number;
}

function createEmptyStats(): VrRunStats {
  return {
    timeSeconds: 0,
    alerts: 0,
    shotsFired: 0,
    hits: 0,
    kills: 0,
    neutralizations: 0,
    damageTaken: 0,
    rationsUsed: 0,
    camerasDisabled: 0,
    objectivesCompleted: 0,
    secretsFound: 0,
    bossDefeated: false
  };
}

function getActiveVrMission(): VrMissionDefinition {
  const storedId = window.localStorage.getItem(VR_ACTIVE_MISSION_KEY);
  return vrMissions.find((mission) => mission.id === storedId) ?? vrMissions[0];
}

export class VRTrainingScene extends Phaser.Scene {
  private mission!: VrMissionDefinition;
  private missionProfile?: Mgs1VrMissionProfile;
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private bullets!: Phaser.Physics.Arcade.Group;
  private actors: VrActor[] = [];
  private cameraProbes: VrCameraProbe[] = [];
  private exitPad!: Phaser.Physics.Arcade.Sprite;
  private inputController!: RuntimeInputController;
  private scanGraphics!: Phaser.GameObjects.Graphics;
  private hudText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private requirementText!: Phaser.GameObjects.Text;
  private weaponIcon?: Phaser.GameObjects.Image;
  private plantedC4?: Phaser.Physics.Arcade.Sprite;
  private claymores: Phaser.Physics.Arcade.Sprite[] = [];
  private guidedMissile?: Phaser.Physics.Arcade.Sprite;

  private stats: VrRunStats = createEmptyStats();
  private startTime = 0;
  private health = 100;
  private ammo = 30;
  private rations = 1;
  private chaff = 1;
  private chaffActiveUntil = 0;
  private lastShotAt = 0;
  private lastDamageAt = 0;
  private lastAlertAt = 0;
  private completed = false;
  private objectives = new Set<string>();
  private secretCollected = false;
  private lastHudEmitAt = 0;
  private goalMaterialized = false;

  constructor() {
    super('VRTrainingScene');
  }

  create(): void {
    this.mission = getActiveVrMission();
    this.missionProfile = getMgs1VrMissionProfileById(this.mission.missionProfileId)
      ?? getMgs1VrMissionProfileForMission(this.mission.id);
    this.stats = createEmptyStats();
    this.health = 100;
    this.ammo = this.getInitialAmmo();
    this.rations = this.mission.category === 'boss_challenge' ? 1 : 0;
    this.chaff = this.mission.category === 'surveillance' ? 4 : 1;
    this.chaffActiveUntil = 0;
    this.completed = false;
    this.objectives = new Set<string>();
    this.secretCollected = false;
    this.goalMaterialized = false;
    this.actors = [];
    this.cameraProbes = [];
    this.plantedC4 = undefined;
    this.claymores = [];
    this.guidedMissile = undefined;
    this.startTime = this.time.now;

    this.createGameplayAnimations();

    this.physics.world.setBounds(0, 0, 1900, 540);
    this.cameras.main.setBounds(0, 0, 1900, 540);
    this.addArenaBackdrop();

    this.platforms = this.physics.add.staticGroup();
    this.addPlatform(230, 520, 8);
    this.addPlatform(735, 520, 8);
    this.addPlatform(1240, 520, 8);
    this.addPlatform(1700, 520, 6);
    this.addPlatform(390, 405, 3);
    this.addPlatform(750, 330, 3);
    this.addPlatform(1115, 400, 3);
    this.addPlatform(1450, 345, 3);

    const playerTexture = this.textures.exists('mgs1VrSolidSnake')
      ? 'mgs1VrSolidSnake'
      : this.textures.exists('vrPlayer')
        ? 'vrPlayer'
        : 'player';
    this.player = this.physics.add.sprite(85, 450, playerTexture);
    this.player.setCollideWorldBounds(true);
    this.player.setDragX(1300);
    this.player.setMaxVelocity(250, 560);
    this.physics.add.collider(this.player, this.platforms);
    this.playActorAnimation(this.player, 'idle');

    this.bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 44 });
    this.physics.add.collider(
      this.bullets,
      this.platforms,
      (projectile) => this.handleProjectilePlatformImpact(projectile),
      (projectile) => (projectile as Phaser.Physics.Arcade.Sprite).getData('ignorePlatforms') !== true
    );

    const goalTexture = this.textures.exists('mgs1VrEnvHazardGoalBeacon')
      ? 'mgs1VrEnvHazardGoalBeacon'
      : 'vrGoalBeaconFallback';
    this.exitPad = this.physics.add.staticSprite(1810, 468, goalTexture);
    // Keep the original 42 x 68 overlap footprint while replacing the industrial-door art.
    this.exitPad.setDisplaySize(42, 68).refreshBody();
    this.physics.add.overlap(this.player, this.exitPad, () => this.tryCompleteRun());

    this.inputController = new RuntimeInputController(this);
    const cameraLerp = this.inputController.profile.reducedMotion ? 1 : 0.09;
    this.cameras.main.startFollow(this.player, true, cameraLerp, cameraLerp);

    this.scanGraphics = this.add.graphics();
    this.addFixedHud();
    this.configureChallenge();


    this.emitHud('running', `Playable VR loaded: ${this.mission.title}`);
  }

  update(): void {
    if (this.completed) return;
    this.inputController.update();
    this.syncTime();
    this.handlePlayerInput();
    this.handleActors();
    this.handlePlacedExplosives();
    this.handleStingerMissiles();
    this.handleGuidedMissile();
    this.handleCameras();
    this.handleDetection();
    this.checkRouteMilestones();
    this.updateHudText();
    if (this.time.now > this.lastHudEmitAt + 180) this.emitHud('running', 'VR run active');
  }

  private getInitialAmmo(): number {
    const weapon = this.missionProfile?.weapon;
    if (!weapon) return this.missionProfile ? 0 : this.mission.category === 'weapon_training' ? 40 : 28;
    const ammoByWeapon: Readonly<Record<Mgs1VrWeaponId, number>> = {
      socom: 30,
      famas: 48,
      psg1: 12,
      grenade: 10,
      c4: 8,
      claymore: 8,
      stinger: 8,
      nikita: 10
    };
    return ammoByWeapon[weapon];
  }

  private createGameplayAnimations(): void {
    MGS1_VR_ACTOR_ASSETS.forEach((asset) => {
      if (!this.textures.exists(asset.textureKey)) return;
      (Object.keys(asset.clips) as Mgs1VrActorAnimationState[]).forEach((state) => {
        const clip = getMgs1VrActorAnimationClip(asset.textureKey, state);
        const key = getMgs1VrActorAnimationKey(asset.textureKey, state);
        if (!clip || this.anims.exists(key)) return;
        this.anims.create({
          key,
          frames: this.anims.generateFrameNumbers(asset.textureKey, { start: clip.start, end: clip.end }),
          frameRate: clip.frameRate,
          repeat: clip.repeat
        });
      });
    });

    MGS1_VR_VFX_ASSETS.forEach((asset) => {
      if (!this.textures.exists(asset.textureKey)) return;
      const clip = getMgs1VrVfxAnimationClip(asset.textureKey);
      const key = getMgs1VrVfxAnimationKey(asset.textureKey);
      if (!clip || this.anims.exists(key)) return;
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(asset.textureKey, { start: clip.start, end: clip.end }),
        frameRate: clip.frameRate,
        repeat: clip.repeat
      });
    });
  }

  private playActorAnimation(
    sprite: Phaser.Physics.Arcade.Sprite,
    state: Mgs1VrActorAnimationState,
    actionDuration = 0
  ): void {
    const key = getMgs1VrActorAnimationKey(sprite.texture.key, state);
    if (!this.anims.exists(key)) return;
    if (actionDuration > 0) sprite.setData('actionUntil', this.time.now + actionDuration);
    if ((sprite.getData('actionUntil') as number | undefined ?? 0) > this.time.now && actionDuration === 0) return;
    sprite.play(key, true);
  }

  private playVfx(textureKey: string, x: number, y: number, flipX = false): void {
    if (!this.textures.exists(textureKey)) return;
    const vfx = this.add.sprite(x, y, textureKey).setDepth(45).setFlipX(flipX);
    const key = getMgs1VrVfxAnimationKey(textureKey);
    const clip = getMgs1VrVfxAnimationClip(textureKey);
    if (!this.anims.exists(key) || !clip) {
      this.time.delayedCall(220, () => vfx.active && vfx.destroy());
      return;
    }
    vfx.play(key);
    if (clip.repeat < 0) this.time.delayedCall(320, () => vfx.active && vfx.destroy());
    else vfx.once('animationcomplete', () => vfx.destroy());
  }

  private addArenaBackdrop(): void {
    const layout = resolveMgs1VrEnvironment(this.mission.mapVariant);
    this.add.rectangle(950, 270, 1900, 540, layout.voidColor).setDepth(-30);

    this.addArenaTileLayer(layout.voidTextureKey, 950, 270, 1900, 540, -29, 0.82);
    const hasGridTexture = this.addArenaTileLayer(layout.gridTextureKey, 950, 270, 1900, 540, -26, 0.38);
    const hasAccentTexture = this.addArenaTileLayer(layout.accentTextureKey, 950, 470, 1900, 140, -23, 0.3);

    if (!hasGridTexture) this.addProceduralArenaGrid(layout.gridColor);
    if (!hasAccentTexture) this.add.rectangle(950, 518, 1900, 44, layout.accentColor, 0.28).setDepth(-12);
    this.addEnvironmentDecor(layout);

    this.add.text(24, 22, 'VR PHASER BRIDGE // PLAYABLE TRAINING SCENE', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#7cff6b'
    }).setScrollFactor(0).setDepth(60);
  }

  private addArenaTileLayer(
    textureKey: string,
    x: number,
    y: number,
    width: number,
    height: number,
    depth: number,
    alpha: number
  ): boolean {
    if (!this.textures.exists(textureKey)) return false;
    this.add.tileSprite(x, y, width, height, textureKey).setDepth(depth).setAlpha(alpha);
    return true;
  }

  private addProceduralArenaGrid(gridColor: number): void {
    for (let x = 80; x < 1900; x += 140) {
      this.add.line(x, 0, 0, 0, 0, 540, gridColor, 0.08).setDepth(-15);
    }
    for (let y = 80; y < 520; y += 80) {
      this.add.line(0, y, 0, 0, 1900, 0, gridColor, 0.05).setDepth(-15);
    }
  }

  private addEnvironmentDecor(layout: Mgs1VrEnvironmentLayout): void {
    layout.placements.forEach((placement) => {
      const asset = mgs1VrEnvironmentAssetById.get(placement.assetId);
      if (!asset || !this.textures.exists(asset.textureKey)) return;

      const image = this.add.image(placement.x, placement.y, asset.textureKey)
        .setDepth(Math.min(-1, placement.depth))
        .setScale(placement.scale)
        .setAlpha(placement.alpha);
      if (placement.flipX) image.setFlipX(true);
    });
  }

  private addFixedHud(): void {
    this.statusText = this.add.text(24, 52, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#caffbd'
    }).setScrollFactor(0).setDepth(60);
    this.objectiveText = this.add.text(24, 76, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#f8f49a'
    }).setScrollFactor(0).setDepth(60);
    this.hudText = this.add.text(24, 500, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#d8ffd4'
    }).setScrollFactor(0).setDepth(60);
    this.requirementText = this.add.text(660, 52, '', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#9fd4ff',
      align: 'right'
    }).setScrollFactor(0).setDepth(60).setOrigin(0, 0);

    const weapon = this.missionProfile?.weapon;
    if (weapon && this.textures.exists(MGS1_VR_WEAPON_TEXTURES[weapon])) {
      this.weaponIcon = this.add.image(744, 507, MGS1_VR_WEAPON_TEXTURES[weapon])
        .setScrollFactor(0)
        .setDepth(61)
        .setOrigin(1, 0.5);
    }
  }

  private addPlatform(x: number, y: number, scaleX: number): void {
    // The legacy rectangle remains the invisible collision authority. The
    // OpenAI grid slab is repeated above it, so transparent art margins never
    // create invisible ledges and the grid is not horizontally distorted.
    const platform = this.platforms.create(x, y, 'platform') as Phaser.Physics.Arcade.Sprite;
    platform.setScale(scaleX, 1).refreshBody();
    if (this.textures.exists('mgs1VrEnvPropPlatformTile')) {
      platform.setVisible(false);
      this.add.tileSprite(x, y, 64 * scaleX, 16, 'mgs1VrEnvPropPlatformTile').setDepth(-1);
    }
  }

  private configureChallenge(): void {
    this.add.text(110, 130, this.mission.title.toUpperCase(), {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#7cff6b'
    });
    this.add.text(110, 158, this.mission.objective, {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#caffbd',
      wordWrap: { width: 580 }
    });

    if (this.missionProfile) {
      this.configureProfileChallenge(this.missionProfile);
      this.exitPad.disableBody(true, true);
      this.requirementText.setText(this.buildRequirementSummary());
      return;
    }

    switch (this.mission.category) {
      case 'time_attack':
        this.addRouteMarkers(3);
        this.spawnActor('route_guard_a', 640, 454, 'guard', 1, 520, 740);
        this.spawnActor('route_target_a', 1190, 454, 'target', 1, 1120, 1260);
        this.spawnCameraProbe('route_camera', 980, 238, 0);
        this.spawnSecret(1460, 305);
        break;
      case 'no_alert':
        this.addRouteMarkers(4);
        this.spawnActor('ghost_guard_a', 520, 454, 'guard', 1, 420, 650);
        this.spawnActor('ghost_guard_b', 910, 454, 'guard', 1, 800, 1040);
        this.spawnActor('ghost_guard_c', 1340, 454, 'guard', 1, 1240, 1470);
        this.spawnCameraProbe('ghost_camera_a', 720, 238, 0.4);
        this.spawnCameraProbe('ghost_camera_b', 1240, 238, 1.2);
        this.spawnSecret(1510, 305);
        break;
      case 'weapon_training':
        this.addRouteMarkers(2);
        this.spawnActor('target_01', 470, 454, 'target', 2, 470, 470);
        this.spawnActor('target_02', 710, 304, 'target', 2, 710, 710);
        this.spawnActor('target_03', 965, 454, 'target', 2, 965, 965);
        this.spawnActor('target_04', 1180, 374, 'target', 2, 1180, 1180);
        this.spawnActor('target_05', 1510, 454, 'target', 2, 1510, 1510);
        this.spawnSecret(1680, 450);
        break;
      case 'cqc':
        this.addRouteMarkers(4);
        this.spawnActor('cqc_guard_01', 430, 454, 'cqc_guard', 1, 395, 520);
        this.spawnActor('cqc_guard_02', 700, 454, 'cqc_guard', 1, 650, 800);
        this.spawnActor('cqc_guard_03', 970, 454, 'cqc_guard', 1, 910, 1050);
        this.spawnActor('cqc_guard_04', 1240, 454, 'cqc_guard', 1, 1180, 1340);
        this.spawnActor('cqc_guard_05', 1510, 454, 'cqc_guard', 1, 1450, 1590);
        this.spawnSecret(1510, 305);
        break;
      case 'surveillance':
        this.addRouteMarkers(4);
        this.spawnCameraProbe('camera_a', 480, 238, 0.1);
        this.spawnCameraProbe('camera_b', 880, 238, 0.8);
        this.spawnCameraProbe('camera_c', 1280, 238, 1.5);
        this.spawnActor('surveillance_guard', 1500, 454, 'guard', 1, 1400, 1630);
        this.spawnSecret(760, 305);
        break;
      case 'boss_challenge':
        this.addRouteMarkers(2);
        this.spawnActor('vr_boss', 1240, 454, 'boss', 10, 1080, 1500);
        this.spawnActor('boss_guard_a', 730, 454, 'guard', 1, 640, 820);
        this.spawnSecret(400, 370);
        break;
    }

    if (this.mission.category === 'weapon_training') this.exitPad.disableBody(true, true);
    this.requirementText.setText(this.buildRequirementSummary());
  }

  private configureProfileChallenge(profile: Mgs1VrMissionProfile): void {
    this.addRouteMarkers(2);
    const groundedY = [454, 304, 454, 374, 454, 304, 454, 374];
    const spacing = 1420 / (profile.targetCount + 1);

    for (let index = 0; index < profile.targetCount; index += 1) {
      const x = 230 + spacing * (index + 1);
      const y = profile.flying ? 225 + (index % 2) * 72 : groundedY[index % groundedY.length];
      const patrolRadius = profile.moving ? Math.min(95, spacing * 0.33) : 0;
      const hp = profile.destructible ? 2 : 1;
      this.spawnActor(
        `${profile.targetFamily.toLowerCase().replace('-', '_')}_${String(index + 1).padStart(2, '0')}`,
        x,
        y,
        'target',
        hp,
        x - patrolRadius,
        x + patrolRadius,
        profile
      );
    }

    if (profile.targetFamily !== 'WALL') this.spawnSecret(1680, 450);
    const weaponLabel = profile.weapon ? MGS1_VR_WEAPON_LABELS[profile.weapon] : 'CQC';
    this.flashStatus(`${weaponLabel} // ${profile.targetCount} ${profile.targetFamily} TARGETS`);
  }

  private addRouteMarkers(count: number): void {
    const spacing = 1500 / Math.max(1, count);
    for (let index = 1; index <= count; index += 1) {
      const x = 180 + spacing * index;
      const marker = this.textures.exists('mgs1VrEnvPropRouteMarker')
        ? this.add.image(x, 478, 'mgs1VrEnvPropRouteMarker')
        : this.add.rectangle(x, 478, 28, 56, 0x7cff6b, 0.16).setStrokeStyle(1, 0x7cff6b, 0.45);
      marker.setData('objectiveId', `route_${index}`);
    }
  }

  private spawnActor(
    id: string,
    x: number,
    y: number,
    type: VrActorType,
    hp: number,
    patrolMin: number,
    patrolMax: number,
    profile?: Mgs1VrMissionProfile
  ): void {
    const targetFamily = profile?.targetFamily
      ?? (type === 'target' && this.mission.category === 'weapon_training' ? 'CUBE-B' : undefined);
    const officialTargetTexture = targetFamily ? this.resolveTargetTexture(targetFamily) : undefined;
    const preferredTexture = officialTargetTexture
      ?? (type === 'boss'
        ? 'mgs1VrGenola'
        : type === 'target'
          ? 'vrTarget'
          : 'mgs1VrGenomeSoldier');
    const legacyTexture = type === 'boss' ? 'bossCaptain' : type === 'target' ? 'reinforcementGuard' : 'guard';
    const texture = this.textures.exists(preferredTexture) ? preferredTexture : legacyTexture;
    const sprite = this.physics.add.sprite(x, y, texture);
    sprite.setCollideWorldBounds(true);
    sprite.setFlipX(true);
    this.physics.add.collider(sprite, this.platforms);
    if (type === 'target' && !officialTargetTexture) sprite.setTint(0x9fd4ff);
    if (type === 'cqc_guard') sprite.setTint(0xf8f49a);
    if (type === 'boss') sprite.setTint(0xff9b82).setScale(texture === 'mgs1VrGenola' ? 0.9 : 1.15);
    if (profile?.flying) {
      (sprite.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      sprite.setCollideWorldBounds(true);
    }
    if (profile?.destructible) this.physics.add.collider(this.player, sprite);
    const actor: VrActor = {
      id,
      sprite,
      type,
      hp,
      disabled: false,
      direction: id.length % 2 === 0 ? 1 : -1,
      patrolMin,
      patrolMax,
      lastDamageAt: 0,
      targetFamily,
      moving: profile?.moving,
      explosive: profile?.explosive,
      flying: profile?.flying,
      destructible: profile?.destructible,
      baseY: y
    };
    this.actors.push(actor);
    this.playActorAnimation(sprite, 'idle');
    this.physics.add.overlap(this.bullets, sprite, (projectile) => {
      this.handleProjectileTargetHit(actor, projectile);
    });
  }

  private resolveTargetTexture(targetFamily: Mgs1VrTargetFamily): string | undefined {
    const textureKey = MGS1_VR_TARGET_TEXTURES[targetFamily];
    return this.textures.exists(textureKey) ? textureKey : undefined;
  }

  private spawnCameraProbe(id: string, x: number, y: number, sweepOffset: number): void {
    const cameraTexture = this.textures.exists('mgs1VrEnvHazardGunCamera')
      ? 'mgs1VrEnvHazardGunCamera'
      : this.textures.exists('mgs1VrEnvPropCameraNode')
        ? 'mgs1VrEnvPropCameraNode'
        : 'cameraNode';
    const sprite = this.physics.add.staticSprite(x, y, cameraTexture);
    const probe: VrCameraProbe = { id, sprite, disabled: false, sweepOffset };
    this.cameraProbes.push(probe);
    this.physics.add.overlap(this.bullets, sprite, (projectileObject) => {
      const projectile = projectileObject as Phaser.Physics.Arcade.Sprite;
      if (!projectile.active) return;
      const kind = (projectile.getData('projectileKind') as VrProjectileKind | undefined) ?? 'bullet';
      const blastRadius = (projectile.getData('blastRadius') as number | undefined) ?? 0;
      if (blastRadius > 0) this.explodeProjectile(projectile);
      else {
        this.playVfx('mgs1VrVfxBulletImpact', projectile.x, projectile.y);
        projectile.destroy();
      }
      this.disableCameraProbe(probe, `${kind.toUpperCase()} hit`);
    });
  }

  private spawnSecret(x: number, y: number): void {
    const hasVrSecretTexture = this.textures.exists('mgs1VrEnvPropSecretNode');
    const secret = this.physics.add.staticSprite(
      x,
      y,
      hasVrSecretTexture ? 'mgs1VrEnvPropSecretNode' : 'secretItem'
    );
    if (hasVrSecretTexture) secret.setScale(0.75).refreshBody();
    this.physics.add.overlap(this.player, secret, () => {
      if (this.secretCollected) return;
      this.secretCollected = true;
      this.stats.secretsFound = 1;
      secret.destroy();
      this.objectives.add('secret');
      this.flashStatus('VR SECRET DATA NODE RECOVERED');
    });
  }

  private handlePlayerInput(): void {
    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const slow = this.inputController.isDown('sprint');
    const speed = slow ? 110 : 210;

    if (left) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (right) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.inputController.justDown('jump') && this.player.body?.blocked.down) {
      this.player.setVelocityY(-455);
    }

    if (this.isCrouched()) {
      this.player.setTint(0x9aff8a);
      this.playActorAnimation(this.player, 'crouch');
    } else {
      if (this.time.now > this.lastDamageAt + 170) this.player.clearTint();
      this.playActorAnimation(this.player, left || right ? 'move' : 'idle');
    }

    if (this.inputController.justDown('fire')) this.fireWeapon();
    if (this.inputController.justDown('cqc')) this.tryCqc();
    if (this.inputController.justDown('chaff')) this.deployChaff();
    if (this.inputController.justDown('ration')) this.useRation();
    if (this.inputController.justDown('confirm')) this.tryCompleteRun();
    if (this.inputController.justDown('cancel')) this.completeRun(false, 'VR run aborted by operator');
  }

  private fireWeapon(): void {
    const weapon = this.missionProfile?.weapon ?? 'socom';
    if (this.missionProfile && !this.missionProfile.weapon) {
      this.flashStatus('UNARMED DRILL // USE CQC');
      return;
    }

    if (weapon === 'c4' && this.plantedC4?.active) {
      if (this.time.now < this.lastShotAt + 180) return;
      this.lastShotAt = this.time.now;
      this.detonateC4();
      return;
    }

    const cooldown: Readonly<Record<Mgs1VrWeaponId, number>> = {
      socom: 180,
      famas: 330,
      psg1: 620,
      grenade: 620,
      c4: 320,
      claymore: 360,
      stinger: 650,
      nikita: 680
    };
    if (this.ammo <= 0 || this.time.now < this.lastShotAt + cooldown[weapon]) {
      if (this.ammo <= 0) this.flashStatus(`${MGS1_VR_WEAPON_LABELS[weapon]} EMPTY`);
      return;
    }
    this.lastShotAt = this.time.now;

    switch (weapon) {
      case 'famas':
        this.fireFamasBurst();
        break;
      case 'psg1':
        this.fireBallisticRound('psg1', 'mgs1VrProjectilePsg1Round', 930, 2);
        break;
      case 'grenade':
        this.throwGrenade();
        break;
      case 'c4':
        this.placeC4();
        break;
      case 'claymore':
        this.placeClaymore();
        break;
      case 'stinger':
        this.fireMissile('stinger');
        break;
      case 'nikita':
        this.fireMissile('nikita');
        break;
      default:
        this.fireBallisticRound('socom', 'mgs1VrProjectileSocomRound', 650, 1);
        break;
    }
  }

  private fireFamasBurst(): void {
    for (let burst = 0; burst < 3; burst += 1) {
      this.time.delayedCall(burst * 75, () => {
        if (this.completed || this.ammo <= 0) return;
        this.fireBallisticRound('famas', 'mgs1VrProjectileFamasTracer', 760, 1);
      });
    }
  }

  private fireBallisticRound(
    kind: 'socom' | 'famas' | 'psg1',
    textureKey: string,
    speed: number,
    damage: number
  ): void {
    if (this.ammo <= 0) return;
    const direction = this.facingDirection();
    this.consumeShot();
    this.playActorAnimation(this.player, 'attack', 180);
    this.playVfx('mgs1VrVfxMuzzleFlash', this.player.x + direction * 25, this.player.y - 7, direction < 0);
    this.spawnProjectile(
      textureKey,
      this.player.x + direction * 23,
      this.player.y - 7,
      direction * speed,
      0,
      { kind, damage, lifetime: 2200 }
    );
  }

  private throwGrenade(): void {
    const direction = this.facingDirection();
    this.consumeShot();
    this.playActorAnimation(this.player, 'attack', 220);
    const grenade = this.spawnProjectile(
      'mgs1VrProjectileGrenade',
      this.player.x + direction * 20,
      this.player.y - 12,
      direction * 330,
      -345,
      { kind: 'grenade', damage: 3, blastRadius: 138, allowGravity: true, lifetime: 1500 }
    );
    if (grenade) this.time.delayedCall(1050, () => grenade.active && this.explodeProjectile(grenade));
  }

  private placeC4(): void {
    const direction = this.facingDirection();
    this.consumeShot();
    this.playActorAnimation(this.player, 'attack', 180);
    const texture = this.textures.exists('mgs1VrProjectileC4Charge') ? 'mgs1VrProjectileC4Charge' : 'bullet';
    const charge = this.physics.add.sprite(this.player.x + direction * 22, this.player.y + 15, texture)
      .setDepth(22)
      .setImmovable(true);
    (charge.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.plantedC4 = charge;
    charge.once('destroy', () => {
      if (this.plantedC4 === charge) this.plantedC4 = undefined;
    });
    this.flashStatus('C4 PLACED // FIRE AGAIN TO DETONATE');
  }

  private detonateC4(): void {
    const charge = this.plantedC4;
    if (!charge?.active) return;
    const { x, y } = charge;
    charge.destroy();
    this.plantedC4 = undefined;
    this.explodeAt(x, y, 155, 4, 'mgs1VrVfxMissileExplosion');
    this.flashStatus('C4 DETONATED');
  }

  private placeClaymore(): void {
    const direction = this.facingDirection();
    this.consumeShot();
    this.playActorAnimation(this.player, 'attack', 180);
    const texture = this.textures.exists('mgs1VrProjectileClaymoreMine') ? 'mgs1VrProjectileClaymoreMine' : 'bullet';
    const mine = this.physics.add.sprite(this.player.x + direction * 28, this.player.y + 18, texture)
      .setDepth(22)
      .setFlipX(direction < 0)
      .setImmovable(true);
    (mine.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    mine.setData('direction', direction);
    mine.setData('armedAt', this.time.now + 300);
    this.claymores.push(mine);
    mine.once('destroy', () => {
      this.claymores = this.claymores.filter((candidate) => candidate !== mine);
    });
    this.flashStatus('CLAYMORE ARMED');
  }

  private fireMissile(kind: 'stinger' | 'nikita'): void {
    if (kind === 'nikita' && this.guidedMissile?.active) {
      this.flashStatus('NIKITA ALREADY IN FLIGHT');
      return;
    }
    const direction = this.facingDirection();
    const lockTarget = kind === 'stinger'
      ? this.actors.find((actor) => !actor.disabled && actor.flying)
      : undefined;
    const launchAngle = lockTarget
      ? Phaser.Math.Angle.Between(this.player.x, this.player.y - 9, lockTarget.sprite.x, lockTarget.sprite.y)
      : direction > 0 ? 0 : Math.PI;
    const launchVelocity = new Phaser.Math.Vector2();
    this.physics.velocityFromRotation(launchAngle, kind === 'stinger' ? 500 : 310, launchVelocity);
    this.consumeShot();
    this.playActorAnimation(this.player, 'attack', 260);
    this.playVfx('mgs1VrVfxMuzzleFlash', this.player.x + direction * 28, this.player.y - 8, direction < 0);
    const missile = this.spawnProjectile(
      kind === 'stinger' ? 'mgs1VrProjectileStingerMissile' : 'mgs1VrProjectileNikitaMissile',
      this.player.x + direction * 27,
      this.player.y - 9,
      launchVelocity.x,
      launchVelocity.y,
      { kind, damage: 4, blastRadius: kind === 'stinger' ? 150 : 128, lifetime: 3600 }
    );
    if (missile) {
      missile.setFlipX(launchVelocity.x < 0);
      missile.setAngle(Phaser.Math.RadToDeg(launchAngle));
      missile.setData('lastTrailAt', 0);
      if (kind === 'stinger') {
        missile.setData('lockTarget', lockTarget?.sprite);
        // VR target lanes place flying UFOs above the catwalks. The locked
        // Stinger must remain on its airborne target instead of colliding
        // with scenery underneath its flight path.
        missile.setData('ignorePlatforms', true);
      }
      if (kind === 'nikita') {
        this.guidedMissile = missile;
        missile.once('destroy', () => {
          if (this.guidedMissile === missile) this.guidedMissile = undefined;
        });
        this.flashStatus('NIKITA GUIDANCE: MOVE + JUMP/CROUCH');
      }
    }
  }

  private spawnProjectile(
    textureKey: string,
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,
    options: VrProjectileOptions
  ): Phaser.Physics.Arcade.Sprite | undefined {
    const resolvedTexture = this.textures.exists(textureKey) ? textureKey : 'bullet';
    const projectile = this.bullets.create(x, y, resolvedTexture) as Phaser.Physics.Arcade.Sprite | null;
    if (!projectile) return undefined;
    projectile.setActive(true).setVisible(true).setDepth(25);
    projectile.setVelocity(velocityX, velocityY);
    (projectile.body as Phaser.Physics.Arcade.Body).setAllowGravity(Boolean(options.allowGravity));
    projectile.setData('projectileKind', options.kind);
    projectile.setData('damage', options.damage);
    projectile.setData('blastRadius', options.blastRadius ?? 0);
    projectile.setData('spawnedAt', this.time.now);
    this.time.delayedCall(options.lifetime ?? 2200, () => {
      if (!projectile.active) return;
      if ((projectile.getData('blastRadius') as number) > 0) this.explodeProjectile(projectile);
      else projectile.destroy();
    });
    return projectile;
  }

  private consumeShot(): void {
    this.ammo = Math.max(0, this.ammo - 1);
    this.stats.shotsFired += 1;
    this.inputController.vibrate(35, 0.12, 0.18);
  }

  private facingDirection(): number {
    return this.player.flipX ? -1 : 1;
  }

  private tryCqc(): void {
    const nearest = this.actors.find((actor) => {
      const validCqcTarget = actor.type === 'guard'
        || actor.type === 'cqc_guard'
        || (actor.type === 'target' && actor.targetFamily === 'KOKESHI-G');
      return !actor.disabled
        && validCqcTarget
        && Math.abs(actor.sprite.x - this.player.x) < 68
        && Math.abs(actor.sprite.y - this.player.y) < 74;
    });
    this.playActorAnimation(this.player, 'melee', 260);
    this.playVfx('mgs1VrVfxNinjaSlash', this.player.x + this.facingDirection() * 34, this.player.y - 5, this.facingDirection() < 0);
    if (!nearest) {
      this.flashStatus('CQC WHIFF');
      return;
    }
    this.disableActor(nearest, 'cqc');
  }

  private deployChaff(): void {
    if (this.chaff <= 0) {
      this.flashStatus('NO CHAFF REMAINING');
      return;
    }
    this.chaff -= 1;
    this.chaffActiveUntil = this.time.now + 3900;
    this.inputController.vibrate(80, 0.18, 0.28);
    this.playVfx('mgs1VrVfxChaffBurst', this.player.x, this.player.y - 12);
    let disabled = 0;
    this.cameraProbes.forEach((probe) => {
      if (!probe.disabled && Math.abs(probe.sprite.x - this.player.x) < 430) {
        this.disableCameraProbe(probe, 'chaff burst');
        disabled += 1;
      }
    });
    this.flashStatus(disabled ? `CHAFF DISRUPTION: ${disabled} CAMERA(S)` : 'CHAFF ACTIVE');
  }

  private useRation(): void {
    if (this.rations <= 0 || this.health >= 100) return;
    this.rations -= 1;
    this.stats.rationsUsed += 1;
    this.health = Math.min(100, this.health + 35);
    this.inputController.vibrate(70, 0.1, 0.2);
    this.flashStatus('RATION USED');
  }

  private handleActors(): void {
    this.actors.forEach((actor) => {
      if (actor.disabled) return;
      const shouldPatrol = actor.patrolMin !== actor.patrolMax && (actor.type !== 'target' || actor.moving);
      if (shouldPatrol) {
        const speed = actor.flying ? 92 : actor.type === 'boss' ? 75 : actor.type === 'target' ? 68 : 55;
        actor.sprite.setVelocityX(actor.direction * speed);
        if (actor.sprite.x <= actor.patrolMin) actor.direction = 1;
        if (actor.sprite.x >= actor.patrolMax) actor.direction = -1;
        actor.sprite.setFlipX(actor.direction < 0);
        this.playActorAnimation(actor.sprite, 'move');
      } else if (actor.type !== 'target') {
        actor.sprite.setVelocityX(0);
        this.playActorAnimation(actor.sprite, 'idle');
      }

      if (actor.flying) {
        const wave = Math.sin(this.time.now / 420 + actor.patrolMin * 0.01);
        actor.sprite.setVelocityY(wave * 52);
      }

      if (actor.type === 'boss' && Math.abs(actor.sprite.x - this.player.x) < 120 && this.time.now > actor.lastDamageAt + 900) {
        actor.lastDamageAt = this.time.now;
        this.playActorAnimation(actor.sprite, 'attack', 330);
        this.damagePlayer(10, 'boss melee');
      } else if ((actor.type === 'guard' || actor.type === 'cqc_guard') && Math.abs(actor.sprite.x - this.player.x) < 145) {
        this.playActorAnimation(actor.sprite, 'attack', 210);
      }
    });
  }

  private handlePlacedExplosives(): void {
    this.claymores.forEach((mine) => {
      if (!mine.active || this.time.now < (mine.getData('armedAt') as number)) return;
      const direction = (mine.getData('direction') as number | undefined) ?? 1;
      const target = this.actors.find((actor) => {
        if (actor.disabled || actor.type !== 'target') return false;
        const dx = actor.sprite.x - mine.x;
        return dx * direction > 0 && Math.abs(dx) < 125 && Math.abs(actor.sprite.y - mine.y) < 95;
      });
      if (!target) return;
      const { x, y } = mine;
      mine.destroy();
      this.explodeAt(x + direction * 48, y - 10, 132, 3, 'mgs1VrVfxClaymoreBlast');
      this.flashStatus('CLAYMORE PROXIMITY DETONATION');
    });
  }

  private handleStingerMissiles(): void {
    this.bullets.getChildren().forEach((child) => {
      const missile = child as Phaser.Physics.Arcade.Sprite;
      if (!missile.active || missile.getData('projectileKind') !== 'stinger') return;

      let lockTarget = missile.getData('lockTarget') as Phaser.Physics.Arcade.Sprite | undefined;
      if (!lockTarget?.active) {
        lockTarget = this.actors.find((actor) => !actor.disabled && actor.flying)?.sprite;
        missile.setData('lockTarget', lockTarget);
      }

      if (lockTarget?.active) {
        const lockAngle = Phaser.Math.Angle.Between(missile.x, missile.y, lockTarget.x, lockTarget.y);
        const lockVelocity = new Phaser.Math.Vector2();
        this.physics.velocityFromRotation(lockAngle, 500, lockVelocity);
        missile.setVelocity(lockVelocity.x, lockVelocity.y);
        missile.setFlipX(lockVelocity.x < 0);
        missile.setAngle(Phaser.Math.RadToDeg(lockAngle));
      }

      const lastTrailAt = (missile.getData('lastTrailAt') as number | undefined) ?? 0;
      if (this.time.now > lastTrailAt + 105) {
        missile.setData('lastTrailAt', this.time.now);
        const velocityX = (missile.body as Phaser.Physics.Arcade.Body).velocity.x;
        this.playVfx('mgs1VrVfxMissileTrail', missile.x - Math.sign(velocityX || 1) * 18, missile.y);
      }
    });
  }

  private handleGuidedMissile(): void {
    const missile = this.guidedMissile;
    if (!missile?.active) return;
    const body = missile.body as Phaser.Physics.Arcade.Body;
    let velocityX = body.velocity.x;
    let velocityY = body.velocity.y * 0.82;
    if (this.inputController.isDown('moveLeft')) velocityX = -310;
    else if (this.inputController.isDown('moveRight')) velocityX = 310;
    if (this.inputController.isDown('jump')) velocityY = -245;
    else if (this.inputController.isDown('crouch')) velocityY = 245;
    missile.setVelocity(velocityX, velocityY);
    missile.setAngle(Phaser.Math.RadToDeg(Math.atan2(velocityY, velocityX)));

    const lastTrailAt = (missile.getData('lastTrailAt') as number | undefined) ?? 0;
    if (this.time.now > lastTrailAt + 105) {
      missile.setData('lastTrailAt', this.time.now);
      this.playVfx('mgs1VrVfxMissileTrail', missile.x - Math.sign(velocityX || 1) * 18, missile.y);
    }
  }

  private handleProjectilePlatformImpact(projectileObject: unknown): void {
    const projectile = projectileObject as Phaser.Physics.Arcade.Sprite;
    if (!projectile?.active) return;
    const blastRadius = (projectile.getData('blastRadius') as number | undefined) ?? 0;
    if (blastRadius > 0) {
      this.explodeProjectile(projectile);
      return;
    }
    this.playVfx('mgs1VrVfxBulletImpact', projectile.x, projectile.y);
    projectile.destroy();
  }

  private handleProjectileTargetHit(actor: VrActor, projectileObject: unknown): void {
    const projectile = projectileObject as Phaser.Physics.Arcade.Sprite;
    if (!projectile?.active || actor.disabled) return;
    if (actor.targetFamily === 'KOKESHI-G') {
      this.playVfx('mgs1VrVfxBulletRicochet', projectile.x, projectile.y);
      projectile.destroy();
      this.flashStatus('KOKESHI-G REQUIRES CQC');
      return;
    }

    const blastRadius = (projectile.getData('blastRadius') as number | undefined) ?? 0;
    if (blastRadius > 0) {
      this.explodeProjectile(projectile);
      return;
    }

    const damage = (projectile.getData('damage') as number | undefined) ?? 1;
    this.playVfx('mgs1VrVfxBulletImpact', projectile.x, projectile.y);
    projectile.destroy();
    this.hitActor(actor, damage);
  }

  private explodeProjectile(projectile: Phaser.Physics.Arcade.Sprite): void {
    if (!projectile.active) return;
    const kind = (projectile.getData('projectileKind') as VrProjectileKind | undefined) ?? 'bullet';
    const damage = (projectile.getData('damage') as number | undefined) ?? 2;
    const radius = (projectile.getData('blastRadius') as number | undefined) ?? 120;
    const { x, y } = projectile;
    projectile.destroy();
    const vfx = kind === 'stinger' || kind === 'nikita'
      ? 'mgs1VrVfxMissileExplosion'
      : 'mgs1VrVfxTargetChainExplosion';
    this.explodeAt(x, y, radius, damage, vfx);
  }

  private explodeAt(x: number, y: number, radius: number, damage: number, vfxTexture: string): void {
    this.playVfx(vfxTexture, x, y);
    this.inputController.vibrate(100, 0.42, 0.35);
    this.actors.forEach((actor) => {
      if (actor.disabled) return;
      if (Phaser.Math.Distance.Between(x, y, actor.sprite.x, actor.sprite.y) <= radius) {
        this.hitActor(actor, damage);
      }
    });
    if (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) <= radius * 0.68) {
      this.damagePlayer(12, 'explosive blast');
    }
  }

  private handleCameras(): void {
    this.scanGraphics.clear();
    this.cameraProbes.forEach((probe) => {
      if (probe.disabled) {
        probe.sprite.setTint(0x456b49);
        return;
      }
      const chaff = this.isChaffActive();
      const direction = Math.sin(this.time.now / 720 + probe.sweepOffset) >= 0 ? 1 : -1;
      const originX = probe.sprite.x;
      const originY = probe.sprite.y + 8;
      this.scanGraphics.fillStyle(chaff ? 0x88a8ff : 0xff6b6b, chaff ? 0.06 : 0.17);
      this.scanGraphics.beginPath();
      this.scanGraphics.moveTo(originX, originY);
      this.scanGraphics.lineTo(originX + direction * 280, originY + 225);
      this.scanGraphics.lineTo(originX + direction * 48, originY + 225);
      this.scanGraphics.closePath();
      this.scanGraphics.fillPath();
      probe.sprite.setTint(chaff ? 0x88a8ff : 0xffffff);
    });
  }

  private handleDetection(): void {
    const crouched = this.isCrouched();
    const chaff = this.isChaffActive();
    const nearGuard = this.actors.find((actor) => !actor.disabled && actor.type !== 'target' && actor.type !== 'boss' && Math.abs(actor.sprite.x - this.player.x) < 175 && Math.abs(actor.sprite.y - this.player.y) < 80);

    if (nearGuard && !crouched && this.time.now > this.lastAlertAt + 1600) {
      this.registerAlert('guard sightline');
    }

    this.cameraProbes.forEach((probe) => {
      if (probe.disabled || chaff) return;
      if (this.isPlayerInCameraCone(probe) && this.time.now > this.lastAlertAt + 1600) this.registerAlert('camera cone');
    });

    if (this.mission.category === 'boss_challenge' && this.actors.some((actor) => actor.type === 'boss' && !actor.disabled) && this.time.now > this.lastDamageAt + 1700) {
      this.damagePlayer(3, 'boss pressure');
    }
  }

  private isPlayerInCameraCone(probe: VrCameraProbe): boolean {
    const direction = Math.sin(this.time.now / 720 + probe.sweepOffset) >= 0 ? 1 : -1;
    const dx = this.player.x - probe.sprite.x;
    const dy = this.player.y - probe.sprite.y;
    const playerInFront = direction > 0 ? dx > 0 : dx < 0;
    return playerInFront && Math.abs(dx) < 300 && dy > 20 && dy < 235 && Math.abs(dx) < 70 + dy * 1.3;
  }

  private checkRouteMilestones(): void {
    const thresholds = [420, 820, 1220, 1600];
    thresholds.forEach((x, index) => {
      if (this.player.x > x) this.objectives.add(`route_${index + 1}`);
    });
    this.stats.objectivesCompleted = this.objectives.size;
  }

  private hitActor(actor: VrActor, damage = 1): void {
    if (actor.disabled) return;
    this.stats.hits += 1;
    actor.hp -= damage;
    actor.sprite.setTint(0xffdf85);
    this.playActorAnimation(actor.sprite, 'hit', 150);

    if (actor.hp > 0) {
      this.flashStatus(`${actor.id.toUpperCase()} HIT`);
      return;
    }

    this.disableActor(actor, 'projectile');
  }

  private disableActor(actor: VrActor, source: 'projectile' | 'cqc' | 'chain'): void {
    if (actor.disabled) return;
    actor.disabled = true;
    // Explosive overlap callbacks can arrive after an Arcade body was already
    // disabled by a chained target reaction. Keep the visual teardown valid
    // without dereferencing a body that no longer exists.
    if (actor.sprite.body) actor.sprite.setVelocity(0, 0);
    actor.sprite.setTint(source === 'cqc' || actor.type === 'boss' ? 0x456b49 : 0xff6b6b);
    this.playActorAnimation(actor.sprite, 'death', 700);
    this.objectives.add(actor.id);

    if (actor.type === 'boss') {
      this.stats.bossDefeated = true;
      this.objectives.add('boss_defeated');
      this.playVfx('mgs1VrVfxTargetChainExplosion', actor.sprite.x, actor.sprite.y);
      this.flashStatus('VR BOSS DEFEATED');
      return;
    }

    if (source === 'cqc') {
      this.stats.neutralizations += 1;
      this.flashStatus('NON-LETHAL NEUTRALIZATION');
    } else if (actor.type === 'guard' || actor.type === 'cqc_guard') {
      this.stats.kills += 1;
      this.registerAlert('lethal takedown');
    }

    if (actor.type === 'target') {
      if (actor.destructible) {
        actor.sprite.disableBody(false, false);
        this.playVfx('mgs1VrVfxWallCrumble', actor.sprite.x, actor.sprite.y);
      }
      else if (actor.explosive) this.triggerTargetExplosion(actor);
      else this.playVfx('mgs1VrVfxTargetShatterBlue', actor.sprite.x, actor.sprite.y);

      if (this.areRequiredTargetsCleared()) {
        this.materializeGoal();
        return;
      }
    }

    if (source !== 'cqc') this.flashStatus('TARGET DISABLED');
  }

  private triggerTargetExplosion(actor: VrActor): void {
    const vfx = actor.targetFamily === 'UFO' ? 'mgs1VrVfxUfoExplosion' : 'mgs1VrVfxTargetChainExplosion';
    this.playVfx(vfx, actor.sprite.x, actor.sprite.y);
    const chainTargets = this.actors.filter((candidate) => !candidate.disabled
      && candidate.type === 'target'
      && candidate.explosive
      && Phaser.Math.Distance.Between(
        actor.sprite.x,
        actor.sprite.y,
        candidate.sprite.x,
        candidate.sprite.y
      ) < 165);
    chainTargets.forEach((candidate, index) => {
      this.time.delayedCall(70 + index * 45, () => this.hitActor(candidate, 99));
    });
    if (Phaser.Math.Distance.Between(actor.sprite.x, actor.sprite.y, this.player.x, this.player.y) < 110) {
      this.damagePlayer(10, `${actor.targetFamily ?? 'target'} chain reaction`);
    }
  }

  private areRequiredTargetsCleared(): boolean {
    return (Boolean(this.missionProfile) || this.mission.category === 'weapon_training')
      && this.actors.some((candidate) => candidate.type === 'target')
      && this.actors.filter((candidate) => candidate.type === 'target').every((candidate) => candidate.disabled);
  }

  private materializeGoal(): void {
    if (this.goalMaterialized) return;
    this.goalMaterialized = true;
    this.exitPad.enableBody(false, 1810, 468, true, true);
    this.playVfx('mgs1VrVfxGoalMaterialize', 1810, 448);
    const family = this.missionProfile?.targetFamily ?? 'CUBE-B';
    this.flashStatus(`ALL ${family} TARGETS DOWN // GOAL MATERIALIZED`);
  }

  private disableCameraProbe(probe: VrCameraProbe, source: string): void {
    if (probe.disabled) return;
    probe.disabled = true;
    probe.sprite.setTint(0x456b49);
    this.stats.camerasDisabled += 1;
    this.objectives.add(probe.id);
    if (source.includes('SOCOM')) this.stats.hits += 1;
  }

  private registerAlert(source: string): void {
    this.lastAlertAt = this.time.now;
    this.stats.alerts += 1;
    this.damagePlayer(5, source);
    this.flashStatus(`ALERT: ${source.toUpperCase()}`);
  }

  private damagePlayer(amount: number, source: string): void {
    if (this.time.now < this.lastDamageAt + 520) return;
    this.lastDamageAt = this.time.now;
    this.health = Math.max(0, this.health - amount);
    this.inputController.vibrate(130, 0.62, 0.45);
    this.stats.damageTaken += amount;
    this.player.setTint(0xff6b6b);
    this.playActorAnimation(this.player, 'hit', 180);
    this.time.delayedCall(140, () => this.player.active && !this.isCrouched() && this.player.clearTint());
    if (this.health <= 0) this.completeRun(false, `Operator down: ${source}`);
  }

  private tryCompleteRun(): void {
    if (this.completed) return;
    if ((this.missionProfile || this.mission.category === 'weapon_training') && !this.areRequiredTargetsCleared()) {
      const family = this.missionProfile?.targetFamily ?? 'CUBE-B';
      const action = family === 'KOKESHI-G' ? 'NEUTRALIZE' : 'DESTROY';
      this.flashStatus(`${action} ALL ${family} TARGETS TO MATERIALIZE GOAL`);
      return;
    }
    if (this.mission.requirements.bossDefeated && !this.stats.bossDefeated) {
      this.flashStatus('BOSS DEFEAT REQUIRED BEFORE EXIT');
      return;
    }
    this.completeRun(true, 'VR exit marker reached');
  }

  private completeRun(playableClear: boolean, message: string): void {
    if (this.completed) return;
    this.completed = true;
    this.syncTime();
    this.stats.objectivesCompleted = this.objectives.size;
    this.player.setVelocity(0, 0);
    this.emitHud(playableClear ? 'clear' : 'failed', message);
    emitGameEvent<VrRunGamePayload>(GAME_EVENT.VR_RUN_COMPLETE, {
      missionId: this.mission.id,
      missionTitle: this.mission.title,
      stats: { ...this.stats },
      status: playableClear ? 'clear' : 'failed',
      message
    });
    this.add.text(this.player.x - 120, 210, playableClear ? 'VR RUN COMPLETE' : 'VR RUN FAILED', {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: playableClear ? '#7cff6b' : '#ff6b6b'
    }).setDepth(90);
  }

  private syncTime(): void {
    this.stats.timeSeconds = Math.max(1, Math.round((this.time.now - this.startTime) / 1000));
  }

  private updateHudText(): void {
    const chaffLabel = this.isChaffActive() ? 'ACTIVE' : 'READY';
    const weaponLabel = this.missionProfile
      ? this.missionProfile.weapon
        ? MGS1_VR_WEAPON_LABELS[this.missionProfile.weapon]
        : 'CQC'
      : 'SOCOM';
    const ammoLabel = this.missionProfile && !this.missionProfile.weapon ? 'UNARMED' : `${weaponLabel} ${this.ammo}`;
    this.statusText.setText(`MISSION: ${this.mission.title} // CATEGORY: ${this.mission.category.toUpperCase()} // TIME ${this.stats.timeSeconds}s`);
    this.objectiveText.setText(`OBJECTIVE: ${this.mission.objective}`);
    this.hudText.setText(`HP ${this.health}/100 | ${ammoLabel} | RATION ${this.rations} | CHAFF ${this.chaff} ${chaffLabel} | ALERTS ${this.stats.alerts} | OBJ ${this.stats.objectivesCompleted} | ENTER EXIT/EVAL`);
  }

  private buildRequirementSummary(): string {
    const req = this.mission.requirements;
    const rows: string[] = [];
    if (req.targetTimeSeconds !== undefined) rows.push(`TIME <= ${req.targetTimeSeconds}s`);
    if (req.maxAlerts !== undefined) rows.push(`ALERTS <= ${req.maxAlerts}`);
    if (req.maxKills !== undefined) rows.push(`KILLS <= ${req.maxKills}`);
    if (req.minNeutralizations !== undefined) rows.push(`CQC >= ${req.minNeutralizations}`);
    if (req.minShotsFired !== undefined) rows.push(`SHOTS >= ${req.minShotsFired}`);
    if (req.maxShotsFired !== undefined) rows.push(`SHOTS <= ${req.maxShotsFired}`);
    if (req.minCamerasDisabled !== undefined) rows.push(`CAMERAS >= ${req.minCamerasDisabled}`);
    if (req.minObjectivesCompleted !== undefined) rows.push(`OBJECTIVES >= ${req.minObjectivesCompleted}`);
    if (req.bossDefeated) rows.push('BOSS REQUIRED');
    if (req.requiredTool) rows.push(`TOOL: ${req.requiredTool.toUpperCase()}`);
    return rows.join('\n');
  }

  private emitHud(status: VrRunGamePayload['status'], message: string): void {
    this.lastHudEmitAt = this.time.now;
    emitGameEvent<VrRunGamePayload>(GAME_EVENT.VR_HUD_UPDATE, {
      missionId: this.mission.id,
      missionTitle: this.mission.title,
      stats: { ...this.stats },
      status,
      message
    });
  }

  private flashStatus(message: string): void {
    this.objectiveText.setText(`INFO: ${message}`);
    this.time.delayedCall(950, () => {
      if (this.objectiveText.active && !this.completed) this.objectiveText.setText(`OBJECTIVE: ${this.mission.objective}`);
    });
  }

  private isCrouched(): boolean {
    return this.inputController.isDown('crouch');
  }

  private isChaffActive(): boolean {
    return this.time.now < this.chaffActiveUntil;
  }

  private destroyObject(object: unknown): void {
    if (object && typeof (object as { destroy?: unknown }).destroy === 'function') {
      (object as Phaser.GameObjects.GameObject).destroy();
    }
  }
}
