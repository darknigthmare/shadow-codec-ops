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
  getMgs1ActorAnimationAssetBySourceTexture,
  getMgs1ActorAnimationKey,
  MGS1_ACTOR_ANIMATION_ASSETS,
  type Mgs1ActorAnimationAsset,
  type Mgs1ActorAnimationState
} from '../core/mgs1ActorAnimationRegistry';
import {
  activateNextMgs1Encounter,
  completeActiveMgs1Encounter,
  createMgs1MissionFlowState,
  deployMgs1EscapeVehicles,
  getActiveMgs1Encounter,
  getMgs1ObjectiveLabel,
  isMgs1BossRouteComplete,
  isMgs1ExtractionUnlocked,
  MGS1_BOSS_SEQUENCE,
  MGS1_DECOY_OCTOPUS_REVEAL,
  MGS1_ESCAPE_VEHICLES,
  MGS1_HAZARD_SEQUENCE,
  MGS1_NPC_CHECKPOINTS,
  MGS1_SHADOW_MOSES_MISSION_ID,
  MGS1_SHADOW_MOSES_WORLD,
  revealMgs1DecoyOctopus,
  type Mgs1BossAttackPattern,
  type Mgs1BossEncounterDefinition,
  type Mgs1HazardDefinition,
  type Mgs1MissionFlowState
} from '../core/mgs1ShadowMosesMission';
import { MGS1_SIDEOPS_VFX_ASSETS } from '../core/mgs1SideOpsAssetRegistry';
import { RuntimeInputController } from '../core/RuntimeInput';
import { calculateSideOpsRank } from '../systems/rankSystem';

type Mgs1AlertState = 'NORMAL' | 'ALERT' | 'MISSION FAILED';

interface ActiveBossUnit {
  definition: Mgs1BossEncounterDefinition;
  sprite: Phaser.Physics.Arcade.Sprite;
  hp: number;
  maxHp: number;
  direction: number;
  nextAttackAt: number;
  attackIndex: number;
}

interface Mgs1HazardUnit {
  definition: Mgs1HazardDefinition;
  sprite: Phaser.Physics.Arcade.Sprite;
  hp: number;
  direction: number;
  nextAttackAt: number;
  disabled: boolean;
}

interface Mgs1CodecCall {
  trigger: CodecRequestPayload['trigger'];
  contactId: string;
  conversationId: string;
  message: string;
  pauseGame: boolean;
}

const MISSION_TITLE = 'Shadow Moses Incident';
const PLAYER_PROJECTILE_LIFETIME_MS = 1500;

const MGS1_CODEC = {
  missionStart: { trigger: 'mission_start', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_mission_start', message: 'Shadow Moses infiltration orders received.', pauseGame: true },
  foxhound: { trigger: 'boss_intro', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_foxhound', message: 'A FOXHOUND operative blocks the route.', pauseGame: false },
  rex: { trigger: 'boss_intro', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_rex', message: 'Metal Gear REX is active.', pauseGame: true },
  decoy: { trigger: 'secret_frequency', contactId: 'naomi_mgs1', conversationId: 'mgs1_naomi_genetics_manual', message: 'The DARPA Chief identity was a biological disguise.', pauseGame: false },
  manual: { trigger: 'manual_call', contactId: 'otacon_mgs1', conversationId: 'mgs1_otacon_security_manual', message: 'Otacon is monitoring Shadow Moses security.', pauseGame: false },
  lowHealth: { trigger: 'low_health', contactId: 'naomi_mgs1', conversationId: 'mgs1_naomi_medical', message: 'Snake needs medical support.', pauseGame: false },
  complete: { trigger: 'mission_complete', contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_mission_complete', message: 'Shadow Moses escaped. Mission complete.', pauseGame: true },
  failed: { trigger: 'low_health', contactId: 'naomi_mgs1', conversationId: 'mgs1_naomi_mission_failed', message: 'Snake is down. Mission failed.', pauseGame: false }
} as const satisfies Record<string, Mgs1CodecCall>;

/**
 * Full MGS1 Side Ops route compressed into one continuous playable 2D mission.
 * The scene intentionally uses registry keys only; PreloadScene may supply the
 * generated art or its deterministic fallback texture without changing logic.
 */
export class Mgs1ShadowMosesScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private playerProjectiles!: Phaser.Physics.Arcade.Group;
  private enemyProjectiles!: Phaser.Physics.Arcade.Group;
  private inputController!: RuntimeInputController;
  private activeBoss: ActiveBossUnit | null = null;
  private hazards: Mgs1HazardUnit[] = [];
  private arenaGate: Phaser.Physics.Arcade.Sprite | null = null;
  private decoySprite: Phaser.GameObjects.Sprite | null = null;
  private decoyLabel: Phaser.GameObjects.Text | null = null;
  private escapeJeep: Phaser.Physics.Arcade.Sprite | null = null;
  private snowmobile: Phaser.GameObjects.Sprite | null = null;

  private flow: Mgs1MissionFlowState = createMgs1MissionFlowState();
  private maxHealth = 100;
  private health = 100;
  private maxAmmo: number = MGS1_SHADOW_MOSES_WORLD.maxAmmo;
  private ammo: number = MGS1_SHADOW_MOSES_WORLD.startAmmo;
  private rations: number = MGS1_SHADOW_MOSES_WORLD.startRations;
  private chaff: number = MGS1_SHADOW_MOSES_WORLD.startChaff;
  private chaffActiveUntil = 0;
  private missionCompleted = false;
  private alertState: Mgs1AlertState = 'NORMAL';
  private alertUntil = 0;
  private lastAlertSource = 'none';
  private lowHealthCodecEmitted = false;
  private nextPlayerShotAt = 0;
  private lastDamageAt = 0;

  private missionStartTime = 0;
  private shotsFired = 0;
  private kills = 0;
  private neutralizations = 0;
  private rationsUsed = 0;
  private damageTaken = 0;
  private camerasDisabled = 0;
  private alertCount = 0;
  private completedObjectives = new Set<string>();

  private hudText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private alertText!: Phaser.GameObjects.Text;
  private bossText!: Phaser.GameObjects.Text;

  private offCodecResume?: () => void;
  private offMissionRestart?: () => void;
  private offDirectorDirective?: () => void;

  constructor() {
    super('Mgs1ShadowMosesScene');
  }

  create(): void {
    this.resetMissionState();
    this.missionStartTime = this.time.now;
    this.physics.world.setBounds(0, 0, MGS1_SHADOW_MOSES_WORLD.worldWidth, 540);
    this.cameras.main.setBounds(0, 0, MGS1_SHADOW_MOSES_WORLD.worldWidth, 540);

    this.createActorAnimations();
    this.createVfxAnimations();
    this.createShadowMosesBackdrop();
    this.createWorldGeometry();

    this.player = this.physics.add.sprite(
      MGS1_SHADOW_MOSES_WORLD.start.x,
      MGS1_SHADOW_MOSES_WORLD.start.y,
      this.resolveActorTexture('player', 'player')
    );
    this.configureActorSprite(this.player, 'player', 'player');
    this.player.setCollideWorldBounds(true).setDragX(1300).setMaxVelocity(320, 540);
    this.physics.add.collider(this.player, this.platforms);

    this.playerProjectiles = this.physics.add.group({ maxSize: 48 });
    this.enemyProjectiles = this.physics.add.group({ maxSize: 96 });
    this.physics.add.collider(this.playerProjectiles, this.platforms, (projectile) => {
      this.expireProjectile(projectile as Phaser.Physics.Arcade.Sprite, true);
    });
    this.physics.add.collider(this.enemyProjectiles, this.platforms, (projectile) => {
      this.expireEnemyProjectile(projectile as Phaser.Physics.Arcade.Sprite, true);
    });
    this.physics.add.overlap(this.enemyProjectiles, this.player, (projectile) => {
      this.hitPlayerWithProjectile(projectile as Phaser.Physics.Arcade.Sprite);
    }, undefined, this);

    this.spawnNpcCheckpoints();
    this.spawnDecoyNarrativeEncounter();
    this.spawnHazards();
    this.createFixedHud();

    this.inputController = new RuntimeInputController(this);
    const cameraLerp = this.inputController.profile.reducedMotion ? 1 : 0.08;
    this.cameras.main.startFollow(this.player, true, cameraLerp, cameraLerp);

    this.offCodecResume = onGameEvent(GAME_EVENT.CODEC_RESUME, () => this.scene.resume());
    this.offMissionRestart = onGameEvent(GAME_EVENT.MISSION_RESTART, () => this.scene.restart());
    this.offDirectorDirective = onGameEvent<DirectorDirectivePayload>(GAME_EVENT.DIRECTOR_DIRECTIVE, (directive) => {
      if (directive.support === 'silent') this.rations += 1;
      if (directive.support === 'aggressive') this.ammo = Math.min(this.maxAmmo, this.ammo + 10);
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

    this.emitCodec(MGS1_CODEC.missionStart);
    this.updateHud();
    this.emitHudUpdate();
  }

  update(): void {
    if (this.missionCompleted) return;
    this.inputController.update();
    this.handlePlayerInput();
    this.handleDecoyReveal();
    this.activateEncounterWhenReady();
    this.updateActiveBoss();
    this.updateHazards();
    this.updateEscapeSequence();
    if (this.alertState === 'ALERT' && this.time.now >= this.alertUntil) this.alertState = 'NORMAL';
    this.updateHud();
    this.emitHudUpdate();
  }

  private resetMissionState(): void {
    const bonuses = getCampaignLoadoutBonuses();
    this.flow = createMgs1MissionFlowState();
    this.activeBoss = null;
    this.hazards = [];
    this.arenaGate = null;
    this.decoySprite = null;
    this.decoyLabel = null;
    this.escapeJeep = null;
    this.snowmobile = null;
    this.maxHealth = 100;
    this.health = 100;
    this.maxAmmo = Math.max(MGS1_SHADOW_MOSES_WORLD.maxAmmo, MGS1_SHADOW_MOSES_WORLD.startAmmo + bonuses.ammo);
    this.ammo = Math.min(this.maxAmmo, MGS1_SHADOW_MOSES_WORLD.startAmmo + bonuses.ammo);
    this.rations = MGS1_SHADOW_MOSES_WORLD.startRations + bonuses.rations;
    this.chaff = MGS1_SHADOW_MOSES_WORLD.startChaff;
    this.chaffActiveUntil = 0;
    this.missionCompleted = false;
    this.alertState = 'NORMAL';
    this.alertUntil = 0;
    this.lastAlertSource = 'none';
    this.lowHealthCodecEmitted = false;
    this.nextPlayerShotAt = 0;
    this.lastDamageAt = 0;
    this.shotsFired = 0;
    this.kills = 0;
    this.neutralizations = 0;
    this.rationsUsed = 0;
    this.damageTaken = 0;
    this.camerasDisabled = 0;
    this.alertCount = 0;
    this.completedObjectives = new Set(['enter_dock']);
  }

  /** Registers all generated actor sheets while retaining static sprites as fallback. */
  private createActorAnimations(): void {
    MGS1_ACTOR_ANIMATION_ASSETS.forEach((asset) => {
      if (!this.textures.exists(asset.textureKey)) return;
      (Object.entries(asset.clips) as [Mgs1ActorAnimationState, NonNullable<Mgs1ActorAnimationAsset['clips'][Mgs1ActorAnimationState]>][])
        .forEach(([state, clip]) => {
          const key = getMgs1ActorAnimationKey(asset.textureKey, state);
          if (this.anims.exists(key)) return;
          this.anims.create({
            key,
            frames: this.anims.generateFrameNumbers(asset.textureKey, { start: clip.start, end: clip.end }),
            frameRate: clip.frameRate,
            repeat: clip.repeat
          });
        });
    });
  }

  private createVfxAnimations(): void {
    MGS1_SIDEOPS_VFX_ASSETS.forEach((asset) => {
      if (!this.textures.exists(asset.textureKey)) return;
      const key = this.vfxAnimationKey(asset.textureKey);
      if (this.anims.exists(key)) return;
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(asset.textureKey, { start: 0, end: asset.frameCount - 1 }),
        frameRate: asset.frameCount >= 8 ? 15 : 18,
        repeat: 0
      });
    });
  }

  private resolveTexture(preferred: string, fallback: string): string {
    return this.textures.exists(preferred) ? preferred : fallback;
  }

  private resolveActorTexture(sourceTextureKey: string, fallback: string): string {
    const asset = getMgs1ActorAnimationAssetBySourceTexture(sourceTextureKey);
    if (asset && this.textures.exists(asset.textureKey)) return asset.textureKey;
    return this.resolveTexture(sourceTextureKey, fallback);
  }

  private configureActorSprite<T extends Phaser.GameObjects.Sprite>(
    sprite: T,
    sourceTextureKey: string,
    fallback: string,
    initialState: Mgs1ActorAnimationState = 'idle'
  ): T {
    sprite.setData('mgs1SourceTextureKey', sourceTextureKey);
    sprite.setData('mgs1AnimationLock', '');
    sprite.setData('mgs1AnimationPriority', 0);
    const asset = getMgs1ActorAnimationAssetBySourceTexture(sourceTextureKey);
    if (!asset || !this.textures.exists(asset.textureKey)) {
      sprite.setTexture(this.resolveTexture(sourceTextureKey, fallback));
      return sprite;
    }

    sprite.setTexture(asset.textureKey, asset.clips.idle?.start ?? 0);
    const physicsSprite = sprite as unknown as Phaser.Physics.Arcade.Sprite;
    const body = physicsSprite.body as Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | null;
    if (body) {
      body.setSize(asset.sourceWidth, asset.sourceHeight, false);
      body.setOffset(Math.floor((asset.frameWidth - asset.sourceWidth) / 2), 0);
      if (body instanceof Phaser.Physics.Arcade.StaticBody) body.updateFromGameObject();
    }
    this.playActorLoop(sprite, initialState);
    return sprite;
  }

  private getActorAsset(sprite: Phaser.GameObjects.Sprite): Mgs1ActorAnimationAsset | undefined {
    return getMgs1ActorAnimationAssetBySourceTexture(String(sprite.getData('mgs1SourceTextureKey') ?? ''));
  }

  private playActorLoop(sprite: Phaser.GameObjects.Sprite, state: Mgs1ActorAnimationState, force = false): void {
    const asset = this.getActorAsset(sprite);
    if (!asset || !this.textures.exists(asset.textureKey)) return;
    if (!force && Number(sprite.getData('mgs1AnimationPriority') ?? 0) > 0) return;
    const resolved = asset.clips[state] ? state : 'idle';
    const key = getMgs1ActorAnimationKey(asset.textureKey, resolved);
    if (!this.anims.exists(key)) return;
    if (force) {
      sprite.setData('mgs1AnimationPriority', 0);
      sprite.setData('mgs1AnimationLock', '');
    }
    if (sprite.anims.currentAnim?.key !== key || !sprite.anims.isPlaying) sprite.play(key);
  }

  private playActorAction(sprite: Phaser.GameObjects.Sprite, state: Mgs1ActorAnimationState): void {
    const asset = this.getActorAsset(sprite);
    const clip = asset?.clips[state];
    if (!asset || !clip || !this.textures.exists(asset.textureKey)) return;
    const priority = state === 'death' ? 4 : state === 'hit' ? 3 : 2;
    const currentPriority = Number(sprite.getData('mgs1AnimationPriority') ?? 0);
    if (currentPriority === 4 || currentPriority >= priority) return;
    const key = getMgs1ActorAnimationKey(asset.textureKey, state);
    if (!this.anims.exists(key)) return;
    const lock = `${state}-${this.time.now}-${Phaser.Math.Between(0, 99999)}`;
    sprite.setData('mgs1AnimationLock', lock);
    sprite.setData('mgs1AnimationPriority', priority);
    sprite.play(key);
    if (state === 'death') return;
    const duration = Math.ceil(((clip.end - clip.start + 1) / clip.frameRate) * 1000) + 34;
    this.time.delayedCall(duration, () => {
      if (!sprite.active || sprite.getData('mgs1AnimationLock') !== lock) return;
      sprite.setData('mgs1AnimationPriority', 0);
      sprite.setData('mgs1AnimationLock', '');
    });
  }

  private createShadowMosesBackdrop(): void {
    const width = MGS1_SHADOW_MOSES_WORLD.worldWidth;
    this.add.rectangle(width / 2, 270, width, 540, 0x061015).setDepth(-40);
    this.add.rectangle(width / 2, 90, width, 180, 0x10202a).setDepth(-39);
    this.add.rectangle(width / 2, 510, width, 60, 0x253039).setDepth(-20);

    for (let x = 120; x < width; x += 240) {
      this.add.circle(x, 115 + (x % 5) * 13, 2, 0xdfe8e7, 0.75).setDepth(-35);
      this.add.rectangle(x, 490, 130, 22, 0xd7e0df, 0.23).setDepth(-19);
    }
    for (let x = 700; x < width - 300; x += 850) {
      const height = x % 1700 === 700 ? 230 : 165;
      this.add.rectangle(x, 500 - height / 2, 250, height, 0x17252b).setDepth(-16);
      this.add.rectangle(x, 500 - height, 270, 14, 0x53656a).setDepth(-15);
      this.add.rectangle(x - 65, 500 - height + 35, 26, 10, 0xb7473d).setDepth(-14);
      this.add.rectangle(x + 65, 500 - height + 35, 26, 10, 0xb7473d).setDepth(-14);
    }

    this.add.text(24, 18, 'MGS1 // SHADOW MOSES INCIDENT // FOXHOUND UPRISING', {
      fontFamily: 'monospace', fontSize: '18px', color: '#b9e2d2'
    }).setScrollFactor(0).setDepth(90);
  }

  private createWorldGeometry(): void {
    this.platforms = this.physics.add.staticGroup();
    for (let x = 256; x < MGS1_SHADOW_MOSES_WORLD.worldWidth; x += 512) {
      const platform = this.platforms.create(x, 516, 'platform') as Phaser.Physics.Arcade.Sprite;
      platform.setScale(8, 1).refreshBody();
    }
    for (let x = 850; x < MGS1_SHADOW_MOSES_WORLD.worldWidth - 400; x += 1100) {
      const ledge = this.platforms.create(x, 390 - (x % 3) * 28, 'platform') as Phaser.Physics.Arcade.Sprite;
      ledge.setScale(3, 1).refreshBody();
    }
  }

  private spawnNpcCheckpoints(): void {
    MGS1_NPC_CHECKPOINTS.forEach((checkpoint) => {
      const sprite = this.add.sprite(
        checkpoint.x,
        checkpoint.y,
        this.resolveActorTexture(checkpoint.textureKey, 'guard')
      ).setDepth(5);
      this.configureActorSprite(sprite, checkpoint.textureKey, 'guard');
      this.add.text(checkpoint.x, checkpoint.y - 55, checkpoint.name, {
        fontFamily: 'monospace', fontSize: '10px', color: '#a7c8bd', backgroundColor: '#061015aa'
      }).setOrigin(0.5).setDepth(6);
    });
  }

  private spawnDecoyNarrativeEncounter(): void {
    this.decoySprite = this.add.sprite(
      MGS1_DECOY_OCTOPUS_REVEAL.x,
      MGS1_DECOY_OCTOPUS_REVEAL.y,
      this.resolveActorTexture(MGS1_DECOY_OCTOPUS_REVEAL.textureKey, 'bossCaptain')
    ).setDepth(7).setVisible(false);
    this.configureActorSprite(this.decoySprite, MGS1_DECOY_OCTOPUS_REVEAL.textureKey, 'bossCaptain');
    this.decoyLabel = this.add.text(
      MGS1_DECOY_OCTOPUS_REVEAL.x,
      MGS1_DECOY_OCTOPUS_REVEAL.y - 70,
      MGS1_DECOY_OCTOPUS_REVEAL.name,
      { fontFamily: 'monospace', fontSize: '11px', color: '#e7c688', backgroundColor: '#1b1111dd' }
    ).setOrigin(0.5).setDepth(8).setVisible(false);
  }

  private handleDecoyReveal(): void {
    if (this.flow.decoyRevealed) return;
    const next = revealMgs1DecoyOctopus(this.flow, this.player.x);
    if (next === this.flow) return;
    this.flow = next;
    this.completedObjectives.add('expose_decoy_octopus');
    this.decoySprite?.setVisible(true).setAlpha(1);
    this.decoyLabel?.setVisible(true).setAlpha(1);
    if (this.decoySprite) this.playActorLoop(this.decoySprite, 'move', true);
    this.playVfx('mgs1BloodHitVfx', MGS1_DECOY_OCTOPUS_REVEAL.x, MGS1_DECOY_OCTOPUS_REVEAL.y - 18);
    this.flashStatus('DECOY OCTOPUS IDENTIFIED // NO COMBAT ENCOUNTER');
    this.emitCodec(MGS1_CODEC.decoy);
  }

  private spawnHazards(): void {
    MGS1_HAZARD_SEQUENCE.forEach((definition) => {
      const sprite = this.physics.add.sprite(
        definition.x,
        definition.y,
        this.resolveActorTexture(definition.textureKey, 'guard')
      ).setDepth(5);
      this.configureActorSprite(sprite, definition.textureKey, 'guard');
      if (definition.behavior === 'gun_camera') {
        sprite.body.setAllowGravity(false);
        sprite.setImmovable(true);
      } else {
        this.physics.add.collider(sprite, this.platforms);
      }
      const unit: Mgs1HazardUnit = {
        definition,
        sprite,
        hp: definition.hp,
        direction: 1,
        nextAttackAt: 0,
        disabled: false
      };
      this.hazards.push(unit);
      this.physics.add.overlap(this.player, sprite, () => {
        if (!unit.disabled) this.damagePlayer(definition.contactDamage, definition.id);
      }, undefined, this);
      this.physics.add.overlap(this.playerProjectiles, sprite, (projectile) => {
        this.hitHazard(unit, projectile as Phaser.Physics.Arcade.Sprite);
      }, undefined, this);
    });
  }

  private createFixedHud(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'monospace', fontSize: '13px', color: '#d7efdf', backgroundColor: '#04100bcc', padding: { x: 7, y: 4 }
    };
    this.hudText = this.add.text(18, 48, '', style).setScrollFactor(0).setDepth(100);
    this.objectiveText = this.add.text(18, 92, '', { ...style, color: '#f0df96' }).setScrollFactor(0).setDepth(100);
    this.statusText = this.add.text(18, 122, '', { ...style, color: '#8ed8d0' }).setScrollFactor(0).setDepth(100);
    this.alertText = this.add.text(760, 48, '', { ...style, color: '#ff7467' }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);
    this.bossText = this.add.text(760, 92, '', { ...style, color: '#ffc86b' }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);
  }

  private handlePlayerInput(): void {
    const sprint = this.inputController.isDown('sprint') ? 1.35 : 1;
    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const crouching = this.inputController.isDown('crouch');
    const speed = crouching ? 105 : 225 * sprint;
    if (left === right) this.player.setVelocityX(0);
    else {
      const direction = left ? -1 : 1;
      this.player.setVelocityX(direction * speed).setFlipX(direction < 0);
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.inputController.justDown('jump') && body.blocked.down) this.player.setVelocityY(-390);
    if (crouching) this.playActorLoop(this.player, 'crouch');
    else if (Math.abs(this.player.body?.velocity.x ?? 0) > 4) this.playActorLoop(this.player, 'move');
    else this.playActorLoop(this.player, 'idle');

    if (this.inputController.isDown('fire') && this.time.now >= this.nextPlayerShotAt) this.fireSocom();
    if (this.inputController.justDown('cqc')) this.performCqc();
    if (this.inputController.justDown('chaff')) this.useChaff();
    if (this.inputController.justDown('ration')) this.useRation();
    if (this.inputController.justDown('codec')) this.emitCodec(MGS1_CODEC.manual);
  }

  private fireSocom(): void {
    if (this.ammo <= 0) {
      this.flashStatus('SOCOM AMMUNITION DEPLETED');
      this.nextPlayerShotAt = this.time.now + 300;
      return;
    }
    const direction = this.player.flipX ? -1 : 1;
    const projectile = this.obtainProjectile(
      this.playerProjectiles,
      this.player.x + direction * 22,
      this.player.y - 8,
      'mgs1SocomBullet',
      'bullet'
    );
    if (!projectile) return;
    const target = this.activeBoss?.sprite;
    const targetIsAhead = target?.active && Math.sign(target.x - projectile.x) === direction;
    if (targetIsAhead && target) {
      // Bosses such as Psycho Mantis and the Hind D fight above Snake's firing line.
      // A light arena lock keeps the side-scrolling controls readable while making
      // every canonical encounter winnable with the same SOCOM input.
      const dx = target.x - projectile.x;
      const dy = target.y - projectile.y;
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      projectile
        .setVelocity((dx / distance) * 620, (dy / distance) * 620)
        .setRotation(Math.atan2(dy, dx));
    } else {
      projectile.setVelocity(direction * 620, 0);
    }
    projectile.setData('damage', 1);
    this.time.delayedCall(PLAYER_PROJECTILE_LIFETIME_MS, () => {
      if (projectile.active) this.expireProjectile(projectile, false);
    });
    this.ammo -= 1;
    this.shotsFired += 1;
    this.nextPlayerShotAt = this.time.now + 245;
    this.playActorAction(this.player, 'attack');
    this.playVfx('mgs1MuzzleFlashVfx', projectile.x, projectile.y, direction < 0);
  }

  /** CQC remains useful against patrols and gives the Liquid duel a close-range option. */
  private performCqc(): void {
    this.playActorAction(this.player, 'melee');
    const hazard = this.hazards.find((unit) => !unit.disabled && Phaser.Math.Distance.Between(this.player.x, this.player.y, unit.sprite.x, unit.sprite.y) <= 68);
    if (hazard) {
      hazard.hp = 0;
      this.disableHazard(hazard, true);
      return;
    }
    if (this.activeBoss && Phaser.Math.Distance.Between(this.player.x, this.player.y, this.activeBoss.sprite.x, this.activeBoss.sprite.y) <= 82) {
      this.damageBoss(this.activeBoss, 1);
    }
  }

  private useChaff(): void {
    if (this.chaff <= 0) {
      this.flashStatus('NO CHAFF GRENADES');
      return;
    }
    this.chaff -= 1;
    this.chaffActiveUntil = this.time.now + 7000;
    this.playVfx('mgs1ChaffBurstVfx', this.player.x, this.player.y - 15);
    this.hazards.filter((unit) => unit.definition.behavior === 'gun_camera' && !unit.disabled).forEach((unit) => {
      unit.sprite.setTint(0x6faaa4);
    });
    this.flashStatus('CHAFF ACTIVE // ELECTRONIC SENSORS JAMMED');
  }

  private useRation(): void {
    if (this.rations <= 0 || this.health >= this.maxHealth) return;
    this.rations -= 1;
    this.rationsUsed += 1;
    this.health = Math.min(this.maxHealth, this.health + 45);
    this.flashStatus('RATION USED');
  }

  private activateEncounterWhenReady(): void {
    const next = activateNextMgs1Encounter(this.flow, this.player.x);
    if (next === this.flow) return;
    this.flow = next;
    const encounter = getActiveMgs1Encounter(this.flow);
    if (encounter) this.spawnBossEncounter(encounter);
  }

  private spawnBossEncounter(encounter: Mgs1BossEncounterDefinition): void {
    this.arenaGate?.destroy();
    this.arenaGate = this.physics.add.staticSprite(encounter.gateX, 462, 'door').setTint(0xc24845);
    this.physics.add.collider(this.player, this.arenaGate);

    const sprite = this.physics.add.sprite(
      encounter.arenaX,
      encounter.y,
      this.resolveActorTexture(encounter.textureKey, 'bossCaptain')
    ).setDepth(12);
    this.configureActorSprite(sprite, encounter.textureKey, 'bossCaptain');
    if (encounter.airborne) sprite.body.setAllowGravity(false);
    else this.physics.add.collider(sprite, this.platforms);
    if (encounter.stationary) sprite.setImmovable(true);

    const unit: ActiveBossUnit = {
      definition: encounter,
      sprite,
      hp: encounter.hp,
      maxHp: encounter.hp,
      direction: -1,
      nextAttackAt: 0,
      attackIndex: 0
    };
    this.activeBoss = unit;
    this.physics.add.overlap(this.player, sprite, () => {
      if (this.activeBoss === unit) this.damagePlayer(encounter.contactDamage, encounter.name);
    }, undefined, this);
    this.physics.add.overlap(this.playerProjectiles, sprite, (projectile) => {
      if (this.activeBoss === unit) this.hitBoss(unit, projectile as Phaser.Physics.Arcade.Sprite);
    }, undefined, this);

    // Every boss visibly opens with its signature clip before its projectile cycle.
    this.playActorAction(sprite, encounter.signatureClip);
    // The opening shot is immediate so even a very fast player sees each registered projectile/VFX pair.
    this.fireBossAttack(unit);
    this.triggerAlert(`${encounter.name} arena`);
    this.flashStatus(`${encounter.name.toUpperCase()} // BOSS BATTLE`);
    this.emitCodec(encounter.id === 'metal_gear_rex' ? MGS1_CODEC.rex : MGS1_CODEC.foxhound);
  }

  private updateActiveBoss(): void {
    const unit = this.activeBoss;
    if (!unit || !unit.sprite.active) return;
    const encounter = unit.definition;
    const distanceX = this.player.x - unit.sprite.x;
    unit.sprite.setFlipX(distanceX < 0);

    if (encounter.airborne) {
      const hoverY = encounter.y + Math.sin(this.time.now / 420) * (encounter.behavior === 'aircraft' ? 48 : 24);
      unit.sprite.setVelocityY((hoverY - unit.sprite.y) * 3);
      unit.sprite.setVelocityX(Phaser.Math.Clamp(distanceX * 0.18, -85, 85));
      this.playActorLoop(unit.sprite, 'move');
    } else if (!encounter.stationary) {
      const preferredDistance = encounter.behavior === 'sniper' ? 300 : encounter.behavior === 'ninja' ? 75 : 180;
      if (Math.abs(distanceX) > preferredDistance) {
        unit.direction = Math.sign(distanceX) || unit.direction;
        unit.sprite.setVelocityX(unit.direction * (encounter.behavior === 'ninja' ? 145 : 82));
        this.playActorLoop(unit.sprite, 'move');
      } else {
        unit.sprite.setVelocityX(0);
        this.playActorLoop(unit.sprite, 'idle');
      }
    } else {
      unit.sprite.setVelocityX(0);
      this.playActorLoop(unit.sprite, 'idle');
    }

    if (this.time.now >= unit.nextAttackAt) this.fireBossAttack(unit);
  }

  private fireBossAttack(unit: ActiveBossUnit): void {
    const pattern = unit.definition.attacks[unit.attackIndex % unit.definition.attacks.length];
    unit.attackIndex += 1;
    unit.nextAttackAt = this.time.now + pattern.intervalMs;
    this.playActorAction(unit.sprite, pattern.actionClip);
    this.playVfx(pattern.vfxTextureKey, unit.sprite.x, unit.sprite.y - 10, this.player.x < unit.sprite.x);

    const projectile = this.obtainProjectile(
      this.enemyProjectiles,
      unit.sprite.x + (this.player.x < unit.sprite.x ? -28 : 28),
      unit.sprite.y - 12,
      pattern.projectileTextureKey,
      'enemyBullet'
    );
    if (!projectile) return;
    this.aimProjectileAtPlayer(projectile, pattern);
    projectile.setData('damage', pattern.damage);
    projectile.setData('impactVfx', pattern.vfxTextureKey);
    this.time.delayedCall(2600, () => {
      if (projectile.active) this.expireEnemyProjectile(projectile, false);
    });
  }

  private aimProjectileAtPlayer(projectile: Phaser.Physics.Arcade.Sprite, pattern: Mgs1BossAttackPattern): void {
    const dx = this.player.x - projectile.x;
    const dy = this.player.y - projectile.y;
    const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    projectile.setVelocity((dx / distance) * pattern.speed, (dy / distance) * pattern.speed);
    projectile.setRotation(Math.atan2(dy, dx));
  }

  private hitBoss(unit: ActiveBossUnit, projectile: Phaser.Physics.Arcade.Sprite): void {
    const damage = Number(projectile.getData('damage') ?? 1);
    this.expireProjectile(projectile, true);
    this.damageBoss(unit, damage);
  }

  private damageBoss(unit: ActiveBossUnit, damage: number): void {
    if (this.activeBoss !== unit) return;
    unit.hp = Math.max(0, unit.hp - damage);
    this.playActorAction(unit.sprite, 'hit');
    const metalBoss = ['m1_tank', 'hind_d', 'metal_gear_rex'].includes(unit.definition.id);
    this.playVfx(metalBoss ? 'mgs1MetalRicochetVfx' : 'mgs1BloodHitVfx', unit.sprite.x, unit.sprite.y - 15);
    if (unit.hp <= 0) this.defeatActiveBoss(unit);
  }

  private defeatActiveBoss(unit: ActiveBossUnit): void {
    if (this.activeBoss !== unit) return;
    unit.sprite.setVelocity(0, 0);
    (unit.sprite.body as Phaser.Physics.Arcade.Body).enable = false;
    this.playActorAction(unit.sprite, 'death');
    this.playVfx(unit.definition.id === 'metal_gear_rex' ? 'mgs1RexExplosionVfx' : 'mgs1GrenadeExplosionVfx', unit.sprite.x, unit.sprite.y - 15);
    this.kills += 1;
    this.completedObjectives.add(`defeat_${unit.definition.id}`);
    const ammoBeforeRecovery = this.ammo;
    this.ammo = Math.min(this.maxAmmo, this.ammo + Math.max(14, unit.maxHp + 6));
    const recoveredAmmo = this.ammo - ammoBeforeRecovery;
    this.flow = completeActiveMgs1Encounter(this.flow);
    this.arenaGate?.destroy();
    this.arenaGate = null;
    this.activeBoss = null;
    this.flashStatus(`${unit.definition.name.toUpperCase()} DEFEATED${recoveredAmmo > 0 ? ` // SOCOM +${recoveredAmmo}` : ''}`);
    this.emitCodec({ ...MGS1_CODEC.foxhound, trigger: 'boss_defeated', message: `${unit.definition.name} defeated. Continue through Shadow Moses.` });
    this.time.delayedCall(1250, () => unit.sprite.setAlpha(0.35));

    if (isMgs1BossRouteComplete(this.flow)) {
      this.flow = deployMgs1EscapeVehicles(this.flow);
      this.completedObjectives.add('secure_escape_vehicles');
      this.spawnEscapeVehicles();
    }
  }

  private updateHazards(): void {
    this.hazards.forEach((unit) => {
      if (unit.disabled || !unit.sprite.active) return;
      const definition = unit.definition;
      const cameraJammed = definition.behavior === 'gun_camera' && this.isChaffActive();
      if (definition.behavior === 'gun_camera') {
        unit.sprite.setVelocity(0, 0);
        this.playActorLoop(unit.sprite, cameraJammed ? 'hit' : 'idle');
      } else {
        if (unit.sprite.x <= definition.patrolMin) unit.direction = 1;
        if (unit.sprite.x >= definition.patrolMax) unit.direction = -1;
        if (definition.behavior === 'wolfdog' && Math.abs(this.player.x - unit.sprite.x) < 260) {
          unit.direction = this.player.x < unit.sprite.x ? -1 : 1;
        }
        const speed = definition.behavior === 'wolfdog' ? 105 : definition.behavior === 'heavy' ? 42 : 62;
        unit.sprite.setVelocityX(unit.direction * speed).setFlipX(unit.direction < 0);
        this.playActorLoop(unit.sprite, 'move');
      }

      if (!cameraJammed && definition.projectileTextureKey && Math.abs(this.player.x - unit.sprite.x) <= 430 && this.time.now >= unit.nextAttackAt) {
        this.fireHazardProjectile(unit);
      }
    });
  }

  private fireHazardProjectile(unit: Mgs1HazardUnit): void {
    const definition = unit.definition;
    if (!definition.projectileTextureKey) return;
    unit.nextAttackAt = this.time.now + (definition.behavior === 'heavy' ? 900 : 1450);
    this.playActorAction(unit.sprite, 'attack');
    this.playVfx('mgs1MuzzleFlashVfx', unit.sprite.x, unit.sprite.y - 8, this.player.x < unit.sprite.x);
    const projectile = this.obtainProjectile(this.enemyProjectiles, unit.sprite.x, unit.sprite.y - 8, definition.projectileTextureKey, 'enemyBullet');
    if (!projectile) return;
    const direction = this.player.x < unit.sprite.x ? -1 : 1;
    projectile.setVelocity(direction * (definition.behavior === 'heavy' ? 430 : 360), 0);
    projectile.setData('damage', definition.behavior === 'heavy' ? 14 : 8);
    projectile.setData('impactVfx', 'mgs1BulletImpactVfx');
    this.time.delayedCall(1800, () => {
      if (projectile.active) this.expireEnemyProjectile(projectile, false);
    });
    this.triggerAlert(definition.id);
  }

  private hitHazard(unit: Mgs1HazardUnit, projectile: Phaser.Physics.Arcade.Sprite): void {
    if (unit.disabled) return;
    this.expireProjectile(projectile, true);
    unit.hp -= 1;
    this.playActorAction(unit.sprite, 'hit');
    this.playVfx(unit.definition.behavior === 'gun_camera' ? 'mgs1MetalRicochetVfx' : 'mgs1BloodHitVfx', unit.sprite.x, unit.sprite.y);
    if (unit.hp <= 0) this.disableHazard(unit, false);
  }

  private disableHazard(unit: Mgs1HazardUnit, quiet: boolean): void {
    if (unit.disabled) return;
    unit.disabled = true;
    unit.sprite.setVelocity(0, 0);
    (unit.sprite.body as Phaser.Physics.Arcade.Body).enable = false;
    this.playActorAction(unit.sprite, 'death');
    if (unit.definition.behavior === 'gun_camera') this.camerasDisabled += 1;
    if (quiet) this.neutralizations += 1;
    else this.kills += 1;
    this.time.delayedCall(850, () => unit.sprite.setAlpha(0.28));
  }

  private spawnEscapeVehicles(): void {
    if (this.escapeJeep || this.snowmobile) return;
    const jeep = MGS1_ESCAPE_VEHICLES[0];
    this.escapeJeep = this.physics.add.staticSprite(
      jeep.x,
      jeep.y,
      this.resolveActorTexture(jeep.textureKey, 'bossCaptain')
    ).setDepth(10).setTint(0xc7d8c1);
    this.configureActorSprite(this.escapeJeep, jeep.textureKey, 'bossCaptain', 'move');
    this.physics.add.overlap(this.player, this.escapeJeep, () => this.completeMission(), undefined, this);

    const snowmobile = MGS1_ESCAPE_VEHICLES[1];
    this.snowmobile = this.add.sprite(
      snowmobile.x,
      snowmobile.y,
      this.resolveActorTexture(snowmobile.textureKey, 'bossCaptain')
    ).setDepth(9).setTint(0xd8e5e1);
    this.configureActorSprite(this.snowmobile, snowmobile.textureKey, 'bossCaptain', 'move');
    this.playVfx('mgs1SnowPuffVfx', snowmobile.x - 38, snowmobile.y + 10);
    this.flashStatus('ESCAPE JEEP READY // SNOWMOBILE RENDEZVOUS CONFIRMED');
  }

  private updateEscapeSequence(): void {
    if (!this.flow.escapeVehiclesDeployed || !this.escapeJeep || !this.snowmobile) return;
    this.playActorLoop(this.escapeJeep, 'move');
    this.playActorLoop(this.snowmobile, 'move');
  }

  private obtainProjectile(
    group: Phaser.Physics.Arcade.Group,
    x: number,
    y: number,
    textureKey: string,
    fallback: string
  ): Phaser.Physics.Arcade.Sprite | null {
    const resolvedTexture = this.resolveTexture(textureKey, fallback);
    const projectile = group.get(x, y, resolvedTexture) as Phaser.Physics.Arcade.Sprite | null;
    if (!projectile) return null;
    projectile.enableBody(true, x, y, true, true);
    projectile.setTexture(resolvedTexture).setActive(true).setVisible(true).setAlpha(1).setRotation(0);
    (projectile.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    projectile.setData('impactVfx', '');
    return projectile;
  }

  private expireProjectile(projectile: Phaser.Physics.Arcade.Sprite, impact: boolean): void {
    if (!projectile.active) return;
    if (impact) this.playVfx('mgs1BulletImpactVfx', projectile.x, projectile.y);
    projectile.disableBody(true, true);
  }

  private expireEnemyProjectile(projectile: Phaser.Physics.Arcade.Sprite, impact: boolean): void {
    if (!projectile.active) return;
    if (impact) {
      const vfx = String(projectile.getData('impactVfx') ?? '');
      this.playVfx(vfx || 'mgs1BulletImpactVfx', projectile.x, projectile.y);
    }
    projectile.disableBody(true, true);
  }

  private hitPlayerWithProjectile(projectile: Phaser.Physics.Arcade.Sprite): void {
    if (!projectile.active) return;
    const damage = Number(projectile.getData('damage') ?? 8);
    this.expireEnemyProjectile(projectile, true);
    this.damagePlayer(damage, 'enemy projectile');
  }

  private damagePlayer(amount: number, source: string): void {
    if (amount <= 0 || this.missionCompleted || this.time.now - this.lastDamageAt < 420) return;
    this.lastDamageAt = this.time.now;
    this.health = Math.max(0, this.health - amount);
    this.damageTaken += amount;
    this.playActorAction(this.player, 'hit');
    this.player.setTint(0xff7770);
    this.time.delayedCall(150, () => {
      if (this.player.active) this.player.clearTint();
    });
    if (this.health <= 30 && !this.lowHealthCodecEmitted) {
      this.lowHealthCodecEmitted = true;
      this.emitCodec(MGS1_CODEC.lowHealth);
    }
    if (this.health <= 0) this.failMission(source);
  }

  private triggerAlert(source: string): void {
    if (this.missionCompleted) return;
    this.alertState = 'ALERT';
    this.alertUntil = this.time.now + 4200;
    this.lastAlertSource = source;
    this.alertCount += 1;
    const payload: AlertEventPayload = {
      missionId: MGS1_SHADOW_MOSES_MISSION_ID,
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

  private emitCodec(call: Mgs1CodecCall): void {
    emitGameEvent<CodecRequestPayload>(GAME_EVENT.REQUEST_CODEC_CALL, call);
    if (call.pauseGame && !this.missionCompleted) this.scene.pause();
  }

  private playVfx(textureKey: string, x: number, y: number, flipX = false): void {
    if (!textureKey || !this.textures.exists(textureKey)) return;
    const sprite = this.add.sprite(x, y, textureKey).setDepth(35).setFlipX(flipX);
    const key = this.vfxAnimationKey(textureKey);
    if (!this.anims.exists(key)) {
      this.time.delayedCall(180, () => sprite.destroy());
      return;
    }
    sprite.play(key);
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => sprite.destroy());
  }

  private vfxAnimationKey(textureKey: string): string {
    return `mgs1:vfx:${textureKey}`;
  }

  private updateHud(): void {
    if (!this.hudText) return;
    this.hudText.setText(`LIFE ${this.health}/${this.maxHealth}  SOCOM ${this.ammo}/${this.maxAmmo}  RATION ${this.rations}  CHAFF ${this.chaff}`);
    this.objectiveText.setText(`OBJECTIVE: ${getMgs1ObjectiveLabel(this.flow)}`);
    this.statusText.setText(`SHADOW MOSES ${this.flow.defeatedEncounterIds.length}/${MGS1_BOSS_SEQUENCE.length}  DECOY ${this.flow.decoyRevealed ? 'EXPOSED' : 'UNKNOWN'}  ${this.isChaffActive() ? 'CHAFF ACTIVE' : ''}`);
    this.alertText.setText(this.alertState === 'ALERT' ? `! ALERT // ${this.lastAlertSource}` : 'NORMAL');
    this.alertText.setColor(this.alertState === 'ALERT' ? '#ff7467' : '#90c9a7');
    this.bossText.setText(this.activeBoss ? `${this.activeBoss.definition.name.toUpperCase()} ${this.activeBoss.hp}/${this.activeBoss.maxHp}` : '');
  }

  private emitHudUpdate(): void {
    const activeBoss = this.activeBoss;
    const payload: MissionHudPayload = {
      missionId: MGS1_SHADOW_MOSES_MISSION_ID,
      missionTitle: MISSION_TITLE,
      bossName: activeBoss?.definition.name ?? 'Liquid Snake',
      health: this.health,
      maxHealth: this.maxHealth,
      ammo: this.ammo,
      maxAmmo: this.maxAmmo,
      rations: this.rations,
      chaff: this.chaff,
      hasKeycard: this.flow.decoyRevealed,
      alertState: this.alertState,
      suspicion: this.alertState === 'ALERT' ? 100 : 0,
      stealthScore: this.getStealthScore(),
      reinforcementCount: 0,
      activeEnemies: this.hazards.filter((unit) => !unit.disabled).length + (activeBoss ? 1 : 0),
      lastAlertSource: this.lastAlertSource,
      alerts: this.alertCount,
      shotsFired: this.shotsFired,
      kills: this.kills,
      neutralizations: this.neutralizations,
      camerasDisabled: this.camerasDisabled,
      objective: getMgs1ObjectiveLabel(this.flow),
      objectiveStage: activeBoss?.definition.id ?? (this.flow.escapeVehiclesDeployed ? 'escape' : 'infiltration'),
      objectivesCompleted: this.completedObjectives.size,
      totalObjectives: MGS1_SHADOW_MOSES_WORLD.totalObjectives,
      secretsFound: this.flow.decoyRevealed ? 1 : 0,
      totalSecrets: 1,
      bossActive: Boolean(activeBoss),
      bossDefeated: isMgs1BossRouteComplete(this.flow),
      bossHealth: activeBoss?.hp ?? 0,
      bossMaxHealth: activeBoss?.maxHp ?? 0,
      chaffActive: this.isChaffActive()
    };
    emitGameEvent<MissionHudPayload>(GAME_EVENT.HUD_UPDATE, payload);
  }

  private completeMission(): void {
    if (this.missionCompleted) return;
    if (!isMgs1ExtractionUnlocked(this.flow)) {
      this.flashStatus('ESCAPE LOCKED // COMPLETE THE SHADOW MOSES ROUTE');
      return;
    }
    this.completedObjectives.add('escape_shadow_moses');
    this.playActorLoop(this.escapeJeep ?? this.player, 'move', true);
    this.playVfx('mgs1SnowPuffVfx', this.escapeJeep?.x ?? this.player.x, (this.escapeJeep?.y ?? this.player.y) + 12);
    this.emitCodec(MGS1_CODEC.complete);
    this.missionCompleted = true;
    const result = this.buildMissionResult(true, 'Shadow Moses escaped by jeep; snowmobile rendezvous secured.');
    emitGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, result);
    this.time.delayedCall(550, () => this.scene.start('MissionCompleteScene', result));
  }

  private failMission(source: string): void {
    if (this.missionCompleted) return;
    this.missionCompleted = true;
    this.alertState = 'MISSION FAILED';
    this.player.setVelocity(0, 0).setTint(0x333333);
    this.playActorAction(this.player, 'death');
    this.emitCodec(MGS1_CODEC.failed);
    const result = this.buildMissionResult(false, `Shadow Moses operation failed: ${source}`);
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
      missionId: MGS1_SHADOW_MOSES_MISSION_ID,
      missionTitle: MISSION_TITLE,
      bossName: 'Liquid Snake',
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
      totalObjectives: MGS1_SHADOW_MOSES_WORLD.totalObjectives,
      secretsFound: this.flow.decoyRevealed ? 1 : 0,
      totalSecrets: 1,
      bossDefeated: isMgs1BossRouteComplete(this.flow),
      noAlert: this.alertCount === 0,
      noKill: this.kills === 0,
      stealthScore: this.getStealthScore(),
      reinforcementCount: 0
    };
  }

  private getStealthScore(): number {
    let score = 1000;
    score -= this.alertCount * 75;
    score -= this.kills * 16;
    score -= this.damageTaken * 2;
    score -= this.rationsUsed * 45;
    score -= Math.max(0, this.shotsFired - 36) * 2;
    score += this.neutralizations * 8;
    return Math.max(0, Math.round(score));
  }

  private flashStatus(message: string): void {
    if (!this.statusText) return;
    this.statusText.setText(message);
    this.time.delayedCall(1350, () => {
      if (this.statusText?.active && !this.missionCompleted) {
        this.statusText.setText(`SHADOW MOSES ${this.flow.defeatedEncounterIds.length}/${MGS1_BOSS_SEQUENCE.length}`);
      }
    });
  }

  private isChaffActive(): boolean {
    return this.time.now < this.chaffActiveUntil;
  }
}
