import Phaser from 'phaser';
import vrMissionsJson from '../../data/vrMissions.json';
import type {
  Mgs1VrVs12BattleMissionProfile,
  Mgs1VrVs12InventoryEntry,
  Mgs1VrVs12Level,
  Mgs1VrVs12WeaponId,
  VrMissionDefinition,
  VrRunStats
} from '../../types/vr.types';
import { RuntimeInputController } from '../core/RuntimeInput';
import { emitGameEvent, GAME_EVENT, type VrRunGamePayload } from '../core/GameEvents';
import {
  MGS1_VR_ALL_ASSETS,
  resolveMgs1VrEnvironment
} from '../core/mgs1VrEnvironmentRegistry';
import { getMgs1VrVs12BattleProfileForMission } from '../core/mgs1VrVs12BattleRegistry';
import {
  collectVs12Inventory,
  consumeVs12Ammo,
  createVs12AmmoState,
  cycleVs12Weapon,
  selectInitialVs12Weapon,
  type Mgs1VrVs12AmmoState,
  type Mgs1VrVs12SelectedWeapon
} from '../core/mgs1VrVs12Inventory';
import { VR_ACTIVE_MISSION_KEY } from '../core/vrConstants';
import {
  addSpecialPlatform,
  addSpecialVrBackdrop,
  createEmptySpecialStats,
  createSpecialAnimations,
  playSpecialActorAnimation,
  playSpecialVfx
} from './vrSpecialSceneSupport';

type PlayerProjectileKind = Mgs1VrVs12WeaponId | 'enemy_bullet';
type HitSource = Mgs1VrVs12WeaponId | 'unarmed';
type RunStatus = Extract<VrRunGamePayload['status'], 'clear' | 'failed' | 'aborted'>;

interface BattleGuard {
  id: number;
  sprite: Phaser.Physics.Arcade.Sprite;
  hp: number;
  defeated: boolean;
  direction: -1 | 1;
  patrolMin: number;
  patrolMax: number;
  nextAttackAt: number;
}

interface PlacedClaymore {
  sprite: Phaser.Physics.Arcade.Sprite;
  direction: -1 | 1;
}

interface StagePoint {
  x: number;
  y: number;
}

interface StagePlatform {
  x: number;
  y: number;
  width: number;
}

interface Vs12StageLayout {
  playerStart: StagePoint;
  goal: StagePoint;
  platforms: readonly StagePlatform[];
  initialSpawns: readonly StagePoint[];
  reinforcementSpawns: readonly StagePoint[];
}

const vrMissions = vrMissionsJson as VrMissionDefinition[];
const environmentAssetById = new Map(
  MGS1_VR_ALL_ASSETS.map((asset) => [asset.id, asset] as const)
);

const PROJECTILE_TEXTURES: Readonly<Record<Mgs1VrVs12WeaponId, string>> = {
  socom: 'mgs1VrProjectileSocomRound',
  psg1: 'mgs1VrProjectilePsg1Round',
  grenade: 'mgs1VrProjectileGrenade',
  c4: 'mgs1VrProjectileC4Charge',
  claymore: 'mgs1VrProjectileClaymoreMine',
  stinger: 'mgs1VrProjectileStingerMissile',
  nikita: 'mgs1VrProjectileNikitaMissile'
};

const WEAPON_ICON_TEXTURES: Readonly<Record<Mgs1VrVs12WeaponId, string>> = {
  socom: 'mgs1VrWeaponSocom',
  psg1: 'mgs1VrWeaponPsg1',
  grenade: 'mgs1VrWeaponGrenade',
  c4: 'mgs1VrWeaponC4',
  claymore: 'mgs1VrWeaponClaymore',
  stinger: 'mgs1VrWeaponStinger',
  nikita: 'mgs1VrWeaponNikita'
};

const WEAPON_LABELS: Readonly<Record<Mgs1VrVs12SelectedWeapon, string>> = {
  unarmed: 'NO WEAPON',
  socom: 'SOCOM',
  psg1: 'PSG1',
  grenade: 'GRENADE',
  c4: 'C4',
  claymore: 'CLAYMORE',
  stinger: 'STINGER',
  nikita: 'NIKITA'
};

/**
 * Side-view translations of the eight Integral VS. 12 BATTLE maps. The
 * original north/south lanes become raised/lower lanes while each GOAL keeps
 * its documented compass position.
 */
const LEVEL_LAYOUTS: Readonly<Record<Mgs1VrVs12Level, Vs12StageLayout>> = {
  1: {
    playerStart: { x: 1580, y: 468 },
    goal: { x: 950, y: 468 },
    platforms: [
      { x: 430, y: 382, width: 300 },
      { x: 950, y: 348, width: 360 },
      { x: 1470, y: 382, width: 300 }
    ],
    initialSpawns: [
      { x: 300, y: 330 }, { x: 180, y: 468 }, { x: 520, y: 468 }, { x: 1450, y: 330 }
    ],
    reinforcementSpawns: [
      { x: 100, y: 468 }, { x: 430, y: 330 }, { x: 950, y: 296 },
      { x: 1470, y: 330 }, { x: 1800, y: 468 }, { x: 760, y: 468 }
    ]
  },
  2: {
    playerStart: { x: 950, y: 468 },
    goal: { x: 190, y: 468 },
    platforms: [
      { x: 390, y: 390, width: 360 },
      { x: 940, y: 350, width: 300 },
      { x: 1450, y: 410, width: 300 }
    ],
    initialSpawns: [
      { x: 210, y: 468 }, { x: 390, y: 338 }, { x: 940, y: 298 }, { x: 1450, y: 358 }
    ],
    reinforcementSpawns: [
      { x: 80, y: 468 }, { x: 560, y: 468 }, { x: 940, y: 298 },
      { x: 1450, y: 358 }, { x: 1810, y: 468 }, { x: 1180, y: 468 }
    ]
  },
  3: {
    playerStart: { x: 950, y: 468 },
    goal: { x: 1680, y: 306 },
    platforms: [
      { x: 610, y: 410, width: 280 },
      { x: 1080, y: 370, width: 300 },
      { x: 1370, y: 430, width: 220 },
      { x: 1680, y: 358, width: 320 }
    ],
    initialSpawns: [
      { x: 510, y: 358 }, { x: 910, y: 468 }, { x: 1230, y: 318 }, { x: 1680, y: 306 }
    ],
    reinforcementSpawns: [
      { x: 80, y: 468 }, { x: 610, y: 358 }, { x: 1080, y: 318 },
      { x: 1370, y: 378 }, { x: 1680, y: 306 }, { x: 1830, y: 468 }
    ]
  },
  4: {
    playerStart: { x: 1650, y: 468 },
    goal: { x: 850, y: 308 },
    platforms: [
      { x: 350, y: 430, width: 500 },
      { x: 850, y: 360, width: 500 },
      { x: 1400, y: 290, width: 500 },
      { x: 650, y: 220, width: 400 }
    ],
    initialSpawns: [
      { x: 450, y: 378 }, { x: 850, y: 308 }, { x: 1450, y: 238 }, { x: 650, y: 168 }
    ],
    reinforcementSpawns: [
      { x: 80, y: 468 }, { x: 250, y: 378 }, { x: 1050, y: 308 },
      { x: 1650, y: 238 }, { x: 1820, y: 468 }, { x: 1550, y: 468 }
    ]
  },
  5: {
    playerStart: { x: 1650, y: 468 },
    goal: { x: 950, y: 468 },
    platforms: [
      { x: 330, y: 360, width: 340 },
      { x: 950, y: 400, width: 360 },
      { x: 1570, y: 360, width: 340 }
    ],
    initialSpawns: [
      { x: 250, y: 308 }, { x: 610, y: 468 }, { x: 1570, y: 308 }, { x: 950, y: 348 }
    ],
    reinforcementSpawns: [
      { x: 90, y: 468 }, { x: 330, y: 308 }, { x: 760, y: 468 },
      { x: 1140, y: 468 }, { x: 1570, y: 308 }, { x: 1810, y: 468 }
    ]
  },
  6: {
    playerStart: { x: 1710, y: 468 },
    goal: { x: 250, y: 306 },
    platforms: [
      { x: 250, y: 358, width: 460 },
      { x: 740, y: 430, width: 220 },
      { x: 1180, y: 410, width: 300 }
    ],
    initialSpawns: [
      { x: 420, y: 306 }, { x: 740, y: 378 }, { x: 1050, y: 468 }, { x: 1350, y: 358 }
    ],
    reinforcementSpawns: [
      { x: 80, y: 306 }, { x: 250, y: 306 }, { x: 740, y: 378 },
      { x: 1050, y: 468 }, { x: 1500, y: 468 }, { x: 1840, y: 468 }
    ]
  },
  7: {
    playerStart: { x: 1650, y: 468 },
    goal: { x: 950, y: 306 },
    platforms: [
      { x: 560, y: 430, width: 230 },
      { x: 950, y: 358, width: 430 },
      { x: 1340, y: 430, width: 230 }
    ],
    initialSpawns: [
      { x: 950, y: 306 }, { x: 190, y: 468 }, { x: 760, y: 306 }, { x: 430, y: 468 }
    ],
    reinforcementSpawns: [
      { x: 80, y: 468 }, { x: 560, y: 378 }, { x: 820, y: 306 },
      { x: 1080, y: 306 }, { x: 1340, y: 378 }, { x: 1820, y: 468 }
    ]
  },
  8: {
    playerStart: { x: 1650, y: 468 },
    goal: { x: 1650, y: 468 },
    platforms: [
      { x: 460, y: 370, width: 280 },
      { x: 930, y: 410, width: 300 },
      { x: 1400, y: 350, width: 300 }
    ],
    initialSpawns: [
      { x: 930, y: 358 }, { x: 1150, y: 468 }, { x: 600, y: 318 }, { x: 300, y: 468 }
    ],
    reinforcementSpawns: [
      { x: 80, y: 468 }, { x: 460, y: 318 }, { x: 930, y: 358 },
      { x: 1400, y: 298 }, { x: 1810, y: 468 }, { x: 1160, y: 468 }
    ]
  }
};

function getActiveVs12BattleMission(): {
  mission: VrMissionDefinition;
  profile: Mgs1VrVs12BattleMissionProfile;
} {
  const storedId = window.localStorage.getItem(VR_ACTIVE_MISSION_KEY);
  const mission = vrMissions.find((entry) =>
    entry.id === storedId && Boolean(getMgs1VrVs12BattleProfileForMission(entry.id))
  ) ?? vrMissions.find((entry) => Boolean(getMgs1VrVs12BattleProfileForMission(entry.id)));
  const profile = mission ? getMgs1VrVs12BattleProfileForMission(mission.id) : undefined;
  if (!mission || !profile) throw new Error('No MGS1 VR VS. 12 BATTLE mission profile is available.');
  return { mission, profile };
}

/**
 * Runtime for the eight MGS1 Integral VS. 12 BATTLE stages.
 *
 * Four fixed Genome Soldiers open each map. Every defeated guard is replaced
 * until exactly twelve have entered the simulation. Combat alerts are allowed,
 * ammunition is finite, and the GOAL only materializes after the twelfth kill.
 */
export class VRVs12BattleScene extends Phaser.Scene {
  private mission!: VrMissionDefinition;
  private profile!: Mgs1VrVs12BattleMissionProfile;
  private layout!: Vs12StageLayout;
  private stats: VrRunStats = createEmptySpecialStats();
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private guardBodies!: Phaser.Physics.Arcade.Group;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private inputController!: RuntimeInputController;
  private guards: BattleGuard[] = [];
  private c4Charges: Phaser.Physics.Arcade.Sprite[] = [];
  private claymores: PlacedClaymore[] = [];
  private guidedMissile?: Phaser.Physics.Arcade.Sprite;
  private goal?: Phaser.Physics.Arcade.Sprite;
  private ammoCacheBoxes: Phaser.Physics.Arcade.Sprite[] = [];
  private ammo!: Mgs1VrVs12AmmoState;
  private selectedWeapon: Mgs1VrVs12SelectedWeapon = 'unarmed';
  private statusText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private arsenalText!: Phaser.GameObjects.Text;
  private controlsText!: Phaser.GameObjects.Text;
  private weaponIcon?: Phaser.GameObjects.Image;
  private startTime = 0;
  private lastHudEmitAt = 0;
  private lastActionAt = 0;
  private lastDamageAt = 0;
  private nextEnemyShotAt = 0;
  private spawnSequence = 0;
  private reinforcementCursor = 0;
  private completed = false;
  private alertRaised = false;
  private health = 100;

  constructor() {
    super('VRVs12BattleScene');
  }

  create(): void {
    const active = getActiveVs12BattleMission();
    this.mission = active.mission;
    this.profile = active.profile;
    this.layout = LEVEL_LAYOUTS[this.profile.level];
    this.stats = createEmptySpecialStats();
    this.guards = [];
    this.c4Charges = [];
    this.claymores = [];
    this.guidedMissile = undefined;
    this.goal = undefined;
    this.ammoCacheBoxes = [];
    this.completed = false;
    this.alertRaised = false;
    this.health = 100;
    this.spawnSequence = 0;
    this.reinforcementCursor = this.profile.level - 1;
    this.nextEnemyShotAt = 0;
    this.lastActionAt = 0;
    this.lastDamageAt = 0;
    this.ammo = createVs12AmmoState(this.profile.initialInventory);
    this.selectedWeapon = this.profile.startsUnarmed
      ? 'unarmed'
      : selectInitialVs12Weapon(this.ammo);
    this.startTime = performance.now();

    createSpecialAnimations(this);
    this.cameras.main.setViewport(0, 0, 960, 540);
    this.physics.world.setBounds(0, 0, 1900, 540);
    this.cameras.main.setBounds(0, 0, 1900, 540);
    addSpecialVrBackdrop(
      this,
      'MGS1 INTEGRAL // VS. 12 BATTLE // LEVEL ' + String(this.profile.level).padStart(2, '0'),
      { void: 0x081007, grid: 0x79f073, accent: 0xffd85a }
    );
    this.addStageDecor();

    this.platforms = this.physics.add.staticGroup();
    addSpecialPlatform(this, this.platforms, 950, 520, 1900);
    this.layout.platforms.forEach((platform) => {
      addSpecialPlatform(this, this.platforms, platform.x, platform.y, platform.width);
    });

    const playerTexture = this.textures.exists('mgs1VrSolidSnake') ? 'mgs1VrSolidSnake' : 'vrPlayer';
    this.player = this.physics.add.sprite(
      this.layout.playerStart.x,
      this.layout.playerStart.y,
      playerTexture
    ).setDepth(20);
    this.player.setCollideWorldBounds(true).setDragX(1350).setMaxVelocity(285, 580);
    this.player.body?.setSize(28, 48).setOffset(
      Math.max(0, (this.player.width - 28) / 2),
      Math.max(0, this.player.height - 48)
    );
    this.physics.add.collider(this.player, this.platforms);
    playSpecialActorAnimation(this, this.player, 'idle');

    this.guardBodies = this.physics.add.group();
    this.projectiles = this.physics.add.group({ defaultKey: 'bullet', maxSize: 96 });
    this.physics.add.collider(this.projectiles, this.platforms, (projectileObject) => {
      this.handleProjectilePlatformImpact(projectileObject);
    });
    this.physics.add.overlap(this.projectiles, this.player, (projectileObject) => {
      this.handleEnemyProjectileHit(projectileObject);
    });
    this.physics.add.overlap(this.projectiles, this.guardBodies, (projectileObject, guardObject) => {
      this.handlePlayerProjectileHit(projectileObject as Phaser.Physics.Arcade.Sprite, guardObject);
    });

    this.inputController = new RuntimeInputController(this);
    const lerp = this.inputController.profile.reducedMotion ? 1 : 0.1;
    // The arena is exactly one viewport tall. Follow Snake horizontally only
    // so Phaser cannot center the camera below the 540 px VR world.
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.startFollow(this.player, true, lerp, 0);
    this.addHud();
    this.refreshWeaponIcon();
    this.spawnInitialGuards();
    if (this.profile.pickupInventory.length > 0) this.spawnNorthAmmoCache();
    this.emitHud('running', 'VS. 12 BATTLE loaded');
  }

  update(): void {
    if (this.completed) return;
    this.inputController.update();
    this.syncTime();
    if (this.stats.timeSeconds >= this.profile.durationSeconds) {
      this.completeRun('failed', 'Time over before reaching the GOAL');
      return;
    }

    this.handleMovement();
    this.handleWeaponSelection();
    this.handleWeaponAction();
    this.handleGuards();
    this.handleProjectiles();
    this.handleClaymores();
    this.updateHud();

    if (this.inputController.justDown('cancel')) {
      this.completeRun('aborted', 'VS. 12 BATTLE aborted');
      return;
    }
    if (this.time.now > this.lastHudEmitAt + 220) this.emitHud('running', 'VS. 12 BATTLE active');
  }

  private addHud(): void {
    this.statusText = this.add.text(22, 48, '', {
      fontFamily: 'monospace', fontSize: '15px', color: '#d8fff8', backgroundColor: '#020710cc'
    }).setScrollFactor(0).setDepth(110);
    this.objectiveText = this.add.text(22, 76, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#f8f49a', backgroundColor: '#020710cc'
    }).setScrollFactor(0).setDepth(110);
    this.arsenalText = this.add.text(22, 103, '', {
      fontFamily: 'monospace', fontSize: '12px', color: '#a9f5d7', backgroundColor: '#020710cc'
    }).setScrollFactor(0).setDepth(110);
    this.controlsText = this.add.text(22, 500, '', {
      fontFamily: 'monospace', fontSize: '12px', color: '#7cffd8', backgroundColor: '#020710dd'
    }).setScrollFactor(0).setDepth(110);
    this.updateHud();
  }

  private addStageDecor(): void {
    const environment = resolveMgs1VrEnvironment(this.mission.mapVariant);
    environment.placements.forEach((placement) => {
      const asset = environmentAssetById.get(placement.assetId);
      if (!asset || !this.textures.exists(asset.textureKey)) return;
      const image = this.add.image(placement.x, placement.y, asset.textureKey)
        .setDepth(Math.min(-2, placement.depth))
        .setScale(placement.scale)
        .setAlpha(placement.alpha);
      if (placement.flipX) image.setFlipX(true);
    });
  }

  private updateHud(): void {
    const remaining = Math.max(0, this.profile.durationSeconds - this.stats.timeSeconds);
    const activeGuards = this.activeGuards().length;
    const ammoLabel = this.selectedWeapon === 'unarmed'
      ? '--'
      : String(this.ammo[this.selectedWeapon]);
    const objective = this.stats.kills >= this.profile.quota
      ? 'GOAL MATERIALIZED // REACH CHECKPOINT'
      : 'ELIMINATE ALL 12 GENOME SOLDIERS';
    this.statusText.setText(
      'TIME ' + String(remaining).padStart(3, '0')
      + ' // KILLS ' + this.stats.kills + '/12'
      + ' // ACTIVE ' + activeGuards + '/4'
      + ' // HP ' + this.health
    );
    this.objectiveText.setText(
      objective + ' // ' + WEAPON_LABELS[this.selectedWeapon] + ' ' + ammoLabel
    );
    const arsenal = Object.entries(this.ammo)
      .filter(([, count]) => count > 0)
      .map(([weapon, count]) => WEAPON_LABELS[weapon as Mgs1VrVs12WeaponId] + ':' + count)
      .join('  ');
    this.arsenalText.setText('ARSENAL // ' + (arsenal || 'NO AMMUNITION'));
    const action = this.selectedWeapon === 'unarmed'
      ? 'CQC NECK SNAP'
      : this.selectedWeapon === 'c4'
        ? 'FIRE PLANT | CQC DETONATE'
        : this.selectedWeapon === 'nikita'
          ? 'FIRE LAUNCH | CQC DETONATE'
          : 'FIRE ATTACK';
    this.controlsText.setText(
      'MOVE/JUMP/CROUCH | ' + action + ' | CHAFF PREV | RATION NEXT | CANCEL ABORT'
    );
  }

  private refreshWeaponIcon(): void {
    if (this.selectedWeapon === 'unarmed') {
      this.weaponIcon?.setVisible(false);
      return;
    }
    const texture = WEAPON_ICON_TEXTURES[this.selectedWeapon];
    if (!this.textures.exists(texture)) {
      this.weaponIcon?.setVisible(false);
      return;
    }
    if (!this.weaponIcon) {
      this.weaponIcon = this.add.image(930, 62, texture)
        .setOrigin(1, 0.5)
        .setScale(1.15)
        .setScrollFactor(0)
        .setDepth(112);
    } else {
      this.weaponIcon.setTexture(texture).setVisible(true);
    }
  }

  private handleMovement(): void {
    if (this.guidedMissile?.active) {
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

  private handleWeaponSelection(): void {
    if (this.guidedMissile?.active) return;
    let direction: -1 | 1 | undefined;
    if (this.inputController.justDown('chaff')) direction = -1;
    if (this.inputController.justDown('ration')) direction = 1;
    if (!direction) return;
    const retainedWeapons: readonly Mgs1VrVs12WeaponId[] = this.c4Charges.some((charge) => charge.active)
      ? ['c4']
      : [];
    this.selectedWeapon = cycleVs12Weapon(
      this.ammo,
      this.selectedWeapon,
      direction,
      retainedWeapons
    );
    this.refreshWeaponIcon();
    this.flashStatus('EQUIPPED ' + WEAPON_LABELS[this.selectedWeapon]);
  }

  private handleWeaponAction(): void {
    if (this.selectedWeapon === 'unarmed') {
      if (this.inputController.justDown('cqc')) this.performNeckSnap();
      return;
    }
    if (this.selectedWeapon === 'c4') {
      if (this.inputController.justDown('fire')) this.plantC4();
      if (this.inputController.justDown('cqc')) this.detonateC4();
      return;
    }
    if (this.selectedWeapon === 'nikita') {
      if (this.guidedMissile?.active && this.inputController.justDown('cqc')) {
        this.explodeProjectile(this.guidedMissile);
      } else if (!this.guidedMissile?.active && this.inputController.justDown('fire')) {
        this.launchMissile('nikita');
      }
      return;
    }
    if (!this.inputController.justDown('fire')) return;
    if (this.selectedWeapon === 'socom') this.fireBallistic('socom', 700, 1, 210);
    else if (this.selectedWeapon === 'psg1') this.fireBallistic('psg1', 1120, 3, 500);
    else if (this.selectedWeapon === 'grenade') this.throwGrenade();
    else if (this.selectedWeapon === 'claymore') this.plantClaymore();
    else if (this.selectedWeapon === 'stinger') this.launchMissile('stinger');
  }

  private consumeSelectedAmmo(cooldown: number): boolean {
    if (this.selectedWeapon === 'unarmed' || this.time.now < this.lastActionAt + cooldown) return false;
    const result = consumeVs12Ammo(this.ammo, this.selectedWeapon);
    if (!result.consumed) {
      this.flashStatus('NO ' + WEAPON_LABELS[this.selectedWeapon] + ' AMMUNITION');
      return false;
    }
    this.lastActionAt = this.time.now;
    this.ammo = result.state;
    this.stats.shotsFired += 1;
    return true;
  }

  private performNeckSnap(): void {
    if (this.time.now < this.lastActionAt + 420) return;
    this.lastActionAt = this.time.now;
    this.stats.shotsFired += 1;
    const direction = this.player.flipX ? -1 : 1;
    const strikeX = this.player.x + direction * 38;
    const guard = this.nearestGuard(strikeX, this.player.y, 66);
    playSpecialActorAnimation(this, this.player, 'attack', 260);
    playSpecialVfx(this, 'mgs1VrVfxNinjaSlash', strikeX, this.player.y - 4, {
      flipX: direction < 0, scale: 0.55
    });
    if (!guard) return;
    this.stats.neutralizations += 1;
    this.hitGuard(guard, 3, 'unarmed');
  }

  private fireBallistic(
    kind: 'socom' | 'psg1',
    speed: number,
    damage: number,
    cooldown: number
  ): void {
    if (!this.consumeSelectedAmmo(cooldown)) return;
    this.raiseCombatAlert(WEAPON_LABELS[kind] + ' gunfire');
    const direction = this.player.flipX ? -1 : 1;
    const verticalAim = kind === 'psg1'
      ? this.inputController.isDown('jump') ? -1 : this.inputController.isDown('crouch') ? 1 : 0
      : 0;
    const velocityY = verticalAim * 330;
    const projectile = this.spawnProjectile(kind, this.player.x + direction * 28, this.player.y - 14);
    projectile
      .setVelocity(direction * speed, velocityY)
      .setRotation(Math.atan2(velocityY, direction * speed))
      .setData('damage', damage)
      .setData('expiresAt', this.time.now + 2100);
    playSpecialActorAnimation(this, this.player, 'attack', 150);
    playSpecialVfx(this, 'mgs1VrVfxMuzzleFlash', projectile.x, projectile.y, {
      flipX: direction < 0
    });
  }

  private throwGrenade(): void {
    if (!this.consumeSelectedAmmo(420)) return;
    this.raiseCombatAlert('Grenade thrown');
    const direction = this.player.flipX ? -1 : 1;
    const grenade = this.spawnProjectile('grenade', this.player.x + direction * 24, this.player.y - 20);
    grenade
      .setVelocity(direction * 340, -390)
      .setDragX(55)
      .setBounce(0.42)
      .setData('blastRadius', 150)
      .setData('damage', 3)
      .setData('expiresAt', this.time.now + 1900);
    playSpecialActorAnimation(this, this.player, 'attack', 210);
  }

  private plantC4(): void {
    if (!this.consumeSelectedAmmo(260)) return;
    const direction = this.player.flipX ? -1 : 1;
    const texture = this.textures.exists(PROJECTILE_TEXTURES.c4)
      ? PROJECTILE_TEXTURES.c4
      : 'bullet';
    const charge = this.physics.add.sprite(
      this.player.x + direction * 34,
      this.player.y + 18,
      texture
    ).setDepth(18);
    (charge.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    charge.setImmovable(true);
    this.c4Charges.push(charge);
    playSpecialActorAnimation(this, this.player, 'attack', 180);
  }

  private detonateC4(): void {
    const charge = this.c4Charges.find((entry) => entry.active);
    if (!charge) {
      this.flashStatus('NO C4 CHARGE PLANTED');
      return;
    }
    this.raiseCombatAlert('C4 detonation');
    this.explodeAt(charge.x, charge.y, 175, 4, 'c4');
    charge.destroy();
  }

  private plantClaymore(): void {
    if (!this.consumeSelectedAmmo(300)) return;
    const direction = this.player.flipX ? -1 : 1;
    const texture = this.textures.exists(PROJECTILE_TEXTURES.claymore)
      ? PROJECTILE_TEXTURES.claymore
      : 'bullet';
    const sprite = this.physics.add.sprite(
      this.player.x + direction * 34,
      this.player.y + 20,
      texture
    ).setDepth(18);
    (sprite.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    sprite.setImmovable(true).setFlipX(direction < 0);
    this.claymores.push({ sprite, direction });
    playSpecialActorAnimation(this, this.player, 'attack', 180);
  }

  private launchMissile(kind: 'stinger' | 'nikita'): void {
    if (!this.consumeSelectedAmmo(kind === 'stinger' ? 650 : 520)) return;
    this.raiseCombatAlert(WEAPON_LABELS[kind] + ' launch');
    const direction = this.player.flipX ? -1 : 1;
    const missile = this.spawnProjectile(kind, this.player.x + direction * 36, this.player.y - 18);
    missile
      .setVelocityX(direction * (kind === 'stinger' ? 430 : 330))
      .setData('direction', direction)
      .setData('blastRadius', kind === 'stinger' ? 190 : 165)
      .setData('damage', 4)
      .setData('expiresAt', this.time.now + (kind === 'stinger' ? 3500 : 4300));
    if (kind === 'nikita') {
      this.guidedMissile = missile;
      this.cameras.main.startFollow(missile, true, 0.12, 0);
    }
    playSpecialActorAnimation(this, this.player, 'attack', 230);
    playSpecialVfx(this, 'mgs1VrVfxMissileTrail', missile.x - direction * 18, missile.y, {
      flipX: direction < 0, duration: 260
    });
  }

  private spawnProjectile(
    kind: PlayerProjectileKind,
    x: number,
    y: number
  ): Phaser.Physics.Arcade.Sprite {
    const textureKey = kind === 'enemy_bullet'
      ? (this.textures.exists('mgs1VrProjectileSocomRound')
        ? 'mgs1VrProjectileSocomRound'
        : 'enemyBullet')
      : (this.textures.exists(PROJECTILE_TEXTURES[kind])
        ? PROJECTILE_TEXTURES[kind]
        : 'bullet');
    const projectile = this.projectiles.get(x, y, textureKey) as Phaser.Physics.Arcade.Sprite;
    projectile
      .enableBody(true, x, y, true, true)
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
    projectile
      .setData('kind', kind)
      .setData('owner', kind === 'enemy_bullet' ? 'enemy' : 'player');
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
      if (
        expiresAt <= this.time.now
        || projectile.x < -60
        || projectile.x > 1960
        || projectile.y < -80
        || projectile.y > 620
      ) {
        if (kind !== 'enemy_bullet' && projectile.getData('blastRadius')) {
          this.explodeProjectile(projectile);
        } else {
          projectile.disableBody(true, true);
        }
      }
    });
  }

  private steerStinger(missile: Phaser.Physics.Arcade.Sprite): void {
    const target = this.nearestGuard(missile.x, missile.y, 900);
    if (!target) return;
    const angle = Phaser.Math.Angle.Between(
      missile.x, missile.y, target.sprite.x, target.sprite.y
    );
    this.physics.velocityFromRotation(angle, 470, missile.body?.velocity);
    missile.setRotation(angle).setFlipY(Math.abs(angle) > Math.PI / 2);
  }

  private steerNikita(missile: Phaser.Physics.Arcade.Sprite): void {
    let direction = (missile.getData('direction') as -1 | 1 | undefined) ?? 1;
    if (this.inputController.isDown('moveLeft')) direction = -1;
    else if (this.inputController.isDown('moveRight')) direction = 1;
    missile.setData('direction', direction);
    const vertical = this.inputController.isDown('jump')
      ? -1
      : this.inputController.isDown('crouch') ? 1 : 0;
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

  private handlePlayerProjectileHit(
    projectile: Phaser.Physics.Arcade.Sprite,
    guardObject: unknown
  ): void {
    if (!projectile.active || projectile.getData('owner') !== 'player') return;
    const guard = this.guards.find((entry) => entry.sprite === guardObject && !entry.defeated);
    if (!guard) return;
    if (projectile.getData('blastRadius')) {
      this.explodeProjectile(projectile);
      return;
    }
    const kind = (projectile.getData('kind') as Mgs1VrVs12WeaponId | undefined) ?? 'socom';
    const damage = (projectile.getData('damage') as number | undefined) ?? 1;
    projectile.disableBody(true, true);
    playSpecialVfx(this, 'mgs1VrVfxBulletImpact', guard.sprite.x, guard.sprite.y, { scale: 0.8 });
    this.hitGuard(guard, damage, kind);
  }

  private handleEnemyProjectileHit(projectileObject: unknown): void {
    const projectile = projectileObject as Phaser.Physics.Arcade.Sprite;
    if (!projectile.active || projectile.getData('owner') !== 'enemy') return;
    const damage = (projectile.getData('damage') as number | undefined) ?? 6;
    projectile.disableBody(true, true);
    this.damagePlayer(damage, 'Genome Soldier fire');
  }

  private explodeProjectile(projectile: Phaser.Physics.Arcade.Sprite): void {
    if (!projectile.active) return;
    const kind = (projectile.getData('kind') as Mgs1VrVs12WeaponId | undefined) ?? 'grenade';
    const radius = (projectile.getData('blastRadius') as number | undefined) ?? 145;
    const damage = (projectile.getData('damage') as number | undefined) ?? 3;
    const x = projectile.x;
    const y = projectile.y;
    projectile.disableBody(true, true);
    if (projectile === this.guidedMissile) {
      this.guidedMissile = undefined;
      const lerp = this.inputController.profile.reducedMotion ? 1 : 0.1;
      this.cameras.main.startFollow(this.player, true, lerp, 0);
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
    this.raiseCombatAlert(WEAPON_LABELS[source]);
    this.activeGuards().forEach((guard) => {
      if (Phaser.Math.Distance.Between(x, y, guard.sprite.x, guard.sprite.y) <= radius) {
        this.hitGuard(guard, damage, source);
      }
    });
    if (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) <= radius * 0.62) {
      this.damagePlayer(10, WEAPON_LABELS[source] + ' blast');
    }
  }

  private spawnInitialGuards(): void {
    this.layout.initialSpawns.slice(0, this.profile.maxActiveEnemies).forEach((point) => {
      this.spawnGuard(point);
    });
  }

  private spawnGuard(point?: StagePoint): void {
    if (this.spawnSequence >= this.profile.quota || this.completed) return;
    const spawn = point ?? this.chooseReinforcementSpawn();
    this.spawnSequence += 1;
    const texture = this.textures.exists('mgs1VrGenomeSoldier')
      ? 'mgs1VrGenomeSoldier'
      : 'vrGuard';
    const sprite = this.physics.add.sprite(spawn.x, spawn.y, texture)
      .setDepth(17)
      .setCollideWorldBounds(true);
    sprite.body?.setSize(
      Math.min(34, Math.max(18, sprite.width)),
      Math.min(52, Math.max(18, sprite.height))
    );
    this.guardBodies.add(sprite);
    this.physics.add.collider(sprite, this.platforms);
    playSpecialActorAnimation(this, sprite, 'idle');
    const patrolRadius = 110 + (this.profile.level % 3) * 24;
    const guard: BattleGuard = {
      id: this.spawnSequence,
      sprite,
      hp: 3,
      defeated: false,
      direction: spawn.x < this.player.x ? 1 : -1,
      patrolMin: Math.max(60, spawn.x - patrolRadius),
      patrolMax: Math.min(1840, spawn.x + patrolRadius),
      nextAttackAt: this.time.now + 900 + ((this.spawnSequence * 317 + this.profile.level * 131) % 1100)
    };
    this.guards.push(guard);
  }

  private chooseReinforcementSpawn(): StagePoint {
    const candidates = this.layout.reinforcementSpawns;
    // Integral chooses later reinforcements according to Snake's position.
    // Prefer a distant/off-camera entry while the seeded cursor keeps tests
    // deterministic for each level.
    const farCandidates = candidates.filter((point) => Math.abs(point.x - this.player.x) > 520);
    const pool = farCandidates.length > 0 ? farCandidates : candidates;
    const point = pool[this.reinforcementCursor % pool.length];
    this.reinforcementCursor += this.profile.level + 1;
    return point;
  }

  private handleGuards(): void {
    this.activeGuards().forEach((guard) => {
      const distanceX = this.player.x - guard.sprite.x;
      const distanceY = Math.abs(this.player.y - guard.sprite.y);
      const direction: -1 | 1 = distanceX < 0 ? -1 : 1;
      if (!this.alertRaised && Math.abs(distanceX) < 390 && distanceY < 92) {
        this.raiseCombatAlert('Genome Soldier visual contact');
      }

      if (this.alertRaised) {
        guard.direction = direction;
        const distance = Math.abs(distanceX);
        guard.sprite.setVelocityX(distance > 235 ? direction * 70 : 0);
        guard.sprite.setFlipX(direction < 0);
        playSpecialActorAnimation(this, guard.sprite, distance > 235 ? 'move' : 'idle');
        const canFire = distance < 650 && distanceY < 105;
        if (
          canFire
          && this.time.now >= guard.nextAttackAt
          && this.time.now >= this.nextEnemyShotAt
        ) {
          this.fireGuardRound(guard, direction);
        }
        return;
      }

      if (guard.sprite.x <= guard.patrolMin) guard.direction = 1;
      if (guard.sprite.x >= guard.patrolMax) guard.direction = -1;
      guard.sprite.setVelocityX(guard.direction * 46).setFlipX(guard.direction < 0);
      playSpecialActorAnimation(this, guard.sprite, 'move');
    });
  }

  private fireGuardRound(guard: BattleGuard, direction: -1 | 1): void {
    this.nextEnemyShotAt = this.time.now + 820;
    guard.nextAttackAt = this.time.now
      + 1450
      + ((guard.id * 173 + this.profile.level * 89) % 900);
    const bullet = this.spawnProjectile(
      'enemy_bullet',
      guard.sprite.x + direction * 24,
      guard.sprite.y - 16
    );
    bullet
      .setVelocityX(direction * 440)
      .setData('damage', 6)
      .setData('expiresAt', this.time.now + 2100);
    playSpecialActorAnimation(this, guard.sprite, 'attack', 210);
    playSpecialVfx(this, 'mgs1VrVfxMuzzleFlash', bullet.x, bullet.y, {
      flipX: direction < 0, scale: 0.8
    });
  }

  private raiseCombatAlert(source: string): void {
    if (this.alertRaised) return;
    this.alertRaised = true;
    this.stats.alerts += 1;
    this.flashStatus('ALERT // ' + source.toUpperCase());
  }

  private handleClaymores(): void {
    this.claymores.forEach((mine) => {
      if (!mine.sprite.active) return;
      const victim = this.activeGuards().find((guard) => {
        const relative = guard.sprite.x - mine.sprite.x;
        return Math.sign(relative) === mine.direction
          && Math.abs(relative) < 110
          && Math.abs(guard.sprite.y - mine.sprite.y) < 92;
      });
      if (!victim) return;
      this.raiseCombatAlert('Claymore detonation');
      this.explodeAt(mine.sprite.x + mine.direction * 45, mine.sprite.y - 10, 145, 3, 'claymore');
      mine.sprite.destroy();
    });
  }

  private hitGuard(guard: BattleGuard, damage: number, source: HitSource): void {
    if (guard.defeated) return;
    this.stats.hits += 1;
    guard.hp -= damage;
    guard.sprite.setTint(0xffe58a);
    playSpecialActorAnimation(this, guard.sprite, 'hit', 120);
    this.time.delayedCall(95, () => {
      if (!guard.defeated && guard.sprite.active) guard.sprite.clearTint();
    });
    if (guard.hp > 0) return;
    this.defeatGuard(guard, source);
  }

  private defeatGuard(guard: BattleGuard, source: HitSource): void {
    if (guard.defeated) return;
    guard.defeated = true;
    guard.sprite.setVelocity(0, 0);
    guard.sprite.disableBody(false, false);
    guard.sprite.setTint(0xff6f6f);
    playSpecialActorAnimation(this, guard.sprite, 'death', 360);
    this.stats.kills += 1;
    this.stats.objectivesCompleted += 1;
    if (source === 'unarmed') {
      const direction = this.player.flipX ? -1 : 1;
      this.tweens.add({
        targets: guard.sprite,
        x: guard.sprite.x + direction * 76,
        y: guard.sprite.y - 42,
        angle: direction * 68,
        duration: 220,
        ease: 'Quad.easeOut'
      });
    }
    this.inputController.vibrate(55, 0.32, 0.23);
    this.time.delayedCall(310, () => {
      if (guard.sprite.active) guard.sprite.destroy();
      if (this.stats.kills < this.profile.quota) this.refillGuardWave();
    });
    if (this.stats.kills >= this.profile.quota) this.materializeGoal();
  }

  private refillGuardWave(): void {
    if (this.completed) return;
    const activeCount = this.activeGuards().length;
    const remainingToSpawn = this.profile.quota - this.spawnSequence;
    const desired = Math.min(this.profile.maxActiveEnemies - activeCount, remainingToSpawn);
    for (let index = 0; index < desired; index += 1) this.spawnGuard();
  }

  private activeGuards(): BattleGuard[] {
    return this.guards.filter((guard) => !guard.defeated && guard.sprite.active);
  }

  private nearestGuard(x: number, y: number, maximumDistance: number): BattleGuard | undefined {
    return this.activeGuards()
      .map((guard) => ({
        guard,
        distance: Phaser.Math.Distance.Between(x, y, guard.sprite.x, guard.sprite.y)
      }))
      .filter((entry) => entry.distance <= maximumDistance)
      .sort((a, b) => a.distance - b.distance)[0]?.guard;
  }

  private spawnNorthAmmoCache(): void {
    const centerX = this.layout.goal.x;
    const entries = this.profile.pickupInventory;
    const canonicalOffsets: readonly StagePoint[] = [
      { x: -36, y: -18 },
      { x: 36, y: -18 },
      { x: -36, y: 4 },
      { x: 36, y: 4 },
      { x: 0, y: 24 }
    ];
    entries.forEach((entry, index) => {
      const offset = canonicalOffsets[index] ?? { x: index * 48, y: 0 };
      // The original north-west cache is a compact 2-2-1 stack of five boxes.
      const x = centerX + offset.x;
      const y = this.layout.goal.y + offset.y;
      const texture = this.textures.exists('mgs1VrEnvHazardAmmoPackage')
        ? 'mgs1VrEnvHazardAmmoPackage'
        : 'bullet';
      const box = this.physics.add.sprite(x, y, texture).setDepth(19);
      (box.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
      box.setImmovable(true).setData('weapon', entry.weapon).setData('ammo', entry.ammo);
      this.ammoCacheBoxes.push(box);
      const label = this.add.text(x, y - 30, WEAPON_LABELS[entry.weapon], {
        fontFamily: 'monospace', fontSize: '10px', color: '#fff29a', backgroundColor: '#06110bdd'
      }).setOrigin(0.5).setDepth(20);
      box.setData('label', label);
      this.physics.add.overlap(this.player, box, () => this.collectAmmoBox(box, entry));
    });
    this.flashStatus('NORTH AMMUNITION CACHE LOCATED');
  }

  private collectAmmoBox(
    box: Phaser.Physics.Arcade.Sprite,
    entry: Mgs1VrVs12InventoryEntry
  ): void {
    if (!box.active) return;
    const pickupX = box.x;
    const pickupY = box.y;
    const label = box.getData('label') as Phaser.GameObjects.Text | undefined;
    this.ammo = collectVs12Inventory(this.ammo, [entry]);
    label?.destroy();
    box.destroy();
    if (this.selectedWeapon === 'unarmed') this.selectedWeapon = entry.weapon;
    this.refreshWeaponIcon();
    playSpecialVfx(this, 'mgs1VrVfxGoalMaterialize', pickupX, pickupY - 10, { scale: 0.45 });
    this.flashStatus(WEAPON_LABELS[entry.weapon] + ' AMMO +' + entry.ammo);
  }

  private materializeGoal(): void {
    if (this.goal || this.completed) return;
    const texture = this.textures.exists('mgs1VrEnvHazardGoalBeacon')
      ? 'mgs1VrEnvHazardGoalBeacon'
      : 'vrGoalBeaconFallback';
    this.goal = this.physics.add.sprite(this.layout.goal.x, this.layout.goal.y, texture).setDepth(18);
    (this.goal.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    this.goal.setImmovable(true);
    this.physics.add.overlap(this.player, this.goal, () => {
      if (this.stats.kills >= this.profile.quota) {
        this.completeRun('clear', 'Twelve guards eliminated // GOAL reached');
      }
    });
    playSpecialVfx(this, 'mgs1VrVfxGoalMaterialize', this.goal.x, this.goal.y - 8, { scale: 1.05 });
    this.flashStatus('GOAL MATERIALIZED // REACH CHECKPOINT');
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
    if (this.health <= 0) this.completeRun('failed', 'Operator down: ' + source);
  }

  private syncTime(): void {
    const elapsed = Math.floor((performance.now() - this.startTime) / 1000);
    this.stats.timeSeconds = Math.min(this.profile.durationSeconds, Math.max(0, elapsed));
  }

  private completeRun(status: RunStatus, message: string): void {
    if (this.completed) return;
    this.completed = true;
    this.syncTime();
    this.player.setVelocity(0, 0).setAcceleration(0, 0);
    this.activeGuards().forEach((guard) => guard.sprite.setVelocity(0, 0));
    this.emitHud(status, message);
    emitGameEvent<VrRunGamePayload>(GAME_EVENT.VR_RUN_COMPLETE, {
      missionId: this.mission.id,
      missionTitle: this.mission.title,
      stats: { ...this.stats },
      status,
      message
    });
    this.add.text(
      this.cameras.main.scrollX + 480,
      250,
      status === 'clear' ? 'VS. 12 BATTLE CLEAR' : 'VS. 12 BATTLE FAILED',
      {
        fontFamily: 'monospace',
        fontSize: '27px',
        color: status === 'clear' ? '#7cffd8' : '#ff6b6b',
        backgroundColor: '#020710e8',
        padding: { x: 18, y: 10 }
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
    this.objectiveText.setText('INFO // ' + message);
    this.time.delayedCall(950, () => {
      if (!this.completed && this.objectiveText.active) this.updateHud();
    });
  }
}
