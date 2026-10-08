/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGS2_TANKER_SIDEOPS_ALL_ASSETS,
  MGS2_TANKER_SIDEOPS_BOSS_ASSETS,
  MGS2_TANKER_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MGS2_TANKER_SIDEOPS_ENEMY_ASSETS,
  MGS2_TANKER_SIDEOPS_PROJECTILE_ASSETS,
  MGS2_TANKER_SIDEOPS_PROP_ASSETS,
  MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES,
  MGS2_TANKER_SIDEOPS_VFX_ASSETS
} from './mgs2TankerSideOpsAssetRegistry';

const expectedFiles = [
  ['gurlukovich-guard.png', 32, 48],
  ['gurlukovich-heavy-reinforcement.png', 40, 56],
  ['olga-gurlukovich.png', 48, 64],
  ['aks74u-tracer.png', 24, 8],
  ['rain-metal-impact.png', 96, 24],
  ['ray-camera.png', 48, 40]
] as const;

const expectedSourceFiles = [
  'mgs2-tanker-gurlukovich-guard-openai.png',
  'mgs2-tanker-gurlukovich-heavy-reinforcement-openai.png',
  'mgs2-tanker-olga-gurlukovich-openai.png',
  'mgs2-tanker-aks74u-tracer-openai.png',
  'mgs2-tanker-rain-metal-impact-vfx-openai.png',
  'mgs2-tanker-ray-camera-openai.png'
] as const;

describe('MGS2 Tanker Side Ops asset registry', () => {
  it('covers all six requested Tanker asset families', () => {
    expect(MGS2_TANKER_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(MGS2_TANKER_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(MGS2_TANKER_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(MGS2_TANKER_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(MGS2_TANKER_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(MGS2_TANKER_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    expect(new Set(MGS2_TANKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(
      MGS2_TANKER_SIDEOPS_ALL_ASSETS.length
    );
    expect(new Set(MGS2_TANKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(
      MGS2_TANKER_SIDEOPS_ALL_ASSETS.length
    );
    expect(new Set(MGS2_TANKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(
      MGS2_TANKER_SIDEOPS_ALL_ASSETS.length
    );
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      MGS2_TANKER_SIDEOPS_ALL_ASSETS.map((asset) => [
        basename(asset.path),
        asset.width,
        asset.height
      ])
    ).toEqual(expectedFiles);
  });

  it('uses only local MGS2 Tanker paths and valid fallback colors', () => {
    for (const asset of MGS2_TANKER_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(
        /^\/sideops\/mgs2_tanker\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/
      );
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the rain-metal impact as four exact horizontal frames', () => {
    const [impact] = MGS2_TANKER_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MGS2_TANKER_SIDEOPS_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });

  it('keeps the six original OpenAI source PNGs in the art-source folder', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const filename of expectedSourceFiles) {
      const absolutePath = resolve(
        process.cwd(),
        'scripts',
        'art_sources',
        'mgs2-tanker-sideops',
        filename
      );
      expect(readFileSync(absolutePath).subarray(0, 8), absolutePath).toEqual(pngSignature);
    }
  });

  it('exposes stable MGS2 Tanker defaults for future Side Ops wiring', () => {
    expect(MGS2_TANKER_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mgs2TankerGurlukovichGuard',
      reinforcementTexture: 'mgs2TankerGurlukovichHeavyReinforcement',
      bossTexture: 'mgs2TankerOlgaGurlukovich'
    });
    expect(MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerTanker',
      guardTexture: 'mgs2TankerGurlukovichGuard',
      reinforcementTexture: 'mgs2TankerGurlukovichHeavyReinforcement',
      bossTexture: 'mgs2TankerOlgaGurlukovich',
      enemyProjectileTexture: 'mgs2TankerAks74uTracer',
      impactVfxTexture: 'mgs2TankerRainMetalImpactVfx',
      battlefieldPropTexture: 'mgs2TankerRayCamera'
    });

    const keys = new Set(MGS2_TANKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      MGS2_TANKER_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
