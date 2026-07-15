import type Phaser from 'phaser';

type PhaserRuntime = typeof Phaser;
export type GameStartScene = 'SideOpsScene' | 'VRTrainingScene';

export async function createGameConfig(
  PhaserRuntime: PhaserRuntime,
  parent: string,
  startScene: GameStartScene = 'SideOpsScene'
): Promise<Phaser.Types.Core.GameConfig> {
  window.localStorage.setItem('shadow-codec-phaser-start-scene', startScene);

  const [{ BootScene }, { PreloadScene }] = await Promise.all([
    import('../scenes/BootScene'),
    import('../scenes/PreloadScene')
  ]);

  const scene = startScene === 'VRTrainingScene'
    ? [BootScene, PreloadScene, (await import('../scenes/VRTrainingScene')).VRTrainingScene]
    : [
        BootScene,
        PreloadScene,
        (await import('../scenes/SideOpsScene')).SideOpsScene,
        (await import('../scenes/Mg1OuterHeavenScene')).Mg1OuterHeavenScene,
        (await import('../scenes/MissionCompleteScene')).MissionCompleteScene
      ];

  return {
    type: PhaserRuntime.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: '#06140c',
    pixelArt: true,
    input: {
      gamepad: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 900, x: 0 },
        debug: false
      }
    },
    scene,
    scale: {
      mode: PhaserRuntime.Scale.FIT,
      autoCenter: PhaserRuntime.Scale.CENTER_BOTH
    }
  };
}
