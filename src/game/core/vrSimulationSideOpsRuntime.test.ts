/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { MGS1_VR_ALL_ASSETS } from './mgs1VrEnvironmentRegistry';
import { MGS1_VR_GAMEPLAY_ALL_ASSETS } from './mgs1VrGameplayAssetRegistry';
import {
  VR_SIMULATION_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES
} from './vrSimulationSideOpsRuntime';

const reusedRuntimeFiles = [
  ['/vr/characters/vr-operator.png', 32, 48],
  ['/vr/characters/vr-guard.png', 32, 48],
  ['/vr/characters/vr-armored-captain.png', 48, 64],
  ['/vr/mgs1/gameplay/projectiles/famas-tracer.png', 16, 4],
  ['/vr/mgs1/gameplay/vfx/bullet-impact.png', 64, 16],
  ['/vr/mgs1/environment/props/data-crate.png', 40, 40]
] as const;

describe('VR Simulation Side Ops runtime', () => {
  it('uses the established VR actors and complete supplemental visual set', () => {
    expect(VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES).toEqual({
      playerTexture: 'vrPlayer',
      guardTexture: 'vrGuard',
      reinforcementTexture: 'vrGuard',
      bossTexture: 'vrBoss',
      enemyProjectileTexture: 'mgs1VrProjectileFamasTracer',
      impactVfxTexture: 'mgs1VrVfxBulletImpact',
      battlefieldPropTexture: 'mgs1VrEnvPropDataCrate'
    });
    expect(VR_SIMULATION_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'vrGuard',
      reinforcementTexture: 'vrGuard',
      bossTexture: 'vrBoss'
    });
  });

  it('points supplemental roles at registered MGS1 VR assets', () => {
    const textureKeys = new Set([
      ...MGS1_VR_ALL_ASSETS.map((asset) => asset.textureKey),
      ...MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => asset.textureKey)
    ]);
    expect(textureKeys.has(VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES.enemyProjectileTexture)).toBe(true);
    expect(textureKeys.has(VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES.impactVfxTexture)).toBe(true);
    expect(textureKeys.has(VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES.battlefieldPropTexture)).toBe(true);
  });

  it('ships the reused files at their exact registered dimensions', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const [publicPath, width, height] of reusedRuntimeFiles) {
      const png = readFileSync(resolve(process.cwd(), 'public', publicPath.replace(/^\//, '')));
      expect(png.subarray(0, 8), publicPath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), publicPath).toBe(width);
      expect(png.readUInt32BE(20), publicPath).toBe(height);
    }
  });
});
