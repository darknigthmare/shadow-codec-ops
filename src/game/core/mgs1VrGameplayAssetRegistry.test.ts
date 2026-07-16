/// <reference types="node" />

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGS1_VR_ACTOR_ASSETS,
  MGS1_VR_GAMEPLAY_ALL_ASSETS,
  MGS1_VR_PROJECTILE_ASSETS,
  MGS1_VR_STATIC_CHARACTER_ASSETS,
  MGS1_VR_VFX_ASSETS,
  MGS1_VR_WEAPON_ASSETS,
  collectMgs1VrGameplayAssets,
  getMgs1VrActorAnimationClip,
  getMgs1VrActorAnimationKey,
  getMgs1VrGameplayAssetById,
  getMgs1VrGameplayAssetByTexture,
  getMgs1VrVfxAnimationClip,
  getMgs1VrVfxAnimationKey
} from './mgs1VrGameplayAssetRegistry';

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

describe('MGS1 VR gameplay asset registry', () => {
  it('registers the complete 41-asset gameplay pack by category', () => {
    expect(MGS1_VR_ACTOR_ASSETS).toHaveLength(4);
    expect(MGS1_VR_STATIC_CHARACTER_ASSETS).toHaveLength(5);
    expect(MGS1_VR_WEAPON_ASSETS).toHaveLength(8);
    expect(MGS1_VR_PROJECTILE_ASSETS).toHaveLength(8);
    expect(MGS1_VR_VFX_ASSETS).toHaveLength(16);
    expect(MGS1_VR_GAMEPLAY_ALL_ASSETS).toHaveLength(41);
  });

  it('keeps ids, Phaser texture keys and local paths unique and scoped', () => {
    expect(new Set(MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => asset.id)).size).toBe(41);
    expect(new Set(MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(41);
    expect(new Set(MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => asset.path)).size).toBe(41);
    for (const asset of MGS1_VR_GAMEPLAY_ALL_ASSETS) {
      expect(asset.path.startsWith('/vr/mgs1/gameplay/'), asset.path).toBe(true);
      expect(asset.path.endsWith('.png'), asset.path).toBe(true);
    }
  });

  it('registers exact packed and per-frame dimensions', () => {
    for (const asset of MGS1_VR_GAMEPLAY_ALL_ASSETS) {
      expect(asset.width, asset.id).toBeGreaterThan(0);
      expect(asset.height, asset.id).toBeGreaterThan(0);
      if (asset.loader === 'spritesheet') {
        expect(asset.frameCount, asset.id).toBeGreaterThan(1);
        expect(asset.width, asset.id).toBe(asset.frameWidth * asset.frameCount);
        expect(asset.height, asset.id).toBe(asset.frameHeight);
      }
    }

    expect(MGS1_VR_ACTOR_ASSETS.map(({ frameWidth, frameHeight, frameCount }) => [frameWidth, frameHeight, frameCount])).toEqual([
      [48, 48, 23],
      [48, 48, 18],
      [64, 64, 23],
      [96, 96, 17]
    ]);
    expect(MGS1_VR_WEAPON_ASSETS.every((asset) => asset.width === 48 && asset.height === 28)).toBe(true);
  });

  it('keeps every actor and VFX clip inside its registered frame count', () => {
    for (const actor of MGS1_VR_ACTOR_ASSETS) {
      expect(Object.keys(actor.clips).length, actor.id).toBeGreaterThan(0);
      for (const clip of Object.values(actor.clips)) {
        expect(clip.start, actor.id).toBeGreaterThanOrEqual(0);
        expect(clip.end, actor.id).toBeGreaterThanOrEqual(clip.start);
        expect(clip.end, actor.id).toBeLessThan(actor.frameCount);
        expect(clip.frameRate, actor.id).toBeGreaterThan(0);
      }
    }
    for (const vfx of MGS1_VR_VFX_ASSETS) {
      expect(vfx.clip.start, vfx.id).toBe(0);
      expect(vfx.clip.end, vfx.id).toBe(vfx.frameCount - 1);
      expect(vfx.clip.frameRate, vfx.id).toBeGreaterThan(0);
    }
  });

  it('resolves assets and deterministic animation helpers', () => {
    for (const asset of MGS1_VR_GAMEPLAY_ALL_ASSETS) {
      expect(getMgs1VrGameplayAssetById(asset.id)).toBe(asset);
      expect(getMgs1VrGameplayAssetByTexture(asset.textureKey)).toBe(asset);
    }
    expect(getMgs1VrGameplayAssetById('unknown')).toBeUndefined();
    expect(getMgs1VrGameplayAssetByTexture('unknown')).toBeUndefined();

    expect(getMgs1VrActorAnimationKey('mgs1VrSolidSnake', 'move')).toBe('mgs1-vr:mgs1VrSolidSnake:move');
    expect(getMgs1VrActorAnimationClip('mgs1VrSolidSnake', 'move')).toEqual({ start: 2, end: 7, frameRate: 9, repeat: -1 });
    expect(getMgs1VrActorAnimationClip('unknown', 'idle')).toBeUndefined();
    expect(getMgs1VrVfxAnimationKey('mgs1VrVfxMuzzleFlash')).toBe('mgs1-vr:mgs1VrVfxMuzzleFlash:play');
    expect(getMgs1VrVfxAnimationClip('mgs1VrVfxMuzzleFlash')).toEqual({ start: 0, end: 3, frameRate: 16, repeat: 0 });
    expect(getMgs1VrVfxAnimationClip('unknown')).toBeUndefined();
  });

  it('collects unique preload entries while preserving source order', () => {
    const collected = collectMgs1VrGameplayAssets([
      ...MGS1_VR_GAMEPLAY_ALL_ASSETS,
      MGS1_VR_ACTOR_ASSETS[0],
      MGS1_VR_VFX_ASSETS[0]
    ]);
    expect(collected).toHaveLength(41);
    expect(collected).toEqual(MGS1_VR_GAMEPLAY_ALL_ASSETS);
  });

  it('matches exact PNG dimensions once the generated pack is present', () => {
    const paths = MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => ({
      asset,
      absolutePath: resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''))
    }));
    const existing = paths.filter(({ absolutePath }) => existsSync(absolutePath));
    if (existing.length === 0) return;

    expect(existing, 'The generated gameplay pack must be complete, not partial').toHaveLength(41);
    for (const { asset, absolutePath } of existing) {
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(PNG_SIGNATURE);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });
});
