import Phaser from 'phaser';
import {
  getSideOpsSpecialActorAnimation,
  getSideOpsSpecialActorDefinition,
  getSideOpsSpecialActorGeometry,
  SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS,
  type SideOpsSpecialActorAnimationClip
} from './sideOpsSpecialActorAnimationRegistry';

export function registerAuthoredSideOpsSpecialActorAnimations(scene: Phaser.Scene): void {
  for (const clip of SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS) {
    if (!scene.textures.exists(clip.textureKey) || scene.anims.exists(clip.key)) continue;
    scene.anims.create({
      key: clip.key,
      frames: scene.anims.generateFrameNumbers(clip.textureKey, { start: clip.start, end: clip.end }),
      frameRate: clip.frameRate,
      repeat: clip.repeat
    });
  }
}

/** Returns false without mutation until BOTH authored sheets have loaded. */
export function configureAuthoredSideOpsSpecialActor(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  sourceTextureKey: string
): boolean {
  const actor = getSideOpsSpecialActorDefinition(sourceTextureKey);
  const idle = getSideOpsSpecialActorAnimation(sourceTextureKey, 'idle');
  if (!actor || !idle || !['core', 'special'].every((board) => scene.textures.exists(`sideops-special:${actor.id}:${board}`))) return false;
  const body = (sprite as Phaser.Physics.Arcade.Sprite).body;
  const isStatic = body instanceof Phaser.Physics.Arcade.StaticBody;
  // Dynamic bodies may not yet reflect a scene's display scale. Never use the
  // equivalent static refresh here: it would erase an intentional custom size.
  if (body && !isStatic) body.updateFromGameObject();
  const worldWidth = body?.width ?? actor.bodyWidth * Math.abs(sprite.scaleX);
  const worldHeight = body?.height ?? actor.bodyHeight * Math.abs(sprite.scaleY);
  if (!(worldWidth > 0 && worldHeight > 0)) return false;
  const center = body ? { x: body.center.x, y: body.center.y } : null;
  const geometry = getSideOpsSpecialActorGeometry(actor, worldWidth, worldHeight);
  sprite.setData('sideopsSpecialSourceTexture', sourceTextureKey);
  sprite.setData('sideopsSpecialSourceFacingRight', actor.sourceFacing === 'right');
  sprite.setTexture(idle.textureKey, idle.start).setOrigin(geometry.originX, geometry.originY).setScale(geometry.scale);
  if (center) sprite.setPosition(center.x, center.y);
  if (body) {
    if (isStatic) {
      // StaticBody sizes are world pixels, unlike dynamic source-pixel sizes.
      body.setOffset(0, 0);
      body.updateFromGameObject();
      body.setSize(worldWidth, worldHeight, !actor.idleBounds);
      if (actor.idleBounds) body.setOffset(geometry.offsetX * geometry.scale, geometry.offsetY * geometry.scale);
    } else {
      body.setSize(geometry.width, geometry.height, false);
      body.setOffset(geometry.offsetX, geometry.offsetY);
      body.updateFromGameObject();
    }
  }
  return true;
}

/** Scene-owned priorities and timers decide when a supported clip can play. */
export function getAuthoredSideOpsSpecialActorClip(
  sprite: Phaser.GameObjects.Sprite,
  state: string
): SideOpsSpecialActorAnimationClip | undefined {
  const source = sprite.getData('sideopsSpecialSourceTexture');
  return typeof source === 'string' ? getSideOpsSpecialActorAnimation(source, state) : undefined;
}
