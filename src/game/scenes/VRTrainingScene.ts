import Phaser from 'phaser';
import vrMissionsJson from '../../data/vrMissions.json';
import type { VrMissionDefinition, VrRunStats } from '../../types/vr.types';
import { emitGameEvent, GAME_EVENT, type VrRunGamePayload } from '../core/GameEvents';

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
}

interface VrCameraProbe {
  id: string;
  sprite: Phaser.Physics.Arcade.Sprite;
  disabled: boolean;
  sweepOffset: number;
}

const vrMissions = vrMissionsJson as VrMissionDefinition[];

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

  constructor() {
    super('VRTrainingScene');
  }

  create(): void {
    this.mission = getActiveVrMission();
    this.stats = createEmptyStats();
    this.health = 100;
    this.ammo = this.mission.category === 'weapon_training' ? 40 : 28;
    this.rations = this.mission.category === 'boss_challenge' ? 1 : 0;
    this.chaff = this.mission.category === 'surveillance' ? 4 : 1;
    this.chaffActiveUntil = 0;
    this.completed = false;
    this.objectives = new Set<string>();
    this.secretCollected = false;
    this.actors = [];
    this.cameraProbes = [];
    this.startTime = this.time.now;

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

    const playerTexture = this.textures.exists('vrPlayer') ? 'vrPlayer' : 'player';
    this.player = this.physics.add.sprite(85, 450, playerTexture);
    this.player.setCollideWorldBounds(true);
    this.player.setDragX(1300);
    this.player.setMaxVelocity(250, 560);
    this.physics.add.collider(this.player, this.platforms);

    this.bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 44 });
    this.physics.add.collider(this.bullets, this.platforms, (bullet) => this.destroyObject(bullet));

    this.exitPad = this.physics.add.staticSprite(1810, 468, 'elevator');
    this.exitPad.setTint(0x66ffcc);
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
    this.handleCameras();
    this.handleDetection();
    this.checkRouteMilestones();
    this.updateHudText();
    if (this.time.now > this.lastHudEmitAt + 180) this.emitHud('running', 'VR run active');
  }

  private addArenaBackdrop(): void {
    this.add.rectangle(950, 270, 1900, 540, 0x030b08).setDepth(-20);
    this.add.rectangle(950, 518, 1900, 44, 0x082214).setDepth(-12);
    for (let x = 80; x < 1900; x += 140) {
      this.add.line(x, 0, 0, 0, 0, 540, 0x2dff8a, 0.08).setDepth(-15);
    }
    for (let y = 80; y < 520; y += 80) {
      this.add.line(0, y, 0, 0, 1900, 0, 0x2dff8a, 0.05).setDepth(-15);
    }
    this.add.text(24, 22, 'VR PHASER BRIDGE // PLAYABLE TRAINING SCENE', {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#7cff6b'
    }).setScrollFactor(0).setDepth(60);
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
  }

  private addPlatform(x: number, y: number, scaleX: number): void {
    const platform = this.platforms.create(x, y, 'platform') as Phaser.Physics.Arcade.Sprite;
    platform.setScale(scaleX, 1).refreshBody();
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
        this.spawnActor('target_04', 1240, 374, 'target', 2, 1240, 1240);
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

    this.requirementText.setText(this.buildRequirementSummary());
  }

  private addRouteMarkers(count: number): void {
    const spacing = 1500 / Math.max(1, count);
    for (let index = 1; index <= count; index += 1) {
      const x = 180 + spacing * index;
      const marker = this.add.rectangle(x, 478, 28, 56, 0x7cff6b, 0.16);
      marker.setStrokeStyle(1, 0x7cff6b, 0.45);
      marker.setData('objectiveId', `route_${index}`);
    }
  }

  private spawnActor(id: string, x: number, y: number, type: VrActorType, hp: number, patrolMin: number, patrolMax: number): void {
    const preferredTexture = type === 'boss' ? 'vrBoss' : type === 'target' ? 'vrTarget' : 'vrGuard';
    const legacyTexture = type === 'boss' ? 'bossCaptain' : type === 'target' ? 'reinforcementGuard' : 'guard';
    const texture = this.textures.exists(preferredTexture) ? preferredTexture : legacyTexture;
    const sprite = this.physics.add.sprite(x, y, texture);
    sprite.setCollideWorldBounds(true);
    sprite.setFlipX(true);
    this.physics.add.collider(sprite, this.platforms);
    if (type === 'target') sprite.setTint(0x9fd4ff);
    if (type === 'cqc_guard') sprite.setTint(0xf8f49a);
    if (type === 'boss') sprite.setTint(0xff6b6b).setScale(1.15);
    const actor: VrActor = { id, sprite, type, hp, disabled: false, direction: -1, patrolMin, patrolMax, lastDamageAt: 0 };
    this.actors.push(actor);
    this.physics.add.overlap(this.bullets, sprite, (bullet) => {
      this.destroyObject(bullet);
      this.hitActor(actor);
    });
  }

  private spawnCameraProbe(id: string, x: number, y: number, sweepOffset: number): void {
    const sprite = this.physics.add.staticSprite(x, y, 'cameraNode');
    const probe: VrCameraProbe = { id, sprite, disabled: false, sweepOffset };
    this.cameraProbes.push(probe);
    this.physics.add.overlap(this.bullets, sprite, (bullet) => {
      this.destroyObject(bullet);
      this.disableCameraProbe(probe, 'SOCOM hit');
    });
  }

  private spawnSecret(x: number, y: number): void {
    const secret = this.physics.add.staticSprite(x, y, 'secretItem');
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

    if (this.isCrouched()) this.player.setTint(0x9aff8a);
    else if (this.time.now > this.lastDamageAt + 170) this.player.clearTint();

    if (this.inputController.justDown('fire')) this.fireWeapon();
    if (this.inputController.justDown('cqc')) this.tryCqc();
    if (this.inputController.justDown('chaff')) this.deployChaff();
    if (this.inputController.justDown('ration')) this.useRation();
    if (this.inputController.justDown('confirm')) this.tryCompleteRun();
    if (this.inputController.justDown('cancel')) this.completeRun(false, 'VR run aborted by operator');
  }

  private fireWeapon(): void {
    if (this.ammo <= 0 || this.time.now < this.lastShotAt + 180) return;
    this.lastShotAt = this.time.now;
    this.ammo -= 1;
    this.stats.shotsFired += 1;
    this.inputController.vibrate(35, 0.12, 0.18);
    const bullet = this.bullets.get(this.player.x + 18, this.player.y - 6) as Phaser.Physics.Arcade.Sprite | null;
    if (!bullet) return;
    bullet.setActive(true).setVisible(true);
    bullet.body?.reset(this.player.x + 18, this.player.y - 6);
    bullet.setVelocityX(610);
    bullet.setDepth(25);
    bullet.setData('spawnedAt', this.time.now);
  }

  private tryCqc(): void {
    const nearest = this.actors.find((actor) => !actor.disabled && actor.type !== 'target' && actor.type !== 'boss' && Math.abs(actor.sprite.x - this.player.x) < 58 && Math.abs(actor.sprite.y - this.player.y) < 70);
    if (!nearest) {
      this.flashStatus('CQC WHIFF');
      return;
    }
    nearest.disabled = true;
    nearest.sprite.setTint(0x456b49).setVelocity(0, 0);
    this.stats.neutralizations += 1;
    this.objectives.add(nearest.id);
    this.flashStatus('NON-LETHAL NEUTRALIZATION');
  }

  private deployChaff(): void {
    if (this.chaff <= 0) {
      this.flashStatus('NO CHAFF REMAINING');
      return;
    }
    this.chaff -= 1;
    this.chaffActiveUntil = this.time.now + 3900;
    this.inputController.vibrate(80, 0.18, 0.28);
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
      if (actor.type === 'target') return;
      if (actor.patrolMin !== actor.patrolMax) {
        actor.sprite.setVelocityX(actor.direction * (actor.type === 'boss' ? 75 : 55));
        if (actor.sprite.x <= actor.patrolMin) actor.direction = 1;
        if (actor.sprite.x >= actor.patrolMax) actor.direction = -1;
        actor.sprite.setFlipX(actor.direction < 0);
      }
      if (actor.type === 'boss' && Math.abs(actor.sprite.x - this.player.x) < 120 && this.time.now > actor.lastDamageAt + 900) {
        actor.lastDamageAt = this.time.now;
        this.damagePlayer(10, 'boss melee');
      }
    });
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

  private hitActor(actor: VrActor): void {
    if (actor.disabled) return;
    this.stats.hits += 1;
    actor.hp -= 1;
    actor.sprite.setTint(0xffdf85);

    if (actor.hp > 0) {
      this.flashStatus(`${actor.id.toUpperCase()} HIT`);
      return;
    }

    actor.disabled = true;
    actor.sprite.setVelocity(0, 0);
    actor.sprite.setTint(actor.type === 'boss' ? 0x456b49 : 0xff6b6b);
    this.objectives.add(actor.id);

    if (actor.type === 'boss') {
      this.stats.bossDefeated = true;
      this.objectives.add('boss_defeated');
      this.flashStatus('VR BOSS DEFEATED');
      return;
    }

    if (actor.type === 'guard' || actor.type === 'cqc_guard') {
      this.stats.kills += 1;
      this.registerAlert('lethal takedown');
    }

    this.flashStatus('TARGET DISABLED');
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
    this.time.delayedCall(140, () => this.player.active && !this.isCrouched() && this.player.clearTint());
    if (this.health <= 0) this.completeRun(false, `Operator down: ${source}`);
  }

  private tryCompleteRun(): void {
    if (this.completed) return;
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
    this.statusText.setText(`MISSION: ${this.mission.title} // CATEGORY: ${this.mission.category.toUpperCase()} // TIME ${this.stats.timeSeconds}s`);
    this.objectiveText.setText(`OBJECTIVE: ${this.mission.objective}`);
    this.hudText.setText(`HP ${this.health}/100 | SOCOM ${this.ammo} | RATION ${this.rations} | CHAFF ${this.chaff} ${chaffLabel} | ALERTS ${this.stats.alerts} | OBJ ${this.stats.objectivesCompleted} | ENTER EXIT/EVAL`);
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
