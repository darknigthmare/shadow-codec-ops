/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inflateSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import {
  getMg1ActorAnimationAssetBySourceTexture,
  getMg1ActorAnimationAssetByTexture,
  getMg1ActorAnimationKey,
  MG1_ACTOR_ANIMATION_ASSETS,
  type Mg1ActorAnimationAsset
} from './mg1ActorAnimationRegistry';
import {
  MG1_SIDEOPS_BOSS_ASSETS,
  MG1_SIDEOPS_ENEMY_ASSETS,
  MG1_SIDEOPS_MACHINE_ASSETS,
  MG1_SIDEOPS_NPC_ASSETS
} from './mg1SideOpsAssetRegistry';

interface DecodedPng {
  width: number;
  height: number;
  pixels: Uint8Array;
}

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function paethPredictor(left: number, up: number, upperLeft: number): number {
  const estimate = left + up - upperLeft;
  const distanceLeft = Math.abs(estimate - left);
  const distanceUp = Math.abs(estimate - up);
  const distanceUpperLeft = Math.abs(estimate - upperLeft);
  if (distanceLeft <= distanceUp && distanceLeft <= distanceUpperLeft) return left;
  return distanceUp <= distanceUpperLeft ? up : upperLeft;
}

/** Minimal strict decoder for the 8-bit RGBA, non-interlaced sheets shipped here. */
function decodeRgbaPng(png: Buffer): DecodedPng {
  expect(png.subarray(0, 8)).toEqual(PNG_SIGNATURE);

  let offset = 8;
  let width = 0;
  let height = 0;
  const compressedChunks: Buffer[] = [];
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (type === 'IHDR') {
      width = png.readUInt32BE(dataStart);
      height = png.readUInt32BE(dataStart + 4);
      expect(png[dataStart + 8]).toBe(8);
      expect(png[dataStart + 9]).toBe(6);
      expect(png[dataStart + 12]).toBe(0);
    } else if (type === 'IDAT') {
      compressedChunks.push(png.subarray(dataStart, dataEnd));
    }
    offset = dataEnd + 4;
    if (type === 'IEND') break;
  }

  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const filtered = inflateSync(Buffer.concat(compressedChunks));
  expect(filtered.length).toBe((stride + 1) * height);
  const pixels = new Uint8Array(stride * height);
  let sourceOffset = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = filtered[sourceOffset];
    expect([0, 1, 2, 3, 4]).toContain(filter);
    sourceOffset += 1;
    const rowOffset = y * stride;
    const previousRowOffset = rowOffset - stride;
    for (let x = 0; x < stride; x += 1) {
      const raw = filtered[sourceOffset + x];
      const left = x >= bytesPerPixel ? pixels[rowOffset + x - bytesPerPixel] : 0;
      const up = y > 0 ? pixels[previousRowOffset + x] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel ? pixels[previousRowOffset + x - bytesPerPixel] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = up;
      else if (filter === 3) predictor = Math.floor((left + up) / 2);
      else if (filter === 4) predictor = paethPredictor(left, up, upperLeft);
      pixels[rowOffset + x] = (raw + predictor) & 0xff;
    }
    sourceOffset += stride;
  }
  return { width, height, pixels };
}

function extractFrame(png: DecodedPng, asset: Mg1ActorAnimationAsset, frame: number): Buffer {
  const framePixels = Buffer.alloc(asset.frameWidth * asset.frameHeight * 4);
  const fullStride = png.width * 4;
  const frameStride = asset.frameWidth * 4;
  for (let y = 0; y < asset.frameHeight; y += 1) {
    const sourceStart = y * fullStride + frame * frameStride;
    framePixels.set(png.pixels.subarray(sourceStart, sourceStart + frameStride), y * frameStride);
  }
  return framePixels;
}

const staticActorAssets = [
  ...MG1_SIDEOPS_NPC_ASSETS,
  ...MG1_SIDEOPS_ENEMY_ASSETS,
  ...MG1_SIDEOPS_BOSS_ASSETS,
  ...MG1_SIDEOPS_MACHINE_ASSETS
];

const expectedSources = [
  { sourceTextureKey: 'playerSolidSnakeMg1', sourceWidth: 32, sourceHeight: 48 },
  ...staticActorAssets.map((asset) => ({
    sourceTextureKey: asset.textureKey,
    sourceWidth: asset.width,
    sourceHeight: asset.height
  }))
];

describe('MG1 actor animation registry', () => {
  it('covers Solid Snake plus the exact 23 MG1 physical actors', () => {
    expect(MG1_ACTOR_ANIMATION_ASSETS).toHaveLength(24);
    expect(MG1_ACTOR_ANIMATION_ASSETS.map((asset) => ({
      sourceTextureKey: asset.sourceTextureKey,
      sourceWidth: asset.sourceWidth,
      sourceHeight: asset.sourceHeight
    }))).toEqual(expectedSources);
  });

  it('uses stable unique sheet keys and local animation paths', () => {
    expect(new Set(MG1_ACTOR_ANIMATION_ASSETS.map((asset) => asset.sourceTextureKey)).size).toBe(24);
    expect(new Set(MG1_ACTOR_ANIMATION_ASSETS.map((asset) => asset.textureKey)).size).toBe(24);
    expect(new Set(MG1_ACTOR_ANIMATION_ASSETS.map((asset) => asset.path)).size).toBe(24);

    for (const asset of MG1_ACTOR_ANIMATION_ASSETS) {
      expect(asset.textureKey).toBe(`${asset.sourceTextureKey}Anim`);
      expect(asset.path).toMatch(/^\/sideops\/mg1\/animations\/(characters|npcs|enemies|bosses|vehicles)\/[a-z0-9-]+-sheet\.png$/);
      expect(getMg1ActorAnimationAssetBySourceTexture(asset.sourceTextureKey)).toBe(asset);
      expect(getMg1ActorAnimationAssetByTexture(asset.textureKey)).toBe(asset);
      for (const state of Object.keys(asset.clips)) {
        expect(getMg1ActorAnimationKey(asset.textureKey, state as keyof typeof asset.clips)).toBe(`mg1:${asset.textureKey}:${state}`);
      }
    }
    expect(getMg1ActorAnimationAssetBySourceTexture('unknown')).toBeUndefined();
    expect(getMg1ActorAnimationAssetByTexture('unknown')).toBeUndefined();
  });

  it('defines valid non-overlapping clips that cover every frame exactly once', () => {
    for (const asset of MG1_ACTOR_ANIMATION_ASSETS) {
      const coveredFrames: number[] = [];
      for (const [state, clip] of Object.entries(asset.clips)) {
        expect(clip.start, `${asset.textureKey}:${state}`).toBeGreaterThanOrEqual(0);
        expect(clip.end, `${asset.textureKey}:${state}`).toBeGreaterThanOrEqual(clip.start);
        expect(clip.end, `${asset.textureKey}:${state}`).toBeLessThan(asset.frameCount);
        expect(clip.frameRate, `${asset.textureKey}:${state}`).toBeGreaterThan(0);
        expect([-1, 0], `${asset.textureKey}:${state}`).toContain(clip.repeat);
        for (let frame = clip.start; frame <= clip.end; frame += 1) coveredFrames.push(frame);
      }
      expect(coveredFrames.sort((left, right) => left - right), asset.textureKey).toEqual(
        Array.from({ length: asset.frameCount }, (_, frame) => frame)
      );
    }
  });

  it('keeps the immobile gun camera and TX-55 free of movement clips', () => {
    const camera = getMg1ActorAnimationAssetBySourceTexture('mg1GunCamera');
    const tx55 = getMg1ActorAnimationAssetBySourceTexture('mg1Tx55');
    expect(camera?.clips.move).toBeUndefined();
    expect(Object.keys(camera?.clips ?? {})).toEqual(['idle', 'attack', 'hit', 'death']);
    expect(tx55?.clips.move).toBeUndefined();
    expect(tx55?.clips.attack).toBeUndefined();
    expect(Object.keys(tx55?.clips ?? {})).toEqual(['idle', 'chargeLeft', 'chargeRight', 'hit', 'death']);
  });

  it('ships each sheet as an exact-size 8-bit RGBA PNG with binary alpha', () => {
    for (const asset of MG1_ACTOR_ANIMATION_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const pngBuffer = readFileSync(absolutePath);
      const png = decodeRgbaPng(pngBuffer);
      expect(png.width, absolutePath).toBe(asset.frameWidth * asset.frameCount);
      expect(png.height, absolutePath).toBe(asset.frameHeight);
      let invalidAlphaIndex = -1;
      for (let index = 3; index < png.pixels.length; index += 4) {
        if (png.pixels[index] !== 0 && png.pixels[index] !== 255) {
          invalidAlphaIndex = index;
          break;
        }
      }
      expect(invalidAlphaIndex, `${absolutePath} must use binary alpha`).toBe(-1);
    }
  });

  it('keeps frame zero visible and gives every multi-frame cycle real motion', () => {
    for (const asset of MG1_ACTOR_ANIMATION_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = decodeRgbaPng(readFileSync(absolutePath));
      const frameZero = extractFrame(png, asset, 0);
      expect(frameZero.some((channel, index) => index % 4 === 3 && channel === 255), `${asset.textureKey}:frame0`).toBe(true);

      for (const [state, clip] of Object.entries(asset.clips)) {
        if (clip.start === clip.end) continue;
        const firstFrame = extractFrame(png, asset, clip.start);
        const hasMotion = Array.from({ length: clip.end - clip.start }, (_, offset) => clip.start + offset + 1)
          .some((frame) => !extractFrame(png, asset, frame).equals(firstFrame));
        expect(hasMotion, `${asset.textureKey}:${state}`).toBe(true);
      }
    }
  });
});
