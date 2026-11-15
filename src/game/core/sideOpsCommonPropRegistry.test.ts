import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SIDEOPS_COMMON_PROP_ASSETS, SIDEOPS_DEFERRED_PROP_ASSETS } from './sideOpsCommonPropRegistry';

const hash = (data: Buffer) => createHash('sha256').update(data).digest('hex');
const provenance = JSON.parse(readFileSync(resolve('scripts/art_sources/common-props/provenance.json'), 'utf8'));

describe('authored common SideOps props', () => {
  it('preserves the six accepted texture and collision dimensions', () => {
    expect(Object.fromEntries(SIDEOPS_COMMON_PROP_ASSETS.map((a) => [a.textureKey, [a.width, a.height]]))).toEqual({
      keycard: [14, 10], cameraNode: [30, 20],
      ration: [18, 12], ammoBox: [20, 12], chaffPickup: [16, 16], secretItem: [12, 12]
    });
    expect(new Set(SIDEOPS_COMMON_PROP_ASSETS.map((a) => a.path)).size).toBe(6);
  });

  it('retains the actual OpenAI board and original object provenance', () => {
    expect(provenance.generator).toBe('OpenAI built-in imagegen');
    expect(provenance.authoredObjects).toBe(8);
    expect(provenance.runtimeObjects).toBe(6);
    expect(provenance.synthesizedObjects).toBe(0);
    expect(hash(readFileSync(resolve(provenance.source)))).toBe(provenance.sourceSha256);
    expect(new Set(provenance.outputs.map((a: { sha256: string }) => a.sha256)).size).toBe(6);
    expect(provenance.deferred.map((a: { id: string }) => a.id)).toEqual(['door', 'elevator']);
  });

  it('never activates rejected door/elevator imagery or counts it as completed coverage', () => {
    expect(SIDEOPS_DEFERRED_PROP_ASSETS.map(a => [a.textureKey, a.width, a.height])).toEqual([
      ['door', 34, 92], ['elevator', 42, 68]
    ]);
    for (const asset of SIDEOPS_DEFERRED_PROP_ASSETS) {
      expect(asset.reason).toContain('failed');
      expect(SIDEOPS_COMMON_PROP_ASSETS.some(a => a.textureKey === asset.textureKey)).toBe(false);
      expect(provenance.outputs.some((a: { id: string }) => a.id === asset.id)).toBe(false);
    }
  });

  it.each(SIDEOPS_COMMON_PROP_ASSETS)('loads a provenance-matching PNG for $id', (asset) => {
    const png = readFileSync(resolve('public', asset.path.slice(1)));
    expect(png.subarray(1, 4).toString()).toBe('PNG');
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([asset.width, asset.height]);
    expect(hash(png)).toBe(provenance.outputs.find((output: { id: string }) => output.id === asset.id)?.sha256);
  });

  it('preloads authored props and keeps procedural shapes only as load-failure fallbacks', () => {
    const preload = readFileSync(resolve('src/game/scenes/PreloadScene.ts'), 'utf8');
    expect(preload).toContain('SIDEOPS_COMMON_PROP_ASSETS.forEach');
    for (const asset of SIDEOPS_COMMON_PROP_ASSETS) {
      expect(preload).toContain(`if (!this.textures.exists('${asset.textureKey}'))`);
    }
  });
});
