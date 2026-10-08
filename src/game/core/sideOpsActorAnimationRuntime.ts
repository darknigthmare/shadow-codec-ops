import Phaser from 'phaser';
import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';
import {
  getSideOpsActorAnimation,
  SIDEOPS_ACTOR_ANIMATION_CLIPS,
  type SideOpsActorAnimationClip,
  type SideOpsActorAnimationState,
  type SideOpsActorRole
} from './sideOpsActorAnimationRegistry';

export function registerAuthoredSideOpsActorAnimations(scene: Phaser.Scene): void {
  for (const clip of SIDEOPS_ACTOR_ANIMATION_CLIPS) {
    if (!scene.textures.exists(clip.textureKey) || scene.anims.exists(clip.key)) continue;
    scene.anims.create({
      key: clip.key,
      frames: scene.anims.generateFrameNumbers(clip.textureKey, { start: clip.start, end: clip.end }),
      frameRate: clip.frameRate,
      repeat: clip.repeat
    });
  }
}

/** Keeps original world-space collision sizes when the art moves to 128px cells. */
export function configureAuthoredSideOpsActor(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  pack: SideOpsVisualPackId,
  role: SideOpsActorRole,
  bodyWidth = 32,
  bodyHeight = 48
): boolean {
  const clip = getSideOpsActorAnimation(pack, role, 'idle');
  const combat = getSideOpsActorAnimation(pack, role, 'attack');
  if (!scene.textures.exists(clip.textureKey) || !scene.textures.exists(combat.textureKey)) return false;
  sprite.setData('sideopsAuthoredPack', pack).setData('sideopsAuthoredRole', role);
  sprite.setTexture(clip.textureKey, clip.start).setScale(0.5);
  const body = (sprite as Phaser.Physics.Arcade.Sprite).body;
  if (body) {
    const width = bodyWidth / 0.5;
    const height = bodyHeight / 0.5;
    body.setSize(width, height, false);
    body.setOffset((128 - width) / 2, 120 - height);
    if (body instanceof Phaser.Physics.Arcade.StaticBody) body.updateFromGameObject();
  }
  return true;
}

export function getAuthoredSideOpsActorClip(
  sprite: Phaser.GameObjects.Sprite,
  state: string
): SideOpsActorAnimationClip | undefined {
  const pack = sprite.getData('sideopsAuthoredPack') as SideOpsVisualPackId | undefined;
  const role = sprite.getData('sideopsAuthoredRole') as SideOpsActorRole | undefined;
  if (!pack || !role) return undefined;
  const aliases: Record<string, SideOpsActorAnimationState> = {
    idle: 'idle', move: 'move', crouch: 'crouch', jump: 'jump',
    attack: 'attack', melee: 'melee', hit: 'hit', death: 'death',
    // MG1 dedicated interactions use the authored low-profile stance.
    remote: 'crouch', plant: 'crouch'
  };
  return getSideOpsActorAnimation(pack, role, aliases[state] ?? 'idle');
}
