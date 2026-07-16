import Phaser from 'phaser';
import vrExtrasJson from '../../data/vrExtras.json';
import type { Mgs1VrPhotoshootExtra } from '../../types/vr.types';
import { loadVrProgress } from '../../systems/vrStorage';
import { saveMgs1VrPhotoshootPhoto } from '../../systems/mgs1VrPhotoshootStorage';
import { RuntimeInputController } from '../core/RuntimeInput';
import {
  emitGameEvent,
  GAME_EVENT,
  type VrPhotoCapturedPayload,
  type VrPhotoshootStatePayload
} from '../core/GameEvents';
import {
  getBestMgs1VrPhotoshootRank,
  getMgs1VrPhotoshootTier,
  labelMgs1VrPhotoScore,
  scoreMgs1VrPhotoFrame,
  type Mgs1VrPhotoshootTier
} from '../core/mgs1VrPhotoshootRules';
import { VR_ACTIVE_EXTRA_KEY } from '../core/vrConstants';

const extras = vrExtrasJson as Mgs1VrPhotoshootExtra[];

function getActiveExtra(): Mgs1VrPhotoshootExtra {
  const storedId = window.localStorage.getItem(VR_ACTIVE_EXTRA_KEY);
  return extras.find((extra) => extra.id === storedId) ?? extras[0];
}

/** Canon EXTRA photographing mode: viewfinder, rank-limited approach and album. */
export class VRPhotoshootScene extends Phaser.Scene {
  private extra!: Mgs1VrPhotoshootExtra;
  private tier!: Mgs1VrPhotoshootTier;
  private inputController!: RuntimeInputController;
  private model!: Phaser.GameObjects.Image;
  private viewfinder!: Phaser.GameObjects.Image;
  private reticleGlow!: Phaser.GameObjects.Arc;
  private hudText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private zoom = 1;
  private reticleX = 480;
  private reticleY = 270;
  private photosTaken = 0;
  private bestScore = 0;
  private sessionEndAt = 0;
  private lastStateEmitAt = 0;
  private lastShutterAt = 0;
  private poseIndex = 0;
  private nextPoseAt = 0;
  private sessionFinished = false;
  private finalStatus: 'complete' | 'aborted' | null = null;
  private savingPhoto = false;
  private poseBonus = 20;

  constructor() {
    super('VRPhotoshootScene');
  }

  create(): void {
    this.extra = getActiveExtra();
    const progress = loadVrProgress();
    this.tier = getMgs1VrPhotoshootTier(getBestMgs1VrPhotoshootRank(progress.records));
    this.zoom = 1;
    this.reticleX = 480;
    this.reticleY = 270;
    this.photosTaken = 0;
    this.bestScore = 0;
    this.poseIndex = 0;
    this.poseBonus = 20;
    this.sessionFinished = false;
    this.finalStatus = null;
    this.savingPhoto = false;
    const now = performance.now();
    this.sessionEndAt = now + this.tier.sessionSeconds * 1000;
    this.nextPoseAt = now + 4200;

    this.cameras.main.setViewport(0, 0, 960, 540);
    this.cameras.main.setBackgroundColor(0x020812);
    this.drawStudio();
    this.createModel();
    this.createViewfinder();
    this.createHud();
    this.inputController = new RuntimeInputController(this);
    this.emitState('running', `${this.extra.modelName} photoshoot started`);
  }

  update(_time: number, delta: number): void {
    if (this.sessionFinished) return;
    this.inputController.update();
    this.handleFraming(delta);
    this.handleZoom(delta);
    if (this.inputController.justDown('fire')) void this.capturePhoto();
    if (this.inputController.justDown('confirm')) this.advancePose(true);
    if (this.inputController.justDown('cancel')) {
      this.finishSession('aborted', 'Photoshoot aborted');
      return;
    }
    const now = performance.now();
    if (now >= this.nextPoseAt) this.advancePose(false);
    if (now >= this.sessionEndAt) {
      this.finishSession('complete', 'Photoshoot time expired; album saved');
      return;
    }
    this.updateViewfinder();
    this.updateHud();
    if (now > this.lastStateEmitAt + 400) this.emitState('running', 'Photoshoot active');
  }

  private drawStudio(): void {
    this.add.rectangle(480, 270, 960, 540, 0x030a16).setDepth(-40);
    for (let x = 0; x <= 960; x += 48) {
      this.add.line(x, 0, 0, 0, 0, 540, 0x28d9ff, x % 192 === 0 ? 0.22 : 0.08).setDepth(-35);
    }
    for (let y = 0; y <= 540; y += 48) {
      this.add.line(0, y, 0, 0, 960, 0, 0x28d9ff, y % 192 === 0 ? 0.18 : 0.06).setDepth(-35);
    }
    if (this.textures.exists('mgs1VrPhotoshootBackdrop')) {
      this.add.image(480, 310, 'mgs1VrPhotoshootBackdrop').setScale(6.5, 5).setAlpha(0.54).setDepth(-28);
    }
    this.add.ellipse(500, 458, 420, 70, 0x3eeeff, 0.16).setDepth(-10);
    if (this.textures.exists('mgs1VrPhotoshootSpotlight')) {
      this.add.image(92, 430, 'mgs1VrPhotoshootSpotlight').setScale(1.55).setDepth(4).setFlipX(true);
      this.add.image(868, 430, 'mgs1VrPhotoshootSpotlight').setScale(1.55).setDepth(4);
    }
    if (this.textures.exists('mgs1VrPhotoshootCamera')) {
      this.add.image(480, 500, 'mgs1VrPhotoshootCamera').setScale(1.15).setDepth(8).setAlpha(0.9);
    }
    if (this.textures.exists('mgs1VrPhotoshootPoseMarker')) {
      this.add.image(500, 320, 'mgs1VrPhotoshootPoseMarker').setScale(3.7).setAlpha(0.2).setDepth(-2);
    }
  }

  private createModel(): void {
    const fallback = this.extra.modelId === 'naomi_hunter' ? 'mgs1VrNaomiPhotoshoot' : 'mgs1VrMeiLingPhotoshoot';
    const texture = this.textures.exists(this.extra.textureKey) ? this.extra.textureKey : fallback;
    this.model = this.add.image(500, 322, texture).setScale(3.25).setDepth(12);
    this.model.setData('baseScale', 3.25);
    this.tweens.add({
      targets: this.model,
      y: 318,
      yoyo: true,
      repeat: -1,
      duration: 1600,
      ease: 'Sine.InOut'
    });
  }

  private createViewfinder(): void {
    if (this.textures.exists('mgs1VrPhotoshootViewfinder')) {
      this.viewfinder = this.add.image(this.reticleX, this.reticleY, 'mgs1VrPhotoshootViewfinder').setScale(2.25).setDepth(70);
    } else {
      const generated = this.add.renderTexture(0, 0, 128, 80).setVisible(false);
      this.viewfinder = this.add.image(this.reticleX, this.reticleY, generated.texture.key).setScale(2.25).setDepth(70);
    }
    this.reticleGlow = this.add.circle(this.reticleX, this.reticleY, 14, 0x66ffff, 0.08)
      .setStrokeStyle(2, 0x66ffff, 0.95)
      .setDepth(71);
    this.add.rectangle(480, 270, 900, 474, 0x000000, 0)
      .setStrokeStyle(2, 0x3effee, 0.35)
      .setDepth(66);
    this.add.line(480, 472, 70, 0, 890, 0, 0xfff49a, 0.68).setDepth(68);
    this.add.text(74, 455, `RANK LIMIT // ${this.tier.label} // MAX ZOOM ${this.tier.maxZoom.toFixed(2)}x`, {
      fontFamily: 'monospace', fontSize: '12px', color: '#fff49a', backgroundColor: '#020812cc'
    }).setDepth(80);
  }

  private createHud(): void {
    this.add.text(20, 16, `EXTRA // PHOTOGRAPHING // ${this.extra.modelName.toUpperCase()}`, {
      fontFamily: 'monospace', fontSize: '18px', color: '#7cffd8', stroke: '#020812', strokeThickness: 4
    }).setDepth(90);
    this.statusText = this.add.text(20, 46, this.extra.objective, {
      fontFamily: 'monospace', fontSize: '12px', color: '#9fd4ff', backgroundColor: '#020812cc',
      wordWrap: { width: 690 }, padding: { x: 6, y: 4 }
    }).setDepth(90);
    this.timerText = this.add.text(940, 18, '', {
      fontFamily: 'monospace', fontSize: '18px', color: '#fff49a', align: 'right', backgroundColor: '#020812cc'
    }).setOrigin(1, 0).setDepth(90);
    this.scoreText = this.add.text(940, 50, 'BEST 0000', {
      fontFamily: 'monospace', fontSize: '14px', color: '#7cffd8', align: 'right', backgroundColor: '#020812cc'
    }).setOrigin(1, 0).setDepth(90);
    this.hudText = this.add.text(20, 510, '', {
      fontFamily: 'monospace', fontSize: '12px', color: '#d8fff8', backgroundColor: '#020812dd'
    }).setDepth(90);
  }

  private handleFraming(delta: number): void {
    const speed = 0.22 * delta;
    if (this.inputController.isDown('moveLeft')) this.reticleX -= speed;
    if (this.inputController.isDown('moveRight')) this.reticleX += speed;
    if (this.inputController.isDown('jump')) this.reticleY -= speed;
    if (this.inputController.isDown('crouch')) this.reticleY += speed;
    this.reticleX = Phaser.Math.Clamp(this.reticleX, 155, 805);
    this.reticleY = Phaser.Math.Clamp(this.reticleY, 125, 420);
  }

  private handleZoom(delta: number): void {
    const zoomSpeed = 0.0011 * delta;
    if (this.inputController.isDown('chaff')) this.zoom -= zoomSpeed;
    if (this.inputController.isDown('ration')) this.zoom += zoomSpeed;
    this.zoom = Phaser.Math.Clamp(this.zoom, 1, this.tier.maxZoom);
    const baseScale = (this.model.getData('baseScale') as number | undefined) ?? 3.25;
    this.model.setScale(baseScale * (0.72 + this.zoom * 0.28));
  }

  private advancePose(manual: boolean): void {
    this.poseIndex = (this.poseIndex + 1) % 5;
    this.nextPoseAt = performance.now() + (manual ? 5200 : 4200);
    const poseOffsets = [
      { x: 500, angle: 0, flip: false, bonus: 20 },
      { x: 465, angle: -3, flip: false, bonus: 38 },
      { x: 535, angle: 3, flip: true, bonus: 34 },
      { x: 490, angle: -6, flip: true, bonus: 50 },
      { x: 515, angle: 5, flip: false, bonus: 44 }
    ];
    const pose = poseOffsets[this.poseIndex];
    this.poseBonus = pose.bonus;
    this.model.setFlipX(pose.flip);
    this.tweens.add({ targets: this.model, x: pose.x, angle: pose.angle, duration: 420, ease: 'Sine.Out' });
    if (manual) this.statusText.setText(`POSE ${this.poseIndex + 1}/5 // FRAME AND RELEASE THE SHUTTER`);
  }

  private updateViewfinder(): void {
    this.viewfinder.setPosition(this.reticleX, this.reticleY).setScale(2.25 - Math.min(0.45, (this.zoom - 1) * 0.18));
    this.reticleGlow.setPosition(this.reticleX, this.reticleY);
    const score = this.currentFrameScore();
    this.reticleGlow.setStrokeStyle(2, score >= 790 ? 0x7cff9a : score >= 600 ? 0xfff49a : 0xff7777, 1);
  }

  private updateHud(): void {
    const remaining = Math.max(0, Math.ceil((this.sessionEndAt - performance.now()) / 1000));
    this.timerText.setText(`TIME ${String(remaining).padStart(3, '0')}\nFILM ${this.photosTaken}`);
    this.scoreText.setText(`BEST ${String(this.bestScore).padStart(4, '0')}\nFRAME ${String(this.currentFrameScore()).padStart(4, '0')}`);
    this.hudText.setText(
      `ARROWS FRAME | FIRE SHUTTER | CHAFF ZOOM- | RATION ZOOM+ | CONFIRM NEXT POSE | ZOOM ${this.zoom.toFixed(2)}x/${this.tier.maxZoom.toFixed(2)}x`
    );
  }

  private currentFrameScore(): number {
    return scoreMgs1VrPhotoFrame({
      reticleX: this.reticleX,
      reticleY: this.reticleY,
      modelX: this.model.x,
      modelY: this.model.y - 10,
      zoom: this.zoom,
      maxZoom: this.tier.maxZoom,
      poseBonus: this.poseBonus
    });
  }

  private async capturePhoto(): Promise<void> {
    const now = performance.now();
    if (this.savingPhoto || now < this.lastShutterAt + 480 || this.sessionFinished) return;
    this.savingPhoto = true;
    this.lastShutterAt = now;
    const score = this.currentFrameScore();
    const label = labelMgs1VrPhotoScore(score);
    this.bestScore = Math.max(this.bestScore, score);
    this.photosTaken += 1;
    this.cameras.main.flash(110, 255, 255, 255);
    if (this.textures.exists('mgs1VrPhotoshootShutterFlash')) {
      const flash = this.add.image(this.reticleX, this.reticleY, 'mgs1VrPhotoshootShutterFlash').setScale(1.4).setDepth(120);
      this.tweens.add({ targets: flash, scale: 2.1, alpha: 0, duration: 230, onComplete: () => flash.destroy() });
    }
    this.inputController.vibrate(55, 0.32, 0.22);
    this.statusText.setText(`${label} // ${score} PTS // SAVING TO ALBUM...`);

    try {
      const thumbnail = this.captureThumbnail();
      const subject = this.extra.modelId === 'naomi_hunter' ? 'naomi' : 'mei_ling';
      const result = await saveMgs1VrPhotoshootPhoto({
        subject,
        score,
        thumbnail,
        framing: {
          centerX: Number((this.reticleX / 960).toFixed(4)),
          centerY: Number((this.reticleY / 540).toFixed(4)),
          width: Number((288 / this.zoom / 960).toFixed(4)),
          height: Number((180 / this.zoom / 540).toFixed(4))
        },
        zoom: Number(this.zoom.toFixed(3))
      });
      this.statusText.setText(`${label} // ${score} PTS // ALBUM ${result.backend.toUpperCase()}${result.issues.length ? ' // FALLBACK ACTIVE' : ''}`);
      emitGameEvent<VrPhotoCapturedPayload>(GAME_EVENT.VR_PHOTO_CAPTURED, {
        extraId: this.extra.id,
        subject,
        status: this.finalStatus ?? 'running',
        timeRemaining: Math.max(0, Math.ceil((this.sessionEndAt - performance.now()) / 1000)),
        photosTaken: this.photosTaken,
        bestScore: this.bestScore,
        zoom: this.zoom,
        message: `${label} photo saved`,
        photoId: result.value.id,
        score,
        storageBackend: result.backend
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Album save failed';
      this.statusText.setText(`PHOTO CAPTURED // ALBUM ERROR: ${message.toUpperCase()}`);
      console.error('[VR Photoshoot] Failed to save photo.', error);
    } finally {
      this.savingPhoto = false;
      if (!this.sessionFinished) this.emitState('running', `${label} frame captured`);
    }
  }

  private captureThumbnail(): string {
    const source = this.game.canvas;
    const output = document.createElement('canvas');
    output.width = 320;
    output.height = 180;
    const context = output.getContext('2d');
    if (!context) throw new Error('Photo canvas unavailable');
    context.imageSmoothingEnabled = false;
    const cropWidth = Math.min(960, 520 / Math.max(1, this.zoom * 0.62));
    const cropHeight = cropWidth * (9 / 16);
    const cropX = Phaser.Math.Clamp(this.reticleX - cropWidth / 2, 0, 960 - cropWidth);
    const cropY = Phaser.Math.Clamp(this.reticleY - cropHeight / 2, 0, 540 - cropHeight);
    context.drawImage(source, cropX, cropY, cropWidth, cropHeight, 0, 0, 320, 180);
    const dataUrl = output.toDataURL('image/webp', 0.72);
    if (!dataUrl.startsWith('data:image/webp')) throw new Error('WebP capture unavailable');
    return dataUrl;
  }

  private emitState(status: VrPhotoshootStatePayload['status'], message: string): void {
    this.lastStateEmitAt = performance.now();
    emitGameEvent<VrPhotoshootStatePayload>(GAME_EVENT.VR_PHOTOSHOOT_STATE, {
      extraId: this.extra.id,
      subject: this.extra.modelId === 'naomi_hunter' ? 'naomi' : 'mei_ling',
      status,
      timeRemaining: Math.max(0, Math.ceil((this.sessionEndAt - performance.now()) / 1000)),
      photosTaken: this.photosTaken,
      bestScore: this.bestScore,
      zoom: this.zoom,
      message
    });
  }

  private finishSession(status: 'complete' | 'aborted', message: string): void {
    if (this.sessionFinished) return;
    this.sessionFinished = true;
    this.finalStatus = status;
    this.emitState(status, message);
    this.add.text(480, 270, status === 'complete' ? 'PHOTOSHOOT COMPLETE\nALBUM SAVED' : 'PHOTOSHOOT ABORTED', {
      fontFamily: 'monospace', fontSize: '26px', color: status === 'complete' ? '#7cffd8' : '#ff8e8e',
      align: 'center', backgroundColor: '#020812e8', padding: { x: 22, y: 14 }
    }).setOrigin(0.5).setDepth(150);
  }
}
