import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { SideOpsScene } from '../scenes/SideOpsScene';
import { MissionCompleteScene } from '../scenes/MissionCompleteScene';

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: '#06140c',
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 900, x: 0 },
        debug: false
      }
    },
    scene: [BootScene, PreloadScene, SideOpsScene, MissionCompleteScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
}
