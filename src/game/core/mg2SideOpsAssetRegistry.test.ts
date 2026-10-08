/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MG2_SIDEOPS_ALL_ASSETS,
  MG2_SIDEOPS_BOSS_ASSETS,
  MG2_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MG2_SIDEOPS_ENEMY_ASSETS,
  MG2_SIDEOPS_PROJECTILE_ASSETS,
  MG2_SIDEOPS_PROP_ASSETS,
  MG2_SIDEOPS_RUNTIME_TEXTURES,
  MG2_SIDEOPS_VFX_ASSETS
} from './mg2SideOpsAssetRegistry';

const expectedFiles = [
  ['zanzibar-soldier.png', 32, 48],
  ['zanzibar-elite-reinforcement.png', 40, 56],
  ['metal-gear-d.png', 112, 112],
  ['enemy-tracer.png', 24, 8],
  ['metal-impact.png', 96, 24],
  ['oilix-culture-tank.png', 40, 48]
] as const;

const expectedSourceFiles = [
  'mg2-zanzibar-soldier-openai.png',
  'mg2-zanzibar-elite-openai.png',
  'mg2-metal-gear-d-openai.png',
  'mg2-enemy-tracer-openai.png',
  'mg2-metal-impact-vfx-openai.png',
  'mg2-oilix-culture-tank-openai.png'
] as const;

describe('MG2 Side Ops asset registry', () => {
  it('covers all six requested Zanzibar Land asset families', () => {
    expect(MG2_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(MG2_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(MG2_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(MG2_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(MG2_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(MG2_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    expect(new Set(MG2_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(MG2_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MG2_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(MG2_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MG2_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(MG2_SIDEOPS_ALL_ASSETS.length);
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      MG2_SIDEOPS_ALL_ASSETS.map((asset) => [basename(asset.path), asset.width, asset.height])
    ).toEqual(expectedFiles);
  });

  it('uses only local MG2 paths and valid fallback colors', () => {
    for (const asset of MG2_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(/^\/sideops\/mg2\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the metal impact as four exact horizontal frames', () => {
    const [impact] = MG2_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MG2_SIDEOPS_ALL_ASSETS) {
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
      const absolutePath = resolve(process.cwd(), 'scripts', 'art_sources', 'mg2-sideops', filename);
      expect(readFileSync(absolutePath).subarray(0, 8), absolutePath).toEqual(pngSignature);
    }
  });

  it('exposes stable MG2 defaults for the future Side Ops resolver wiring', () => {
    expect(MG2_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mg2ZanzibarSoldier',
      reinforcementTexture: 'mg2ZanzibarEliteReinforcement',
      bossTexture: 'mg2MetalGearD'
    });
    expect(MG2_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerSolidSnakeMg2',
      guardTexture: 'mg2ZanzibarSoldier',
      reinforcementTexture: 'mg2ZanzibarEliteReinforcement',
      bossTexture: 'mg2MetalGearD',
      enemyProjectileTexture: 'mg2EnemyTracer',
      impactVfxTexture: 'mg2MetalImpactVfx',
      battlefieldPropTexture: 'mg2OilixCultureTank'
    });

    const keys = new Set(MG2_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      MG2_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      MG2_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      MG2_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      MG2_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      MG2_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      MG2_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
