/// <reference types="node" />

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SIDEOPS_VISUAL_PACK_IDS } from '../../systems/sideOpsCharacterResolver';
import {
  resolveSideOpsBackdropTexture,
  SIDEOPS_BACKDROP_TEXTURE_BY_PACK,
  SIDEOPS_GENERATED_BACKDROP_ASSETS
} from './sideOpsBackdropRegistry';

describe('Side Ops all-era backdrop registry', () => {
  it('covers every visual pack and reuses the dedicated VR matrix surface', () => {
    expect(Object.keys(SIDEOPS_BACKDROP_TEXTURE_BY_PACK).sort()).toEqual(
      [...SIDEOPS_VISUAL_PACK_IDS].sort()
    );
    expect(resolveSideOpsBackdropTexture('vr_simulation')).toBe('mgs1VrEnvTileMatrixVoid');
  });

  it('ships one unique OpenAI-generated runtime backdrop for every non-VR pack', () => {
    expect(SIDEOPS_GENERATED_BACKDROP_ASSETS).toHaveLength(11);
    expect(new Set(SIDEOPS_GENERATED_BACKDROP_ASSETS.map((asset) => asset.visualPackId)).size).toBe(11);
    expect(new Set(SIDEOPS_GENERATED_BACKDROP_ASSETS.map((asset) => asset.textureKey)).size).toBe(11);
    expect(new Set(SIDEOPS_GENERATED_BACKDROP_ASSETS.map((asset) => asset.path)).size).toBe(11);

    for (const asset of SIDEOPS_GENERATED_BACKDROP_ASSETS) {
      expect(asset.width).toBe(960);
      expect(asset.height).toBe(540);
      expect(asset.path).toMatch(/^\/sideops\/backdrops\/[a-z0-9-]+\.webp$/);
      expect(resolveSideOpsBackdropTexture(asset.visualPackId)).toBe(asset.textureKey);

      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      expect(existsSync(absolutePath), absolutePath).toBe(true);
      const file = readFileSync(absolutePath);
      expect(file.byteLength, absolutePath).toBeGreaterThan(10_000);
      expect(file.subarray(0, 4).toString('ascii'), absolutePath).toBe('RIFF');
      expect(file.subarray(8, 12).toString('ascii'), absolutePath).toBe('WEBP');
    }
  });

  it('preloads every generated panorama and renders the resolved pack texture without changing physics', () => {
    const preloadSource = readFileSync(
      resolve(process.cwd(), 'src/game/scenes/PreloadScene.ts'),
      'utf8'
    );
    const sceneSource = readFileSync(
      resolve(process.cwd(), 'src/game/scenes/SideOpsScene.ts'),
      'utf8'
    );

    expect(preloadSource).toContain('SIDEOPS_GENERATED_BACKDROP_ASSETS.forEach');
    expect(sceneSource).toContain('resolveSideOpsBackdropTexture(this.profile.visualPackId)');
    expect(sceneSource).toContain('this.add.image(0, 0, backdropTexture)');
    expect(sceneSource).toContain('.setScrollFactor(0)');
    const backdropMethod = sceneSource.slice(
      sceneSource.indexOf('private addSkyAndBackdrops'),
      sceneSource.indexOf('private addFixedHud')
    );
    expect(backdropMethod).not.toContain('this.physics');
    expect(backdropMethod).not.toContain('setInteractive');
  });
});
