import Phaser from 'phaser';
import type { VrMissionDefinition, VrRunStats } from '../../types/vr.types';
import { RuntimeInputController } from '../core/RuntimeInput';
import { emitGameEvent, GAME_EVENT, type VrRunGamePayload } from '../core/GameEvents';
import { getMgs1VrSpecialProfileForMission } from '../core/mgs1VrSpecialModeRegistry';
import {
  addSpecialPlatform,
  addSpecialVrBackdrop,
  createEmptySpecialStats,
  createSpecialAnimations,
  getActiveSpecialMission,
  playSpecialActorAnimation,
  playSpecialVfx
} from './vrSpecialSceneSupport';

type NinjaStage = 1 | 2 | 3;

const SNAKE_HUNT_SAFE_ZONE_END = 165;

interface NinjaEnemy {
  sprite: Phaser.Physics.Arcade.Sprite;
  id: string;
  isSnake: boolean;
  disabled: boolean;
  patrolMin: number;
  patrolMax: number;
  direction: -1 | 1;
  nextShotAt: number;
}

function resolveNinjaStage(mission: VrMissionDefinition): NinjaStage {
  const normalized = `${mission.id} ${mission.title} ${mission.mapVariant}`.toLowerCase();
  if (/ninja[^0-9]*0?3|assass|identify/.test(normalized)) return 3;
  if (/ninja[^0-9]*0?2|30|enemy/.test(normalized)) return 2;
  return 1;
}

/**
 * Canon-inspired Cyborg Ninja runtime for Integral's three Ninja stages.
 * Each special ability spends the same shared energy meter so stealth and
 * Body Disruption cannot be held indefinitely.
 */
export class VRNinjaScene extends Phaser.Scene {
  private mission!: VrMissionDefinition;
  private stage: NinjaStage = 1;
  private stats: VrRunStats = createEmptySpecialStats();
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private enemyBullets!: Phaser.Physics.Arcade.Group;
  private inputController!: RuntimeInputController;
  private enemies: NinjaEnemy[] = [];
  private poles: Phaser.Physics.Arcade.Sprite[] = [];
  private exitPad?: Phaser.Physics.Arcade.Sprite;
  private hudText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private stealthOverlay?: Phaser.GameObjects.Sprite;
  private startTime = 0;
  private lastHudEmitAt = 0;
  private lastSlashAt = 0;
  private lastDisruptionAt = 0;
  private completed = false;
  private stealthEnergy = 100;
  private health = 100;
  private slashed = 0;
  private spawnedEnemies = 0;
  private defeatedEnemies = 0;
  private crossSlashActive = false;
  private disruptionUntil = 0;

  constructor() {
    super('VRNinjaScene');
  }

  create(): void {
    this.mission = getActiveSpecialMission('ninja');
    const profile = getMgs1VrSpecialProfileForMission(this.mission.id);
    this.stage = profile?.mode === 'ninja' ? profile.level as NinjaStage : resolveNinjaStage(this.mission);
    this.stats = createEmptySpecialStats();
    this.enemies = [];
    this.poles = [];
    this.completed = false;
    this.stealthEnergy = 100;
    this.health = 100;
    this.slashed = 0;
    this.spawnedEnemies = 0;
    this.defeatedEnemies = 0;
    this.crossSlashActive = false;
    this.disruptionUntil = 0;
    this.startTime = performance.now();

    createSpecialAnimations(this);
    this.cameras.main.setViewport(0, 0, 960, 540);
    this.physics.world.setBounds(0, 0, 1900, 540);
    this.cameras.main.setBounds(0, 0, 1900, 540);
    addSpecialVrBackdrop(this, `MGS1 INTEGRAL // NINJA ${String(this.stage).padStart(2, '0')}`, {
      void: 0x020710,
      grid: 0x38f5ff,
      accent: 0x57ffb0
    });

    this.platforms = this.physics.add.staticGroup();
    addSpecialPlatform(this, this.platforms, 950, 520, 1900);
    addSpecialPlatform(this, this.platforms, 400, 395, 300);
    addSpecialPlatform(this, this.platforms, 930, 350, 300);
    addSpecialPlatform(this, this.platforms, 1450, 405, 300);

    const texture = this.textures.exists('mgs1VrCyborgNinja') ? 'mgs1VrCyborgNinja' : 'vrPlayer';
    this.player = this.physics.add.sprite(90, 450, texture).setDepth(20);
    this.player.setCollideWorldBounds(true).setDragX(1350).setMaxVelocity(300, 590);
    this.player.body?.setSize(28, 58).setOffset(18, 5);
    this.physics.add.collider(this.player, this.platforms);
    playSpecialActorAnimation(this, this.player, 'idle');

    this.enemyBullets = this.physics.add.group({ defaultKey: 'enemyBullet', maxSize: 48 });
    this.physics.add.collider(this.enemyBullets, this.platforms, (bullet) => this.destroyObject(bullet));
    this.physics.add.overlap(this.enemyBullets, this.player, (player, bullet) => this.handleBulletHit(player, bullet));

    this.inputController = new RuntimeInputController(this);
    const lerp = this.inputController.profile.reducedMotion ? 1 : 0.1;
    this.cameras.main.startFollow(this.player, true, lerp, lerp);
    this.addHud();
    this.configureStage();
    this.emitHud('running', `Ninja stage ${this.stage} loaded`);
  }

  update(_time: number, delta: number): void {
    if (this.completed) return;
    this.inputController.update();
    this.syncTime();
    this.handleMovement();
    this.handleNinjaActions(delta);
    this.handleEnemies();
    this.handleBullets();
    this.updateHud();
    if (this.inputController.justDown('cancel')) this.completeRun(false, 'Ninja stage aborted');
    if (this.time.now > this.lastHudEmitAt + 240) this.emitHud('running', 'Ninja simulation active');
  }

  private configureStage(): void {
    if (this.stage === 1) {
      this.objectiveText.setText('OBJECTIVE // SLASH ALL 15 TARGET POLES');
      const points = [
        [180, 470], [280, 470], [390, 345], [500, 345], [610, 470],
        [740, 470], [850, 300], [960, 300], [1070, 470], [1190, 470],
        [1360, 355], [1470, 355], [1580, 470], [1700, 470], [1810, 470]
      ];
      points.forEach(([x, y], index) => this.spawnPole(index + 1, x, y));
      [350, 780, 1220, 1650].forEach((x, index) => this.spawnEnemy(`patrol-${index + 1}`, x, 468));
      return;
    }

    if (this.stage === 2) {
      this.objectiveText.setText('OBJECTIVE // ELIMINATE 30 GENOME SOLDIERS');
      this.spawnEnemyWave();
      return;
    }

    this.objectiveText.setText('OBJECTIVE // IDENTIFY AND ASSASSINATE SNAKE ONLY');
    const positions = [210, 355, 500, 645, 790, 935, 1080, 1225, 1370, 1515, 1680];
    const snakeIndex = 7;
    positions.forEach((x, index) => this.spawnEnemy(`suspect-${index + 1}`, x, 468, index === snakeIndex));
    this.add.text(1110, 105, 'BODY DISRUPTION REVEALS A BRIEF ELECTRICAL TELL\nWRONG TARGET OR DETECTION = FAILURE', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#f8f49a',
      align: 'right'
    }).setScrollFactor(0).setDepth(100);
  }

  private spawnPole(index: number, x: number, y: number): void {
    const texture = this.textures.exists('mgs1VrNinjaPoleIntact') ? 'mgs1VrNinjaPoleIntact' : 'crate';
    const pole = this.physics.add.sprite(x, y, texture).setDepth(12).setImmovable(true).setData('poleId', index);
    (pole.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    this.poles.push(pole);
  }

  private spawnEnemy(id: string, x: number, y: number, isSnake = false): NinjaEnemy {
    const animatedTexture = this.textures.exists('mgs1VrGenomeSoldier') ? 'mgs1VrGenomeSoldier' : 'vrGuard';
    const disguiseTexture = this.textures.exists('mgs1VrSnakeDisguise') ? 'mgs1VrSnakeDisguise' : animatedTexture;
    const texture = isSnake ? disguiseTexture : animatedTexture;
    const sprite = this.physics.add.sprite(x, y, texture).setDepth(16).setCollideWorldBounds(true);
    sprite.setDragX(900).setMaxVelocity(105, 500).setData('enemyId', id);
    sprite.body?.setSize(28, 52).setOffset(Math.max(0, (sprite.width - 28) / 2), Math.max(0, sprite.height - 52));
    this.physics.add.collider(sprite, this.platforms);
    playSpecialActorAnimation(this, sprite, 'idle');
    const enemy: NinjaEnemy = {
      sprite,
      id,
      isSnake,
      disabled: false,
      patrolMin: Math.max(90, x - 95),
      patrolMax: Math.min(1810, x + 95),
      direction: id.length % 2 === 0 ? -1 : 1,
      nextShotAt: this.time.now + 900 + Phaser.Math.Between(0, 800)
    };
    this.enemies.push(enemy);
    return enemy;
  }

  private spawnEnemyWave(): void {
    if (this.stage !== 2 || this.spawnedEnemies >= 30 || this.completed) return;
    const active = this.enemies.filter((enemy) => !enemy.disabled).length;
    const amount = Math.min(6 - active, 30 - this.spawnedEnemies);
    const spawnPoints = [320, 560, 820, 1100, 1390, 1660];
    for (let index = 0; index < amount; index += 1) {
      const sequence = this.spawnedEnemies + 1;
      this.spawnEnemy(`wave-${sequence}`, spawnPoints[(sequence - 1) % spawnPoints.length], 468);
      this.spawnedEnemies += 1;
    }
  }

  private handleMovement(): void {
    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (left === right) {
      this.player.setAccelerationX(0);
      if (!this.crossSlashActive) playSpecialActorAnimation(this, this.player, 'idle');
    } else {
      const direction = left ? -1 : 1;
      this.player.setAccelerationX(direction * 1450).setFlipX(direction < 0);
      if (!this.crossSlashActive) playSpecialActorAnimation(this, this.player, 'move');
    }

    if (this.inputController.justDown('jump') && body.blocked.down) {
      const forward = this.player.flipX ? -1 : 1;
      this.player.setVelocity(forward * 265, -465);
      playSpecialVfx(this, 'mgs1VrVfxStealthShimmer', this.player.x, this.player.y, { scale: 0.8, duration: 180 });
    }
  }

  private handleNinjaActions(delta: number): void {
    this.crossSlashActive = this.inputController.isDown('cqc') && this.stealthEnergy > 0;
    if (this.crossSlashActive) {
      this.stealthEnergy = Math.max(0, this.stealthEnergy - delta * 0.018);
      playSpecialActorAnimation(this, this.player, 'slash', 80);
    }

    const stealthActive = this.inputController.isDown('ration') && this.stealthEnergy > 0;
    if (stealthActive) {
      this.stealthEnergy = Math.max(0, this.stealthEnergy - delta * 0.008);
      this.player.setAlpha(0.28);
      if (!this.stealthOverlay || !this.stealthOverlay.active) {
        this.stealthOverlay = playSpecialVfx(this, 'mgs1VrVfxStealthShimmer', this.player.x, this.player.y, { duration: 700 });
      }
    } else {
      this.player.setAlpha(1);
      if (!this.crossSlashActive) this.stealthEnergy = Math.min(100, this.stealthEnergy + delta * 0.012);
    }
    if (this.stealthOverlay?.active) this.stealthOverlay.setPosition(this.player.x, this.player.y);

    if (this.inputController.justDown('fire')) this.performSlash();
    if (this.inputController.justDown('chaff')) this.performBodyDisruption();
  }

  private performSlash(): void {
    if (this.time.now < this.lastSlashAt + 210) return;
    this.lastSlashAt = this.time.now;
    const direction = this.player.flipX ? -1 : 1;
    const slashX = this.player.x + direction * 42;
    playSpecialActorAnimation(this, this.player, 'slash', 210);
    playSpecialVfx(this, 'mgs1VrVfxNinjaSlash', slashX, this.player.y - 6, { flipX: direction < 0 });
    this.inputController.vibrate(65, 0.35, 0.25);
    this.stats.shotsFired += 1;

    if (this.stage === 1) {
      const pole = this.poles.find((candidate) => candidate.active
        && Math.abs(candidate.x - slashX) <= 52
        && Math.abs(candidate.y - this.player.y) <= 100);
      if (pole) this.cutPole(pole);
      return;
    }

    const enemy = this.enemies.find((candidate) => !candidate.disabled
      && Math.abs(candidate.sprite.x - slashX) <= 58
      && Math.abs(candidate.sprite.y - this.player.y) <= 80);
    if (enemy) this.slashEnemy(enemy);
  }

  private cutPole(pole: Phaser.Physics.Arcade.Sprite): void {
    if (!pole.active) return;
    this.stats.hits += 1;
    this.slashed += 1;
    this.stats.objectivesCompleted = this.slashed;
    const x = pole.x;
    const y = pole.y;
    pole.destroy();
    if (this.textures.exists('mgs1VrNinjaPoleCut')) {
      const cut = this.add.image(x, y + 12, 'mgs1VrNinjaPoleCut').setDepth(11);
      this.time.delayedCall(650, () => cut.active && cut.setAlpha(0.35));
    }
    if (this.textures.exists('mgs1VrNinjaPoleDebris')) {
      const debris = this.add.image(x + 12, y - 12, 'mgs1VrNinjaPoleDebris').setDepth(24);
      this.tweens.add({ targets: debris, x: x + 38, y: y + 30, angle: 70, alpha: 0, duration: 520, onComplete: () => debris.destroy() });
    }
    playSpecialVfx(this, 'mgs1VrVfxNinjaSlash', x, y - 12, { scale: 0.75 });
    if (this.slashed >= 15) this.materializeGoal('15 / 15 POLES CUT');
  }

  private slashEnemy(enemy: NinjaEnemy): void {
    if (enemy.disabled) return;
    this.stats.hits += 1;
    if (this.stage === 3 && !enemy.isSnake) {
      this.completeRun(false, 'Wrong soldier assassinated');
      return;
    }

    enemy.disabled = true;
    enemy.sprite.setVelocity(0, 0).setTint(enemy.isSnake ? 0x7cffff : 0xff6b6b);
    playSpecialActorAnimation(this, enemy.sprite, 'death', 520);
    this.time.delayedCall(520, () => enemy.sprite.active && enemy.sprite.setVisible(false));
    this.stats.kills += 1;
    this.defeatedEnemies += 1;
    this.stats.objectivesCompleted = this.defeatedEnemies;
    playSpecialVfx(this, enemy.isSnake ? 'mgs1VrVfxElectricalDisruption' : 'mgs1VrVfxNinjaSlash', enemy.sprite.x, enemy.sprite.y, { duration: 520 });

    if (this.stage === 3) {
      this.materializeGoal('SNAKE IDENTIFIED // TARGET DOWN');
      return;
    }
    if (this.defeatedEnemies >= 30) this.materializeGoal('30 / 30 ENEMIES ELIMINATED');
    else this.time.delayedCall(380, () => this.spawnEnemyWave());
  }

  private performBodyDisruption(): void {
    if (this.stealthEnergy < 24 || this.time.now < this.lastDisruptionAt + 850) {
      this.flashStatus('INSUFFICIENT NINJA ENERGY');
      return;
    }
    this.lastDisruptionAt = this.time.now;
    this.stealthEnergy -= 24;
    this.disruptionUntil = this.time.now + 1800;
    this.stats.rationsUsed += 1;
    playSpecialVfx(this, 'mgs1VrVfxElectricalDisruption', this.player.x, this.player.y, { scale: 1.4, duration: 900 });
    this.cameras.main.flash(120, 80, 255, 220);
    if (this.stage === 3) {
      this.enemies.forEach((enemy) => {
        if (enemy.disabled) return;
        enemy.sprite.setTint(enemy.isSnake ? 0xfff49a : 0x76fff2);
        if (enemy.isSnake) {
          const marker = this.add.text(enemy.sprite.x, enemy.sprite.y - 70, 'ELECTRICAL ANOMALY', {
            fontFamily: 'monospace', fontSize: '11px', color: '#fff49a', backgroundColor: '#061018'
          }).setOrigin(0.5).setDepth(90);
          this.time.delayedCall(1050, () => marker.destroy());
        }
        this.time.delayedCall(1100, () => enemy.sprite.active && enemy.sprite.clearTint());
      });
    }
  }

  private handleEnemies(): void {
    const stealthActive = this.inputController.isDown('ration') && this.stealthEnergy > 0;
    this.enemies.forEach((enemy) => {
      if (enemy.disabled || !enemy.sprite.active) return;
      if (enemy.sprite.x <= enemy.patrolMin) enemy.direction = 1;
      if (enemy.sprite.x >= enemy.patrolMax) enemy.direction = -1;
      enemy.sprite.setVelocityX(enemy.direction * (this.stage === 3 ? 38 : 54)).setFlipX(enemy.direction < 0);
      playSpecialActorAnimation(this, enemy.sprite, 'move');

      const distance = Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
      const leftSafeZone = this.stage !== 3 || this.player.x > SNAKE_HUNT_SAFE_ZONE_END;
      const seesPlayer = leftSafeZone && !stealthActive && Math.abs(enemy.sprite.y - this.player.y) < 90
        && distance < (this.stage === 3 ? 170 : 420)
        && (enemy.direction > 0 ? this.player.x >= enemy.sprite.x : this.player.x <= enemy.sprite.x);

      if (this.stage === 3 && seesPlayer) {
        this.stats.alerts += 1;
        this.completeRun(false, 'Detected before the assassination');
        return;
      }

      if (this.stage === 2 && seesPlayer && this.time.now >= enemy.nextShotAt) {
        enemy.nextShotAt = this.time.now + Phaser.Math.Between(900, 1450);
        this.fireEnemyBullet(enemy);
      }

      if (this.stage === 3 && this.time.now < this.disruptionUntil && enemy.isSnake) {
        enemy.sprite.setVelocityX(enemy.direction * 82);
      }
    });
  }

  private fireEnemyBullet(enemy: NinjaEnemy): void {
    const bullet = this.enemyBullets.get(enemy.sprite.x, enemy.sprite.y - 16, 'enemyBullet') as Phaser.Physics.Arcade.Sprite | null;
    if (!bullet) return;
    const direction = this.player.x < enemy.sprite.x ? -1 : 1;
    bullet.enableBody(true, enemy.sprite.x, enemy.sprite.y - 16, true, true);
    bullet.setData('expiresAt', this.time.now + 1900).setData('direction', direction).setVelocityX(direction * 390).setDepth(30);
    (bullet.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    playSpecialActorAnimation(this, enemy.sprite, 'attack', 220);
  }

  private handleBullets(): void {
    this.enemyBullets.getChildren().forEach((entry) => {
      const bullet = entry as Phaser.Physics.Arcade.Sprite;
      if (!bullet.active) return;
      if (((bullet.getData('expiresAt') as number | undefined) ?? 0) < this.time.now) {
        bullet.disableBody(true, true);
        return;
      }
      if (!this.crossSlashActive) return;
      const direction = (bullet.getData('direction') as number | undefined) ?? 1;
      const approachingFront = this.player.flipX ? direction > 0 : direction < 0;
      if (approachingFront && Phaser.Math.Distance.Between(bullet.x, bullet.y, this.player.x, this.player.y) < 76) {
        playSpecialVfx(this, 'mgs1VrVfxBulletRicochet', bullet.x, bullet.y, { flipX: this.player.flipX });
        this.inputController.vibrate(45, 0.3, 0.2);
        bullet.disableBody(true, true);
        this.stats.hits += 1;
      }
    });
  }

  private handleBulletHit(_playerObject: unknown, bulletObject: unknown): void {
    const bullet = bulletObject as Phaser.Physics.Arcade.Sprite;
    if (!bullet.active) return;
    bullet.disableBody(true, true);
    if (this.crossSlashActive) return;
    this.health = Math.max(0, this.health - 15);
    this.stats.damageTaken += 15;
    this.player.setTint(0xff6b6b);
    this.time.delayedCall(130, () => this.player.active && this.player.clearTint());
    if (this.health <= 0) this.completeRun(false, 'Cyborg Ninja disabled');
  }

  private materializeGoal(message: string): void {
    if (this.exitPad || this.completed) return;
    const texture = this.textures.exists('mgs1VrEnvHazardGoalBeacon') ? 'mgs1VrEnvHazardGoalBeacon' : 'vrGoalBeaconFallback';
    this.exitPad = this.physics.add.staticSprite(1835, 468, texture).setDepth(15);
    this.exitPad.setDisplaySize(42, 68).refreshBody();
    playSpecialVfx(this, 'mgs1VrVfxGoalMaterialize', this.exitPad.x, this.exitPad.y - 8);
    this.physics.add.overlap(this.player, this.exitPad, () => this.completeRun(true, 'Ninja stage clear'));
    this.flashStatus(`${message} // GOAL MATERIALIZED`);
  }

  private addHud(): void {
    this.statusText = this.add.text(22, 48, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#d8fff8', backgroundColor: '#020710aa'
    }).setScrollFactor(0).setDepth(100);
    this.objectiveText = this.add.text(22, 76, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#f8f49a', backgroundColor: '#020710aa'
    }).setScrollFactor(0).setDepth(100);
    this.hudText = this.add.text(22, 500, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#7cffd8', backgroundColor: '#020710cc'
    }).setScrollFactor(0).setDepth(100);
  }

  private updateHud(): void {
    const total = this.stage === 1 ? 15 : this.stage === 2 ? 30 : 1;
    const progress = this.stage === 1 ? this.slashed : this.defeatedEnemies;
    this.statusText.setText(`TIME ${this.stats.timeSeconds}s // HP ${this.health} // PROGRESS ${progress}/${total}`);
    this.hudText.setText(
      `NINJA ENERGY ${Math.round(this.stealthEnergy)}% | FIRE SLASH | HOLD CQC CROSS-SLASH | JUMP FORWARD | CHAFF BODY DISRUPTION | HOLD RATION STEALTH`
    );
  }

  private syncTime(): void {
    this.stats.timeSeconds = Math.max(1, Math.round((performance.now() - this.startTime) / 1000));
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

  private completeRun(success: boolean, message: string): void {
    if (this.completed) return;
    this.completed = true;
    this.syncTime();
    this.player.setVelocity(0, 0).setAcceleration(0, 0);
    this.emitHud(success ? 'clear' : 'failed', message);
    emitGameEvent<VrRunGamePayload>(GAME_EVENT.VR_RUN_COMPLETE, {
      missionId: this.mission.id,
      missionTitle: this.mission.title,
      stats: { ...this.stats },
      status: success ? 'clear' : 'failed',
      message
    });
    this.add.text(this.cameras.main.scrollX + 480, 250, success ? 'NINJA MISSION CLEAR' : 'NINJA MISSION FAILED', {
      fontFamily: 'monospace', fontSize: '26px', color: success ? '#7cffd8' : '#ff6b6b',
      backgroundColor: '#020710dd', padding: { x: 18, y: 10 }
    }).setOrigin(0.5).setDepth(130);
  }

  private flashStatus(message: string): void {
    this.objectiveText.setText(`INFO // ${message}`);
    this.time.delayedCall(1050, () => {
      if (!this.objectiveText.active || this.completed) return;
      const objective = this.stage === 1
        ? 'SLASH ALL 15 TARGET POLES'
        : this.stage === 2
          ? 'ELIMINATE 30 GENOME SOLDIERS'
          : 'IDENTIFY AND ASSASSINATE SNAKE ONLY';
      this.objectiveText.setText(`OBJECTIVE // ${objective}`);
    });
  }

  private destroyObject(object: unknown): void {
    if (object && typeof (object as { destroy?: unknown }).destroy === 'function') {
      (object as Phaser.GameObjects.GameObject).destroy();
    }
  }
}
