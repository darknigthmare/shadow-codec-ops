import Phaser from 'phaser';
import vrMissionsJson from '../../data/vrMissions.json';
import type {
  Mgs1VrMinuteBattleMissionProfile,
  Mgs1VrTargetFamily,
  Mgs1VrWeaponId,
  VrMissionDefinition,
  VrRunStats
} from '../../types/vr.types';
import { RuntimeInputController } from '../core/RuntimeInput';
import { emitGameEvent, GAME_EVENT, type VrRunGamePayload } from '../core/GameEvents';
import {
  getMgs1VrMinuteBattleProfileForMission
} from '../core/mgs1VrMinuteBattleRegistry';
import { VR_ACTIVE_MISSION_KEY } from '../core/vrConstants';
import {
  addSpecialPlatform,
  addSpecialVrBackdrop,
  createEmptySpecialStats,
  createSpecialAnimations,
  playSpecialActorAnimation,
  playSpecialVfx
} from './vrSpecialSceneSupport';

type MinuteBattleLoadout = Mgs1VrWeaponId | 'unarmed';
type PlayerProjectileKind = Mgs1VrWeaponId | 'enemy_bullet';
type HitSource = PlayerProjectileKind | 'unarmed' | 'chain';

interface BattleOpponent {
  id: string;
  sprite: Phaser.Physics.Arcade.Sprite;
  disabled: boolean;
  hp: number;
  direction: -1 | 1;
  patrolMin: number;
  patrolMax: number;
  nextAttackAt: number;
  alerted: boolean;
  targetFamily?: Mgs1VrTargetFamily;
  moving: boolean;
  explosive: boolean;
  flying: boolean;
}

interface PlacedTrap {
  sprite: Phaser.Physics.Arcade.Sprite;
  direction: -1 | 1;
}

const vrMissions = vrMissionsJson as VrMissionDefinition[];

const TARGET_TEXTURES: Readonly<Record<Mgs1VrTargetFamily, string>> = {
  'CUBE-B': 'mgs1VrEnvTargetCubeBlue',
  'CUBE-R': 'mgs1VrEnvTargetCubeRed',
  'KOKESHI-B': 'mgs1VrEnvTargetKokeshiBlue',
  'KOKESHI-G': 'mgs1VrEnvTargetKokeshiGreen',
  'MOVE-B': 'mgs1VrEnvTargetMoveBlue',
  'MOVE-R': 'mgs1VrEnvTargetMoveRed',
  WALL: 'mgs1VrEnvTargetWall',
  UFO: 'mgs1VrEnvTargetUfo'
};

const WEAPON_TEXTURES: Readonly<Record<Mgs1VrWeaponId, string>> = {
  socom: 'mgs1VrProjectileSocomRound',
  famas: 'mgs1VrProjectileFamasTracer',
  psg1: 'mgs1VrProjectilePsg1Round',
  grenade: 'mgs1VrProjectileGrenade',
  c4: 'mgs1VrProjectileC4Charge',
  claymore: 'mgs1VrProjectileClaymoreMine',
  stinger: 'mgs1VrProjectileStingerMissile',
  nikita: 'mgs1VrProjectileNikitaMissile'
};

const WEAPON_ICON_TEXTURES: Readonly<Record<Mgs1VrWeaponId, string>> = {
  socom: 'mgs1VrWeaponSocom',
  famas: 'mgs1VrWeaponFamas',
  psg1: 'mgs1VrWeaponPsg1',
  grenade: 'mgs1VrWeaponGrenade',
  c4: 'mgs1VrWeaponC4',
  claymore: 'mgs1VrWeaponClaymore',
  stinger: 'mgs1VrWeaponStinger',
  nikita: 'mgs1VrWeaponNikita'
};

const WEAPON_LABELS: Readonly<Record<MinuteBattleLoadout, string>> = {
  unarmed: 'NO WEAPON',
  socom: 'SOCOM',
  famas: 'FA-MAS',
  psg1: 'PSG1',
  grenade: 'GRENADE',
  c4: 'C4',
  claymore: 'CLAYMORE',
  stinger: 'STINGER',
  nikita: 'NIKITA'
};

const AMMO_CAPACITY: Readonly<Record<MinuteBattleLoadout, number>> = {
  unarmed: 0,
  socom: 48,
  famas: 120,
  psg1: 20,
  grenade: 20,
  c4: 18,
  claymore: 18,
  stinger: 16,
  nikita: 16
};

const TARGET_BEHAVIOR: Readonly<Record<Mgs1VrTargetFamily, {
  moving: boolean;
  explosive: boolean;
  flying: boolean;
  hp: number;
}>> = {
  'CUBE-B': { moving: false, explosive: false, flying: false, hp: 1 },
  'CUBE-R': { moving: false, explosive: true, flying: false, hp: 1 },
  'KOKESHI-B': { moving: true, explosive: false, flying: false, hp: 1 },
  'KOKESHI-G': { moving: true, explosive: false, flying: false, hp: 1 },
  'MOVE-B': { moving: true, explosive: false, flying: false, hp: 1 },
  'MOVE-R': { moving: true, explosive: true, flying: false, hp: 1 },
  WALL: { moving: false, explosive: false, flying: false, hp: 2 },
  UFO: { moving: true, explosive: true, flying: true, hp: 1 }
};

function getActiveMinuteBattleMission(): {
  mission: VrMissionDefinition;
  profile: Mgs1VrMinuteBattleMissionProfile;
} {
  const storedId = window.localStorage.getItem(VR_ACTIVE_MISSION_KEY);
  const mission = vrMissions.find((entry) => entry.id === storedId && getMgs1VrMinuteBattleProfileForMission(entry.id))
    ?? vrMissions.find((entry) => Boolean(getMgs1VrMinuteBattleProfileForMission(entry.id)));
  const profile = mission ? getMgs1VrMinuteBattleProfileForMission(mission.id) : undefined;
  if (!mission || !profile) throw new Error('No MGS1 VR 1 MIN. BATTLE mission profile is available.');
  return { mission, profile };
}

/**
 * Timed runtime shared by the eighteen Integral 1 MIN. BATTLE missions.
 * Every loadout keeps its own firing rule while both variants share the
 * canonical sixty-second quota loop and the standard VR result events.
 */
export class VRMinuteBattleScene extends Phaser.Scene {
  private mission!: VrMissionDefinition;
  private profile!: Mgs1VrMinuteBattleMissionProfile;
  private stats: VrRunStats = createEmptySpecialStats();
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private opponentBodies!: Phaser.Physics.Arcade.Group;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private inputController!: RuntimeInputController;
  private opponents: BattleOpponent[] = [];
  private c4Charges: Phaser.Physics.Arcade.Sprite[] = [];
  private claymores: PlacedTrap[] = [];
  private guidedMissile?: Phaser.Physics.Arcade.Sprite;
  private statusText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private controlsText!: Phaser.GameObjects.Text;
  private startTime = 0;
  private lastHudEmitAt = 0;
  private lastActionAt = 0;
  private lastDamageAt = 0;
  private nextEnemyShotAt = 0;
  private spawnSequence = 0;
  private completed = false;
  private health = 100;
  private ammo = 0;
  private resupplyAt = 0;

  constructor() {
    super('VRMinuteBattleScene');
  }

  create(): void {
    const active = getActiveMinuteBattleMission();
    this.mission = active.mission;
    this.profile = active.profile;
    this.stats = createEmptySpecialStats();
    this.opponents = [];
    this.c4Charges = [];
    this.claymores = [];
    this.guidedMissile = undefined;
    this.completed = false;
    this.health = 100;
    this.ammo = AMMO_CAPACITY[this.profile.loadout];
    this.resupplyAt = 0;
    this.spawnSequence = 0;
    this.nextEnemyShotAt = 0;
    this.startTime = performance.now();

    createSpecialAnimations(this);
    this.cameras.main.setViewport(0, 0, 960, 540);
    this.physics.world.setBounds(0, 0, 1900, 540);
    this.cameras.main.setBounds(0, 0, 1900, 540);
    addSpecialVrBackdrop(
      this,
      `MGS1 INTEGRAL // 1 MIN. BATTLE // VS ${this.profile.variant.toUpperCase()}`,
      this.profile.variant === 'target'
        ? { void: 0x071008, grid: 0x65ef85, accent: 0xffd65a }
        : { void: 0x100506, grid: 0xff665d, accent: 0xffc45a }
    );

    // A broad floor and three raised lanes let every weapon keep a readable
    // side-view silhouette without changing the existing global VR assets.
    this.platforms = this.physics.add.staticGroup();
    addSpecialPlatform(this, this.platforms, 950, 520, 1900);
    addSpecialPlatform(this, this.platforms, 370, 380, 280);
    addSpecialPlatform(this, this.platforms, 950, 340, 300);
    addSpecialPlatform(this, this.platforms, 1530, 400, 280);

    const playerTexture = this.textures.exists('mgs1VrSolidSnake') ? 'mgs1VrSolidSnake' : 'vrPlayer';
    const playerStartY = this.profile.loadout === 'psg1' ? 282 : 456;
    this.player = this.physics.add.sprite(950, playerStartY, playerTexture).setDepth(20);
    this.player.setCollideWorldBounds(true).setDragX(1350).setMaxVelocity(285, 580);
    this.player.body?.setSize(28, 48).setOffset(Math.max(0, (this.player.width - 28) / 2), Math.max(0, this.player.height - 48));
    this.physics.add.collider(this.player, this.platforms);
    playSpecialActorAnimation(this, this.player, 'idle');

    this.opponentBodies = this.physics.add.group();
    this.projectiles = this.physics.add.group({ defaultKey: 'bullet', maxSize: 96 });
    this.physics.add.collider(this.projectiles, this.platforms, (projectileObject) => {
      this.handleProjectilePlatformImpact(projectileObject);
    });
    this.physics.add.overlap(this.projectiles, this.player, (projectileObject, _playerObject) => {
      this.handleEnemyProjectileHit(projectileObject);
    });
    this.physics.add.overlap(this.projectiles, this.opponentBodies, (projectileObject, opponentObject) => {
      this.handlePlayerProjectileHit(projectileObject as Phaser.Physics.Arcade.Sprite, opponentObject);
    });

    this.inputController = new RuntimeInputController(this);
    const lerp = this.inputController.profile.reducedMotion ? 1 : 0.1;
    this.cameras.main.startFollow(this.player, true, lerp, lerp);
    this.addHud();
    this.addLoadoutIcon();
    this.fillOpponentWave();
    this.emitHud('running', '1 MIN. BATTLE loaded');
  }

  update(_time: number, delta: number): void {
    if (this.completed) return;
    this.inputController.update();
    this.syncTime();
    if (this.stats.timeSeconds >= this.profile.durationSeconds) {
      this.finishAtTimer();
      return;
    }

    this.handleMovement();
    this.handleLoadoutAction();
    this.handleOpponents(delta);
    this.handleProjectiles();
    this.handleClaymores();
    this.handleResupply();
    this.fillOpponentWave();
    this.updateHud();

    if (this.inputController.justDown('cancel')) this.completeRun(false, '1 MIN. BATTLE aborted');
    if (this.time.now > this.lastHudEmitAt + 220) this.emitHud('running', '1 MIN. BATTLE active');
  }

  private addHud(): void {
    this.statusText = this.add.text(22, 48, '', {
      fontFamily: 'monospace', fontSize: '15px', color: '#d8fff8', backgroundColor: '#020710cc'
    }).setScrollFactor(0).setDepth(110);
    this.objectiveText = this.add.text(22, 76, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#f8f49a', backgroundColor: '#020710cc'
    }).setScrollFactor(0).setDepth(110);
    this.controlsText = this.add.text(22, 500, '', {
      fontFamily: 'monospace', fontSize: '13px', color: '#7cffd8', backgroundColor: '#020710dd'
    }).setScrollFactor(0).setDepth(110);
    this.updateHud();
  }

  private addLoadoutIcon(): void {
    if (this.profile.loadout === 'unarmed') return;
    const textureKey = WEAPON_ICON_TEXTURES[this.profile.loadout];
    if (!this.textures.exists(textureKey)) return;
    this.add.text(930, 24, 'FIXED LOADOUT', {
      fontFamily: 'monospace', fontSize: '11px', color: '#f8f49a', backgroundColor: '#020710bb'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(112);
    this.add.image(930, 64, textureKey)
      .setOrigin(1, 0.5)
      .setScale(1.25)
      .setScrollFactor(0)
      .setDepth(112);
  }

  private updateHud(): void {
    const remaining = Math.max(0, this.profile.durationSeconds - this.stats.timeSeconds);
    const qualified = this.stats.objectivesCompleted >= this.profile.quota;
    const ammoLabel = this.profile.loadout === 'unarmed' ? 'UNLIMITED' : String(this.ammo);
    this.statusText.setText(
      `TIME ${String(remaining).padStart(2, '0')} // SCORE ${this.stats.objectivesCompleted} // QUOTA ${this.profile.quota} // HP ${this.health}`
    );
    this.objectiveText.setText(
      `${qualified ? 'QUALIFIED' : 'OBJECTIVE'} // VS ${this.profile.variant.toUpperCase()} // ${WEAPON_LABELS[this.profile.loadout]} // AMMO ${ammoLabel}`
    );
    const specialControl = this.profile.loadout === 'c4'
      ? 'FIRE PLANT | CQC DETONATE'
      : this.profile.loadout === 'nikita'
        ? 'FIRE LAUNCH | CQC DETONATE | MOVE/JUMP/CROUCH STEER'
        : this.profile.loadout === 'psg1'
          ? 'FIRE SHOOT | JUMP/CROUCH AIM'
        : this.profile.loadout === 'unarmed'
          ? 'FIRE/CQC STRIKE'
          : 'FIRE ATTACK';
    this.controlsText.setText(`MOVE | JUMP | ${specialControl} | SURVIVE 60 SECONDS`);
  }

  private handleMovement(): void {
    if (this.profile.loadout === 'nikita' && this.guidedMissile?.active) {
      this.player.setAccelerationX(0).setVelocityX(0);
      playSpecialActorAnimation(this, this.player, 'idle');
      return;
    }
    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (left === right) {
      this.player.setAccelerationX(0);
      playSpecialActorAnimation(this, this.player, 'idle');
    } else {
      const direction = left ? -1 : 1;
      this.player.setAccelerationX(direction * 1450).setFlipX(direction < 0);
      playSpecialActorAnimation(this, this.player, 'move');
    }
    if (this.inputController.justDown('jump') && body.blocked.down) {
      this.player.setVelocityY(-460);
      playSpecialActorAnimation(this, this.player, 'move', 180);
    }
  }

  private handleLoadoutAction(): void {
    const loadout = this.profile.loadout;
    if (loadout === 'unarmed') {
      if (this.inputController.justDown('fire') || this.inputController.justDown('cqc')) this.performUnarmedStrike();
      return;
    }

    if (loadout === 'c4') {
      if (this.inputController.justDown('fire')) this.plantC4();
      if (this.inputController.justDown('cqc')) this.detonateC4();
      return;
    }

    if (loadout === 'claymore') {
      if (this.inputController.justDown('fire')) this.plantClaymore();
      return;
    }

    if (loadout === 'nikita') {
      if (this.guidedMissile?.active && this.inputController.justDown('cqc')) {
        this.explodeProjectile(this.guidedMissile);
      } else if (!this.guidedMissile?.active && this.inputController.justDown('fire')) {
        this.launchMissile('nikita');
      }
      return;
    }

    if (loadout === 'famas') {
      if (this.inputController.isDown('fire') && this.time.now >= this.lastActionAt + 145) this.fireFamasBurst();
      return;
    }

    if (!this.inputController.justDown('fire')) return;
    if (loadout === 'socom') this.fireBallistic('socom', 690, 1, 220);
    else if (loadout === 'psg1') this.fireBallistic('psg1', 1120, 2, 520);
    else if (loadout === 'grenade') this.throwGrenade();
    else if (loadout === 'stinger') this.launchMissile('stinger');
  }

  private performUnarmedStrike(): void {
    if (this.time.now < this.lastActionAt + 260) return;
    this.lastActionAt = this.time.now;
    this.stats.shotsFired += 1;
    const direction = this.player.flipX ? -1 : 1;
    const strikeX = this.player.x + direction * 42;
    playSpecialActorAnimation(this, this.player, 'attack', 220);
    playSpecialVfx(this, 'mgs1VrVfxNinjaSlash', strikeX, this.player.y, { flipX: direction < 0, scale: 0.6 });
    const opponent = this.nearestOpponent(strikeX, this.player.y, 74);
    if (!opponent) return;
    this.inputController.vibrate(60, 0.3, 0.22);
    // Canon VS TARGET / NO WEAPON objects take the full three-punch string.
    this.hitOpponent(opponent, 1, 'unarmed');
  }

  private fireBallistic(kind: 'socom' | 'psg1', speed: number, damage: number, cooldown: number): void {
    if (!this.consumeAmmo(1, cooldown)) return;
    const direction = this.player.flipX ? -1 : 1;
    const projectile = this.spawnProjectile(kind, this.player.x + direction * 28, this.player.y - 14);
    const verticalAim = kind === 'psg1'
      ? this.inputController.isDown('jump') ? -1 : this.inputController.isDown('crouch') ? 1 : 0
      : 0;
    const velocityY = verticalAim * 340;
    projectile
      .setVelocity(direction * speed, velocityY)
      .setRotation(Math.atan2(velocityY, direction * speed))
      .setData('damage', damage)
      .setData('expiresAt', this.time.now + 2100);
    playSpecialActorAnimation(this, this.player, 'attack', 150);
    playSpecialVfx(this, 'mgs1VrVfxMuzzleFlash', projectile.x, projectile.y, { flipX: direction < 0 });
  }

  private fireFamasBurst(): void {
    if (!this.consumeAmmo(3, 145)) return;
    const direction = this.player.flipX ? -1 : 1;
    for (let index = 0; index < 3; index += 1) {
      this.time.delayedCall(index * 42, () => {
        if (this.completed || !this.player.active) return;
        const projectile = this.spawnProjectile('famas', this.player.x + direction * 28, this.player.y - 15 + index * 2);
        projectile.setVelocityX(direction * 790).setData('damage', 1).setData('expiresAt', this.time.now + 1900);
        playSpecialVfx(this, 'mgs1VrVfxMuzzleFlash', projectile.x, projectile.y, { flipX: direction < 0, scale: 0.8 });
      });
    }
    playSpecialActorAnimation(this, this.player, 'attack', 160);
  }

  private throwGrenade(): void {
    if (!this.consumeAmmo(1, 430)) return;
    const direction = this.player.flipX ? -1 : 1;
    const grenade = this.spawnProjectile('grenade', this.player.x + direction * 24, this.player.y - 20);
    grenade.setVelocity(direction * 340, -390)
      .setDragX(55)
      .setBounce(0.42)
      .setData('blastRadius', 150)
      .setData('damage', 3)
      .setData('expiresAt', this.time.now + 4000);
    playSpecialActorAnimation(this, this.player, 'attack', 210);
  }

  private plantC4(): void {
    if (this.c4Charges.filter((charge) => charge.active).length >= 18 || !this.consumeAmmo(1, 260)) return;
    const direction = this.player.flipX ? -1 : 1;
    const texture = this.textures.exists(WEAPON_TEXTURES.c4) ? WEAPON_TEXTURES.c4 : 'bullet';
    const charge = this.physics.add.sprite(this.player.x + direction * 34, this.player.y + 18, texture).setDepth(18);
    (charge.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    charge.setImmovable(true);
    this.c4Charges.push(charge);
    playSpecialActorAnimation(this, this.player, 'attack', 180);
  }

  private detonateC4(): void {
    const activeCharges = this.c4Charges.filter((charge) => charge.active);
    if (!activeCharges.length) {
      this.flashStatus('NO C4 CHARGE PLANTED');
      return;
    }
    // Integral detonates the planted sequence one charge at a time. This
    // preserves the VS ENEMY tactic of laying a long route, then triggering
    // successive blasts as reinforcements converge on the previous one.
    const charge = activeCharges[0];
    this.explodeAt(charge.x, charge.y, 175, 4, 'c4');
    charge.destroy();
  }

  private plantClaymore(): void {
    if (this.claymores.filter((mine) => mine.sprite.active).length >= 5 || !this.consumeAmmo(1, 300)) return;
    const direction = this.player.flipX ? -1 : 1;
    const texture = this.textures.exists(WEAPON_TEXTURES.claymore) ? WEAPON_TEXTURES.claymore : 'bullet';
    const sprite = this.physics.add.sprite(this.player.x + direction * 34, this.player.y + 20, texture).setDepth(18);
    (sprite.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    sprite.setImmovable(true).setFlipX(direction < 0);
    this.claymores.push({ sprite, direction });
    playSpecialActorAnimation(this, this.player, 'attack', 180);
  }

  private launchMissile(kind: 'stinger' | 'nikita'): void {
    if (!this.consumeAmmo(1, kind === 'stinger' ? 650 : 520)) return;
    const direction = this.player.flipX ? -1 : 1;
    const missile = this.spawnProjectile(kind, this.player.x + direction * 36, this.player.y - 18);
    missile.setVelocityX(direction * (kind === 'stinger' ? 430 : 330))
      .setData('direction', direction)
      .setData('blastRadius', kind === 'stinger' ? 190 : 165)
      .setData('damage', 4)
      .setData('expiresAt', this.time.now + (kind === 'stinger' ? 3500 : 4300));
    if (kind === 'nikita') {
      this.guidedMissile = missile;
      this.cameras.main.startFollow(missile, true, 0.12, 0.12);
    }
    playSpecialActorAnimation(this, this.player, 'attack', 230);
    playSpecialVfx(this, 'mgs1VrVfxMissileTrail', missile.x - direction * 18, missile.y, { flipX: direction < 0, duration: 260 });
  }

  private consumeAmmo(amount: number, cooldown: number): boolean {
    if (this.time.now < this.lastActionAt + cooldown) return false;
    if (this.ammo < amount) {
      this.scheduleResupply();
      this.flashStatus('AMMUNITION RESUPPLY INBOUND');
      return false;
    }
    this.lastActionAt = this.time.now;
    this.ammo -= amount;
    this.stats.shotsFired += amount;
    if (this.ammo <= 0) this.scheduleResupply();
    return true;
  }

  private scheduleResupply(): void {
    if (this.profile.loadout === 'unarmed' || this.resupplyAt > this.time.now) return;
    this.resupplyAt = this.time.now + 1250;
  }

  private handleResupply(): void {
    if (!this.resupplyAt || this.time.now < this.resupplyAt) return;
    this.ammo = Math.max(1, Math.ceil(AMMO_CAPACITY[this.profile.loadout] * 0.5));
    this.resupplyAt = 0;
    this.flashStatus(`${WEAPON_LABELS[this.profile.loadout]} RESUPPLIED`);
  }

  private spawnProjectile(kind: PlayerProjectileKind, x: number, y: number): Phaser.Physics.Arcade.Sprite {
    const textureKey = kind === 'enemy_bullet'
      ? (this.textures.exists('mgs1VrProjectileSocomRound') ? 'mgs1VrProjectileSocomRound' : 'enemyBullet')
      : (this.textures.exists(WEAPON_TEXTURES[kind]) ? WEAPON_TEXTURES[kind] : 'bullet');
    const projectile = this.projectiles.get(x, y, textureKey) as Phaser.Physics.Arcade.Sprite;
    projectile.enableBody(true, x, y, true, true)
      .setTexture(textureKey)
      .setDepth(35)
      .setVelocity(0, 0)
      .setAcceleration(0, 0)
      .setBounce(0)
      .setRotation(0)
      .setFlip(false, false)
      .clearTint();
    (projectile.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(kind === 'grenade');
    projectile.setDataEnabled();
    projectile.data?.reset();
    projectile.setData('kind', kind).setData('owner', kind === 'enemy_bullet' ? 'enemy' : 'player');
    return projectile;
  }

  private handleProjectiles(): void {
    this.projectiles.getChildren().forEach((entry) => {
      const projectile = entry as Phaser.Physics.Arcade.Sprite;
      if (!projectile.active) return;
      const kind = projectile.getData('kind') as PlayerProjectileKind | undefined;
      const expiresAt = (projectile.getData('expiresAt') as number | undefined) ?? this.time.now + 1;
      if (kind === 'stinger') this.steerStinger(projectile);
      if (kind === 'nikita') this.steerNikita(projectile);
      if (expiresAt <= this.time.now || projectile.x < -60 || projectile.x > 1960 || projectile.y < -80 || projectile.y > 620) {
        if (kind !== 'enemy_bullet' && (projectile.getData('blastRadius') as number | undefined)) this.explodeProjectile(projectile);
        else projectile.disableBody(true, true);
      }
    });
  }

  private steerStinger(missile: Phaser.Physics.Arcade.Sprite): void {
    const target = this.nearestOpponent(missile.x, missile.y, 900);
    if (!target) return;
    const angle = Phaser.Math.Angle.Between(missile.x, missile.y, target.sprite.x, target.sprite.y);
    this.physics.velocityFromRotation(angle, 470, missile.body?.velocity);
    missile.setRotation(angle).setFlipY(Math.abs(angle) > Math.PI / 2);
  }

  private steerNikita(missile: Phaser.Physics.Arcade.Sprite): void {
    let direction = (missile.getData('direction') as -1 | 1 | undefined) ?? 1;
    if (this.inputController.isDown('moveLeft')) direction = -1;
    else if (this.inputController.isDown('moveRight')) direction = 1;
    missile.setData('direction', direction);
    const vertical = this.inputController.isDown('jump') ? -1 : this.inputController.isDown('crouch') ? 1 : 0;
    missile.setVelocity(direction * 330, vertical * 255).setRotation(vertical * 0.35 * direction);
  }

  private handleProjectilePlatformImpact(projectileObject: unknown): void {
    const projectile = projectileObject as Phaser.Physics.Arcade.Sprite;
    if (!projectile.active) return;
    const kind = projectile.getData('kind') as PlayerProjectileKind | undefined;
    if (kind === 'grenade') return;
    if (kind === 'stinger' || kind === 'nikita') this.explodeProjectile(projectile);
    else projectile.disableBody(true, true);
  }

  private handlePlayerProjectileHit(projectile: Phaser.Physics.Arcade.Sprite, opponentObject: unknown): void {
    if (!projectile.active || projectile.getData('owner') !== 'player') return;
    const opponent = this.opponents.find((entry) => entry.sprite === opponentObject && !entry.disabled);
    if (!opponent) return;
    const blastRadius = (projectile.getData('blastRadius') as number | undefined) ?? 0;
    if (blastRadius > 0) {
      this.explodeProjectile(projectile);
      return;
    }
    const kind = (projectile.getData('kind') as PlayerProjectileKind | undefined) ?? 'socom';
    const damage = (projectile.getData('damage') as number | undefined) ?? 1;
    projectile.disableBody(true, true);
    playSpecialVfx(this, 'mgs1VrVfxBulletImpact', opponent.sprite.x, opponent.sprite.y, { scale: 0.8 });
    this.hitOpponent(opponent, damage, kind);
  }

  private explodeProjectile(projectile: Phaser.Physics.Arcade.Sprite): void {
    if (!projectile.active) return;
    const kind = (projectile.getData('kind') as PlayerProjectileKind | undefined) ?? 'grenade';
    const radius = (projectile.getData('blastRadius') as number | undefined) ?? 145;
    const damage = (projectile.getData('damage') as number | undefined) ?? 3;
    const x = projectile.x;
    const y = projectile.y;
    projectile.disableBody(true, true);
    if (projectile === this.guidedMissile) {
      this.guidedMissile = undefined;
      const lerp = this.inputController.profile.reducedMotion ? 1 : 0.1;
      this.cameras.main.startFollow(this.player, true, lerp, lerp);
    }
    this.explodeAt(x, y, radius, damage, kind);
  }

  private explodeAt(x: number, y: number, radius: number, damage: number, source: HitSource): void {
    const vfx = source === 'stinger' || source === 'nikita'
      ? 'mgs1VrVfxMissileExplosion'
      : source === 'claymore'
        ? 'mgs1VrVfxClaymoreBlast'
        : 'mgs1VrVfxTargetChainExplosion';
    playSpecialVfx(this, vfx, x, y, { scale: source === 'c4' ? 1.2 : 1 });
    this.opponents.forEach((opponent) => {
      if (opponent.disabled) return;
      if (Phaser.Math.Distance.Between(x, y, opponent.sprite.x, opponent.sprite.y) <= radius) {
        this.hitOpponent(opponent, damage, source);
      }
    });
    if (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) <= radius * 0.62) {
      this.damagePlayer(10, `${String(source).toUpperCase()} blast`);
    }
  }

  private fillOpponentWave(): void {
    if (this.completed) return;
    const maximum = this.profile.variant === 'enemy' ? 4 : 8;
    const activeCount = this.opponents.filter((opponent) => !opponent.disabled && opponent.sprite.active).length;
    for (let index = activeCount; index < maximum; index += 1) this.spawnOpponent();
  }

  private spawnOpponent(): void {
    this.spawnSequence += 1;
    // VS ENEMY intentionally has no target family. The neutral fallback is
    // only used for shared spawn geometry and never rendered as a target.
    const family = this.profile.targetFamily ?? 'CUBE-B';
    const behavior = TARGET_BEHAVIOR[family];
    const targetSlots = this.resolveTargetSpawnSlots();
    const enemySlots = this.resolveEnemySpawnSlots();
    const slots = this.profile.variant === 'target' ? targetSlots : enemySlots;
    const x = slots[(this.spawnSequence - 1) % slots.length];
    const usesFourNikitaLanes = this.profile.variant === 'target' && this.profile.loadout === 'nikita';
    const isRaisedTarget = this.profile.variant === 'target' && !behavior.flying && usesFourNikitaLanes;
    const y = behavior.flying
      ? 220 + (this.spawnSequence % 3) * 68
      : usesFourNikitaLanes
        ? [468, 332, 286, 382][(this.spawnSequence - 1) % 4]
      : isRaisedTarget
        ? (this.spawnSequence % 8 === 0 ? 292 : 332)
        : 468;
    const targetTexture = TARGET_TEXTURES[family];
    const preferredTexture = this.profile.variant === 'target' ? targetTexture : 'mgs1VrGenomeSoldier';
    const fallbackTexture = this.profile.variant === 'target' ? 'vrTarget' : 'vrGuard';
    const texture = this.textures.exists(preferredTexture) ? preferredTexture : fallbackTexture;
    const sprite = this.physics.add.sprite(x, y, texture).setDepth(17).setCollideWorldBounds(true);
    this.opponentBodies.add(sprite);
    sprite.setData('opponentSequence', this.spawnSequence);
    sprite.body?.setSize(
      Math.min(34, Math.max(18, sprite.width)),
      Math.min(54, Math.max(18, sprite.height))
    );
    const flying = this.profile.variant === 'target' && behavior.flying;
    // VR targets float on their programmed lane; only Genome Soldiers use
    // platform gravity. This also preserves Nikita's four distinct lanes.
    if (this.profile.variant === 'target') (sprite.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    else this.physics.add.collider(sprite, this.platforms);
    if (this.profile.variant === 'enemy') playSpecialActorAnimation(this, sprite, 'idle');

    const claymoreConvergence = this.profile.variant === 'target' && this.profile.loadout === 'claymore';
    const patrolRadius = this.profile.variant === 'enemy' || behavior.moving ? 100 : 0;
    const opponent: BattleOpponent = {
      id: `${this.profile.variant}-${this.spawnSequence}`,
      sprite,
      disabled: false,
      // The original No Weapon and SOCOM target drills require a three-hit
      // string; a FAMAS burst follows the same cadence at automatic speed.
      hp: this.profile.loadout === 'unarmed'
        || this.profile.loadout === 'socom'
        || this.profile.loadout === 'famas'
        ? 3
        : this.profile.variant === 'target' ? behavior.hp : 1,
      direction: x < this.player.x ? 1 : -1,
      patrolMin: claymoreConvergence ? 760 : Math.max(80, x - patrolRadius),
      patrolMax: claymoreConvergence ? 1140 : Math.min(1820, x + patrolRadius),
      nextAttackAt: this.time.now + Phaser.Math.Between(1200, 2200),
      alerted: false,
      targetFamily: this.profile.variant === 'target' ? family : undefined,
      moving: this.profile.variant === 'enemy' || behavior.moving,
      explosive: this.profile.variant === 'target' && behavior.explosive,
      flying
    };
    this.opponents.push(opponent);
  }

  private resolveTargetSpawnSlots(): readonly number[] {
    switch (this.profile.loadout) {
      case 'c4':
        return [1170, 1235, 1300, 1365, 380, 445, 510, 575];
      case 'grenade':
        return [715, 790, 865, 940, 1015, 1090, 1165, 1240];
      case 'claymore':
        return [250, 430, 610, 790, 1110, 1290, 1470, 1650];
      case 'nikita':
        return [260, 510, 760, 1030, 1280, 1530, 1760, 420];
      case 'stinger':
        return [280, 430, 580, 730, 1170, 1320, 1470, 1620];
      default:
        return [175, 345, 545, 735, 1165, 1365, 1560, 1740];
    }
  }

  private resolveEnemySpawnSlots(): readonly number[] {
    switch (this.profile.loadout) {
      case 'grenade':
        // Patrols arrive in two clusters of three, making the guide's
        // four-guard lure-and-blast tactic possible in side view.
        return [690, 770, 850, 1050, 1130, 1210];
      case 'claymore':
        return [1260, 1360, 1460, 1560, 1660, 1760];
      case 'c4':
        return [420, 510, 600, 1300, 1390, 1480];
      case 'nikita':
      case 'stinger':
        return [280, 370, 460, 1440, 1530, 1620];
      default:
        return [150, 1750, 300, 1600, 470, 1430];
    }
  }

  private handleOpponents(_delta: number): void {
    this.opponents.forEach((opponent) => {
      if (opponent.disabled || !opponent.sprite.active || !opponent.moving) return;
      if (this.profile.variant === 'enemy') {
        this.handleEnemyOpponent(opponent);
        return;
      }
      if (opponent.sprite.x <= opponent.patrolMin) opponent.direction = 1;
      if (opponent.sprite.x >= opponent.patrolMax) opponent.direction = -1;
      opponent.sprite.setVelocityX(opponent.direction * (opponent.flying ? 92 : 62)).setFlipX(opponent.direction < 0);
    });
  }

  private handleEnemyOpponent(opponent: BattleOpponent): void {
    const distanceX = this.player.x - opponent.sprite.x;
    const direction: -1 | 1 = distanceX < 0 ? -1 : 1;
    opponent.direction = direction;
    const distance = Math.abs(distanceX);
    if (distance > 250) opponent.sprite.setVelocityX(direction * 58);
    else opponent.sprite.setVelocityX(0);
    opponent.sprite.setFlipX(direction < 0);
    playSpecialActorAnimation(this, opponent.sprite, distance > 250 ? 'move' : 'idle');

    const visible = Math.abs(opponent.sprite.y - this.player.y) < 100 && distance < 620;
    if (visible && !opponent.alerted) {
      opponent.alerted = true;
    }
    // Detection is the premise of VS ENEMY, not a stealth failure. Keep the
    // alert statistic at zero so the shared rank evaluator does not punish
    // mandatory combat. A global volley gate also prevents four simultaneous
    // shooters from deleting Snake before the sixty-second timer expires.
    if (!visible || this.time.now < opponent.nextAttackAt || this.time.now < this.nextEnemyShotAt) return;
    this.nextEnemyShotAt = this.time.now + 1150;
    opponent.nextAttackAt = this.time.now + Phaser.Math.Between(1800, 2800);
    const bullet = this.spawnProjectile('enemy_bullet', opponent.sprite.x + direction * 24, opponent.sprite.y - 16);
    bullet.setVelocityX(direction * 430).setData('damage', 4).setData('expiresAt', this.time.now + 2100);
    playSpecialActorAnimation(this, opponent.sprite, 'attack', 210);
    playSpecialVfx(this, 'mgs1VrVfxMuzzleFlash', bullet.x, bullet.y, { flipX: direction < 0, scale: 0.8 });
  }

  private handleEnemyProjectileHit(projectileObject: unknown): void {
    const projectile = projectileObject as Phaser.Physics.Arcade.Sprite;
    if (!projectile.active || projectile.getData('owner') !== 'enemy') return;
    const damage = (projectile.getData('damage') as number | undefined) ?? 7;
    projectile.disableBody(true, true);
    this.damagePlayer(damage, 'Genome Soldier fire');
  }

  private handleClaymores(): void {
    this.claymores.forEach((mine) => {
      if (!mine.sprite.active) return;
      const victim = this.opponents.find((opponent) => {
        if (opponent.disabled) return false;
        const relative = opponent.sprite.x - mine.sprite.x;
        return Math.sign(relative) === mine.direction
          && Math.abs(relative) < 105
          && Math.abs(opponent.sprite.y - mine.sprite.y) < 92;
      });
      if (!victim) return;
      this.explodeAt(mine.sprite.x + mine.direction * 45, mine.sprite.y - 10, 145, 3, 'claymore');
      mine.sprite.destroy();
    });
  }

  private hitOpponent(opponent: BattleOpponent, damage: number, source: HitSource): void {
    if (opponent.disabled) return;
    this.stats.hits += 1;
    opponent.hp -= damage;
    opponent.sprite.setTint(0xffe58a);
    if (this.profile.variant === 'enemy') playSpecialActorAnimation(this, opponent.sprite, 'hit', 120);
    this.time.delayedCall(95, () => {
      if (!opponent.disabled && opponent.sprite.active) opponent.sprite.clearTint();
    });
    if (opponent.hp > 0) return;
    this.disableOpponent(opponent, source);
  }

  private disableOpponent(opponent: BattleOpponent, source: HitSource): void {
    if (opponent.disabled) return;
    opponent.disabled = true;
    opponent.sprite.setVelocity(0, 0);
    if (opponent.sprite.body) opponent.sprite.disableBody(false, false);
    this.stats.objectivesCompleted += 1;

    if (this.profile.variant === 'enemy') {
      this.stats.kills += 1;
      if (source === 'unarmed') this.stats.neutralizations += 1;
      opponent.sprite.setTint(0xff6f6f);
      playSpecialActorAnimation(this, opponent.sprite, 'death', 360);
      if (source === 'unarmed') {
        const throwDirection = this.player.flipX ? -1 : 1;
        this.tweens.add({
          targets: opponent.sprite,
          x: opponent.sprite.x + throwDirection * 105,
          y: opponent.sprite.y - 48,
          angle: throwDirection * 75,
          duration: 230,
          ease: 'Quad.easeOut'
        });
      }
    } else if (opponent.targetFamily === 'WALL') {
      playSpecialVfx(this, 'mgs1VrVfxWallCrumble', opponent.sprite.x, opponent.sprite.y);
    } else if (opponent.explosive) {
      playSpecialVfx(
        this,
        opponent.targetFamily === 'UFO' ? 'mgs1VrVfxUfoExplosion' : 'mgs1VrVfxTargetChainExplosion',
        opponent.sprite.x,
        opponent.sprite.y
      );
      if (source !== 'chain') this.chainExplosiveTargets(opponent);
    } else {
      playSpecialVfx(this, 'mgs1VrVfxTargetShatterBlue', opponent.sprite.x, opponent.sprite.y);
    }

    this.inputController.vibrate(45, 0.27, 0.18);
    this.time.delayedCall(260, () => {
      if (opponent.sprite.active) opponent.sprite.destroy();
      this.fillOpponentWave();
    });
    if (this.stats.objectivesCompleted === this.profile.quota) this.flashStatus('MINIMUM QUOTA REACHED // KEEP GOING');
  }

  private chainExplosiveTargets(origin: BattleOpponent): void {
    this.opponents.forEach((candidate, index) => {
      if (candidate.disabled || !candidate.explosive || candidate === origin) return;
      if (Phaser.Math.Distance.Between(origin.sprite.x, origin.sprite.y, candidate.sprite.x, candidate.sprite.y) > 165) return;
      this.time.delayedCall(65 + index * 30, () => this.hitOpponent(candidate, 99, 'chain'));
    });
  }

  private nearestOpponent(x: number, y: number, maximumDistance: number): BattleOpponent | undefined {
    return this.opponents
      .filter((opponent) => !opponent.disabled && opponent.sprite.active)
      .map((opponent) => ({
        opponent,
        distance: Phaser.Math.Distance.Between(x, y, opponent.sprite.x, opponent.sprite.y)
      }))
      .filter((entry) => entry.distance <= maximumDistance)
      .sort((a, b) => a.distance - b.distance)[0]?.opponent;
  }

  private damagePlayer(amount: number, source: string): void {
    if (this.time.now < this.lastDamageAt + 310 || this.completed) return;
    this.lastDamageAt = this.time.now;
    this.health = Math.max(0, this.health - amount);
    this.stats.damageTaken += amount;
    this.player.setTint(0xff6464);
    this.inputController.vibrate(95, 0.55, 0.38);
    playSpecialActorAnimation(this, this.player, 'hit', 170);
    this.time.delayedCall(150, () => this.player.active && this.player.clearTint());
    if (this.health <= 0) this.completeRun(false, `Operator down: ${source}`);
  }

  private syncTime(): void {
    const elapsed = Math.floor((performance.now() - this.startTime) / 1000);
    this.stats.timeSeconds = Math.min(this.profile.durationSeconds, Math.max(0, elapsed));
  }

  private finishAtTimer(): void {
    this.stats.timeSeconds = this.profile.durationSeconds;
    const success = this.stats.objectivesCompleted >= this.profile.quota;
    this.completeRun(
      success,
      success
        ? `Quota cleared: ${this.stats.objectivesCompleted}/${this.profile.quota}`
        : `Quota missed: ${this.stats.objectivesCompleted}/${this.profile.quota}`
    );
  }

  private completeRun(success: boolean, message: string): void {
    if (this.completed) return;
    this.completed = true;
    this.syncTime();
    this.player.setVelocity(0, 0).setAcceleration(0, 0);
    this.opponents.forEach((opponent) => opponent.sprite.active && opponent.sprite.setVelocity(0, 0));
    this.emitHud(success ? 'clear' : 'failed', message);
    emitGameEvent<VrRunGamePayload>(GAME_EVENT.VR_RUN_COMPLETE, {
      missionId: this.mission.id,
      missionTitle: this.mission.title,
      stats: { ...this.stats },
      status: success ? 'clear' : 'failed',
      message
    });
    this.add.text(
      this.cameras.main.scrollX + 480,
      250,
      success ? '1 MIN. BATTLE CLEAR' : '1 MIN. BATTLE FAILED',
      {
        fontFamily: 'monospace', fontSize: '27px', color: success ? '#7cffd8' : '#ff6b6b',
        backgroundColor: '#020710e8', padding: { x: 18, y: 10 }
      }
    ).setOrigin(0.5).setDepth(140);
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
    if (!this.objectiveText?.active) return;
    this.objectiveText.setText(`INFO // ${message}`);
    this.time.delayedCall(950, () => {
      if (!this.completed && this.objectiveText.active) this.updateHud();
    });
  }
}
