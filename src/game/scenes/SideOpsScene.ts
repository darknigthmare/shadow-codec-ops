import Phaser from 'phaser';
import {
  emitGameEvent,
  onGameEvent,
  GAME_EVENT,
  type AlertEventPayload,
  type CodecRequestPayload,
  type MissionCompletePayload,
  type MissionHudPayload
} from '../core/GameEvents';
import { calculateSideOpsRank } from '../systems/rankSystem';

type KeyMap = Record<
  'W' | 'A' | 'S' | 'D' | 'SPACE' | 'C' | 'J' | 'F' | 'R' | 'SHIFT',
  Phaser.Input.Keyboard.Key
>;

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
  hp: number;
  maxHp: number;
  active: boolean;
  defeated: boolean;
  phase: 1 | 2;
  direction: number;
  lastShotAt: number;
  lastChargeAt: number;
}

export class SideOpsScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cameraNode!: Phaser.Physics.Arcade.Sprite;
  private lockedDoor!: Phaser.Physics.Arcade.Sprite;
  private elevator!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private bullets!: Phaser.Physics.Arcade.Group;
  private enemyBullets!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: KeyMap;
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
  private readonly totalSecrets = 3;

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
    this.resetMissionState();
    this.missionStartTime = this.time.now;
    this.physics.world.setBounds(0, 0, 3800, 540);
    this.cameras.main.setBounds(0, 0, 3800, 540);

    this.addSkyAndBackdrops();

    this.platforms = this.physics.add.staticGroup();
    this.createPlatform(this.platforms, 480, 520, 16);
    this.createPlatform(this.platforms, 1120, 520, 16);
    this.createPlatform(this.platforms, 1760, 520, 16);
    this.createPlatform(this.platforms, 2410, 520, 16);
    this.createPlatform(this.platforms, 3150, 520, 22);
    this.createPlatform(this.platforms, 520, 410, 3);
    this.createPlatform(this.platforms, 960, 330, 4);
    this.createPlatform(this.platforms, 1320, 430, 3);
    this.createPlatform(this.platforms, 1940, 360, 4);
    this.createPlatform(this.platforms, 2320, 315, 3);
    this.createPlatform(this.platforms, 3050, 385, 4);
    this.createPlatform(this.platforms, 3390, 305, 3);

    this.addCrate(360, 480, this.platforms);
    this.addCrate(1380, 390, this.platforms);
    this.addCrate(1810, 480, this.platforms);
    this.addCrate(2055, 320, this.platforms);
    this.addCrate(2550, 480, this.platforms);
    this.addCrate(2750, 480, this.platforms);
    this.addCrate(3220, 480, this.platforms);

    this.player = this.physics.add.sprite(90, 454, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDragX(1250);
    this.player.setMaxVelocity(270, 540);
    this.physics.add.collider(this.player, this.platforms);

    this.lockedDoor = this.physics.add.staticSprite(1510, 462, 'door');
    this.physics.add.collider(
      this.player,
      this.lockedDoor,
      undefined,
      () => !this.hasKeycard,
      this
    );

    this.cameraNode = this.physics.add.staticSprite(1210, 235, 'cameraNode');

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

    this.spawnGuard({ x: 700, y: 454, patrolMin: 540, patrolMax: 805, role: 'patrol' });
    this.spawnGuard({ x: 1690, y: 454, patrolMin: 1580, patrolMax: 1880, role: 'patrol' });
    this.spawnGuard({ x: 2200, y: 454, patrolMin: 2080, patrolMax: 2400, role: 'patrol' });

    this.createPickups(this.platforms);
    this.createBoss();

    this.elevator = this.physics.add.staticSprite(3630, 470, 'elevator');
    this.physics.add.overlap(this.player, this.elevator, () => this.completeMission());

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE,C,J,F,R,SHIFT') as KeyMap;

    this.cameraScanGraphics = this.add.graphics();
    this.searchlightGraphics = this.add.graphics();
    this.bossBarrierGraphics = this.add.graphics();

    this.addFixedHud();
    this.offCodecResume = onGameEvent(GAME_EVENT.CODEC_RESUME, () => this.scene.resume());
    this.offMissionRestart = onGameEvent(GAME_EVENT.MISSION_RESTART, () => this.scene.restart());
    this.events.once('shutdown', () => {
      this.offCodecResume?.();
      this.offMissionRestart?.();
    });

    this.emitCodec('mission_start', 'campbell_mgs1', 'mgs1_campbell_mission_start', 'Mission briefing ready.', true);
    this.emitHudUpdate();
  }

  update(): void {
    if (this.missionCompleted) return;
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
    this.maxAmmo = 30;
    this.ammo = 26;
    this.rations = 1;
    this.chaff = 1;
    this.chaffActiveUntil = 0;
    this.hasKeycard = false;
    this.cameraDisabled = false;
    this.missionCompleted = false;
    this.objectiveStage = 'recover_keycard';
    this.completedObjectives = new Set(['enter_dock']);
    this.secretsFound = new Set();
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
    this.add.rectangle(1900, 270, 3800, 540, 0x041007).setDepth(-20);
    this.add.rectangle(1900, 515, 3800, 52, 0x06120a).setDepth(-12);
    for (let x = 120; x < 3800; x += 190) {
      this.add.rectangle(x, 486, 80, 44, 0x081c0e).setDepth(-5);
    }
    for (let x = 250; x < 3740; x += 420) {
      this.add.rectangle(x, 300, 34, 380, 0x07190d).setDepth(-10);
      this.add.rectangle(x, 110, 120, 14, 0x0d2a14).setDepth(-9);
    }
    for (let x = 1680; x < 3500; x += 320) {
      this.add.rectangle(x, 455, 120, 68, 0x0b2011).setDepth(-4);
      this.add.rectangle(x, 418, 132, 10, 0x174820).setDepth(-3);
    }
    this.add.text(28, 24, 'MISSION 001 // DOCK INFILTRATION // COMPLETE PROTOTYPE', {
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

    this.objectiveText = this.add.text(28, 80, 'OBJECTIVE: Recover Keycard Lv.1', {
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
    platform.setScale(scaleX, 1).refreshBody();
  }

  private addCrate(x: number, y: number, platforms: Phaser.Physics.Arcade.StaticGroup): void {
    const crate = platforms.create(x, y, 'crate') as Phaser.Physics.Arcade.Sprite;
    crate.refreshBody();
  }

  private spawnGuard(config: { x: number; y: number; patrolMin: number; patrolMax: number; role: GuardRole }): GuardUnit {
    const key = config.role === 'reinforcement' ? 'reinforcementGuard' : 'guard';
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
      hp: config.role === 'reinforcement' ? 2 : 1,
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
    const sprite = this.physics.add.sprite(2990, 456, 'bossCaptain');
    sprite.setDragX(850);
    sprite.setMaxVelocity(170, 500);
    sprite.setTint(0x7a8f62);
    this.physics.add.collider(sprite, this.platforms);
    this.physics.add.overlap(this.player, sprite, () => this.damagePlayer(this.boss?.phase === 2 ? 16 : 11, 'armored captain'), undefined, this);
    this.physics.add.overlap(this.bullets, sprite, (bullet) => {
      this.destroyPhysicsObject(bullet);
      this.hitBoss('SOCOM');
    }, undefined, this);

    this.boss = {
      sprite,
      hp: 10,
      maxHp: 10,
      active: false,
      defeated: false,
      phase: 1,
      direction: -1,
      lastShotAt: 0,
      lastChargeAt: 0
    };
  }

  private createPickups(platforms: Phaser.Physics.Arcade.StaticGroup): void {
    const keycard = this.physics.add.sprite(1000, 290, 'keycard');
    keycard.setImmovable(true);
    this.physics.add.collider(keycard, platforms);
    this.physics.add.overlap(this.player, keycard, () => {
      if (this.hasKeycard) return;
      this.hasKeycard = true;
      this.completedObjectives.add('recover_keycard');
      keycard.destroy();
      this.objectiveText.setText('OBJECTIVE: Open the Lv.1 security door');
      this.emitCodec('keycard_found', 'campbell_mgs1', 'mgs1_campbell_keycard_found', 'Keycard Lv.1 recovered. Codec hint available.', false);
    });

    this.createPickup(430, 380, 'ration', () => {
      this.rations += 1;
      this.flashStatus('RATION ACQUIRED');
    }, platforms);

    this.createPickup(1320, 390, 'chaffPickup', () => {
      this.chaff += 1;
      this.flashStatus('CHAFF GRENADE ACQUIRED');
    }, platforms);

    this.createPickup(2050, 320, 'ammoBox', () => {
      this.ammo = Math.min(this.maxAmmo, this.ammo + 10);
      this.flashStatus('SOCOM AMMO ACQUIRED');
    }, platforms);

    this.createSecret(560, 374, 'dog_tag_secret', 'DOG TAG CACHE');
    this.createSecret(2320, 275, 'mo_disc_secret', 'OPTICAL DISC');
    this.createSecret(3405, 265, 'cassette_secret', 'CODEC TAPE');
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
        this.emitCodec('secret_frequency', 'otacon_mgs1', 'mgs1_otacon_secret_found', 'Hidden signal archive recovered.', false);
      }
    });
  }

  private handlePlayerInput(): void {
    if (this.health <= 0) {
      this.player.setVelocityX(0);
      return;
    }

    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const down = this.cursors.down.isDown || this.keys.S.isDown;
    const slowWalk = this.keys.SHIFT.isDown;
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keys.W);
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

    if (Phaser.Input.Keyboard.JustDown(this.keys.J)) this.shootSocom();
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) this.tryCqc();
    if (Phaser.Input.Keyboard.JustDown(this.keys.F)) this.useChaff();
    if (Phaser.Input.Keyboard.JustDown(this.keys.R)) this.useRation();
    if (Phaser.Input.Keyboard.JustDown(this.keys.C)) {
      const conversationId = this.objectiveStage === 'defeat_captain' ? 'mgs1_campbell_boss_intro' : 'mgs1_campbell_default';
      this.emitCodec('manual_call', 'campbell_mgs1', conversationId, 'Manual Codec request from Side Ops.', false);
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
    this.flashStatus('CHAFF ACTIVE: ELECTRONICS DISRUPTED');
    this.emitCodec('manual_call', 'otacon_mgs1', 'mgs1_otacon_chaff_hint', 'Chaff deployed. Camera and searchlight signals disrupted.', false);
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

      guard.sprite.setFlipX(guard.direction > 0);
    });
  }

  private handleBoss(): void {
    if (!this.boss || this.boss.defeated || this.health <= 0) return;

    if (!this.boss.active && this.player.x > 2580) {
      this.activateBoss();
    }

    if (!this.boss.active) return;

    const boss = this.boss;
    const distanceX = Math.abs(this.player.x - boss.sprite.x);
    boss.direction = this.player.x < boss.sprite.x ? -1 : 1;
    boss.sprite.setFlipX(boss.direction > 0);
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
    this.boss.sprite.setTint(0xffdf85);
    this.completedObjectives.add('reach_boss_arena');
    this.objectiveStage = 'defeat_captain';
    this.triggerAlert('armored captain encounter');
    if (!this.bossIntroEmitted) {
      this.bossIntroEmitted = true;
      this.emitCodec('boss_intro', 'campbell_mgs1', 'mgs1_campbell_boss_intro', 'Armored Guard Captain encountered.', true);
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
    this.time.delayedCall(120, () => boss.sprite.active && !boss.defeated && boss.sprite.setTint(boss.phase === 2 ? 0xff6b6b : 0xffdf85));
    this.flashStatus(`CAPTAIN ARMOR HIT: ${boss.hp}/${boss.maxHp}`);

    if (boss.hp <= Math.floor(boss.maxHp / 2) && boss.phase === 1) {
      boss.phase = 2;
      boss.sprite.setTint(0xff6b6b);
      this.flashStatus('BOSS PHASE 2: AGGRESSIVE PATTERN');
      if (!this.bossMidfightEmitted) {
        this.bossMidfightEmitted = true;
        this.emitCodec('boss_midfight', 'naomi_mgs1', 'mgs1_naomi_boss_midfight', 'Boss armor pattern changed.', false);
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
    this.flashStatus('ARMORED GUARD CAPTAIN DEFEATED');
    if (!this.bossDefeatedEmitted) {
      this.bossDefeatedEmitted = true;
      this.emitCodec('boss_defeated', 'campbell_mgs1', 'mgs1_campbell_boss_defeated', 'Boss defeated. Extraction route open.', true);
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
    const originX = 1990;
    const originY = 118;
    const sweep = Math.sin(this.time.now / 980);
    const targetX = originX + sweep * 360;
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
      this.bossBarrierGraphics.fillRect(2580, 110, 580, 410);
      this.bossBarrierGraphics.lineStyle(2, 0xff6b6b, 0.45);
      this.bossBarrierGraphics.strokeRect(2580, 110, 580, 410);
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
      source = 'armored captain line of fire';
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
    const originX = 1990;
    const sweep = Math.sin(this.time.now / 980);
    const targetX = originX + sweep * 360;
    const dx = Math.abs(this.player.x - targetX);
    return this.player.y > 330 && dx < 108;
  }

  private increaseSuspicion(amount: number, source: string): void {
    this.lastAlertSource = source;
    if (source === 'security camera' && !this.firstCameraDetectionEmitted) {
      this.firstCameraDetectionEmitted = true;
      this.emitCodec('camera_detected', 'otacon_mgs1', 'mgs1_otacon_tech', 'Camera sightline detected. Technical support available.', false);
    }
    if (source === 'searchlight sweep' && !this.firstSearchlightDetectionEmitted) {
      this.firstSearchlightDetectionEmitted = true;
      this.emitCodec('searchlight_detected', 'otacon_mgs1', 'mgs1_otacon_searchlight_hint', 'Searchlight sweep detected. Technical support available.', false);
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
        this.emitCodec('suspicion', 'campbell_mgs1', 'mgs1_campbell_suspicion', 'Suspicion detected. Codec support available.', false);
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
      this.emitCodec('first_alert', 'campbell_mgs1', 'mgs1_campbell_first_alert', 'ALERT triggered. Codec support available.', true);
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
        this.emitCodec('evasion', 'campbell_mgs1', 'mgs1_campbell_evasion', 'Evasion phase started. Stay hidden.', false);
      }
    } else if (this.alertState === 'EVASION' && this.time.now > this.alertPhaseEndsAt) {
      this.suspicionMeter = 45;
      this.setAlertState('CAUTION', this.lastAlertSource, 'Caution phase started');
      this.alertPhaseEndsAt = this.time.now + 3600;
      if (!this.firstCautionEmitted) {
        this.firstCautionEmitted = true;
        this.emitCodec('caution', 'miller_mgs1', 'mgs1_miller_caution', 'Caution phase active. Patrols remain tense.', false);
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

    const spawnX = this.player.x < 1900 ? 3460 : 260;
    const patrolMin = Phaser.Math.Clamp(spawnX - 260, 80, 3660);
    const patrolMax = Phaser.Math.Clamp(spawnX + 260, 160, 3720);
    const guard = this.spawnGuard({ x: spawnX, y: 454, patrolMin, patrolMax, role: 'reinforcement' });
    guard.direction = spawnX > this.player.x ? -1 : 1;
    guard.sprite.setTint(0xffdf85);
    this.reinforcementCount += 1;
    this.nextReinforcementAt = 0;
    this.emitAlertEvent('REINFORCEMENT', 'base security response', 'Reinforcement unit deployed');

    if (!this.reinforcementCodecEmitted) {
      this.reinforcementCodecEmitted = true;
      this.emitCodec('reinforcement', 'campbell_mgs1', 'mgs1_campbell_reinforcement', 'Reinforcements deployed. Codec warning available.', false);
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
    this.emitCodec('manual_call', 'campbell_mgs1', 'mgs1_campbell_cqc_hint', 'Guard neutralized quietly.', false);

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
    this.emitCodec('camera_detected', 'otacon_mgs1', 'mgs1_otacon_camera_down', 'Security camera disabled.', false);
    this.registerNoise(20, 'camera destroyed');
  }

  private damagePlayer(amount: number, source: string): void {
    if (this.health <= 0 || this.time.now < this.lastDamageTime + 650) return;
    this.lastDamageTime = this.time.now;
    this.health = Math.max(0, this.health - amount);
    this.damageTaken += amount;
    this.player.setTint(0xff6b6b);
    this.time.delayedCall(160, () => this.player.active && !this.isPlayerCrouched() && this.player.clearTint());
    this.flashStatus(`DAMAGE: ${source.toUpperCase()}`);

    if (this.health <= 35 && !this.lowHealthEmitted) {
      this.lowHealthEmitted = true;
      this.emitCodec('low_health', 'naomi_mgs1', 'mgs1_naomi_medical', 'Health critical. Medical support available.', true);
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
    this.emitCodec('low_health', 'naomi_mgs1', 'mgs1_naomi_mission_failed', 'Snake is down. Mission failed.', false);
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

    if (this.player.x > 1545) this.completedObjectives.add('open_security_door');
    if (this.player.x > 2140) this.completedObjectives.add('cross_security_yard');

    if (this.boss?.active && !this.boss.defeated) this.objectiveStage = 'defeat_captain';
    else if (this.boss?.defeated) this.objectiveStage = 'extract';
    else if (this.player.x < 1545) this.objectiveStage = 'open_security_door';
    else this.objectiveStage = 'cross_security_yard';
  }

  private getObjectiveLabel(): string {
    switch (this.objectiveStage) {
      case 'recover_keycard': return 'Recover Keycard Lv.1';
      case 'open_security_door': return 'Open Lv.1 security door';
      case 'cross_security_yard': return 'Cross searchlight yard';
      case 'defeat_captain': return 'Defeat Armored Guard Captain';
      case 'extract': return 'Reach cargo elevator';
      default: return 'Advance mission';
    }
  }

  private updateHudText(): void {
    const chaffLabel = this.isChaffActive() ? 'ACTIVE' : 'READY';
    this.statusText.setText(
      `STATUS: ${this.alertState} | CARD: ${this.hasKeycard ? 'LV.1' : 'NONE'} | OBJ ${this.completedObjectives.size}/5 | SECRETS ${this.secretsFound.size}/${this.totalSecrets} | STEALTH ${this.getStealthScore()}`
    );
    this.objectiveText.setText(`OBJECTIVE: ${this.getObjectiveLabel()}`);
    this.alertText.setText(
      `SUSPICION: ${Math.round(this.suspicionMeter).toString().padStart(3, '0')}% | SOURCE: ${this.lastAlertSource.toUpperCase()} | REINF: ${this.reinforcementCount}/3`
    );
    this.hudText.setText(
      `HP ${this.health}/${this.maxHealth} | SOCOM ${this.ammo}/${this.maxAmmo} | RATION ${this.rations} | CHAFF ${this.chaff} ${chaffLabel} | J SHOOT | SPACE CQC | F CHAFF | R RATION | C CODEC`
    );
    if (this.boss?.active && !this.boss.defeated) {
      this.bossText.setText(`BOSS: ARMORED GUARD CAPTAIN | PHASE ${this.boss.phase} | ARMOR ${this.boss.hp}/${this.boss.maxHp}`);
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
    return this.cursors.down.isDown || this.keys.S.isDown;
  }

  private isPlayerSlowWalking(): boolean {
    return this.keys.SHIFT.isDown;
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

  private completeMission(): void {
    if (this.missionCompleted) return;
    if (!this.hasKeycard) {
      this.objectiveText.setText('OBJECTIVE: Need Keycard Lv.1 before extraction');
      return;
    }
    if (!this.boss?.defeated) {
      this.objectiveText.setText('OBJECTIVE: Armored Captain still controls extraction route');
      if (!this.boss?.active) this.activateBoss();
      return;
    }

    this.missionCompleted = true;
    this.completedObjectives.add('extract');
    const result = this.buildMissionResult(true, 'Mission clear: cargo elevator reached');
    emitGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, result);
    this.emitCodec('mission_complete', 'campbell_mgs1', 'mgs1_campbell_mission_complete', `Mission complete. Rank preview: ${result.rankPreview}`, true);
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
      missionId: 'shadow_dock_001',
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
