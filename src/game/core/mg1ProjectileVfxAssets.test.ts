/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MG1_SIDEOPS_PROJECTILE_ASSETS,
  MG1_SIDEOPS_VFX_ASSETS
} from './mg1SideOpsAssetRegistry';

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const readPngHeader = (assetPath: string) => {
  const absolutePath = resolve(process.cwd(), 'public', assetPath.replace(/^\//, ''));
  const png = readFileSync(absolutePath);

  return {
    absolutePath,
    signature: png.subarray(0, 8),
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
    bitDepth: png[24],
    colorType: png[25]
  };
};

describe('MG1 deterministic projectile and VFX artwork', () => {
  it('registers a dedicated gun-camera laser and four-frame impact sheet', () => {
    expect(MG1_SIDEOPS_PROJECTILE_ASSETS).toContainEqual(expect.objectContaining({
      textureKey: 'mg1GunCameraLaser',
      path: '/sideops/mg1/projectiles/gun-camera-laser.png',
      width: 24,
      height: 5
    }));
    expect(MG1_SIDEOPS_VFX_ASSETS).toContainEqual(expect.objectContaining({
      textureKey: 'mg1LaserImpactVfx',
      path: '/sideops/mg1/vfx/laser-impact.png',
      width: 64,
      height: 16,
      frameCount: 4
    }));
  });

  it('ships every registered PNG at its exact runtime dimensions', () => {
    for (const asset of [...MG1_SIDEOPS_PROJECTILE_ASSETS, ...MG1_SIDEOPS_VFX_ASSETS]) {
      const header = readPngHeader(asset.path);

      expect(header.signature, header.absolutePath).toEqual(PNG_SIGNATURE);
      expect(header.width, header.absolutePath).toBe(asset.width);
      expect(header.height, header.absolutePath).toBe(asset.height);
    }
  });

  it('keeps the full pack in lossless 8-bit RGBA for clean transparent pixels', () => {
    for (const asset of [...MG1_SIDEOPS_PROJECTILE_ASSETS, ...MG1_SIDEOPS_VFX_ASSETS]) {
      const header = readPngHeader(asset.path);

      expect(header.bitDepth, header.absolutePath).toBe(8);
      expect(header.colorType, header.absolutePath).toBe(6);
    }
  });
});
