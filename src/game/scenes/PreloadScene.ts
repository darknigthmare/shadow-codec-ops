import Phaser from 'phaser';
import { getStorageKey } from '../../systems/saveEngine';
import { parseStoredSideOpsMissionId, resolveSideOpsRuntimeScene } from '../../systems/sideOpsRuntimeResolver';
import { SIDEOPS_PLAYABLE_OPERATIVE_ASSETS } from '../../systems/sideOpsCharacterResolver';
import {
  MG1_SIDEOPS_ALL_ASSETS,
  type Mg1SideOpsAsset
} from '../core/mg1SideOpsAssetRegistry';

function preloadMg1Asset(scene: Phaser.Scene, asset: Mg1SideOpsAsset): void {
  if (asset.loader === 'spritesheet') {
    scene.load.spritesheet(asset.textureKey, asset.path, {
      frameWidth: asset.frameWidth,
      frameHeight: asset.frameHeight,
      endFrame: asset.frameCount - 1
    });
    return;
  }
  scene.load.image(asset.textureKey, asset.path);
}

function drawMg1HumanoidFallback(graphics: Phaser.GameObjects.Graphics, asset: Mg1SideOpsAsset): void {
  const center = Math.floor(asset.width / 2);
  const headWidth = Math.max(8, Math.floor(asset.width * 0.36));
  const headHeight = Math.max(8, Math.floor(asset.height * 0.2));
  const torsoWidth = Math.max(10, Math.floor(asset.width * 0.56));
  const torsoY = headHeight;
  const torsoHeight = Math.max(12, Math.floor(asset.height * 0.45));
  const legWidth = Math.max(4, Math.floor(asset.width * 0.2));
  const legY = torsoY + torsoHeight;
  graphics.fillStyle(asset.fallbackPrimaryColor, 1);
  graphics.fillRect(center - Math.floor(headWidth / 2), 0, headWidth, headHeight);
  graphics.fillRect(center - Math.floor(torsoWidth / 2), torsoY, torsoWidth, torsoHeight);
  graphics.fillRect(center - legWidth - 1, legY, legWidth, asset.height - legY);
  graphics.fillRect(center + 1, legY, legWidth, asset.height - legY);
  graphics.fillStyle(asset.fallbackAccentColor, 1);
  graphics.fillRect(center - Math.floor(torsoWidth / 2), torsoY + Math.floor(torsoHeight * 0.38), torsoWidth, Math.max(2, Math.floor(asset.height * 0.06)));
  graphics.fillRect(center + Math.floor(torsoWidth * 0.35), torsoY + Math.floor(torsoHeight * 0.52), Math.max(3, Math.floor(asset.width * 0.28)), 3);
}

function drawMg1AnimalFallback(graphics: Phaser.GameObjects.Graphics, asset: Mg1SideOpsAsset): void {
  const bodyY = Math.max(2, Math.floor(asset.height * 0.34));
  const bodyHeight = Math.max(5, Math.floor(asset.height * 0.42));
  graphics.fillStyle(asset.fallbackPrimaryColor, 1);
  graphics.fillRect(1, bodyY, Math.max(5, Math.floor(asset.width * 0.68)), bodyHeight);
  graphics.fillCircle(Math.floor(asset.width * 0.78), bodyY + Math.floor(bodyHeight / 2), Math.max(3, Math.floor(asset.height * 0.2)));
  graphics.fillRect(Math.floor(asset.width * 0.18), bodyY + bodyHeight, Math.max(2, Math.floor(asset.width * 0.1)), Math.max(2, asset.height - bodyY - bodyHeight));
  graphics.fillRect(Math.floor(asset.width * 0.56), bodyY + bodyHeight, Math.max(2, Math.floor(asset.width * 0.1)), Math.max(2, asset.height - bodyY - bodyHeight));
  graphics.fillStyle(asset.fallbackAccentColor, 1);
  graphics.fillRect(Math.floor(asset.width * 0.78), bodyY + 1, Math.max(2, Math.floor(asset.width * 0.14)), 2);
}

function drawMg1MachineFallback(graphics: Phaser.GameObjects.Graphics, asset: Mg1SideOpsAsset): void {
  const bodyY = Math.floor(asset.height * 0.24);
  const bodyHeight = Math.max(12, Math.floor(asset.height * 0.48));
  graphics.fillStyle(asset.fallbackPrimaryColor, 1);
  graphics.fillRect(Math.floor(asset.width * 0.08), bodyY, Math.floor(asset.width * 0.84), bodyHeight);
  graphics.fillRect(Math.floor(asset.width * 0.32), Math.floor(asset.height * 0.08), Math.floor(asset.width * 0.36), Math.max(6, Math.floor(asset.height * 0.2)));
  if (asset.height > asset.width) {
    const legY = bodyY + bodyHeight;
    graphics.fillRect(Math.floor(asset.width * 0.18), legY, Math.floor(asset.width * 0.22), asset.height - legY);
    graphics.fillRect(Math.floor(asset.width * 0.6), legY, Math.floor(asset.width * 0.22), asset.height - legY);
  } else {
    graphics.fillRect(0, bodyY + bodyHeight - 3, asset.width, Math.max(4, Math.floor(asset.height * 0.18)));
  }
  graphics.fillStyle(asset.fallbackAccentColor, 1);
  graphics.fillRect(Math.floor(asset.width * 0.66), bodyY + 3, Math.floor(asset.width * 0.3), Math.max(3, Math.floor(asset.height * 0.08)));
  graphics.lineStyle(2, asset.fallbackAccentColor, 1);
  graphics.strokeRect(Math.floor(asset.width * 0.08), bodyY, Math.floor(asset.width * 0.84), bodyHeight);
}

function drawMg1EffectFallback(graphics: Phaser.GameObjects.Graphics, asset: Mg1SideOpsAsset): void {
  if (asset.loader !== 'spritesheet') return;
  for (let frame = 0; frame < asset.frameCount; frame += 1) {
    const frameX = frame * asset.frameWidth;
    const progress = (frame + 1) / asset.frameCount;
    const radius = Math.max(2, Math.floor(Math.min(asset.frameWidth, asset.frameHeight) * 0.42 * progress));
    graphics.fillStyle(asset.fallbackPrimaryColor, Math.max(0.25, 1 - progress * 0.45));
    graphics.fillCircle(frameX + Math.floor(asset.frameWidth / 2), Math.floor(asset.frameHeight / 2), radius);
    graphics.fillStyle(asset.fallbackAccentColor, Math.max(0.2, 1 - progress * 0.6));
    graphics.fillCircle(frameX + Math.floor(asset.frameWidth / 2), Math.floor(asset.frameHeight / 2), Math.max(1, Math.floor(radius * 0.45)));
  }
}

function createMg1FallbackTexture(scene: Phaser.Scene, graphics: Phaser.GameObjects.Graphics, asset: Mg1SideOpsAsset): void {
  if (scene.textures.exists(asset.textureKey)) return;
  graphics.clear();
  if (asset.fallbackShape === 'humanoid') drawMg1HumanoidFallback(graphics, asset);
  if (asset.fallbackShape === 'animal') drawMg1AnimalFallback(graphics, asset);
  if (asset.fallbackShape === 'machine') drawMg1MachineFallback(graphics, asset);
  if (asset.fallbackShape === 'sensor') {
    graphics.fillStyle(asset.fallbackPrimaryColor, 1);
    graphics.fillRect(0, 0, asset.width, asset.height);
    graphics.fillStyle(asset.fallbackAccentColor, 1);
    graphics.fillCircle(Math.floor(asset.width / 2), Math.floor(asset.height / 2), Math.max(2, Math.floor(asset.height * 0.22)));
  }
  if (asset.fallbackShape === 'projectile') {
    graphics.fillStyle(asset.fallbackPrimaryColor, 1);
    graphics.fillRect(0, Math.max(0, Math.floor(asset.height * 0.2)), asset.width, Math.max(2, Math.ceil(asset.height * 0.6)));
    graphics.fillStyle(asset.fallbackAccentColor, 1);
    graphics.fillRect(Math.max(0, asset.width - Math.max(2, Math.floor(asset.width * 0.28))), 0, Math.max(2, Math.floor(asset.width * 0.28)), asset.height);
  }
  if (asset.fallbackShape === 'effect') drawMg1EffectFallback(graphics, asset);
  graphics.generateTexture(asset.textureKey, asset.width, asset.height);
  if (asset.loader === 'spritesheet') {
    const texture = scene.textures.get(asset.textureKey);
    for (let frame = 0; frame < asset.frameCount; frame += 1) {
      texture.add(frame, 0, frame * asset.frameWidth, 0, asset.frameWidth, asset.frameHeight);
    }
  }
  graphics.clear();
}

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    this.load.image('player', '/sideops/characters/solid-snake-mgs1.png');
    this.load.image('playerTanker', '/sideops/characters/solid-snake-mgs2.png');
    this.load.image('guard', '/sideops/characters/genome-guard.png');
    this.load.image('reinforcementGuard', '/sideops/characters/genome-reinforcement.png');
    this.load.image('deckGuard', '/sideops/characters/tanker-guard.png');
    this.load.image('deckReinforcement', '/sideops/characters/tanker-reinforcement.png');
    this.load.image('bossCaptain', '/sideops/characters/armored-guard-captain.png');
    this.load.image('bossDeckCommander', '/sideops/characters/shielded-deck-commander.png');
    this.load.image('vrPlayer', '/vr/characters/vr-operator.png');
    this.load.image('vrGuard', '/vr/characters/vr-guard.png');
    this.load.image('vrTarget', '/vr/characters/vr-target-drone.png');
    this.load.image('vrBoss', '/vr/characters/vr-armored-captain.png');
    SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.forEach((asset) => this.load.image(asset.textureKey, asset.path));
    MG1_SIDEOPS_ALL_ASSETS.forEach((asset) => preloadMg1Asset(this, asset));
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.setVisible(false);

    if (!this.textures.exists('player')) {
      graphics.fillStyle(0x7cff6b, 1);
      graphics.fillRect(8, 0, 16, 10);
      graphics.fillRect(6, 10, 20, 24);
      graphics.fillRect(4, 34, 8, 14);
      graphics.fillRect(20, 34, 8, 14);
      graphics.fillStyle(0x102814, 1);
      graphics.fillRect(11, 4, 10, 3);
      graphics.generateTexture('player', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('playerTanker')) {
      graphics.fillStyle(0x9fd4ff, 1);
      graphics.fillRect(8, 0, 16, 10);
      graphics.fillRect(6, 10, 20, 24);
      graphics.fillRect(4, 34, 8, 14);
      graphics.fillRect(20, 34, 8, 14);
      graphics.fillStyle(0x102838, 1);
      graphics.fillRect(11, 4, 10, 3);
      graphics.generateTexture('playerTanker', 32, 48);
      graphics.clear();
    }

    SIDEOPS_PLAYABLE_OPERATIVE_ASSETS.forEach((asset) => {
      if (this.textures.exists(asset.textureKey)) return;
      graphics.fillStyle(asset.fallbackBodyColor, 1);
      graphics.fillRect(8, 0, 16, 10);
      graphics.fillRect(6, 10, 20, 24);
      graphics.fillRect(4, 34, 8, 14);
      graphics.fillRect(20, 34, 8, 14);
      graphics.fillStyle(0x101614, 1);
      graphics.fillRect(11, 4, 10, 3);
      graphics.fillStyle(asset.fallbackAccentColor, 1);
      graphics.fillRect(9, 17, 15, 4);
      graphics.fillRect(23, 19, 8, 3);
      graphics.generateTexture(asset.textureKey, 32, 48);
      graphics.clear();
    });

    MG1_SIDEOPS_ALL_ASSETS.forEach((asset) => createMg1FallbackTexture(this, graphics, asset));

    if (!this.textures.exists('guard')) {
      graphics.fillStyle(0x9aff8a, 1);
      graphics.fillRect(7, 0, 18, 10);
      graphics.fillRect(5, 10, 22, 22);
      graphics.fillRect(4, 32, 8, 14);
      graphics.fillRect(20, 32, 8, 14);
      graphics.fillStyle(0x122416, 1);
      graphics.fillRect(8, 8, 16, 7);
      graphics.generateTexture('guard', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('reinforcementGuard')) {
      graphics.fillStyle(0xffdf85, 1);
      graphics.fillRect(7, 0, 18, 10);
      graphics.fillRect(5, 10, 22, 22);
      graphics.fillRect(4, 32, 8, 14);
      graphics.fillRect(20, 32, 8, 14);
      graphics.fillStyle(0x2a220b, 1);
      graphics.fillRect(8, 8, 16, 7);
      graphics.generateTexture('reinforcementGuard', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('deckGuard')) {
      graphics.fillStyle(0x9fd4ff, 1);
      graphics.fillRect(7, 0, 18, 10);
      graphics.fillRect(5, 10, 22, 22);
      graphics.fillRect(4, 32, 8, 14);
      graphics.fillRect(20, 32, 8, 14);
      graphics.fillStyle(0x102838, 1);
      graphics.fillRect(8, 8, 16, 7);
      graphics.fillStyle(0xd8ffd4, 1);
      graphics.fillRect(6, 16, 20, 4);
      graphics.generateTexture('deckGuard', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('deckReinforcement')) {
      graphics.fillStyle(0xffdf85, 1);
      graphics.fillRect(7, 0, 18, 10);
      graphics.fillRect(5, 10, 22, 22);
      graphics.fillRect(4, 32, 8, 14);
      graphics.fillRect(20, 32, 8, 14);
      graphics.fillStyle(0x123047, 1);
      graphics.fillRect(8, 8, 16, 7);
      graphics.fillStyle(0x9fd4ff, 1);
      graphics.fillRect(6, 16, 20, 4);
      graphics.generateTexture('deckReinforcement', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('vrPlayer')) {
      graphics.fillStyle(0x80f8ff, 1);
      graphics.fillRect(8, 0, 16, 10);
      graphics.fillRect(6, 10, 20, 24);
      graphics.fillRect(4, 34, 8, 14);
      graphics.fillRect(20, 34, 8, 14);
      graphics.fillStyle(0x07131b, 1);
      graphics.fillRect(11, 4, 10, 3);
      graphics.fillRect(9, 18, 14, 4);
      graphics.generateTexture('vrPlayer', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('vrGuard')) {
      graphics.fillStyle(0xff6b6b, 1);
      graphics.fillRect(7, 0, 18, 10);
      graphics.fillRect(5, 10, 22, 22);
      graphics.fillRect(4, 32, 8, 14);
      graphics.fillRect(20, 32, 8, 14);
      graphics.fillStyle(0x220b12, 1);
      graphics.fillRect(8, 7, 16, 7);
      graphics.fillStyle(0x80f8ff, 1);
      graphics.fillRect(7, 18, 18, 3);
      graphics.generateTexture('vrGuard', 32, 48);
      graphics.clear();
    }

    if (!this.textures.exists('vrTarget')) {
      graphics.fillStyle(0x9fd4ff, 1);
      graphics.fillRect(8, 2, 16, 6);
      graphics.fillRect(5, 8, 22, 30);
      graphics.fillRect(3, 38, 10, 8);
      graphics.fillRect(19, 38, 10, 8);
      graphics.fillStyle(0x07131b, 1);
      graphics.fillCircle(16, 22, 8);
      graphics.fillStyle(0xf8f49a, 1);
      graphics.fillCircle(16, 22, 3);
      graphics.generateTexture('vrTarget', 32, 48);
      graphics.clear();
    }

    graphics.fillStyle(0x31593a, 1);
    graphics.fillRect(0, 0, 64, 16);
    graphics.lineStyle(1, 0x7cff6b, 0.6);
    graphics.strokeRect(0, 0, 64, 16);
    graphics.generateTexture('platform', 64, 16);
    graphics.clear();

    graphics.fillStyle(0xf8f49a, 1);
    graphics.fillRect(0, 0, 14, 10);
    graphics.fillStyle(0x102814, 1);
    graphics.fillRect(2, 3, 10, 2);
    graphics.generateTexture('keycard', 14, 10);
    graphics.clear();

    graphics.fillStyle(0x66ffcc, 1);
    graphics.fillRect(0, 0, 42, 68);
    graphics.lineStyle(2, 0x0b1f12, 1);
    graphics.strokeRect(0, 0, 42, 68);
    graphics.generateTexture('elevator', 42, 68);
    graphics.clear();

    graphics.fillStyle(0x143f20, 1);
    graphics.fillRect(0, 0, 34, 92);
    graphics.lineStyle(2, 0x7cff6b, 0.85);
    graphics.strokeRect(0, 0, 34, 92);
    graphics.fillStyle(0xff6b6b, 1);
    graphics.fillRect(8, 12, 18, 5);
    graphics.generateTexture('door', 34, 92);
    graphics.clear();

    graphics.fillStyle(0x6aefef, 1);
    graphics.fillRect(0, 0, 30, 20);
    graphics.fillStyle(0x102814, 1);
    graphics.fillRect(6, 6, 18, 8);
    graphics.fillStyle(0x7cff6b, 1);
    graphics.fillCircle(15, 10, 4);
    graphics.generateTexture('cameraNode', 30, 20);
    graphics.clear();

    graphics.fillStyle(0xff4f4f, 1);
    graphics.fillRect(0, 0, 8, 3);
    graphics.generateTexture('bullet', 8, 3);
    graphics.clear();

    graphics.fillStyle(0xf8f49a, 1);
    graphics.fillRect(0, 0, 10, 4);
    graphics.generateTexture('enemyBullet', 10, 4);
    graphics.clear();

    graphics.fillStyle(0xd8ffd4, 1);
    graphics.fillRect(0, 0, 18, 12);
    graphics.lineStyle(1, 0x7cff6b, 1);
    graphics.strokeRect(0, 0, 18, 12);
    graphics.generateTexture('ration', 18, 12);
    graphics.clear();

    graphics.fillStyle(0x88a8ff, 1);
    graphics.fillCircle(8, 8, 8);
    graphics.lineStyle(1, 0xd8ffd4, 1);
    graphics.strokeCircle(8, 8, 7);
    graphics.generateTexture('chaffPickup', 16, 16);
    graphics.clear();


    graphics.fillStyle(0x9fd4ff, 1);
    graphics.fillRect(0, 0, 20, 12);
    graphics.fillStyle(0x102814, 1);
    graphics.fillRect(3, 4, 14, 4);
    graphics.lineStyle(1, 0xd8ffd4, 1);
    graphics.strokeRect(0, 0, 20, 12);
    graphics.generateTexture('ammoBox', 20, 12);
    graphics.clear();



    if (!this.textures.exists('bossCaptain')) {
      graphics.fillStyle(0xffdf85, 1);
      graphics.fillRect(10, 0, 28, 12);
      graphics.fillRect(6, 12, 36, 30);
      graphics.fillRect(4, 42, 12, 20);
      graphics.fillRect(32, 42, 12, 20);
      graphics.fillStyle(0x3b2b10, 1);
      graphics.fillRect(12, 12, 24, 8);
      graphics.fillStyle(0xff6b6b, 1);
      graphics.fillRect(5, 24, 38, 5);
      graphics.lineStyle(2, 0xf8f49a, 1);
      graphics.strokeRect(6, 12, 36, 30);
      graphics.generateTexture('bossCaptain', 48, 64);
      graphics.clear();
    }

    if (!this.textures.exists('bossDeckCommander')) {
      graphics.fillStyle(0x9fd4ff, 1);
      graphics.fillRect(10, 0, 28, 12);
      graphics.fillRect(6, 12, 36, 30);
      graphics.fillRect(4, 42, 12, 20);
      graphics.fillRect(32, 42, 12, 20);
      graphics.fillStyle(0x112c3f, 1);
      graphics.fillRect(12, 12, 24, 8);
      graphics.fillStyle(0xf8f49a, 1);
      graphics.fillRect(5, 24, 38, 5);
      graphics.lineStyle(2, 0x9fd4ff, 1);
      graphics.strokeRect(6, 12, 36, 30);
      graphics.fillStyle(0xd8ffd4, 1);
      graphics.fillRect(0, 20, 9, 28);
      graphics.generateTexture('bossDeckCommander', 48, 64);
      graphics.clear();
    }

    if (!this.textures.exists('vrBoss')) {
      graphics.fillStyle(0xff6b6b, 1);
      graphics.fillRect(10, 0, 28, 12);
      graphics.fillRect(6, 12, 36, 30);
      graphics.fillRect(4, 42, 12, 20);
      graphics.fillRect(32, 42, 12, 20);
      graphics.fillStyle(0x220b12, 1);
      graphics.fillRect(12, 10, 24, 9);
      graphics.fillStyle(0x80f8ff, 1);
      graphics.fillRect(5, 25, 38, 5);
      graphics.lineStyle(2, 0xf8f49a, 1);
      graphics.strokeRect(6, 12, 36, 30);
      graphics.generateTexture('vrBoss', 48, 64);
      graphics.clear();
    }

    graphics.fillStyle(0x7cff6b, 1);
    graphics.fillRect(0, 0, 12, 12);
    graphics.fillStyle(0xf8f49a, 1);
    graphics.fillRect(3, 3, 6, 6);
    graphics.lineStyle(1, 0xd8ffd4, 1);
    graphics.strokeRect(0, 0, 12, 12);
    graphics.generateTexture('secretItem', 12, 12);
    graphics.clear();

    graphics.fillStyle(0x456b49, 1);
    graphics.fillRect(0, 0, 28, 40);
    graphics.fillStyle(0x102814, 1);
    graphics.fillRect(4, 8, 20, 8);
    graphics.generateTexture('crate', 28, 40);
    graphics.destroy();

    const requestedStartScene = window.localStorage.getItem('shadow-codec-phaser-start-scene');
    const storedMissionId = window.localStorage.getItem(getStorageKey('sideops-active-mission-id'))
      ?? window.localStorage.getItem('sideops-active-mission-id');
    const startScene = requestedStartScene === 'VRTrainingScene'
      ? 'VRTrainingScene'
      : resolveSideOpsRuntimeScene(parseStoredSideOpsMissionId(storedMissionId));
    this.scene.start(startScene);
  }
}
