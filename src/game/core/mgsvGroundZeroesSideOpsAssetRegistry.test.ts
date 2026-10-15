/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS,
  MGSV_GROUND_ZEROES_SIDEOPS_BOSS_ASSETS,
  MGSV_GROUND_ZEROES_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MGSV_GROUND_ZEROES_SIDEOPS_ENEMY_ASSETS,
  MGSV_GROUND_ZEROES_SIDEOPS_PROJECTILE_ASSETS,
  MGSV_GROUND_ZEROES_SIDEOPS_PROP_ASSETS,
  MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES,
  MGSV_GROUND_ZEROES_SIDEOPS_VFX_ASSETS
} from './mgsvGroundZeroesSideOpsAssetRegistry';

const expectedFiles = [
  ['xof-guard.png', 32, 48],
  ['xof-heavy-reinforcement.png', 40, 56],
  ['stout-ifv-sc.png', 144, 72],
  ['xof-rifle-tracer.png', 24, 8],
  ['wet-metal-impact.png', 96, 24],
  ['camp-omega-watchtower.png', 56, 64]
] as const;

const expectedSourceFiles = [
  'mgsv-gz-xof-guard-openai.png',
  'mgsv-gz-xof-heavy-reinforcement-openai.png',
  'mgsv-gz-stout-ifv-sc-openai.png',
  'mgsv-gz-xof-rifle-tracer-openai.png',
  'mgsv-gz-wet-metal-impact-vfx-openai.png',
  'mgsv-gz-camp-omega-watchtower-openai.png'
] as const;

describe('MGSV Ground Zeroes Side Ops asset registry', () => {
  it('covers all six requested Camp Omega asset families', () => {
    expect(MGSV_GROUND_ZEROES_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(MGSV_GROUND_ZEROES_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(MGSV_GROUND_ZEROES_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(MGSV_GROUND_ZEROES_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(MGSV_GROUND_ZEROES_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    expect(new Set(MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(
      MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.length
    );
    expect(new Set(MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(
      MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.length
    );
    expect(new Set(MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(
      MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.length
    );
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.map((asset) => [
        basename(asset.path),
        asset.width,
        asset.height
      ])
    ).toEqual(expectedFiles);
  });

  it('uses only local Ground Zeroes asset paths and valid fallback colors', () => {
    for (const asset of MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(
        /^\/sideops\/mgsv_ground_zeroes\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/
      );
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the wet metal impact as four exact horizontal frames', () => {
    const [impact] = MGSV_GROUND_ZEROES_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });

  it('keeps all six original OpenAI source PNGs in the art-source folder', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const filename of expectedSourceFiles) {
      const absolutePath = resolve(
        process.cwd(),
        'scripts',
        'art_sources',
        'mgsv-gz-sideops',
        filename
      );
      expect(readFileSync(absolutePath).subarray(0, 8), absolutePath).toEqual(pngSignature);
    }
  });

  it('exposes a complete stable texture-key contract without shared wiring', () => {
    expect(MGSV_GROUND_ZEROES_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mgsvGzXofGuard',
      reinforcementTexture: 'mgsvGzXofHeavyReinforcement',
      bossTexture: 'mgsvGzStoutIfvSc'
    });
    expect(MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerBigBossGroundZeroes',
      guardTexture: 'mgsvGzXofGuard',
      reinforcementTexture: 'mgsvGzXofHeavyReinforcement',
      bossTexture: 'mgsvGzStoutIfvSc',
      enemyProjectileTexture: 'mgsvGzXofRifleTracer',
      impactVfxTexture: 'mgsvGzWetMetalImpactVfx',
      battlefieldPropTexture: 'mgsvGzCampOmegaWatchtower'
    });

    const keys = new Set(MGSV_GROUND_ZEROES_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      MGSV_GROUND_ZEROES_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
