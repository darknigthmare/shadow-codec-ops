/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  PEACE_WALKER_SIDEOPS_ALL_ASSETS,
  PEACE_WALKER_SIDEOPS_BOSS_ASSETS,
  PEACE_WALKER_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  PEACE_WALKER_SIDEOPS_ENEMY_ASSETS,
  PEACE_WALKER_SIDEOPS_PROJECTILE_ASSETS,
  PEACE_WALKER_SIDEOPS_PROP_ASSETS,
  PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES,
  PEACE_WALKER_SIDEOPS_VFX_ASSETS
} from './peaceWalkerSideOpsAssetRegistry';

const expectedFiles = [
  ['peace-sentinel-soldier.png', 32, 48],
  ['peace-sentinel-heavy-reinforcement.png', 40, 56],
  ['pupa.png', 128, 80],
  ['chrysalis.png', 176, 112],
  ['cocoon.png', 208, 144],
  ['peace-walker.png', 176, 128],
  ['metal-gear-zeke.png', 128, 144],
  ['peace-sentinel-tracer.png', 24, 8],
  ['metal-impact.png', 96, 24],
  ['mother-base-life-ring.png', 48, 48]
] as const;

const expectedSourceFiles = [
  'pw-peace-sentinel-soldier-openai.png',
  'pw-peace-sentinel-heavy-openai.png',
  'pw-pupa-openai.png',
  'pw-peace-sentinel-tracer-openai.png',
  'pw-metal-impact-vfx-openai.png',
  'pw-mother-base-life-ring-openai.png'
] as const;

describe('Peace Walker Side Ops asset registry', () => {
  it('covers the 1974 roster including five distinct heavy machines', () => {
    expect(PEACE_WALKER_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(PEACE_WALKER_SIDEOPS_BOSS_ASSETS).toHaveLength(5);
    expect(PEACE_WALKER_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(PEACE_WALKER_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(PEACE_WALKER_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(PEACE_WALKER_SIDEOPS_ALL_ASSETS).toHaveLength(10);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    expect(new Set(PEACE_WALKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size)
      .toBe(PEACE_WALKER_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(PEACE_WALKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size)
      .toBe(PEACE_WALKER_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(PEACE_WALKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size)
      .toBe(PEACE_WALKER_SIDEOPS_ALL_ASSETS.length);
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      PEACE_WALKER_SIDEOPS_ALL_ASSETS.map((asset) => [basename(asset.path), asset.width, asset.height])
    ).toEqual(expectedFiles);
  });

  it('uses only local Peace Walker paths and valid fallback colors', () => {
    for (const asset of PEACE_WALKER_SIDEOPS_ALL_ASSETS) {
      expect(asset.path)
        .toMatch(/^\/sideops\/peace_walker\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the metal impact as four exact horizontal frames', () => {
    const [impact] = PEACE_WALKER_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of PEACE_WALKER_SIDEOPS_ALL_ASSETS) {
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
        'peace-walker-sideops',
        filename
      );
      expect(readFileSync(absolutePath).subarray(0, 8), absolutePath).toEqual(pngSignature);
    }
  });

  it('exposes stable defaults for future Peace Walker resolver wiring', () => {
    expect(PEACE_WALKER_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'peaceWalkerPeaceSentinelSoldier',
      reinforcementTexture: 'peaceWalkerPeaceSentinelHeavyReinforcement',
      bossTexture: 'peaceWalkerPupa'
    });
    expect(PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerBigBossPeaceWalker',
      guardTexture: 'peaceWalkerPeaceSentinelSoldier',
      reinforcementTexture: 'peaceWalkerPeaceSentinelHeavyReinforcement',
      bossTexture: 'peaceWalkerPupa',
      enemyProjectileTexture: 'peaceWalkerPeaceSentinelTracer',
      impactVfxTexture: 'peaceWalkerMetalImpactVfx',
      battlefieldPropTexture: 'peaceWalkerMotherBaseLifeRing'
    });

    const keys = new Set(PEACE_WALKER_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      PEACE_WALKER_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
