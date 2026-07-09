import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  create(): void {
    const graphics = this.add.graphics();
    graphics.setVisible(false);

    graphics.fillStyle(0x7cff6b, 1);
    graphics.fillRect(8, 0, 16, 10);
    graphics.fillRect(6, 10, 20, 24);
    graphics.fillRect(4, 34, 8, 14);
    graphics.fillRect(20, 34, 8, 14);
    graphics.fillStyle(0x102814, 1);
    graphics.fillRect(11, 4, 10, 3);
    graphics.generateTexture('player', 32, 48);
    graphics.clear();

    graphics.fillStyle(0x9aff8a, 1);
    graphics.fillRect(7, 0, 18, 10);
    graphics.fillRect(5, 10, 22, 22);
    graphics.fillRect(4, 32, 8, 14);
    graphics.fillRect(20, 32, 8, 14);
    graphics.fillStyle(0x122416, 1);
    graphics.fillRect(8, 8, 16, 7);
    graphics.generateTexture('guard', 32, 48);
    graphics.clear();


    graphics.fillStyle(0xffdf85, 1);
    graphics.fillRect(7, 0, 18, 10);
    graphics.fillRect(5, 10, 22, 22);
    graphics.fillRect(4, 32, 8, 14);
    graphics.fillRect(20, 32, 8, 14);
    graphics.fillStyle(0x2a220b, 1);
    graphics.fillRect(8, 8, 16, 7);
    graphics.generateTexture('reinforcementGuard', 32, 48);
    graphics.clear();

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

    this.scene.start('SideOpsScene');
  }
}
