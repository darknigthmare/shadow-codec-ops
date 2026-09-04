/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGS3_SIDEOPS_ALL_ASSETS,
  MGS3_SIDEOPS_BOSS_ASSETS,
  MGS3_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MGS3_SIDEOPS_ENEMY_ASSETS,
  MGS3_SIDEOPS_PROJECTILE_ASSETS,
  MGS3_SIDEOPS_PROP_ASSETS,
  MGS3_SIDEOPS_RUNTIME_TEXTURES,
  MGS3_SIDEOPS_VFX_ASSETS
} from './mgs3SideOpsAssetRegistry';

const expectedFiles = [
  ['ocelot-unit-soldier.png', 32, 48],
  ['gru-heavy-reinforcement.png', 40, 56],
  ['shagohod.png', 160, 96],
  ['gru-tracer.png', 24, 8],
  ['fortress-impact.png', 96, 24],
  ['groznyj-searchlight.png', 48, 56]
] as const;

const expectedSourceFiles = [
  'mgs3-ocelot-unit-soldier-openai.png',
  'mgs3-gru-heavy-reinforcement-openai.png',
  'mgs3-shagohod-openai.png',
  'mgs3-gru-tracer-openai.png',
  'mgs3-fortress-impact-vfx-openai.png',
  'mgs3-groznyj-searchlight-openai.png'
] as const;

describe('MGS3 Side Ops asset registry', () => {
  it('covers all six requested MGS3 asset families', () => {
    expect(MGS3_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(MGS3_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(MGS3_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(MGS3_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(MGS3_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(MGS3_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    expect(new Set(MGS3_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(MGS3_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MGS3_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(MGS3_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MGS3_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(MGS3_SIDEOPS_ALL_ASSETS.length);
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      MGS3_SIDEOPS_ALL_ASSETS.map((asset) => [basename(asset.path), asset.width, asset.height])
    ).toEqual(expectedFiles);
  });

  it('uses only local MGS3 paths and valid fallback colors', () => {
    for (const asset of MGS3_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(/^\/sideops\/mgs3\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the fortress impact as four exact horizontal frames', () => {
    const [impact] = MGS3_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MGS3_SIDEOPS_ALL_ASSETS) {
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
      const absolutePath = resolve(process.cwd(), 'scripts', 'art_sources', 'mgs3-sideops', filename);
      expect(readFileSync(absolutePath).subarray(0, 8), absolutePath).toEqual(pngSignature);
    }
  });

  it('exposes stable MGS3 defaults for the future Side Ops wiring', () => {
    expect(MGS3_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mgs3OcelotUnitSoldier',
      reinforcementTexture: 'mgs3GruHeavyReinforcement',
      bossTexture: 'mgs3Shagohod'
    });
    expect(MGS3_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerNakedSnakeMgs3',
      guardTexture: 'mgs3OcelotUnitSoldier',
      reinforcementTexture: 'mgs3GruHeavyReinforcement',
      bossTexture: 'mgs3Shagohod',
      enemyProjectileTexture: 'mgs3GruTracer',
      impactVfxTexture: 'mgs3FortressImpactVfx',
      battlefieldPropTexture: 'mgs3GroznyjSearchlight'
    });

    const keys = new Set(MGS3_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      MGS3_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      MGS3_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      MGS3_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      MGS3_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      MGS3_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      MGS3_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
