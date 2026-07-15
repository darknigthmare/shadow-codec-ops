import Phaser from 'phaser';
import { getCampaignLoadoutBonuses } from '../../systems/campaignStorage';
import {
  emitGameEvent,
  GAME_EVENT,
  onGameEvent,
  type AlertEventPayload,
  type CodecRequestPayload,
  type DirectorDirectivePayload,
  type MissionCompletePayload,
  type MissionHudPayload
} from '../core/GameEvents';
import {
  activateNextMg1Encounter,
  completeActiveMg1Encounter,
  createMg1EncounterFlowState,
  getActiveMg1Encounter,
  getMg1HostageStealthPenalty,
  getMg1ObjectiveLabel,
  isMg1ExtractionUnlocked,
  isMg1EncounterDefeated,
  MG1_ENCOUNTER_SEQUENCE,
  MG1_HAZARD_SEQUENCE,
  MG1_MAX_ONSCREEN_LANDMINES,
  MG1_MAX_ONSCREEN_PLASTIC_EXPLOSIVES,
  MG1_MAX_SIMULTANEOUS_PLAYER_BULLETS,
  MG1_NPC_CHECKPOINTS,
  MG1_OUTER_HEAVEN_MISSION_ID,
  MG1_OUTER_HEAVEN_WORLD,
  MG1_RUNTIME_VFX_KEYS,
  MG1_TX55_LEG_SEQUENCE,
  registerMg1Tx55Charge,
  shouldCreditMg1EncounterObjective,
  type Mg1EncounterDefinition,
  type Mg1EncounterFlowState,
  type Mg1HazardBehavior,
  type Mg1HazardDefinition,
  type Mg1Leg,
  type Mg1PlayerAttack
} from '../core/mg1OuterHeavenMission';
import {
  getMg1ActorAnimationAssetBySourceTexture,
  getMg1ActorAnimationKey,
  MG1_ACTOR_ANIMATION_ASSETS,
  type Mg1ActorAnimationAsset,
  type Mg1ActorAnimationState
} from '../core/mg1ActorAnimationRegistry';
import { MG1_SIDEOPS_VFX_ASSETS } from '../core/mg1SideOpsAssetRegistry';
import { RuntimeInputController } from '../core/RuntimeInput';
import { calculateSideOpsRank } from '../systems/rankSystem';

type Mg1AlertState = 'NORMAL' | 'ALERT' | 'MISSION FAILED';

interface Mg1BossUnit {
  id: string;
  sprite: Phaser.Physics.Arcade.Sprite;
  hp: number;
  maxHp: number;
  defeated: boolean;
  direction: number;
  lastShotAt: number;
  nextDustAt: number;
}

interface Mg1HazardUnit {
  definition: Mg1HazardDefinition;
  sprite: Phaser.Physics.Arcade.Sprite;
  hp: number;
  disabled: boolean;
  direction: number;
  lastShotAt: number;
  baseY: number;
}

interface Mg1ProtectedHostage {
  sprite: Phaser.Physics.Arcade.Sprite;
  label: Phaser.GameObjects.Text;
  harmed: boolean;
}

interface Mg1CodecCall {
  trigger: CodecRequestPayload['trigger'];
  contactId: string;
  conversationId: string;
  message: string;
  pauseGame: boolean;
}

const MISSION_TITLE = 'Operation Intrude N313';
const PLAYER_TEXTURE = 'playerSolidSnakeMg1';
const PLAYER_BULLET_LIFETIME_MS = 1600;

const MG1_CODEC = {
  missionStart: { trigger: 'mission_start', contactId: 'big_boss_mg1', conversationId: 'mg1_big_boss_orders', message: 'Operation Intrude N313 orders received.', pauseGame: true },
  firstAlert: { trigger: 'first_alert', contactId: 'big_boss_mg1', conversationId: 'mg1_big_boss_equipment', message: 'Big Boss is transmitting equipment guidance.', pauseGame: false },
  resistance: { trigger: 'keycard_found', contactId: 'schneider_mg1', conversationId: 'mg1_schneider_facility', message: 'Outer Heaven resistance network established.', pauseGame: false },
  mercenary: { trigger: 'boss_intro', contactId: 'diane_mg1', conversationId: 'mg1_diane_mercenaries', message: 'Resistance mercenary intelligence available.', pauseGame: false },
  midfight: { trigger: 'boss_midfight', contactId: 'diane_mg1', conversationId: 'mg1_diane_mercenaries', message: 'Diane has identified a weakness in the active mercenary pattern.', pauseGame: false },
  cameraDetected: { trigger: 'camera_detected', contactId: 'jennifer_mg1', conversationId: 'mg1_jennifer_inside', message: 'Jennifer has intercepted the gun-camera tracking channel.', pauseGame: false },
  secretFrequency: { trigger: 'secret_frequency', contactId: 'jennifer_mg1', conversationId: 'mg1_jennifer_inside', message: 'A hidden resistance frequency answers near Jennifer.', pauseGame: false },
  inside: { trigger: 'low_health', contactId: 'jennifer_mg1', conversationId: 'mg1_jennifer_inside', message: 'Jennifer has marked medical supplies nearby.', pauseGame: false },
  finalDuel: { trigger: 'boss_intro', contactId: 'big_boss_mg1', conversationId: 'mg1_big_boss_orders', message: 'Big Boss has revealed himself inside Outer Heaven.', pauseGame: true },
  complete: { trigger: 'mission_complete', contactId: 'schneider_mg1', conversationId: 'mg1_schneider_facility', message: 'Outer Heaven is collapsing. Reach extraction.', pauseGame: true },
  failed: { trigger: 'low_health', contactId: 'big_boss_mg1', conversationId: 'mg1_big_boss_orders', message: 'Operation Intrude N313 failed.', pauseGame: false }
} as const satisfies Record<string, Mg1CodecCall>;

export class Mg1OuterHeavenScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private playerProjectiles!: Phaser.Physics.Arcade.Group;
  private enemyProjectiles!: Phaser.Physics.Arcade.Group;
  private inputController!: RuntimeInputController;
  private accessDoor!: Phaser.Physics.Arcade.Sprite;
  private extraction!: Phaser.Physics.Arcade.Sprite;
  private arenaGate: Phaser.Physics.Arcade.Sprite | null = null;

  private statusText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private hudText!: Phaser.GameObjects.Text;
  private alertText!: Phaser.GameObjects.Text;
  private bossText!: Phaser.GameObjects.Text;

  private flow: Mg1EncounterFlowState = createMg1EncounterFlowState();
  private bossUnits: Mg1BossUnit[] = [];
  private hazards: Mg1HazardUnit[] = [];
  private protectedHostages: Mg1ProtectedHostage[] = [];
  private activeRemoteMissile: Phaser.Physics.Arcade.Sprite | null = null;
  private activeTx55Charge = false;
  private selfDestructStarted = false;
  private projectileGeneration = 0;

  private maxHealth = 100;
  private health = 100;
  private maxAmmo: number = MG1_OUTER_HEAVEN_WORLD.maxAmmo;
  private ammo: number = MG1_OUTER_HEAVEN_WORLD.startAmmo;
  private rations: number = MG1_OUTER_HEAVEN_WORLD.startRations;
  private chaff: number = MG1_OUTER_HEAVEN_WORLD.startChaff;
  private chaffActiveUntil = 0;
  private hasAccessCard = false;
  private missionCompleted = false;
  private alertState: Mg1AlertState = 'NORMAL';
  private lastAlertSource = 'none';
  private nextAlertAllowedAt = 0;
  private lowHealthCodecEmitted = false;
  private firstAlertCodecEmitted = false;
  private cameraDetectedCodecEmitted = false;
  private secretFrequencyCodecEmitted = false;
  private bossMidfightCodecEmitted = new Set<string>();
  private hostagesHarmed = 0;

  private missionStartTime = 0;
  private nextPlayerShotAt = 0;
  private lastDamageAt = 0;
  private shotsFired = 0;
  private kills = 0;
  private neutralizations = 0;
  private rationsUsed = 0;
  private damageTaken = 0;
  private camerasDisabled = 0;
  private alertCount = 0;
  private completedObjectives = new Set<string>();

  private offCodecResume?: () => void;
  private offMissionRestart?: () => void;
  private offDirectorDirective?: () => void;

  constructor() {
    super('Mg1OuterHeavenScene');
  }

  create(): void {
    this.resetMissionState();
    this.missionStartTime = this.time.now;
    this.physics.world.setBounds(0, 0, MG1_OUTER_HEAVEN_WORLD.worldWidth, 540);
    this.cameras.main.setBounds(0, 0, MG1_OUTER_HEAVEN_WORLD.worldWidth, 540);

    this.createActorAnimations();
    this.createVfxAnimations();
    this.createOuterHeavenBackdrop();
    this.createWorldGeometry();

    this.player = this.physics.add.sprite(
      MG1_OUTER_HEAVEN_WORLD.start.x,
      MG1_OUTER_HEAVEN_WORLD.start.y,
      this.resolveActorTexture(PLAYER_TEXTURE)
    );
    this.configureActorSprite(this.player, PLAYER_TEXTURE);
    this.player.setCollideWorldBounds(true).setDragX(1250).setMaxVelocity(270, 540);
    this.physics.add.collider(this.player, this.platforms);

    this.playerProjectiles = this.physics.add.group({ maxSize: 64 });
    this.enemyProjectiles = this.physics.add.group({ maxSize: 96 });
    this.physics.add.collider(
      this.playerProjectiles,
      this.platforms,
      (projectile) => this.expirePlayerProjectile(projectile as Phaser.Physics.Arcade.Sprite, true),
      (projectile) => !(projectile as Phaser.Physics.Arcade.Sprite).getData('ignorePlatforms'),
      this
    );
    this.physics.add.collider(this.enemyProjectiles, this.platforms, (projectile) => this.expireEnemyProjectile(projectile as Phaser.Physics.Arcade.Sprite, true));
    this.physics.add.overlap(this.enemyProjectiles, this.player, (projectile) => this.hitPlayerWithProjectile(projectile as Phaser.Physics.Arcade.Sprite), undefined, this);

    this.createAccessObjective();
    this.spawnNpcCheckpoints();
    this.spawnHazards();
    this.spawnSupplies();

    this.extraction = this.physics.add.staticSprite(MG1_OUTER_HEAVEN_WORLD.extraction.x, MG1_OUTER_HEAVEN_WORLD.extraction.y, 'elevator');
    this.extraction.setTint(0x8ee58a);
    this.physics.add.overlap(this.player, this.extraction, () => this.completeMission(), undefined, this);

    this.inputController = new RuntimeInputController(this);
    const cameraLerp = this.inputController.profile.reducedMotion ? 1 : 0.08;
    this.cameras.main.startFollow(this.player, true, cameraLerp, cameraLerp);
    this.createFixedHud();

    this.offCodecResume = onGameEvent(GAME_EVENT.CODEC_RESUME, () => this.scene.resume());
    this.offMissionRestart = onGameEvent(GAME_EVENT.MISSION_RESTART, () => this.scene.restart());
    this.offDirectorDirective = onGameEvent<DirectorDirectivePayload>(GAME_EVENT.DIRECTOR_DIRECTIVE, (directive) => {
      if (directive.support === 'silent') {
        this.rations += 1;
      } else if (directive.support === 'aggressive') {
        this.ammo = Math.min(this.maxAmmo, this.ammo + 8);
      }
      this.emitHudUpdate();
    });
    const removeExternalListeners = () => {
      this.offCodecResume?.();
      this.offMissionRestart?.();
      this.offDirectorDirective?.();
      this.offCodecResume = undefined;
      this.offMissionRestart = undefined;
      this.offDirectorDirective = undefined;
    };
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, removeExternalListeners);
    this.events.once(Phaser.Scenes.Events.DESTROY, removeExternalListeners);

    this.emitCodec(MG1_CODEC.missionStart);
    this.updateHud();
    this.emitHudUpdate();
  }

  update(): void {
    if (this.missionCompleted) return;
    this.inputController.update();
    if (!this.controlActiveRemoteMissile()) this.handlePlayerInput();
    this.activateEncounterWhenReady();
    this.handleEncounter();
    this.handleHazards();
    this.updateHud();
    this.emitHudUpdate();
  }

  private resetMissionState(): void {
    const campaignBonuses = getCampaignLoadoutBonuses();
    this.flow = createMg1EncounterFlowState();
    this.bossUnits = [];
    this.hazards = [];
    this.protectedHostages = [];
    this.activeRemoteMissile = null;
    this.arenaGate = null;
    this.activeTx55Charge = false;
    this.selfDestructStarted = false;
    this.projectileGeneration = 0;
    this.maxHealth = 100;
    this.health = 100;
    this.maxAmmo = Math.max(MG1_OUTER_HEAVEN_WORLD.maxAmmo, MG1_OUTER_HEAVEN_WORLD.startAmmo + campaignBonuses.ammo);
    this.ammo = Math.min(this.maxAmmo, MG1_OUTER_HEAVEN_WORLD.startAmmo + campaignBonuses.ammo);
    this.rations = MG1_OUTER_HEAVEN_WORLD.startRations + campaignBonuses.rations;
    this.chaff = 0;
    this.chaffActiveUntil = 0;
    this.hasAccessCard = false;
    this.missionCompleted = false;
    this.alertState = 'NORMAL';
    this.lastAlertSource = 'none';
    this.nextAlertAllowedAt = 0;
    this.lowHealthCodecEmitted = false;
    this.firstAlertCodecEmitted = false;
    this.cameraDetectedCodecEmitted = false;
    this.secretFrequencyCodecEmitted = false;
    this.bossMidfightCodecEmitted = new Set<string>();
    this.hostagesHarmed = 0;
    this.nextPlayerShotAt = 0;
    this.lastDamageAt = 0;
    this.shotsFired = 0;
    this.kills = 0;
    this.neutralizations = 0;
    this.rationsUsed = 0;
    this.damageTaken = 0;
    this.camerasDisabled = 0;
    this.alertCount = 0;
    this.completedObjectives = new Set(['infiltrate_outer_heaven']);
  }

  /** Registers every MG1 actor sheet once while retaining the static texture as fallback. */
  private createActorAnimations(): void {
    MG1_ACTOR_ANIMATION_ASSETS.forEach((asset) => {
      if (!this.textures.exists(asset.textureKey)) return;
      (Object.entries(asset.clips) as [Mg1ActorAnimationState, NonNullable<Mg1ActorAnimationAsset['clips'][Mg1ActorAnimationState]>][])
        .forEach(([state, clip]) => {
          const animationKey = getMg1ActorAnimationKey(asset.textureKey, state);
          if (this.anims.exists(animationKey)) return;
          this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers(asset.textureKey, { start: clip.start, end: clip.end }),
            frameRate: clip.frameRate,
            repeat: clip.repeat
          });
        });
    });
  }

  private resolveActorTexture(sourceTextureKey: string): string {
    const asset = getMg1ActorAnimationAssetBySourceTexture(sourceTextureKey);
    return asset && this.textures.exists(asset.textureKey) ? asset.textureKey : sourceTextureKey;
  }

  private configureActorSprite<T extends Phaser.GameObjects.Sprite>(
    sprite: T,
    sourceTextureKey: string,
    initialState: Mg1ActorAnimationState = 'idle'
  ): T {
    sprite.setData('mg1SourceTextureKey', sourceTextureKey);
    sprite.setData('mg1AnimationLock', '');
    sprite.setData('mg1AnimationPriority', 0);
    const asset = getMg1ActorAnimationAssetBySourceTexture(sourceTextureKey);
    if (!asset || !this.textures.exists(asset.textureKey)) {
      sprite.setTexture(sourceTextureKey);
      return sprite;
    }

    sprite.setTexture(asset.textureKey, asset.clips.idle?.start ?? 0);
    const body = (sprite as unknown as Phaser.Physics.Arcade.Sprite).body as Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | null;
    if (body) {
      body.setSize(asset.sourceWidth, asset.sourceHeight, false);
      body.setOffset(Math.floor((asset.frameWidth - asset.sourceWidth) / 2), 0);
      if (body instanceof Phaser.Physics.Arcade.StaticBody) body.updateFromGameObject();
    }
    this.playActorLoop(sprite, initialState);
    return sprite;
  }

  private getActorAsset(sprite: Phaser.GameObjects.Sprite): Mg1ActorAnimationAsset | undefined {
    return getMg1ActorAnimationAssetBySourceTexture(String(sprite.getData('mg1SourceTextureKey') ?? ''));
  }

  private playActorLoop(
    sprite: Phaser.GameObjects.Sprite,
    state: Mg1ActorAnimationState,
    force = false
  ): void {
    const asset = this.getActorAsset(sprite);
    if (!asset || !this.textures.exists(asset.textureKey)) return;
    if (sprite.getData('mg1AnimationPriority') === 4) return;
    if (!force && Number(sprite.getData('mg1AnimationPriority') ?? 0) > 0) return;
    const resolvedState = asset.clips[state] ? state : 'idle';
    const animationKey = getMg1ActorAnimationKey(asset.textureKey, resolvedState);
    if (!this.anims.exists(animationKey)) return;
    if (force) {
      sprite.setData('mg1AnimationLock', '');
      sprite.setData('mg1AnimationPriority', 0);
    }
    if (sprite.anims.currentAnim?.key !== animationKey || !sprite.anims.isPlaying) sprite.play(animationKey);
  }

  private playActorAction(sprite: Phaser.GameObjects.Sprite, state: Mg1ActorAnimationState): void {
    const asset = this.getActorAsset(sprite);
    const clip = asset?.clips[state];
    if (!asset || !clip || !this.textures.exists(asset.textureKey)) return;
    const priority = state === 'death' ? 4 : state === 'hit' ? 3 : 2;
    const currentPriority = Number(sprite.getData('mg1AnimationPriority') ?? 0);
    if (currentPriority === 4 || currentPriority >= priority) return;
    const animationKey = getMg1ActorAnimationKey(asset.textureKey, state);
    if (!this.anims.exists(animationKey)) return;

    const lock = `${state}-${this.time.now}-${Phaser.Math.Between(0, 99999)}`;
    sprite.setData('mg1AnimationLock', lock);
    sprite.setData('mg1AnimationPriority', priority);
    sprite.play(animationKey);
    if (state === 'death') return;

    const durationMs = Math.ceil(((clip.end - clip.start + 1) / clip.frameRate) * 1000) + 34;
    this.time.delayedCall(durationMs, () => {
      if (!sprite.active || sprite.getData('mg1AnimationLock') !== lock) return;
      sprite.setData('mg1AnimationLock', '');
      sprite.setData('mg1AnimationPriority', 0);
    });
  }

  private createVfxAnimations(): void {
    const runtimeVfxKeys = new Set<string>(MG1_RUNTIME_VFX_KEYS);
    MG1_SIDEOPS_VFX_ASSETS.filter((asset) => runtimeVfxKeys.has(asset.textureKey)).forEach((asset) => {
      const animationKey = this.vfxAnimationKey(asset.textureKey);
      if (this.anims.exists(animationKey)) return;
      this.anims.create({
        key: animationKey,
        frames: this.anims.generateFrameNumbers(asset.textureKey, { start: 0, end: asset.frameCount - 1 }),
        frameRate: asset.textureKey === 'mg1ExplosionLargeVfx' ? 14 : 18,
        repeat: 0
      });
    });
  }

  private createOuterHeavenBackdrop(): void {
    const width = MG1_OUTER_HEAVEN_WORLD.worldWidth;
    this.add.rectangle(width / 2, 270, width, 540, 0x071009).setDepth(-30);
    this.add.rectangle(width / 2, 515, width, 52, 0x24301d).setDepth(-15);

    for (let x = 180; x < width; x += 360) {
      const towerHeight = x % 720 === 180 ? 270 : 190;
      this.add.rectangle(x, 500 - towerHeight / 2, 145, towerHeight, 0x172619).setDepth(-12);
      this.add.rectangle(x, 500 - towerHeight, 168, 14, 0x516440).setDepth(-11);
      this.add.rectangle(x - 38, 500 - towerHeight + 38, 22, 14, 0xb56b42).setDepth(-10);
      this.add.rectangle(x + 38, 500 - towerHeight + 38, 22, 14, 0xb56b42).setDepth(-10);
    }

    for (let x = 1420; x < width - 300; x += 1000) {
      this.add.rectangle(x, 466, 500, 78, 0x263923).setDepth(-8);
      this.add.rectangle(x, 421, 520, 12, 0x8b6c3f).setDepth(-7);
      this.add.text(x - 108, 438, 'OUTER HEAVEN', { fontFamily: 'monospace', fontSize: '14px', color: '#b9cf8a' }).setDepth(-6);
    }

    this.add.text(24, 18, 'MISSION 003 // OPERATION INTRUDE N313 // OUTER HEAVEN', {
      fontFamily: 'monospace', fontSize: '18px', color: '#a9e879'
    }).setScrollFactor(0).setDepth(80);

    const leftTruck = this.add.sprite(315, 466, this.resolveActorTexture('mg1TransportTruck')).setDepth(-4);
    const rightTruck = this.add.sprite(455, 466, this.resolveActorTexture('mg1TransportTruck')).setDepth(-4).setFlipX(true);
    this.configureActorSprite(leftTruck, 'mg1TransportTruck');
    this.configureActorSprite(rightTruck, 'mg1TransportTruck');
  }

  private createWorldGeometry(): void {
    this.platforms = this.physics.add.staticGroup();
    for (let x = 256; x < MG1_OUTER_HEAVEN_WORLD.worldWidth; x += 512) {
      const platform = this.platforms.create(x, 520, 'platform') as Phaser.Physics.Arcade.Sprite;
      platform.setScale(16, 1).setTint(0x80945d).refreshBody();
    }
    for (let x = 620; x < MG1_OUTER_HEAVEN_WORLD.worldWidth - 500; x += 920) {
      const ledge = this.platforms.create(x, x % 1840 === 620 ? 350 : 405, 'platform') as Phaser.Physics.Arcade.Sprite;
      ledge.setScale(4, 1).setTint(0x64784f).refreshBody();
      const crate = this.platforms.create(x + 120, 480, 'crate') as Phaser.Physics.Arcade.Sprite;
      crate.setTint(0x74633f).refreshBody();
    }
  }

  private createAccessObjective(): void {
    this.accessDoor = this.physics.add.staticSprite(MG1_OUTER_HEAVEN_WORLD.door.x, MG1_OUTER_HEAVEN_WORLD.door.y, 'door');
    this.accessDoor.setTint(0xb55c45);
    this.physics.add.collider(this.player, this.accessDoor, undefined, () => !this.hasAccessCard, this);

    const card = this.physics.add.sprite(MG1_OUTER_HEAVEN_WORLD.keycard.x, MG1_OUTER_HEAVEN_WORLD.keycard.y, 'keycard');
    card.setImmovable(true);
    this.physics.add.collider(card, this.platforms);
    this.physics.add.overlap(this.player, card, () => {
      if (this.hasAccessCard) return;
      this.hasAccessCard = true;
      this.completedObjectives.add('establish_resistance_contact');
      this.accessDoor.setTint(0x7bcf71);
      card.destroy();
      this.flashStatus('RESISTANCE CONTACT ESTABLISHED // ACCESS CARD ACQUIRED');
      this.emitCodec(MG1_CODEC.resistance);
    }, undefined, this);
  }

  private spawnNpcCheckpoints(): void {
    MG1_NPC_CHECKPOINTS.forEach((checkpoint) => {
      const sprite = this.add.sprite(checkpoint.x, checkpoint.y, this.resolveActorTexture(checkpoint.textureKey)).setDepth(3).setTint(0xb8c99c);
      this.configureActorSprite(sprite, checkpoint.textureKey);
      this.add.text(checkpoint.x - 42, checkpoint.y - 48, checkpoint.label, {
        fontFamily: 'monospace', fontSize: '9px', color: '#a9c38b', backgroundColor: '#071009'
      }).setDepth(4);
      sprite.setData('protectedNpc', true);
    });
  }

  private spawnSupplies(): void {
    MG1_ENCOUNTER_SEQUENCE.slice(0, -1).forEach((encounter, index) => {
      const texture = index % 3 === 2 ? 'ration' : 'ammoBox';
      const pickup = this.physics.add.sprite(encounter.gateX + 115, texture === 'ration' ? 455 : 470, texture);
      pickup.setImmovable(true);
      this.physics.add.collider(pickup, this.platforms);
      this.physics.add.overlap(this.player, pickup, () => {
        if (!pickup.active) return;
        if (texture === 'ration') {
          this.rations += 1;
          this.flashStatus('RATION ACQUIRED');
        } else {
          this.ammo = Math.min(this.maxAmmo, this.ammo + 12);
          this.flashStatus('FIELD AMMUNITION ACQUIRED');
        }
        pickup.destroy();
      }, undefined, this);
    });
  }

  private spawnHazards(): void {
    MG1_HAZARD_SEQUENCE.forEach((definition) => this.spawnHazard(definition));
  }

  private spawnHazard(definition: Mg1HazardDefinition): void {
    const sprite = this.physics.add.sprite(definition.x, definition.y, this.resolveActorTexture(definition.textureKey));
    this.configureActorSprite(sprite, definition.textureKey);
    sprite.setCollideWorldBounds(true).setDragX(750);
    const airborne = definition.behavior === 'air_trooper' || definition.behavior === 'gun_camera';
    if (airborne) (sprite.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    else this.physics.add.collider(sprite, this.platforms);

    const unit: Mg1HazardUnit = {
      definition,
      sprite,
      hp: definition.hp,
      disabled: false,
      direction: -1,
      lastShotAt: 0,
      baseY: definition.y
    };
    this.physics.add.overlap(this.player, sprite, () => {
      if (!unit.disabled && definition.contactDamage > 0) {
        if (definition.behavior === 'attack_dog' || definition.behavior === 'scorpion') this.playActorAction(sprite, 'attack');
        this.damagePlayer(definition.contactDamage, definition.behavior);
      }
    }, undefined, this);
    this.physics.add.overlap(this.playerProjectiles, sprite, (projectile) => {
      this.hitHazard(unit, projectile as Phaser.Physics.Arcade.Sprite);
    }, undefined, this);
    this.hazards.push(unit);
  }

  private createFixedHud(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { fontFamily: 'monospace', fontSize: '13px', color: '#c8e9a4' };
    this.statusText = this.add.text(24, 50, '', textStyle).setScrollFactor(0).setDepth(80);
    this.objectiveText = this.add.text(24, 74, '', { ...textStyle, color: '#f2de77' }).setScrollFactor(0).setDepth(80);
    this.alertText = this.add.text(24, 98, '', { ...textStyle, color: '#e49a6a' }).setScrollFactor(0).setDepth(80);
    this.hudText = this.add.text(24, 122, '', { ...textStyle, color: '#99c87c' }).setScrollFactor(0).setDepth(80);
    this.bossText = this.add.text(24, 146, '', { ...textStyle, color: '#ffb06a' }).setScrollFactor(0).setDepth(80);
  }

  private handlePlayerInput(): void {
    if (this.health <= 0) return;
    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const crouch = this.inputController.isDown('crouch');
    const slowWalk = this.inputController.isDown('sprint');
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = crouch ? 80 : slowWalk ? 120 : 210;

    if (left) {
      this.player.setVelocityX(-speed).setFlipX(true);
    } else if (right) {
      this.player.setVelocityX(speed).setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }
    this.playActorLoop(this.player, left || right ? 'move' : 'idle');
    if (this.inputController.justDown('jump') && body.blocked.down && !crouch) this.player.setVelocityY(-430);
    if (this.inputController.justDown('fire')) this.fireContextualWeapon();
    if (this.inputController.justDown('cqc')) this.tryActionOrCqc();
    if (this.inputController.justDown('chaff')) this.useChaff();
    if (this.inputController.justDown('ration')) this.useRation();
    if (this.inputController.justDown('codec')) this.emitManualCodec();
  }

  /** MG1 freezes Snake while directional input steers the remote missile. */
  private controlActiveRemoteMissile(): boolean {
    const missile = this.activeRemoteMissile;
    if (!missile?.active) {
      this.activeRemoteMissile = null;
      return false;
    }

    this.player.setVelocityX(0);
    this.playActorLoop(this.player, 'remote', true);
    const horizontal = Number(this.inputController.isDown('moveRight')) - Number(this.inputController.isDown('moveLeft'));
    const vertical = Number(this.inputController.isDown('crouch')) - Number(this.inputController.isDown('jump'));
    if (horizontal !== 0 || vertical !== 0) {
      const direction = new Phaser.Math.Vector2(horizontal, vertical).normalize().scale(470);
      missile.setVelocity(direction.x, direction.y).setFlipX(direction.x < 0);
    }
    return true;
  }

  private fireContextualWeapon(): void {
    if (this.time.now < this.nextPlayerShotAt) return;
    const encounter = getActiveMg1Encounter(this.flow);
    if (encounter?.behavior === 'tx55_sabotage') {
      this.flashStatus('TX-55: USE ACTION/CQC BESIDE THE ORDERED LEG TO PLACE PLASTIC EXPLOSIVE');
      return;
    }
    if (this.ammo <= 0) {
      this.flashStatus('AMMUNITION EMPTY');
      return;
    }

    const attack: Mg1PlayerAttack = encounter?.requiredPlayerAttack ?? 'handgun';
    const textureKey = encounter?.playerWeaponTextureKey ?? 'mg1HandgunBullet';
    if (attack === 'landmine') {
      const mines = this.playerProjectiles.getChildren().filter((child) => child.active && (child as Phaser.Physics.Arcade.Sprite).getData('attack') === 'landmine').length;
      if (mines >= MG1_MAX_ONSCREEN_LANDMINES) {
        this.flashStatus('MSX LIMIT: THREE LANDMINES ONSCREEN');
        return;
      }
    } else if (this.activePlayerBulletCount() >= MG1_MAX_SIMULTANEOUS_PLAYER_BULLETS) {
      this.flashStatus('MSX LIMIT: FOUR PLAYER PROJECTILES ONSCREEN');
      return;
    }

    this.nextPlayerShotAt = this.time.now + (attack === 'landmine' ? 420 : 220);
    this.ammo -= 1;
    this.shotsFired += 1;
    const direction = this.player.flipX ? -1 : 1;
    const x = this.player.x + direction * 24;
    const y = attack === 'landmine' ? 485 : this.player.y - 6;
    const projectile = this.obtainProjectile(this.playerProjectiles, x, y, textureKey);
    if (!projectile) return;

    projectile.setData('attack', attack);
    projectile.setData('ignorePlatforms', attack === 'landmine');
    projectile.setFlipX(direction < 0);
    const projectileBody = projectile.body as Phaser.Physics.Arcade.Body;
    projectileBody.setAllowGravity(attack === 'grenade_launcher');
    if (attack === 'landmine') {
      projectile.setVelocity(0, 0);
    } else if (attack === 'grenade_launcher') {
      projectile.setVelocity(direction * 455, -125);
    } else {
      projectile.setVelocityX(direction * (attack === 'remote_missile' ? 470 : attack === 'rocket_launcher' ? 540 : 680));
      projectile.setVelocityY(0);
    }
    if (attack === 'remote_missile') {
      this.activeRemoteMissile = projectile;
      this.player.setVelocityX(0);
      this.cameras.main.startFollow(projectile, true, 0.12, 0.12);
      this.flashStatus('REMOTE MISSILE CONTROL // SNAKE IMMOBILIZED');
    }
    this.playVfx('mg1MuzzleFlashVfx', x, y, direction < 0);
    this.playActorAction(this.player, 'attack');
    this.inputController.vibrate(35, 0.12, 0.18);
    this.scheduleProjectileExpiry(projectile, attack === 'landmine' ? 12000 : PLAYER_BULLET_LIFETIME_MS, 'player');
  }

  private tryActionOrCqc(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    if (encounter?.behavior === 'tx55_sabotage') {
      this.tryPlantTx55Explosive();
      return;
    }

    const target = this.hazards
      .filter((hazard) => !hazard.disabled)
      .map((hazard) => ({ hazard, distance: Phaser.Math.Distance.Between(this.player.x, this.player.y, hazard.sprite.x, hazard.sprite.y) }))
      .filter((entry) => entry.distance < 92)
      .sort((a, b) => a.distance - b.distance)[0]?.hazard;
    if (!target) {
      this.flashStatus('NO CQC TARGET');
      return;
    }
    this.playActorAction(this.player, 'attack');
    target.disabled = true;
    target.sprite.setVelocity(0, 0).setTint(0x52634d);
    this.playActorAction(target.sprite, 'death');
    this.neutralizations += 1;
    this.flashStatus('CQC TAKEDOWN');
  }

  private tryPlantTx55Explosive(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    const tx55 = this.bossUnits.find((unit) => !unit.defeated);
    if (!encounter || encounter.id !== 'tx55_metal_gear' || !tx55) return;
    if (Math.abs(this.player.x - tx55.sprite.x) > 145) {
      this.flashStatus('MOVE BESIDE A TX-55 LEG');
      return;
    }
    if (this.activeTx55Charge && MG1_MAX_ONSCREEN_PLASTIC_EXPLOSIVES === 1) {
      this.flashStatus('ONLY ONE PLASTIC EXPLOSIVE MAY BE ONSCREEN');
      return;
    }
    if (this.ammo <= 0) {
      this.flashStatus('NO PLASTIC EXPLOSIVE');
      return;
    }

    const leg: Mg1Leg = this.player.x < tx55.sprite.x ? 'left' : 'right';
    const explosiveX = tx55.sprite.x + (leg === 'left' ? -27 : 27);
    const explosiveY = tx55.sprite.y + 43;
    const explosive = this.add.image(explosiveX, explosiveY, 'mg1PlasticExplosive').setDepth(8);
    this.playActorAction(this.player, 'plant');
    this.playActorAction(tx55.sprite, leg === 'left' ? 'chargeLeft' : 'chargeRight');
    this.activeTx55Charge = true;
    this.ammo -= 1;
    this.shotsFired += 1;
    this.time.delayedCall(450, () => {
      explosive.destroy();
      this.activeTx55Charge = false;
      const result = registerMg1Tx55Charge(this.flow, leg);
      this.flow = result.state;
      this.playVfx('mg1ExplosionSmallVfx', explosiveX, explosiveY);
      this.playVfx('mg1MetalSparksVfx', explosiveX, explosiveY - 16);
      if (!result.accepted) {
        tx55.hp = tx55.maxHp;
        this.flashStatus(`WRONG LEG: SEQUENCE RESET // EXPECTED ${result.expectedLeg.toUpperCase()}`);
        return;
      }
      tx55.hp = Math.max(0, tx55.maxHp - this.flow.tx55ChargeIndex);
      this.flashStatus(`TX-55 CHARGE ${this.flow.tx55ChargeIndex}/16 ACCEPTED`);
      if (result.sequenceComplete) this.defeatActiveEncounter();
    });
  }

  private useChaff(): void {
    this.flashStatus('CHAFF UNAVAILABLE // NOT PART OF THE 1995 MG1 LOADOUT');
  }

  private useRation(): void {
    if (this.rations <= 0 || this.health >= this.maxHealth) {
      this.flashStatus(this.rations <= 0 ? 'NO RATION' : 'HEALTH FULL');
      return;
    }
    this.rations -= 1;
    this.rationsUsed += 1;
    this.health = Math.min(this.maxHealth, this.health + 55);
    this.flashStatus('RATION USED');
  }

  private activateEncounterWhenReady(): void {
    if (!this.hasAccessCard || getActiveMg1Encounter(this.flow) || isMg1ExtractionUnlocked(this.flow)) return;
    const previous = this.flow;
    this.flow = activateNextMg1Encounter(this.flow, this.player.x);
    if (this.flow.activeEncounterIndex !== previous.activeEncounterIndex) {
      const encounter = getActiveMg1Encounter(this.flow);
      if (encounter) this.spawnEncounter(encounter);
    }
  }

  private spawnEncounter(encounter: Mg1EncounterDefinition): void {
    this.bossUnits = [];
    this.arenaGate?.destroy();
    this.arenaGate = this.physics.add.staticSprite(encounter.gateX, 462, 'door').setTint(0xc85f4b);
    this.physics.add.collider(this.player, this.arenaGate);

    for (let index = 0; index < encounter.unitCount; index += 1) {
      const unitX = encounter.unitCount === 2 ? encounter.arenaX + 70 + index * 230 : encounter.arenaX + 210;
      const unitY = encounter.rules.airborne ? 255 : encounter.behavior === 'tx55_sabotage' ? 425 : encounter.behavior === 'tank' || encounter.behavior === 'bulldozer' ? 458 : 454;
      const sprite = this.physics.add.sprite(unitX, unitY, this.resolveActorTexture(encounter.textureKey)).setDepth(6);
      this.configureActorSprite(sprite, encounter.textureKey);
      sprite.setCollideWorldBounds(true).setDragX(700);
      const body = sprite.body as Phaser.Physics.Arcade.Body;
      if (encounter.rules.airborne || encounter.rules.stationary) body.setAllowGravity(false);
      else this.physics.add.collider(sprite, this.platforms);
      if (encounter.rules.stationary) sprite.setImmovable(true).setVelocity(0, 0);

      const unit: Mg1BossUnit = {
        id: `${encounter.id}_${index + 1}`,
        sprite,
        hp: encounter.hpPerUnit,
        maxHp: encounter.hpPerUnit,
        defeated: false,
        direction: -1,
        lastShotAt: this.time.now + 700,
        nextDustAt: 0
      };
      this.physics.add.overlap(this.player, sprite, () => {
        if (!unit.defeated && encounter.contactDamage > 0) {
          if (encounter.behavior === 'dual_cyborg' || encounter.behavior === 'bulldozer') this.playActorAction(sprite, 'attack');
          this.damagePlayer(encounter.contactDamage, encounter.name);
        }
      }, undefined, this);
      this.physics.add.overlap(this.playerProjectiles, sprite, (projectile) => {
        this.hitEncounterUnit(unit, projectile as Phaser.Physics.Arcade.Sprite);
      }, undefined, this);
      this.bossUnits.push(unit);
    }

    if (encounter.rules.protectedHostages) this.spawnDirtyDuckHostages(encounter);
    this.triggerAlert(`${encounter.name} encounter`);
    this.emitCodec(encounter.id === 'big_boss' ? MG1_CODEC.finalDuel : MG1_CODEC.mercenary);
    this.flashStatus(`${encounter.name.toUpperCase()} // AUTO-EQUIP: ${encounter.requiredPlayerAttack.replace(/_/g, ' ').toUpperCase()}`);
  }

  private spawnDirtyDuckHostages(encounter: Mg1EncounterDefinition): void {
    const hostageCount = encounter.rules.protectedHostages ?? 0;
    const trapX = encounter.arenaX - 255;
    this.add.rectangle(trapX, 503, 122, 18, 0x020302, 0.96)
      .setStrokeStyle(2, 0x8c4e38, 0.9)
      .setDepth(7);
    [-36, 0, 36].forEach((offset) => {
      this.add.triangle(trapX + offset, 491, 0, 16, 8, 0, 16, 16, 0xb66a48, 0.95).setDepth(8);
    });
    const trapZone = this.add.zone(trapX, 489, 116, 42);
    this.physics.add.existing(trapZone, true);
    this.physics.add.overlap(this.player, trapZone, () => {
      this.damagePlayer(18, 'Dirty Duck pit trap');
      this.player.setVelocityX(-190).setVelocityY(-330);
    });

    for (let index = 0; index < hostageCount; index += 1) {
      const hostage = this.physics.add.staticSprite(
        encounter.arenaX - 110 + index * 105,
        488,
        this.resolveActorTexture('mg1OuterHeavenPow')
      )
        .setTint(0xd8d4ba)
        .setDepth(5);
      this.configureActorSprite(hostage, 'mg1OuterHeavenPow');
      hostage.setData('protectedHostage', true);
      const label = this.add.text(hostage.x - 18, hostage.y - 42, `POW ${index + 1}`, {
        fontFamily: 'monospace', fontSize: '9px', color: '#f1df9b', backgroundColor: '#071009'
      }).setDepth(6);
      const protectedHostage: Mg1ProtectedHostage = { sprite: hostage, label, harmed: false };
      this.physics.add.overlap(this.playerProjectiles, hostage, (projectile) => {
        this.harmProtectedHostage(protectedHostage, projectile as Phaser.Physics.Arcade.Sprite);
      }, undefined, this);
      this.protectedHostages.push(protectedHostage);
    }
  }

  private harmProtectedHostage(hostage: Mg1ProtectedHostage, projectile: Phaser.Physics.Arcade.Sprite): void {
    if (hostage.harmed || !projectile.active) return;
    const impactX = projectile.x;
    const impactY = projectile.y;
    this.expirePlayerProjectile(projectile, false);
    hostage.harmed = true;
    this.hostagesHarmed += 1;
    this.completedObjectives.delete('defeat_dirty_duck');
    hostage.sprite.setTint(0x6f3d3d);
    this.playActorAction(hostage.sprite, 'death');
    hostage.label.setText('POW DOWN').setColor('#ff7a66').setY(hostage.sprite.y - 18);
    const body = hostage.sprite.body as Phaser.Physics.Arcade.StaticBody;
    body.updateFromGameObject();
    body.enable = false;
    this.playVfx('mg1BulletImpactVfx', impactX, impactY);
    this.flashStatus(`POW HARMED // RANK PENALTY -${getMg1HostageStealthPenalty(1)}`);
  }

  private handleEncounter(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    if (!encounter) return;
    const activeUnits = this.bossUnits.filter((unit) => !unit.defeated);
    activeUnits.forEach((unit) => this.updateEncounterUnit(encounter, unit));
  }

  private updateEncounterUnit(encounter: Mg1EncounterDefinition, unit: Mg1BossUnit): void {
    const distanceX = Math.abs(this.player.x - unit.sprite.x);
    unit.direction = this.player.x < unit.sprite.x ? -1 : 1;
    unit.sprite.setFlipX(unit.direction < 0);

    if (encounter.behavior === 'tx55_sabotage') {
      unit.sprite.setVelocity(0, 0);
      this.playActorLoop(unit.sprite, 'idle');
      return;
    }
    if (encounter.behavior === 'aircraft') {
      // The MG1 Hind D is a fixed gunship target; only its rotor and weapon cycle animate.
      unit.sprite.setVelocity(0, 0).setY(250);
      this.playActorLoop(unit.sprite, 'idle');
    } else if (encounter.behavior === 'bulldozer') {
      unit.sprite.setFlipX(true).setVelocityX(-168);
      this.playActorLoop(unit.sprite, 'move');
      if (unit.sprite.x < encounter.arenaX - 300) unit.sprite.x = encounter.gateX - 90;
      if (this.time.now >= unit.nextDustAt) {
        unit.nextDustAt = this.time.now + 260;
        this.playVfx('mg1DustPuffVfx', unit.sprite.x + 36, unit.sprite.y + 20);
      }
    } else if (encounter.behavior === 'tank') {
      unit.sprite.setVelocityX(unit.direction * 46);
      this.playActorLoop(unit.sprite, 'move');
    } else if (encounter.behavior === 'hostage_boomerang') {
      unit.sprite.setVelocityX(unit.direction * 38);
      this.playActorLoop(unit.sprite, 'move');
    } else if (encounter.behavior === 'dual_cyborg') {
      unit.sprite.setVelocityX(unit.direction * 92);
      this.playActorLoop(unit.sprite, 'move');
    } else {
      unit.sprite.setVelocityX(unit.direction * (encounter.behavior === 'final_duel' ? 105 : 62));
      this.playActorLoop(unit.sprite, 'move');
    }

    if (!encounter.rules.firesProjectiles || !encounter.enemyProjectileTextureKey || distanceX > 720 || this.time.now < unit.lastShotAt) return;
    unit.lastShotAt = this.time.now + (encounter.fireIntervalMs ?? 1200);
    this.fireEncounterPattern(encounter, unit);
  }

  private fireEncounterPattern(encounter: Mg1EncounterDefinition, unit: Mg1BossUnit): void {
    this.playActorAction(unit.sprite, 'attack');
    const direction = unit.direction;
    if (encounter.behavior === 'shotgun') {
      [-120, -60, 0, 60, 120].forEach((velocityY) => this.fireEnemyProjectile(unit, encounter, direction * 435, velocityY, 10));
      return;
    }
    if (encounter.behavior === 'machinegun' || encounter.behavior === 'final_duel') {
      const shots = encounter.behavior === 'final_duel' ? 3 : 4;
      for (let index = 0; index < shots; index += 1) {
        this.time.delayedCall(index * 110, () => !unit.defeated && this.fireEnemyProjectile(unit, encounter, direction * 545, Phaser.Math.Between(-28, 28), 12));
      }
      return;
    }
    if (encounter.behavior === 'aircraft') {
      const velocityY = Phaser.Math.Clamp((this.player.y - unit.sprite.y) * 1.15, -150, 210);
      [-34, 0, 34].forEach((spread, index) => {
        this.time.delayedCall(index * 95, () => {
          if (!unit.defeated) this.fireEnemyProjectile(unit, encounter, direction * 510, velocityY + spread, 10);
        });
      });
      return;
    }
    if (encounter.behavior === 'tank') {
      const aimY = Phaser.Math.Clamp((this.player.y - unit.sprite.y) * 0.45, -65, 65);
      [-38, 38].forEach((spread, index) => {
        this.time.delayedCall(index * 105, () => {
          if (!unit.defeated) this.fireEnemyProjectile(unit, encounter, direction * 430, aimY + spread, 15, 'mg1ExplosionSmallVfx');
        });
      });
      this.time.delayedCall(225, () => {
        if (!unit.defeated) this.fireEnemyProjectile(unit, encounter, direction * 350, aimY, 24, 'mg1ExplosionSmallVfx', 'mg1Rocket');
      });
      return;
    }
    if (encounter.behavior === 'flamethrower') {
      const clockwise = Math.sin(this.time.now / 420) >= 0;
      const sweepAngles = clockwise ? [-48, -24, 0, 24, 48] : [48, 24, 0, -24, -48];
      sweepAngles.forEach((angle, index) => {
        this.time.delayedCall(index * 72, () => {
          if (unit.defeated) return;
          const radians = Phaser.Math.DegToRad(angle);
          this.fireEnemyProjectile(
            unit,
            encounter,
            direction * Math.cos(radians) * 345,
            Math.sin(radians) * 345,
            14,
            'mg1FlameImpactVfx'
          );
        });
      });
      return;
    }
    if (encounter.behavior === 'hostage_boomerang') {
      const boomerang = this.fireEnemyProjectile(unit, encounter, direction * 390, -45, 14);
      if (boomerang) {
        const generation = this.getProjectileGeneration(boomerang);
        this.time.delayedCall(520, () => {
          if (this.isCurrentProjectileGeneration(boomerang, generation)) boomerang.setVelocityX(-boomerang.body!.velocity.x);
        });
      }
    }
  }

  private fireEnemyProjectile(
    unit: Mg1BossUnit,
    encounter: Mg1EncounterDefinition,
    velocityX: number,
    velocityY: number,
    damage: number,
    impactVfx = 'mg1BulletImpactVfx',
    textureKey = encounter.enemyProjectileTextureKey
  ): Phaser.Physics.Arcade.Sprite | null {
    if (!textureKey) return null;
    const projectile = this.obtainProjectile(this.enemyProjectiles, unit.sprite.x + Math.sign(velocityX) * 34, unit.sprite.y - 8, textureKey);
    if (!projectile) return null;
    projectile.setVelocity(velocityX, velocityY).setFlipX(velocityX < 0);
    (projectile.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    projectile.setData('damage', damage);
    projectile.setData('source', encounter.name);
    projectile.setData('impactVfx', impactVfx);
    projectile.setData('protectedHostageDamage', 0);
    this.playVfx('mg1MuzzleFlashVfx', projectile.x, projectile.y, velocityX < 0);
    this.scheduleProjectileExpiry(projectile, 2200, 'enemy');
    return projectile;
  }

  private hitEncounterUnit(unit: Mg1BossUnit, projectile: Phaser.Physics.Arcade.Sprite): void {
    if (unit.defeated || !projectile.active) return;
    const encounter = getActiveMg1Encounter(this.flow);
    const attack = projectile.getData('attack') as Mg1PlayerAttack | undefined;
    const impactX = projectile.x;
    const impactY = projectile.y;
    this.expirePlayerProjectile(projectile, false);
    if (!encounter || attack !== encounter.requiredPlayerAttack) {
      this.playVfx(encounter?.rules.stationary || encounter?.behavior === 'tank' || encounter?.behavior === 'bulldozer' ? 'mg1MetalSparksVfx' : 'mg1BulletImpactVfx', impactX, impactY);
      this.flashStatus(`INEFFECTIVE // REQUIRED: ${encounter?.requiredPlayerAttack.replace(/_/g, ' ').toUpperCase() ?? 'UNKNOWN'}`);
      return;
    }

    unit.hp = Math.max(0, unit.hp - 1);
    const machine = encounter.rules.airborne || encounter.behavior === 'tank' || encounter.behavior === 'bulldozer';
    this.playVfx(machine ? 'mg1MetalSparksVfx' : 'mg1BulletImpactVfx', impactX, impactY);
    this.playActorAction(unit.sprite, 'hit');
    unit.sprite.setTint(0xff9966);
    this.time.delayedCall(110, () => unit.sprite.active && !unit.defeated && unit.sprite.clearTint());
    this.emitBossMidfightWhenReady(encounter);
    if (unit.hp <= 0) {
      unit.defeated = true;
      unit.sprite.setVelocity(0, 0).setTint(0x4c5b45);
      this.playActorAction(unit.sprite, 'death');
      this.kills += 1;
      this.playVfx(machine ? 'mg1ExplosionLargeVfx' : 'mg1ExplosionSmallVfx', unit.sprite.x, unit.sprite.y);
      if (machine) this.playVfx('mg1SmokePlumeVfx', unit.sprite.x, unit.sprite.y - 35);
    }
    if (isMg1EncounterDefeated(encounter, this.bossUnits.filter((candidate) => candidate.defeated).length)) this.defeatActiveEncounter();
  }

  private defeatActiveEncounter(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    if (!encounter) return;
    if (encounter.behavior === 'tx55_sabotage') {
      const tx55 = this.bossUnits[0];
      if (tx55) {
        tx55.defeated = true;
        tx55.hp = 0;
        tx55.sprite.setTint(0x46504a);
        this.playActorAction(tx55.sprite, 'death');
        this.playVfx('mg1ExplosionLargeVfx', tx55.sprite.x, tx55.sprite.y);
        this.playVfx('mg1SmokePlumeVfx', tx55.sprite.x, tx55.sprite.y - 55);
      }
      this.selfDestructStarted = true;
    }
    this.flow = completeActiveMg1Encounter(this.flow);
    const objectiveCredited = shouldCreditMg1EncounterObjective(encounter.id, this.hostagesHarmed);
    if (objectiveCredited) this.completedObjectives.add(`defeat_${encounter.id}`);
    this.arenaGate?.destroy();
    this.arenaGate = null;
    this.ammo = Math.min(this.maxAmmo, this.ammo + 14);
    this.alertState = 'NORMAL';
    const encounterStatus = encounter.id === 'tx55_metal_gear'
      ? 'TX-55 DESTROYED // OUTER HEAVEN SELF-DESTRUCT STARTED'
      : encounter.id === 'dirty_duck' && !objectiveCredited
        ? 'DIRTY DUCK DEFEATED // POW PROTECTION OBJECTIVE FAILED'
        : `${encounter.name.toUpperCase()} DEFEATED`;
    this.flashStatus(encounterStatus);
    if (encounter.id === 'big_boss') this.emitCodec(MG1_CODEC.complete);
    else this.emitCodec({ ...MG1_CODEC.mercenary, trigger: 'boss_defeated', message: `${encounter.name} neutralized. Advance through Outer Heaven.` });
  }

  private emitBossMidfightWhenReady(encounter: Mg1EncounterDefinition): void {
    if (encounter.behavior === 'tx55_sabotage' || this.bossMidfightCodecEmitted.has(encounter.id)) return;
    const remainingHealth = this.bossUnits.filter((unit) => !unit.defeated).reduce((total, unit) => total + unit.hp, 0);
    const maxHealth = this.bossUnits.reduce((total, unit) => total + unit.maxHp, 0);
    if (remainingHealth <= 0 || remainingHealth > maxHealth / 2) return;
    this.bossMidfightCodecEmitted.add(encounter.id);
    this.emitCodec({ ...MG1_CODEC.midfight, message: `${encounter.name} is at half strength. Exploit the current attack window.` });
  }

  private handleHazards(): void {
    this.hazards.forEach((hazard) => {
      if (hazard.disabled) return;
      const definition = hazard.definition;
      const distanceX = Math.abs(this.player.x - hazard.sprite.x);
      const direction = this.player.x < hazard.sprite.x ? -1 : 1;
      if (definition.behavior === 'guard') {
        if (hazard.sprite.x <= definition.patrolMin) hazard.direction = 1;
        if (hazard.sprite.x >= definition.patrolMax) hazard.direction = -1;
        if (this.alertState === 'ALERT' && distanceX < 620) hazard.direction = direction;
        hazard.sprite.setVelocityX(hazard.direction * (this.alertState === 'ALERT' ? 112 : 70)).setFlipX(hazard.direction < 0);
        this.playActorLoop(hazard.sprite, 'move');
        if (distanceX < 330 && Math.abs(this.player.y - hazard.sprite.y) < 90) this.triggerAlert('Outer Heaven soldier');
      } else if (definition.behavior === 'air_trooper') {
        if (hazard.sprite.x <= definition.patrolMin) hazard.direction = 1;
        if (hazard.sprite.x >= definition.patrolMax) hazard.direction = -1;
        hazard.sprite.setVelocityX(hazard.direction * 76).setFlipX(hazard.direction < 0);
        hazard.sprite.y = hazard.baseY + Math.sin(this.time.now / 330) * 28;
        this.playActorLoop(hazard.sprite, 'move');
        if (distanceX < 520) this.triggerAlert('Air Trooper');
      } else if (definition.behavior === 'attack_dog') {
        if (distanceX < 470) {
          hazard.direction = direction;
          this.triggerAlert('attack dog');
        } else {
          if (hazard.sprite.x <= definition.patrolMin) hazard.direction = 1;
          if (hazard.sprite.x >= definition.patrolMax) hazard.direction = -1;
        }
        hazard.sprite.setVelocityX(hazard.direction * (distanceX < 470 ? 155 : 78)).setFlipX(hazard.direction < 0);
        this.playActorLoop(hazard.sprite, 'move');
      } else if (definition.behavior === 'scorpion') {
        if (hazard.sprite.x <= definition.patrolMin) hazard.direction = 1;
        if (hazard.sprite.x >= definition.patrolMax) hazard.direction = -1;
        hazard.sprite.setVelocityX(hazard.direction * 46).setFlipX(hazard.direction < 0);
        this.playActorLoop(hazard.sprite, 'move');
      } else {
        if (hazard.sprite.x <= definition.patrolMin) hazard.direction = 1;
        if (hazard.sprite.x >= definition.patrolMax) hazard.direction = -1;
        hazard.sprite.setVelocityX(hazard.direction * 52).setVelocityY(0).setFlipX(hazard.direction < 0);
        hazard.sprite.y = hazard.baseY + Math.sin((this.time.now + definition.x) / 260) * 5;
        this.playActorLoop(hazard.sprite, 'idle');
        if (distanceX < 520 && !this.isChaffActive()) this.triggerAlert('gun camera');
      }

      const electronicJammed = this.isChaffActive() && (definition.behavior === 'gun_camera' || definition.behavior === 'air_trooper');
      if (electronicJammed || !definition.projectileTextureKey || distanceX > 560 || this.time.now < hazard.lastShotAt) return;
      hazard.lastShotAt = this.time.now + (definition.behavior === 'gun_camera' ? 390 : 980);
      const projectile = this.obtainProjectile(this.enemyProjectiles, hazard.sprite.x + direction * 18, hazard.sprite.y, definition.projectileTextureKey);
      if (!projectile) return;
      projectile.setVelocityX(direction * (definition.behavior === 'gun_camera' ? 720 : 455)).setVelocityY(0).setFlipX(direction < 0);
      (projectile.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      projectile.setData('damage', definition.behavior === 'gun_camera' ? 8 : definition.behavior === 'air_trooper' ? 12 : 10);
      projectile.setData('source', definition.behavior);
      projectile.setData('impactVfx', definition.behavior === 'gun_camera' ? 'mg1LaserImpactVfx' : 'mg1BulletImpactVfx');
      this.playActorAction(hazard.sprite, 'attack');
      this.playVfx('mg1MuzzleFlashVfx', projectile.x, projectile.y, direction < 0);
      this.scheduleProjectileExpiry(projectile, 1500, 'enemy');
    });
  }

  private hitHazard(hazard: Mg1HazardUnit, projectile: Phaser.Physics.Arcade.Sprite): void {
    if (hazard.disabled || !projectile.active) return;
    const x = projectile.x;
    const y = projectile.y;
    this.expirePlayerProjectile(projectile, false);
    hazard.hp -= 1;
    const mechanical = hazard.definition.behavior === 'gun_camera';
    this.playVfx(mechanical ? 'mg1MetalSparksVfx' : 'mg1BulletImpactVfx', x, y);
    if (hazard.hp > 0) {
      this.playActorAction(hazard.sprite, 'hit');
      return;
    }
    hazard.disabled = true;
    hazard.sprite.setVelocity(0, 0).setTint(0x4c5b45);
    this.playActorAction(hazard.sprite, 'death');
    this.kills += 1;
    if (mechanical) this.camerasDisabled += 1;
    this.playVfx('mg1ExplosionSmallVfx', hazard.sprite.x, hazard.sprite.y);
  }

  private obtainProjectile(group: Phaser.Physics.Arcade.Group, x: number, y: number, textureKey: string): Phaser.Physics.Arcade.Sprite | null {
    const projectile = group.get(x, y, textureKey) as Phaser.Physics.Arcade.Sprite | null;
    if (!projectile) return null;
    projectile.setTexture(textureKey).setActive(true).setVisible(true).clearTint();
    projectile.enableBody(true, x, y, true, true);
    projectile.setVelocity(0, 0);
    const body = projectile.body as Phaser.Physics.Arcade.Body;
    body.setSize(projectile.width, projectile.height, true);
    body.setAllowGravity(false);
    projectile.setDataEnabled();
    projectile.data?.reset();
    projectile.setData('generation', ++this.projectileGeneration);
    return projectile;
  }

  private getProjectileGeneration(projectile: Phaser.Physics.Arcade.Sprite): number {
    return Number(projectile.getData('generation') ?? -1);
  }

  private isCurrentProjectileGeneration(projectile: Phaser.Physics.Arcade.Sprite, generation: number): boolean {
    return projectile.active && this.getProjectileGeneration(projectile) === generation;
  }

  private scheduleProjectileExpiry(
    projectile: Phaser.Physics.Arcade.Sprite,
    delayMs: number,
    owner: 'player' | 'enemy'
  ): void {
    const generation = this.getProjectileGeneration(projectile);
    this.time.delayedCall(delayMs, () => {
      if (!this.isCurrentProjectileGeneration(projectile, generation)) return;
      if (owner === 'player') this.expirePlayerProjectile(projectile, false);
      else this.expireEnemyProjectile(projectile, false);
    });
  }

  private activePlayerBulletCount(): number {
    return this.playerProjectiles.getChildren().filter((child) => {
      if (!child.active) return false;
      return (child as Phaser.Physics.Arcade.Sprite).getData('attack') !== 'landmine';
    }).length;
  }

  private expirePlayerProjectile(projectile: Phaser.Physics.Arcade.Sprite, impact: boolean): void {
    if (!projectile.active) return;
    if (impact) this.playVfx('mg1BulletImpactVfx', projectile.x, projectile.y);
    projectile.disableBody(true, true);
    if (projectile === this.activeRemoteMissile) {
      this.activeRemoteMissile = null;
      const cameraLerp = this.inputController.profile.reducedMotion ? 1 : 0.08;
      this.cameras.main.startFollow(this.player, true, cameraLerp, cameraLerp);
      this.playActorLoop(this.player, 'idle', true);
    }
  }

  private expireEnemyProjectile(projectile: Phaser.Physics.Arcade.Sprite, impact: boolean): void {
    if (!projectile.active) return;
    if (impact) this.playVfx(String(projectile.getData('impactVfx') ?? 'mg1BulletImpactVfx'), projectile.x, projectile.y);
    projectile.disableBody(true, true);
  }

  private hitPlayerWithProjectile(projectile: Phaser.Physics.Arcade.Sprite): void {
    const damage = Number(projectile.getData('damage') ?? 10);
    const source = String(projectile.getData('source') ?? 'Outer Heaven fire');
    const impactVfx = String(projectile.getData('impactVfx') ?? 'mg1BulletImpactVfx');
    const x = projectile.x;
    const y = projectile.y;
    this.expireEnemyProjectile(projectile, false);
    this.playVfx(impactVfx, x, y);
    this.damagePlayer(damage, source);
  }

  private damagePlayer(amount: number, source: string): void {
    if (this.health <= 0 || this.time.now < this.lastDamageAt + 550) return;
    this.lastDamageAt = this.time.now;
    this.health = Math.max(0, this.health - amount);
    this.damageTaken += amount;
    this.player.setTint(0xff6b5e);
    if (this.health > 0) this.playActorAction(this.player, 'hit');
    this.time.delayedCall(130, () => this.player.active && this.health > 0 && this.player.clearTint());
    this.inputController.vibrate(120, 0.6, 0.45);
    if (this.health <= 30 && !this.lowHealthCodecEmitted) {
      this.lowHealthCodecEmitted = true;
      this.emitCodec(MG1_CODEC.inside);
    }
    if (this.health <= 0) this.failMission(source);
  }

  private triggerAlert(source: string): void {
    this.alertState = 'ALERT';
    this.lastAlertSource = source;
    if (this.time.now < this.nextAlertAllowedAt) return;
    this.nextAlertAllowedAt = this.time.now + 5000;
    this.alertCount += 1;
    if (!this.firstAlertCodecEmitted && !source.endsWith(' encounter')) {
      this.firstAlertCodecEmitted = true;
      this.emitCodec(MG1_CODEC.firstAlert);
    } else if (source === 'gun camera' && !this.cameraDetectedCodecEmitted) {
      this.cameraDetectedCodecEmitted = true;
      this.emitCodec(MG1_CODEC.cameraDetected);
    }
    const payload: AlertEventPayload = {
      missionId: MG1_OUTER_HEAVEN_MISSION_ID,
      missionTitle: MISSION_TITLE,
      level: 'ALERT',
      alerts: this.alertCount,
      source,
      message: `${source} detected Snake`,
      timeSeconds: Math.round((this.time.now - this.missionStartTime) / 1000),
      suspicion: 100,
      stealthScore: this.getStealthScore()
    };
    emitGameEvent<AlertEventPayload>(GAME_EVENT.ALERT, payload);
  }

  private emitManualCodec(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    const jennifer = MG1_NPC_CHECKPOINTS.find((checkpoint) => checkpoint.id === 'inside_agent_jennifer');
    if (!this.secretFrequencyCodecEmitted && jennifer && Math.abs(this.player.x - jennifer.x) <= 190) {
      this.secretFrequencyCodecEmitted = true;
      this.emitCodec(MG1_CODEC.secretFrequency);
    } else if (encounter?.id === 'big_boss') this.emitCodec(MG1_CODEC.finalDuel);
    else if (encounter) this.emitCodec(MG1_CODEC.mercenary);
    else if (this.hasAccessCard) this.emitCodec(MG1_CODEC.resistance);
    else this.emitCodec({ ...MG1_CODEC.missionStart, trigger: 'manual_call', pauseGame: false });
  }

  private emitCodec(call: Mg1CodecCall): void {
    emitGameEvent<CodecRequestPayload>(GAME_EVENT.REQUEST_CODEC_CALL, call);
    if (call.pauseGame && !this.missionCompleted) this.scene.pause();
  }

  private playVfx(textureKey: string, x: number, y: number, flipX = false): void {
    const animationKey = this.vfxAnimationKey(textureKey);
    if (!this.anims.exists(animationKey)) return;
    const sprite = this.add.sprite(x, y, textureKey).setDepth(30).setFlipX(flipX);
    sprite.play(animationKey);
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => sprite.destroy());
  }

  private vfxAnimationKey(textureKey: string): string {
    return `mg1-runtime-${textureKey}`;
  }

  private updateHud(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    const bossHealth = this.bossUnits.filter((unit) => !unit.defeated).reduce((total, unit) => total + unit.hp, 0);
    const bossMax = this.bossUnits.reduce((total, unit) => total + unit.maxHp, 0);
    this.statusText.setText(
      `STATUS ${this.alertState} | CARD ${this.hasAccessCard ? 'OH' : 'NONE'} | ENCOUNTERS ${this.flow.defeatedEncounterIds.length}/${MG1_ENCOUNTER_SEQUENCE.length} | STEALTH ${this.getStealthScore()}`
    );
    this.objectiveText.setText(`OBJECTIVE: ${getMg1ObjectiveLabel(this.flow, this.hasAccessCard)}`);
    this.alertText.setText(`ALERTS ${this.alertCount} | SOURCE ${this.lastAlertSource.toUpperCase()}${this.selfDestructStarted ? ' | SELF-DESTRUCT ACTIVE' : ''}`);
    this.hudText.setText(`HP ${this.health}/${this.maxHealth} | AMMO ${this.ammo}/${this.maxAmmo} | RATION ${this.rations} | J FIRE | SPACE ACTION/CQC | C CODEC`);
    this.bossText.setText(encounter ? `BOSS ${encounter.name.toUpperCase()} | ${bossHealth}/${bossMax}${encounter.id === 'tx55_metal_gear' ? ` | C4 ${this.flow.tx55ChargeIndex}/16` : ''}` : '');
  }

  private emitHudUpdate(): void {
    const encounter = getActiveMg1Encounter(this.flow);
    const bossHealth = this.bossUnits.filter((unit) => !unit.defeated).reduce((total, unit) => total + unit.hp, 0);
    const bossMaxHealth = this.bossUnits.reduce((total, unit) => total + unit.maxHp, 0);
    const payload: MissionHudPayload = {
      missionId: MG1_OUTER_HEAVEN_MISSION_ID,
      missionTitle: MISSION_TITLE,
      bossName: encounter?.name ?? 'Big Boss',
      health: this.health,
      maxHealth: this.maxHealth,
      ammo: this.ammo,
      maxAmmo: this.maxAmmo,
      rations: this.rations,
      chaff: this.chaff,
      hasKeycard: this.hasAccessCard,
      alertState: this.alertState,
      suspicion: this.alertState === 'ALERT' ? 100 : 0,
      stealthScore: this.getStealthScore(),
      reinforcementCount: 0,
      activeEnemies: this.hazards.filter((hazard) => !hazard.disabled).length + this.bossUnits.filter((unit) => !unit.defeated).length,
      lastAlertSource: this.lastAlertSource,
      alerts: this.alertCount,
      shotsFired: this.shotsFired,
      kills: this.kills,
      neutralizations: this.neutralizations,
      camerasDisabled: this.camerasDisabled,
      objective: getMg1ObjectiveLabel(this.flow, this.hasAccessCard),
      objectiveStage: encounter?.id ?? (isMg1ExtractionUnlocked(this.flow) ? 'extract' : 'infiltrate'),
      objectivesCompleted: this.completedObjectives.size,
      totalObjectives: MG1_OUTER_HEAVEN_WORLD.totalObjectives,
      secretsFound: 0,
      totalSecrets: 0,
      bossActive: Boolean(encounter),
      bossDefeated: isMg1ExtractionUnlocked(this.flow),
      bossHealth,
      bossMaxHealth,
      chaffActive: this.isChaffActive()
    };
    emitGameEvent<MissionHudPayload>(GAME_EVENT.HUD_UPDATE, payload);
  }

  private completeMission(): void {
    if (this.missionCompleted) return;
    if (!this.hasAccessCard || !isMg1ExtractionUnlocked(this.flow)) {
      this.flashStatus(!this.hasAccessCard ? 'OUTER HEAVEN ACCESS CARD REQUIRED' : 'BIG BOSS STILL CONTROLS THE ESCAPE ROUTE');
      return;
    }
    this.missionCompleted = true;
    this.completedObjectives.add('escape_outer_heaven');
    const hostageOutcome = this.hostagesHarmed > 0 ? ` // ${this.hostagesHarmed} POW harmed` : ' // all POWs protected';
    const result = this.buildMissionResult(true, `Operation Intrude N313 complete: Outer Heaven escaped${hostageOutcome}`);
    emitGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, result);
    this.scene.start('MissionCompleteScene', result);
  }

  private failMission(source: string): void {
    if (this.missionCompleted) return;
    this.missionCompleted = true;
    this.alertState = 'MISSION FAILED';
    this.player.setVelocity(0, 0).setTint(0x333333);
    this.playActorAction(this.player, 'death');
    this.emitCodec(MG1_CODEC.failed);
    const result = this.buildMissionResult(false, `Operation failed: ${source}`);
    emitGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, result);
    this.time.delayedCall(900, () => this.scene.start('MissionCompleteScene', result));
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
        reinforcementCount: 0
      })
      : 'MISSION FAILED';
    return {
      missionId: MG1_OUTER_HEAVEN_MISSION_ID,
      missionTitle: MISSION_TITLE,
      bossName: 'Big Boss',
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
      totalObjectives: MG1_OUTER_HEAVEN_WORLD.totalObjectives,
      secretsFound: 0,
      totalSecrets: 0,
      bossDefeated: isMg1ExtractionUnlocked(this.flow),
      noAlert: this.alertCount === 0,
      noKill: this.kills === 0,
      stealthScore: this.getStealthScore(),
      reinforcementCount: 0
    };
  }

  private getStealthScore(): number {
    let score = 1000;
    score -= this.alertCount * 150;
    score -= this.kills * 22;
    score -= this.damageTaken * 2;
    score -= this.rationsUsed * 60;
    score -= getMg1HostageStealthPenalty(this.hostagesHarmed);
    score -= Math.max(0, this.shotsFired - 24) * 3;
    score += this.flow.defeatedEncounterIds.length * 12;
    return Math.max(0, Math.round(score));
  }

  private flashStatus(message: string): void {
    if (!this.objectiveText) return;
    this.objectiveText.setText(`INFO: ${message}`);
    this.time.delayedCall(1500, () => {
      if (this.objectiveText?.active && !this.missionCompleted) this.objectiveText.setText(`OBJECTIVE: ${getMg1ObjectiveLabel(this.flow, this.hasAccessCard)}`);
    });
  }

  private isChaffActive(): boolean {
    return this.time.now < this.chaffActiveUntil;
  }
}
