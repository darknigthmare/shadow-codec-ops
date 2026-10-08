/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGS4_SIDEOPS_ALL_ASSETS,
  MGS4_SIDEOPS_BOSS_ASSETS,
  MGS4_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MGS4_SIDEOPS_ENEMY_ASSETS,
  MGS4_SIDEOPS_PROJECTILE_ASSETS,
  MGS4_SIDEOPS_PROP_ASSETS,
  MGS4_SIDEOPS_RUNTIME_TEXTURES,
  MGS4_SIDEOPS_VFX_ASSETS
} from './mgs4SideOpsAssetRegistry';

const expectedFiles = [
  ['pmc-soldier.png', 32, 48],
  ['pmc-heavy-reinforcement.png', 40, 56],
  ['gekko.png', 112, 96],
  ['pmc-tracer.png', 24, 8],
  ['metal-impact.png', 96, 24],
  ['drum-can.png', 32, 48]
] as const;

describe('MGS4 Side Ops asset registry', () => {
  it('covers the requested playable MGS4 asset families', () => {
    expect(MGS4_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(MGS4_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(MGS4_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(MGS4_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(MGS4_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(MGS4_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and source path unique', () => {
    expect(new Set(MGS4_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(MGS4_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MGS4_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(MGS4_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MGS4_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(MGS4_SIDEOPS_ALL_ASSETS.length);
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      MGS4_SIDEOPS_ALL_ASSETS.map((asset) => [basename(asset.path), asset.width, asset.height])
    ).toEqual(expectedFiles);
  });

  it('uses only local MGS4 asset paths and valid dimensions', () => {
    for (const asset of MGS4_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(/^\/sideops\/mgs4\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the metal impact as four exact horizontal frames', () => {
    const [impact] = MGS4_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MGS4_SIDEOPS_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });

  it('exposes stable MGS4 defaults for the Side Ops resolver and scene', () => {
    expect(MGS4_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mgs4PmcSoldier',
      reinforcementTexture: 'mgs4PmcHeavyReinforcement',
      bossTexture: 'mgs4Gekko'
    });
    expect(MGS4_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerOldSnakeMgs4',
      guardTexture: 'mgs4PmcSoldier',
      reinforcementTexture: 'mgs4PmcHeavyReinforcement',
      bossTexture: 'mgs4Gekko',
      enemyProjectileTexture: 'mgs4PmcTracer',
      impactVfxTexture: 'mgs4MetalImpactVfx',
      battlefieldPropTexture: 'mgs4DrumCan'
    });

    const keys = new Set(MGS4_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      MGS4_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      MGS4_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      MGS4_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      MGS4_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      MGS4_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      MGS4_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
