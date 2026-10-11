/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inflateSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import vrMissions from '../../data/vrMissions.json';
import {
  MGS1_VR_ALL_ASSETS,
  MGS1_VR_ENVIRONMENT_LAYOUTS,
  MGS1_VR_HAZARD_ASSETS,
  MGS1_VR_PROP_ASSETS,
  MGS1_VR_STRUCTURE_ASSETS,
  MGS1_VR_TARGET_ASSETS,
  MGS1_VR_TILE_ASSETS,
  collectMgs1VrEnvironmentAssets,
  resolveMgs1VrEnvironment
} from './mgs1VrEnvironmentRegistry';

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const EXPECTED_VARIANTS = [
  'dock_infiltration_short',
  'dock_infiltration_stealth',
  'weapon_range_linear',
  'cqc_corridor',
  'surveillance_yard',
  'boss_arena_vr',
  'vs12_battle_01',
  'vs12_battle_02',
  'vs12_battle_03',
  'vs12_battle_04',
  'vs12_battle_05',
  'vs12_battle_06',
  'vs12_battle_07',
  'vs12_battle_08'
] as const;

interface DecodedPng {
  width: number;
  height: number;
  rgba: Buffer;
}

const paeth = (left: number, up: number, upperLeft: number): number => {
  const prediction = left + up - upperLeft;
  const leftDistance = Math.abs(prediction - left);
  const upDistance = Math.abs(prediction - up);
  const upperLeftDistance = Math.abs(prediction - upperLeft);
  if (leftDistance <= upDistance && leftDistance <= upperLeftDistance) return left;
  return upDistance <= upperLeftDistance ? up : upperLeft;
};

const decodeRgbaPng = (png: Buffer): DecodedPng => {
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const idat: Buffer[] = [];
  let offset = 8;
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT') idat.push(png.subarray(offset + 8, offset + 8 + length));
    offset += length + 12;
    if (type === 'IEND') break;
  }

  const packed = inflateSync(Buffer.concat(idat));
  const stride = width * 4;
  const rgba = Buffer.alloc(stride * height);
  let packedOffset = 0;
  let previous = Buffer.alloc(stride);

  for (let y = 0; y < height; y += 1) {
    const filter = packed[packedOffset];
    packedOffset += 1;
    const row = Buffer.alloc(stride);
    for (let x = 0; x < stride; x += 1) {
      const source = packed[packedOffset + x];
      const left = x >= 4 ? row[x - 4] : 0;
      const up = previous[x];
      const upperLeft = x >= 4 ? previous[x - 4] : 0;
      const predictor = filter === 0
        ? 0
        : filter === 1
          ? left
          : filter === 2
            ? up
            : filter === 3
              ? Math.floor((left + up) / 2)
              : filter === 4
                ? paeth(left, up, upperLeft)
                : Number.NaN;
      if (Number.isNaN(predictor)) throw new Error(`Unsupported PNG filter ${filter}`);
      row[x] = (source + predictor) & 0xff;
    }
    row.copy(rgba, y * stride);
    previous = row;
    packedOffset += stride;
  }
  return { width, height, rgba };
};

const readRegisteredPng = (path: string): DecodedPng => {
  const absolutePath = resolve(process.cwd(), 'public', path.replace(/^\//, ''));
  return decodeRgbaPng(readFileSync(absolutePath));
};

describe('MGS1 VR environment registry', () => {
  it('registers the complete 48-asset environment pack by category', () => {
    expect(MGS1_VR_TILE_ASSETS).toHaveLength(8);
    expect(MGS1_VR_PROP_ASSETS).toHaveLength(12);
    expect(MGS1_VR_STRUCTURE_ASSETS).toHaveLength(12);
    expect(MGS1_VR_TARGET_ASSETS).toHaveLength(8);
    expect(MGS1_VR_HAZARD_ASSETS).toHaveLength(8);
    expect(MGS1_VR_ALL_ASSETS).toHaveLength(48);
  });

  it('keeps ids, Phaser texture keys and local source paths unique', () => {
    expect(new Set(MGS1_VR_ALL_ASSETS.map((asset) => asset.id)).size).toBe(48);
    expect(new Set(MGS1_VR_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(48);
    expect(new Set(MGS1_VR_ALL_ASSETS.map((asset) => asset.path)).size).toBe(48);
  });

  it('ships every entry as an exact-size 8-bit RGBA PNG', () => {
    for (const asset of MGS1_VR_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(PNG_SIGNATURE);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });

  it('keeps sprite art large enough to read inside its registered gameplay canvas', () => {
    const explicitMinimums = new Map<string, readonly [number, number]>([
      ['/vr/mgs1/environment/props/boundary-pillar.png', [0.28, 0.58]],
      ['/vr/mgs1/environment/props/route-marker.png', [0.25, 0.58]],
      ['/vr/mgs1/environment/props/data-crate.png', [0.5, 0.5]],
      ['/vr/mgs1/environment/props/platform-tile.png', [0.9, 0.55]],
      ['/vr/mgs1/environment/props/hazard-strip.png', [0.9, 0.5]],
      ['/vr/mgs1/environment/hazards/laser-beam.png', [0.9, 0.45]]
    ] as const);

    for (const asset of MGS1_VR_ALL_ASSETS.filter((entry) => entry.category !== 'tile')) {
      const decoded = readRegisteredPng(asset.path);
      let left = decoded.width;
      let right = -1;
      let top = decoded.height;
      let bottom = -1;
      for (let y = 0; y < decoded.height; y += 1) {
        for (let x = 0; x < decoded.width; x += 1) {
          if (decoded.rgba[(y * decoded.width + x) * 4 + 3] === 0) continue;
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
      }
      expect(right, asset.path).toBeGreaterThanOrEqual(0);
      const widthRatio = (right - left + 1) / decoded.width;
      const heightRatio = (bottom - top + 1) / decoded.height;
      expect(Math.max(widthRatio, heightRatio), asset.path).toBeGreaterThanOrEqual(0.45);
      const minimum = explicitMinimums.get(asset.path);
      if (minimum) {
        expect(widthRatio, asset.path).toBeGreaterThanOrEqual(minimum[0]);
        expect(heightRatio, asset.path).toBeGreaterThanOrEqual(minimum[1]);
      }
    }
  });

  it('matches opposite tile edges so repeated backgrounds do not expose seams', () => {
    for (const asset of MGS1_VR_TILE_ASSETS) {
      const { width, height, rgba } = readRegisteredPng(asset.path);
      const pixel = (x: number, y: number): Buffer => rgba.subarray((y * width + x) * 4, (y * width + x) * 4 + 4);
      for (let y = 0; y < height; y += 1) {
        if (!pixel(0, y).equals(pixel(width - 1, y))) throw new Error(`${asset.path}: horizontal seam at row ${y}`);
      }
      for (let x = 0; x < width; x += 1) {
        if (!pixel(x, 0).equals(pixel(x, height - 1))) throw new Error(`${asset.path}: vertical seam at column ${x}`);
      }
    }
  });

  it('does not leak generated atlas chroma-key magenta into runtime art', () => {
    for (const asset of MGS1_VR_ALL_ASSETS) {
      const { width, height, rgba } = readRegisteredPng(asset.path);
      let hotMagentaPixels = 0;
      for (let index = 0; index < width * height; index += 1) {
        const offset = index * 4;
        const red = rgba[offset];
        const green = rgba[offset + 1];
        const blue = rgba[offset + 2];
        const alpha = rgba[offset + 3];
        if (alpha > 0 && red > 220 && blue > 220 && green < 40) hotMagentaPixels += 1;
      }
      expect(hotMagentaPixels, asset.path).toBe(0);
    }
  });

  it('covers exactly the fourteen map variants declared by mission data', () => {
    const missionVariants = [...new Set(vrMissions.map((mission) => mission.mapVariant))].sort();
    const layoutVariants = Object.keys(MGS1_VR_ENVIRONMENT_LAYOUTS).sort();
    expect(layoutVariants).toEqual([...EXPECTED_VARIANTS].sort());
    expect(layoutVariants).toEqual(missionVariants);
    for (const variant of EXPECTED_VARIANTS) {
      expect(resolveMgs1VrEnvironment(variant)).toBe(MGS1_VR_ENVIRONMENT_LAYOUTS[variant]);
    }
    expect(resolveMgs1VrEnvironment('unknown_variant')).toBe(MGS1_VR_ENVIRONMENT_LAYOUTS.dock_infiltration_short);
  });

  it('keeps layouts decorative, in-bounds and linked to registered assets', () => {
    const ids = new Set(MGS1_VR_ALL_ASSETS.map((asset) => asset.id));
    const tileKeys = new Set(MGS1_VR_TILE_ASSETS.map((asset) => asset.textureKey));

    for (const layout of Object.values(MGS1_VR_ENVIRONMENT_LAYOUTS)) {
      expect(layout.mapVariant).toBeTruthy();
      expect(layout.voidColor).not.toBe(layout.gridColor);
      expect(layout.gridColor).not.toBe(layout.accentColor);
      expect(layout.accentColor).not.toBe(layout.voidColor);
      expect(tileKeys.has(layout.voidTextureKey)).toBe(true);
      expect(tileKeys.has(layout.gridTextureKey)).toBe(true);
      expect(tileKeys.has(layout.accentTextureKey)).toBe(true);
      expect(new Set([layout.voidTextureKey, layout.gridTextureKey, layout.accentTextureKey]).size).toBe(3);
      expect(layout.placements.length).toBeGreaterThan(0);

      for (const placement of layout.placements) {
        expect(ids.has(placement.assetId), `${layout.mapVariant}:${placement.assetId}`).toBe(true);
        expect(placement.x).toBeGreaterThanOrEqual(0);
        expect(placement.x).toBeLessThanOrEqual(1900);
        expect(placement.y).toBeGreaterThanOrEqual(0);
        expect(placement.y).toBeLessThanOrEqual(540);
        expect(placement.depth).toBeLessThan(0);
        expect(placement.scale).toBeGreaterThan(0);
        expect(placement.alpha).toBeGreaterThan(0);
        expect(placement.alpha).toBeLessThanOrEqual(1);
        expect(placement.physical).toBe(false);
      }
    }
  });

  it('collects preload assets without duplicate Phaser keys', () => {
    const preloadAssets = collectMgs1VrEnvironmentAssets([
      ...MGS1_VR_ALL_ASSETS,
      MGS1_VR_ALL_ASSETS[0],
      MGS1_VR_PROP_ASSETS[0]
    ]);
    expect(preloadAssets).toHaveLength(48);
    expect(new Set(preloadAssets.map((asset) => asset.textureKey)).size).toBe(48);
    expect(collectMgs1VrEnvironmentAssets()).toEqual(MGS1_VR_ALL_ASSETS);
  });
});
