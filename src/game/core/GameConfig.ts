import type Phaser from 'phaser';

type PhaserRuntime = typeof Phaser;
export type GameStartScene =
  | 'SideOpsScene'
  | 'VRTrainingScene'
  | 'VRNinjaScene'
  | 'VRMysteryScene'
  | 'VRPhotoshootScene';

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

  let scene: Phaser.Types.Scenes.SceneType[];
  if (startScene === 'VRTrainingScene') {
    scene = [BootScene, PreloadScene, (await import('../scenes/VRTrainingScene')).VRTrainingScene];
  } else if (startScene === 'VRNinjaScene') {
    scene = [BootScene, PreloadScene, (await import('../scenes/VRNinjaScene')).VRNinjaScene];
  } else if (startScene === 'VRMysteryScene') {
    scene = [BootScene, PreloadScene, (await import('../scenes/VRMysteryScene')).VRMysteryScene];
  } else if (startScene === 'VRPhotoshootScene') {
    scene = [BootScene, PreloadScene, (await import('../scenes/VRPhotoshootScene')).VRPhotoshootScene];
  } else {
    scene = [
        BootScene,
        PreloadScene,
        (await import('../scenes/SideOpsScene')).SideOpsScene,
        (await import('../scenes/Mgs1ShadowMosesScene')).Mgs1ShadowMosesScene,
        (await import('../scenes/Mg1OuterHeavenScene')).Mg1OuterHeavenScene,
        (await import('../scenes/MissionCompleteScene')).MissionCompleteScene
      ];
  }

  return {
    // The VR bridge uses the deterministic 2D canvas renderer so pixel-art
    // framing and Photoshoot captures match what is actually stored.
    type: startScene === 'SideOpsScene' ? PhaserRuntime.AUTO : PhaserRuntime.CANVAS,
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
