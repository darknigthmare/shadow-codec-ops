/// <reference types="node" />
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSideOpsTerrainAsset, SIDEOPS_TERRAIN_ASSETS, SIDEOPS_TERRAIN_COVER_TEXTURES } from './sideOpsTerrainRegistry';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from './sideOpsVisualPackRuntime';
import { MG1_SIDEOPS_ALL_ASSETS } from './mg1SideOpsAssetRegistry';
import { MGS1_SIDEOPS_ALL_ASSETS } from './mgs1SideOpsAssetRegistry';
import { MGS4_SIDEOPS_ALL_ASSETS } from './mgs4SideOpsAssetRegistry';
import { PATRIOTS_AI_SIDEOPS_ALL_ASSETS } from './patriotsAiSideOpsAssetRegistry';
import { MGS1_VR_ALL_ASSETS } from './mgs1VrEnvironmentRegistry';

describe('Side Ops original terrain material assets', () => {
  it('gives all twelve packs a ground and a separate structural material', () => {
    expect(SIDEOPS_TERRAIN_ASSETS).toHaveLength(24);
    expect(new Set(SIDEOPS_TERRAIN_ASSETS.map((asset) => asset.textureKey)).size).toBe(24);
    expect(new Set(SIDEOPS_TERRAIN_ASSETS.map((asset) => asset.path)).size).toBe(24);
    expect([...new Set(SIDEOPS_TERRAIN_ASSETS.map((asset) => asset.packId))].sort()).toEqual(Object.keys(SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES).sort());
    for (const asset of SIDEOPS_TERRAIN_ASSETS) expect(getSideOpsTerrainAsset(asset.packId, asset.kind)).toBe(asset);
  });

  it('ships every material at native tile dimensions with matching source provenance', () => {
    const provenance = JSON.parse(readFileSync(resolve('public/sideops/terrain/provenance.json'), 'utf8'));
    expect(provenance.grid).toEqual([4, 3]);
    expect(provenance.tiles).toHaveLength(24);
    const hashes = new Set<string>();
    for (const asset of SIDEOPS_TERRAIN_ASSETS) {
      const png = readFileSync(resolve('public', asset.path.slice(1)));
      expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([asset.width, asset.height]);
      expect([png[24], png[25]]).toEqual([8, 2]);
      const sha = createHash('sha256').update(png).digest('hex');
      hashes.add(sha);
      const record = provenance.tiles.find((item: { path: string }) => item.path === asset.path);
      expect(record.sha256).toBe(sha);
      expect(record.width).toBe(asset.width);
      expect(record.height).toBe(asset.height);
      expect(record.edgeMeanDifference).toBeLessThan(20);
      const source = provenance.sources[asset.kind];
      expect(record.crop[0]).toBeGreaterThanOrEqual(0);
      expect(record.crop[1]).toBeGreaterThanOrEqual(0);
      expect(record.crop[2]).toBeLessThanOrEqual(source.width);
      expect(record.crop[3]).toBeLessThanOrEqual(source.height);
    }
    expect(hashes.size).toBe(24);
    for (const source of Object.values(provenance.sources) as Array<{ path: string; sha256: string }>) {
      const sourceBytes = readFileSync(resolve(source.path));
      expect(createHash('sha256').update(sourceBytes).digest('hex')).toBe(source.sha256);
    }
  });

  it('reuses only registered supplied artwork for all replacement cover props', () => {
    const loadedKeys = new Set([
      ...MG1_SIDEOPS_ALL_ASSETS, ...MGS1_SIDEOPS_ALL_ASSETS, ...MGS4_SIDEOPS_ALL_ASSETS,
      ...PATRIOTS_AI_SIDEOPS_ALL_ASSETS, ...MGS1_VR_ALL_ASSETS
    ].map((asset) => asset.textureKey));
    for (const key of Object.values(SIDEOPS_TERRAIN_COVER_TEXTURES)) expect(loadedKeys.has(key), key).toBe(true);
  });
});
