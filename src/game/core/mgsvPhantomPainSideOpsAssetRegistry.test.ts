/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS,
  MGSV_PHANTOM_PAIN_SIDEOPS_BOSS_ASSETS,
  MGSV_PHANTOM_PAIN_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MGSV_PHANTOM_PAIN_SIDEOPS_ENEMY_ASSETS,
  MGSV_PHANTOM_PAIN_SIDEOPS_PROJECTILE_ASSETS,
  MGSV_PHANTOM_PAIN_SIDEOPS_PROP_ASSETS,
  MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES,
  MGSV_PHANTOM_PAIN_SIDEOPS_VFX_ASSETS
} from './mgsvPhantomPainSideOpsAssetRegistry';

const expectedFiles = [
  ['soviet-afghanistan-soldier.png', 32, 48],
  ['skull-heavy-reinforcement.png', 40, 56],
  ['sahelanthropus.png', 144, 144],
  ['soviet-tracer.png', 24, 8],
  ['dust-impact.png', 96, 24],
  ['fulton-cargo.png', 48, 64]
] as const;

const expectedSourceFiles = [
  'mgsv-soviet-afghanistan-soldier-openai.png',
  'mgsv-skull-heavy-reinforcement-openai.png',
  'mgsv-sahelanthropus-openai.png',
  'mgsv-soviet-tracer-openai.png',
  'mgsv-dust-impact-vfx-openai.png',
  'mgsv-fulton-cargo-openai.png'
] as const;

describe('MGSV The Phantom Pain Side Ops asset registry', () => {
  it('covers all six requested MGSV The Phantom Pain asset families', () => {
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    expect(new Set(MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(
      MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.length
    );
    expect(new Set(MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(
      MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.length
    );
    expect(new Set(MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(
      MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.length
    );
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.map((asset) => [
        basename(asset.path),
        asset.width,
        asset.height
      ])
    ).toEqual(expectedFiles);
  });

  it('uses only local Phantom Pain paths and valid fallback colors', () => {
    for (const asset of MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(
        /^\/sideops\/mgsv_phantom_pain\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/
      );
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the Afghanistan dust impact as four exact horizontal frames', () => {
    const [impact] = MGSV_PHANTOM_PAIN_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships every runtime asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS) {
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
        'mgsv-tpp-sideops',
        filename
      );
      expect(readFileSync(absolutePath).subarray(0, 8), absolutePath).toEqual(pngSignature);
    }
  });

  it('exposes stable Phantom Pain defaults for future Side Ops wiring', () => {
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mgsvTppSovietAfghanistanSoldier',
      reinforcementTexture: 'mgsvTppSkullHeavyReinforcement',
      bossTexture: 'mgsvTppSahelanthropus'
    });
    expect(MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerVenomSnakeMgsv',
      guardTexture: 'mgsvTppSovietAfghanistanSoldier',
      reinforcementTexture: 'mgsvTppSkullHeavyReinforcement',
      bossTexture: 'mgsvTppSahelanthropus',
      enemyProjectileTexture: 'mgsvTppSovietTracer',
      impactVfxTexture: 'mgsvTppDustImpactVfx',
      battlefieldPropTexture: 'mgsvTppFultonCargo'
    });

    const keys = new Set(
      MGSV_PHANTOM_PAIN_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)
    );
    for (const key of [
      MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      MGSV_PHANTOM_PAIN_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
