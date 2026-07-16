import Phaser from 'phaser';
import vrMissionsJson from '../../data/vrMissions.json';
import type { VrMissionDefinition, VrRunStats } from '../../types/vr.types';
import {
  MGS1_VR_ACTOR_ASSETS,
  MGS1_VR_VFX_ASSETS,
  getMgs1VrActorAnimationClip,
  getMgs1VrActorAnimationKey,
  getMgs1VrVfxAnimationClip,
  getMgs1VrVfxAnimationKey,
  type Mgs1VrActorAnimationState
} from '../core/mgs1VrGameplayAssetRegistry';
import { getMgs1VrSpecialProfileForMission } from '../core/mgs1VrSpecialModeRegistry';
import { VR_ACTIVE_MISSION_KEY } from '../core/vrConstants';

const vrMissions = vrMissionsJson as VrMissionDefinition[];

export function createEmptySpecialStats(): VrRunStats {
  return {
    timeSeconds: 0,
    alerts: 0,
    shotsFired: 0,
    hits: 0,
    kills: 0,
    neutralizations: 0,
    damageTaken: 0,
    rationsUsed: 0,
    camerasDisabled: 0,
    objectivesCompleted: 0,
    secretsFound: 0,
    bossDefeated: false
  };
}

export function getActiveSpecialMission(mode: 'ninja' | 'mystery'): VrMissionDefinition {
  const storedId = window.localStorage.getItem(VR_ACTIVE_MISSION_KEY);
  const matchesMode = (mission: VrMissionDefinition) =>
    getMgs1VrSpecialProfileForMission(mission.id)?.mode === mode;
  return vrMissions.find((mission) => mission.id === storedId && matchesMode(mission))
    ?? vrMissions.find(matchesMode)
    ?? vrMissions[0];
}

export function createSpecialAnimations(scene: Phaser.Scene): void {
  MGS1_VR_ACTOR_ASSETS.forEach((asset) => {
    if (!scene.textures.exists(asset.textureKey)) return;
    (Object.keys(asset.clips) as Mgs1VrActorAnimationState[]).forEach((state) => {
      const clip = getMgs1VrActorAnimationClip(asset.textureKey, state);
      const key = getMgs1VrActorAnimationKey(asset.textureKey, state);
      if (!clip || scene.anims.exists(key)) return;
      scene.anims.create({
        key,
        frames: scene.anims.generateFrameNumbers(asset.textureKey, { start: clip.start, end: clip.end }),
        frameRate: clip.frameRate,
        repeat: clip.repeat
      });
    });
  });

  MGS1_VR_VFX_ASSETS.forEach((asset) => {
    if (!scene.textures.exists(asset.textureKey)) return;
    const clip = getMgs1VrVfxAnimationClip(asset.textureKey);
    const key = getMgs1VrVfxAnimationKey(asset.textureKey);
    if (!clip || scene.anims.exists(key)) return;
    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNumbers(asset.textureKey, { start: clip.start, end: clip.end }),
      frameRate: clip.frameRate,
      repeat: clip.repeat
    });
  });
}

export function playSpecialActorAnimation(
  scene: Phaser.Scene,
  sprite: Phaser.Physics.Arcade.Sprite,
  state: Mgs1VrActorAnimationState,
  actionDuration = 0
): void {
  const key = getMgs1VrActorAnimationKey(sprite.texture.key, state);
  if (!scene.anims.exists(key)) return;
  if (actionDuration > 0) sprite.setData('actionUntil', scene.time.now + actionDuration);
  const actionUntil = (sprite.getData('actionUntil') as number | undefined) ?? 0;
  if (actionDuration === 0 && actionUntil > scene.time.now) return;
  sprite.play(key, true);
}

export function playSpecialVfx(
  scene: Phaser.Scene,
  textureKey: string,
  x: number,
  y: number,
  options: { flipX?: boolean; scale?: number; duration?: number } = {}
): Phaser.GameObjects.Sprite | undefined {
  if (!scene.textures.exists(textureKey)) return undefined;
  const vfx = scene.add.sprite(x, y, textureKey)
    .setDepth(70)
    .setFlipX(Boolean(options.flipX))
    .setScale(options.scale ?? 1);
  const key = getMgs1VrVfxAnimationKey(textureKey);
  const clip = getMgs1VrVfxAnimationClip(textureKey);
  if (!scene.anims.exists(key) || !clip) {
    scene.time.delayedCall(options.duration ?? 220, () => vfx.active && vfx.destroy());
    return vfx;
  }
  vfx.play(key);
  if (clip.repeat < 0) scene.time.delayedCall(options.duration ?? 360, () => vfx.active && vfx.destroy());
  else vfx.once('animationcomplete', () => vfx.destroy());
  return vfx;
}

export function addSpecialVrBackdrop(
  scene: Phaser.Scene,
  title: string,
  colors: { void: number; grid: number; accent: number } = { void: 0x020b12, grid: 0x1de9b6, accent: 0x66ffcc }
): void {
  scene.add.rectangle(960, 270, 1920, 540, colors.void).setDepth(-50);
  if (scene.textures.exists('mgs1VrEnvTileSpecialBackdrop')) {
    scene.add.tileSprite(960, 270, 1920, 540, 'mgs1VrEnvTileSpecialBackdrop').setAlpha(0.42).setDepth(-48);
  }
  for (let x = 0; x <= 1920; x += 80) {
    scene.add.line(x, 0, 0, 0, 0, 540, colors.grid, x % 320 === 0 ? 0.2 : 0.08).setDepth(-40);
  }
  for (let y = 60; y <= 540; y += 60) {
    scene.add.line(0, y, 0, 0, 1920, 0, colors.grid, y % 180 === 0 ? 0.16 : 0.06).setDepth(-40);
  }
  scene.add.rectangle(960, 520, 1920, 40, colors.accent, 0.18).setDepth(-35);
  scene.add.text(22, 18, title, {
    fontFamily: 'monospace',
    fontSize: '18px',
    color: '#7cffd8',
    stroke: '#020b12',
    strokeThickness: 3
  }).setScrollFactor(0).setDepth(100);
}

export function addSpecialPlatform(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.StaticGroup,
  x: number,
  y: number,
  width: number
): Phaser.Physics.Arcade.Sprite {
  const platform = group.create(x, y, 'platform') as Phaser.Physics.Arcade.Sprite;
  platform.setDisplaySize(width, 16).refreshBody().setVisible(false);
  if (scene.textures.exists('mgs1VrEnvPropPlatformTile')) {
    scene.add.tileSprite(x, y, width, 16, 'mgs1VrEnvPropPlatformTile').setDepth(-1);
  } else {
    scene.add.rectangle(x, y, width, 16, 0x1d8f72).setDepth(-1);
  }
  return platform;
}
