/// <reference types="node" />

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  PATRIOTS_AI_SIDEOPS_ALL_ASSETS,
  PATRIOTS_AI_SIDEOPS_BOSS_ASSETS,
  PATRIOTS_AI_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  PATRIOTS_AI_SIDEOPS_ENEMY_ASSETS,
  PATRIOTS_AI_SIDEOPS_PROJECTILE_ASSETS,
  PATRIOTS_AI_SIDEOPS_PROP_ASSETS,
  PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES,
  PATRIOTS_AI_SIDEOPS_VFX_ASSETS
} from './patriotsAiSideOpsAssetRegistry';

const expectedFiles = [
  ['corrupted-arsenal-guard.png', 32, 48],
  ['corrupted-tengu-reinforcement.png', 40, 56],
  ['gw-colonel-ai-core.png', 128, 96],
  ['digital-pulse.png', 24, 8],
  ['glitch-impact.png', 96, 24],
  ['gw-terminal.png', 56, 56]
] as const;

const expectedSourceFiles = [
  'patriots-ai-corrupted-arsenal-guard-openai.png',
  'patriots-ai-corrupted-tengu-reinforcement-openai.png',
  'patriots-ai-gw-colonel-ai-core-openai.png',
  'patriots-ai-digital-pulse-openai.png',
  'patriots-ai-glitch-impact-vfx-openai.png',
  'patriots-ai-gw-terminal-openai.png'
] as const;

describe('Patriots AI Side Ops asset registry', () => {
  it('covers all six requested Arsenal simulation asset families', () => {
    expect(PATRIOTS_AI_SIDEOPS_ENEMY_ASSETS).toHaveLength(2);
    expect(PATRIOTS_AI_SIDEOPS_BOSS_ASSETS).toHaveLength(1);
    expect(PATRIOTS_AI_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(1);
    expect(PATRIOTS_AI_SIDEOPS_VFX_ASSETS).toHaveLength(1);
    expect(PATRIOTS_AI_SIDEOPS_PROP_ASSETS).toHaveLength(1);
    expect(PATRIOTS_AI_SIDEOPS_ALL_ASSETS).toHaveLength(6);
  });

  it('keeps every id, texture key and runtime path unique', () => {
    for (const field of ['id', 'textureKey', 'path'] as const) {
      expect(new Set(PATRIOTS_AI_SIDEOPS_ALL_ASSETS.map((asset) => asset[field])).size).toBe(
        PATRIOTS_AI_SIDEOPS_ALL_ASSETS.length
      );
    }
  });

  it('locks the physical roster and runtime dimensions', () => {
    expect(
      PATRIOTS_AI_SIDEOPS_ALL_ASSETS.map((asset) => [
        basename(asset.path),
        asset.width,
        asset.height
      ])
    ).toEqual(expectedFiles);
  });

  it('uses only local Patriots AI paths and valid fallback colors', () => {
    for (const asset of PATRIOTS_AI_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(
        /^\/sideops\/patriots_ai\/(enemies|bosses|projectiles|vfx|props)\/[a-z0-9-]+\.png$/
      );
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes the glitch impact as four exact horizontal frames', () => {
    const [impact] = PATRIOTS_AI_SIDEOPS_VFX_ASSETS;
    expect(impact.width).toBe(impact.frameWidth * impact.frameCount);
    expect(impact.height).toBe(impact.frameHeight);
    expect(impact.frameCount).toBe(4);
  });

  it('ships unique exact-size 8-bit RGBA runtime PNGs', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const hashes = new Set<string>();
    for (const asset of PATRIOTS_AI_SIDEOPS_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
      hashes.add(createHash('sha256').update(png).digest('hex'));
    }
    expect(hashes.size).toBe(PATRIOTS_AI_SIDEOPS_ALL_ASSETS.length);
  });

  it('keeps six unique original OpenAI source PNGs', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const hashes = new Set<string>();
    for (const filename of expectedSourceFiles) {
      const absolutePath = resolve(
        process.cwd(),
        'scripts',
        'art_sources',
        'patriots-ai-sideops',
        filename
      );
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      hashes.add(createHash('sha256').update(png).digest('hex'));
    }
    expect(hashes.size).toBe(expectedSourceFiles.length);
  });

  it('exposes the complete stable texture-key contract without shared wiring', () => {
    expect(PATRIOTS_AI_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'patriotsAiCorruptedArsenalGuard',
      reinforcementTexture: 'patriotsAiCorruptedTenguReinforcement',
      bossTexture: 'patriotsAiGwColonelAiCore'
    });
    expect(PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'playerRaidenMgs2',
      guardTexture: 'patriotsAiCorruptedArsenalGuard',
      reinforcementTexture: 'patriotsAiCorruptedTenguReinforcement',
      bossTexture: 'patriotsAiGwColonelAiCore',
      enemyProjectileTexture: 'patriotsAiDigitalPulse',
      impactVfxTexture: 'patriotsAiGlitchImpactVfx',
      battlefieldPropTexture: 'patriotsAiGwTerminal'
    });

    const keys = new Set(PATRIOTS_AI_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    for (const key of [
      PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
      PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
      PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.bossTexture,
      PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture,
      PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture,
      PATRIOTS_AI_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });
});
