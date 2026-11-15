import Phaser from 'phaser';
import { ERA_CHARACTER_ARCHIVE, getArchiveAnimationClips, type EraCharacterArchiveEntry } from '../../systems/eraCharacterArchive';
import { getStorageKey } from '../../systems/saveEngine';
import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';
import { SIDEOPS_ACTOR_ANIMATION_SHEETS } from './sideOpsActorAnimationRegistry';
import { SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS, getSideOpsSpecialActorDefinition } from './sideOpsSpecialActorAnimationRegistry';
import { getArchiveInspectionScale, getArchiveInspectionState, resolveArchiveInspectionSelection, SIDEOPS_ARCHIVE_INSPECTION_KEY } from './sideOpsArchiveInspection';

const existingTextures = new Map([...SIDEOPS_ACTOR_ANIMATION_SHEETS, ...SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS].map(sheet => [sheet.path, sheet.textureKey]));
function textureKey(path: string): string { return existingTextures.get(path) ?? `sideops-archive-sheet:${path}`; }

/** Existing 32-pose boards are reused; only newly authored roster sheets add loads. */
export function preloadSideOpsArchiveSheets(scene: Phaser.Scene): void {
  const sheets = new Map(ERA_CHARACTER_ARCHIVE.flatMap(entry => getArchiveAnimationClips(entry)).map(clip => [clip.path, clip]));
  for (const [path, clip] of sheets) {
    if (existingTextures.has(path)) continue;
    scene.load.spritesheet(textureKey(path), path, { frameWidth: clip.frameSize, frameHeight: clip.frameSize, endFrame: 15 });
  }
}

export interface SideOpsArchiveInspection {
  readonly entry: EraCharacterArchiveEntry;
  readonly sprite: Phaser.GameObjects.Sprite;
  update(delta: number, playerX: number, alert: boolean): void;
}

/** No physics body or damage overlap: this opt-in specimen cannot alter mission results. */
export function createSideOpsArchiveInspection(scene: Phaser.Scene, pack: SideOpsVisualPackId, startX: number): SideOpsArchiveInspection | undefined {
  let raw: string | null = null;
  try { raw = window.localStorage.getItem(getStorageKey(SIDEOPS_ARCHIVE_INSPECTION_KEY)); } catch { return undefined; }
  const entry = resolveArchiveInspectionSelection(raw, pack);
  if (!entry) return undefined;
  const clips = getArchiveAnimationClips(entry);
  if (!clips.length || clips.some(clip => !scene.textures.exists(textureKey(clip.path)))) return undefined;
  for (const clip of clips) {
    const key = `sideops-archive:${entry.id}:${clip.state}`;
    if (!scene.anims.exists(key)) scene.anims.create({ key, frames: scene.anims.generateFrameNumbers(textureKey(clip.path), { start: clip.start, end: clip.end }), frameRate: clip.frameRate, repeat: -1 });
  }
  const idle = clips.find(clip => clip.state === 'idle') ?? clips[0];
  const key = textureKey(idle.path);
  // Measure actual alpha, not the square sheet padding, before placing the feet.
  let minX = idle.frameSize, minY = idle.frameSize, maxX = -1, maxY = -1;
  for (let y = 0; y < idle.frameSize; y += 1) for (let x = 0; x < idle.frameSize; x += 1) {
    if ((scene.textures.getPixelAlpha(x, y, key, idle.start) ?? 0) > 0) {
      minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
  }
  if (maxX < minX || maxY < minY) return undefined;
  const scale = getArchiveInspectionScale(entry, maxX - minX + 1, maxY - minY + 1);
  const anchorX = startX + 165;
  const sprite = scene.add.sprite(anchorX, 512, key, idle.start)
    .setOrigin((minX + maxX + 1) / 2 / idle.frameSize, (maxY + 1) / idle.frameSize)
    .setScale(scale).setDepth(12).setData('archiveInspectionId', entry.id);
  const facingRight = entry.animation.kind === 'roster' ? entry.animation.sourceFacing === 'right'
    : entry.animation.kind === 'special' ? getSideOpsSpecialActorDefinition(entry.animation.sourceTextureKey)?.sourceFacing !== 'left' : true;
  const label = scene.add.text(anchorX, 512 - (maxY - minY + 1) * scale - 20, `ARCHIVE : ${entry.name}`, { fontFamily: 'monospace', fontSize: '10px', color: '#85e6c1', backgroundColor: '#061d18' }).setOrigin(0.5).setDepth(14);
  // Keep inspection controls below the mission HUD and above actor silhouettes.
  const hint = scene.add.text(20, 136, 'SIMULATION D’ARCHIVE — non hostile · cliquer la pose ci-dessous', { fontFamily: 'monospace', fontSize: '10px', color: '#a9f7cf', backgroundColor: '#061d18' }).setScrollFactor(0).setDepth(80);
  let requested = 'idle';
  let explicit = false;
  let direction = 1;
  clips.forEach((clip, index) => {
    scene.add.text(20 + (index % 8) * 108, 154 + Math.floor(index / 8) * 18, clip.state, { fontFamily: 'monospace', fontSize: '11px', color: '#e0fff2', backgroundColor: '#164234', padding: { x: 5, y: 2 } })
      .setScrollFactor(0).setDepth(80).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { requested = clip.state; explicit = true; });
  });
  sprite.play(`sideops-archive:${entry.id}:${idle.state}`);
  return { entry, sprite, update(delta, playerX, alert) {
    if (!sprite.active) return;
    const selected = explicit ? requested : alert ? 'react' : Math.abs(playerX - sprite.x) < 85 ? 'interact' : 'idle';
    const state = getArchiveInspectionState(entry, selected);
    const animationKey = `sideops-archive:${entry.id}:${state}`;
    if (sprite.anims.currentAnim?.key !== animationKey) sprite.play(animationKey);
    if (state === 'move') {
      sprite.x += direction * Math.min(Math.max(delta, 0), 50) * 0.032;
      if (sprite.x > anchorX + 45) direction = -1;
      if (sprite.x < anchorX - 45) direction = 1;
      sprite.setFlipX((direction > 0) !== facingRight);
    }
    label.x = sprite.x;
    hint.setText(`SIMULATION D’ARCHIVE — ${entry.name} · ${state} · non hostile`);
    sprite.setData('archiveInspectionState', state);
  } };
}
