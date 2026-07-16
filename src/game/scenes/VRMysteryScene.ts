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

interface MysteryCaseRuntime {
  readonly number: number;
  readonly title: string;
  readonly evidenceTexture: string;
  readonly evidenceLabel: string;
  readonly evidenceFinding: string;
  readonly culpritIndex: number;
  readonly culpritFinding: string;
  readonly decoyFinding: string;
  readonly instruction: string;
}

interface MysterySuspect {
  sprite: Phaser.Physics.Arcade.Sprite;
  id: string;
  index: number;
  culprit: boolean;
  attachment?: Phaser.GameObjects.Image;
  label?: Phaser.GameObjects.Text;
  direction: -1 | 1;
  patrolMin: number;
  patrolMax: number;
}

const MYSTERY_CASES: readonly MysteryCaseRuntime[] = [
  {
    number: 1,
    title: 'BROKEN CAMERA',
    evidenceTexture: 'mgs1VrMysteryBrokenCamera',
    evidenceLabel: 'BROKEN SURVEILLANCE CAMERA',
    evidenceFinding: 'The camera fell hard enough to bruise the culprit.',
    culpritIndex: 1,
    culpritFinding: 'Fresh head bruise. Injury matches the broken camera.',
    decoyFinding: 'No impact injury.',
    instruction: 'Find the soldier carrying a fresh head injury.'
  },
  {
    number: 2,
    title: 'SOCKS',
    evidenceTexture: 'mgs1VrMysteryPinkSock',
    evidenceLabel: 'PINK SOCK',
    evidenceFinding: 'One pink sock is missing its matching pair.',
    culpritIndex: 2,
    culpritFinding: 'Matching pink knit fibers are hidden under the mask.',
    decoyFinding: 'No matching fibers.',
    instruction: 'Compare the pink sock with each suspect.'
  },
  {
    number: 3,
    title: 'POPSICLE',
    evidenceTexture: 'mgs1VrMysteryBluePopsicle',
    evidenceLabel: 'BLUE POPSICLE',
    evidenceFinding: 'The culprit recently ate something cold, masking their breath pattern.',
    culpritIndex: 0,
    culpritFinding: 'No visible cold breath. This soldier ate the popsicle.',
    decoyFinding: 'Normal cold breath is visible.',
    instruction: 'The culprit is the only suspect without visible cold breath.'
  },
  {
    number: 4,
    title: 'NEARSIGHTED',
    evidenceTexture: 'mgs1VrMysteryRoundGlasses',
    evidenceLabel: 'ROUND GLASSES',
    evidenceFinding: 'Strong corrective lenses were abandoned here.',
    culpritIndex: 2,
    culpritFinding: 'Severe myopia. Repeatedly collides with the wall without the glasses.',
    decoyFinding: 'Vision and gait are normal.',
    instruction: 'Watch for the suspect who cannot navigate without the glasses.'
  },
  {
    number: 5,
    title: 'THE GATEWAY',
    evidenceTexture: 'mgs1VrMysterySecurityPanel',
    evidenceLabel: 'DAMAGED GATE CONTROL',
    evidenceFinding: 'The escape route was opened from the inside.',
    culpritIndex: 1,
    culpritFinding: 'Boot residue and route changes match the fleeing suspect.',
    decoyFinding: 'Position remained consistent with the witness statement.',
    instruction: 'Track the suspect who keeps changing position near the gateway.'
  },
  {
    number: 6,
    title: 'THE DYING MESSAGE',
    evidenceTexture: 'mgs1VrMysteryPortraitMask',
    evidenceLabel: 'DYING MESSAGE // JOHNNY',
    evidenceFinding: 'The victim left the name JOHNNY and a distinctive fall pattern.',
    culpritIndex: 0,
    culpritFinding: 'Reaction pattern matches the dying message reconstruction: JOHNNY.',
    decoyFinding: 'Reaction pattern does not match the message.',
    instruction: 'Inspect each reaction and reconstruct the name JOHNNY.'
  },
  {
    number: 7,
    title: 'FOOTPRINTS',
    evidenceTexture: 'mgs1VrMysteryFootprints',
    evidenceLabel: 'THREE FOOTPRINT TRAILS',
    evidenceFinding: 'One trail leads from the evidence to the culprit. Crawl to avoid adding prints.',
    culpritIndex: 2,
    culpritFinding: 'Sole pattern matches the uncontaminated trail.',
    decoyFinding: 'Sole pattern does not match the trail.',
    instruction: 'Crawl along the trail, then capture the matching suspect.'
  },
  {
    number: 8,
    title: 'A FEEBLE MAN',
    evidenceTexture: 'mgs1VrMysteryGrandfatherClock',
    evidenceLabel: 'TIMING CLOCK',
    evidenceFinding: 'The culprit is nervous; their heartbeat races under inspection.',
    culpritIndex: 1,
    culpritFinding: 'Heartbeat extremely fast. Strong nervous response confirmed.',
    decoyFinding: 'Heartbeat stable.',
    instruction: 'Listen for the suspect with the fastest heartbeat.'
  },
  {
    number: 9,
    title: 'DISGUISE',
    evidenceTexture: 'mgs1VrMysteryBlondWig',
    evidenceLabel: 'BLOND WIG',
    evidenceFinding: 'Wear the wig to impersonate Liquid Snake. The culprit will salute.',
    culpritIndex: 0,
    culpritFinding: 'Salutes fake Liquid immediately. Identity confirmed.',
    decoyFinding: 'No recognition response.',
    instruction: 'Equip the blond wig, then approach the soldier who salutes.'
  },
  {
    number: 10,
    title: 'SEALED ROOM',
    evidenceTexture: 'mgs1VrMysteryKey',
    evidenceLabel: 'SEALED ROOM KEY',
    evidenceFinding: 'The room was sealed from inside. Inspect the victim and wait out the reconstruction.',
    culpritIndex: -1,
    culpritFinding: 'The blood is ketchup. The victim staged the locked-room murder.',
    decoyFinding: 'No outside intruder could have entered the room.',
    instruction: 'Inspect the victim, then wait for the ketchup reveal.'
  }
] as const;

function resolveCaseNumber(mission: VrMissionDefinition): number {
  const combined = `${mission.id} ${mission.title} ${mission.mapVariant}`;
  const explicit = combined.match(/mystery[^0-9]*0?([1-9]|10)/i)?.[1];
  if (explicit) return Number(explicit);
  const byTitle = MYSTERY_CASES.find((entry) => combined.toLowerCase().includes(entry.title.toLowerCase()));
  return byTitle?.number ?? 1;
}

/** Runtime for all ten canonical VR Mystery investigations. */
export class VRMysteryScene extends Phaser.Scene {
  private mission!: VrMissionDefinition;
  private mysteryCase!: MysteryCaseRuntime;
  private stats: VrRunStats = createEmptySpecialStats();
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private inputController!: RuntimeInputController;
  private evidence!: Phaser.Physics.Arcade.Sprite;
  private evidenceMarker!: Phaser.GameObjects.Text;
  private suspects: MysterySuspect[] = [];
  private draggedSuspect?: MysterySuspect;
  private exitPad?: Phaser.Physics.Arcade.Sprite;
  private victim?: Phaser.GameObjects.Image;
  private ketchup?: Phaser.GameObjects.Image;
  private sealedDoor?: Phaser.Physics.Arcade.Sprite;
  private statusText!: Phaser.GameObjects.Text;
  private objectiveText!: Phaser.GameObjects.Text;
  private hudText!: Phaser.GameObjects.Text;
  private cluePanel!: Phaser.GameObjects.Text;
  private startTime = 0;
  private lastHudEmitAt = 0;
  private completed = false;
  private evidenceInspected = false;
  private wigEquipped = false;
  private victimInspected = false;
  private revealAt = 0;
  private footprintsContaminated = false;
  private sealedDoorHits = 0;
  private roomOpened = false;

  constructor() {
    super('VRMysteryScene');
  }

  create(): void {
    this.mission = getActiveSpecialMission('mystery');
    const profile = getMgs1VrSpecialProfileForMission(this.mission.id);
    const caseNumber = profile?.mode === 'mystery' ? profile.level : resolveCaseNumber(this.mission);
    const baseCase = MYSTERY_CASES[caseNumber - 1];
    this.mysteryCase = profile?.mode === 'mystery'
      ? {
          ...baseCase,
          culpritIndex: profile.culpritIndex ?? -1,
          evidenceFinding: profile.clue,
          instruction: profile.solution
        }
      : baseCase;
    this.stats = createEmptySpecialStats();
    this.suspects = [];
    this.draggedSuspect = undefined;
    this.completed = false;
    this.evidenceInspected = false;
    this.wigEquipped = false;
    this.victimInspected = false;
    this.revealAt = 0;
    this.footprintsContaminated = false;
    this.sealedDoorHits = 0;
    this.roomOpened = false;
    this.startTime = performance.now();

    createSpecialAnimations(this);
    this.cameras.main.setViewport(0, 0, 960, 540);
    this.physics.world.setBounds(0, 0, 1900, 540);
    this.cameras.main.setBounds(0, 0, 1900, 540);
    addSpecialVrBackdrop(this, `MGS1 VR MISSIONS // MYSTERY ${String(this.mysteryCase.number).padStart(2, '0')} // ${this.mysteryCase.title}`, {
      void: 0x050913,
      grid: 0x29d9ff,
      accent: 0xe72cdb
    });

    this.platforms = this.physics.add.staticGroup();
    addSpecialPlatform(this, this.platforms, 950, 520, 1900);
    addSpecialPlatform(this, this.platforms, 520, 390, 260);
    addSpecialPlatform(this, this.platforms, 1160, 390, 280);

    const playerTexture = this.textures.exists('mgs1VrSolidSnake') ? 'mgs1VrSolidSnake' : 'vrPlayer';
    this.player = this.physics.add.sprite(85, 468, playerTexture).setDepth(22).setCollideWorldBounds(true);
    this.player.setDragX(1300).setMaxVelocity(235, 560);
    this.player.body?.setSize(28, 46).setOffset(Math.max(0, (this.player.width - 28) / 2), Math.max(0, this.player.height - 46));
    this.physics.add.collider(this.player, this.platforms);
    playSpecialActorAnimation(this, this.player, 'idle');

    this.inputController = new RuntimeInputController(this);
    const lerp = this.inputController.profile.reducedMotion ? 1 : 0.1;
    this.cameras.main.startFollow(this.player, true, lerp, lerp);
    this.addHud();
    this.configureCase();
    this.emitHud('running', `Mystery ${this.mysteryCase.number} loaded`);
  }

  update(): void {
    if (this.completed) return;
    this.inputController.update();
    this.syncTime();
    this.handleMovement();
    this.handleCaseBehaviors();
    this.updateDraggedSuspect();
    if (this.inputController.justDown('fire')) this.inspectNearest();
    if (this.inputController.justDown('cqc')) this.toggleGrab();
    if (this.inputController.justDown('confirm') || this.inputController.justDown('ration')) this.tryDeliver();
    if (this.inputController.justDown('cancel')) this.completeRun(false, 'Investigation aborted');
    this.updateHud();
    if (this.time.now > this.lastHudEmitAt + 260) this.emitHud('running', 'Mystery investigation active');
  }

  private configureCase(): void {
    const evidenceTexture = this.textures.exists(this.mysteryCase.evidenceTexture)
      ? this.mysteryCase.evidenceTexture
      : 'mgs1VrEnvHazardMysteryPackage';
    const evidenceX = this.mysteryCase.number === 10 ? 840 : 470;
    this.evidence = this.physics.add.sprite(evidenceX, 470, evidenceTexture).setDepth(18).setImmovable(true);
    (this.evidence.body as Phaser.Physics.Arcade.Body | null)?.setAllowGravity(false);
    this.evidenceMarker = this.add.text(evidenceX, 420, 'EVIDENCE ?', {
      fontFamily: 'monospace', fontSize: '12px', color: '#f8f49a', backgroundColor: '#050913cc'
    }).setOrigin(0.5).setDepth(60);
    this.tweens.add({ targets: this.evidenceMarker, alpha: 0.45, yoyo: true, repeat: -1, duration: 520 });

    if (this.mysteryCase.number === 10) {
      this.configureSealedRoom();
      return;
    }

    const positions = this.mysteryCase.number === 5
      ? [900, 1190, 1540]
      : [980, 1270, 1560];
    positions.forEach((x, index) => this.spawnSuspect(index, x));
    this.materializeGoal();

    if (this.mysteryCase.number === 7 && this.textures.exists('mgs1VrMysteryFootprints')) {
      [610, 750, 890, 1030, 1170, 1310, 1450].forEach((x, index) => {
        this.add.image(x, 495 - (index % 2) * 4, 'mgs1VrMysteryFootprints').setScale(0.46).setAlpha(0.72).setDepth(8);
      });
    }
  }

  private configureSealedRoom(): void {
    this.add.rectangle(1250, 310, 720, 370, 0x071420, 0.75).setDepth(-8).setStrokeStyle(4, 0x37dfff, 0.65);
    const doorTexture = this.textures.exists('mgs1VrMysterySecurityPanel') ? 'mgs1VrMysterySecurityPanel' : 'door';
    this.sealedDoor = this.physics.add.staticSprite(745, 392, doorTexture).setDepth(20);
    this.sealedDoor.setDisplaySize(54, 252).refreshBody();
    this.physics.add.collider(this.player, this.sealedDoor);
    this.add.text(745, 245, 'SEALED DOOR\nPUNCH-PUNCH-KICK', {
      fontFamily: 'monospace', fontSize: '11px', color: '#ffcf7c', align: 'center', backgroundColor: '#050913cc'
    }).setOrigin(0.5).setDepth(60);
    if (this.textures.exists('mgs1VrMysteryBrokenMonitor')) {
      this.add.image(1510, 430, 'mgs1VrMysteryBrokenMonitor').setDepth(11);
    }
    if (this.textures.exists('mgs1VrMysteryBrokenChair')) {
      this.add.image(1090, 458, 'mgs1VrMysteryBrokenChair').setDepth(11);
    }
    const victimTexture = this.textures.exists('mgs1VrMerylProtected') ? 'mgs1VrMerylProtected' : 'mgs1VrMysterySoldier';
    this.victim = this.add.image(1320, 468, victimTexture).setRotation(-Math.PI / 2).setDepth(16).setTint(0xffd0d0);
    this.add.text(1320, 405, 'VICTIM ?', {
      fontFamily: 'monospace', fontSize: '12px', color: '#ff8e8e', backgroundColor: '#050913cc'
    }).setOrigin(0.5).setDepth(60);
  }

  private spawnSuspect(index: number, x: number): void {
    const texture = this.textures.exists('mgs1VrMysterySoldier') ? 'mgs1VrMysterySoldier' : 'mgs1VrGenomeSoldier';
    const sprite = this.physics.add.sprite(x, 468, texture).setDepth(18).setCollideWorldBounds(true);
    sprite.setDragX(900).setMaxVelocity(100, 500);
    sprite.body?.setSize(26, 50).setOffset(Math.max(0, (sprite.width - 26) / 2), Math.max(0, sprite.height - 50));
    this.physics.add.collider(sprite, this.platforms);
    const suspect: MysterySuspect = {
      sprite,
      id: `SUSPECT-${index + 1}`,
      index,
      culprit: index === this.mysteryCase.culpritIndex,
      direction: index % 2 === 0 ? -1 : 1,
      patrolMin: x - 72,
      patrolMax: x + 72
    };
    this.suspects.push(suspect);
    this.add.text(x, 405, `SUSPECT ${index + 1}`, {
      fontFamily: 'monospace', fontSize: '11px', color: '#9fd4ff', backgroundColor: '#050913aa'
    }).setOrigin(0.5).setDepth(60);
  }

  private handleMovement(): void {
    const left = this.inputController.isDown('moveLeft');
    const right = this.inputController.isDown('moveRight');
    const crouched = this.inputController.isDown('crouch') || this.inputController.isDown('chaff');
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = this.draggedSuspect ? 720 : crouched ? 650 : 1180;
    if (left === right) {
      this.player.setAccelerationX(0);
      playSpecialActorAnimation(this, this.player, crouched ? 'crouch' : 'idle');
    } else {
      const direction = left ? -1 : 1;
      this.player.setAccelerationX(direction * speed).setFlipX(direction < 0);
      playSpecialActorAnimation(this, this.player, crouched ? 'crouch' : 'move');
    }
    if (this.inputController.justDown('jump') && body.blocked.down && !this.draggedSuspect) {
      this.player.setVelocityY(-410);
    }

    if (this.mysteryCase.number === 7 && this.evidenceInspected && !crouched
      && Math.abs(this.player.body?.velocity.x ?? 0) > 25
      && this.player.x > 560 && this.player.x < 1490 && !this.footprintsContaminated) {
      this.footprintsContaminated = true;
      this.stats.alerts += 1;
      this.flashClue('WARNING // YOUR OWN FOOTPRINTS CONTAMINATED THE TRAIL. DELIVERY WILL FAIL.');
    }
  }

  private handleCaseBehaviors(): void {
    this.suspects.forEach((suspect) => {
      if (!suspect.sprite.active || this.draggedSuspect === suspect) return;
      if (suspect.sprite.x <= suspect.patrolMin) suspect.direction = 1;
      if (suspect.sprite.x >= suspect.patrolMax) suspect.direction = -1;
      let velocity = 22;
      if (this.mysteryCase.number === 5 && suspect.culprit && this.evidenceInspected) {
        const distance = Math.abs(this.player.x - suspect.sprite.x);
        velocity = distance < 230 ? 95 : 42;
        suspect.direction = this.player.x < suspect.sprite.x ? 1 : -1;
        suspect.patrolMin = 840;
        suspect.patrolMax = 1740;
      }
      suspect.sprite.setVelocityX(suspect.direction * velocity).setFlipX(suspect.direction < 0);

      if (this.mysteryCase.number === 4 && suspect.culprit && this.evidenceInspected) {
        const phase = Math.floor(this.time.now / 1200) % 3;
        if (phase === 0) suspect.sprite.setVelocityX(suspect.direction * 75);
        if (phase === 1) {
          suspect.sprite.setVelocityX(0).setTint(0xffd67c);
          this.time.delayedCall(180, () => suspect.sprite.active && suspect.sprite.clearTint());
        }
      }

      if (this.mysteryCase.number === 3 && this.evidenceInspected && !suspect.culprit
        && Math.floor(this.time.now / 750) % 4 === suspect.index) {
        const puff = this.add.circle(suspect.sprite.x + (suspect.sprite.flipX ? -18 : 18), suspect.sprite.y - 28, 5, 0xdafaff, 0.65).setDepth(25);
        this.tweens.add({ targets: puff, x: puff.x + (suspect.sprite.flipX ? -18 : 18), y: puff.y - 12, alpha: 0, duration: 520, onComplete: () => puff.destroy() });
      }

      if (this.mysteryCase.number === 8 && suspect.culprit && this.evidenceInspected) {
        const pulse = 0.75 + Math.sin(this.time.now / 85) * 0.18;
        suspect.sprite.setScale(pulse > 0.86 ? 1.04 : 1);
      }

      if (this.mysteryCase.number === 9 && suspect.culprit && this.wigEquipped
        && Math.abs(this.player.x - suspect.sprite.x) < 210 && !suspect.label) {
        suspect.sprite.setVelocityX(0).setAngle(-8);
        suspect.label = this.add.text(suspect.sprite.x, suspect.sprite.y - 72, 'SALUTE!\nLORD LIQUID', {
          fontFamily: 'monospace', fontSize: '12px', color: '#fff49a', align: 'center', backgroundColor: '#050913dd'
        }).setOrigin(0.5).setDepth(75);
      }
      suspect.attachment?.setPosition(suspect.sprite.x, suspect.sprite.y - 50);
      suspect.label?.setPosition(suspect.sprite.x, suspect.sprite.y - 72);
    });

    if (this.mysteryCase.number === 10 && this.victimInspected && this.revealAt > 0 && this.time.now >= this.revealAt && !this.ketchup) {
      this.revealKetchup();
    }
  }

  private inspectNearest(): void {
    const evidenceDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.evidence.x, this.evidence.y);
    if (evidenceDistance < 100) {
      this.inspectEvidence();
      return;
    }

    if (this.mysteryCase.number === 10 && this.victim) {
      const victimDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.victim.x, this.victim.y);
      if (victimDistance < 130) {
        this.inspectVictim();
        return;
      }
    }

    const nearest = this.suspects
      .map((suspect) => ({ suspect, distance: Phaser.Math.Distance.Between(this.player.x, this.player.y, suspect.sprite.x, suspect.sprite.y) }))
      .sort((a, b) => a.distance - b.distance)[0];
    if (!nearest || nearest.distance > 115) {
      this.flashClue('NO EVIDENCE OR SUSPECT IN INSPECTION RANGE');
      return;
    }
    this.inspectSuspect(nearest.suspect);
  }

  private inspectEvidence(): void {
    if (this.mysteryCase.number === 10 && !this.roomOpened) {
      this.flashClue('THE SEALED DOOR BLOCKS THE CRIME SCENE // USE THREE CQC STRIKES');
      return;
    }
    if (!this.evidenceInspected) {
      this.evidenceInspected = true;
      this.stats.shotsFired += 1;
      this.stats.hits += 1;
      this.stats.objectivesCompleted = 1;
      this.evidenceMarker.setText(this.mysteryCase.evidenceLabel).setColor('#7cffd8');
      this.tweens.killTweensOf(this.evidenceMarker);
      this.evidenceMarker.setAlpha(1);
      playSpecialVfx(this, 'mgs1VrVfxGoalMaterialize', this.evidence.x, this.evidence.y - 20, { scale: 0.7 });
    }
    if (this.mysteryCase.number === 9 && !this.wigEquipped) this.equipWig();
    this.flashClue(`EVIDENCE // ${this.mysteryCase.evidenceFinding}\nLEAD // ${this.mysteryCase.instruction}`);
  }

  private inspectSuspect(suspect: MysterySuspect): void {
    this.stats.shotsFired += 1;
    this.stats.hits += 1;
    if (!this.evidenceInspected) {
      this.flashClue(`${suspect.id} // INSPECT THE PRIMARY EVIDENCE FIRST`);
      return;
    }
    if (this.mysteryCase.number === 9 && !this.wigEquipped) {
      this.flashClue(`${suspect.id} // NO REACTION. THE LIQUID DISGUISE IS REQUIRED.`);
      return;
    }

    const finding = suspect.culprit ? this.mysteryCase.culpritFinding : this.mysteryCase.decoyFinding;
    this.flashClue(`${suspect.id} // ${finding}`);
    suspect.sprite.setTint(suspect.culprit ? 0xfff49a : 0x9fd4ff);
    this.time.delayedCall(500, () => suspect.sprite.active && suspect.sprite.clearTint());

    if (this.mysteryCase.number === 2 && suspect.culprit && !suspect.attachment && this.textures.exists('mgs1VrMysteryPinkSock')) {
      suspect.attachment = this.add.image(suspect.sprite.x, suspect.sprite.y - 50, 'mgs1VrMysteryPinkSock').setScale(0.34).setDepth(30);
    }
  }

  private equipWig(): void {
    this.wigEquipped = true;
    this.stats.secretsFound = 1;
    if (this.textures.exists('mgs1VrSnakeDisguise')) this.player.setTexture('mgs1VrSnakeDisguise');
    const wig = this.add.image(this.player.x, this.player.y - 43, 'mgs1VrMysteryBlondWig').setScale(0.32).setDepth(32);
    wig.setData('followsPlayer', true);
    this.events.on('update', () => wig.active && wig.setPosition(this.player.x, this.player.y - 43));
    this.flashClue('DISGUISE EQUIPPED // YOU NOW RESEMBLE LIQUID SNAKE');
  }

  private inspectVictim(): void {
    if (!this.roomOpened) {
      this.flashClue('BREAK THE SEALED DOOR WITH PUNCH-PUNCH-KICK FIRST');
      return;
    }
    if (!this.evidenceInspected) {
      this.flashClue('THE SEALED ROOM KEY MUST BE INSPECTED FIRST');
      return;
    }
    if (!this.victimInspected) {
      this.victimInspected = true;
      this.stats.shotsFired += 1;
      this.stats.hits += 1;
      this.stats.objectivesCompleted = 2;
      const profile = getMgs1VrSpecialProfileForMission(this.mission.id);
      const revealDelaySeconds = profile?.mode === 'mystery' ? profile.revealDelaySeconds ?? 180 : 180;
      this.revealAt = this.time.now + revealDelaySeconds * 1000;
    }
    const seconds = Math.max(0, Math.ceil((this.revealAt - this.time.now) / 1000));
    this.flashClue(`NO LETHAL WOUND FOUND // RECONSTRUCTION RUNNING ${seconds}s`);
  }

  private revealKetchup(): void {
    const texture = this.textures.exists('mgs1VrMysteryKetchupBottle') ? 'mgs1VrMysteryKetchupBottle' : this.mysteryCase.evidenceTexture;
    this.ketchup = this.add.image(1370, 470, texture).setDepth(32).setScale(0.78);
    this.stats.objectivesCompleted = 3;
    this.stats.secretsFound = 1;
    this.victim?.clearTint().setAngle(0);
    playSpecialVfx(this, 'mgs1VrVfxGoalMaterialize', 1370, 440, { scale: 0.9 });
    this.flashClue('CASE SOLVED // THE BLOOD IS KETCHUP. THE VICTIM STAGED THE MURDER.');
    this.materializeGoal();
  }

  private toggleGrab(): void {
    if (this.mysteryCase.number === 10) {
      this.strikeSealedDoor();
      return;
    }
    if (this.draggedSuspect) {
      const released = this.draggedSuspect;
      this.draggedSuspect = undefined;
      released.sprite.setTint(0xffffff).setAlpha(1);
      this.flashClue(`${released.id} RELEASED`);
      return;
    }

    const nearest = this.suspects
      .map((suspect) => ({ suspect, distance: Phaser.Math.Distance.Between(this.player.x, this.player.y, suspect.sprite.x, suspect.sprite.y) }))
      .sort((a, b) => a.distance - b.distance)[0];
    if (!nearest || nearest.distance > 92) {
      this.flashClue('NO SUSPECT IN GRAB RANGE');
      return;
    }
    this.draggedSuspect = nearest.suspect;
    this.draggedSuspect.sprite.setTint(0x7cffd8).setAlpha(0.86).setVelocity(0, 0);
    this.stats.neutralizations += 1;
    this.flashClue(`${this.draggedSuspect.id} CAPTURED // DRAG TO GOAL AND CONFIRM`);
  }

  private strikeSealedDoor(): void {
    if (this.roomOpened) {
      this.flashClue('DOOR OPEN // INSPECT THE KEY, THEN THE VICTIM');
      return;
    }
    if (!this.sealedDoor || Math.abs(this.player.x - this.sealedDoor.x) > 125) {
      this.flashClue('MOVE NEXT TO THE SEALED DOOR TO PERFORM THE CQC COMBO');
      return;
    }
    this.sealedDoorHits += 1;
    this.stats.shotsFired += 1;
    this.stats.hits += 1;
    playSpecialActorAnimation(this, this.player, 'melee', 180);
    this.sealedDoor.setTint(this.sealedDoorHits === 3 ? 0xfff49a : 0xff9a76);
    this.cameras.main.shake(90, 0.004);
    this.flashClue(`SEALED DOOR COMBO // ${this.sealedDoorHits}/3 ${this.sealedDoorHits === 1 ? 'PUNCH' : this.sealedDoorHits === 2 ? 'PUNCH' : 'KICK'}`);
    if (this.sealedDoorHits < 3) {
      this.time.delayedCall(160, () => this.sealedDoor?.active && this.sealedDoor.clearTint());
      return;
    }
    const x = this.sealedDoor.x;
    const y = this.sealedDoor.y;
    this.roomOpened = true;
    this.sealedDoor.destroy();
    this.sealedDoor = undefined;
    this.stats.objectivesCompleted = 1;
    playSpecialVfx(this, 'mgs1VrVfxWallCrumble', x, y, { scale: 1.35 });
    this.flashClue('SEALED DOOR OPEN // CRIME SCENE ACCESS GRANTED');
  }

  private updateDraggedSuspect(): void {
    if (!this.draggedSuspect) return;
    const offset = this.player.flipX ? 38 : -38;
    this.draggedSuspect.sprite.setPosition(this.player.x + offset, this.player.y + 2).setVelocity(0, 0).setFlipX(!this.player.flipX);
    this.draggedSuspect.attachment?.setPosition(this.draggedSuspect.sprite.x, this.draggedSuspect.sprite.y - 50);
  }

  private tryDeliver(): void {
    if (!this.exitPad || Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exitPad.x, this.exitPad.y) > 115) {
      this.flashClue('DELIVERY GOAL NOT IN RANGE');
      return;
    }

    if (this.mysteryCase.number === 10) {
      if (!this.ketchup) {
        this.flashClue('LOCKED-ROOM RECONSTRUCTION INCOMPLETE');
        return;
      }
      this.completeRun(true, 'Sealed Room solved: ketchup reveal');
      return;
    }

    if (!this.draggedSuspect) {
      this.flashClue('GRAB A SUSPECT BEFORE DELIVERY');
      return;
    }
    if (this.footprintsContaminated) {
      this.completeRun(false, 'Footprint trail contaminated');
      return;
    }
    if (!this.evidenceInspected) {
      this.completeRun(false, 'Accusation made without inspecting evidence');
      return;
    }
    if (!this.draggedSuspect.culprit) {
      this.completeRun(false, `Wrong accusation: ${this.draggedSuspect.id}`);
      return;
    }
    this.stats.objectivesCompleted = Math.max(3, this.stats.objectivesCompleted);
    this.completeRun(true, `${this.mysteryCase.title} solved`);
  }

  private materializeGoal(): void {
    if (this.exitPad) return;
    const texture = this.textures.exists('mgs1VrEnvHazardGoalBeacon') ? 'mgs1VrEnvHazardGoalBeacon' : 'vrGoalBeaconFallback';
    this.exitPad = this.physics.add.staticSprite(1815, 468, texture).setDepth(15);
    this.exitPad.setDisplaySize(42, 68).refreshBody();
    playSpecialVfx(this, 'mgs1VrVfxGoalMaterialize', this.exitPad.x, this.exitPad.y - 12);
    this.add.text(this.exitPad.x, 405, this.mysteryCase.number === 10 ? 'CASE EXIT' : 'CULPRIT DELIVERY', {
      fontFamily: 'monospace', fontSize: '11px', color: '#7cffd8', backgroundColor: '#050913cc'
    }).setOrigin(0.5).setDepth(60);
  }

  private addHud(): void {
    this.statusText = this.add.text(22, 48, '', {
      fontFamily: 'monospace', fontSize: '14px', color: '#d8fff8', backgroundColor: '#050913bb'
    }).setScrollFactor(0).setDepth(100);
    this.objectiveText = this.add.text(22, 76, `OBJECTIVE // ${this.mysteryCase.instruction}`, {
      fontFamily: 'monospace', fontSize: '13px', color: '#f8f49a', backgroundColor: '#050913bb'
    }).setScrollFactor(0).setDepth(100);
    this.cluePanel = this.add.text(22, 112, 'CLUE LOG // FIND AND INSPECT THE EVIDENCE', {
      fontFamily: 'monospace', fontSize: '13px', color: '#9fd4ff', backgroundColor: '#050913dd',
      padding: { x: 8, y: 6 }, wordWrap: { width: 620 }
    }).setScrollFactor(0).setDepth(100);
    this.hudText = this.add.text(22, 500, '', {
      fontFamily: 'monospace', fontSize: '13px', color: '#7cffd8', backgroundColor: '#050913dd'
    }).setScrollFactor(0).setDepth(100);
  }

  private updateHud(): void {
    if (this.mysteryCase.number === 10 && this.victimInspected && !this.ketchup) {
      const seconds = Math.max(0, Math.ceil((this.revealAt - this.time.now) / 1000));
      this.statusText.setText(`TIME ${this.stats.timeSeconds}s // RECONSTRUCTION ${seconds}s // EVIDENCE ${this.evidenceInspected ? 'INSPECTED' : 'UNKNOWN'}`);
    } else {
      this.statusText.setText(`TIME ${this.stats.timeSeconds}s // EVIDENCE ${this.evidenceInspected ? 'INSPECTED' : 'UNKNOWN'} // CAPTURE ${this.draggedSuspect?.id ?? 'NONE'}`);
    }
    const crawl = this.mysteryCase.number === 7 ? ' | HOLD CROUCH TO PROTECT PRINTS' : '';
    this.hudText.setText(`FIRE INSPECT | CQC GRAB/RELEASE | CONFIRM DELIVER${crawl} | CANCEL ABORT`);
  }

  private flashClue(message: string): void {
    this.cluePanel.setText(message);
    this.time.delayedCall(2600, () => {
      if (!this.cluePanel.active || this.completed) return;
      this.cluePanel.setText(this.evidenceInspected
        ? `LEAD // ${this.mysteryCase.instruction}`
        : 'CLUE LOG // FIND AND INSPECT THE EVIDENCE');
    });
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
    this.add.text(this.cameras.main.scrollX + 480, 250, success ? 'CASE SOLVED' : 'CASE FAILED', {
      fontFamily: 'monospace', fontSize: '28px', color: success ? '#7cffd8' : '#ff6b6b',
      backgroundColor: '#050913e8', padding: { x: 22, y: 12 }
    }).setOrigin(0.5).setDepth(140);
  }
}
